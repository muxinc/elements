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
import LiveIndicator from "../media-chrome/components/LiveIndicator";
import MediaVolumeButton from "../media-chrome/components/MediaVolumeButton";

const LiveChromeSmall: React.FC<ChromeProps> = (props) => {
  const {
    supportsAirPlay = false,
    supportsVolume = false,
    captionsAvailable = false,
  } = props;
  return (
    <>
      <MediaControlBar slot="top-chrome">
        <LiveIndicator></LiveIndicator>
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
          <MediaPlayButton style={{ padding: 0 }}></MediaPlayButton>
        </>
      </div>
      <div slot="centered-chrome" no-auto-hide>
        <MediaLoadingIndicator></MediaLoadingIndicator>
      </div>
      <MediaControlBar>
        <MediaMuteButton></MediaMuteButton>
        <MediaVolumeButton supportsVolume={supportsVolume}></MediaVolumeButton>
        <Spacer />
        <MediaFullscreenButton></MediaFullscreenButton>
      </MediaControlBar>
    </>
  );
};

export default LiveChromeSmall;
