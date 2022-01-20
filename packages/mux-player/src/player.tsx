import "@mux-elements/mux-video";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import * as CSS from "csstype";
import type { Props as MuxVideoProps } from "@mux-elements/mux-video-react";
import {
  MuxVideo,
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
import Loading from "./media-chrome/components/loading";
import AirPlayButton from "./media-chrome/components/air-play-button";
import { StreamTypes } from "@mux-elements/playback-core";
import { useTimeoutWhen } from "./useTimeoutWhen";
import { useBoundingclientrect } from "./useBoundingclientrect";

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
    "-webkit-transform"?: CSS.Properties["transform"];
    "-ms-transform"?: CSS.Properties["transform"];
    // ...or allow any other property
    // [index: string]: any;
  }
}

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
  isLoading?: boolean;
  paused?: boolean;
  hasCaptions?: boolean;
  streamType?: MuxVideoProps["streamType"];
  playerSize?: string;
};

export const VodChromeSmall: React.FC<ChromeProps> = (props) => {
  const {
    onAirPlaySelected,
    hasAirPlay = false,
    hasCaptions = false,
    isLoading = false,
    paused,
  } = props;
  const [showLoading, setShowLoading] = useState(isLoading && !paused);
  useTimeoutWhen(
    () => {
      setShowLoading(isLoading && !paused);
    },
    500,
    isLoading && !paused
  );
  useEffect(() => {
    const nextShowLoading = isLoading && !paused;
    if (nextShowLoading) return;
    setShowLoading(nextShowLoading);
  }, [isLoading, paused]);
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
        {showLoading ? (
          <Loading />
        ) : (
          <>
            <MediaSeekBackwardButton
              style={{ padding: 0, width: "20%" }}
            ></MediaSeekBackwardButton>
            <MediaPlayButton
              style={{ padding: 0, width: "20%" }}
            ></MediaPlayButton>
            <MediaSeekForwardButton
              style={{ padding: 0, width: "20%" }}
            ></MediaSeekForwardButton>
          </>
        )}
      </div>
      <MediaControlBar>
        <MediaTimeRange></MediaTimeRange>
        <MediaTimeDisplay show-duration remaining></MediaTimeDisplay>
      </MediaControlBar>
      <MediaControlBar>
        <MediaMuteButton></MediaMuteButton>
        <MediaVolumeRange></MediaVolumeRange>
        <Spacer />
        {hasCaptions && <MediaCaptionsButton></MediaCaptionsButton>}
        <MediaPipButton></MediaPipButton>
        <MediaFullscreenButton></MediaFullscreenButton>
        {hasAirPlay && <AirPlayButton onClick={onAirPlaySelected} />}
      </MediaControlBar>
    </>
  );
};

export const VodChromeLarge: React.FC<ChromeProps> = (props) => {
  const {
    onAirPlaySelected,
    hasAirPlay = false,
    hasCaptions = false,
    isLoading = false,
    paused,
  } = props;
  const [showLoading, setShowLoading] = useState(isLoading && !paused);
  useTimeoutWhen(
    () => {
      setShowLoading(isLoading && !paused);
    },
    500,
    isLoading && !paused
  );
  useEffect(() => {
    const nextShowLoading = isLoading && !paused;
    if (nextShowLoading) return;
    setShowLoading(nextShowLoading);
  }, [isLoading, paused]);
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
        {showLoading ? <Loading /> : <></>}
      </div>
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
        {hasCaptions && <MediaCaptionsButton></MediaCaptionsButton>}
        <MediaPipButton></MediaPipButton>
        <MediaFullscreenButton></MediaFullscreenButton>
        {hasAirPlay && <AirPlayButton onClick={onAirPlaySelected} />}
      </MediaControlBar>
    </>
  );
};

export const LiveChromeSmall: React.FC<ChromeProps> = (props) => {
  const {
    onAirPlaySelected,
    hasAirPlay = false,
    hasCaptions = false,
    isLoading = false,
    paused,
  } = props;
  const [showLoading, setShowLoading] = useState(isLoading && !paused);
  useTimeoutWhen(
    () => {
      setShowLoading(isLoading && !paused);
    },
    500,
    isLoading && !paused
  );
  useEffect(() => {
    const nextShowLoading = isLoading && !paused;
    if (nextShowLoading) return;
    setShowLoading(nextShowLoading);
  }, [isLoading, paused]);
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
        {showLoading ? (
          <Loading />
        ) : (
          <>
            <MediaPlayButton
              style={{ padding: 0, width: "20%" }}
            ></MediaPlayButton>
          </>
        )}
      </div>
      <MediaControlBar>
        <MediaMuteButton></MediaMuteButton>
        <MediaVolumeRange></MediaVolumeRange>
        <Spacer />
        {hasCaptions && <MediaCaptionsButton></MediaCaptionsButton>}
        <MediaPipButton></MediaPipButton>
        <MediaFullscreenButton></MediaFullscreenButton>
        {hasAirPlay && <AirPlayButton onClick={onAirPlaySelected} />}
      </MediaControlBar>
    </>
  );
};

