type KeyTypes = string | number | symbol;

type addEventListenerWithTeardown = <K extends keyof HTMLMediaElementEventMap>(
  mediaEl: HTMLMediaElement,
  type: K,
  listener: (this: HTMLMediaElement, ev: HTMLMediaElementEventMap[K]) => any,
  options?: boolean | AddEventListenerOptions
) => void;

// Adds an event listener to a media element that will be removed when an 'teardown' event is dispatched.
// Using this instead of 'emptied' as that can fire on initial load based on prior state of the media element
// Will be fired as a result of (directly or indirectly) invoking playback-core's `teardown()` function.
export const addEventListenerWithTeardown: addEventListenerWithTeardown = (mediaEl, type, listener, options) => {
  mediaEl.addEventListener(type, listener, options);
  // NOTE: Using custom teardown
  mediaEl.addEventListener(
    'teardown',
    () => {
      mediaEl.removeEventListener(type, listener);
    },
    { once: true }
  );
};

// Type Guard to determine if a given key is actually a key of some object of type T
export const isKeyOf = <T = any>(k: KeyTypes, o: T): k is keyof T => {
  return k in o;
};

export function inSeekableRange(seekable: TimeRanges, duration: number, time: number) {
  if (duration && time > duration) {
    time = duration;
  }
  for (let i = 0; i < seekable.length ?? 0; i++) {
    if (seekable.start(i) <= time && seekable.end(i) >= time) {
      return true;
    }
  }
  return false;
}
