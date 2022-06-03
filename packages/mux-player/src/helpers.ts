import { toQuery, camelCase } from './utils';
import type MuxPlayerElement from '.';
import { StreamTypes } from '@mux-elements/playback-core';

/* eslint-disable */
const getEnvPlayerVersion = () => {
  try {
    // @ts-ignore
    return PLAYER_VERSION;
  } catch {}
  return 'UNKNOWN';
};

const player_version = getEnvPlayerVersion();
export const getPlayerVersion = () => player_version;

export const getSrcFromPlaybackId = (playbackId?: string, token?: string) => {
  /*
   * 2022-04-01 djhaveri
   *
   * `redundant_streams` query param can only be added to public
   * playback IDs, in order to use this feature with signed URLs
   * the query param must be added to the signing token.
   *
   * https://docs.mux.com/guides/video/play-your-videos#add-delivery-redundancy-with-redundant-streams
   *
   * */
  const isSignedUrl = !!token;
  const query = isSignedUrl ? { token } : { redundant_streams: true };
  return `https://stream.mux.com/${playbackId}.m3u8${toQuery(query)}`;
};

export const getPosterURLFromPlaybackId = (playbackId?: string, thumbnailTime?: number, token?: string) => {
  // NOTE: thumbnailTime is not supported when using a signedURL/token. Remove under these cases. (CJP)
  const time = token == null ? thumbnailTime : undefined;
  return `https://image.mux.com/${playbackId}/thumbnail.jpg${toQuery({
    token,
    time,
  })}`;
};

export const getStoryboardURLFromPlaybackId = (playbackId?: string, token?: string) => {
  return `https://image.mux.com/${playbackId}/storyboard.vtt${toQuery({
    token,
  })}`;
};

const attrToPropNameMap: Record<string, string> = {
  crossorigin: 'crossOrigin',
  playsinline: 'playsInline',
};

export function toPropName(attrName: string) {
  return attrToPropNameMap[attrName] ?? camelCase(attrName);
}

let testMediaEl: HTMLMediaElement | undefined;
export const getTestMediaEl = (nodeName = 'video') => {
  if (testMediaEl) return testMediaEl;
  if (typeof window !== 'undefined') {
    testMediaEl = document.createElement(nodeName as 'video' | 'audio');
  }
  return testMediaEl;
};

export const hasVolumeSupportAsync = async (mediaEl: HTMLMediaElement | undefined = getTestMediaEl()) => {
  if (!mediaEl) return false;
  const prevVolume = mediaEl.volume;
  mediaEl.volume = prevVolume / 2 + 0.1;
  return new Promise<boolean>((resolve, reject) => {
    setTimeout(() => {
      resolve(mediaEl.volume !== prevVolume);
    }, 0);
  });
};

export function getCcSubTracks(el: MuxPlayerElement) {
  return Array.from(el.media?.textTracks ?? []).filter(({ kind }) => kind === 'subtitles' || kind === 'captions');
}

export const getLiveTime = (el: MuxPlayerElement) => {
  const { media } = el;
  return (
    media?._hls?.liveSyncPosition ??
    (media?.seekable.length ? media?.seekable.end(media.seekable.length - 1) : undefined)
  );
};

export const seekToLive = (el: MuxPlayerElement) => {
  const liveTime = getLiveTime(el);
  if (liveTime == undefined) {
    console.warn('attempting to seek to live but cannot determine live edge time!');
    return;
  }
  el.currentTime = liveTime;
};

export const LL_LIVE_SEGMENT_SECS = 1;
export const LIVE_SEGMENT_SECS = 5;
export const DEFAULT_HOLDBACK = 3;
export const LIVE_HOLDBACK_MOE = 0.5;

export const isInLiveWindow = (el: MuxPlayerElement) => {
  const { streamType } = el;
  const liveTime = getLiveTime(el);
  const currentTime = el.media?.currentTime;
  if (liveTime == undefined || currentTime == undefined) {
    return false;
  }
  const delta = liveTime - currentTime;
  // The live window is based on whether or not the current playhead is within n segment durations (plus a margin of error)
  // of the live edge (CJP)
  if (streamType === StreamTypes.LL_LIVE || streamType === StreamTypes.LL_DVR) {
    return delta <= LL_LIVE_SEGMENT_SECS * (DEFAULT_HOLDBACK + LIVE_HOLDBACK_MOE);
  }
  if (streamType === StreamTypes.LIVE || streamType === StreamTypes.DVR) {
    return delta <= LIVE_SEGMENT_SECS * (DEFAULT_HOLDBACK + LIVE_HOLDBACK_MOE);
  }
  return false;
};