export const LiveChromeLarge: React.FC<ChromeProps> = (props) => {
  const {
    onAirPlaySelected,
    hasAirPlay = false,
    hasCaptions = false,
    isLoading = false,
    paused,
  } = props;
  const [showLoading, setShowLoading] = useState(isLoading && !paused);
  useTimeoutWhen(
    () => {
      setShowLoading(isLoading && !paused);
    },
    500,
    isLoading && !paused
  );
  useEffect(() => {
    const nextShowLoading = isLoading && !paused;
    if (nextShowLoading) return;
    setShowLoading(nextShowLoading);
  }, [isLoading, paused]);
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
        {showLoading ? <Loading /> : <></>}
      </div>
      <MediaControlBar>
        <MediaPlayButton></MediaPlayButton>
        <MediaMuteButton></MediaMuteButton>
        <MediaVolumeRange></MediaVolumeRange>
        <Spacer />
        {hasCaptions && <MediaCaptionsButton></MediaCaptionsButton>}
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
  defaultShowCaptions?: boolean;
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
    defaultShowCaptions = true,
    ChromeRenderer = DefaultChromeRenderer,
    children,
  } = props;
  const muxVideoRef = useRef<HTMLVideoElement>();

  const [isLoading, setIsLoading] = useState(true);

  /*
   * This is a pretty naiive check -- may have to make this more sophisticated
   */
  const onLoadingStateChange = useCallback(({ target }: Event) => {
    const mediaEl = target as HTMLMediaElement;
    const nextIsLoading = mediaEl.readyState < 3;
    setIsLoading(nextIsLoading);
  }, []);

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

  const [hasCaptions, setHasCaptions] = useState(false);
  const onTrackCountChange = ({ target }: TrackEvent) => {
    const textTracks = target as TextTrackList;
    const ccSubTracks = Array.from(textTracks).filter(
      ({ kind }) => kind === "subtitles" || kind === "captions"
    );

    // NOTE: This is a hack solution to "default" CC selection. Solution *should*
    // be better default state support in media-chrome (CJP).
    if (defaultShowCaptions && ccSubTracks.length && muxVideoRef.current) {
      const [ccSubTrack] = ccSubTracks;
      const eventType =
        ccSubTrack.kind === "captions"
          ? "mediashowcaptionsrequest"
          : "mediashowsubtitlesrequest";
      const showCCSubEvent = new CustomEvent(eventType, {
        composed: true,
        bubbles: true,
        detail: ccSubTrack,
      });
      muxVideoRef.current.dispatchEvent(showCCSubEvent);
    }
    setHasCaptions(!!ccSubTracks.length);
  };

  const muxVideoRefCb = useCallback((node?: HTMLVideoElement) => {
    if (muxVideoRef?.current) {
      muxVideoRef.current.removeEventListener(
        "timeupdate",
        onLoadingStateChange
      );
      muxVideoRef.current.removeEventListener("canplay", onLoadingStateChange);
      muxVideoRef.current.removeEventListener(
        "loadedmetadata",
        onLoadingStateChange
      );
      muxVideoRef.current.removeEventListener("waiting", onLoadingStateChange);
      muxVideoRef.current.removeEventListener("stalled", onLoadingStateChange);

      // Remove Event Handlers from prev
      if (supportsAirPlay) {
        muxVideoRef.current.removeEventListener(
          "webkitplaybacktargetavailabilitychanged",
          onPlaybackTargetChanged
        );

        muxVideoRef.current.textTracks.removeEventListener(
          "addtrack",
          onTrackCountChange
        );
        muxVideoRef.current.textTracks.removeEventListener(
          "removetrack",
          onTrackCountChange
        );
      }
    }

    muxVideoRef.current = node;
    if (!muxVideoRef?.current) return;

    const { textTracks } = muxVideoRef.current;
    const ccSubTracks = Array.from(textTracks).filter(
      ({ kind }) => kind === "subtitles" || kind === "captions"
    );

    // NOTE: This is a hack solution to "default" CC selection. Solution *should*
    // be better default state support in media-chrome (CJP).
    if (defaultShowCaptions && ccSubTracks.length) {
      const [ccSubTrack] = ccSubTracks;
      const eventType =
        ccSubTrack.kind === "captions"
          ? "mediashowcaptionsrequest"
          : "mediashowsubtitlesrequest";
      const showCCSubEvent = new CustomEvent(eventType, {
        composed: true,
        bubbles: true,
        detail: ccSubTrack,
      });
      muxVideoRef.current.dispatchEvent(showCCSubEvent);
    }
    setHasCaptions(!!ccSubTracks.length);

    muxVideoRef.current.addEventListener("timeupdate", onLoadingStateChange);
    muxVideoRef.current.addEventListener("canplay", onLoadingStateChange);
    muxVideoRef.current.addEventListener(
      "loadedmetadata",
      onLoadingStateChange
    );
    muxVideoRef.current.addEventListener("waiting", onLoadingStateChange);
    muxVideoRef.current.addEventListener("stalled", onLoadingStateChange);

    muxVideoRef.current.addEventListener(
      "webkitplaybacktargetavailabilitychanged",
      onPlaybackTargetChanged
    );

    muxVideoRef.current.textTracks.addEventListener(
      "addtrack",
      onTrackCountChange
    );
    muxVideoRef.current.textTracks.addEventListener(
      "removetrack",
      onTrackCountChange
    );
  }, []);

  const [playerSize, setPlayerSize] = useState(MediaChromeSizes.LG);

  const mediaControllerRef = useRef(null);
  console.warn(999, mediaControllerRef);
  // there's something wrong here with useBoundingclientrect
  // this component is run too much!!

  // const mediaControllerRect = useBoundingclientrect(mediaControllerRef);
  // useEffect(() => {
  //   if (!mediaControllerRect) return;

  //   const nextPlayerSize =
  //     mediaControllerRect.width < SMALL_BREAKPOINT
  //       ? MediaChromeSizes.SM
  //       : MediaChromeSizes.LG;

  //   setPlayerSize(nextPlayerSize);
  // }, [mediaControllerRect]);

  return (
    <MediaController
      ref={mediaControllerRef}
      style={getChromeStylesFromProps(props)}
      autohide={1}
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
        {children}
      </MuxVideo>
      <ChromeRenderer
        hasCaptions={hasCaptions}
        isLoading={isLoading}
        paused={!!muxVideoRef.current?.paused}
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
