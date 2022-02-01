import React from "react";

import {
  MediaControlBar,
  MediaLoadingIndicator,
  MediaAirplayButton as MediaAirplayButtonDefault,
  MediaPlayButton as MediaPlayButtonDefault,
  MediaSeekBackwardButton as MediaSeekBackwardButtonDefault,
  MediaSeekForwardButton as MediaSeekForwardButtonDefault,
  MediaMuteButton as MediaMuteButtonDefault,
  MediaVolumeRange,
  MediaTimeRange,
  MediaTimeDisplay,
  MediaCaptionsButton as MediaCaptionsButtonDefault,
  MediaPipButton as MediaPipButtonDefault,
  MediaFullscreenButton as MediaFullscreenButtonDefault,
  MediaPlaybackRateButton,
} from "../../media-chrome";

import {
  Airplay,
  CaptionsOff,
  CaptionsOn,
  FullscreenEnter,
  FullscreenExit,
  Pause,
  Pip,
  Play,
  SeekBackward,
  SeekForward,
  VolumeHigh,
  VolumeLow,
  VolumeOff,
} from "./icons";

import LiveIndicator from "./LiveIndicator";
import Spacer from "./Spacer";
import MediaVolumeButton from "./MediaVolumeButton";

export { LiveIndicator };
export { Spacer };
export { MediaVolumeButton };

export { MediaControlBar };
export { MediaLoadingIndicator };
export { MediaVolumeRange };
export { MediaTimeRange };
export { MediaTimeDisplay };
export { MediaPlaybackRateButton };

export const MediaPlayButton = () => {
  return (
    <MediaPlayButtonDefault>
      <Pause slot="pause"></Pause>
      <Play slot="play"></Play>
    </MediaPlayButtonDefault>
  );
};

export const MediaSeekBackwardButton = () => {
  return (
    <MediaSeekBackwardButtonDefault>
      <SeekBackward slot="backward"></SeekBackward>
    </MediaSeekBackwardButtonDefault>
  );
};

export const MediaSeekForwardButton = () => {
  return (
    <MediaSeekForwardButtonDefault>
      <SeekForward slot="forward"></SeekForward>
    </MediaSeekForwardButtonDefault>
  );
};

export const MediaMuteButton = () => {
  return (
    <MediaMuteButtonDefault>
      <VolumeHigh slot="high"></VolumeHigh>
      <VolumeLow slot="medium"></VolumeLow>
      <VolumeLow slot="low"></VolumeLow>
      <VolumeOff slot="off"></VolumeOff>
    </MediaMuteButtonDefault>
  );
};

export const MediaCaptionsButton = () => {
  return (
    <MediaCaptionsButtonDefault>
      <CaptionsOff slot="off"></CaptionsOff>
      <CaptionsOn slot="on"></CaptionsOn>
    </MediaCaptionsButtonDefault>
  );
};

export const MediaAirplayButton = () => {
  return (
    <MediaAirplayButtonDefault>
      <Airplay slot="airplay"></Airplay>
    </MediaAirplayButtonDefault>
  );
};

export const MediaPipButton = () => {
  return (
    <MediaPipButtonDefault>
      <Pip slot="enter"></Pip>
      <Pip slot="exit"></Pip>
    </MediaPipButtonDefault>
  );
};

export const MediaFullscreenButton = () => {
  return (
    <MediaFullscreenButtonDefault>
      <FullscreenEnter slot="enter"></FullscreenEnter>
      <FullscreenExit slot="exit"></FullscreenExit>
    </MediaFullscreenButtonDefault>
  );
};
