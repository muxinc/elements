import { ValueOf, StreamTypes, ExtensionMimeTypeMap, MimeTypeShorthandMap, MuxMediaProps } from './types';

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

export const toPlaybackIdParts = (playbackIdWithOptionalParams: string): [string, string?] => {
  const qIndex = playbackIdWithOptionalParams.indexOf('?');
  if (qIndex < 0) return [playbackIdWithOptionalParams];
  const idPart = playbackIdWithOptionalParams.slice(0, qIndex);
  const queryPart = playbackIdWithOptionalParams.slice(qIndex);
  return [idPart, queryPart];
};

export const getType = (props: Partial<Pick<MuxMediaProps, 'type' | 'src'>>) => {
  const type = props.type;
  if (type) {
    const upperType = type.toUpperCase();
    return isKeyOf(upperType, MimeTypeShorthandMap) ? MimeTypeShorthandMap[upperType] : type;
  }

  const { src } = props;
  if (!src) return '';

  return inferMimeTypeFromURL(src);
};

export const inferMimeTypeFromURL = (url: string) => {
  let pathname = '';
  try {
    pathname = new URL(url).pathname;
  } catch (e) {
    console.error('invalid url');
  }

  const extDelimIdx = pathname.lastIndexOf('.');
  if (extDelimIdx < 0) return '';

  const ext = pathname.slice(extDelimIdx + 1);
  const upperExt = ext.toUpperCase();

  return isKeyOf(upperExt, ExtensionMimeTypeMap) ? ExtensionMimeTypeMap[upperExt] : '';
};

export const getStreamTypeConfig = (streamType?: ValueOf<StreamTypes>) => {
  // for regular live videos, set backBufferLength to 8
  if ([StreamTypes.LIVE, StreamTypes.DVR].includes(streamType as any)) {
    const liveConfig = {
      backBufferLength: 8,
    };

    return liveConfig;
  }

  // for LL Live videos, set backBufferLenght to 4 and maxFragLookUpTolerance to 0.001
  if ([StreamTypes.LL_LIVE, StreamTypes.LL_DVR].includes(streamType as any)) {
    const liveConfig = {
      backBufferLength: 4,
      maxFragLookUpTolerance: 0.001,
    };

    return liveConfig;
  }

  return {};
};
