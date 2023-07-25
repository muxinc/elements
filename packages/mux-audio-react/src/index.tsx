import { useCombinedRefs } from './use-combined-refs';
import * as React from 'react';
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
  React.DetailedHTMLProps<React.AudioHTMLAttributes<HTMLAudioElement>, HTMLAudioElement>,
  'autoPlay'
> &
  MuxMediaProps;

const playerSoftwareVersion = getPlayerVersion();
const playerSoftwareName = 'mux-audio-react';

const MuxAudio = React.forwardRef<HTMLAudioElement | undefined, Partial<Props>>((props, ref) => {
  const { playbackId, src: outerSrc, children, autoPlay, preload, ...restProps } = props;

  const [playerInitTime] = React.useState(generatePlayerInitTime());
  const [src, setSrc] = React.useState<MuxMediaProps['src']>(toMuxVideoURL(playbackId) ?? outerSrc);
  const playbackCoreRef = React.useRef<PlaybackCore | undefined>(undefined);
  const innerMediaElRef = React.useRef<HTMLAudioElement>(null);
  const mediaElRef = useCombinedRefs(innerMediaElRef, ref);

  React.useEffect(() => {
    setSrc(toMuxVideoURL(playbackId) ?? outerSrc);
  }, [outerSrc, playbackId]);

  React.useEffect(() => {
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

  React.useEffect(() => {
    playbackCoreRef.current?.setAutoplay(autoPlay);
  }, [autoPlay]);

  React.useEffect(() => {
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
