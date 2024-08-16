import { isKeyOf, ExtensionMimeTypeMap, MimeTypeShorthandMap, StreamTypes } from './types';
import type { HlsPlaylistTypes, MuxMediaProps } from './types';

type addEventListenerWithTeardown = <
  K extends keyof HTMLMediaElementEventMap,
  T extends EventTarget = HTMLMediaElement,
>(
  mediaEl: HTMLMediaElement,
  type: K,
  listener: (this: T, ev: HTMLMediaElementEventMap[K]) => any,
  options?: boolean | AddEventListenerOptions,
  target?: T | HTMLMediaElement
) => void;

// Adds an event listener to a media element that will be removed when an 'teardown' event is dispatched.
// Using this instead of 'emptied' as that can fire on initial load based on prior state of the media element
// Will be fired as a result of (directly or indirectly) invoking playback-core's `teardown()` function.
export const addEventListenerWithTeardown: addEventListenerWithTeardown = (
  mediaEl,
  type,
  listener,
  options,
  target = mediaEl
) => {
  /** @TODO fix types (hard problem due to lack of explicit relationship between Element and EventMap definitions) */
  // @ts-ignore
  target.addEventListener(type, listener, options);
  // NOTE: Using custom teardown
  mediaEl.addEventListener(
    'teardown',
    () => {
      /** @TODO fix types (hard problem due to lack of explicit relationship between Element and EventMap definitions) */
      // @ts-ignore
      target.removeEventListener(type, listener);
    },
    { once: true }
  );
};

