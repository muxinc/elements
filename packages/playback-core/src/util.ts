type KeyTypes = string | number | symbol;

type addEventListenerWithTeardown = <K extends keyof HTMLMediaElementEventMap>(
  mediaEl: HTMLMediaElement,
  type: K,
  listener: (this: HTMLMediaElement, ev: HTMLMediaElementEventMap[K]) => any,
  options?: boolean | AddEventListenerOptions
) => void;

// Adds an event listener to a media element that will be removed when an 'emptied' event is dispatched.
// This correlates to changing the `src` of the HTMLMediaElement and is further ensured via playback-core's
// `teardown()` method.
export const addEventListenerWithTeardown: addEventListenerWithTeardown = (mediaEl, type, listener, options) => {
  mediaEl.addEventListener(type, listener, options);
  mediaEl.addEventListener(
    'emptied',
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
