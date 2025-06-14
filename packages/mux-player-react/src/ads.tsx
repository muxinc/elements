'use client';
import React, { forwardRef, useRef } from 'react';
// Register <mux-player> (ads) web component.
import '@mux/mux-player/ads';
import MuxPlayer from '@mux/mux-player-react';
import type { GenericEventListener, Props as MuxPlayerIndexProps } from '@mux/mux-player-react';
import { useComposedRefs } from './useComposedRefs';
import { useEventCallbackEffect } from './useEventCallbackEffect';
import type MuxPlayerElement from '@mux/mux-player/ads';
import type { EventMap as MuxPlayerElementEventMap } from '@mux/mux-player/ads';

export interface MuxPlayerProps extends Omit<MuxPlayerIndexProps, 'playerSoftwareVersion' | 'playerSoftwareName'> {
  adTagUrl?: string;
  allowAdBlocker?: boolean;

  onAdRequest?: GenericEventListener<MuxPlayerElementEventMap['adrequest']>;
  onAdResponse?: GenericEventListener<MuxPlayerElementEventMap['adresponse']>;
  onAdImpression?: GenericEventListener<MuxPlayerElementEventMap['adimpression']>;
  onAdBreakStart?: GenericEventListener<MuxPlayerElementEventMap['adbreakstart']>;
  onAdPlay?: GenericEventListener<MuxPlayerElementEventMap['adplay']>;
  onAdPlaying?: GenericEventListener<MuxPlayerElementEventMap['adplaying']>;
  onAdPause?: GenericEventListener<MuxPlayerElementEventMap['adpause']>;
  onAdFirstQuartile?: GenericEventListener<MuxPlayerElementEventMap['adfirstquartile']>;
  onAdMidpoint?: GenericEventListener<MuxPlayerElementEventMap['admidpoint']>;
  onAdThirdQuartile?: GenericEventListener<MuxPlayerElementEventMap['adthirdquartile']>;
  onAdError?: GenericEventListener<MuxPlayerElementEventMap['aderror']>;
  onAdClick?: GenericEventListener<MuxPlayerElementEventMap['adclick']>;
  onAdSkip?: GenericEventListener<MuxPlayerElementEventMap['adskip']>;
  onAdEnded?: GenericEventListener<MuxPlayerElementEventMap['adended']>;
  onAdBreakEnd?: GenericEventListener<MuxPlayerElementEventMap['adbreakend']>;
  onAdClose?: GenericEventListener<MuxPlayerElementEventMap['adclose']>;
}

const MuxPlayerAds = forwardRef<MuxPlayerElement, MuxPlayerProps>((props, ref) => {
  const playerRef = useRef<MuxPlayerElement>(null);

  const adEventProps: Record<string, (e: Event) => void> = {};
  const reactProps: Record<string, unknown> = {};

  for (const [k, v] of Object.entries(props)) {
    if (k.startsWith('onAd')) {
      adEventProps[k] = v;
    } else {
      reactProps[k] = v;
    }
  }

  // Set up event listeners on the custom element.
  // Still handle events for React 19+ because they don't yet offer
  // a way to have nicely camelCased event prop names on custom elements.
  for (const propName in adEventProps) {
    const callback = adEventProps[propName as keyof typeof adEventProps];
    const eventName = propName.slice(2).toLowerCase() as keyof MuxPlayerElementEventMap;
    useEventCallbackEffect<MuxPlayerElement, MuxPlayerElementEventMap>(eventName, playerRef, callback);
  }

  return <MuxPlayer ref={useComposedRefs(playerRef, ref)} {...reactProps} />;
});

export default MuxPlayerAds;
