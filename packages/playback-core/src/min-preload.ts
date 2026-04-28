import { addEventListenerWithTeardown } from './util';
import { MuxMediaPropsInternal, PlaybackEngine } from './types';
import Hls from './hls';

// Defers visible playback until N main segments have buffered. Rather
// than intercepting play()/pause() (which races with their async events
// and complicates autoplay/muted-fallback logic), we pin the media
// element's `playbackRate` to 0 while preloading. This lets all normal
// playback APIs run unchanged — the element just doesn't advance
// frames — giving ABR real bandwidth data and buffer runway before
// playback visually starts.
export const setupMinPreload = (
  props: Partial<MuxMediaPropsInternal>,
  mediaEl: HTMLMediaElement,
  hls?: PlaybackEngine
) => {
  const { minPreloadSegments } = props;
  if (minPreloadSegments == null || minPreloadSegments <= 0 || !hls) return;

  let mainSegmentsBuffered = 0;
  let restored = false;
  let userPlaybackRate = mediaEl.playbackRate || 1;

  // While the listener is attached we only ever write rate=0 internally.
  // `ratechange` is dispatched async (queued as a media element task per
  // the HTML spec), so a synchronous "is this our own write?" flag would
  // always be cleared by the time the event fires and cannot be used to
  // distinguish internal vs. user-driven changes. Instead, any non-zero
  // rate observed here must be user-driven: capture it and re-clamp to 0.
  // The single non-zero internal write (restoration, below) happens only
  // after the listener has been removed, preserving this invariant.
  const onRateChange = () => {
    if (mediaEl.playbackRate !== 0) {
      userPlaybackRate = mediaEl.playbackRate;
      mediaEl.playbackRate = 0;
    }
  };

  mediaEl.playbackRate = 0;
  // Use addEventListenerWithTeardown so the listener is removed on
  // `teardown` (e.g. source change). Otherwise, if the player is torn
  // down before the preload threshold is reached, the leaked listener
  // would keep clamping playbackRate to 0 on the media element.
  addEventListenerWithTeardown(mediaEl, 'ratechange', onRateChange);

  hls.on(Hls.Events.FRAG_BUFFERED, (_e: any, { frag }: any) => {
    if (restored || frag.type !== 'main') return;
    mainSegmentsBuffered++;
    if (mainSegmentsBuffered >= minPreloadSegments) {
      restored = true;
      // Remove the listener BEFORE restoring rate. The restoring write is
      // the only non-zero internal write; if the listener were still
      // attached, the resulting (async) `ratechange` would be misread as
      // a user change and immediately re-clamp to 0.
      mediaEl.removeEventListener('ratechange', onRateChange);
      mediaEl.playbackRate = userPlaybackRate;
    }
  });
};

// TCP slow start poisons the first bandwidth measurements. When set,
// the first N segments use the initial estimate. We reset the EWMA
// estimator after each of the first N-1 segments so ABR doesn't
// downshift from poisoned measurements before TCP is warm.
export const setupInitialEstimate = (
  props: Partial<MuxMediaPropsInternal>,
  _mediaEl: HTMLMediaElement,
  hls?: PlaybackEngine
) => {
  const { initialEstimateSegments } = props;
  if (initialEstimateSegments == null || initialEstimateSegments <= 0 || !hls) return;

  let mainSegmentsBuffered = 0;
  hls.on(Hls.Events.FRAG_BUFFERED, (_e: any, { frag }: any) => {
    if (frag.type !== 'main') return;
    mainSegmentsBuffered++;
    if (mainSegmentsBuffered < initialEstimateSegments) {
      // abrController is private in HLS.js types but accessible at runtime
      (hls as any).abrController.resetEstimator(hls.config.abrEwmaDefaultEstimate);
    }
  });
};
