import useCombinedRefs from "./use-combined-refs";
import React, { useEffect, useMemo, useRef, useState } from "react";
import PropTypes from "prop-types";
import {
  allMediaTypes,
  initialize,
  setupAutoplay,
  MuxMediaProps,
  StreamTypes,
  toMuxVideoURL,
  PlaybackEngine,
} from "@mux-elements/playback-core";
import { getPlayerVersion } from "./env";

export type Props = Omit<
  React.DetailedHTMLProps<
    React.VideoHTMLAttributes<HTMLVideoElement>,
    HTMLVideoElement
  >,
  "autoPlay"
> &
  MuxMediaProps;

const playerSoftwareVersion = getPlayerVersion();
const playerSoftwareName = "mux-video-react";

const MuxVideo = React.forwardRef<HTMLVideoElement | undefined, Partial<Props>>(
  (props, ref) => {
    const {
      envKey,
      debug,
      beaconDomain,
      playbackId,
      preferMse,
      type,
      streamType,
      startTime,
      src: outerSrc,
      children,
      autoPlay,
      ...restProps
    } = props;

    const [playerInitTime] = useState(Date.now());

    const [src, setSrc] = useState<MuxMediaProps["src"]>(
      toMuxVideoURL(playbackId) ?? outerSrc
    );

    const playbackEngineRef = useRef<PlaybackEngine | undefined>(undefined);
    const innerMediaElRef = useRef<HTMLVideoElement>(null);
    const [updateAutoplay, setUpdateAutoplay] = useState(() => (x: any) => {});

    const mediaElRef = useCombinedRefs(innerMediaElRef, ref);

    useEffect(() => {
      const src = toMuxVideoURL(playbackId) ?? outerSrc;
      setSrc(src);
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
      const nextPlaybackEngineRef = initialize(
        propsWithState,
        mediaElRef.current,
        playbackEngineRef.current
      );
      playbackEngineRef.current = nextPlaybackEngineRef;
      setUpdateAutoplay(() =>
        setupAutoplay(mediaElRef.current, autoPlay, playbackEngineRef.current)
      );
    }, [src]);

    useEffect(() => {
      updateAutoplay(autoPlay);
    }, [autoPlay]);

    return (
      <video ref={mediaElRef} {...restProps}>
        {children}
      </video>
    );
  }
);

MuxVideo.propTypes = {
  envKey: PropTypes.string,
  debug: PropTypes.bool,
  // Improve this by adding a full shape() definition for all metadata props
  // metadata: PropTypes.shape({}),
  metadata: PropTypes.any,
  beaconDomain: PropTypes.string,
  playbackId: PropTypes.string,
  playerInitTime: PropTypes.number,
  preferMse: PropTypes.bool,
  type: PropTypes.oneOf(allMediaTypes),
  streamType: PropTypes.oneOf(Object.values(StreamTypes)),
  startTime: PropTypes.number,
};

export default MuxVideo;
