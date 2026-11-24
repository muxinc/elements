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

  // Minimal buffer limits applied for preload="metadata".
  const METADATA_BUFFER_LENGTH = 1;
  const METADATA_BUFFER_SIZE = 1;
  let hasAppliedMetadataLimits = false;

  // Only undo the limits this module applied. If the config was changed
  // after hls.js was created (e.g. via `player._hls.config`), keep those values.
  const restoreBufferLimits = () => {
    if (!hasAppliedMetadataLimits) return;
    hasAppliedMetadataLimits = false;

    if (hls.config.maxBufferLength === METADATA_BUFFER_LENGTH) {
      hls.config.maxBufferLength = originalLength;
    }
    if (hls.config.maxBufferSize === METADATA_BUFFER_SIZE) {
      hls.config.maxBufferSize = originalSize;
    }
  };

  const updateHlsPreload = (val?: HTMLMediaElement['preload']) => {
    // even if it doesn't have an effect on a <video> w/ MSE
    // still update the `preload` attribute.
    updatePreload(val);

    const newPreload = val ?? mediaEl.preload;
    if (hasPlayFired || newPreload === 'none') return;
    if (newPreload === 'metadata') {
      // load the least amount of data possible
      hls.config.maxBufferLength = METADATA_BUFFER_LENGTH;
      hls.config.maxBufferSize = METADATA_BUFFER_SIZE;
      hasAppliedMetadataLimits = true;
    } else {
      restoreBufferLimits();
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
      restoreBufferLimits();

      // load the source on first play if needed
      safeLoadSource();
    },
    { once: true }
  );

  updateHlsPreload(preload);

  return updateHlsPreload;
};
