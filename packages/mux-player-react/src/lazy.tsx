import React, { Suspense, useEffect, useState } from 'react';

import useIsBrowser from './useIsBrowser';
import useIsIntersecting from './useIsIntersecting';

import type { MuxPlayerProps, MuxPlayerRefAttributes } from './index';

const MuxPlayerIndex = React.lazy(() => import('./index'));

const Overlay = () => (
  <div
    data-mux-player-react-lazy-overlay
    style={{
      position: 'absolute',
      inset: 0,
      backgroundColor: 'var(--controls-backdrop-color, rgba(0, 0, 0, 0.6))',
    }}
  />
);

interface WrapperProps {
  onIntersection?: () => void;
  placeholder?: string;
  style?: React.CSSProperties;
  className?: string;
  children?: React.ReactNode;
}
const Wrapper = ({ onIntersection, placeholder, style, className, children }: WrapperProps) => {
  const intersectionRef = React.useRef<HTMLDivElement>(null);
  const isIntersecting = useIsIntersecting(intersectionRef);

  useEffect(() => {
    if (isIntersecting && onIntersection) {
      onIntersection();
    }
  }, [isIntersecting, onIntersection]);

  return (
    <div
      ref={intersectionRef}
      data-mux-player-react-lazy
      style={{
        // default mux-player styling
        aspectRatio: '16/9',
        display: 'block',
        width: '100%',
        // some styles just for this placeholder
        position: 'relative',
        backgroundColor: 'var(--media-background-color, #000)',
        backgroundImage: placeholder ? `url(${placeholder})` : undefined,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'contain',
        ...style,
      }}
      className={className || ''}
    >
      {children}
    </div>
  );
};

interface MuxPlayerLazyProps extends Omit<MuxPlayerProps, 'playerSoftwareVersion' | 'playerSoftwareName'> {
  loading?: 'page' | 'viewport';
}
const MuxPlayer = React.forwardRef<MuxPlayerRefAttributes, MuxPlayerLazyProps>((props, ref) => {
  const { loading = 'viewport', style, className, ...playerProps } = props;

  // We load mux player once two conditions are met:
  // 1. We're in a browser (react.lazy doesn't work on the server in react 17)
  const isBrowser = useIsBrowser();
  // 2. The player has entered the viewport (if enabled).
  const [isIntersecting, setIsIntersecting] = useState(false);
  const shouldLoad = isBrowser && (loading === 'page' || isIntersecting);

  return (
    <Wrapper
      style={style}
      className={className}
      placeholder={playerProps.placeholder}
      onIntersection={() => setIsIntersecting(true)}
    >
      {shouldLoad ? (
        <Suspense fallback={<Overlay />}>
          <MuxPlayerIndex style={{ position: 'absolute', inset: 0 }} {...playerProps} ref={ref} />
        </Suspense>
      ) : (
        <Overlay />
      )}
    </Wrapper>
  );
});

export default MuxPlayer;
