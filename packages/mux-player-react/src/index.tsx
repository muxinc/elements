import React, { useCallback, useEffect, useMemo, useState } from "react";
import * as CSS from "csstype";
import MuxVideo from "@mux-elements/mux-video-react";
import type { Props as MuxVideoProps } from "@mux-elements/mux-video-react";
import {
  MediaController,
  MediaControlBar,
  MediaPlayButton,
  MediaSeekBackwardButton,
  MediaSeekForwardButton,
  MediaMuteButton,
  MediaVolumeRange,
  MediaTimeRange,
  MediaTimeDisplay,
  MediaCaptionsButton,
  MediaPlaybackRateButton,
  MediaPipButton,
  MediaFullscreenButton,
} from "./media-chrome";
import { useRef } from "react";
import AirPlayButton from "./media-chrome/components/air-play-button";
import { StreamTypes } from "@mux-elements/playback-core";

export { StreamTypes };

const MediaChromeSizes = {
  LG: "large",
  SM: "small",
};

declare global {
  interface Window {
    WebKitPlaybackTargetAvailabilityEvent?: Event;
  }

  interface HTMLVideoElement {
    webkitShowPlaybackTargetPicker?: Function;
  }
}

declare module "csstype" {
  interface Properties {
    "--media-background-color"?: CSS.Properties["backgroundColor"];
    "--media-control-background"?: CSS.Properties["backgroundColor"];
    "--media-button-icon-width"?: CSS.Properties["width"];
    // ...or allow any other property
    // [index: string]: any;
  }
}

const useEffectInEvent = (
  event: "resize" | "scroll",
  set: () => void = () => {},
  useCapture: boolean = false
) => {
  useEffect(() => {
    set();
    window.addEventListener(event, set, useCapture);
    return () => window.removeEventListener(event, set, useCapture);
  }, []);
};

export const useRect = <T extends Element>(): [
  DOMRect | undefined,
  React.MutableRefObject<T | null> | ((node?: T) => void)
] => {
  const ref = useRef<T>();
  const [rect, setRect] = useState<DOMRect>();

  const set = () => setRect(ref.current?.getBoundingClientRect());

  useEffectInEvent("resize", set);
  useEffectInEvent("scroll", set, true);
  const refCb = useCallback((node?: T) => {
    ref.current = node;
    set();
  }, []);

  return [rect, refCb];
};

const getPosterURLFromPlaybackId = (playbackId: MuxVideoProps["playbackId"]) =>
  `https://image.mux.com/${playbackId}/thumbnail.jpg`;

const getStoryboardURLFromPlaybackId = (
  playbackId: MuxVideoProps["playbackId"]
) => `https://image.mux.com/${playbackId}/storyboard.vtt`;

const Spacer = () => {
  return (
    <div
      style={{
        flexGrow: 1,
        height: "100%",
        backgroundColor: "var(--media-control-background, rgba(20,20,30, 0.7))",
      }}
    ></div>
  );
};

type ChromeProps = {
  onAirPlaySelected?: React.MouseEventHandler;
  hasAirPlay?: boolean;
  streamType?: MuxVideoProps["streamType"];
  playerSize?: string;
};

