import React, { useEffect, useState } from "react";
import { useTimeoutWhen } from "../hooks/useTimeoutWhen";
import {
  MediaControlBar,
  MediaAirplayButton,
  MediaPlayButton,
  MediaMuteButton,
  MediaVolumeRange,
  MediaCaptionsButton,
  MediaPipButton,
  MediaFullscreenButton,
} from "../media-chrome";
import Loading from "../media-chrome/components/loading";
import Spacer from "./Spacer";
import type { ChromeProps } from "../types";

const LiveChromeLarge: React.FC<ChromeProps> = (props) => {
  const {
    supportsAirPlay = false,
    supportsVolume = false,
    captionsAvailable = false,
    loading = false,
    paused,
  } = props;
  const [showLoading, setShowLoading] = useState(loading && !paused);
  useTimeoutWhen(
    () => {
      setShowLoading(loading && !paused);
    },
    500,
    loading && !paused
  );
  useEffect(() => {
    const nextShowLoading = loading && !paused;
    if (nextShowLoading) return;
    setShowLoading(nextShowLoading);
  }, [loading, paused]);
  return (
    <>
      <div
        slot="centered-chrome"
        style={{
          "--media-background-color": "none",
          "--media-control-hover-background": "none",
          "--media-control-background": "none",
          "--media-button-icon-width": "100%",
          width: "100%",
          display: "flex",
          flexFlow: "row",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {showLoading ? <Loading /> : <></>}
      </div>
      <MediaControlBar>
        <MediaPlayButton></MediaPlayButton>
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

export default LiveChromeLarge;
