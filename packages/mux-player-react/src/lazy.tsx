import React, { useRef } from 'react';

import ConditionalSuspense from './ConditionalSuspense';
import useIsBrowser from './useIsBrowser';
import useIsIntersecting from './useIsIntersecting';

import type { MuxPlayerProps, MuxPlayerRefAttributes } from './index';

const MuxPlayerIndex = React.lazy(() => import('./index'));

interface MuxPlayerLazyProps extends MuxPlayerProps {
  loading?: 'page' | 'viewport';
}
const MuxPlayer = React.forwardRef<MuxPlayerRefAttributes, MuxPlayerLazyProps>((props, ref) => {
  const { loading = 'viewport', ...playerProps } = props;

  // We load mux player once two conditions are met:
  // 1. We're in a browser (react.lazy doesn't work on the server in react 17)
  const isBrowser = useIsBrowser();
  // 2. The player has entered the viewport, according to the fallback (if enabled).
  const intersectionRef = useRef<HTMLDivElement>(null);
  const isIntersecting = useIsIntersecting(intersectionRef);

  return (
    <>
      <div data-mux-player-react-lazy ref={intersectionRef}>
        <ConditionalSuspense
          condition={isBrowser && (isIntersecting || loading === 'page')}
          fallback={<div data-mux-player-react-lazy-placeholder />}
        >
          <MuxPlayerIndex {...playerProps} ref={ref} />
        </ConditionalSuspense>
      </div>
      <style>{
        /* css */ `
        [data-mux-player-react-lazy] {
          /* This wrapper is now in charge of sizing */
          position: relative;
          /* so it should have the same behavior as mux player does */
          aspect-ratio: 16/9;
          width: 100%;
        }
        mux-player, [data-mux-player-react-lazy-placeholder] {
          /* its children just inherit its size */
          position: absolute;
          inset: 0;
        }
        [data-mux-player-react-lazy-placeholder] {
          background-color: var(--media-background-color, #000);
          ${playerProps.placeholder ? `background-image: url(${playerProps.placeholder});` : ''}
          background-repeat: no-repeat;
          background-size: var(--media-object-fit, contain);
          background-position: var(--media-object-position, 50% 50%);
        }
        [data-mux-player-react-lazy-placeholder]:after {
          /* 
            atop the placeholder is an overlay to dim the placeholder
            in the same way that the incoming controls overlay will
          */
          content: '';
          position: absolute;
          inset: 0;
          background-color: var(--controls-backdrop-color, rgba(0, 0, 0, 0.6));
        }
      `
      }</style>
    </>
  );
});

export default MuxPlayer;
