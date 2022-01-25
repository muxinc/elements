import React, { useEffect, useState } from "react";
import { useTimeoutWhen } from "../hooks/useTimeoutWhen";
import {
  MediaControlBar,
  MediaPlayButton,
  MediaSeekBackwardButton,
  MediaSeekForwardButton,
  MediaMuteButton,
  MediaVolumeRange,
  MediaTimeRange,
  MediaTimeDisplay,
  MediaCaptionsButton,
  // MediaPlaybackRateButton,
  MediaPipButton,
  MediaFullscreenButton,
  MediaPlaybackRateButton,
} from "../media-chrome";
import AirPlayButton from "../media-chrome/components/air-play-button";
import Spacer from "./Spacer";
import Loading from "../media-chrome/components/loading";
import type { ChromeProps } from "../types";

const VodChromeSmall: React.FC<ChromeProps> = (props) => {
  const {
    onAirPlaySelected,
    supportsAirPlay = false,
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
        <MediaPlaybackRateButton></MediaPlaybackRateButton>
        <MediaPipButton></MediaPipButton>
        <MediaFullscreenButton></MediaFullscreenButton>
        {supportsAirPlay && <AirPlayButton onClick={onAirPlaySelected} />}
      </MediaControlBar>
    </>
  );
};

export default VodChromeSmall;
