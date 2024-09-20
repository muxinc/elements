'use client';
import React, { useEffect } from 'react';
import type { CSSProperties } from 'react';
import type {
  StreamTypes,
  PlaybackTypes,
  CmcdTypes,
  MaxResolutionValue,
  MinResolutionValue,
  RenditionOrderValue,
} from '@mux/playback-core';
import { MaxResolution, MinResolution, RenditionOrder } from '@mux/playback-core';
import { MediaError } from '@mux/mux-player';
import type MuxPlayerElement from '@mux/mux-player';
import type { Tokens, MuxPlayerElementEventMap } from '@mux/mux-player';
import { toNativeProps } from './common/utils';
import { useRef } from 'react';
import { useCombinedRefs } from './useCombinedRefs';
import useObjectPropEffect, { defaultHasChanged } from './useObjectPropEffect';
import { getPlayerVersion } from './env';

export { MediaError, MaxResolution, MinResolution, RenditionOrder };

type ValueOf<T> = T[keyof T];
interface GenericEventListener<T extends Event = CustomEvent> {
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

export type MuxPlayerProps = {
  className?: string;
  hotkeys?: string;
  nohotkeys?: boolean;
  castReceiver?: string | undefined;
  castCustomData?: Record<string, any> | undefined;
  defaultHiddenCaptions?: boolean;
  playerSoftwareVersion?: string;
  playerSoftwareName?: string;
  forwardSeekOffset?: number;
  backwardSeekOffset?: number;
  maxResolution?: MaxResolutionValue;
  minResolution?: MinResolutionValue;
  renditionOrder?: RenditionOrderValue;
  programStartTime?: number;
  programEndTime?: number;
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
  onCuePointsChange?: GenericEventListener<MuxPlayerElementEventMap['cuepointschange']>;
  onChapterChange?: GenericEventListener<MuxPlayerElementEventMap['chapterchange']>;
} & Partial<MuxMediaPropTypes> &
  Partial<VideoApiAttributes>;

const MuxPlayerInternal = React.forwardRef<MuxPlayerRefAttributes, MuxPlayerProps>(({ children, ...props }, ref) => {
  return React.createElement('mux-player', toNativeProps({ ...props, ref }), children);
});

const useEventCallbackEffect = <K extends keyof MuxPlayerElementEventMap>(
  type: K,
  ref: // | ((instance: EventTarget | null) => void)
  React.MutableRefObject<MuxPlayerElement | null> | null | undefined,
  callback: GenericEventListener<MuxPlayerElementEventMap[K]> | undefined
) => {
  return useEffect(() => {
    const eventTarget = ref?.current;
    if (!eventTarget || !callback) return;
    eventTarget.addEventListener(type, callback);
    return () => {
      eventTarget.removeEventListener(type, callback);
    };
  }, [ref?.current, callback]);
};

const usePlayer = (
  ref: // | ((instance: EventTarget | null) => void)
  React.MutableRefObject<MuxPlayerElement | null> | null | undefined,
  props: MuxPlayerProps
) => {
  const {
    onAbort,
    onCanPlay,
    onCanPlayThrough,
    onEmptied,
    onLoadStart,
    onLoadedData,
    onLoadedMetadata,
    onProgress,
    onDurationChange,
    onVolumeChange,
    onRateChange,
    onResize,
    onWaiting,
    onPlay,
    onPlaying,
    onTimeUpdate,
    onPause,
    onSeeking,
    onSeeked,
    onStalled,
    onSuspend,
    onEnded,
    onError,
    onCuePointChange,
    onCuePointsChange,
    onChapterChange,
    metadata,
    tokens,
    paused,
    playbackId,
    playbackRates,
    currentTime,
    themeProps,
    extraSourceParams,
    castCustomData,
    _hlsConfig,
    ...remainingProps
  } = props;
  useObjectPropEffect('playbackRates', playbackRates, ref);
  useObjectPropEffect('metadata', metadata, ref);
  useObjectPropEffect('extraSourceParams', extraSourceParams, ref);
  useObjectPropEffect('_hlsConfig', _hlsConfig, ref);
  useObjectPropEffect('themeProps', themeProps, ref);
  useObjectPropEffect('tokens', tokens, ref);
  useObjectPropEffect('playbackId', playbackId, ref);
  useObjectPropEffect('castCustomData', castCustomData, ref);
  useObjectPropEffect(
    'paused',
    paused,
    ref,
    (playerEl: HTMLMediaElement, pausedVal?: boolean) => {
      if (pausedVal == null) return;
      if (pausedVal) {
        playerEl.pause();
      } else {
        playerEl.play();
      }
    },
    (playerEl, value, propName) => {
      if (playerEl.hasAttribute('autoplay') && !playerEl.hasPlayed) {
        return false;
      }
      return defaultHasChanged(playerEl, value, propName);
    }
  );
  useObjectPropEffect('currentTime', currentTime, ref, (playerEl: HTMLMediaElement, currentTimeVal?: number) => {
    if (currentTimeVal == null) return;
    playerEl.currentTime = currentTimeVal;
  });
  useEventCallbackEffect('abort', ref, onAbort);
  useEventCallbackEffect('canplay', ref, onCanPlay);
  useEventCallbackEffect('canplaythrough', ref, onCanPlayThrough);
  useEventCallbackEffect('emptied', ref, onEmptied);
  useEventCallbackEffect('loadstart', ref, onLoadStart);
  useEventCallbackEffect('loadeddata', ref, onLoadedData);
  useEventCallbackEffect('loadedmetadata', ref, onLoadedMetadata);
  useEventCallbackEffect('progress', ref, onProgress);
  useEventCallbackEffect('durationchange', ref, onDurationChange);
  useEventCallbackEffect('volumechange', ref, onVolumeChange);
  useEventCallbackEffect('ratechange', ref, onRateChange);
  useEventCallbackEffect('resize', ref, onResize);
  useEventCallbackEffect('waiting', ref, onWaiting);
  useEventCallbackEffect('play', ref, onPlay);
  useEventCallbackEffect('playing', ref, onPlaying);
  useEventCallbackEffect('timeupdate', ref, onTimeUpdate);
  useEventCallbackEffect('pause', ref, onPause);
  useEventCallbackEffect('seeking', ref, onSeeking);
  useEventCallbackEffect('seeked', ref, onSeeked);
  useEventCallbackEffect('stalled', ref, onStalled);
  useEventCallbackEffect('suspend', ref, onSuspend);
  useEventCallbackEffect('ended', ref, onEnded);
  useEventCallbackEffect('error', ref, onError);
  useEventCallbackEffect('cuepointchange', ref, onCuePointChange);
  useEventCallbackEffect('cuepointschange', ref, onCuePointsChange);
  useEventCallbackEffect('chapterchange', ref, onChapterChange);
  return [remainingProps];
};

const playerSoftwareVersion = getPlayerVersion();
const playerSoftwareName = 'mux-player-react';

const MuxPlayer = React.forwardRef<
  MuxPlayerRefAttributes,
  Omit<MuxPlayerProps, 'playerSoftwareVersion' | 'playerSoftwareName'>
>((props, ref) => {
  const innerPlayerRef = useRef<MuxPlayerElement>(null);
  const playerRef = useCombinedRefs(innerPlayerRef, ref);
  const [remainingProps] = usePlayer(innerPlayerRef, props);

  return (
    <MuxPlayerInternal
      /** @TODO Fix types relationships (CJP) */
      ref={playerRef as typeof innerPlayerRef}
      playerSoftwareName={playerSoftwareName}
      playerSoftwareVersion={playerSoftwareVersion}
      {...remainingProps}
    />
  );
});

export default MuxPlayer;
