import mux, { ErrorEvent } from 'mux-embed';
import Hls from 'hls.js';
import { MediaError } from './errors';
import { setupAutoplay } from './autoplay';
import { setupPreload } from './preload';
import { setupTracks, addTextTrack, removeTextTrack } from './tracks';
import { inSeekableRange, toPlaybackIdParts, getType } from './util';
import {
  StreamTypes,
  PlaybackTypes,
  ExtensionMimeTypeMap,
  CmcdTypes,
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

export const generateUUID = mux.utils.generateUUID;

export const toMuxVideoURL = (playbackId?: string, { domain = MUX_VIDEO_DOMAIN } = {}) => {
  if (!playbackId) return undefined;
  const [idPart, queryPart = ''] = toPlaybackIdParts(playbackId);
  return `https://stream.${domain}/${idPart}.m3u8${queryPart}`;
};

const toPlaybackIdFromParameterized = (playbackIdWithParams: string | undefined) => {
  if (!playbackIdWithParams) return undefined;
  const [playbackId] = playbackIdWithParams.split('?');
  // `|| undefined` is here to handle potential invalid cases
  return playbackId || undefined;
};

const toPlaybackIdFromSrc = (src: string | undefined) => {
  if (!src || !src.startsWith('https://stream.')) return undefined;
  const [playbackId] = new URL(src).pathname.slice(1).split('.m3u8');
  // `|| undefined` is here to handle potential invalid cases
  return playbackId || undefined;
};

const toVideoId = (props: Partial<MuxMediaPropsInternal>) => {
  if (props?.metadata?.video_id) return props.metadata.video_id;
  if (!isMuxVideoSrc(props)) return props.src;
  return toPlaybackIdFromParameterized(props.playbackId) ?? toPlaybackIdFromSrc(props.src) ?? props.src;
};

export const getError = (mediaEl: HTMLMediaElement) => {
  return muxMediaState.get(mediaEl)?.error;
};

export const initialize = (props: Partial<MuxMediaPropsInternal>, mediaEl: HTMLMediaElement, core?: PlaybackCore) => {
  // Automatically tear down previously initialized mux data & hls instance if it exists.
  teardown(mediaEl, core);
  // NOTE: metadata should never be nullish/nil. Adding here for type safety due to current type defs.
  const { metadata = {} } = props;
  const { view_session_id = generateUUID() } = metadata;
  const video_id = toVideoId(props);
  metadata.view_session_id = view_session_id;
  metadata.video_id = video_id;
  props.metadata = metadata;

  muxMediaState.set(mediaEl as HTMLMediaElement, {});
  const nextHlsInstance = setupHls(props, mediaEl);
  setupMux(props, mediaEl, nextHlsInstance);
  loadMedia(props, mediaEl, nextHlsInstance);

  const setAutoplay = setupAutoplay(props as Pick<MuxMediaProps, 'autoplay'>, mediaEl, nextHlsInstance);
  const setPreload = setupPreload(props as Pick<MuxMediaProps, 'preload' | 'src'>, mediaEl, nextHlsInstance);

  return {
    engine: nextHlsInstance,
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
    mediaEl.removeEventListener('error', handleNativeError);
    mediaEl.removeEventListener('error', handleInternalError);
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
  mediaEl: Pick<HTMLMediaElement, 'canPlayType'>
) {
  const type = getType(props);
  const hlsType = type === ExtensionMimeTypeMap.M3U8;
  if (!hlsType) return true;

  const canUseNative = !type || (mediaEl.canPlayType(type) ?? true);
  const { preferPlayback } = props;

  const preferMse = preferPlayback === PlaybackTypes.MSE;
  const preferNative = preferPlayback === PlaybackTypes.NATIVE;
  const forceMse = MSE_SUPPORTED && (preferMse || DEFAULT_PREFER_MSE);

  return canUseNative && (preferNative || !forceMse);
}

export const setupHls = (
  props: Partial<
    Pick<
      MuxMediaPropsInternal,
      'debug' | 'streamType' | 'type' | 'startTime' | 'metadata' | 'experimentalCmcd' | 'preferCmcd'
    >
  >,
  mediaEl: Pick<HTMLMediaElement, 'canPlayType'>
) => {
  const { debug, streamType, startTime: startPosition = -1, metadata, experimentalCmcd, preferCmcd } = props;
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
    const cmcd = experimentalCmcd
      ? {
          useHeaders: preferCmcd === CmcdTypes.HEADER,
          sessionId: metadata.view_session_id,
          contentId: metadata.video_id,
        }
      : undefined;
    const hls = new Hls({
      // Kind of like preload metadata, but causes spinner.
      // autoStartLoad: false,
      debug,
      startPosition,
      cmcd,
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
  // Include base for relative paths
  const base = window?.location.href;
  const hostname = new URL(src, base).hostname.toLocaleLowerCase();

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
      | 'disableCookies'
    >
  >,
  mediaEl: HTMLMediaElement,
  hlsjs?: Hls
) => {
  const { envKey: env_key } = props;
  const inferredEnv = isMuxVideoSrc(props);

  if (env_key || inferredEnv) {
    const {
      playerInitTime: player_init_time,
      playerSoftwareName: player_software_name,
      playerSoftwareVersion: player_software_version,
      beaconCollectionDomain,
      debug,
      disableCookies,
    } = props;

    const metadata = {
      ...props.metadata,
      video_title: props?.metadata?.video_title || undefined,
    };

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
      disableCookies,
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
  mediaEl: HTMLMediaElement,
  hls?: Pick<
    Hls,
    | 'config'
    | 'on'
    | 'once'
    | 'startLoad'
    | 'stopLoad'
    | 'recoverMediaError'
    | 'destroy'
    | 'loadSource'
    | 'attachMedia'
    | 'liveSyncPosition'
    | 'subtitleTracks'
    | 'subtitleTrack'
  >
) => {
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

    mediaEl.addEventListener('error', handleNativeError);
    mediaEl.addEventListener('error', handleInternalError);
  } else if (hls && src) {
    hls.on(Hls.Events.ERROR, (_event, data) => {
      // if (data.fatal) {
      //   switch (data.type) {
      //     case Hls.ErrorTypes.NETWORK_ERROR:
      //       // try to recover network error
      //       console.error("fatal network error encountered, try to recover");
      //       hls.startLoad();
      //       break;
      //     case Hls.ErrorTypes.MEDIA_ERROR:
      //       console.error("fatal media error encountered, try to recover");
      //       hls.recoverMediaError();
      //       break;
      //     default:
      //       // cannot recover
      //       console.error(
      //         "unrecoverable fatal error encountered, cannot recover (check logs for more info)"
      //       );
      //       hls.destroy();
      //       break;
      //   }
      // }

      const errorCodeMap: Record<string, number> = {
        [Hls.ErrorTypes.NETWORK_ERROR]: MediaError.MEDIA_ERR_NETWORK,
        [Hls.ErrorTypes.MEDIA_ERROR]: MediaError.MEDIA_ERR_DECODE,
      };
      const error = new MediaError('', errorCodeMap[data.type]);
      error.fatal = data.fatal;
      error.data = data;
      mediaEl.dispatchEvent(
        new CustomEvent('error', {
          detail: error,
        })
      );
    });
    mediaEl.addEventListener('error', handleInternalError);

    setupTracks(mediaEl, hls);

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

async function handleNativeError(event: Event) {
  // Return if the event was created or modified by a script or dispatched
  // via EventTarget.dispatchEvent() preventing an infinite loop.
  if (!event.isTrusted) return;

  // Stop immediate propagation of the native error event, re-dispatch below!
  event.stopImmediatePropagation();

  const mediaEl = event.target as HTMLMediaElement;
  // Safari sometimes throws an error event with a null error.
  if (!mediaEl?.error) return;

  const { message, code } = mediaEl.error;
  const error = new MediaError(message, code);

  if (mediaEl.src && (code !== MediaError.MEDIA_ERR_DECODE || code !== undefined)) {
    // Attempt to get the response code from the video src url.
    try {
      const { status } = await fetch(mediaEl.src as RequestInfo);
      // Use the same hls.js data structure.
      error.data = { response: { code: status } };
    } catch {}
  }

  mediaEl.dispatchEvent(
    new CustomEvent('error', {
      detail: error,
    })
  );
}

/**
 * Use a event listener instead of a function call when dispatching the Custom error
 * event so consumers are still able to disable or intercept this error event.
 * @param {Event} event
 */
function handleInternalError(event: Event) {
  if (!(event instanceof CustomEvent) || !(event.detail instanceof MediaError)) return;

  const mediaEl = event.target as HTMLMediaElement;
  const error = event.detail;
  // Prevent tracking non-fatal errors in Mux data.
  if (!error || !error.fatal) return;

  (muxMediaState.get(mediaEl) ?? {}).error = error;

  // Only pass valid mux-embed props: player_error_code, player_error_message
  mediaEl.mux?.emit('error', {
    player_error_code: error.code,
    player_error_message: error.message,
  });
}
