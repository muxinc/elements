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
import Spacer from "./Spacer";
import type { ChromeProps } from "../types";

const VodChromeSmall: React.FC<ChromeProps> = (props) => {
  const {
    supportsAirPlay = false,
    supportsVolume = false,
    captionsAvailable = false,
  } = props;
  return (
    <>
      <div
        slot="centered-chrome"
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
      </div>
      <div slot="centered-chrome" no-auto-hide>
        <MediaLoadingIndicator></MediaLoadingIndicator>
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
        {supportsAirPlay && <MediaAirplayButton></MediaAirplayButton>}
      </MediaControlBar>
    </>
  );
};

export default VodChromeSmall;
