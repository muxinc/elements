import React from "react";
import "media-chrome";
import { toNativeProps } from "./common/utils";

/** @typedef { import("react").HTMLElement } MCC */

/** @type { MCC } */
const MuxVideo = ({ children, ...props }) => {
  return React.createElement("mux-video", toNativeProps(props), children);
};

export { MuxVideo };

/** @type { MCC } */
const MediaChromeButton = ({ children, ...props }) => {
  return React.createElement(
    "media-chrome-button",
    toNativeProps(props),
    children
  );
};

export { MediaChromeButton };

/** @type { MCC } */
const MediaContainerTemp = ({ children, ...props }) => {
  return React.createElement(
    "media-container-temp",
    toNativeProps(props),
    children
  );
};

export { MediaContainerTemp };

/** @type { MCC } */
const MediaController = ({ children, ...props }) => {
  return React.createElement(
    "media-controller",
    toNativeProps({ ...props }),
    children
  );
};

export { MediaController };

/** @type { MCC } */
const MediaChromeRange = ({ children, ...props }) => {
  return React.createElement(
    "media-chrome-range",
    toNativeProps(props),
    children
  );
};

export { MediaChromeRange };

/** @type { MCC } */
const MediaControlBar = ({ children, ...props }) => {
  return React.createElement(
    "media-control-bar",
    toNativeProps(props),
    children
  );
};

export { MediaControlBar };

/** @type { MCC } */
const MediaTextDisplay = ({ children, ...props }) => {
  return React.createElement(
    "media-text-display",
    toNativeProps(props),
    children
  );
};

export { MediaTextDisplay };

/** @type { MCC } */
const MediaCurrentTimeDisplay = ({ children, ...props }) => {
  return React.createElement(
    "media-current-time-display",
    toNativeProps(props),
    children
  );
};

export { MediaCurrentTimeDisplay };

/** @type { MCC } */
const MediaDurationDisplay = ({ children, ...props }) => {
  return React.createElement(
    "media-duration-display",
    toNativeProps(props),
    children
  );
};

export { MediaDurationDisplay };

/** @type { MCC } */
const MediaTimeDisplay = ({ children, ...props }) => {
  return React.createElement(
    "media-time-display",
    toNativeProps(props),
    children
  );
};

export { MediaTimeDisplay };

/** @type { MCC } */
const MediaCaptionsButton = ({ children, ...props }) => {
  return React.createElement(
    "media-captions-button",
    toNativeProps(props),
    children
  );
};

export { MediaCaptionsButton };

/** @type { MCC } */
const MediaSeekForwardButton = ({ children, ...props }) => {
  return React.createElement(
    "media-seek-forward-button",
    toNativeProps(props),
    children
  );
};

export { MediaSeekForwardButton };

/** @type { MCC } */
const MediaFullscreenButton = ({ children, ...props }) => {
  return React.createElement(
    "media-fullscreen-button",
    toNativeProps(props),
    children
  );
};

export { MediaFullscreenButton };

/** @type { MCC } */
const MediaMuteButton = ({ children, ...props }) => {
  return React.createElement(
    "media-mute-button",
    toNativeProps(props),
    children
  );
};

export { MediaMuteButton };

/** @type { MCC } */
const MediaPipButton = ({ children, ...props }) => {
  return React.createElement(
    "media-pip-button",
    toNativeProps(props),
    children
  );
};

export { MediaPipButton };

/** @type { MCC } */
const MediaPlayButton = ({ children, ...props }) => {
  return React.createElement(
    "media-play-button",
    toNativeProps(props),
    children
  );
};

export { MediaPlayButton };

/** @type { MCC } */
const MediaPlaybackRateButton = ({ children, ...props }) => {
  return React.createElement(
    "media-playback-rate-button",
    toNativeProps(props),
    children
  );
};

export { MediaPlaybackRateButton };

/** @type { MCC } */
const MediaTimeRange = ({ children, ...props }) => {
  return React.createElement(
    "media-time-range",
    toNativeProps(props),
    children
  );
};

export { MediaTimeRange };

/** @type { MCC } */
const MediaProgressRange = ({ children, ...props }) => {
  return React.createElement(
    "media-progress-range",
    toNativeProps(props),
    children
  );
};

export { MediaProgressRange };

/** @type { MCC } */
const MediaSeekBackwardButton = ({ children, ...props }) => {
  return React.createElement(
    "media-seek-backward-button",
    toNativeProps(props),
    children
  );
};

export { MediaSeekBackwardButton };

/** @type { MCC } */
const MediaThumbnailPreview = ({ children, ...props }) => {
  return React.createElement(
    "media-thumbnail-preview",
    toNativeProps(props),
    children
  );
};

export { MediaThumbnailPreview };

/** @type { MCC } */
const MediaTitleBar = ({ children, ...props }) => {
  return React.createElement("media-title-bar", toNativeProps(props), children);
};

export { MediaTitleBar };

/** @type { MCC } */
const MediaVolumeRange = ({ children, ...props }) => {
  return React.createElement(
    "media-volume-range",
    toNativeProps(props),
    children
  );
};

export { MediaVolumeRange };

/** @type { MCC } */
const MediaChrome = ({ children, ...props }) => {
  return React.createElement("media-chrome", toNativeProps(props), children);
};

export { MediaChrome };

/** @type { MCC } */
const MediaContainer = ({ children, ...props }) => {
  return React.createElement("media-container", toNativeProps(props), children);
};

export { MediaContainer };
