import Hls from 'hls.js';
import { addEventListenerWithTeardown } from './util';

type PlaybackEngine = Pick<Hls, 'loadSource' | 'config'>;

// the empty string is a synonym of the auto value
export type Preload = '' | 'none' | 'metadata' | 'auto';
export type UpdatePreload = (newPreload: Preload) => void;

export const setupPreload = (
  mediaEl: HTMLMediaElement,
  preload: Preload,
  src: string,
  hls: PlaybackEngine | undefined
) => {
  // if we're not using hls.js (MSE) return early
  if (!hls) return () => undefined;

  let hasLoadedSource = false;
  const originalLength = hls.config.maxBufferLength;
  const originalSize = hls.config.maxBufferSize;

  const updatePreload = (newPreload: Preload) => {
    // update the `preload` value that is used in the `play` listener!
    preload = newPreload;

    if (preload === 'none') return;

    if (preload === 'metadata') {
      // load the least amount of data possible
      hls.config.maxBufferLength = 1;
      hls.config.maxBufferSize = 1;
    } else {
      hls.config.maxBufferLength = originalLength;
      hls.config.maxBufferSize = originalSize;
    }

    safeLoadSource();
  };

  const safeLoadSource = () => {
    if (!hasLoadedSource) {
      hasLoadedSource = true;
      hls.loadSource(src);
    }
  };

  addEventListenerWithTeardown(
    mediaEl,
    'play',
    () => {
      switch (preload) {
        case 'none':
          // when preload is none, load the source on first play
          safeLoadSource();
          break;
        case 'metadata':
          // once a user has played, allow for it to load data as normal
          hls.config.maxBufferLength = originalLength;
          hls.config.maxBufferSize = originalSize;
          break;
      }
    },
    { once: true }
  );

  updatePreload(preload);

  return updatePreload;
};
