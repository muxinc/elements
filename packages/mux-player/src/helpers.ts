import { stylePropsToString, toQuery, camelCase } from './utils';
import type MuxPlayerElement from '.';

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
  return `https://stream.mux.com/${playbackId}.m3u8${toQuery({ token })}`;
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
