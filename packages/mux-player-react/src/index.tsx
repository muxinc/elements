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
        <div></div>
        <MediaTimeRange></MediaTimeRange>
        <MediaTimeDisplay show-duration remaining></MediaTimeDisplay>
        <MediaCaptionsButton></MediaCaptionsButton>
        <MediaPlaybackRateButton></MediaPlaybackRateButton>
        <MediaPipButton></MediaPipButton>
        <MediaFullscreenButton></MediaFullscreenButton>
        {hasAirPlay && <AirPlayButton onClick={onAirPlaySelected} />}
      </MediaControlBar>
    </>
  );
};

export const LiveChromeSmall = () => {};
export const LiveChromeLarge = () => {};

export const DefaultChromeRenderer: React.FC<ChromeProps> = (props) => {
  return <VodChromeLarge {...props} />;
};

type ReactInstanceBasic = React.ReactElement | null;
export type MuxPlayerProps = Partial<MuxVideoProps> & {
  ChromeRenderer?: (props: ChromeProps) => ReactInstanceBasic;
};

export const MuxPlayer: React.FC<MuxPlayerProps> = ({
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
}) => {
  let isAndroid = false;

  useEffect(() => {
    const userAgentStr = window?.navigator?.userAgent ?? "";
    isAndroid = userAgentStr.toLowerCase().indexOf("android") !== -1;
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

  /*
   *
   * For Android specifically with ll-live, it has a BadTime with native,
   * so we're going to force mse for that situation
   *
   */
  const defaultPreferMSE = useMemo(() => {
    if (isAndroid && streamType === "ll-live") {
      return true;
    }
    return undefined;
  }, [isAndroid, streamType]);

  return (
    <MediaController>
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
        preferMse={preferMse ?? defaultPreferMSE}
        autoPlay={autoPlay}
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
      />
    </MediaController>
  );
};

export default MuxPlayer;
