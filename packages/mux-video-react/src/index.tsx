'use client';

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
  CmcdTypes,
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
  const { playbackId, src: outerSrc, children, autoPlay, preload, ...restProps } = props;

  const nativeVideoProps = Object.fromEntries(
    Object.entries(restProps).filter(([key]) => !Object.keys(MuxVideo.propTypes as any).includes(key))
  );

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
    <video ref={mediaElRef as typeof innerMediaElRef} {...nativeVideoProps}>
      {children}
    </video>
  );
});

MuxVideo.propTypes = {
  _hlsConfig: PropTypes.any,
  beaconCollectionDomain: PropTypes.string,
  customDomain: PropTypes.string,
  debug: PropTypes.bool,
  disableCookies: PropTypes.bool,
  disableTracking: PropTypes.bool,
  envKey: PropTypes.string,
  errorTranslator: PropTypes.any,
  liveEdgeStart: PropTypes.number,
  maxResolution: PropTypes.oneOf(['720p', '1080p', '1440p', '2160p']),
  metadata: PropTypes.any,
  minResolution: PropTypes.oneOf(['480p', '540p', '720p', '1080p', '1440p', '2160p']),
  playbackId: PropTypes.string,
  playerInitTime: PropTypes.number,
  preferCmcd: PropTypes.oneOf(Object.values(CmcdTypes)),
  preferPlayback: PropTypes.oneOf(Object.values(PlaybackTypes)),
  programStartTime: PropTypes.number,
  programEndTime: PropTypes.number,
  renditionOrder: PropTypes.oneOf(['desc']),
  startTime: PropTypes.number,
  streamType: PropTypes.oneOf(Object.values(StreamTypes)),
  targetLiveWindow: PropTypes.number,
  tokens: PropTypes.any,
  type: PropTypes.oneOf(allMediaTypes),
};

export default MuxVideo;
