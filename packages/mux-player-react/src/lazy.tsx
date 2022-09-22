import React from 'react';
import Suspense from './BrowserOnlySuspense';
import { MuxPlayerProps, MuxPlayerRefAttributes } from './index';

const MuxPlayerIndex = React.lazy(() => import('./index'));

const Fallback = (props: Omit<MuxPlayerProps, 'playerSoftwareVersion' | 'playerSoftwareName'>) => {
  const { style, ...rest } = props;
  return (
    <>
      {/* TODO: can we add mux-player to JSX.IntrinsicElements */}
      {/* @ts-ignore */}
      <mux-player
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
        {...rest}
      >
        {/* Spinner */}
        <svg
          aria-hidden="true"
          viewBox="0 0 100 100"
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            width: '100px',
            height: '100px',
            transform: 'translate(-50%,-50%)',
          }}
          fill="transparent"
        >
          <path d="M73,50c0-12.7-10.3-23-23-23S27,37.3,27,50 M30.9,50c0-10.5,8.5-19.1,19.1-19.1S69.1,39.5,69.1,50">
            {/* after half a second, animate fill to appear */}
            <animate attributeName="fill" dur="0.1s" from="transparent" to="#fff" begin="0.5s" fill="freeze" />
            {/* spin! */}
            <animateTransform
              attributeName="transform"
              attributeType="XML"
              type="rotate"
              dur="1s"
              from="0 50 50"
              to="360 50 50"
              repeatCount="indefinite"
            />
          </path>
        </svg>
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

const MuxPlayer = React.forwardRef<
  MuxPlayerRefAttributes,
  Omit<MuxPlayerProps, 'playerSoftwareVersion' | 'playerSoftwareName'>
>((props, ref) => {
  return (
    <Suspense fallback={<Fallback {...props} />}>
      <MuxPlayerIndex {...props} ref={ref} />
    </Suspense>
  );
});

export default MuxPlayer;
