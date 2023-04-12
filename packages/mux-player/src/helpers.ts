import { StreamTypes } from '@mux/playback-core';
import type { ValueOf } from '@mux/playback-core';
import { toQuery, camelCase, parseJwt } from './utils';

const MUX_VIDEO_DOMAIN = 'mux.com';

/* eslint-disable */
const getEnvPlayerVersion = () => {
  try {
    // @ts-ignore
    return PLAYER_VERSION;
  } catch {}
  return 'UNKNOWN';
};

const player_version = getEnvPlayerVersion();
export const getPlayerVersion = () => player_version;

export const getSrcFromPlaybackId = (
  playbackId?: string,
  { maxResolution, token, domain = MUX_VIDEO_DOMAIN }: { maxResolution?: string; token?: string; domain?: string } = {}
) => {
  /*
   * `redundant_streams` and `max_resolution` query param can only be added to public
   * playback IDs, in order to use these features with signed URLs
   * the query param must be added to the signing token.
   *
   * */
  const isSignedUrl = !!token;
  const maxRes = maxResolution ? { max_resolution: maxResolution } : {};
  const query = isSignedUrl ? { token } : { redundant_streams: true, ...maxRes };
  return `https://stream.${domain}/${playbackId}.m3u8${toQuery(query)}`;
};

export const getPosterURLFromPlaybackId = (
  playbackId?: string,
  { token, thumbnailTime, domain = MUX_VIDEO_DOMAIN }: { token?: string; domain?: string; thumbnailTime?: number } = {}
) => {
  // NOTE: thumbnailTime is not supported when using a signedURL/token. Remove under these cases. (CJP)
  const time = token == null ? thumbnailTime : undefined;

  const { aud } = parseJwt(token);

  if (token && aud !== 't') {
    return;
  }

  return `https://image.${domain}/${playbackId}/thumbnail.webp${toQuery({
    token,
    time,
  })}`;
};

export const getStoryboardURLFromPlaybackId = (
  playbackId?: string,
  { token, domain = MUX_VIDEO_DOMAIN }: { token?: string; domain?: string } = {}
) => {
  const { aud } = parseJwt(token);

  if (token && aud !== 's') {
    return;
  }

  return `https://image.${domain}/${playbackId}/storyboard.vtt${toQuery({
    token,
    format: 'webp',
  })}`;
};

export const getStreamTypeFromAttr = (streamTypeAttr: string | null | undefined): ValueOf<StreamTypes> | undefined => {
  // If unset, allow mux-video + media chrome to infer stream-type/streamType
  if (!streamTypeAttr) return undefined;
  // If it's a valid streamType based on the media-ui-extensions proposal, use it
  if ([StreamTypes.LIVE, StreamTypes.ON_DEMAND].includes(streamTypeAttr as any))
    return streamTypeAttr as ValueOf<StreamTypes>;
  // Otherwise, if it's a valid old stream-type, it should be one of several "live" permutations
  if (streamTypeAttr?.includes('live')) return StreamTypes.LIVE;
  // This case should never be met if a valid stream-type was set, but handling here just in case.
  return undefined;
};

export function castThemeName(themeName?: string): string | undefined {
  if (themeName && /^media-theme-[\w-]+$/.test(themeName)) {
    return themeName;
  }
  return undefined;
}

const attrToPropNameMap: Record<string, string> = {
  crossorigin: 'crossOrigin',
  playsinline: 'playsInline',
};

export function toPropName(attrName: string) {
  return attrToPropNameMap[attrName] ?? camelCase(attrName);
}

export class AttributeTokenList implements Iterable<string> {
  #el?: HTMLElement;
  #attr?: string;
  #tokens: string[] = [];

  constructor(el?: HTMLElement, attr?: string) {
    this.#el = el;
    this.#attr = attr;
  }

  [Symbol.iterator]() {
    return this.#tokens.values();
  }

  get length() {
    return this.#tokens.length;
  }

  get value() {
    return this.#tokens.join(' ') ?? '';
  }

  set value(val: string | undefined) {
    if (val === this.value) return;
    this.#tokens = [];
    this.add(...(val?.split(' ') ?? []));
  }

  toString() {
    return this.value;
  }

  item(index: number) {
    return this.#tokens[index];
  }

  values() {
    return this.#tokens.values();
  }

  keys() {
    return this.#tokens.keys();
  }

  forEach(callback: (value: string, index: number, list: string[]) => void) {
    this.#tokens.forEach(callback);
  }

  add(...tokens: string[]) {
    tokens.forEach((t) => {
      if (!this.contains(t)) this.#tokens.push(t);
    });
    // if the attribute was removed don't try to add it again.
    if (this.value === '' && !this.#el?.hasAttribute(`${this.#attr}`)) {
      return;
    }
    this.#el?.setAttribute(`${this.#attr}`, `${this.value}`);
  }

  remove(...tokens: string[]) {
    tokens.forEach((t) => {
      this.#tokens.splice(this.#tokens.indexOf(t), 1);
    });
    this.#el?.setAttribute(`${this.#attr}`, `${this.value}`);
  }

  contains(token: string) {
    return this.#tokens.includes(token);
  }

  toggle(token: string, force: boolean) {
    if (typeof force !== 'undefined') {
      if (force) {
        this.add(token);
        return true;
      } else {
        this.remove(token);
        return false;
      }
    }

    if (this.contains(token)) {
      this.remove(token);
      return false;
    }

    this.add(token);
    return true;
  }

  replace(oldToken: string, newToken: string) {
    this.remove(oldToken);
    this.add(newToken);
  }
}
