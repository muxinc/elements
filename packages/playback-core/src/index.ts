/* eslint @typescript-eslint/triple-slash-reference: "off" */
/// <reference path="../../../node_modules/mux-embed/dist/types/mux-embed.d.ts" />
import mux, { ErrorEvent } from 'mux-embed';
import Hls from './hls';
import type { HlsInterface } from './hls';
import { MediaError } from './errors';
import { setupAutoplay } from './autoplay';
import { setupPreload } from './preload';
import { setupMediaTracks } from './media-tracks';
import {
  setupTextTracks,
  addTextTrack,
  removeTextTrack,
  getTextTrack,
  addCuePoints,
  getCuePoints,
  getActiveCuePoint,
  setupCuePoints,
  addChapters,
  getChapters,
  getActiveChapter,
  setupChapters,
} from './text-tracks';
import { getStartDate, getCurrentPdt } from './pdt';
import {
  inSeekableRange,
  toPlaybackIdParts,
  getType,
  toStreamTypeFromPlaylistType,
  toTargetLiveWindowFromPlaylistType,
  addEventListenerWithTeardown,
} from './util';
import type {
  ValueOf,
  PlaybackCore,
  MuxMediaProps,
  MuxMediaPropsInternal,
  MaxResolutionValue,
  MinResolutionValue,
  RenditionOrderValue,
} from './types';
import { StreamTypes, PlaybackTypes, ExtensionMimeTypeMap, CmcdTypes, HlsPlaylistTypes, MediaTypes } from './types';
import type { HlsConfig } from 'hls.js';
// import { MediaKeySessionContext } from 'hls.js';
export {
  mux,
  Hls,
  MediaError,
  addTextTrack,
  removeTextTrack,
  getTextTrack,
  addCuePoints,
  getCuePoints,
  getActiveCuePoint,
  setupCuePoints,
  addChapters,
  getChapters,
  getActiveChapter,
  setupChapters,
  getStartDate,
  getCurrentPdt,
};
export * from './types';

const DRMType = {
  FAIRPLAY: 'fairplay',
  PLAYREADY: 'playready',
  WIDEVINE: 'widevine',
} as const;

type DRMTypeValue = (typeof DRMType)[keyof typeof DRMType];
export const toDRMTypeFromKeySystem = (keySystem: string): DRMTypeValue | undefined => {
  if (keySystem.includes('fps')) return DRMType.FAIRPLAY;
  if (keySystem.includes('playready')) return DRMType.PLAYREADY;
  if (keySystem.includes('widevine')) return DRMType.WIDEVINE;
  return undefined;
};

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
      const targetDurationValue = targetDurationLine?.split(':')?.[1];
      // NOTE: Defaulting here and using optional chaining above since some people are seeing RTEs on iPhones under edge cases.
      // Identifying root cause would be ideal, but this will at least avoid the RTE. (CJP)
      const targetDuration = +(targetDurationValue ?? 6);
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
  hls: Pick<Hls, 'config' | 'userConfig' | 'liveSyncPosition'>
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
        // Defer to native seekable for:
        // 1) "out of range" cases
        // 2) "finite duration" media (whether live/"DVR" that has ended or on demand)
        if (index > this.length || index < 0 || Number.isFinite(mediaEl.duration)) return mediaEl.seekable.end(index);
        // Otherwise rely on the live sync position (but still fall back to native seekable when nullish)
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

type MuxVideoURLProps = Partial<{
  playbackId: string;
  customDomain: string;
  maxResolution: MaxResolutionValue;
  minResolution: MinResolutionValue;
  renditionOrder: RenditionOrderValue;
  programStartTime: number;
  programEndTime: number;
  tokens: Partial<{
    playback: string;
    storyboard: string;
    thumbnail: string;
  }>;
  extraSourceParams: Record<string, any>;
}>;

