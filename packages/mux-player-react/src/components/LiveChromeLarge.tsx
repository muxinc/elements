import React from "react";
import {
  Spacer,
  LiveIndicator,
  MediaControlBar,
  MediaLoadingIndicator,
  MediaAirplayButton,
  MediaPlayButton,
  MediaMuteButton,
  MediaVolumeRange,
  MediaCaptionsButton,
  MediaPipButton,
  MediaFullscreenButton,
} from "./controls";
import type { ChromeProps } from "../types";

const LiveChromeLarge: React.FC<ChromeProps> = (props) => {
  const {
    supportsAirPlay = false,
    supportsVolume = false,
    captionsAvailable = false,
  } = props;
  return (
    <>
      <MediaControlBar slot="top-chrome">
        <LiveIndicator></LiveIndicator>
      </MediaControlBar>
      <div slot="centered-chrome" no-auto-hide>
        <MediaLoadingIndicator></MediaLoadingIndicator>
      </div>
      <MediaControlBar>
        <MediaPlayButton></MediaPlayButton>
        <MediaMuteButton></MediaMuteButton>
        {supportsVolume && <MediaVolumeRange></MediaVolumeRange>}
        <Spacer />
        {captionsAvailable && <MediaCaptionsButton></MediaCaptionsButton>}
        {supportsAirPlay && <MediaAirplayButton></MediaAirplayButton>}
        <MediaPipButton></MediaPipButton>
        <MediaFullscreenButton></MediaFullscreenButton>
      </MediaControlBar>
    </>
  );
};

export default LiveChromeLarge;
