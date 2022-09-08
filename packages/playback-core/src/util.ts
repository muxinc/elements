type KeyTypes = string | number | symbol;

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
