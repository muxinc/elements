import { useCombinedRefs } from './use-combined-refs';
import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import {
  allMediaTypes,
  initialize,
  teardown,
  MuxMediaProps,
  StreamTypes,
  PlaybackTypes,
  toMuxVideoURL,
  generatePlayerInitTime,
} from '@mux/playback-core';
import type { PlaybackCore } from '@mux/playback-core';
import { getPlayerVersion } from './env';

export type Props = Omit<
  React.DetailedHTMLProps<React.VideoHTMLAttributes<HTMLVideoElement>, HTMLVideoElement>,
  'autoPlay'
> &
  MuxMediaProps;

const playerSoftwareVersion = getPlayerVersion();
const playerSoftwareName = 'mux-video-react';

const MuxVideo = React.forwardRef<HTMLVideoElement | undefined, Partial<Props>>((props, ref) => {
  const { playbackId, src: outerSrc, children, autoPlay, preload, streamType, _hlsConfig, ...restProps } = props;

  const [playerInitTime] = useState(generatePlayerInitTime());
  const [src, setSrc] = useState<MuxMediaProps['src']>(toMuxVideoURL(props) ?? outerSrc);
  const playbackCoreRef = useRef<PlaybackCore | undefined>(undefined);
  const innerMediaElRef = useRef<HTMLVideoElement>(null);
  const mediaElRef = useCombinedRefs(innerMediaElRef, ref);

  useEffect(() => {
    setSrc(toMuxVideoURL(props) ?? outerSrc);
  }, [outerSrc, playbackId]);

  useEffect(() => {
    const propsWithState = {
      ...props,
      src,
      playerInitTime,
      playerSoftwareName,
      playerSoftwareVersion,
      autoplay: autoPlay,
    };

    // mediaEl required caching here so the ref was not null in the unmount callback.
    let mediaEl = mediaElRef.current;
    if (mediaEl) {
      playbackCoreRef.current = initialize(propsWithState, mediaEl, playbackCoreRef.current);
    }

    return () => {
      teardown(mediaEl, playbackCoreRef.current);
      mediaEl = undefined;
      playbackCoreRef.current = undefined;
    };
  }, [src]);

  useEffect(() => {
    playbackCoreRef.current?.setAutoplay(autoPlay);
  }, [autoPlay]);

  useEffect(() => {
    playbackCoreRef.current?.setPreload(preload);
  }, [preload]);

  return (
    /** @TODO Fix types relationships (CJP) */
    <video ref={mediaElRef as typeof innerMediaElRef} {...restProps}>
      {children}
    </video>
  );
});

MuxVideo.propTypes = {
  envKey: PropTypes.string,
  debug: PropTypes.bool,
  disableCookies: PropTypes.bool,
  // Improve this by adding a full shape() definition for all metadata props
  // metadata: PropTypes.shape({}),
  metadata: PropTypes.any,
  _hlsConfig: PropTypes.any,
  beaconCollectionDomain: PropTypes.string,
  playbackId: PropTypes.string,
  playerInitTime: PropTypes.number,
  preferPlayback: PropTypes.oneOf(Object.values(PlaybackTypes)),
  type: PropTypes.oneOf(allMediaTypes),
  streamType: PropTypes.oneOf(Object.values(StreamTypes)),
  startTime: PropTypes.number,
};

export default MuxVideo;
