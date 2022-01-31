import React, { useEffect, useState } from "react";
import { useTimeoutWhen } from "../hooks/useTimeoutWhen";
import {
  MediaControlBar,
  MediaAirplayButton,
  MediaPlayButton,
  MediaSeekBackwardButton,
  MediaSeekForwardButton,
  MediaMuteButton,
  MediaVolumeRange,
  MediaTimeRange,
  MediaTimeDisplay,
  MediaCaptionsButton,
  MediaPipButton,
  MediaFullscreenButton,
  MediaPlaybackRateButton,
} from "../media-chrome";
import Loading from "../media-chrome/components/loading";
import type { ChromeProps } from "../types";

const VodChromeLarge: React.FC<ChromeProps> = (props) => {
  const {
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
        <MediaPlaybackRateButton></MediaPlaybackRateButton>
        <MediaPipButton></MediaPipButton>
        <MediaFullscreenButton></MediaFullscreenButton>
        {supportsAirPlay && <MediaAirplayButton></MediaAirplayButton>}
      </MediaControlBar>
    </>
  );
};

export default VodChromeLarge;
