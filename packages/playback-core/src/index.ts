import mux, { ErrorEvent } from 'mux-embed';
import Hls from 'hls.js';
import { setupErrors, MediaError } from './errors';
import { setupAutoplay } from './autoplay';
import { setupPreload } from './preload';
import { setupTracks, addTextTrack, removeTextTrack } from './tracks';
import { inSeekableRange, toPlaybackIdParts, getType } from './util';
import {
  StreamTypes,
  PlaybackTypes,
  ExtensionMimeTypeMap,
  type ValueOf,
  type PlaybackCore,
  type MuxMediaProps,
  type MuxMediaPropsInternal,
} from './types';

export { mux, Hls, MediaError, addTextTrack, removeTextTrack };
export * from './types';

const userAgentStr = globalThis?.navigator?.userAgent ?? '';
const isAndroid = userAgentStr.toLowerCase().indexOf('android') !== -1;
const muxMediaState: WeakMap<HTMLMediaElement, Partial<MuxMediaProps> & { error?: MediaError }> = new WeakMap();

const MUX_VIDEO_DOMAIN = 'mux.com';
const MSE_SUPPORTED = Hls.isSupported?.();
const DEFAULT_PREFER_MSE = isAndroid;

export const generatePlayerInitTime = () => {
  return mux.utils.now();
};

export const toMuxVideoURL = (playbackId?: string, { domain = MUX_VIDEO_DOMAIN } = {}) => {
  if (!playbackId) return undefined;
  const [idPart, queryPart = ''] = toPlaybackIdParts(playbackId);
  return `https://stream.${domain}/${idPart}.m3u8${queryPart}`;
};

export const initialize = (
  props: Partial<MuxMediaPropsInternal>,
  mediaEl?: HTMLMediaElement | null,
  core?: PlaybackCore
) => {
  // Automatically tear down previously initialized mux data & hls instance if it exists.
  teardown(mediaEl, core);

  muxMediaState.set(mediaEl as HTMLMediaElement, {});
  const nextHlsInstance = setupHls(props, mediaEl);
  setupMux(props, mediaEl, nextHlsInstance);
  loadMedia(props, mediaEl, nextHlsInstance);

  const getError = setupErrors(mediaEl, nextHlsInstance);
  const setAutoplay = setupAutoplay(props as Pick<MuxMediaProps, 'autoplay'>, mediaEl, nextHlsInstance);
  const setPreload = setupPreload(props as Pick<MuxMediaProps, 'preload' | 'src'>, mediaEl, nextHlsInstance);
  setupTracks(mediaEl, nextHlsInstance);

  return {
    engine: nextHlsInstance,
    getError,
    setAutoplay,
    setPreload,
  };
};

export const teardown = (mediaEl?: HTMLMediaElement | null, core?: PlaybackCore) => {
  const hls = core?.engine;
  if (hls) {
    hls.detachMedia();
    hls.destroy();
  }
  if (mediaEl?.mux && !mediaEl.mux.deleted) {
    mediaEl.mux.destroy();
    delete mediaEl.mux;
  }
  if (mediaEl) {
    mediaEl.removeAttribute('src');
    mediaEl.load();
    mediaEl.removeEventListener('durationchange', seekInSeekableRange);
    muxMediaState.delete(mediaEl);
    mediaEl.dispatchEvent(new Event('teardown'));
  }
};

/**
 * Returns true if we should use native playback. e.g. progressive files (mp3, mp4, webm) or native HLS on Safari.
 * We should use native playback for hls media sources if we
 *
 *   a) can use native playback (excluding Android, it's MSE by default)
 *   b) not prefer to use MSE/hls.js if it's supported
 */
function useNative(
  props: Partial<Pick<MuxMediaProps, 'preferPlayback' | 'type'>>,
  mediaEl?: Pick<HTMLMediaElement, 'canPlayType'> | null
) {
  const type = getType(props);
  const hlsType = type === ExtensionMimeTypeMap.M3U8;
  if (!hlsType) return true;

  const canUseNative = !type || (mediaEl?.canPlayType(type) ?? true);
  const { preferPlayback } = props;

  const preferMse = preferPlayback === PlaybackTypes.MSE;
  const preferNative = preferPlayback === PlaybackTypes.NATIVE;
  const forceMse = MSE_SUPPORTED && (preferMse || DEFAULT_PREFER_MSE);

  return canUseNative && (preferNative || !forceMse);
}

export const setupHls = (
  props: Partial<Pick<MuxMediaProps, 'debug' | 'streamType' | 'type' | 'startTime'>>,
  mediaEl?: Pick<HTMLMediaElement, 'canPlayType'> | null
) => {
  const { debug, streamType, startTime: startPosition = -1 } = props;
  const type = getType(props);
  const hlsType = type === ExtensionMimeTypeMap.M3U8;
  const shouldUseNative = useNative(props, mediaEl);

  // 1. if we are trying to play an hls media source create hls if we should be using it "under the hood"
  if (hlsType && !shouldUseNative && MSE_SUPPORTED) {
    const defaultConfig = {
      backBufferLength: 30,
      renderTextTracksNatively: false,
      liveDurationInfinity: true,
    };
    const streamTypeConfig = getStreamTypeConfig(streamType);
    const hls = new Hls({
      // Kind of like preload metadata, but causes spinner.
      // autoStartLoad: false,
      debug,
      startPosition,
      ...defaultConfig,
      ...streamTypeConfig,
    });

    return hls;
  }
  return undefined;
};

