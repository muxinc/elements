import React from "react";
import {
  MediaControlBar,
  MediaLoadingIndicator,
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
import type { ChromeProps } from "../types";

const VodChromeLarge: React.FC<ChromeProps> = (props) => {
  const {
    supportsAirPlay = false,
    supportsVolume = false,
    captionsAvailable = false,
  } = props;
  return (
    <>
      <div
        slot="centered-chrome"
        no-auto-hide
        style={{
          "--media-background-color": "transparent",
          "--media-control-hover-background": "transparent",
          "--media-control-background": "transparent",
          "--media-button-icon-width": "100%",
          width: "100%",
          display: "flex",
          flexFlow: "row",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <MediaLoadingIndicator></MediaLoadingIndicator>
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
