/* eslint @typescript-eslint/triple-slash-reference: "off" */
/// <reference path="../dist/types/mux-embed.d.ts" />
import mux, { ErrorEvent } from 'mux-embed';
import Hls from './hls';
import type { HlsInterface } from './hls';
import { MediaError } from './errors';
import { setupAutoplay } from './autoplay';
import { setupPreload } from './preload';
import { setupRenditions } from './renditions';
import {
  setupTracks,
  addTextTrack,
  removeTextTrack,
  addCuePoints,
  getCuePoints,
  getActiveCuePoint,
  setupCuePoints,
  getCuePointsTrack,
} from './tracks';
import { getStartDate, getCurrentPdt } from './pdt';
import {
  inSeekableRange,
  toPlaybackIdParts,
  getType,
  toStreamTypeFromPlaylistType,
  toTargetLiveWindowFromPlaylistType,
  addEventListenerWithTeardown,
} from './util';
import {
  StreamTypes,
  PlaybackTypes,
  ExtensionMimeTypeMap,
  CmcdTypes,
  type ValueOf,
  type PlaybackCore,
  type MuxMediaProps,
  type MuxMediaPropsInternal,
  type MediaTracks,
  HlsPlaylistTypes,
  MediaTypes,
} from './types';
export {
  mux,
  Hls,
  MediaError,
  addTextTrack,
  removeTextTrack,
  addCuePoints,
  getCuePoints,
  getActiveCuePoint,
  getCuePointsTrack,
  setupCuePoints,
  getStartDate,
  getCurrentPdt,
};
export * from './types';

export const getMediaPlaylistLinesFromMultivariantPlaylistSrc = async (src: string) => {
  return fetch(src)
    .then((resp) => resp.text())
    .then((multivariantPlaylistStr) => {
      const mediaPlaylistUrl = multivariantPlaylistStr.split('\n').find((_line, idx, lines) => {
        return idx && lines[idx - 1].startsWith('#EXT-X-STREAM-INF');
      }) as string;

      return fetch(mediaPlaylistUrl)
        .then((resp) => resp.text())
        .then((mediaPlaylistStr) => mediaPlaylistStr.split('\n'));
    });
};

export const getStreamInfoFromPlaylistLines = (playlistLines: string[]) => {
  const typeLine = playlistLines.find((line) => line.startsWith('#EXT-X-PLAYLIST-TYPE')) ?? '';
  const playlistType = typeLine.split(':')[1]?.trim() as HlsPlaylistTypes;
  const streamType = toStreamTypeFromPlaylistType(playlistType);
  const targetLiveWindow = toTargetLiveWindowFromPlaylistType(playlistType);

  // Computation of the live edge start offset per media-ui-extensions proposal. See: https://github.com/video-dev/media-ui-extensions/blob/main/proposals/0007-live-edge.md#recommended-computation-for-rfc8216bis12-aka-hls (CJP)
  let liveEdgeStartOffset = undefined;

  if (streamType === StreamTypes.LIVE) {
    // Required if playlist contains one or more EXT-X-PART tags. See: https://datatracker.ietf.org/doc/html/draft-pantos-hls-rfc8216bis-12#section-4.4.3.7 (CJP)
    const partInfLine = playlistLines.find((line) => line.startsWith('#EXT-X-PART-INF'));
    const lowLatency = !!partInfLine;

    if (lowLatency) {
      // The EXT-X-PART-INF only has one in-spec named attribute, PART-TARGET, which is required,
      // so parsing & casting presumptuously here. See spec link above for more info. (CJP)
      const partTarget = +partInfLine.split(':')[1].split('=')[1];
      liveEdgeStartOffset = partTarget * 2;
    } else {
      // This is required for all media playlists. See: https://datatracker.ietf.org/doc/html/draft-pantos-hls-rfc8216bis-12#section-4.4.3.1 (CJP)
      const targetDurationLine = playlistLines.find((line) => line.startsWith('#EXT-X-TARGETDURATION')) as string;
      // EXT-X-TARGETDURATION has exactly one unnamed attribute that represents the target duration value, which is required,
      // so parsing and casting presumptuously here. See spec link above for more info. (CJP)
      const targetDuration = +targetDurationLine.split(':')[1];
      liveEdgeStartOffset = targetDuration * 3;
    }
  }

  return {
    streamType,
    targetLiveWindow,
    liveEdgeStartOffset,
  };
};

