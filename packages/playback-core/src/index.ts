import mux, { Options, ErrorEvent } from 'mux-embed';

import Hls, { HlsConfig } from 'hls.js';
import { AutoplayTypes, setupAutoplay } from './autoplay';
import { MediaError } from './errors';
import { setupTracks, addTextTrack, removeTextTrack } from './tracks';
import { isKeyOf, inSeekableRange } from './util';
import type { Autoplay, UpdateAutoplay } from './autoplay';

export type ValueOf<T> = T[keyof T];
export type Metadata = Partial<Options['data']>;
export type PlaybackEngine = Hls;
export { mux, Hls, MediaError, Autoplay, UpdateAutoplay, setupAutoplay, addTextTrack, removeTextTrack };

const MUX_VIDEO_DOMAIN = 'mux.com';

export const generatePlayerInitTime = () => {
  return mux.utils.now();
};

export type StreamTypes = {
  VOD: 'on-demand';
  ON_DEMAND: 'on-demand';
  LIVE: 'live';
  LL_LIVE: 'll-live';
  DVR: 'live:dvr';
  LL_DVR: 'll-live:dvr';
};

export const StreamTypes: StreamTypes = {
  VOD: 'on-demand',
  ON_DEMAND: 'on-demand',
  LIVE: 'live',
  LL_LIVE: 'll-live',
  DVR: 'live:dvr',
  LL_DVR: 'll-live:dvr',
};

export type ExtensionMimeTypeMap = {
  M3U8: 'application/vnd.apple.mpegurl';
  MP4: 'video/mp4';
};

export const ExtensionMimeTypeMap: ExtensionMimeTypeMap = {
  M3U8: 'application/vnd.apple.mpegurl',
  MP4: 'video/mp4',
};

export type MimeTypeShorthandMap = {
  HLS: ExtensionMimeTypeMap['M3U8'];
};

export const MimeTypeShorthandMap: MimeTypeShorthandMap = {
  HLS: ExtensionMimeTypeMap.M3U8,
};

export const shorthandKeys = Object.keys(MimeTypeShorthandMap);

export type MediaTypes =
  | ValueOf<ExtensionMimeTypeMap>
  | keyof MimeTypeShorthandMap
  /** @TODO Figure out a way to "downgrade" derived types below to early TS syntax (e.g. 3.4) instead of explicit versions here (CJP) */
  | 'hls';
// | `${Lowercase<keyof MimeTypeShorthandMap>}`
// | `${Uppercase<keyof MimeTypeShorthandMap>}`;

export const allMediaTypes = [
  ...(Object.values(ExtensionMimeTypeMap) as ValueOf<ExtensionMimeTypeMap>[]),
  /** @TODO Figure out a way to "downgrade" derived types below to early TS syntax (e.g. 3.4) instead of explicit versions here (CJP) */
  'hls',
  'HLS',
  // ...(shorthandKeys as (keyof MimeTypeShorthandMap)[]),
  // ...(shorthandKeys.map((k) => k.toUpperCase()) as `${Uppercase<keyof MimeTypeShorthandMap>}`[]),
  // ...(shorthandKeys.map((k) => k.toLowerCase()) as `${Lowercase<keyof MimeTypeShorthandMap>}`[]),
] as MediaTypes[];

export type MuxMediaPropTypes = {
  envKey: Options['data']['env_key'];
  debug: Options['debug'] & Hls['config']['debug'];
  metadata: Partial<Options['data']>;
  customDomain: string;
  beaconCollectionDomain: Options['beaconCollectionDomain'];
  errorTranslator: Options['errorTranslator'];
  playbackId: string;
  playerInitTime: Options['data']['player_init_time'];
  preferMse: boolean;
  type: MediaTypes;
  streamType: ValueOf<StreamTypes>;
  startTime: HlsConfig['startPosition'];
  autoPlay: boolean | ValueOf<AutoplayTypes>;
  autoplay: boolean | ValueOf<AutoplayTypes>;
};

