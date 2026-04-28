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
  // Guards `ratechange` against our own internal writes so we only
  // capture user-driven rate changes.
  let internalRateUpdate = false;

  const setRateInternal = (rate: number) => {
    internalRateUpdate = true;
    mediaEl.playbackRate = rate;
    internalRateUpdate = false;
  };

  const onRateChange = () => {
    if (internalRateUpdate) return;
    if (mediaEl.playbackRate !== 0) {
      userPlaybackRate = mediaEl.playbackRate;
      setRateInternal(0);
    }
  };

  setRateInternal(0);
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
      mediaEl.removeEventListener('ratechange', onRateChange);
      setRateInternal(userPlaybackRate);
    }
  });
};
