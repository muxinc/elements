import { stylePropsToString, toQuery, camelCase } from './utils';
import type MuxPlayerElement from '.';
import { StreamTypes } from './constants';

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

export const getPosterURLFromPlaybackId = (playbackId?: string, token?: string) => {
  return `https://image.mux.com/${playbackId}/thumbnail.jpg${toQuery({
    token,
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
  return Array.from(el.video?.textTracks ?? []).filter(({ kind }) => kind === 'subtitles' || kind === 'captions');
}

export const getLiveTime = (el: MuxPlayerElement) => {
  const { video } = el;
  return video?.hls?.liveSyncPosition ?? video?.seekable.length
    ? video?.seekable.end(video.seekable.length - 1)
    : undefined;
};

export const seekToLive = (el: MuxPlayerElement) => {
  const liveTime = getLiveTime(el);
  if (liveTime == undefined) {
    console.warn('attempting to seek to live but cannot determine live edge time!');
    return;
  }
  el.currentTime = liveTime;
};

export const isInLiveWindow = (el: MuxPlayerElement) => {
  const { streamType } = el;
  const liveTime = getLiveTime(el);
  const currentTime = el.video?.currentTime;
  if (liveTime == undefined || currentTime == undefined) {
    return false;
  }
  const delta = liveTime - currentTime;
  if (streamType === StreamTypes.LL_LIVE) {
    return delta <= 1 * 3.5;
  }
  if (streamType === StreamTypes.LIVE) {
    return delta <= 2 * 3.5;
  }
  return false;
};

export function getChromeStylesFromProps(props: any) {
  const { primaryColor, secondaryColor, tertiaryColor } = props;

  const primaryColorStyles = primaryColor
    ? {
        '--media-icon-color': primaryColor,
        '--media-range-thumb-background': primaryColor,
        '--media-range-bar-color': primaryColor,
        color: primaryColor,
      }
    : {};

  const secondaryColorStyles = secondaryColor
    ? {
        '--media-background-color': secondaryColor,
        '--media-control-background': secondaryColor,
        '--media-control-hover-background': secondaryColor,
      }
    : {};

  return stylePropsToString({
    ...primaryColorStyles,
    ...secondaryColorStyles,
  });
}
