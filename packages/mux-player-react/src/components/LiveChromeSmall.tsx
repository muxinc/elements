import React from "react";
import {
  Spacer,
  LiveIndicator,
  MediaVolumeButton,
  MediaControlBar,
  MediaLoadingIndicator,
  MediaAirplayButton,
  MediaPlayButton,
  MediaCaptionsButton,
  MediaPipButton,
  MediaFullscreenButton,
} from "./controls";
import type { ChromeProps } from "../types";

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
      <div slot="centered-chrome" no-auto-hide="">
        <MediaLoadingIndicator></MediaLoadingIndicator>
        <MediaPlayButton></MediaPlayButton>
      </div>
      <MediaControlBar>
        <MediaVolumeButton supportsVolume={supportsVolume}></MediaVolumeButton>
        <Spacer />
        <MediaFullscreenButton></MediaFullscreenButton>
      </MediaControlBar>
    </>
  );
};

export default LiveChromeSmall;