export const toMuxVideoURL = ({
  playbackId: playbackIdWithParams,
  customDomain: domain = MUX_VIDEO_DOMAIN,
  maxResolution,
  minResolution,
  renditionOrder,
  programStartTime,
  programEndTime,
  tokens: { playback: token } = {},
  extraSourceParams = {},
}: MuxVideoURLProps = {}) => {
  if (!playbackIdWithParams) return undefined;
  const [playbackId, queryPart = ''] = toPlaybackIdParts(playbackIdWithParams);
  const url = new URL(`https://stream.${domain}/${playbackId}.m3u8${queryPart}`);
  /*
   * All identified query params here can only be added to public
   * playback IDs. In order to use these features with signed URLs
   * the query param must be added to the signing token.
   *
   * */
  if (token || url.searchParams.has('token')) {
    url.searchParams.forEach((_, key) => {
      if (key != 'token') url.searchParams.delete(key);
    });
    if (token) url.searchParams.set('token', token);
  } else {
    if (maxResolution) {
      url.searchParams.set('max_resolution', maxResolution);
    }
    if (minResolution) {
      url.searchParams.set('min_resolution', minResolution);
      if (maxResolution && +maxResolution.slice(0, -1) < +minResolution.slice(0, -1)) {
        console.error(
          'minResolution must be <= maxResolution',
          'minResolution',
          minResolution,
          'maxResolution',
          maxResolution
        );
      }
    }
    if (renditionOrder) {
      url.searchParams.set('rendition_order', renditionOrder);
    }
    if (programStartTime) {
      url.searchParams.set('program_start_time', `${programStartTime}`);
    }
    if (programEndTime) {
      url.searchParams.set('program_end_time', `${programEndTime}`);
    }
    Object.entries(extraSourceParams).forEach(([k, v]) => {
      if (v == undefined) return;
      url.searchParams.set(k, v);
    });
  }
  return url.toString();
};

const toPlaybackIdFromParameterized = (playbackIdWithParams: string | undefined) => {
  if (!playbackIdWithParams) return undefined;
  const [playbackId] = playbackIdWithParams.split('?');
  // `|| undefined` is here to handle potential invalid cases
  return playbackId || undefined;
};