export const VodChromeSmall: React.FC<ChromeProps> = (props) => {
  const { onAirPlaySelected, hasAirPlay = false } = props;
  return (
    <>
      <div
        slot="centered-chrome"
        style={{
          "--media-background-color": "none",
          "--media-control-background": "none",
          "--media-button-icon-width": "100%",
          width: "100%",
          display: "flex",
          flexFlow: "row",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <MediaSeekBackwardButton
          style={{ padding: 0, width: "20%" }}
        ></MediaSeekBackwardButton>
        <MediaPlayButton style={{ padding: 0, width: "20%" }}></MediaPlayButton>
        <MediaSeekForwardButton
          style={{ padding: 0, width: "20%" }}
        ></MediaSeekForwardButton>
      </div>
      <MediaControlBar>
        <MediaTimeRange></MediaTimeRange>
        <MediaTimeDisplay show-duration remaining></MediaTimeDisplay>
      </MediaControlBar>
      <MediaControlBar>
        <MediaMuteButton></MediaMuteButton>
        <MediaVolumeRange></MediaVolumeRange>
        <Spacer />
        <MediaCaptionsButton></MediaCaptionsButton>
        <MediaPipButton></MediaPipButton>
        <MediaFullscreenButton></MediaFullscreenButton>
        {hasAirPlay && <AirPlayButton onClick={onAirPlaySelected} />}
      </MediaControlBar>
    </>
  );
};

export const VodChromeLarge: React.FC<ChromeProps> = (props) => {
  const { onAirPlaySelected, hasAirPlay = false } = props;
  return (
    <>
      {/* <div slot="centered-chrome">
        <MediaSeekBackwardButton></MediaSeekBackwardButton>
        <MediaPlayButton></MediaPlayButton>
        <MediaSeekForwardButton></MediaSeekForwardButton>
      </div> */}
      {/* <MediaControlBar>
        <MediaTimeRange></MediaTimeRange>
        <MediaTimeDisplay show-duration remaining></MediaTimeDisplay>
      </MediaControlBar> */}
      <MediaControlBar>
        <MediaPlayButton></MediaPlayButton>
        <MediaSeekForwardButton></MediaSeekForwardButton>
        <MediaSeekBackwardButton></MediaSeekBackwardButton>
        <MediaMuteButton></MediaMuteButton>
        <MediaVolumeRange></MediaVolumeRange>
        <MediaTimeRange></MediaTimeRange>
        <MediaTimeDisplay
          show-duration
          remaining
          style={{ color: "inherit" }}
        ></MediaTimeDisplay>
        <MediaCaptionsButton></MediaCaptionsButton>
        <MediaPipButton></MediaPipButton>
        <MediaFullscreenButton></MediaFullscreenButton>
        {hasAirPlay && <AirPlayButton onClick={onAirPlaySelected} />}
      </MediaControlBar>
    </>
  );
};

export const LiveChromeSmall: React.FC<ChromeProps> = (props) => {
  const { onAirPlaySelected, hasAirPlay = false } = props;
  return (
    <>
      <div
        slot="centered-chrome"
        style={{
          "--media-background-color": "none",
          "--media-control-background": "none",
          "--media-button-icon-width": "100%",
          width: "100%",
          display: "flex",
          flexFlow: "row",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <MediaPlayButton style={{ padding: 0, width: "20%" }}></MediaPlayButton>
      </div>
      <MediaControlBar>
        <MediaMuteButton></MediaMuteButton>
        <MediaVolumeRange></MediaVolumeRange>
        <Spacer />
        <MediaCaptionsButton></MediaCaptionsButton>
        <MediaPipButton></MediaPipButton>
        <MediaFullscreenButton></MediaFullscreenButton>
        {hasAirPlay && <AirPlayButton onClick={onAirPlaySelected} />}
      </MediaControlBar>
    </>
  );
};
export const LiveChromeLarge: React.FC<ChromeProps> = (props) => {
  const { onAirPlaySelected, hasAirPlay = false } = props;
  return (
    <>
      <MediaControlBar>
        <MediaPlayButton></MediaPlayButton>
        <MediaMuteButton></MediaMuteButton>
        <MediaVolumeRange></MediaVolumeRange>
        <Spacer />
        <MediaCaptionsButton></MediaCaptionsButton>
        <MediaPlaybackRateButton></MediaPlaybackRateButton>
        <MediaPipButton></MediaPipButton>
        <MediaFullscreenButton></MediaFullscreenButton>
        {hasAirPlay && <AirPlayButton onClick={onAirPlaySelected} />}
      </MediaControlBar>
    </>
  );
};

export const DefaultChromeRenderer: React.FC<ChromeProps> = (props) => {
  const { streamType, playerSize } = props;
  if (playerSize === MediaChromeSizes.SM) {
    if (streamType === StreamTypes.LIVE || streamType === StreamTypes.LL_LIVE) {
      return <LiveChromeSmall {...props} />;
    }
    return <VodChromeSmall {...props} />;
  }
  if (streamType === StreamTypes.LIVE || streamType === StreamTypes.LL_LIVE) {
    return <LiveChromeLarge {...props} />;
  }
  return <VodChromeLarge {...props} />;
};

type ReactInstanceBasic = React.ReactElement | null;
export type MuxPlayerProps = Partial<MuxVideoProps> & {
  ChromeRenderer?: (props: ChromeProps) => ReactInstanceBasic;
  primaryColor?: React.CSSProperties["color"];
  secondaryColor?: React.CSSProperties["color"];
  tertiaryColor?: React.CSSProperties["color"];
};

const getChromeStylesFromProps = (props: MuxPlayerProps) => {
  const { primaryColor, secondaryColor, tertiaryColor } = props;

  const primaryColorStyles = primaryColor
    ? {
        "--media-icon-color": primaryColor,
        "--media-range-thumb-background": primaryColor,
        "--media-range-bar-color": primaryColor,
        color: primaryColor,
      }
    : {};

  const secondaryColorStyles = secondaryColor
    ? {
        "--media-background-color": secondaryColor,
        "--media-control-background": secondaryColor,
      }
    : {};

  const tertiaryColorStyles = tertiaryColor
    ? {
        "--media-range-track-background": tertiaryColor,
      }
    : {};

  return {
    maxWidth: "100%",
    color: "#ffffff",
    ...primaryColorStyles,
    ...secondaryColorStyles,
    ...tertiaryColorStyles,
  };
};

const SMALL_BREAKPOINT = 700;

export const MuxPlayer: React.FC<MuxPlayerProps> = (props) => {
  const {
    playbackId = "",
    streamType,
    envKey,
    metadata,
    startTime,
    preferMse,
    //   src,
    poster,
    muted,
    autoPlay,
    debug,
    ChromeRenderer = DefaultChromeRenderer,
  } = props;

  let supportsAirPlay = false;
  useEffect(() => {
    supportsAirPlay = !!window.WebKitPlaybackTargetAvailabilityEvent;
  }, []);
  const [hasAirPlay, setHasAirPlay] = useState(false);
  const onPlaybackTargetChanged = (
    event: Event & { availability?: boolean }
  ) => {
    setHasAirPlay(!!event.availability);
  };

  const muxVideoRef = useRef<HTMLVideoElement>();
  const muxVideoRefCb = useCallback((node?: HTMLVideoElement) => {
    if (muxVideoRef?.current) {
      // Remove Event Handlers from prev
      if (supportsAirPlay) {
        muxVideoRef.current.removeEventListener(
          "webkitplaybacktargetavailabilitychanged",
          onPlaybackTargetChanged
        );
      }
    }
    muxVideoRef.current = node;
    if (!muxVideoRef?.current) return;
    muxVideoRef.current.addEventListener(
      "webkitplaybacktargetavailabilitychanged",
      onPlaybackTargetChanged
    );
  }, []);

  const [playerSize, setPlayerSize] = useState(MediaChromeSizes.LG);
  const [mediaControllerRect, mediaControllerRef] = useRect();
  useEffect(() => {
    if (!mediaControllerRect) return;

    const nextPlayerSize =
      mediaControllerRect.width < SMALL_BREAKPOINT
        ? MediaChromeSizes.SM
        : MediaChromeSizes.LG;

    setPlayerSize(nextPlayerSize);
  }, [mediaControllerRect]);

  return (
    <MediaController
      ref={mediaControllerRef}
      style={getChromeStylesFromProps(props)}
    >
      <MuxVideo
        key={playbackId}
        ref={muxVideoRefCb}
        slot="media"
        // src={src}
        playbackId={playbackId}
        envKey={envKey}
        streamType={streamType}
        metadata={metadata}
        debug={debug}
        startTime={startTime}
        preferMse={preferMse}
        autoPlay={
          autoPlay ||
          streamType === StreamTypes.LIVE ||
          streamType === StreamTypes.LL_LIVE
        }
        poster={poster ?? getPosterURLFromPlaybackId(playbackId)}
        crossOrigin=""
        playsInline
        muted={muted}
      >
        <track
          label="thumbnails"
          default
          kind="metadata"
          src={getStoryboardURLFromPlaybackId(playbackId)}
        />
      </MuxVideo>
      <ChromeRenderer
        hasAirPlay={hasAirPlay}
        onAirPlaySelected={() => {
          muxVideoRef.current?.webkitShowPlaybackTargetPicker?.();
        }}
        streamType={streamType}
        playerSize={playerSize}
      />
    </MediaController>
  );
};

export default MuxPlayer;
