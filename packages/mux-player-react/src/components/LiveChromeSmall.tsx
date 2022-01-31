import React from "react";
import {
  MediaControlBar,
  MediaLoadingIndicator,
  MediaAirplayButton,
  MediaPlayButton,
  MediaMuteButton,
  MediaVolumeRange,
  MediaCaptionsButton,
  MediaPipButton,
  MediaFullscreenButton,
} from "../media-chrome";
import Spacer from "./Spacer";
import type { ChromeProps } from "../types";

const LiveChromeSmall: React.FC<ChromeProps> = (props) => {
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
          <MediaLoadingIndicator></MediaLoadingIndicator>
          <MediaPlayButton
            style={{ padding: 0, width: "20%" }}
          ></MediaPlayButton>
        </>
      </div>
      <div slot="centered-chrome" no-auto-hide>
        <MediaLoadingIndicator></MediaLoadingIndicator>
      </div>
      <MediaControlBar>
        <MediaMuteButton></MediaMuteButton>
        {supportsVolume && <MediaVolumeRange></MediaVolumeRange>}
        <Spacer />
        {captionsAvailable && <MediaCaptionsButton></MediaCaptionsButton>}
        <MediaPipButton></MediaPipButton>
        <MediaFullscreenButton></MediaFullscreenButton>
        {supportsAirPlay && <MediaAirplayButton></MediaAirplayButton>}
      </MediaControlBar>
    </>
  );
};

export default LiveChromeSmall;