export const getStreamInfoFromSrcAndType = async (src: string, type?: MediaTypes | '') => {
  if (type === ExtensionMimeTypeMap.MP4) {
    return {
      streamType: StreamTypes.ON_DEMAND,
      targetLiveWindow: Number.NaN,
      liveEdgeStartOffset: undefined,
    };
  }

  if (type === ExtensionMimeTypeMap.M3U8) {
    const playlistLines = await getMediaPlaylistLinesFromMultivariantPlaylistSrc(src);
    return getStreamInfoFromPlaylistLines(playlistLines);
  }

  // Unknown or undefined type.
  console.error(`Media type ${type} is an unrecognized or unsupported type for src ${src}.`);
  return {
    streamType: undefined,
    targetLiveWindow: undefined,
    liveEdgeStartOffset: undefined,
  };
};

export const updateStreamInfoFromSrc = async (
  src: string,
  mediaEl: HTMLMediaElement,
  type: MediaTypes | '' = getType({ src })
) => {
  const { streamType, targetLiveWindow, liveEdgeStartOffset } = await getStreamInfoFromSrcAndType(src, type);

  (muxMediaState.get(mediaEl) ?? {}).liveEdgeStartOffset = liveEdgeStartOffset;

  (muxMediaState.get(mediaEl) ?? {}).targetLiveWindow = targetLiveWindow;
  mediaEl.dispatchEvent(new CustomEvent('targetlivewindowchange', { composed: true, bubbles: true }));

  (muxMediaState.get(mediaEl) ?? {}).streamType = streamType;
  mediaEl.dispatchEvent(new CustomEvent('streamtypechange', { composed: true, bubbles: true }));
};

export const getStreamInfoFromHlsjsLevelDetails = (levelDetails: any) => {
  const playlistType: HlsPlaylistTypes = levelDetails.type as HlsPlaylistTypes;

  const streamType = toStreamTypeFromPlaylistType(playlistType);
  const targetLiveWindow = toTargetLiveWindowFromPlaylistType(playlistType);
  let liveEdgeStartOffset = undefined;
  const lowLatency = !!levelDetails.partList?.length;
  if (streamType === StreamTypes.LIVE) {
    liveEdgeStartOffset = lowLatency ? levelDetails.partTarget * 2 : levelDetails.targetduration * 3;
  }

  return {
    streamType,
    targetLiveWindow,
    liveEdgeStartOffset,
    lowLatency,
  };
};

export const updateStreamInfoFromHlsjsLevelDetails = (
  levelDetails: any,
  mediaEl: HTMLMediaElement,
  hls: HlsInterface
) => {
  const { streamType, targetLiveWindow, liveEdgeStartOffset, lowLatency } =
    getStreamInfoFromHlsjsLevelDetails(levelDetails);

  if (streamType === StreamTypes.LIVE) {
    // Update hls.js config for live/ll-live
    if (lowLatency) {
      hls.config.backBufferLength = hls.userConfig.backBufferLength ?? 4;
      hls.config.maxFragLookUpTolerance = hls.userConfig.maxFragLookUpTolerance ?? 0.001;
      // For ll-hls, ensure that up switches are weighted the same as down switches to mitigate
      // cases of getting stuck at lower bitrates.
      hls.config.abrBandWidthUpFactor = hls.userConfig.abrBandWidthUpFactor ?? hls.config.abrBandWidthFactor;
    } else {
      hls.config.backBufferLength = hls.userConfig.backBufferLength ?? 8;
    }

    // Proxy `seekable.end()` to constrain based on rules in
    // https://github.com/video-dev/media-ui-extensions/blob/main/proposals/0007-live-edge.md#property-constraint-on-htmlmediaelementseekableend-to-model-seekable-live-edge
    const seekable: TimeRanges = Object.freeze({
      get length() {
        return mediaEl.seekable.length;
      },
      start(index: number) {
        return mediaEl.seekable.start(index);
      },
      end(index: number) {
        if (index > this.length) return mediaEl.seekable.end(index);
        return hls.liveSyncPosition ?? mediaEl.seekable.end(index);
      },
    });
    (muxMediaState.get(mediaEl) ?? {}).seekable = seekable;
  }

  (muxMediaState.get(mediaEl) ?? {}).liveEdgeStartOffset = liveEdgeStartOffset;

  (muxMediaState.get(mediaEl) ?? {}).targetLiveWindow = targetLiveWindow;
  mediaEl.dispatchEvent(new CustomEvent('targetlivewindowchange', { composed: true, bubbles: true }));

  (muxMediaState.get(mediaEl) ?? {}).streamType = streamType;
  mediaEl.dispatchEvent(new CustomEvent('streamtypechange', { composed: true, bubbles: true }));
};

