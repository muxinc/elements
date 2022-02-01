import React from "react";
import {
  MediaControlBar,
  MediaLoadingIndicator,
  MediaAirplayButton,
  MediaPlayButton,
  MediaSeekBackwardButton,
  MediaSeekForwardButton,
  MediaTimeRange,
  MediaTimeDisplay,
  MediaCaptionsButton,
  MediaPipButton,
  MediaFullscreenButton,
  MediaPlaybackRateButton,
} from "../media-chrome";
import Spacer from "./Spacer";
import type { ChromeProps } from "../types";
import MediaVolumeButton from "../media-chrome/components/MediaVolumeButton";

const VodChromeSmall: React.FC<ChromeProps> = (props) => {
  const {
    supportsAirPlay = false,
    supportsVolume = false,
    captionsAvailable = false,
  } = props;
  return (
    <>
      <MediaControlBar slot="top-chrome">
        <Spacer />
        {captionsAvailable && <MediaCaptionsButton></MediaCaptionsButton>}
        {supportsAirPlay && <MediaAirplayButton></MediaAirplayButton>}
        <MediaPipButton></MediaPipButton>
      </MediaControlBar>
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
            style={{ padding: 0 }}
          ></MediaSeekBackwardButton>
          <MediaPlayButton style={{ padding: 0 }}></MediaPlayButton>
          <MediaSeekForwardButton
            style={{ padding: 0 }}
          ></MediaSeekForwardButton>
        </>
      </div>
      <div slot="centered-chrome" no-auto-hide>
        <MediaLoadingIndicator></MediaLoadingIndicator>
      </div>
      <MediaControlBar>
        <MediaVolumeButton supportsVolume={supportsVolume}></MediaVolumeButton>
        <MediaTimeRange></MediaTimeRange>
        <MediaTimeDisplay></MediaTimeDisplay>
        <MediaPlaybackRateButton></MediaPlaybackRateButton>
        <MediaFullscreenButton></MediaFullscreenButton>
      </MediaControlBar>
    </>
  );
};

export default VodChromeSmall;