export const toPlaybackIdFromSrc = (src: string | undefined) => {
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

const DEFAULT_ENDED_MOE = 0.034;

const isApproximatelyEqual = (x: number, y: number, moe = DEFAULT_ENDED_MOE) => Math.abs(x - y) <= moe;
const isApproximatelyGTE = (x: number, y: number, moe = DEFAULT_ENDED_MOE) => x > y || isApproximatelyEqual(x, y, moe);

export const isPseudoEnded = (mediaEl: HTMLMediaElement, moe = DEFAULT_ENDED_MOE) => {
  return mediaEl.paused && isApproximatelyGTE(mediaEl.currentTime, mediaEl.duration, moe);
};

export const isStuckOnLastFragment = (
  mediaEl: HTMLMediaElement,
  hls?: Pick<
    Hls,
    /** Should we add audio fragments logic here, too? (CJP) */
    // | 'audioTrack'
    // | 'audioTracks'
    'levels' | 'currentLevel'
  >
) => {
  if (!hls || !mediaEl.buffered.length) return undefined;
  if (mediaEl.readyState > 2) return false;
  const videoLevelDetails =
    hls.currentLevel >= 0
      ? hls.levels?.[hls.currentLevel]?.details
      : hls.levels.find((level) => !!level.details)?.details;

  // Don't define for live streams (for now).
  if (!videoLevelDetails || videoLevelDetails.live) return undefined;

  const { fragments } = videoLevelDetails;

  // Don't give a definitive true|false before we have no fragments (for now).
  if (!fragments?.length) return undefined;

  // Do a cheap check up front to see if we're close to the end.
  // For more on TARGET_DURATION, see https://datatracker.ietf.org/doc/html/draft-pantos-hls-rfc8216bis-14#section-4.4.3.1 (CJP)
  if (mediaEl.currentTime < mediaEl.duration - (videoLevelDetails.targetduration + 0.5)) return false;

  const lastFragment = fragments[fragments.length - 1];

  // We're not yet playing the last fragment, so we can't be stuck on it.
  if (mediaEl.currentTime <= lastFragment.start) return false;

  const lastFragmentMidpoint = lastFragment.start + lastFragment.duration / 2;
  const lastBufferedStart = mediaEl.buffered.start(mediaEl.buffered.length - 1);
  const lastBufferedEnd = mediaEl.buffered.end(mediaEl.buffered.length - 1);

  // True if we've already buffered (half of) the last fragment
  const lastFragmentInBuffer = lastFragmentMidpoint > lastBufferedStart && lastFragmentMidpoint < lastBufferedEnd;
  // If we haven't buffered half already, assume we're still waiting to fetch+buffer the fragment, otherwise,
  // since we already checked the ready state, this means we're stuck on the last segment, and should pretend we're ended!
  return lastFragmentInBuffer;
};

export const getEnded = (
  mediaEl: HTMLMediaElement,
  hls?: Pick<
    Hls,
    /** Should we add audio fragments logic here, too? (CJP) */
    // | 'audioTrack'
    // | 'audioTracks'
    'levels' | 'currentLevel'
  >
) => {
  // Since looping media never truly ends, don't apply pseudo-ended logic
  // Also, trust when the HTMLMediaElement says we have ended (only apply pseudo-ended logic when it reports false)
  if (mediaEl.ended || mediaEl.loop) return mediaEl.ended;
  // Externalize conversion to boolean for "under-determined cases" here (See isStuckOnLastFragment() for details)
  if (hls && !!isStuckOnLastFragment(mediaEl, hls)) return true;
  return isPseudoEnded(mediaEl);
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

  // Used to signal DRM Type to Mux Data. See, e.g. `getDRMConfig()`
  const drmTypeCb = (drmType?: string) => {
    mediaEl.mux?.emit('hb', { view_drm_type: drmType });
  };

  props.drmTypeCb = drmTypeCb;

  muxMediaState.set(mediaEl as HTMLMediaElement, {});
  const nextHlsInstance = setupHls(props, mediaEl);
  const setPreload = setupPreload(props as Pick<MuxMediaProps, 'preload' | 'src'>, mediaEl, nextHlsInstance);
  setupMux(props, mediaEl, nextHlsInstance);
  loadMedia(props, mediaEl, nextHlsInstance);
  setupCuePoints(mediaEl);
  setupChapters(mediaEl);
  const setAutoplay = setupAutoplay(props as Pick<MuxMediaProps, 'autoplay'>, mediaEl, nextHlsInstance);

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
      | 'debug'
      | 'streamType'
      | 'type'
      | 'startTime'
      | 'metadata'
      | 'preferCmcd'
      | '_hlsConfig'
      | 'drmToken'
      | 'drmTypeCb'
    >
  >,
  mediaEl: Pick<HTMLMediaElement, 'canPlayType'>
) => {
  const { debug, streamType, startTime: startPosition = -1, metadata, preferCmcd, _hlsConfig = {} } = props;
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
    const drmConfig = getDRMConfig(props);
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
      xhrSetup: (xhr, url) => {
        if (preferCmcd && preferCmcd !== CmcdTypes.QUERY) return;
        const urlObj = new URL(url);
        if (!urlObj.searchParams.has('CMCD')) return;
        const cmcdVal = (urlObj.searchParams.get('CMCD')?.split(',') ?? [])
          .filter((cmcdKVStr) => cmcdKVStr.startsWith('sid') || cmcdKVStr.startsWith('cid'))
          .join(',');
        urlObj.searchParams.set('CMCD', cmcdVal);

        xhr.open('GET', urlObj);
      },
      ...defaultConfig,
      ...streamTypeConfig,
      ...drmConfig,
      ..._hlsConfig,
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

export const getDRMConfig = (
  props: Partial<Pick<MuxMediaPropsInternal, 'src' | 'playbackId' | 'drmToken' | 'customDomain' | 'drmTypeCb'>>
): Partial<HlsConfig> => {
  const {
    drmToken,
    src,
    playbackId = toPlaybackIdFromSrc(src), // Since Mux Player typically sets `src` instead of `playbackId`, fall back to it here (CJP)
    drmTypeCb,
  } = props;
  if (!drmToken || !playbackId) return {};
  return {
    emeEnabled: true,
    drmSystems: {
      'com.apple.fps': {
        licenseUrl: toLicenseKeyURL(props, 'fairplay'),
        serverCertificateUrl: toAppCertURL(props, 'fairplay'),
      },
      'com.widevine.alpha': {
        licenseUrl: toLicenseKeyURL(props, 'widevine'),
      },
      'com.microsoft.playready': {
        licenseUrl: toLicenseKeyURL(props, 'playready'),
      },
    },
    requestMediaKeySystemAccessFunc: (keySystem, supportedConfigurations) => {
      if (keySystem === 'com.widevine.alpha') {
        supportedConfigurations = [
          // NOTE: For widevine, by default we'll duplicate the key system configs but add L1-level
          // security to the first set of duplicates so the key system will "prefer" that
          // if/when available. (CJP)
          // See, e.g.: https://developer.mozilla.org/en-US/docs/Web/API/Navigator/requestMediaKeySystemAccess#supportedconfigurations
          ...supportedConfigurations.map((mediaKeySystemConfig) => {
            const videoCapabilities = mediaKeySystemConfig.videoCapabilities?.map((capability) => {
              return {
                ...capability,
                robustness: 'HW_SECURE_ALL',
              };
            });
            return {
              ...mediaKeySystemConfig,
              videoCapabilities,
            };
          }),
          ...supportedConfigurations,
        ];
      }
      return navigator.requestMediaKeySystemAccess(keySystem, supportedConfigurations).then((value) => {
        const drmType = toDRMTypeFromKeySystem(keySystem);
        drmTypeCb?.(drmType);
        return value;
      });
    },
  };
};

export const getAppCertificate = async (appCertificateUrl: string) => {
  const resp = await fetch(appCertificateUrl);
  const body = await resp.arrayBuffer();
  return body;
};

export const getLicenseKey = async (message: ArrayBuffer, licenseServerUrl: string) => {
  const licenseResponse = await fetch(licenseServerUrl, {
    method: 'POST',
    headers: { 'Content-type': 'application/octet-stream' },
    body: message,
  });
  const keyBuffer = await licenseResponse.arrayBuffer();
  return new Uint8Array(keyBuffer);
};

export const setupNativeFairplayDRM = (
  props: Partial<Pick<MuxMediaPropsInternal, 'playbackId' | 'drmToken' | 'customDomain' | 'drmTypeCb'>>,
  mediaEl: HTMLMediaElement
) => {
  const onFpEncrypted = async (event: MediaEncryptedEvent) => {
    try {
      const initDataType = event.initDataType;
      if (initDataType !== 'skd') {
        console.error(`Received unexpected initialization data type "${initDataType}"`);
        return;
      }

      if (!mediaEl.mediaKeys) {
        const access = await navigator
          .requestMediaKeySystemAccess('com.apple.fps', [
            {
              initDataTypes: [initDataType],
              videoCapabilities: [{ contentType: 'application/vnd.apple.mpegurl', robustness: '' }],
              distinctiveIdentifier: 'not-allowed',
              persistentState: 'not-allowed',
              sessionTypes: ['temporary'],
            },
          ])
          .then((value) => {
            props.drmTypeCb?.(DRMType.FAIRPLAY);
            return value;
          });

        const keys = await access.createMediaKeys();

        const fairPlayAppCert = await getAppCertificate(toAppCertURL(props, 'fairplay'));
        await keys.setServerCertificate(fairPlayAppCert);
        await mediaEl.setMediaKeys(keys);
      }

      const initData = event.initData;
      if (initData == null) {
        console.error(`Could not start encrypted playback due to missing initData in ${event.type} event`);
        return;
      }

      const session = (mediaEl.mediaKeys as MediaKeys).createSession();
      session.generateRequest(initDataType, initData);
      const message = await new Promise<MediaKeyMessageEvent['message']>((resolve) => {
        session.addEventListener(
          'message',
          (messageEvent) => {
            resolve(messageEvent.message);
          },
          { once: true }
        );
      });

      const response = await getLicenseKey(message, toLicenseKeyURL(props, 'fairplay'));
      await session.update(response);
      return session;
    } catch (e) {
      console.error(`Could not start encrypted playback due to exception "${e}"`);
    }
  };

  addEventListenerWithTeardown(mediaEl, 'encrypted', onFpEncrypted);
};

export const toLicenseKeyURL = (
  {
    playbackId,
    drmToken: token,
    customDomain = MUX_VIDEO_DOMAIN,
  }: Partial<Pick<MuxMediaPropsInternal, 'playbackId' | 'drmToken' | 'customDomain'>>,
  scheme: 'widevine' | 'playready' | 'fairplay'
) => {
  // NOTE: Mux Video currently doesn't support custom domains for license/DRM endpoints, but
  // customDomain can also be used for internal use cases, so treat that as an exception case for now. (CJP)
  const domain = customDomain.toLocaleLowerCase().endsWith(MUX_VIDEO_DOMAIN) ? customDomain : MUX_VIDEO_DOMAIN;
  return `https://license.${domain}/license/${scheme}/${playbackId}?token=${token}`;
};

export const toAppCertURL = (
  {
    playbackId,
    drmToken: token,
    customDomain = MUX_VIDEO_DOMAIN,
  }: Partial<Pick<MuxMediaPropsInternal, 'playbackId' | 'drmToken' | 'customDomain'>>,
  scheme: 'widevine' | 'playready' | 'fairplay'
) => {
  // NOTE: Mux Video currently doesn't support custom domains for license/DRM endpoints, but
  // customDomain can also be used for internal use cases, so treat that as an exception case for now. (CJP)
  const domain = customDomain.toLocaleLowerCase().endsWith(MUX_VIDEO_DOMAIN) ? customDomain : MUX_VIDEO_DOMAIN;
  return `https://license.${domain}/appcert/${scheme}/${playbackId}?token=${token}`;
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
      | 'disableTracking'
    >
  >,
  mediaEl: HTMLMediaElement,
  hlsjs?: HlsInterface
) => {
  const { envKey: env_key, disableTracking } = props;
  const inferredEnv = isMuxVideoSrc(props);

  if (!disableTracking && (env_key || inferredEnv)) {
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
  props: Partial<
    Pick<
      MuxMediaProps,
      | 'preferPlayback'
      | 'src'
      | 'type'
      | 'startTime'
      | 'streamType'
      | 'autoplay'
      | 'playbackId'
      | 'drmToken'
      | 'customDomain'
    >
  >,
  mediaEl: HTMLMediaElement,
  hls?: Pick<
    Hls,
    | 'config'
    | 'on'
    | 'once'
    | 'off'
    | 'trigger'
    | 'startLoad'
    | 'stopLoad'
    | 'recoverMediaError'
    | 'destroy'
    | 'loadSource'
    | 'attachMedia'
    | 'liveSyncPosition'
    | 'subtitleTracks'
    | 'subtitleTrack'
    | 'userConfig'
    | 'audioTrack'
    | 'audioTracks'
    | 'autoLevelEnabled'
    | 'nextLevel'
    | 'levels'
    | 'currentLevel'
  >
) => {
  const shouldUseNative = useNative(props, mediaEl);
  const { src } = props;

  const maybeDispatchEndedCallback = () => {
    // We want to early bail if the underlying media element is already in an ended state,
    // since that means it will have already fired the ended event.
    // Do the "cheaper" check first
    if (mediaEl.ended) return;
    const pseudoEnded = getEnded(mediaEl, hls);
    if (!pseudoEnded) return;

    if (isStuckOnLastFragment(mediaEl, hls)) {
      // Nudge the playhead in this case.
      mediaEl.currentTime = mediaEl.buffered.end(mediaEl.buffered.length - 1);
    } else {
      mediaEl.dispatchEvent(new Event('ended'));
    }
  };

  let prevSeekableStart: number;
  let prevSeekableEnd: number;

  const seekableChange = () => {
    const nextSeekableStart = getSeekable(mediaEl)?.start(0);
    const nextSeekableEnd = getSeekable(mediaEl)?.end(0);
    if (prevSeekableEnd !== nextSeekableEnd || prevSeekableStart !== nextSeekableStart) {
      mediaEl.dispatchEvent(new CustomEvent('seekablechange', { composed: true }));
    }
    prevSeekableStart = nextSeekableStart;
    prevSeekableEnd = nextSeekableEnd;
  };

  // Make sure we track transitions from infinite to finite durations for seekable changes as well.
  addEventListenerWithTeardown(mediaEl, 'durationchange', seekableChange);

  if (mediaEl && shouldUseNative) {
    const type = getType(props);
    if (typeof src === 'string') {
      // NOTE: This should only be invoked after stream type has been
      // derived after stream type has been determined.
      const setupSeekableChangePoll = () => {
        // Only monitor for seekable updates if StreamType is "live" and duration is not finite.
        if (getStreamType(mediaEl) !== StreamTypes.LIVE || Number.isFinite(mediaEl.duration)) return;

        // Use 1 second since in this context we don't know what the rate of updates
        // should/will be.
        // NOTE: We *could* derive the interval rate if we wanted to add logic to our playlist parsing to
        // account for the per-spec rate of media playlist GETs. See:
        // https://datatracker.ietf.org/doc/html/draft-pantos-hls-rfc8216bis-14#section-6.3.4 (CJP)
        const intervalId = setInterval(seekableChange, 1000);

        // Make sure we clean up after ourselves.
        mediaEl.addEventListener(
          'teardown',
          () => {
            clearInterval(intervalId);
          },
          { once: true }
        );

        // Assume we're done updating seekable when the duration is finite, which
        // occurs when e.g. an HLS playlist is ended (`#EXT-X-ENDLIST`).
        addEventListenerWithTeardown(mediaEl, 'durationchange', () => {
          if (!Number.isFinite(mediaEl.duration)) return;
          clearInterval(intervalId);
        });
      };
      if (mediaEl.preload === 'none') {
        // NOTE: Previously, we relied on the 'loadstart' event to fetch & parse playlists for stream
        // info for native playback scenarios. Unfortunately, per spec this event will be dispatched
        // regardless of the preload state and regardless of whether or not fetching of the src media
        // has, in fact, begun. In order to respect the provided preferences and avoid eager loading
        // while still attempting to begin fetching playlists for stream info as early as possible when
        // media *will* be loaded, we will do a "first to the finish line" on both the 'play' event,
        // which will be dispatched earlier *if* it is the event that initiates media loading, and the
        // 'loadedmetadata' event, which is dispatched only after the media has finished loading metadata,
        // but will reliably correlate with media loading. (CJP)
        // For more, see: Steps 7 & 8 of 'the resource selection algorithm' from §4.8.11.5 Loading the
        // media resource in the HTML Living Standard
        // (https://html.spec.whatwg.org/multipage/media.html#concept-media-load-algorithm)
        const playHandler = () => {
          updateStreamInfoFromSrc(src, mediaEl, type).then(setupSeekableChangePoll);
          mediaEl.removeEventListener('loadedmetadata', loadedMetadataHandler);
        };
        const loadedMetadataHandler = () => {
          updateStreamInfoFromSrc(src, mediaEl, type).then(setupSeekableChangePoll);
          mediaEl.removeEventListener('play', playHandler);
        };
        addEventListenerWithTeardown(mediaEl, 'play', playHandler, { once: true });
        addEventListenerWithTeardown(mediaEl, 'loadedmetadata', loadedMetadataHandler, { once: true });
      } else {
        updateStreamInfoFromSrc(src, mediaEl, type).then(setupSeekableChangePoll);
      }

      // NOTE: Currently use drmToken to signal that playback is expected to be DRM-protected
      if (props.drmToken) {
        setupNativeFairplayDRM(props, mediaEl);
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
      mediaEl.currentTime = mediaEl.seekable.length ? mediaEl.seekable.start(0) : 0;
    });
  } else if (hls && src) {
    hls.once(Hls.Events.LEVEL_LOADED, (_evt, data) => {
      updateStreamInfoFromHlsjsLevelDetails(data.details, mediaEl, hls);
      seekableChange();
      // Only monitor for seekable updates if StreamType is "live" and duration is not finite.
      if (getStreamType(mediaEl) === StreamTypes.LIVE && !Number.isFinite(mediaEl.duration)) {
        hls.on(Hls.Events.LEVEL_UPDATED, seekableChange);

        // Assume we're done updating seekable when the duration is finite, which
        // occurs when e.g. an HLS playlist is ended (`#EXT-X-ENDLIST`).
        addEventListenerWithTeardown(mediaEl, 'durationchange', () => {
          if (!Number.isFinite(mediaEl.duration)) return;
          hls.off(Hls.Events.LEVELS_UPDATED, seekableChange);
        });
      }
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
    addEventListenerWithTeardown(mediaEl, 'waiting', maybeDispatchEndedCallback);

    setupMediaTracks(props as HTMLMediaElement, hls);
    setupTextTracks(mediaEl, hls);

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