const userAgentStr = globalThis?.navigator?.userAgent ?? '';
const isAndroid = userAgentStr.toLowerCase().indexOf('android') !== -1;

// NOTE: Exporting for testing
export const muxMediaState: WeakMap<
  HTMLMediaElement,
  Partial<MuxMediaProps> & { seekable?: TimeRanges; liveEdgeStartOffset?: number }
> = new WeakMap();

const MUX_VIDEO_DOMAIN = 'mux.com';
const MSE_SUPPORTED = Hls.isSupported?.();
const DEFAULT_PREFER_MSE = isAndroid;

export const generatePlayerInitTime = () => {
  return mux.utils.now();
};

export const generateUUID = mux.utils.generateUUID;

export const toMuxVideoURL = (playbackId?: string, { domain = MUX_VIDEO_DOMAIN, maxResolution = '' } = {}) => {
  if (!playbackId) return undefined;
  const [idPart, queryPart = ''] = toPlaybackIdParts(playbackId);
  const url = new URL(`https://stream.${domain}/${idPart}.m3u8${queryPart}`);
  if (maxResolution) {
    url.searchParams.set('max_resolution', maxResolution);
  }
  return url.toString();
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

export const getStreamType = (mediaEl: HTMLMediaElement) => {
  return muxMediaState.get(mediaEl)?.streamType ?? StreamTypes.UNKNOWN;
};

export const getTargetLiveWindow = (mediaEl: HTMLMediaElement) => {
  return muxMediaState.get(mediaEl)?.targetLiveWindow ?? Number.NaN;
};

export const getSeekable = (mediaEl: HTMLMediaElement) => {
  return muxMediaState.get(mediaEl)?.seekable ?? mediaEl.seekable;
};

export const getLiveEdgeStart = (mediaEl: HTMLMediaElement) => {
  const liveEdgeStartOffset = muxMediaState.get(mediaEl)?.liveEdgeStartOffset;
  if (typeof liveEdgeStartOffset !== 'number') return Number.NaN;
  const seekable = getSeekable(mediaEl);
  // We aren't guaranteed that seekable is ready before invoking this, so handle that case.
  if (!seekable.length) return Number.NaN;
  return seekable.end(seekable.length - 1) - liveEdgeStartOffset;
};

const isApproximatelyEqual = (x: number, y: number, moe = 0.001) => Math.abs(x - y) <= moe;
const isApproximatelyGTE = (x: number, y: number, moe = 0.001) => x > y || isApproximatelyEqual(x, y, moe);

export const isPseudoEnded = (mediaEl: HTMLMediaElement) => {
  return mediaEl.paused && isApproximatelyGTE(mediaEl.currentTime, mediaEl.duration);
};

export const getEnded = (mediaEl: HTMLMediaElement, hls?: HlsInterface) => {
  // Since looping media never truly ends, don't apply pseudo-ended logic
  if (mediaEl.loop || !!hls) return mediaEl.ended;
  return mediaEl.ended || isPseudoEnded(mediaEl);
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
  setupCuePoints(mediaEl);
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
    Pick<MuxMediaPropsInternal, 'debug' | 'streamType' | 'type' | 'startTime' | 'metadata' | 'preferCmcd'>
  >,
  mediaEl: Pick<HTMLMediaElement, 'canPlayType'>
) => {
  const { debug, streamType, startTime: startPosition = -1, metadata, preferCmcd } = props;
  const type = getType(props);
  const hlsType = type === ExtensionMimeTypeMap.M3U8;
  const shouldUseNative = useNative(props, mediaEl);

  // 1. if we are trying to play an hls media source create hls if we should be using it "under the hood"
  if (hlsType && !shouldUseNative && MSE_SUPPORTED) {
    const defaultConfig = {
      backBufferLength: 30,
      renderTextTracksNatively: false,
      liveDurationInfinity: true,
      capLevelToPlayerSize: true,
      capLevelOnFPSDrop: true,
    };
    const streamTypeConfig = getStreamTypeConfig(streamType);
    // NOTE: `metadata.view_session_id` & `metadata.video_id` are guaranteed here (CJP)
    const cmcd =
      preferCmcd !== CmcdTypes.NONE
        ? {
            useHeaders: preferCmcd === CmcdTypes.HEADER,
            sessionId: metadata?.view_session_id,
            contentId: metadata?.video_id,
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
    }) as HlsInterface;

    return hls;
  }
  return undefined;
};