export type HTMLMediaElementProps = Partial<Pick<HTMLMediaElement, 'src'>>;

export type MuxMediaProps = HTMLMediaElementProps & MuxMediaPropTypes;
export type MuxMediaPropsInternal = MuxMediaProps & {
  playerSoftwareName: Options['data']['player_software_name'];
  playerSoftwareVersion: Options['data']['player_software_version'];
};

export const toPlaybackIdParts = (playbackIdWithOptionalParams: string): [string, string?] => {
  const qIndex = playbackIdWithOptionalParams.indexOf('?');
  if (qIndex < 0) return [playbackIdWithOptionalParams];
  const idPart = playbackIdWithOptionalParams.slice(0, qIndex);
  const queryPart = playbackIdWithOptionalParams.slice(qIndex);
  return [idPart, queryPart];
};

export const toMuxVideoURL = (playbackId?: string, { domain = MUX_VIDEO_DOMAIN } = {}) => {
  if (!playbackId) return undefined;
  const [idPart, queryPart = ''] = toPlaybackIdParts(playbackId);
  return `https://stream.${domain}/${idPart}.m3u8${queryPart}`;
};

export const inferMimeTypeFromURL = (url: string) => {
  let pathname = '';
  try {
    pathname = new URL(url).pathname;
  } catch (e) {
    console.error('invalid url');
  }

  const extDelimIdx = pathname.lastIndexOf('.');
  if (extDelimIdx < 0) return '';

  const ext = pathname.slice(extDelimIdx + 1);
  const upperExt = ext.toUpperCase();

  return isKeyOf(upperExt, ExtensionMimeTypeMap) ? ExtensionMimeTypeMap[upperExt] : '';
};

export const getType = (props: Partial<Pick<MuxMediaProps, 'type' | 'src'>>) => {
  const type = props.type;

  if (type) {
    const upperType = type.toUpperCase();

    return isKeyOf(upperType, MimeTypeShorthandMap) ? MimeTypeShorthandMap[upperType] : type;
  }

  const { src } = props;

  if (!src) return '';

  return inferMimeTypeFromURL(src);
};

export const getStreamTypeConfig = (streamType?: ValueOf<StreamTypes>) => {
  if ([StreamTypes.LIVE, StreamTypes.LL_LIVE].includes(streamType as any)) {
    const liveConfig = {
      backBufferLength: 12,
    };

    if (streamType === StreamTypes.LL_LIVE) {
      return {
        ...liveConfig,
        maxFragLookUpTolerance: 0.001,
      };
    }

    return liveConfig;
  }
  return {};
};

let muxMediaState: WeakMap<HTMLMediaElement, Partial<MuxMediaProps> & { error?: MediaError }> = new WeakMap();

export const getError = (mediaEl: HTMLMediaElement) => {
  return muxMediaState.get(mediaEl)?.error;
};

export const teardown = (mediaEl?: HTMLMediaElement | null, hls?: Pick<Hls, 'detachMedia' | 'destroy'>) => {
  if (hls) {
    hls.detachMedia();
    hls.destroy();
  }
  if (mediaEl?.mux && !mediaEl.mux.deleted) {
    mediaEl.mux.destroy();
    mediaEl.mux;
  }
  if (mediaEl) {
    mediaEl.removeEventListener('error', handleNativeError);
    mediaEl.removeEventListener('error', handleInternalError);
    mediaEl.removeEventListener('durationchange', seekInSeekableRange);
    muxMediaState.delete(mediaEl);
  }
};

