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
import Loading from "./media-chrome/components/loading";
import AirPlayButton from "./media-chrome/components/air-play-button";
import { StreamTypes } from "@mux-elements/playback-core";
import { useTimeoutWhen } from "./useTimeoutWhen";
import { useBoundingclientrect } from "./useBoundingclientrect";
import { useCombinedRefs } from "./useCombinedRefs";

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
    "--media-control-hover-background"?: CSS.Properties["backgroundColor"];
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

let testMediaEl: HTMLMediaElement | undefined;
const getTestMediaEl = (nodeName = "video") => {
  if (testMediaEl) return testMediaEl;
  if (typeof window !== "undefined") {
    testMediaEl = document.createElement(nodeName as "video" | "audio");
  }
  return testMediaEl;
};

const hasVolumeSupportAsync = async (
  mediaEl: HTMLMediaElement | undefined = getTestMediaEl()
) => {
  if (!mediaEl) return false;
  const prevVolume = mediaEl.volume;
  mediaEl.volume = prevVolume / 2 + 0.1;
  return new Promise<boolean>((resolve, reject) => {
    setTimeout(() => {
      resolve(mediaEl.volume !== prevVolume);
    }, 0);
  });
};

type ChromeProps = {
  onAirPlaySelected?: React.MouseEventHandler;
  supportsAirplay?: boolean;
  supportsVolume?: boolean;
  loading?: boolean;
  paused?: boolean;
  captionsAvailable?: boolean;
  streamType?: MuxVideoProps["streamType"];
  playerSize?: string;
};