export const getStreamTypeConfig = (streamType?: ValueOf<StreamTypes>) => {
  // for regular live videos, set backBufferLength to 8
  if (streamType === StreamTypes.LIVE) {
    const liveConfig = {
      backBufferLength: 8,
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
  hlsjs?: HlsInterface
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

export const loadMedia = (props: Partial<MuxMediaProps>, mediaEl: HTMLMediaElement, hls?: HlsInterface) => {
  const shouldUseNative = useNative(props, mediaEl);
  const { src } = props;
  if (mediaEl && shouldUseNative) {
    const type = getType(props);
    if (typeof src === 'string') {
      if (mediaEl.preload === 'none') {
        addEventListenerWithTeardown(mediaEl, 'loadstart', () => updateStreamInfoFromSrc(src, mediaEl, type));
      } else {
        updateStreamInfoFromSrc(src, mediaEl, type);
      }

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
    mediaEl.addEventListener(
      'emptied',
      () => {
        const trackEls: NodeListOf<HTMLTrackElement> = mediaEl.querySelectorAll('track[data-removeondestroy]');
        trackEls.forEach((trackEl) => {
          trackEl.remove();
        });
      },
      { once: true }
    );
    const maybeDispatchEndedCallback = () => {
      // We want to early bail if the underlying media element is already in an ended state,
      // since that means it will have already fired the ended event.
      // Do the "cheaper" check first
      if (mediaEl.ended) return;
      if (!getEnded(mediaEl)) return;
      // This means we've "pseudo-ended". Dispatch an event to notify the outside world.
      mediaEl.dispatchEvent(new Event('ended'));
    };
    addEventListenerWithTeardown(mediaEl, 'pause', maybeDispatchEndedCallback);
    // NOTE: Browsers do not consistently fire an 'ended' event upon seeking to the
    // end of the media while already paused. This was due to an ambiguity in the
    // HTML specification, but is now more explicit.
    // See: https://html.spec.whatwg.org/multipage/media.html#reaches-the-end (CJP)
    addEventListenerWithTeardown(mediaEl, 'seeked', maybeDispatchEndedCallback);

    addEventListenerWithTeardown(mediaEl, 'play', () => {
      if (mediaEl.ended) return;
      if (!isApproximatelyGTE(mediaEl.currentTime, mediaEl.duration)) return;
      // If we were "pseudo-ended" before playback was attempted, seek back to the
      // beginning to "replay", like "real" ended behavior.
      mediaEl.currentTime = mediaEl.seekable.start(0);
    });
  } else if (hls && src) {
    hls.once(Hls.Events.LEVEL_LOADED, (_evt, data) => {
      updateStreamInfoFromHlsjsLevelDetails(data.details, mediaEl, hls);
    });
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

    setupRenditions(props as MediaTracks, hls);
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

  (muxMediaState.get(mediaEl) ?? {}).error = error as unknown as HTMLMediaElement['error'];

  // Only pass valid mux-embed props: player_error_code, player_error_message, player_error_context
  mediaEl.mux?.emit('error', {
    player_error_code: error.code,
    player_error_message: error.message,
    player_error_context: error.context,
  });
}
