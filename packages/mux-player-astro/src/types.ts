import type {
  CmcdTypes,
  MaxResolutionValue,
  MinResolutionValue,
  PlaybackTypes,
  RenditionOrderValue,
  StreamTypes,
} from '@mux/playback-core';
import type { Tokens } from '@mux/mux-player';
import type { AstroComponentFactory } from 'astro/runtime/server/index.js';

type ValueOf<T> = T[keyof T];

export type MuxVideoTheme = {
  component?: AstroComponentFactory;
  name?: string;
};

export type BuiltinTheme = 'classic' | 'gerwig' | 'microvideo' | 'minimal' | 'news';

export type MuxPlayerProps = {
  theme?: MuxVideoTheme | BuiltinTheme | (string & {});
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
  assetStartTime?: number;
  assetEndTime?: number;
  metadataVideoId?: string;
  metadataVideoTitle?: string;
  metadataViewerUserId?: string;
  metadata?: {
    video_id?: string;
    video_title?: string;
    viewer_user_id?: string;
  };
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
  currentTime?: number;
  volume?: number;
  paused?: boolean;
  src?: string | null;
  poster?: string;
  playbackRate?: number;
  playsInline?: boolean;
  preload?: string;
  crossorigin?: string;
  autoplay?: boolean | string;
  loop?: boolean;
  muted?: boolean;
  audio?: boolean;
  envKey?: string;
  debug?: boolean;
  disableTracking?: boolean;
  disableCookies?: boolean;
  disablePictureInPicture?: boolean;
  extraSourceParams?: Record<string, any>;
  beaconCollectionDomain?: string;
  customDomain?: string;
  playbackId?: string;
  preferPlayback?: ValueOf<PlaybackTypes> | undefined;
  streamType?: ValueOf<StreamTypes>;
  defaultStreamType?: ValueOf<StreamTypes>;
  targetLiveWindow?: number;
  startTime?: number;
  storyboardSrc?: string;
  preferCmcd?: ValueOf<CmcdTypes> | undefined;
} & astroHTML.JSX.HTMLAttributes;

export type MuxPlayerAdsProps = MuxPlayerProps & {
  allowAdBlocker?: boolean;
  adTagUrl?: string;
};
