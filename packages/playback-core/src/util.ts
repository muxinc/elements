import { isKeyOf, ExtensionMimeTypeMap, MimeTypeShorthandMap, StreamTypes } from './types';
import type { HlsPlaylistTypes, MuxMediaProps } from './types';
// @ts-ignore
import lang from '../lang/en.json';

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

export const getType = (props: Partial<Pick<MuxMediaProps, 'type' | 'src' | 'customDomain'>>) => {
  const { type } = props;
  if (type) {
    const upperType = type.toUpperCase();
    return isKeyOf(upperType, MimeTypeShorthandMap) ? MimeTypeShorthandMap[upperType] : type;
  }
  return inferMimeTypeFromURL(props);
};

export const toStreamTypeFromPlaylistType = (playlistType: HlsPlaylistTypes) => {
  return playlistType === 'VOD' ? StreamTypes.ON_DEMAND : StreamTypes.LIVE;
};

export const toTargetLiveWindowFromPlaylistType = (playlistType: HlsPlaylistTypes) => {
  if (playlistType === 'EVENT') return Number.POSITIVE_INFINITY;
  if (playlistType === 'VOD') return Number.NaN;
  return 0;
};

export const inferMimeTypeFromURL = (props: Partial<Pick<MuxMediaProps, 'src' | 'customDomain'>>) => {
  const { src } = props;
  if (!src) return '';

  let pathname = '';
  try {
    pathname = new URL(src).pathname;
  } catch (_e) {
    console.error('invalid url');
  }

  const extDelimIdx = pathname.lastIndexOf('.');
  if (extDelimIdx < 0) {
    if (isExtensionLessMuxM3U8URL(props)) {
      return ExtensionMimeTypeMap.M3U8; // Treat extension-less Mux URLs as HLS
    }
    return '';
  }

  const ext = pathname.slice(extDelimIdx + 1);
  const upperExt = ext.toUpperCase();

  return isKeyOf(upperExt, ExtensionMimeTypeMap) ? ExtensionMimeTypeMap[upperExt] : '';
};

const MUX_VIDEO_DOMAIN = 'mux.com';
export const isExtensionLessMuxM3U8URL = ({
  src,
  customDomain = MUX_VIDEO_DOMAIN,
}: Partial<Pick<MuxMediaProps, 'src' | 'customDomain'>>) => {
  let urlObj;
  try {
    urlObj = new URL(`${src}`);
  } catch {
    return false;
  }
  const validProtocol = urlObj.protocol === 'https:';
  const validHostname = urlObj.hostname === `stream.${customDomain}`.toLowerCase();
  const pathParts = urlObj.pathname.split('/');
  const validPathPartsLength = pathParts.length === 2;
  const validExtensionlessPath = !pathParts?.[1].includes('.');
  return validProtocol && validHostname && validPathPartsLength && validExtensionlessPath;
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

export const isJWTAudMissing = ({ aud }: Partial<Pick<MuxJWT, 'aud'>>, _expectedAud: string | undefined) => {
  return !aud;
};

export const isJWTAudMismatch = ({ aud }: Partial<Pick<MuxJWT, 'aud'>>, expectedAud: string | undefined) => {
  return aud !== expectedAud;
};

const DEFAULT_LOCALE = 'en';

// NL example
// lang = {
//   "Network Error": "Netwerk Fout",
// };
export function i18n(str: string, translate = true) {
  const message = translate ? ((lang as unknown as any)?.[str] ?? str) : str;
  const locale = translate ? (lang as unknown as any).code : DEFAULT_LOCALE;
  return new IntlMessageFormat(message, locale);
}

/**
 * Poor man's IntlMessageFormat, enrich if need be.
 * @see https://formatjs.io/docs/intl-messageformat/
 */
class IntlMessageFormat {
  message: string;
  locale: string;

  /** @TODO re-implement esbuild custom plugin for code usage (CJP) */
  constructor(message: string, locale = (lang as unknown as any) ?? DEFAULT_LOCALE) {
    this.message = message;
    this.locale = locale;
  }

  format(values: Record<string, any>): string {
    return this.message.replace(/\{(\w+)\}/g, (_match, key) => {
      return values[key] ?? '';
    });
  }

  toString() {
    return this.message;
  }
}
