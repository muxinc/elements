import type { ValueOf, PlaybackCore, MuxMediaProps, MuxMediaPropsInternal, MuxMediaPropTypes } from './types';
import mux, { ErrorEvent } from 'mux-embed';
import Hls from './hls';
import type { HlsInterface } from './hls';
import { CapLevelController, ErrorData, HlsConfig } from 'hls.js';
import { MediaError, MuxErrorCategory, MuxErrorCode, errorCategoryToTokenNameOrPrefix } from './errors';
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
  i18n,
  parseJwt,
} from './util';
import { StreamTypes, PlaybackTypes, ExtensionMimeTypeMap, CmcdTypes, HlsPlaylistTypes, MediaTypes } from './types';
import { getErrorFromResponse, MuxJWTAud } from './request-errors';
import MinCapLevelController from './min-cap-level-controller';
import { setupWebkitNativeFairplayDRM } from './webkit-fairplay';
import { setupEmeNativeFairplayDRM } from './eme-fairplay';

export {
  mux,
  Hls,
  MediaError,
  MuxErrorCategory,
  MuxErrorCode,
  errorCategoryToTokenNameOrPrefix,
  MuxJWTAud,
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
  toPlaybackIdParts,
  i18n,
  parseJwt,
  MinCapLevelController,
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

export const getMediaPlaylistFromMultivariantPlaylist = (multivariantPlaylist: string) => {
  const mediaPlaylistUrl = multivariantPlaylist.split('\n').find((_line, idx, lines) => {
    return idx && lines[idx - 1].startsWith('#EXT-X-STREAM-INF');
  }) as string;

  return fetch(mediaPlaylistUrl).then((resp) => {
    if (resp.status !== 200) {
      return Promise.reject(resp);
    }
    return resp.text();
  });
};

export const getMultivariantPlaylistSessionData = (playlist: string) => {
  // See https://datatracker.ietf.org/doc/html/draft-pantos-hls-rfc8216bis-12#section-4.4.6.4
  const sessionDataLines = playlist.split('\n').filter((line) => line.startsWith('#EXT-X-SESSION-DATA'));
  if (!sessionDataLines.length) return {};

  const sessionData: Record<string, Record<string, string>> = {};

  for (const line of sessionDataLines) {
    const sessionDataAttrs = parseTagAttributes(line);
    const dataId = sessionDataAttrs['DATA-ID'];
    if (!dataId) continue;

    sessionData[dataId] = { ...sessionDataAttrs };
  }

  return {
    sessionData,
  };
};

// matches all HLS attribute name=value pairs, with or without quotes, using per spec rules
// for matching AttributeName (See: https://datatracker.ietf.org/doc/html/draft-pantos-hls-rfc8216bis-17#section-4.2)
const ATTR_LIST_REGEX = /([A-Z0-9-]+)="?(.*?)"?(?:,|$)/g;
export function parseTagAttributes(str: string) {
  const matches = [...str.matchAll(ATTR_LIST_REGEX)];
  return Object.fromEntries(matches.map(([, key, value]) => [key, value]));
}

export const getStreamInfoFromPlaylist = (playlist: string) => {
  const playlistLines = playlist.split('\n');
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
      sessionData: undefined,
    };
  }

  if (type === ExtensionMimeTypeMap.M3U8) {
    const multivariantPlaylistResponse = await fetch(src);
    if (!multivariantPlaylistResponse.ok) {
      return Promise.reject(multivariantPlaylistResponse);
    }
    const multivariantPlaylist = await multivariantPlaylistResponse.text();
    const mediaPlaylist = await getMediaPlaylistFromMultivariantPlaylist(multivariantPlaylist);
    return {
      ...getMultivariantPlaylistSessionData(multivariantPlaylist),
      ...getStreamInfoFromPlaylist(mediaPlaylist),
    };
  }

  // Unknown or undefined type.
  console.error(`Media type ${type} is an unrecognized or unsupported type for src ${src}.`);
  return {
    streamType: undefined,
    targetLiveWindow: undefined,
    liveEdgeStartOffset: undefined,
    sessionData: undefined,
  };
};

export const updateStreamInfoFromSrc = async (
  src: string,
  mediaEl: HTMLMediaElement,
  type: MediaTypes | '' = getType({ src })
) => {
  const { streamType, targetLiveWindow, liveEdgeStartOffset, sessionData } = await getStreamInfoFromSrcAndType(
    src,
    type
  );

  const metadata = sessionData?.['com.apple.hls.chapters' as keyof typeof sessionData];
  if (metadata?.URI || metadata?.VALUE.toLocaleLowerCase().startsWith('http')) {
    // NOTE: data identified by DATA-ID 'com.apple.hls.chapters' is expected to provide its value
    // via a remote JSON source identified by the URI attribute. Providing VALUE as a fallback.
    // For more, see:
    // https://developer.apple.com/documentation/http-live-streaming/providing-javascript-object-notation-json-chapters#Specify-a-main-playlist
    fetchAndDispatchMuxMetadata(metadata.URI ?? metadata.VALUE, mediaEl);
  }

  (muxMediaState.get(mediaEl) ?? {}).liveEdgeStartOffset = liveEdgeStartOffset;

  (muxMediaState.get(mediaEl) ?? {}).targetLiveWindow = targetLiveWindow;
  mediaEl.dispatchEvent(new CustomEvent('targetlivewindowchange', { composed: true, bubbles: true }));

  (muxMediaState.get(mediaEl) ?? {}).streamType = streamType;
  mediaEl.dispatchEvent(new CustomEvent('streamtypechange', { composed: true, bubbles: true }));
};

