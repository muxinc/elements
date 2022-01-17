import "media-chrome";
import { h } from "../common/little-vdom.js";
import { toNativeProps } from "../common/utils";

/** @typedef { HTMLElement } MCC */

/** @type { MCC } */
const MediaChromeButton = ({ children, ...props }) => {
  return h("media-chrome-button", toNativeProps(props), children);
};

export { MediaChromeButton };

/** @type { MCC } */
const MediaContainerTemp = ({ children, ...props }) => {
  return h("media-container-temp", toNativeProps(props), children);
};

export { MediaContainerTemp };

/** @type { MCC } */
const MediaController = ({ children, ...props }) => {
  return h("media-controller", toNativeProps({ ...props }), children);
};

export { MediaController };

/** @type { MCC } */
const MediaChromeRange = ({ children, ...props }) => {
  return h("media-chrome-range", toNativeProps(props), children);
};

export { MediaChromeRange };

/** @type { MCC } */
const MediaControlBar = ({ children, ...props }) => {
  return h("media-control-bar", toNativeProps(props), children);
};

export { MediaControlBar };

/** @type { MCC } */
const MediaTextDisplay = ({ children, ...props }) => {
  return h("media-text-display", toNativeProps(props), children);
};

export { MediaTextDisplay };

/** @type { MCC } */
const MediaCurrentTimeDisplay = ({ children, ...props }) => {
  return h("media-current-time-display", toNativeProps(props), children);
};

export { MediaCurrentTimeDisplay };

/** @type { MCC } */
const MediaDurationDisplay = ({ children, ...props }) => {
  return h("media-duration-display", toNativeProps(props), children);
};

export { MediaDurationDisplay };

/** @type { MCC } */
const MediaTimeDisplay = ({ children, ...props }) => {
  return h("media-time-display", toNativeProps(props), children);
};

export { MediaTimeDisplay };

/** @type { MCC } */
const MediaCaptionsButton = ({ children, ...props }) => {
  return h("media-captions-button", toNativeProps(props), children);
};

export { MediaCaptionsButton };

/** @type { MCC } */
const MediaSeekForwardButton = ({ children, ...props }) => {
  return h("media-seek-forward-button", toNativeProps(props), children);
};

export { MediaSeekForwardButton };

/** @type { MCC } */
const MediaFullscreenButton = ({ children, ...props }) => {
  return h("media-fullscreen-button", toNativeProps(props), children);
};

export { MediaFullscreenButton };

/** @type { MCC } */
const MediaMuteButton = ({ children, ...props }) => {
  return h("media-mute-button", toNativeProps(props), children);
};

export { MediaMuteButton };

/** @type { MCC } */
const MediaPipButton = ({ children, ...props }) => {
  return h("media-pip-button", toNativeProps(props), children);
};

export { MediaPipButton };

/** @type { MCC } */
const MediaPlayButton = ({ children, ...props }) => {
  return h("media-play-button", toNativeProps(props), children);
};

export { MediaPlayButton };

/** @type { MCC } */
const MediaPlaybackRateButton = ({ children, ...props }) => {
  return h("media-playback-rate-button", toNativeProps(props), children);
};

export { MediaPlaybackRateButton };

/** @type { MCC } */
const MediaTimeRange = ({ children, ...props }) => {
  return h("media-time-range", toNativeProps(props), children);
};

export { MediaTimeRange };

/** @type { MCC } */
const MediaProgressRange = ({ children, ...props }) => {
  return h("media-progress-range", toNativeProps(props), children);
};

export { MediaProgressRange };

/** @type { MCC } */
const MediaSeekBackwardButton = ({ children, ...props }) => {
  return h("media-seek-backward-button", toNativeProps(props), children);
};

export { MediaSeekBackwardButton };

/** @type { MCC } */
const MediaThumbnailPreview = ({ children, ...props }) => {
  return h("media-thumbnail-preview", toNativeProps(props), children);
};

export { MediaThumbnailPreview };

/** @type { MCC } */
const MediaTitleBar = ({ children, ...props }) => {
  return h("media-title-bar", toNativeProps(props), children);
};

export { MediaTitleBar };

/** @type { MCC } */
const MediaVolumeRange = ({ children, ...props }) => {
  return h("media-volume-range", toNativeProps(props), children);
};

export { MediaVolumeRange };

/** @type { MCC } */
const MediaChrome = ({ children, ...props }) => {
  return h("media-chrome", toNativeProps(props), children);
};

export { MediaChrome };

/** @type { MCC } */
const MediaContainer = ({ children, ...props }) => {
  return h("media-container", toNativeProps(props), children);
};

export { MediaContainer };
