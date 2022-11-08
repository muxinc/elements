import { addEventListenerWithTeardown } from './util';
import { PlaybackEngine } from './types';

export const setupPreload = (
  { preload, src }: Partial<HTMLMediaElement>,
  mediaEl: HTMLMediaElement,
  hls?: PlaybackEngine
) => {
  const updatePreload = (val?: HTMLMediaElement['preload']) => {
    if (val != null && ['', 'none', 'metadata', 'auto'].includes(val)) {
      mediaEl.setAttribute('preload', val);
    } else {
      mediaEl.removeAttribute('preload');
    }
  };

  // handle native without hls.js (MSE)
  if (!hls) {
    updatePreload(preload);
    return updatePreload;
  }

  let hasLoadedSource = false;
  let hasPlayFired = false;

  const originalLength = hls.config.maxBufferLength;
  const originalSize = hls.config.maxBufferSize;

  const updateHlsPreload = (val?: HTMLMediaElement['preload']) => {
    // even if it doesn't have an effect on a <video> w/ MSE
    // still update the `preload` attribute.
    updatePreload(val);

    const newPreload = val ?? mediaEl.preload;
    if (hasPlayFired || newPreload === 'none') return;
    if (newPreload === 'metadata') {
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
    if (!hasLoadedSource && src) {
      hasLoadedSource = true;
      hls.loadSource(src);
    }
  };

  addEventListenerWithTeardown(
    mediaEl,
    'play',
    () => {
      hasPlayFired = true;

      // once a user has played, allow for it to load data as normal
      hls.config.maxBufferLength = originalLength;
      hls.config.maxBufferSize = originalSize;

      // load the source on first play if needed
      safeLoadSource();
    },
    { once: true }
  );

  updateHlsPreload(preload);

  return updateHlsPreload;
};