export const setupHls = (
  props: Partial<Pick<MuxMediaProps, 'debug' | 'preferMse' | 'streamType' | 'type' | 'src' | 'startTime'>>,
  mediaEl?: Pick<HTMLMediaElement, 'canPlayType'> | null
) => {
  const { debug, preferMse, streamType, startTime: startPosition = -1 } = props;
  const type = getType(props);
  const hlsType = type === ExtensionMimeTypeMap.M3U8;

  const canUseNative = !type || (mediaEl?.canPlayType(type) ?? true);
  const hlsSupported = Hls.isSupported();
  // NOTE: Native HLS playback on Android can be flaky, so we're just always prefering MSE. (CJP)
  const userAgentStr = window?.navigator?.userAgent ?? '';
  const isAndroid = userAgentStr.toLowerCase().indexOf('android') !== -1;
  const defaultPreferMse = isAndroid;

  // We should use native playback for hls media sources if we a) can use native playback and don't also b) prefer to use MSE/hls.js if/when it's supported
  const shouldUseNative = !hlsType || (canUseNative && !((preferMse || defaultPreferMse) && hlsSupported));

  // 1. if we are trying to play an hls media source create hls if we should be using it "under the hood"
  if (hlsType && !shouldUseNative && hlsSupported) {
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
        player_software_version,
        player_init_time,
        // Use any metadata passed in programmatically (which may override the defaults above)
        ...metadata,
      },
    });
  }
};

export const loadMedia = (
  props: Partial<Pick<MuxMediaProps, 'preferMse' | 'src' | 'type' | 'startTime' | 'streamType' | 'autoplay'>>,
  mediaEl?: HTMLMediaElement | null,
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
  if (!mediaEl) {
    console.warn('attempting to load media before mediaEl exists');
    return;
  }
  const { preferMse, streamType } = props;
  const type = getType(props);
  const hlsType = type === ExtensionMimeTypeMap.M3U8;

  const canUseNative = !type || (mediaEl?.canPlayType(type) ?? true);
  const hlsSupported = Hls.isSupported();
  const userAgentStr = window?.navigator?.userAgent ?? '';
  // NOTE: Native HLS playback on Android for LL-HLS has been flaky, so we're prefering
  // MSE for those conditions for now. (CJP)
  const isAndroid = userAgentStr.toLowerCase().indexOf('android') !== -1;
  const defaultPreferMse = isAndroid;

  // We should use native playback for hls media sources if we a) can use native playback and don't also b) prefer to use MSE/hls.js if/when it's supported
  const shouldUseNative = !hlsType || (canUseNative && !((preferMse || defaultPreferMse) && hlsSupported));

  const { src } = props;
  if (mediaEl && canUseNative && shouldUseNative) {
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

    switch (mediaEl.preload) {
      case 'none':
        // when preload is none, load the source on first play
        mediaEl.addEventListener('play', () => hls.loadSource(src), { once: true });
        break;

      case 'metadata':
        const originalLength = hls.config.maxBufferLength;
        const originalSize = hls.config.maxBufferSize;

        // load the least amount of data possible
        hls.config.maxBufferLength = 1;
        hls.config.maxBufferSize = 1;
        // and once a user has player, allow for it to load data as normal
        mediaEl.addEventListener(
          'play',
          () => {
            hls.config.maxBufferLength = originalLength;
            hls.config.maxBufferSize = originalSize;
          },
          { once: true }
        );
        hls.loadSource(src);
        break;

      default:
        // load source immediately for any other preload value
        hls.loadSource(src);
    }

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
    const { status } = await fetch(mediaEl.src as RequestInfo);
    // Use the same hls.js data structure.
    error.data = { response: { code: status } };
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

export const initialize = (props: Partial<MuxMediaPropsInternal>, mediaEl?: HTMLMediaElement | null, hls?: Hls) => {
  // Automatically tear down previously initialized mux data & hls instance if it exists.
  teardown(mediaEl, hls);
  muxMediaState.set(mediaEl as HTMLMediaElement, {});
  const nextHlsInstance = setupHls(props, mediaEl);
  setupMux(props, mediaEl, nextHlsInstance);
  loadMedia(props, mediaEl, nextHlsInstance);
  return nextHlsInstance;
};
