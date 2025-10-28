import { addEventListenerWithTeardown } from './util';
import { PlaybackEngine } from './types';

interface SetupPreload {
  updatePreload: (val?: HTMLMediaElement['preload']) => void;
  startBuffering?: () => void;
  stopBuffering?: () => void;
  isBuffering?: () => boolean;
}

export const setupPreload = (
  { preload, src }: Partial<HTMLMediaElement>,
  mediaEl: HTMLMediaElement,
  hls?: PlaybackEngine
): SetupPreload => {
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
    return {
      updatePreload,
    };
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
    if (!hasLoadedSource && src && hls?.bufferingEnabled) {
      hasLoadedSource = true;
      hls.loadSource(src);
    }
  };

  const startBuffering = () => {
    if (hls && src && hasLoadedSource) {
      hls.resumeBuffering();
      hls.startLoad();
    }
  };

  const stopBuffering = () => {
    if (hls) {
      hls.pauseBuffering();
      hls.stopLoad();
    }
  };

  const isBuffering = hls ? () => hls.loadingEnabled : undefined;

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

  return {
    updatePreload: updateHlsPreload,
    startBuffering,
    stopBuffering,
    isBuffering,
  };
};
