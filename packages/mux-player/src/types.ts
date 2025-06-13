import type MuxVideoElement from '@mux/mux-video';
import type { MediaError } from '@mux/mux-video';
import type { EventMap as MuxVideoEventMap } from '@mux/mux-video';
import type {
  MaxResolutionValue,
  MinResolutionValue,
  RenditionOrderValue,
  StreamTypes,
  ValueOf,
} from '@mux/playback-core';
import type { AttributeTokenList } from './helpers';

export type Props = MuxPlayerProps;
export type MuxPlayerProps = Partial<MuxVideoElement> & {
  nohotkeys?: boolean;
  hotkeys?: AttributeTokenList;
  preferPlayback?: 'mse' | 'native' | undefined;
  storyboard?: string;
};

export type MuxTemplateProps = Partial<MuxPlayerProps> & {
  hasSrc: boolean;
  audio: boolean;
  themeTemplate?: string | HTMLTemplateElement;
  playerSize: string;
  showLoading: boolean;
  thumbnailTime: number;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  forwardSeekOffset: number;
  backwardSeekOffset: number;
  isDialogOpen: boolean;
  defaultHiddenCaptions: boolean;
  novolumepref: boolean;
  playbackRates: string;
  defaultShowRemainingTime: boolean;
  defaultDuration?: number;
  hideDuration: boolean;
  onCloseErrorDialog: (evt: CustomEvent) => void;
  onFocusInErrorDialog: (evt: CustomEvent) => void;
  dialog: DialogOptions;
  inLiveWindow: boolean;
  maxResolution?: MaxResolutionValue;
  minResolution?: MinResolutionValue;
  renditionOrder?: RenditionOrderValue;
  extraSourceParams?: Record<string, any>;
  tokens: {
    playback?: string;
    drm?: string;
    thumbnail?: string;
    storyboard?: string;
  };
  noHotKeys: boolean;
  placeholder: string;
  hotKeys: AttributeTokenList;
  title: string;
  videoTitle: string;
  defaultStreamType?: ValueOf<StreamTypes>;
  castReceiver: string | undefined;
  proudlyDisplayMuxBadge?: boolean;
  adTagUrl: string | undefined;
  adBreak: boolean;
  /** Allow playback with ad blocker */
  allowAdBlocker?: boolean;
};

export type DialogOptions = {
  title?: string;
  message?: string;
  linkText?: string;
  linkUrl?: string;
};

export type DevlogOptions = {
  message?: string;
  context?: string;
  file?: string;
};

export type ErrorEvent = {
  player_error?: MediaError;
  player_error_code?: number;
  player_error_message?: string;
  player_error_context?: string;
};

type Expand<T> = T extends infer O ? { [K in keyof O]: O[K] } : never;

export type EventMap = MuxPlayerElementEventMap;
export type MuxPlayerElementEventMap = Expand<MuxVideoEventMap>;

export interface IMuxPlayerElement {
  addEventListener<K extends keyof MuxPlayerElementEventMap>(
    type: K,
    listener: (this: HTMLMediaElement, ev: MuxPlayerElementEventMap[K]) => any,
    options?: boolean | AddEventListenerOptions
  ): void;
  addEventListener(
    type: string,
    listener: EventListenerOrEventListenerObject,
    options?: boolean | AddEventListenerOptions
  ): void;
  removeEventListener<K extends keyof MuxPlayerElementEventMap>(
    type: K,
    listener: (this: HTMLMediaElement, ev: MuxPlayerElementEventMap[K]) => any,
    options?: boolean | EventListenerOptions
  ): void;
  removeEventListener(
    type: string,
    listener: EventListenerOrEventListenerObject,
    options?: boolean | EventListenerOptions
  ): void;
}