export const fetchAndDispatchMuxMetadata = async (metadataUrl: string, mediaEl: HTMLMediaElement) => {
  try {
    const resp = await fetch(metadataUrl);
    if (!resp.ok) {
      throw new Error(`Failed to fetch Mux metadata: ${resp.status} ${resp.statusText}`);
    }

    const json = await resp.json();
    const metadata: Record<string, string> = {};

    if (!json?.[0]?.metadata) return;

    for (const item of json[0].metadata) {
      if (item.key && item.value) {
        metadata[item.key] = item.value;
      }
    }

    (muxMediaState.get(mediaEl) ?? {}).metadata = metadata;

    const eventUpdateMetadata = new CustomEvent('muxmetadata');
    mediaEl.dispatchEvent(eventUpdateMetadata);
  } catch (error) {
    console.error(error);
  }
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

declare global {
  interface NavigatorUAData {
    platform: string;
    mobile: boolean;
    brands: Array<{ brand: string; version: string }>;
  }

  interface Navigator {
    userAgentData?: NavigatorUAData;
  }
}

const userAgentStr = globalThis?.navigator?.userAgent ?? '';
const userAgentPlatform = globalThis?.navigator?.userAgentData?.platform ?? '';

// NOTE: Our primary *goal* with this is to detect "non-Apple-OS" platforms which may also support
// native HLS playback. Our primary concern with any check for this is "false negatives" where we
// identify an "Apple-OS" as a "non-Apple-OS". As such, instead of having logic to attempt to identify
// "!isAppleOS", we opt to target known platforms that can support both native playback and MSE/hls.js.
// For now, these are "Android or Android-like" platforms. If we end up matching platforms other than
// Android (or e.g. forks thereof), this is fine so long as it doesn't include Apple-OS platforms.
// Below are two strategies:
// 1. UA string parsing - here, we're extra cautious to only match if the UA string explicitly includes 'android'.
//   This is prone to false negatives (aka "Android or Android-like" platforms that yield false), since
//   detection using UA strings is intentionally and notoriously unreliable (See: https://developer.mozilla.org/en-US/docs/Web/HTTP/Browser_detection_using_the_user_agent)
//   and Google is even officially attempting to lock this down even more for security and privacy reasons
//   (See: https://developers.google.com/privacy-sandbox/blog/user-agent-reduction-android-model-and-version)
// 2. userAgentData.platform checking - here, we're matching either 'android' or 'x11', and could add more matches in the future
//    While still prone to false negatives, we can be a bit more aggressive with matches here for a few reasons.
//    First, navigator.userAgentData is still experimental, is only supported on a subset of Chromium browsers,
//    and neither Mozilla nor Webkit have even established an official browser support position. In other words,
//    Apple-OS Safari and even other Apple-OS browsers (including Chrome) will typically not even support this
//    feature, and, if and when they do, the purpose of this new API is to avoid obfuscatory information, so
//    we should be able to better trust userAgentData.platform to not result in erroneous matches.
const isAndroidLike =
  userAgentStr.toLowerCase().includes('android') ||
  ['x11', 'android'].some((platformStr) => userAgentPlatform.toLowerCase().includes(platformStr));

const isSafari = (mediaEl: Pick<HTMLMediaElement, 'canPlayType'>) =>
  /^((?!chrome|android).)*safari/i.test(userAgentStr) && !!mediaEl.canPlayType('application/vnd.apple.mpegurl');

// NOTE: Exporting for testing
export const muxMediaState: WeakMap<
  HTMLMediaElement,
  Partial<MuxMediaProps> & {
    seekable?: TimeRanges;
    liveEdgeStartOffset?: number;
    retryCount?: number;
    coreReference?: PlaybackCore;
  }
> = new WeakMap();

const MUX_VIDEO_DOMAIN = 'mux.com';
const MSE_SUPPORTED = Hls.isSupported?.();

const shouldDefaultToMSE = (mediaEl: Pick<HTMLMediaElement, 'canPlayType'>) => isAndroidLike || !isSafari(mediaEl);

export const generatePlayerInitTime = () => {
  // bail during SSR to avoid triggering prerender errors
  // actual time will be generated during hydration
  if (typeof window === 'undefined') return undefined;

  return mux.utils.now();
};

export const generateUUID = mux.utils.generateUUID;

type MuxVideoURLProps = Partial<
  Pick<
    MuxMediaPropTypes,
    | 'playbackId'
    | 'customDomain'
    | 'maxResolution'
    | 'minResolution'
    | 'renditionOrder'
    | 'programStartTime'
    | 'programEndTime'
    | 'assetStartTime'
    | 'assetEndTime'
    | 'tokens'
    | 'playbackToken'
    | 'extraSourceParams'
  >
>;

export const toMuxVideoURL = ({
  playbackId: playbackIdWithParams,
  customDomain: domain = MUX_VIDEO_DOMAIN,
  maxResolution,
  minResolution,
  renditionOrder,
  programStartTime,
  programEndTime,
  assetStartTime,
  assetEndTime,
  // Normalizes different ways of providing playback token
  playbackToken,
  tokens: { playback: token = playbackToken } = {},
  extraSourceParams = {},
}: MuxVideoURLProps = {}) => {
  if (!playbackIdWithParams) return undefined;
  // Normalizes different ways of providing playback id
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
    if (assetStartTime) {
      url.searchParams.set('asset_start_time', `${assetStartTime}`);
    }
    if (assetEndTime) {
      url.searchParams.set('asset_end_time', `${assetEndTime}`);
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
  const [playbackId] = new URL(src).pathname.slice(1).split(/\.m3u8|\//);
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

export const getMetadata = (mediaEl: HTMLMediaElement) => {
  return muxMediaState.get(mediaEl)?.metadata;
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

// Core could get updated if we re-initialize, for example: on FairPlay DRM fallback
export const getCoreReference = (mediaEl: HTMLMediaElement) => {
  return muxMediaState.get(mediaEl)?.coreReference;
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
  teardown(mediaEl, core, props);
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
  props.fallbackToWebkitFairplay = async () => {
    const wasPlaying = !mediaEl.paused;
    const currentTime = mediaEl.currentTime;

    props.useWebkitFairplay = true;

    // Prevent duplicate mux data
    const muxDataKeepSession = props.muxDataKeepSession;
    props.muxDataKeepSession = true;

    const oldCore = muxMediaState.get(mediaEl)?.coreReference;
    // This will tear oldCore down internally
    initialize(props, mediaEl, oldCore);

    props.muxDataKeepSession = muxDataKeepSession;
    // Try again for other src
    props.useWebkitFairplay = false;
    if (wasPlaying) {
      await mediaEl
        .play()
        .then(() => {
          mediaEl.currentTime = currentTime;
        })
        .catch(() => {});
    }
    mediaEl.currentTime = currentTime;
  };

  muxMediaState.set(mediaEl as HTMLMediaElement, { retryCount: 0 });
  const nextHlsInstance = setupHls(props, mediaEl);
  const setPreload = setupPreload(props as Pick<MuxMediaProps, 'preload' | 'src'>, mediaEl, nextHlsInstance);

  if (props?.muxDataKeepSession && mediaEl?.mux && !mediaEl.mux.deleted) {
    if (nextHlsInstance) {
      mediaEl.mux.addHLSJS({
        hlsjs: nextHlsInstance as HlsInterface,
        Hls: nextHlsInstance ? Hls : undefined,
      });
    }
  } else {
    setupMux(props, mediaEl, nextHlsInstance);
  }

  loadMedia(props, mediaEl, nextHlsInstance);
  setupCuePoints(mediaEl);
  setupChapters(mediaEl);
  const setAutoplay = setupAutoplay(props as Pick<MuxMediaProps, 'autoplay'>, mediaEl, nextHlsInstance);

  const newCore = {
    engine: nextHlsInstance,
    setAutoplay,
    setPreload,
  };

  const state = muxMediaState.get(mediaEl);
  if (state) {
    state.coreReference = newCore;
  }

  return newCore;
};

export const teardown = (
  mediaEl?: HTMLMediaElement | null,
  core?: PlaybackCore,
  props?: Partial<MuxMediaPropsInternal>
) => {
  const hls = core?.engine;

  if (mediaEl?.mux && !mediaEl.mux.deleted) {
    if (props?.muxDataKeepSession) {
      if (hls) mediaEl.mux.removeHLSJS();
    } else {
      mediaEl.mux.destroy();
      delete mediaEl.mux;
    }
  }

  if (hls) {
    hls.detachMedia();
    hls.destroy();
  }

  if (mediaEl) {
    if (mediaEl.hasAttribute('src')) {
      mediaEl.removeAttribute('src');
      mediaEl.load();
    }
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
  const forceMse = MSE_SUPPORTED && (preferMse || shouldDefaultToMSE(mediaEl));

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
      | 'tokens'
      | 'drmTypeCb'
      | 'maxAutoResolution'
      | 'capRenditionToPlayerSize'
    >
  >,
  mediaEl: HTMLMediaElement
) => {
  const {
    debug,
    streamType,
    startTime: startPosition = -1,
    metadata,
    preferCmcd,
    _hlsConfig = {},
    maxAutoResolution,
  } = props;
  const type = getType(props);
  const hlsType = type === ExtensionMimeTypeMap.M3U8;
  const shouldUseNative = useNative(props, mediaEl);

  // 1. if we are trying to play an hls media source create hls if we should be using it "under the hood"
  if (hlsType && !shouldUseNative && MSE_SUPPORTED) {
    const defaultConfig = {
      backBufferLength: 30,
      renderTextTracksNatively: false,
      liveDurationInfinity: true,
      capLevelOnFPSDrop: true,
    };
    const streamTypeConfig = getStreamTypeConfig(streamType);
    const drmConfig = getDRMConfig(props);
    // NOTE: `metadata.view_session_id` & `metadata.video_id` are guaranteed here (CJP)
    // @ts-ignore
    const cmcd = [CmcdTypes.QUERY, CmcdTypes.HEADER].includes(preferCmcd)
      ? {
          useHeaders: preferCmcd === CmcdTypes.HEADER,
          sessionId: metadata?.view_session_id,
          contentId: metadata?.video_id,
        }
      : undefined;

    const capLevelControllerObj = getCapLevelControllerConfig(props, _hlsConfig);

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
      ...capLevelControllerObj,
      ...streamTypeConfig,
      ...drmConfig,
      ..._hlsConfig,
    }) as HlsInterface;

    if (capLevelControllerObj.capLevelController === MinCapLevelController) {
      if (maxAutoResolution !== undefined) {
        MinCapLevelController.setMaxAutoResolution(hls, maxAutoResolution);
      }
    }

    hls.on(Hls.Events.MANIFEST_PARSED, async function (_event, data) {
      const chapters = data.sessionData?.['com.apple.hls.chapters'];
      if (chapters?.URI || chapters?.VALUE.toLocaleLowerCase().startsWith('http')) {
        fetchAndDispatchMuxMetadata(chapters?.URI ?? chapters?.VALUE, mediaEl);
      }
    });

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
  props: Partial<Pick<MuxMediaPropsInternal, 'src' | 'playbackId' | 'tokens' | 'customDomain' | 'drmTypeCb'>>
): Partial<HlsConfig> => {
  const {
    tokens: { drm: drmToken } = {},
    playbackId: playbackIdWithOptionalParams, // Since Mux Player typically sets `src` instead of `playbackId`, fall back to it here (CJP)
    drmTypeCb,
  } = props;
  const playbackId = toPlaybackIdFromParameterized(playbackIdWithOptionalParams);
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
  if (resp.status !== 200) {
    return Promise.reject(resp);
  }
  const body = await resp.arrayBuffer();
  return body;
};

export const getLicenseKey = async (message: ArrayBuffer, licenseServerUrl: string) => {
  const resp = await fetch(licenseServerUrl, {
    method: 'POST',
    headers: { 'Content-type': 'application/octet-stream' },
    body: message,
  });
  if (resp.status !== 200) {
    return Promise.reject(resp);
  }
  const keyBuffer = await resp.arrayBuffer();
  return new Uint8Array(keyBuffer);
};

export const setupNativeFairplayDRM = (
  props: Partial<
    Pick<
      MuxMediaPropsInternal,
      | 'playbackId'
      | 'tokens'
      | 'playbackToken'
      | 'customDomain'
      | 'drmTypeCb'
      | 'useWebkitFairplay'
      | 'fallbackToWebkitFairplay'
    >
  >,
  mediaEl: HTMLMediaElement
) => {
  const getAppCertificateHandler = () =>
    getAppCertificate(toAppCertURL(props, 'fairplay')).catch((errOrResp) => {
      if (errOrResp instanceof Response) {
        const mediaError = getErrorFromResponse(errOrResp, MuxErrorCategory.DRM, props);
        console.error('mediaError', mediaError?.message, mediaError?.context);
        if (mediaError) {
          return Promise.reject(mediaError);
        }
        // NOTE: This should never happen. Adding for exhaustiveness (CJP).
        return Promise.reject(new Error('Unexpected error in app cert request'));
      }
      return Promise.reject(errOrResp);
    });

  const getLicenseKeyHandler = (message: ArrayBuffer) =>
    getLicenseKey(message, toLicenseKeyURL(props, 'fairplay')).catch((errOrResp) => {
      if (errOrResp instanceof Response) {
        const mediaError = getErrorFromResponse(errOrResp, MuxErrorCategory.DRM, props);
        console.error('mediaError', mediaError?.message, mediaError?.context);

        if (mediaError) {
          return Promise.reject(mediaError);
        }
        // NOTE: This should never happen. Adding for exhaustiveness (CJP).
        return Promise.reject(new Error('Unexpected error in license key request'));
      }
      return Promise.reject(errOrResp);
    });

  const commonConfig = {
    mediaEl: mediaEl,
    getAppCertificate: getAppCertificateHandler,
    getLicenseKey: getLicenseKeyHandler,
    saveAndDispatchError,
    drmTypeCb: () => {
      props.drmTypeCb?.(DRMType.FAIRPLAY);
    },
  };

  if (props.useWebkitFairplay) {
    // Note: Sets teardown event listener
    setupWebkitNativeFairplayDRM(commonConfig);
  } else {
    const emeConfig = {
      fallbackToWebkitFairplay: async () => {
        await teardownEme();
        props.fallbackToWebkitFairplay?.();
      },
      ...commonConfig,
    };

    // Note: Returns teardown to be used in fallback, but also sets teardown event listener
    const teardownEme = setupEmeNativeFairplayDRM(emeConfig);
  }
};

export const toLicenseKeyURL = (
  {
    playbackId: playbackIdWithParams,
    tokens: { drm: token } = {},
    customDomain = MUX_VIDEO_DOMAIN,
  }: Partial<Pick<MuxMediaPropsInternal, 'playbackId' | 'tokens' | 'customDomain'>>,
  scheme: 'widevine' | 'playready' | 'fairplay'
) => {
  const playbackId = toPlaybackIdFromParameterized(playbackIdWithParams);
  // NOTE: Mux Video currently doesn't support custom domains for license/DRM endpoints, but
  // customDomain can also be used for internal use cases, so treat that as an exception case for now. (CJP)
  const domain = customDomain.toLocaleLowerCase().endsWith(MUX_VIDEO_DOMAIN) ? customDomain : MUX_VIDEO_DOMAIN;
  return `https://license.${domain}/license/${scheme}/${playbackId}?token=${token}`;
};

export const toAppCertURL = (
  {
    playbackId: playbackIdWithParams,
    tokens: { drm: token } = {},
    customDomain = MUX_VIDEO_DOMAIN,
  }: Partial<Pick<MuxMediaPropsInternal, 'playbackId' | 'tokens' | 'customDomain'>>,
  scheme: 'widevine' | 'playready' | 'fairplay'
) => {
  const playbackId = toPlaybackIdFromParameterized(playbackIdWithParams);
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

export const getCapLevelControllerConfig = (
  props: Pick<MuxMediaPropsInternal, 'capRenditionToPlayerSize'>,
  _hlsConfig: Partial<HlsConfig>
): Partial<Pick<HlsConfig, 'capLevelController' | 'capLevelToPlayerSize'>> => {
  const capLevelControllerObj: Partial<Pick<HlsConfig, 'capLevelController' | 'capLevelToPlayerSize'>> = {};
  // If capRenditionToPlayerSize is not explicitly set in props we enable MinCapLevelController
  capLevelControllerObj.capLevelToPlayerSize = props.capRenditionToPlayerSize;
  if (capLevelControllerObj.capLevelToPlayerSize == null) {
    capLevelControllerObj.capLevelController = MinCapLevelController;
    capLevelControllerObj.capLevelToPlayerSize = true;
  } else {
    capLevelControllerObj.capLevelController = CapLevelController;
  }
  return capLevelControllerObj;
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
      | 'muxDataSDK'
      | 'muxDataSDKOptions'
    >
  >,
  mediaEl: HTMLMediaElement,
  hlsjs?: HlsInterface
) => {
  const { envKey: env_key, disableTracking, muxDataSDK = mux, muxDataSDKOptions = {} } = props;
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

    muxDataSDK.monitor(mediaEl, {
      debug,
      beaconCollectionDomain,
      hlsjs,
      Hls: hlsjs ? Hls : undefined,
      automaticErrorTracking: false,
      errorTranslator: muxEmbedErrorTranslator,
      disableCookies,
      ...muxDataSDKOptions,
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
      | 'tokens'
      | 'customDomain'
      | 'disablePseudoEnded'
      | 'debug'
      | 'useWebkitFairplay'
      | 'fallbackToWebkitFairplay'
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
  const { src, customDomain = MUX_VIDEO_DOMAIN } = props;

  const maybeDispatchEndedCallback = () => {
    // We want to early bail if the underlying media element is already in an ended state,
    // since that means it will have already fired the ended event.
    // Do the "cheaper" check first
    if (mediaEl.ended) return;

    if (props.disablePseudoEnded) return;

    const pseudoEnded = getEnded(mediaEl, hls);
    if (!pseudoEnded) return;

    if (isStuckOnLastFragment(mediaEl, hls)) {
      // Nudge the playhead in this case.
      mediaEl.currentTime = mediaEl.buffered.end(mediaEl.buffered.length - 1);
    } else {
      mediaEl.dispatchEvent(new Event('ended'));
    }
  };

  let prevSeekableStart: number | undefined;
  let prevSeekableEnd: number | undefined;

  const seekableChange = () => {
    const seekableTimeRanges = getSeekable(mediaEl);
    let nextSeekableStart: number | undefined;
    let nextSeekableEnd: number | undefined;
    if (seekableTimeRanges.length > 0) {
      nextSeekableStart = seekableTimeRanges.start(0);
      nextSeekableEnd = seekableTimeRanges.end(0);
    }
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
      // Fetch the Mux metadata JSON even on preload=none because it's needed for the Mux logo.
      if (src.endsWith('.mp4') && src.includes(customDomain)) {
        const playbackId = toPlaybackIdFromSrc(src);
        const metadataUrl = new URL(`https://stream.${customDomain}/${playbackId}/metadata.json`);
        fetchAndDispatchMuxMetadata(metadataUrl.toString(), mediaEl);
      }

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

      const setupNativeStreamInfo = async () => {
        return updateStreamInfoFromSrc(src, mediaEl, type)
          .then(setupSeekableChangePoll)
          .catch((errOrResp: Response | Error) => {
            if (errOrResp instanceof Response) {
              const mediaError = getErrorFromResponse(errOrResp, MuxErrorCategory.VIDEO, props);
              if (mediaError) {
                saveAndDispatchError(mediaEl, mediaError);
                return;
              }
            } else if (errOrResp instanceof Error) {
              // mediaEl.dispatchEvent(new MediaError())
            }
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
          setupNativeStreamInfo();
          mediaEl.removeEventListener('loadedmetadata', loadedMetadataHandler);
        };
        const loadedMetadataHandler = () => {
          setupNativeStreamInfo();
          mediaEl.removeEventListener('play', playHandler);
        };
        addEventListenerWithTeardown(mediaEl, 'play', playHandler, { once: true });
        addEventListenerWithTeardown(mediaEl, 'loadedmetadata', loadedMetadataHandler, { once: true });
      } else {
        setupNativeStreamInfo();
      }

      // NOTE: Currently use drmToken to signal that playback is expected to be DRM-protected
      if (props.tokens?.drm) {
        setupNativeFairplayDRM(props, mediaEl);
      } else {
        // If we end up receiving an encrypted event in this case, that means the media is DRM-protected
        // but a token was not provided.
        addEventListenerWithTeardown(
          mediaEl,
          'encrypted',
          () => {
            const message = i18n('Attempting to play DRM-protected content without providing a DRM token.');
            const mediaError = new MediaError(message, MediaError.MEDIA_ERR_ENCRYPTED, true);
            mediaError.errorCategory = MuxErrorCategory.DRM;
            mediaError.muxCode = MuxErrorCode.ENCRYPTED_MISSING_TOKEN;
            saveAndDispatchError(mediaEl, mediaError);
          },
          { once: true }
        );
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
      const error = getErrorFromHlsErrorData(data, props);

      if (error.muxCode === MuxErrorCode.NETWORK_NOT_READY) {
        const maxRetries = 6; // 5 minutes and 5 seconds total (5s, 60s, 60s, 60s, 60s, 60s)
        const state = muxMediaState.get(mediaEl) ?? {};
        const retryCount = state.retryCount ?? 0;

        if (retryCount < maxRetries) {
          // First retry is 5 seconds, subsequent retries are 60 seconds
          const retryDelay = retryCount === 0 ? 5000 : 60000;

          // New error with the retry delay
          const retryDelayError = new MediaError(
            `Retrying in ${retryDelay / 1000} seconds...`,
            error.code,
            error.fatal
          );
          Object.assign(retryDelayError, error);
          saveAndDispatchError(mediaEl, retryDelayError);

          setTimeout(() => {
            state.retryCount = retryCount + 1;
            if (data.details === 'manifestLoadError' && data.url) {
              hls.loadSource(data.url);
            }
          }, retryDelay);
          return;
        } else {
          state.retryCount = 0;
          // New error with the retry link
          const retryLinkError = new MediaError(
            'Try again later or <a href="#" onclick="window.location.reload(); return false;" style="color: #4a90e2;">click here to retry</a>',
            error.code,
            error.fatal
          );
          Object.assign(retryLinkError, error);
          saveAndDispatchError(mediaEl, retryLinkError);
          return;
        }
      }
      saveAndDispatchError(mediaEl, error);
    });

    hls.on(Hls.Events.MANIFEST_LOADED, () => {
      // Clear error state and UI
      const state = muxMediaState.get(mediaEl);
      if (state && state.error) {
        state.error = null;
        state.retryCount = 0;

        mediaEl.dispatchEvent(new Event('emptied'));
        mediaEl.dispatchEvent(new Event('loadstart'));
      }
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

  // This accounts for cases where native playback is being used but
  // a non-200 response occurs on the request for the playback-id's playlist.
  // In this case, we currently already fetch the playlist in parallel (for
  // things like inferring the stream type, live edge start window, etc.),
  // so we'll wait briefly for that response to translate to a more accurate
  // error.
  if (
    mediaEl.src &&
    code === MediaError.MEDIA_ERR_SRC_NOT_SUPPORTED &&
    mediaEl.readyState === HTMLMediaElement.HAVE_NOTHING
  ) {
    setTimeout(() => {
      const ourError = getError(mediaEl) ?? mediaEl.error;
      // If the code is (still) MediaError.MEDIA_ERR_SRC_NOT_SUPPORTED,
      // assume it's an (unlikely) case where we did, in fact, encounter
      // media that is unsupported.
      if (ourError?.code === MediaError.MEDIA_ERR_SRC_NOT_SUPPORTED) {
        saveAndDispatchError(mediaEl, error);
      }
      // Since a parallel request for the source should be initiated to determine
      // stream info (e.g. streamType) at roughly the same time as when the source
      // is loaded by the media element, we should be able to keep this timeout short.
      // NOTE: Although there is a case where the parallel request may happen later
      // (namely, after metadata is loaded), this should be mutually exclusive from
      // the case we're accounting for here, since unsupported media should not
      // ever get metadata loaded in the first place. (CJP)
    }, 500);
    return;
  }

  if (mediaEl.src && (code !== MediaError.MEDIA_ERR_DECODE || code !== undefined)) {
    // Attempt to get the response code from the video src url.
    try {
      const { status } = await fetch(mediaEl.src);
      // Use the same hls.js data structure.
      error.data = { response: { code: status } };
    } catch {}
  }

  saveAndDispatchError(mediaEl, error);
}

function saveAndDispatchError(mediaEl: HTMLMediaElement, error: MediaError) {
  // Prevent dispatching non-fatal errors.
  if (!error.fatal) return;

  (muxMediaState.get(mediaEl) ?? {}).error = error as unknown as HTMLMediaElement['error'];

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
function handleInternalError(event: Event | CustomEvent<MediaError>) {
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

const getErrorFromHlsErrorData = (
  data: ErrorData,
  props: Partial<Pick<MuxMediaPropsInternal, 'playbackId' | 'drmToken' | 'playbackToken' | 'tokens' | 'debug'>>
) => {
  // Non-fatal errors: only log when debug is enabled (using console.warn to reduce user concern)
  const isNonFatal = !data.fatal;
  if (isNonFatal) {
    if (props.debug) {
      console.warn('getErrorFromHlsErrorData() (non-fatal)', data);
    }
  } else {
    console.error('getErrorFromHlsErrorData()', data);
  }

  const ErrorCodeMap: Partial<Record<ValueOf<typeof Hls.ErrorTypes>, 0 | 1 | 2 | 3 | 4 | 5>> = {
    [Hls.ErrorTypes.NETWORK_ERROR]: MediaError.MEDIA_ERR_NETWORK,
    [Hls.ErrorTypes.MEDIA_ERROR]: MediaError.MEDIA_ERR_DECODE,
    [Hls.ErrorTypes.KEY_SYSTEM_ERROR]: MediaError.MEDIA_ERR_ENCRYPTED,
  } as const;

  // eslint-disable-next-line no-shadow
  const hlsErrorDataToErrorCode = (data: ErrorData) => {
    if (
      [
        Hls.ErrorDetails.KEY_SYSTEM_LICENSE_REQUEST_FAILED,
        Hls.ErrorDetails.KEY_SYSTEM_SERVER_CERTIFICATE_REQUEST_FAILED,
      ].includes(data.details)
    ) {
      return MediaError.MEDIA_ERR_NETWORK;
    }
    return ErrorCodeMap[data.type];
  };

  // eslint-disable-next-line no-shadow
  const hlsErrorDataToCategory = (data: ErrorData) => {
    if (data.type === Hls.ErrorTypes.KEY_SYSTEM_ERROR) return MuxErrorCategory.DRM;
    if (data.type === Hls.ErrorTypes.NETWORK_ERROR) return MuxErrorCategory.VIDEO;
  };

  let mediaError: MediaError;
  const errorCode = hlsErrorDataToErrorCode(data);
  if (errorCode === MediaError.MEDIA_ERR_NETWORK && data.response) {
    const category = hlsErrorDataToCategory(data) ?? MuxErrorCategory.VIDEO;
    mediaError =
      getErrorFromResponse(data.response, category, props, data.fatal) ?? new MediaError('', errorCode, data.fatal);
  } else if (errorCode === MediaError.MEDIA_ERR_ENCRYPTED) {
    if (data.details === Hls.ErrorDetails.KEY_SYSTEM_NO_CONFIGURED_LICENSE) {
      const message = i18n('Attempting to play DRM-protected content without providing a DRM token.');
      mediaError = new MediaError(message, MediaError.MEDIA_ERR_ENCRYPTED, data.fatal);
      mediaError.errorCategory = MuxErrorCategory.DRM;
      mediaError.muxCode = MuxErrorCode.ENCRYPTED_MISSING_TOKEN;
    } else if (data.details === Hls.ErrorDetails.KEY_SYSTEM_NO_ACCESS) {
      /** @TODO For UI message add suggestion to try another browser */
      const message = i18n(
        'Cannot play DRM-protected content with current security configuration on this browser. Try playing in another browser.'
      );
      // Should we flag this as a business exception?
      mediaError = new MediaError(message, MediaError.MEDIA_ERR_ENCRYPTED, data.fatal);
      mediaError.errorCategory = MuxErrorCategory.DRM;
      mediaError.muxCode = MuxErrorCode.ENCRYPTED_UNSUPPORTED_KEY_SYSTEM;
    } else if (data.details === Hls.ErrorDetails.KEY_SYSTEM_NO_SESSION) {
      const message = i18n(
        'Failed to generate a DRM license request. This may be an issue with the player or your protected content.'
      );
      // NOTE: For some reason, perhaps due to issues with EXT-X-KEY parsing, hls.js defines this as a non-fatal error.
      // For us, we should be able to assume it is instead fatal. (CJP)
      mediaError = new MediaError(message, MediaError.MEDIA_ERR_ENCRYPTED, true);
      mediaError.errorCategory = MuxErrorCategory.DRM;
      mediaError.muxCode = MuxErrorCode.ENCRYPTED_GENERATE_REQUEST_FAILED;
    } else if (data.details === Hls.ErrorDetails.KEY_SYSTEM_SESSION_UPDATE_FAILED) {
      const message = i18n(
        'Failed to update DRM license. This may be an issue with the player or your protected content.'
      );
      mediaError = new MediaError(message, MediaError.MEDIA_ERR_ENCRYPTED, data.fatal);
      mediaError.errorCategory = MuxErrorCategory.DRM;
      mediaError.muxCode = MuxErrorCode.ENCRYPTED_UPDATE_LICENSE_FAILED;
    } else if (data.details === Hls.ErrorDetails.KEY_SYSTEM_SERVER_CERTIFICATE_UPDATE_FAILED) {
      const message = i18n(
        'Your server certificate failed when attempting to set it. This may be an issue with a no longer valid certificate.'
      );
      mediaError = new MediaError(message, MediaError.MEDIA_ERR_ENCRYPTED, data.fatal);
      mediaError.errorCategory = MuxErrorCategory.DRM;
      mediaError.muxCode = MuxErrorCode.ENCRYPTED_UPDATE_SERVER_CERT_FAILED;
    } else if (data.details === Hls.ErrorDetails.KEY_SYSTEM_STATUS_INTERNAL_ERROR) {
      const message = i18n(
        'The DRM Content Decryption Module system had an internal failure. Try reloading the page, upading your browser, or playing in another browser.'
      );
      mediaError = new MediaError(message, MediaError.MEDIA_ERR_ENCRYPTED, data.fatal);
      mediaError.errorCategory = MuxErrorCategory.DRM;
      mediaError.muxCode = MuxErrorCode.ENCRYPTED_CDM_ERROR;
    } else if (data.details === Hls.ErrorDetails.KEY_SYSTEM_STATUS_OUTPUT_RESTRICTED) {
      const message = i18n(
        'DRM playback is being attempted in an environment that is not sufficiently secure. User may see black screen.'
      );
      // NOTE: When encountered, this is a non-fatal error (though it's certainly interruptive of standard playback experience). (CJP)
      mediaError = new MediaError(message, MediaError.MEDIA_ERR_ENCRYPTED, false);
      mediaError.errorCategory = MuxErrorCategory.DRM;
      mediaError.muxCode = MuxErrorCode.ENCRYPTED_OUTPUT_RESTRICTED;
    } else {
      mediaError = new MediaError(data.error.message, MediaError.MEDIA_ERR_ENCRYPTED, data.fatal);
      mediaError.errorCategory = MuxErrorCategory.DRM;
      mediaError.muxCode = MuxErrorCode.ENCRYPTED_ERROR;
    }
  } else {
    mediaError = new MediaError('', errorCode, data.fatal);
  }
  if (!mediaError.context) {
    mediaError.context =
      `${data.url ? `url: ${data.url}\n` : ''}` +
      `${
        data.response && (data.response.code || data.response.text)
          ? `response: ${data.response.code}, ${data.response.text}\n`
          : ''
      }` +
      `${data.reason ? `failure reason: ${data.reason}\n` : ''}` +
      `${data.level ? `level: ${data.level}\n` : ''}` +
      `${data.parent ? `parent stream controller: ${data.parent}\n` : ''}` +
      `${data.buffer ? `buffer length: ${data.buffer}\n` : ''}` +
      `${data.error ? `error: ${data.error}\n` : ''}` +
      `${data.event ? `event: ${data.event}\n` : ''}` +
      `${data.err ? `error message: ${data.err?.message}\n` : ''}`;
  }
  mediaError.data = data;
  return mediaError;
};
