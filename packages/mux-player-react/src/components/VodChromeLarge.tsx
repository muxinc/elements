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
      <div slot="centered-chrome" no-auto-hide>
        <MediaLoadingIndicator></MediaLoadingIndicator>
      </div>
      <MediaControlBar>
        <MediaPlayButton></MediaPlayButton>
        <MediaSeekBackwardButton></MediaSeekBackwardButton>
        <MediaSeekForwardButton></MediaSeekForwardButton>
        <MediaTimeRange></MediaTimeRange>
        <MediaTimeDisplay show-duration></MediaTimeDisplay>
        <MediaMuteButton></MediaMuteButton>
        {supportsVolume && <MediaVolumeRange></MediaVolumeRange>}
        <MediaPlaybackRateButton></MediaPlaybackRateButton>
        {captionsAvailable && <MediaCaptionsButton></MediaCaptionsButton>}
        {supportsAirPlay && <MediaAirplayButton></MediaAirplayButton>}
        <MediaPipButton></MediaPipButton>
        <MediaFullscreenButton></MediaFullscreenButton>
      </MediaControlBar>
    </>
  );
};

export default VodChromeLarge;
