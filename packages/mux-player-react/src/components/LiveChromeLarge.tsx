import React, { useEffect, useState } from "react";
import { useTimeoutWhen } from "../hooks/useTimeoutWhen";
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
