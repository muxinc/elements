import type { Options } from 'mux-embed';
import type Hls from 'hls.js';
import type { HlsConfig } from 'hls.js';

type KeyTypes = string | number | symbol;
type Maybe<T> = T | null | undefined;

const isNil = (x: unknown): x is null | undefined => x == undefined;

// Type Guard to determine if a given key is actually a key of some object of type T
// eslint-disable-next-line @typescript-eslint/ban-types
export const isKeyOf = <T extends {} = any>(k: KeyTypes, o: Maybe<T>): k is keyof T => {
  if (isNil(o)) return false;
  return k in o;
};

export type ValueOf<T> = T[keyof T];
export type Metadata = Partial<Options['data']>;
export type PlaybackEngine = Hls;

export type PlaybackCore = {
  engine?: PlaybackEngine;
  setAutoplay: (autoplay?: Autoplay) => void;
  setPreload: (preload?: HTMLMediaElement['preload']) => void;
};

// TODO add INVIEW_MUTED, INVIEW_ANY
export type AutoplayTypes = {
  ANY: 'any';
  MUTED: 'muted';
};

export const AutoplayTypes: AutoplayTypes = {
  ANY: 'any',
  MUTED: 'muted',
};

export type Autoplay = boolean | ValueOf<AutoplayTypes>;

export type StreamTypes = {
  VOD: 'on-demand';
  ON_DEMAND: 'on-demand';
  LIVE: 'live';
  LL_LIVE: 'll-live';
  DVR: 'live:dvr';
  LL_DVR: 'll-live:dvr';
};

export const StreamTypes: StreamTypes = {
  VOD: 'on-demand',
  ON_DEMAND: 'on-demand',
  LIVE: 'live',
  LL_LIVE: 'll-live',
  DVR: 'live:dvr',
  LL_DVR: 'll-live:dvr',
};

export type PlaybackTypes = {
  MSE: 'mse';
  NATIVE: 'native';
};

export const PlaybackTypes: PlaybackTypes = {
  MSE: 'mse',
  NATIVE: 'native',
};

export type CmcdTypes = {
  HEADER: 'header';
  QUERY: 'query';
  NONE: 'none';
};

export const CmcdTypes: CmcdTypes = {
  HEADER: 'header',
  QUERY: 'query',
  NONE: 'none',
};

export const CmcdTypeValues = Object.values(CmcdTypes);

export type ExtensionMimeTypeMap = {
  M3U8: 'application/vnd.apple.mpegurl';
  MP4: 'video/mp4';
};

export const ExtensionMimeTypeMap: ExtensionMimeTypeMap = {
  M3U8: 'application/vnd.apple.mpegurl',
  MP4: 'video/mp4',
};

export type MimeTypeShorthandMap = {
  HLS: ExtensionMimeTypeMap['M3U8'];
};

export const MimeTypeShorthandMap: MimeTypeShorthandMap = {
  HLS: ExtensionMimeTypeMap.M3U8,
};

export const shorthandKeys = Object.keys(MimeTypeShorthandMap);

export type MediaTypes =
  | ValueOf<ExtensionMimeTypeMap>
  | keyof MimeTypeShorthandMap
  /** @TODO Figure out a way to "downgrade" derived types below to early TS syntax (e.g. 3.4) instead of explicit versions here (CJP) */
  | 'hls';
// | `${Lowercase<keyof MimeTypeShorthandMap>}`
// | `${Uppercase<keyof MimeTypeShorthandMap>}`;

export const allMediaTypes = [
  ...(Object.values(ExtensionMimeTypeMap) as ValueOf<ExtensionMimeTypeMap>[]),
  /** @TODO Figure out a way to "downgrade" derived types below to early TS syntax (e.g. 3.4) instead of explicit versions here (CJP) */
  'hls',
  'HLS',
  // ...(shorthandKeys as (keyof MimeTypeShorthandMap)[]),
  // ...(shorthandKeys.map((k) => k.toUpperCase()) as `${Uppercase<keyof MimeTypeShorthandMap>}`[]),
  // ...(shorthandKeys.map((k) => k.toLowerCase()) as `${Lowercase<keyof MimeTypeShorthandMap>}`[]),
] as MediaTypes[];

export type CuePoint<T = any> = {
  time: number;
  value: T;
};

export type MuxMediaPropTypes = {
  envKey: Options['data']['env_key'];
  debug: Options['debug'] & Hls['config']['debug'];
  metadata: Partial<Options['data']>;
  customDomain: string;
  beaconCollectionDomain: Options['beaconCollectionDomain'];
  errorTranslator: Options['errorTranslator'];
  disableCookies: Options['disableCookies'];
  playbackId: string;
  playerInitTime: Options['data']['player_init_time'];
  preferPlayback: ValueOf<PlaybackTypes> | undefined;
  type: MediaTypes;
  streamType: ValueOf<StreamTypes>;
  startTime: HlsConfig['startPosition'];
  autoPlay?: Autoplay;
  autoplay?: Autoplay;
  preferCmcd: ValueOf<CmcdTypes> | undefined;
};

export type HTMLMediaElementProps = Partial<Pick<HTMLMediaElement, 'src' | 'preload'>>;

export type MuxMediaProps = HTMLMediaElementProps & MuxMediaPropTypes;
export type MuxMediaPropsInternal = MuxMediaProps & {
  playerSoftwareName: Options['data']['player_software_name'];
  playerSoftwareVersion: Options['data']['player_software_version'];
};
