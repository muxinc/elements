/* eslint @typescript-eslint/triple-slash-reference: "off" */
/// <reference path="../../../node_modules/mux-embed/dist/types/mux-embed.d.ts" preserve="true" />
import type { Options, Mux } from 'mux-embed';
import type { MediaError } from './errors';
import type { HlsConfig } from 'hls.js';
import type Hls from 'hls.js';

type KeyTypes = string | number | symbol;
type Maybe<T> = T | null | undefined;

const isNil = (x: unknown): x is null | undefined => x == undefined;

// Type Guard to determine if a given key is actually a key of some object of type T
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export const isKeyOf = <T extends {} = any>(k: KeyTypes, o: Maybe<T>): k is keyof T => {
  if (isNil(o)) return false;
  return k in o;
};

export type ValueOf<T> = T[keyof T];
export type Metadata = Partial<Required<Options>['data']>;
type MetaData = Metadata;
export type PlaybackEngine = Hls;
export type MuxDataSDK = Mux;

export type PlaybackCore = {
  engine?: PlaybackEngine;
  muxDataSDK?: MuxDataSDK;
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

// Both cuepoints and chapters have optional end times
// so support both joined up and sparse cue placements
type CueLike<T = any> = {
  startTime: number;
  endTime?: number;
  value: T;
};
export type CuePoint<T = any> =
  | CueLike<T> // new shape
  | { time: number; value: T }; // legacy shape, still supported for now
export type Chapter = CueLike<string>;

export const MaxResolution = {
  upTo720p: '720p',
  upTo1080p: '1080p',
  upTo1440p: '1440p',
  upTo2160p: '2160p',
} as const;

export const MinResolution = {
  noLessThan480p: '480p',
  noLessThan540p: '540p',
  noLessThan720p: '720p',
  noLessThan1080p: '1080p',
  noLessThan1440p: '1440p',
  noLessThan2160p: '2160p',
} as const;

export const RenditionOrder = {
  DESCENDING: 'desc',
} as const;

export const MaxAutoResolution = {
  upTo720p: '720p',
  upTo1080p: '1080p',
  upTo1440p: '1440p',
  upTo2160p: '2160p',
} as const;

export type MaxResolutionValue = ValueOf<typeof MaxResolution>;
export type MinResolutionValue = ValueOf<typeof MinResolution>;
export type RenditionOrderValue = ValueOf<typeof RenditionOrder>;
export type MaxAutoResolutionValue = ValueOf<typeof MaxAutoResolution>;

export type Tokens = {
  playback?: string;
  drm?: string;
  thumbnail?: string;
  storyboard?: string;
};

export type MuxMediaPropTypes = {
  _hlsConfig?: Partial<HlsConfig>;
  autoPlay?: Autoplay;
  autoplay?: Autoplay;
  /** Based on `cap-rendition-to-player-size` attribute and `_hlsConfig.capLevelToPlayerSize` */
  capRenditionToPlayerSize?: boolean;
  beaconCollectionDomain: Options['beaconCollectionDomain'];
  customDomain: string;
  debug: Options['debug'] & Hls['config']['debug'];
  disableCookies: Options['disableCookies'];
  disableTracking: boolean;
  disablePseudoEnded: boolean;
  drmToken?: string;
  playbackToken?: string;
  envKey: MetaData['env_key'];
  error?: HTMLMediaElement['error'] | MediaError;
  errorTranslator: Options['errorTranslator'];
  liveEdgeStart: number;
  maxResolution: MaxResolutionValue;
  metadata: Partial<Options['data']>;
  minResolution: MinResolutionValue;
  maxAutoResolution: MaxAutoResolutionValue;
  playbackId: string;
  playerInitTime: MetaData['player_init_time'];
  preferCmcd: ValueOf<CmcdTypes> | undefined;
  preferPlayback: ValueOf<PlaybackTypes> | undefined;
  programStartTime: number;
  programEndTime: number;
  assetStartTime: number;
  assetEndTime: number;
  renditionOrder: RenditionOrderValue;
  startTime: Hls['config']['startPosition'];
  streamType: ValueOf<StreamTypes>;
  targetLiveWindow: number;
  tokens: Tokens;
  type: MediaTypes;
  extraSourceParams: Record<string, any>;
};

export type HTMLMediaElementProps = Partial<Pick<HTMLMediaElement, 'src' | 'preload' | 'error' | 'seekable'>>;

export type MuxMediaProps = HTMLMediaElementProps &
  MuxMediaPropTypes & {
    // TODO: useWebkitFairplay and fallbackToWebkitFairplay can be removed once webkit fallback is no longer necessary
    useWebkitFairplay?: boolean;
    fallbackToWebkitFairplay: () => void;
  };
export type MuxMediaPropsInternal = MuxMediaProps & {
  playerSoftwareName: MetaData['player_software_name'];
  playerSoftwareVersion: MetaData['player_software_version'];
  muxDataSDK?: Mux;
  muxDataSDKOptions?: Mux;
  muxDataKeepSession?: boolean;
  drmTypeCb?: (drmType: Metadata['view_drm_type']) => void;
};

// TODO: Make these more uniform, remove bubbles, discuss to remove detail.
export type MuxMediaEventsMap = {
  cuepointchange: CustomEvent<{ composed: true; bubbles: true; detail: CuePoint }>;
  chapterchange: CustomEvent<{ composed: true; bubbles: true; detail: Chapter }>;
  targetlivewindowchange: CustomEvent<{ composed: true; bubbles: true }>;
  streamtypechange: CustomEvent<{ composed: true; bubbles: true }>;
  seekablechange: CustomEvent<{ composed: true }>;
  error: CustomEvent<{ detail: MediaError }>;
};