export function inSeekableRange(seekable: TimeRanges, duration: number, time: number) {
  if (duration && time > duration) {
    time = duration;
  }
  for (let i = 0; i < seekable.length; i++) {
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

export const toStreamTypeFromPlaylistType = (playlistType: HlsPlaylistTypes) => {
  return playlistType === 'VOD' ? StreamTypes.ON_DEMAND : StreamTypes.LIVE;
};

export const toTargetLiveWindowFromPlaylistType = (playlistType: HlsPlaylistTypes) => {
  if (playlistType === 'EVENT') return Number.POSITIVE_INFINITY;
  if (playlistType === 'VOD') return Number.NaN;
  return 0;
};

export const inferMimeTypeFromURL = (url: string) => {
  let pathname = '';
  try {
    pathname = new URL(url).pathname;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (_e) {
    console.error('invalid url');
  }

  const extDelimIdx = pathname.lastIndexOf('.');
  if (extDelimIdx < 0) return '';

  const ext = pathname.slice(extDelimIdx + 1);
  const upperExt = ext.toUpperCase();

  return isKeyOf(upperExt, ExtensionMimeTypeMap) ? ExtensionMimeTypeMap[upperExt] : '';
};

export type MuxJWT = {
  sub: string;
  aud: 'v' | 't' | 'g' | 's' | 'd';
  exp: number;
};

export const parseJwt = (token: string | undefined): Partial<MuxJWT> | undefined => {
  const base64Url = (token ?? '').split('.')[1];

  // exit early on invalid value
  if (!base64Url) return undefined;

  // Account for malformed JWTs
  try {
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map(function (c) {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join('')
    );
    return JSON.parse(jsonPayload);
  } catch {
    return undefined;
  }
};

export const isJWTExpired = ({ exp }: Partial<Pick<MuxJWT, 'exp'>>, referenceTime: number = Date.now()) => {
  return !exp || exp * 1000 < referenceTime;
};

// NOTE: Treating missing sub (and expected sub) as mismatches for now (CJP)
export const isJWTSubMismatch = ({ sub }: Partial<Pick<MuxJWT, 'sub'>>, expectedSub: string | undefined) => {
  return sub !== expectedSub;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const isJWTAudMissing = ({ aud }: Partial<Pick<MuxJWT, 'aud'>>, _expectedAud: string | undefined) => {
  return !aud;
};

export const isJWTAudMismatch = ({ aud }: Partial<Pick<MuxJWT, 'aud'>>, expectedAud: string | undefined) => {
  return aud !== expectedAud;
};

export const lang: { [k: string]: string } = {
  '(opens in a new window)': '(opens in a new window)',
  'Network Error': 'Network Error',
  'Video is not currently available': 'Video is not currently available',
  'The live stream or video file are not yet ready.': 'The live stream or video file are not yet ready.',
  'This playback-id may belong to a live stream that is not currently active or an asset that is not ready.':
    'This playback-id may belong to a live stream that is not currently active or an asset that is not ready.',
  'Video does not exist': 'Video does not exist',
  'This playback-id does not exist. You may have used an Asset ID or an ID from a different resource.':
    'This playback-id does not exist. You may have used an Asset ID or an ID from a different resource.',
  'The specificed playback ID {playbackId} contains a token which must be provided via the playback-token attribute.':
    'The specificed playback ID {playbackId} contains a token which must be provided via the playback-token attribute.',
  'Invalid playback URL': 'Invalid playback URL',
  'The video URL or playback-token are formatted with incorrect or incomplete information.':
    'The video URL or playback-token are formatted with incorrect or incomplete information.',
  '403 error trying to access this playback URL. If this is a signed URL, you might need to provide a playback-token.':
    '403 error trying to access this playback URL. If this is a signed URL, you might need to provide a playback-token.',
  'Video URL has expired': 'Video URL has expired',
  'The video’s secured {tokenNamePrefix}-token has expired.':
    'The video’s secured {tokenNamePrefix}-token has expired.',
  'This playback is using signed URLs and the playback-token has expired. Expired at: {expiredDate}. Current time: {currentDate}.':
    'This playback is using signed URLs and the playback-token has expired. Expired at: {expiredDate}. Current time: {currentDate}.',
  'Video URL is formatted incorrectly': 'Video URL is formatted incorrectly',
  'The video’s playback ID does not match the one encoded in the {tokenNamePrefix}-token.':
    'The video’s playback ID does not match the one encoded in the {tokenNamePrefix}-token.',
  'The specified playback ID {playbackId} and the playback ID encoded in the playback-token {tokenPlaybackId} do not match.':
    'The specified playback ID {playbackId} and the playback ID encoded in the playback-token {tokenPlaybackId} do not match.',
  'The {tokenNamePrefix}-token is formatted with incorrect information.':
    'The {tokenNamePrefix}-token is formatted with incorrect information.',
  'The {tokenNamePrefix}-token has an incorrect aud value: {tokenType}. aud value should be {expectedAud}.':
    'The {tokenNamePrefix}-token has an incorrect aud value: {tokenType}. aud value should be {expectedAud}.',
  'The {tokenNamePrefix}-token has no aud value. aud value should be {expectedAud}.':
    'The {tokenNamePrefix}-token has no aud value. aud value should be {expectedAud}.',
  'Authorization error trying to access this {category} URL. If this is a signed playback ID, you might need to provide a {category} token.':
    'Authorization error trying to access this {category} URL. If this is a signed playback ID, you might need to provide a {category} token.',
  'Media Error': 'Media Error',
  'Source Not Supported': 'Source Not Supported',
  Error: 'Error',
  'Your device appears to be offline': 'Your device appears to be offline',
  'Check your internet connection and try reloading this video.':
    'Check your internet connection and try reloading this video.',
  "The provided thumbnail-token should have audience value 't' instead of '{aud}'.":
    "The provided thumbnail-token should have audience value 't' instead of '{aud}'.",
  "The provided storyboard-token should have audience value 's' instead of '{aud}'.":
    "The provided storyboard-token should have audience value 's' instead of '{aud}'.",
  'No stream-type value supplied. Defaulting to \\': 'No stream-type value supplied. Defaulting to \\',
  'Invalid stream-type value supplied: \\': 'Invalid stream-type value supplied: \\',
  'Read more: ': 'Read more: ',
};

const DEFAULT_LOCALE = 'en';

// NL example
// lang = {
//   "Network Error": "Netwerk Fout",
// };
export function i18n(str: string, translate = true): any {
  const message = translate ? lang[str] ?? str : str;
  const locale = translate ? lang.code : DEFAULT_LOCALE;
  return new IntlMessageFormat(message, locale);
}

/**
 * Poor man's IntlMessageFormat, enrich if need be.
 * @see https://formatjs.io/docs/intl-messageformat/
 */
class IntlMessageFormat {
  message: string;
  locale: string;

  constructor(message: string, locale = lang.code ?? DEFAULT_LOCALE) {
    this.message = message;
    this.locale = locale;
  }

  format(values: Record<string, any>): string {
    return this.message.replace(/\{(\w+)\}/g, (match, key) => {
      return values[key] ?? '';
    });
  }

  toString() {
    return this.message;
  }
}
