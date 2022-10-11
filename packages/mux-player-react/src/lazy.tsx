import React, { useEffect, useState } from 'react';
import type * as CSS from 'csstype';
import type { DetailedHTMLProps, HTMLAttributes } from 'react';

import ConditionalSuspense from './ConditionalSuspense';
import useIsBrowser from './useIsBrowser';
import useIsIntersecting from './useIsIntersecting';

import type { MuxPlayerProps, MuxPlayerRefAttributes } from './index';

declare module 'csstype' {
  interface Properties {
    // Add a CSS Custom Property
    '--controls'?: CSS.Properties['display'];
  }
}

interface MuxPlayerElement extends DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement> {
  nohotkeys?: boolean | undefined;
}

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      'mux-player': MuxPlayerElement;
    }
  }
}

const MuxPlayerIndex = React.lazy(() => import('./index'));

interface FallbackProps extends MuxPlayerProps {
  onIntersection?: () => void;
}
const Fallback = (props: FallbackProps) => {
  const { style, className, onIntersection, placeholder } = props;

  const intersectionRef = React.useRef<HTMLElement>(null);
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
    <mux-player
      ref={intersectionRef}
      data-mux-player-react-lazy-placeholder
      className={className || ''}
      style={{
        // default mux-player styling
        aspectRatio: '16/9',
        display: 'block',
        backgroundColor: 'var(--media-background-color, #000)',
        width: '100%',
        // user-implemented styles
        ...style,
        // and placeholder styles that are important enough to override the user's preferences
        position: 'relative',
        backgroundImage: placeholder ? `url(${placeholder})` : undefined,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'contain',
        '--controls': 'none',
      }}
      placeholder={placeholder}
      // since there's a possibility that the bundle loads before Suspense clears this placeholder,
      // we need to make sure that the placeholder isn't interactive and its player chrome in doesn't get rendered
      nohotkeys
      aria-hidden
      tabIndex={-1}
    >
      <div
        data-mux-player-react-lazy-placeholder-overlay
        style={{
          position: 'absolute',
          inset: 0,
          backgroundColor: 'var(--controls-backdrop-color, rgba(0, 0, 0, 0.6))',
        }}
      />
    </mux-player>
  );
};

interface MuxPlayerLazyProps extends MuxPlayerProps {
  loading?: 'page' | 'viewport';
}
const MuxPlayer = React.forwardRef<MuxPlayerRefAttributes, MuxPlayerLazyProps>((props, ref) => {
  const { loading = 'viewport', ...playerProps } = props;

  // We load mux player once two conditions are met:
  // 1. We're in a browser (react.lazy doesn't work on the server in react 17)
  const isBrowser = useIsBrowser();
  // 2. The player has entered the viewport, according to the fallback (if enabled).
  const [isIntersecting, setIsIntersecting] = useState(() => (loading === 'viewport' ? false : true));

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
