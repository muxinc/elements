/* eslint @typescript-eslint/triple-slash-reference: "off" */
/// <reference path="../dist/types/mux-embed.d.ts" />
import type { Options } from 'mux-embed';
import type { MediaError } from './errors';
import type { HlsInterface as Hls } from './hls';

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
export type Metadata = Partial<Required<Options>['data']>;
type MetaData = Metadata;
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

export type HlsPlaylistTypes = 'VOD' | 'EVENT' | null | undefined;

export type StreamTypes = {
  ON_DEMAND: 'on-demand';
  LIVE: 'live';
  UNKNOWN: 'unknown';
};

export const StreamTypes: StreamTypes = {
  ON_DEMAND: 'on-demand',
  LIVE: 'live',
  UNKNOWN: 'unknown',
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
  envKey: MetaData['env_key'];
  debug: Options['debug'] & Hls['config']['debug'];
  metadata: Partial<Options['data']>;
  maxResolution: string;
  customDomain: string;
  beaconCollectionDomain: Options['beaconCollectionDomain'];
  errorTranslator: Options['errorTranslator'];
  disableCookies: Options['disableCookies'];
  playbackId: string;
  playerInitTime: MetaData['player_init_time'];
  preferPlayback: ValueOf<PlaybackTypes> | undefined;
  type: MediaTypes;
  streamType: ValueOf<StreamTypes>;
  targetLiveWindow: number;
  liveEdgeStart: number;
  startTime: Hls['config']['startPosition'];
  autoPlay?: Autoplay;
  autoplay?: Autoplay;
  preferCmcd: ValueOf<CmcdTypes> | undefined;
  error?: HTMLMediaElement['error'] | MediaError;
};

export type HTMLMediaElementProps = Partial<Pick<HTMLMediaElement, 'src' | 'preload' | 'error' | 'seekable'>>;

export type MuxMediaProps = HTMLMediaElementProps & MuxMediaPropTypes;
export type MuxMediaPropsInternal = MuxMediaProps & {
  playerSoftwareName: MetaData['player_software_name'];
  playerSoftwareVersion: MetaData['player_software_version'];
};
