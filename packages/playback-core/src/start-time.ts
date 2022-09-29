import { addEventListenerWithTeardown, inSeekableRange } from './util';
import { PlaybackEngine, MuxMediaProps } from './types';

export const setupStartTime = (
  { startTime }: Partial<MuxMediaProps>,
  mediaEl?: HTMLMediaElement | null,
  hls?: PlaybackEngine
) => {
  // return early if hls.js (MSE) is used
  if (!mediaEl || hls) return;

  // seekable is set to the range of the entire video once durationchange fires
  addEventListenerWithTeardown(mediaEl, 'durationchange', seekInSeekableRange, { once: true });

  function seekInSeekableRange() {
    if (!startTime || !mediaEl) return;

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
};
