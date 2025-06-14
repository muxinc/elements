'use client';
import React, { useState, useRef } from 'react';
import { MaxResolution, MinResolution, RenditionOrder, generatePlayerInitTime } from '@mux/playback-core';
import { MediaError } from '@mux/mux-player';
import type MuxPlayerElement from '@mux/mux-player';
import type { MuxPlayerElementEventMap } from '@mux/mux-player';
import { toNativeProps } from './common/utils';
import { useComposedRefs } from './useComposedRefs';
import useObjectPropEffect, { defaultHasChanged } from './useObjectPropEffect';
import { getPlayerVersion } from './env';
import { useEventCallbackEffect } from './useEventCallbackEffect';
import type { MuxPlayerProps, MuxPlayerRefAttributes } from './types';

export { MediaError, MaxResolution, MinResolution, RenditionOrder, generatePlayerInitTime };
export * from './types';

const MuxPlayerInternal = React.forwardRef<MuxPlayerRefAttributes, MuxPlayerProps>(({ children, ...props }, ref) => {
  return React.createElement(
    'mux-player',
    {
      suppressHydrationWarning: true, // prevent issues with SSR / player-init-time
      ...toNativeProps(props),
      ref,
    },
    children
  );
});

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
  useEventCallbackEffect<MuxPlayerElement, MuxPlayerElementEventMap>('abort', ref, onAbort);
  useEventCallbackEffect<MuxPlayerElement, MuxPlayerElementEventMap>('canplay', ref, onCanPlay);
  useEventCallbackEffect<MuxPlayerElement, MuxPlayerElementEventMap>('canplaythrough', ref, onCanPlayThrough);
  useEventCallbackEffect<MuxPlayerElement, MuxPlayerElementEventMap>('emptied', ref, onEmptied);
  useEventCallbackEffect<MuxPlayerElement, MuxPlayerElementEventMap>('loadstart', ref, onLoadStart);
  useEventCallbackEffect<MuxPlayerElement, MuxPlayerElementEventMap>('loadeddata', ref, onLoadedData);
  useEventCallbackEffect<MuxPlayerElement, MuxPlayerElementEventMap>('loadedmetadata', ref, onLoadedMetadata);
  useEventCallbackEffect<MuxPlayerElement, MuxPlayerElementEventMap>('progress', ref, onProgress);
  useEventCallbackEffect<MuxPlayerElement, MuxPlayerElementEventMap>('durationchange', ref, onDurationChange);
  useEventCallbackEffect<MuxPlayerElement, MuxPlayerElementEventMap>('volumechange', ref, onVolumeChange);
  useEventCallbackEffect<MuxPlayerElement, MuxPlayerElementEventMap>('ratechange', ref, onRateChange);
  useEventCallbackEffect<MuxPlayerElement, MuxPlayerElementEventMap>('resize', ref, onResize);
  useEventCallbackEffect<MuxPlayerElement, MuxPlayerElementEventMap>('waiting', ref, onWaiting);
  useEventCallbackEffect<MuxPlayerElement, MuxPlayerElementEventMap>('play', ref, onPlay);
  useEventCallbackEffect<MuxPlayerElement, MuxPlayerElementEventMap>('playing', ref, onPlaying);
  useEventCallbackEffect<MuxPlayerElement, MuxPlayerElementEventMap>('timeupdate', ref, onTimeUpdate);
  useEventCallbackEffect<MuxPlayerElement, MuxPlayerElementEventMap>('pause', ref, onPause);
  useEventCallbackEffect<MuxPlayerElement, MuxPlayerElementEventMap>('seeking', ref, onSeeking);
  useEventCallbackEffect<MuxPlayerElement, MuxPlayerElementEventMap>('seeked', ref, onSeeked);
  useEventCallbackEffect<MuxPlayerElement, MuxPlayerElementEventMap>('stalled', ref, onStalled);
  useEventCallbackEffect<MuxPlayerElement, MuxPlayerElementEventMap>('suspend', ref, onSuspend);
  useEventCallbackEffect<MuxPlayerElement, MuxPlayerElementEventMap>('ended', ref, onEnded);
  useEventCallbackEffect<MuxPlayerElement, MuxPlayerElementEventMap>('error', ref, onError);
  useEventCallbackEffect<MuxPlayerElement, MuxPlayerElementEventMap>('cuepointchange', ref, onCuePointChange);
  useEventCallbackEffect<MuxPlayerElement, MuxPlayerElementEventMap>('chapterchange', ref, onChapterChange);
  return [remainingProps];
};

export const playerSoftwareVersion = getPlayerVersion();
export const playerSoftwareName = 'mux-player-react';

const MuxPlayer = React.forwardRef<
  MuxPlayerRefAttributes,
  Omit<MuxPlayerProps, 'playerSoftwareVersion' | 'playerSoftwareName'>
>((props, ref) => {
  const innerPlayerRef = useRef<MuxPlayerElement>(null);
  const playerRef = useComposedRefs(innerPlayerRef, ref);
  const [remainingProps] = usePlayer(innerPlayerRef, props);
  const [playerInitTime] = useState(props.playerInitTime ?? generatePlayerInitTime());

  return (
    <MuxPlayerInternal
      /** @TODO Fix types relationships (CJP) */
      ref={playerRef as React.Ref<MuxPlayerElement>}
      defaultHiddenCaptions={props.defaultHiddenCaptions}
      playerSoftwareName={playerSoftwareName}
      playerSoftwareVersion={playerSoftwareVersion}
      playerInitTime={playerInitTime}
      {...remainingProps}
    />
  );
});

export default MuxPlayer;
