import React from "react";
import "@mux-elements/mux-player";
import type MuxPlayerElement from "@mux-elements/mux-player";
import { toNativeProps } from "./common/utils";

type ValueOf<T> = T[keyof T];

export type MuxPlayerRefAttributes = MuxPlayerElement;

type VideoApiAttributes = {
  // currentTime: number;
  volume: number;
  // src: string | null;
  // poster: string;
  // playbackRate: number;
  crossOrigin: string;
  autoPlay: boolean;
  loop: boolean;
  muted: boolean;
};
type StreamTypes = {
  VOD: "on-demand";
  LIVE: "live";
  LL_LIVE: "ll-live";
};

type MuxMediaPropTypes = {
  // envKey: Options["data"]["env_key"];
  envKey: string;
  // debug: Options["debug"] & Hls["config"]["debug"];
  debug: boolean;
  // metadata: Partial<Options["data"]>;
  metadata: { [k: string]: any };
  beaconDomain: string;
  playbackId: string;
  preferMse: boolean;
  streamType: ValueOf<StreamTypes> | "vod";
  startTime: number;
  children: never[];
};

export type MuxPlayerProps = {
  forwardSeekOffset?: number;
  backwardSeekOffset?: number;
  metadataVideoId?: string;
  metadataVideoTitle?: string;
  metadataViewerUserId?: string;
  primaryColor?: string;
  secondaryColor?: string;
  tertiaryColor?: string;
} & Partial<MuxMediaPropTypes> &
  Partial<VideoApiAttributes>;

const MuxPlayerInternal = React.forwardRef<
  MuxPlayerRefAttributes,
  MuxPlayerProps
>(({ children, ...props }, ref) => {
  return React.createElement(
    "mux-player",
    toNativeProps({ ...props, ref }),
    children
  );
});

const MuxPlayer = React.forwardRef<MuxPlayerRefAttributes, MuxPlayerProps>(
  (props, ref) => {
    const {
      /** @TODO Remove these once defaults are added to mux-player (CJP) */
      forwardSeekOffset = 10,
      backwardSeekOffset = 10,
      /** @TODO Will have to handle event handlers here via ref (CJP) */
      ...restProps
    } = props;
    return (
      <MuxPlayerInternal
        ref={ref}
        forwardSeekOffset={forwardSeekOffset}
        backwardSeekOffset={backwardSeekOffset}
        {...restProps}
      />
    );
  }
);

export default MuxPlayer;
