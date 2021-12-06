import Hls from "hls.js";
import useCombinedRefs from "./use-combined-refs";
import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import {
  allMediaTypes,
  initialize,
  MuxMediaProps,
  StreamTypes,
  toMuxVideoURL,
} from "@mux-elements/playback-core";

export type Props = React.DetailedHTMLProps<
  React.VideoHTMLAttributes<HTMLVideoElement>,
  HTMLVideoElement
> &
  MuxMediaProps;

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
      src: outerSrc,
      children,
      ...restProps
    } = props;

    const [playerInitTime] = useState(Date.now());

    const [src, setSrc] = useState<MuxMediaProps["src"]>(
      toMuxVideoURL(playbackId) ?? outerSrc
    );

    const hlsRef = useRef<Hls | undefined>(undefined);
    const innerMediaElRef = useRef<HTMLVideoElement>(null);

    const mediaElRef = useCombinedRefs(innerMediaElRef, ref);

    useEffect(() => {
      const src = toMuxVideoURL(playbackId) ?? outerSrc;
      setSrc(src);
    }, [outerSrc, playbackId]);

    useEffect(() => {
      const propsWithState = { ...props, src, playerInitTime };
      const nextHlsRef = initialize(
        propsWithState,
        mediaElRef.current,
        hlsRef.current
      );
      hlsRef.current = nextHlsRef;
    }, [src]);

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
};

export default MuxVideo;