export const VodChromeSmall: React.FC<ChromeProps> = (props) => {
  const {
    onAirPlaySelected,
    supportsAirplay = false,
    supportsVolume = false,
    captionsAvailable = false,
    loading = false,
    paused,
  } = props;
  const [showLoading, setShowLoading] = useState(loading && !paused);
  useTimeoutWhen(
    () => {
      setShowLoading(loading && !paused);
    },
    500,
    loading && !paused
  );
  useEffect(() => {
    const nextShowLoading = loading && !paused;
    if (nextShowLoading) return;
    setShowLoading(nextShowLoading);
  }, [loading, paused]);
  return (
    <>
      <div
        slot="centered-chrome"
        style={{
          "--media-background-color": "none",
          "--media-control-hover-background": "none",
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
        <MediaTimeDisplay show-duration></MediaTimeDisplay>
      </MediaControlBar>
      <MediaControlBar>
        <MediaMuteButton></MediaMuteButton>
        {supportsVolume && <MediaVolumeRange></MediaVolumeRange>}
        <Spacer />
        {captionsAvailable && <MediaCaptionsButton></MediaCaptionsButton>}
        <MediaPipButton></MediaPipButton>
        <MediaFullscreenButton></MediaFullscreenButton>
        {supportsAirplay && <AirPlayButton onClick={onAirPlaySelected} />}
      </MediaControlBar>
    </>
  );
};

export const VodChromeLarge: React.FC<ChromeProps> = (props) => {
  const {
    onAirPlaySelected,
    supportsAirplay = false,
    supportsVolume = false,
    captionsAvailable = false,
    loading = false,
    paused,
  } = props;
  const [showLoading, setShowLoading] = useState(loading && !paused);
  useTimeoutWhen(
    () => {
      setShowLoading(loading && !paused);
    },
    500,
    loading && !paused
  );
  useEffect(() => {
    const nextShowLoading = loading && !paused;
    if (nextShowLoading) return;
    setShowLoading(nextShowLoading);
  }, [loading, paused]);
  return (
    <>
      <div
        slot="centered-chrome"
        style={{
          "--media-background-color": "none",
          "--media-control-hover-background": "none",
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
        {supportsVolume && <MediaVolumeRange></MediaVolumeRange>}
        <MediaTimeRange></MediaTimeRange>
        <MediaTimeDisplay
          show-duration
          style={{ color: "inherit" }}
        ></MediaTimeDisplay>
        {captionsAvailable && <MediaCaptionsButton></MediaCaptionsButton>}
        <MediaPipButton></MediaPipButton>
        <MediaFullscreenButton></MediaFullscreenButton>
        {supportsAirplay && <AirPlayButton onClick={onAirPlaySelected} />}
      </MediaControlBar>
    </>
  );
};

export const LiveChromeSmall: React.FC<ChromeProps> = (props) => {
  const {
    onAirPlaySelected,
    supportsAirplay = false,
    supportsVolume = false,
    captionsAvailable = false,
    loading = false,
    paused,
  } = props;
  const [showLoading, setShowLoading] = useState(loading && !paused);
  useTimeoutWhen(
    () => {
      setShowLoading(loading && !paused);
    },
    500,
    loading && !paused
  );
  useEffect(() => {
    const nextShowLoading = loading && !paused;
    if (nextShowLoading) return;
    setShowLoading(nextShowLoading);
  }, [loading, paused]);
  return (
    <>
      <div
        slot="centered-chrome"
        style={{
          "--media-background-color": "none",
          "--media-control-hover-background": "none",
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
        {supportsVolume && <MediaVolumeRange></MediaVolumeRange>}
        <Spacer />
        {captionsAvailable && <MediaCaptionsButton></MediaCaptionsButton>}
        <MediaPipButton></MediaPipButton>
        <MediaFullscreenButton></MediaFullscreenButton>
        {supportsAirplay && <AirPlayButton onClick={onAirPlaySelected} />}
      </MediaControlBar>
    </>
  );
};
export const LiveChromeLarge: React.FC<ChromeProps> = (props) => {
  const {
    onAirPlaySelected,
    supportsAirplay = false,
    supportsVolume = false,
    captionsAvailable = false,
    loading = false,
    paused,
  } = props;
  const [showLoading, setShowLoading] = useState(loading && !paused);
  useTimeoutWhen(
    () => {
      setShowLoading(loading && !paused);
    },
    500,
    loading && !paused
  );
  useEffect(() => {
    const nextShowLoading = loading && !paused;
    if (nextShowLoading) return;
    setShowLoading(nextShowLoading);
  }, [loading, paused]);
  return (
    <>
      <div
        slot="centered-chrome"
        style={{
          "--media-background-color": "none",
          "--media-control-hover-background": "none",
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
        {supportsVolume && <MediaVolumeRange></MediaVolumeRange>}
        <Spacer />
        {captionsAvailable && <MediaCaptionsButton></MediaCaptionsButton>}
        <MediaPlaybackRateButton></MediaPlaybackRateButton>
        <MediaPipButton></MediaPipButton>
        <MediaFullscreenButton></MediaFullscreenButton>
        {supportsAirplay && <AirPlayButton onClick={onAirPlaySelected} />}
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
  onPlayerReady?: () => void; // params?
  onError?: (e: ErrorEvent) => void;
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
        "--media-control-hover-background": secondaryColor,
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

export const MuxPlayer = React.forwardRef<
  HTMLVideoElement | undefined,
  Omit<MuxPlayerProps, "ref">
>((props, ref) => {
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
    key,
    onPlayerReady,
    // onError,
    ...restProps
  } = props;
  const muxVideoRef = useRef<HTMLVideoElement>();
  const mediaElRef = useCombinedRefs(muxVideoRef, ref);

  const [supportsVolume, setSupportsVolume] = useState(false);
  useEffect(() => {
    (async () => {
      setSupportsVolume(await hasVolumeSupportAsync());
    })();
  }, []);

  const [loading, setLoading] = useState(true);

  /*
   * This is a pretty naiive check -- may have to make this more sophisticated
   */
  const onLoadingStateChange = useCallback(({ target }: Event) => {
    const mediaEl = target as HTMLMediaElement;
    const nextIsLoading = mediaEl.readyState < 3;
    setLoading(nextIsLoading);
  }, []);

  let supportsAirPlay = false;
  useEffect(() => {
    supportsAirPlay = !!window.WebKitPlaybackTargetAvailabilityEvent;
  }, []);
  const [supportsAirplay, setSupportsAirplay] = useState(false);
  const onPlaybackTargetChanged = (
    event: Event & { availability?: boolean }
  ) => {
    setSupportsAirplay(!!event.availability);
  };

  const [captionsAvailable, setCaptionsAvailable] = useState(false);
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
    setCaptionsAvailable(!!ccSubTracks.length);
  };

  const muxVideoRefCb = useCallback((node?: HTMLVideoElement) => {
    if (mediaElRef?.current) {
      mediaElRef.current.removeEventListener(
        "timeupdate",
        onLoadingStateChange
      );
      mediaElRef.current.removeEventListener("canplay", onLoadingStateChange);
      mediaElRef.current.removeEventListener(
        "loadedmetadata",
        onLoadingStateChange
      );
      mediaElRef.current.removeEventListener("waiting", onLoadingStateChange);
      mediaElRef.current.removeEventListener("stalled", onLoadingStateChange);

      // Remove Event Handlers from prev
      if (supportsAirPlay) {
        mediaElRef.current.removeEventListener(
          "webkitplaybacktargetavailabilitychanged",
          onPlaybackTargetChanged
        );
      }

      mediaElRef.current.textTracks.removeEventListener(
        "addtrack",
        onTrackCountChange
      );
      mediaElRef.current.textTracks.removeEventListener(
        "removetrack",
        onTrackCountChange
      );
    }

    mediaElRef.current = node;
    if (!mediaElRef?.current) return;

    const { textTracks } = mediaElRef.current;
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
      mediaElRef.current.dispatchEvent(showCCSubEvent);
    }
    setCaptionsAvailable(!!ccSubTracks.length);

    mediaElRef.current.addEventListener("timeupdate", onLoadingStateChange);
    mediaElRef.current.addEventListener("canplay", onLoadingStateChange);
    mediaElRef.current.addEventListener("loadedmetadata", onLoadingStateChange);
    mediaElRef.current.addEventListener("waiting", onLoadingStateChange);
    mediaElRef.current.addEventListener("stalled", onLoadingStateChange);

    mediaElRef.current.addEventListener(
      "webkitplaybacktargetavailabilitychanged",
      onPlaybackTargetChanged
    );

    mediaElRef.current.textTracks.addEventListener(
      "addtrack",
      onTrackCountChange
    );
    mediaElRef.current.textTracks.addEventListener(
      "removetrack",
      onTrackCountChange
    );
  }, []);

  const [playerSize, setPlayerSize] = useState(MediaChromeSizes.LG);

  const mediaControllerRef = useRef(null);
  const mediaControllerRect = useBoundingclientrect(mediaControllerRef);
  useEffect(() => {
    if (!mediaControllerRect) return;

    const nextPlayerSize =
      mediaControllerRect.width < SMALL_BREAKPOINT
        ? MediaChromeSizes.SM
        : MediaChromeSizes.LG;

    setPlayerSize(nextPlayerSize);
  }, [mediaControllerRect]);

  // Add appropriate conditions for "playerReady" here
  // * media loaded (?)
  // * captions availability known
  // * volume support known
  // * airplay support known
  // * bounding rect/size known (?)
  // * (stretch) aspect ratio resizing done
  useEffect(() => {
    if (!onPlayerReady) return;
    // params?
    onPlayerReady();
  }, [onPlayerReady]);

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
        {...restProps}
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
        captionsAvailable={captionsAvailable}
        supportsVolume={supportsVolume}
        loading={loading}
        paused={!!muxVideoRef.current?.paused}
        supportsAirplay={supportsAirplay}
        onAirPlaySelected={() => {
          muxVideoRef.current?.webkitShowPlaybackTargetPicker?.();
        }}
        streamType={streamType}
        playerSize={playerSize}
      />
    </MediaController>
  );
});

export default MuxPlayer;
