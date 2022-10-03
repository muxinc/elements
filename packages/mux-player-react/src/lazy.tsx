import React, { useEffect, useState } from 'react';

import Spinner from './Spinner';
import ConditionalSuspense from './ConditionalSuspense';
import useIsBrowser from './useIsBrowser';
import useIsIntersecting from './useIsIntersecting';

import type { MuxPlayerProps, MuxPlayerRefAttributes } from './index';

const MuxPlayerIndex = React.lazy(() => import('./index'));

interface FallbackProps extends Omit<MuxPlayerProps, 'playerSoftwareVersion' | 'playerSoftwareName'> {
  onIntersection: () => void;
}
const Fallback = (props: FallbackProps) => {
  const { style, onIntersection, ...rest } = props;

  const intersectionRef = React.useRef<HTMLElement>(null);
  const isIntersecting = useIsIntersecting(intersectionRef);

  useEffect(() => {
    if (isIntersecting) {
      onIntersection();
    }
  }, [isIntersecting, onIntersection]);

  return (
    <>
      {/* TODO: can we add mux-player to JSX.IntrinsicElements */}
      {/* @ts-ignore */}
      <mux-player
        ref={intersectionRef}
        data-mux-player-react-placeholder
        style={{
          // default mux-player styling
          aspectRatio: '16/9',
          display: 'block',
          backgroundColor: '#000',
          width: '100%',
          // some styles specific to this placeholder
          position: 'relative',
          backgroundImage: props.placeholder ? `url(${props.placeholder})` : undefined,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'contain',
          // user-implemented styles
          ...style,
        }}
        // we pass the rest of the props to mux-player too.
        // There is a possibility that mux-player imports before Suspense has had the opportunity
        // to replace this placeholder with MuxPlayerReact.
        // In that case, we want this placeholder to look as much like the incoming player as possible.
        {...rest}
      >
        {/* Loading Spinner SVG */}
        <Spinner
          aria-hidden="true"
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            width: '100px',
            height: '100px',
            transform: 'translate(-50%,-50%)',
          }}
        />
        {/* Overlay */}
        <div
          // TODO: this color isn't quite right. how does mux player get its dark backdrop?
          style={{
            position: 'absolute',
            inset: 0,
            background: 'var(--media-control-background, rgba(20, 20, 30, 0.5))',
          }}
        />
        {/* TODO: can we add mux-player to JSX.IntrinsicElements */}
        {/* @ts-ignore */}
      </mux-player>
    </>
  );
};

interface MuxPlayerLazyProps extends Omit<MuxPlayerProps, 'playerSoftwareVersion' | 'playerSoftwareName'> {
  loading?: 'page' | 'viewport';
}

const MuxPlayer = React.forwardRef<MuxPlayerRefAttributes, MuxPlayerLazyProps>((props, ref) => {
  const { loading = 'viewport', ...rest } = props;

  // We load mux player once two conditions are met:
  // 1. We're in a browser (react.lazy doesn't work on the server in react 17)
  const isBrowser = useIsBrowser();
  // 2. The player has entered the viewport, according to the fallback (if enabled).
  const [isIntersecting, setIsIntersecting] = useState(() => (loading === 'viewport' ? false : true));

  return (
    <ConditionalSuspense
      condition={isBrowser && isIntersecting}
      fallback={<Fallback onIntersection={() => setIsIntersecting(true)} {...rest} />}
    >
      <MuxPlayerIndex {...rest} ref={ref} />
    </ConditionalSuspense>
  );
});

export default MuxPlayer;
