import React, { useCallback, useEffect, useMemo, useState } from "react";
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

declare global {
  interface Window {
    WebKitPlaybackTargetAvailabilityEvent?: Event;
  }

  interface HTMLVideoElement {
    webkitShowPlaybackTargetPicker?: Function;
  }
}

const getPosterURLFromPlaybackId = (playbackId: MuxVideoProps["playbackId"]) =>
  `https://image.mux.com/${playbackId}/thumbnail.jpg`;

const getStoryboardURLFromPlaybackId = (
  playbackId: MuxVideoProps["playbackId"]
) => `https://image.mux.com/${playbackId}/storyboard.vtt`;

type ChromeProps = {
  onAirPlaySelected?: React.MouseEventHandler;
  hasAirPlay?: boolean;
  streamType?: MuxVideoProps["streamType"];
};

export const VodChromeSmall = () => {};

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

export const LiveChromeSmall = () => {};
export const LiveChromeLarge: React.FC<ChromeProps> = (props) => {
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
        <MediaMuteButton></MediaMuteButton>
        <MediaVolumeRange></MediaVolumeRange>
        <div style={{ flexGrow: 1 }}></div>
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
  const { streamType } = props;
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
        "background-color": tertiaryColor,
      }
    : {};

  return {
    color: "#ffffff",
    ...primaryColorStyles,
    ...secondaryColorStyles,
    ...tertiaryColorStyles,
  };
};

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

  return (
    <MediaController style={getChromeStylesFromProps(props)}>
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
      />
    </MediaController>
  );
};

export default MuxPlayer;
