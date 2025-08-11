import type { CSSProperties } from 'react';
import type {
  StreamTypes,
  PlaybackTypes,
  CmcdTypes,
  MaxResolutionValue,
  MinResolutionValue,
  RenditionOrderValue,
} from '@mux/playback-core';
import type MuxPlayerElement from '@mux/mux-player';
import type { Tokens, EventMap as MuxPlayerElementEventMap } from '@mux/mux-player';

type ValueOf<T> = T[keyof T];

export interface GenericEventListener<T extends Event = CustomEvent> {
  (evt: T): void;
}

export type MuxPlayerRefAttributes = MuxPlayerElement;
type VideoApiAttributes = {
  currentTime: number;
  volume: number;
  paused: boolean;
  src: string | null;
  poster: string;
  playbackRate: number;
  playsInline: boolean;
  preload: string;
  crossOrigin: string;
  autoPlay: boolean | string;
  loop: boolean;
  muted: boolean;
  style: CSSProperties;
};

type MuxMediaPropTypes = {
  audio: boolean;
  //  envKey: Options["data"]["env_key"];
  envKey: string;
  // debug: Options["debug"] & Hls["config"]["debug"];
  debug: boolean;
  disableTracking: boolean;
  disableCookies: boolean;
  disablePictureInPicture?: boolean;
  // metadata: Partial<Options["data"]>;
  metadata: { [k: string]: any };
  extraSourceParams: Record<string, any>;
  _hlsConfig: MuxPlayerElement['_hlsConfig'];
  beaconCollectionDomain: string;
  customDomain: string;
  playbackId: string;
  preferPlayback: ValueOf<PlaybackTypes> | undefined;
  // NOTE: Explicitly adding deprecated values here for now to avoid fully breaking changes in TS envs (CJP)
  streamType: ValueOf<StreamTypes> | 'll-live' | 'live:dvr' | 'll-live:dvr';
  defaultStreamType: ValueOf<StreamTypes>;
  targetLiveWindow: number;
  startTime: number;
  storyboardSrc: string;
  preferCmcd: ValueOf<CmcdTypes> | undefined;
  children?: React.ReactNode;
};

export type Props = MuxPlayerProps;

export type MuxPlayerProps = {
  className?: string;
  hotkeys?: string;
  nohotkeys?: boolean;
  castReceiver?: string | undefined;
  castCustomData?: Record<string, any> | undefined;
  defaultHiddenCaptions?: boolean;
  playerSoftwareVersion?: string;
  playerSoftwareName?: string;
  playerInitTime?: number;
  forwardSeekOffset?: number;
  backwardSeekOffset?: number;
  maxResolution?: MaxResolutionValue;
  minResolution?: MinResolutionValue;
  renditionOrder?: RenditionOrderValue;
  programStartTime?: number;
  programEndTime?: number;
  proudlyDisplayMuxBadge?: boolean;
  /** Allow playback with ad blocker */
  allowAdBlocker?: boolean;
  adTagUrl?: string;
  assetStartTime?: number;
  assetEndTime?: number;
  metadataVideoId?: string;
  metadataVideoTitle?: string;
  metadataViewerUserId?: string;
  primaryColor?: string;
  secondaryColor?: string;
  accentColor?: string;
  placeholder?: string;
  playbackRates?: number[];
  defaultShowRemainingTime?: boolean;
  defaultDuration?: number;
  noVolumePref?: boolean;
  thumbnailTime?: number;
  title?: string;
  videoTitle?: string;
  tokens?: Tokens;
  theme?: string;
  themeProps?: { [k: string]: any };
  onAbort?: GenericEventListener<MuxPlayerElementEventMap['abort']>;
  onCanPlay?: GenericEventListener<MuxPlayerElementEventMap['canplay']>;
  onCanPlayThrough?: GenericEventListener<MuxPlayerElementEventMap['canplaythrough']>;
  onEmptied?: GenericEventListener<MuxPlayerElementEventMap['emptied']>;
  onLoadStart?: GenericEventListener<MuxPlayerElementEventMap['loadstart']>;
  onLoadedData?: GenericEventListener<MuxPlayerElementEventMap['loadeddata']>;
  onLoadedMetadata?: GenericEventListener<MuxPlayerElementEventMap['loadedmetadata']>;
  onProgress?: GenericEventListener<MuxPlayerElementEventMap['progress']>;
  onDurationChange?: GenericEventListener<MuxPlayerElementEventMap['durationchange']>;
  onVolumeChange?: GenericEventListener<MuxPlayerElementEventMap['volumechange']>;
  onRateChange?: GenericEventListener<MuxPlayerElementEventMap['ratechange']>;
  onResize?: GenericEventListener<MuxPlayerElementEventMap['resize']>;
  onWaiting?: GenericEventListener<MuxPlayerElementEventMap['waiting']>;
  onPlay?: GenericEventListener<MuxPlayerElementEventMap['play']>;
  onPlaying?: GenericEventListener<MuxPlayerElementEventMap['playing']>;
  onTimeUpdate?: GenericEventListener<MuxPlayerElementEventMap['timeupdate']>;
  onPause?: GenericEventListener<MuxPlayerElementEventMap['pause']>;
  onSeeking?: GenericEventListener<MuxPlayerElementEventMap['seeking']>;
  onSeeked?: GenericEventListener<MuxPlayerElementEventMap['seeked']>;
  onStalled?: GenericEventListener<MuxPlayerElementEventMap['stalled']>;
  onSuspend?: GenericEventListener<MuxPlayerElementEventMap['suspend']>;
  onEnded?: GenericEventListener<MuxPlayerElementEventMap['ended']>;
  onError?: GenericEventListener<MuxPlayerElementEventMap['error']>;
  onCuePointChange?: GenericEventListener<MuxPlayerElementEventMap['cuepointchange']>;
  onChapterChange?: GenericEventListener<MuxPlayerElementEventMap['chapterchange']>;
} & Partial<MuxMediaPropTypes> &
  Partial<VideoApiAttributes>;