export const getStreamTypeConfig = (streamType?: ValueOf<StreamTypes>) => {
  // for regular live videos, set backBufferLength to 8
  if ([StreamTypes.LIVE, StreamTypes.DVR].includes(streamType as any)) {
    const liveConfig = {
      backBufferLength: 8,
    };

    return liveConfig;
  }

  // for LL Live videos, set backBufferLenght to 4 and maxFragLookUpTolerance to 0.001
  if ([StreamTypes.LL_LIVE, StreamTypes.LL_DVR].includes(streamType as any)) {
    const liveConfig = {
      backBufferLength: 4,
      maxFragLookUpTolerance: 0.001,
    };

    return liveConfig;
  }

  return {};
};

export const isMuxVideoSrc = ({
  playbackId,
  src,
  customDomain,
}: Partial<Pick<MuxMediaPropsInternal, 'playbackId' | 'src' | 'customDomain'>>) => {
  if (!!playbackId) return true;
  // having no playback id and no src string should never actually happen, but could
  if (typeof src !== 'string') return false;
  const hostname = new URL(src).hostname.toLocaleLowerCase();
  return hostname.includes(MUX_VIDEO_DOMAIN) || (!!customDomain && hostname.includes(customDomain.toLocaleLowerCase()));
};

export const setupMux = (
  props: Partial<
    Pick<
      MuxMediaPropsInternal,
      | 'envKey'
      | 'playerInitTime'
      | 'beaconCollectionDomain'
      | 'errorTranslator'
      | 'metadata'
      | 'debug'
      | 'playerSoftwareName'
      | 'playerSoftwareVersion'
      | 'playbackId'
      | 'src'
      | 'customDomain'
    >
  >,
  mediaEl?: HTMLMediaElement | null,
  hlsjs?: Hls
) => {
  const { envKey: env_key } = props;
  const inferredEnv = isMuxVideoSrc(props);

  if ((env_key || inferredEnv) && mediaEl) {
    const {
      playerInitTime: player_init_time,
      playerSoftwareName: player_software_name,
      playerSoftwareVersion: player_software_version,
      beaconCollectionDomain,
      metadata,
      debug,
    } = props;

    const muxEmbedErrorTranslator = (error: ErrorEvent) => {
      // mux-embed auto tracks fatal hls.js errors, turn it off.
      // playback-core will emit errors with a numeric code manually to mux-embed.
      if (typeof error.player_error_code === 'string') return false;

      if (typeof props.errorTranslator === 'function') {
        return props.errorTranslator(error);
      }

      return error;
    };

    mux.monitor(mediaEl, {
      debug,
      beaconCollectionDomain,
      hlsjs,
      Hls: hlsjs ? Hls : undefined,
      automaticErrorTracking: false,
      errorTranslator: muxEmbedErrorTranslator,
      data: {
        ...(env_key ? { env_key } : {}),
        // Metadata fields
        player_software_name,
        // NOTE: Adding this because there appears to be some instability on whether
        // player_software_name or player_software "wins" for Mux Data (CJP)
        player_software: player_software_name,
        player_software_version,
        player_init_time,
        // Use any metadata passed in programmatically (which may override the defaults above)
        ...metadata,
      },
    });
  }
};

export const loadMedia = (
  props: Partial<Pick<MuxMediaProps, 'preferPlayback' | 'src' | 'type' | 'startTime' | 'streamType' | 'autoplay'>>,
  mediaEl?: HTMLMediaElement | null,
  hls?: Pick<Hls, 'attachMedia'>
) => {
  if (!mediaEl) {
    console.warn('attempting to load media before mediaEl exists');
    return;
  }
  const shouldUseNative = useNative(props, mediaEl);
  const { src } = props;
  if (mediaEl && shouldUseNative) {
    if (typeof src === 'string') {
      mediaEl.setAttribute('src', src);
      if (props.startTime) {
        (muxMediaState.get(mediaEl) ?? {}).startTime = props.startTime;
        // seekable is set to the range of the entire video once durationchange fires
        mediaEl.addEventListener('durationchange', seekInSeekableRange, { once: true });
      }
    } else {
      mediaEl.removeAttribute('src');
    }
  } else if (hls) {
    // loading of the source is done in setupPreload()
    hls.attachMedia(mediaEl);
  } else {
    console.error(
      "It looks like the video you're trying to play will not work on this system! If possible, try upgrading to the newest versions of your browser or software."
    );
  }
};

function seekInSeekableRange(event: Event) {
  const mediaEl = event.target as HTMLMediaElement;
  const startTime = muxMediaState.get(mediaEl)?.startTime;
  if (!startTime) return;

  if (inSeekableRange(mediaEl.seekable, mediaEl.duration, startTime)) {
    // Setting preload to `none` from `auto` was required on iOS to fix a bug
    // that caused no `timeupdate` events to fire after seeking ¯\_(ツ)_/¯
    const wasAuto = mediaEl.preload === 'auto';
    if (wasAuto) {
      mediaEl.preload = 'none';
    }

    mediaEl.currentTime = startTime;

    if (wasAuto) {
      mediaEl.preload = 'auto';
    }
  }
}
