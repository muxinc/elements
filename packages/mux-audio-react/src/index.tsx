import { useCombinedRefs } from './use-combined-refs';
import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import {
  allMediaTypes,
  initialize,
  MuxMediaProps,
  StreamTypes,
  PlaybackTypes,
  toMuxVideoURL,
  generatePlayerInitTime,
} from '@mux/playback-core';
import type { PlaybackCore } from '@mux/playback-core';
import { getPlayerVersion } from './env';

export type Props = Omit<
  React.DetailedHTMLProps<React.AudioHTMLAttributes<HTMLAudioElement>, HTMLAudioElement>,
  'autoPlay'
> &
  MuxMediaProps;

const playerSoftwareVersion = getPlayerVersion();
const playerSoftwareName = 'mux-audio-react';

const MuxAudio = React.forwardRef<HTMLAudioElement | undefined, Partial<Props>>((props, ref) => {
  const {
    envKey,
    debug,
    beaconCollectionDomain,
    playbackId,
    preferPlayback,
    type,
    streamType,
    startTime,
    src: outerSrc,
    children,
    autoPlay,
    preload,
    ...restProps
  } = props;

  const [playerInitTime] = useState(generatePlayerInitTime());
  const [src, setSrc] = useState<MuxMediaProps['src']>(toMuxVideoURL(playbackId) ?? outerSrc);
  const playbackCoreRef = useRef<PlaybackCore | undefined>(undefined);
  const innerMediaElRef = useRef<HTMLAudioElement>(null);
  const mediaElRef = useCombinedRefs(innerMediaElRef, ref);

  useEffect(() => {
    setSrc(toMuxVideoURL(playbackId) ?? outerSrc);
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
    if (mediaElRef.current) {
      playbackCoreRef.current = initialize(propsWithState, mediaElRef.current, playbackCoreRef.current);
    }
  }, [src]);

  useEffect(() => {
    playbackCoreRef.current?.setAutoplay(autoPlay);
  }, [autoPlay]);

  useEffect(() => {
    playbackCoreRef.current?.setPreload(preload);
  }, [preload]);

  return (
    /** @TODO Fix types relationships (CJP) */
    <audio ref={mediaElRef as typeof innerMediaElRef} {...restProps}>
      {children}
    </audio>
  );
});

MuxAudio.propTypes = {
  envKey: PropTypes.string,
  debug: PropTypes.bool,
  disableCookies: PropTypes.bool,
  // Improve this by adding a full shape() definition for all metadata props
  // metadata: PropTypes.shape({}),
  metadata: PropTypes.any,
  beaconCollectionDomain: PropTypes.string,
  playbackId: PropTypes.string,
  playerInitTime: PropTypes.number,
  preferPlayback: PropTypes.oneOf(Object.values(PlaybackTypes)),
  type: PropTypes.oneOf(allMediaTypes),
  streamType: PropTypes.oneOf(Object.values(StreamTypes)),
  startTime: PropTypes.number,
};

export default MuxAudio;
