'use client';

import React, { useEffect, useState } from 'react';
import type { ValueOf } from '@mux/playback-core';

import ConditionalSuspense from './ConditionalSuspense';
import useIsBrowser from './useIsBrowser';
import useIsIntersecting from './useIsIntersecting';

import type { MuxPlayerProps, MuxPlayerRefAttributes } from './index';
import type MuxPlayerElement from '@mux/mux-player';

interface MuxPlayerElementReact extends Partial<Omit<MuxPlayerElement, 'style' | 'children'>> {
  ref: React.MutableRefObject<MuxPlayerElement | null> | null | undefined;
  style: React.CSSProperties;
  children?: React.ReactNode;
}

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      'mux-player': MuxPlayerElementReact;
    }
  }
}

const MuxPlayerIndex = React.lazy(() => import('./index'));

interface FallbackProps extends MuxPlayerProps {
  onIntersection?: () => void;
}
const Fallback = (props: FallbackProps) => {
  const { style, className, onIntersection, placeholder } = props;

  const intersectionRef = React.useRef<MuxPlayerElement>(null);
  const isIntersecting = useIsIntersecting(intersectionRef);

  useEffect(() => {
    if (isIntersecting && onIntersection) {
      onIntersection();
    }
  }, [isIntersecting, onIntersection]);

  return (
    /* 
    Why do we have a mux-player element before the mux-player bundle is even loaded?
    Before the bundle is loaded, this mux-player element just acts like a div.
    However, by calling this placeholder "mux-player",
    it now gets the same CSS applied to it that the eventual "real" mux-player element will. 
    */
    <>
      <mux-player
        ref={intersectionRef}
        data-mux-player-react-lazy-placeholder
        placeholder={placeholder ?? ''}
        style={
          {
            '--mux-player-react-lazy-placeholder': placeholder ? `url('${placeholder}');` : '',
            ...style,
          } as React.CSSProperties
        }
        className={className || ''}
        // since there's a possibility that the bundle loads before Suspense clears this placeholder,
        // we need to make sure that the placeholder isn't interactive and its player chrome in doesn't get rendered
        nohotkeys
        aria-hidden
        tabIndex={-1}
      >
        <div data-mux-player-react-lazy-placeholder-overlay />
      </mux-player>
      <style>{
        /* css */ `
        mux-player[data-mux-player-react-lazy-placeholder] {
          aspect-ratio: 16/9;
          display: block;
          background-color: var(--media-background-color, #000);
          width: 100%;
          position: relative;
          background-image: var(--mux-player-react-lazy-placeholder);
          background-repeat: no-repeat;
          background-size: var(--media-object-fit, contain);
          background-position: var(--media-object-position, 50% 50%);
          --controls: none;
          --controls-backdrop-color: rgba(0, 0, 0, 0.6);
        }
        mux-player [data-mux-player-react-lazy-placeholder-overlay] {
          position: absolute;
          inset: 0;
          background-color: var(--controls-backdrop-color);
        }
      `
      }</style>
    </>
  );
};

type LoadingType = {
  PAGE: 'page';
  VIEWPORT: 'viewport';
};

const LoadingType: LoadingType = {
  PAGE: 'page',
  VIEWPORT: 'viewport',
};

interface MuxPlayerLazyProps extends MuxPlayerProps {
  loading?: ValueOf<LoadingType>;
}
const MuxPlayer = React.forwardRef<MuxPlayerRefAttributes, MuxPlayerLazyProps>((props, ref) => {
  const { loading = LoadingType.VIEWPORT, ...playerProps } = props;

  // We load mux player once two conditions are met:
  // 1. We're in a browser (react.lazy doesn't work on the server in react 17)
  const isBrowser = useIsBrowser();
  // 2. The player has entered the viewport, according to the fallback (if enabled).
  const [isIntersecting, setIsIntersecting] = useState(() => (loading === LoadingType.VIEWPORT ? false : true));

  return (
    <ConditionalSuspense
      condition={isBrowser && isIntersecting}
      fallback={
        <Fallback
          style={playerProps.style}
          className={playerProps.className}
          placeholder={playerProps.placeholder}
          onIntersection={() => setIsIntersecting(true)}
        />
      }
    >
      <MuxPlayerIndex {...playerProps} ref={ref} />
    </ConditionalSuspense>
  );
});

export default MuxPlayer;
