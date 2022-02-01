import React from "react";
import {
  MediaControlBar,
  MediaLoadingIndicator,
  MediaAirplayButton,
  MediaPlayButton,
  MediaMuteButton,
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
      <div slot="centered-chrome" no-auto-hide>
        <MediaLoadingIndicator></MediaLoadingIndicator>
        <MediaPlayButton></MediaPlayButton>
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
