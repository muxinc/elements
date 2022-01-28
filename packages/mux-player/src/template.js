import {
  getChromeStylesFromProps,
  getPosterURLFromPlaybackId,
  getStoryboardURLFromPlaybackId,
} from "./helpers.js";
import { html, renderable } from "./utils.js";

/** @typedef { import(".").MuxProps } MuxProps */
/** @typedef { import("./utils").PersistentFragment } PersistentFragment */

export const StreamTypes = {
  VOD: "on-demand",
  LIVE: "live",
  LL_LIVE: "ll-live",
};

const MediaChromeSizes = {
  LG: "large",
  SM: "small",
};

const Loading = () => html`<div>Loading...</div>`;

const Spacer = () => html`
  <div
    style="flex-grow: 1; height: 100%; background-color: var(--media-control-background, rgba(20,20,30, 0.7));"
  ></div>
`;

/** @type {(props: MuxProps) => PersistentFragment} */
export const template = (props) => html`
  <media-controller style="${getChromeStylesFromProps(props)}">
    <mux-video
      slot="media"
      playback-id="${props.playbackId}"
      env-key="${props.envKey}"
      ${props.metadata?.video_id
        ? `metadata-video-id="${props.metadata.video_id}"`
        : ""}
      ${props.metadata?.video_title
        ? `metadata-video-title="${props.metadata.video_title}"`
        : ""}
      ${props.metadata?.viewer_user_id
        ? `metadata-viewer-user-id="${props.metadata.viewer_user_id}"`
        : ""}
      stream-type="${props.streamType}"
      start-time="${props.startTime}"
      poster="${props.poster ?? getPosterURLFromPlaybackId(props.playbackId)}"
      crossorigin
      playsinline
      ${props.debug ? "debug" : ""}
      ${props.muted ? "muted" : ""}
      ${props.preferMse ? "prefer-mse" : ""}
      ${props.autoplay ||
      props.streamType === StreamTypes.LIVE ||
      props.streamType === StreamTypes.LL_LIVE
        ? "autoplay"
        : ""}
    >
      <track
        label="thumbnails"
        default
        kind="metadata"
        src=${getStoryboardURLFromPlaybackId(props.playbackId)}
      />
    </mux-video>
    ${renderable("chromeRenderer", ChromeRenderer, props)}
  </media-controller>
`;

/** @type {(props: MuxProps) => PersistentFragment} */
export const ChromeRenderer = (props) => {
  const { streamType, playerSize } = props;
  if (streamType === StreamTypes.LIVE || streamType === StreamTypes.LL_LIVE) {
    if (playerSize === MediaChromeSizes.LG) {
      return LiveChromeLarge(props);
    }
    return LiveChromeSmall(props);
  }
  if (playerSize === MediaChromeSizes.LG) {
    return VodChromeLarge(props);
  }
  return VodChromeSmall(props);
};

/** @type {(props: MuxProps) => PersistentFragment} */
export const VodChromeSmall = (props) => html`
  <div
    slot="centered-chrome"
    style="--media-background-color: transparent; --media-control-background: transparent; --media-control-hover-background: transparent; --media-button-icon-width: 100%; width: 100%; display: flex; flex-flow: row; align-items: center; justify-content: center;"
  >
    ${renderable(
      "center",
      /** @type {(props: MuxProps) => PersistentFragment} */
      ({ showLoading }) =>
        showLoading
          ? Loading()
          : html`<media-seek-backward-button
                style="padding: 0; width: 20%"
              ></media-seek-backward-button>
              <media-play-button
                style="padding: 0; width: 20%"
              ></media-play-button>
              <media-seek-forward-button
                style="padding: 0; width: 20%"
              ></media-seek-forward-button>`,
      props
    )}
  </div>
  <media-control-bar>
    <media-time-range></media-time-range>
    <media-time-display show-duration remaining></media-time-display>
  </media-control-bar>
  <media-control-bar>
    <media-mute-button></media-mute-button>
    <media-volume-range></media-volume-range>
    ${Spacer()}
    ${renderable(
      "captionsButton",
      /** @type {(props: MuxProps) => PersistentFragment | boolean} */
      ({ hasCaptions }) =>
        hasCaptions && html`<media-captions-button></media-captions-button>`,
      props
    )}
    <media-pip-button></media-pip-button>
    <media-fullscreen-button></media-fullscreen-button>
  </media-control-bar>
`;

/** @type {(props: MuxProps) => PersistentFragment} */
export const VodChromeLarge = (props) => html`
  <div
    slot="centered-chrome"
    style="--media-background-color: transparent; --media-control-background: transparent; --media-control-hover-background: transparent; --media-button-icon-width: 100%; width: 100%; display: flex; flex-flow: row; align-items: center; justify-content: center;"
  >
    ${renderable(
      "center",
      /** @type {(props: MuxProps) => PersistentFragment} */
      ({ showLoading }) =>
        showLoading
          ? Loading()
          : html` <media-play-button
              style="padding: 0; width: 20%"
            ></media-play-button>`,
      props
    )}
  </div>
  <media-control-bar>
    <media-play-button></media-play-button>
    <media-seek-backward-button></media-seek-backward-button>
    <media-seek-forward-button></media-seek-forward-button>
    <media-mute-button></media-mute-button>
    <media-volume-range></media-volume-range>
    <media-time-range></media-time-range>
    <media-time-display show-duration remaining></media-time-display>
    <media-playback-rate-button></media-playback-rate-button>
    ${renderable(
      "captionsButton",
      /** @type {(props: MuxProps) => PersistentFragment | boolean} */
      ({ hasCaptions }) =>
        hasCaptions && html`<media-captions-button></media-captions-button>`,
      props
    )}
    <media-pip-button></media-pip-button>
    <media-fullscreen-button></media-fullscreen-button>
  </media-control-bar>
`;

/** @type {(props: MuxProps) => PersistentFragment} */
export const LiveChromeSmall = (props) => html`
  <div
    slot="centered-chrome"
    style="--media-background-color: transparent; --media-control-background: transparent; --media-control-hover-background: transparent; --media-button-icon-width: 100%; width: 100%; display: flex; flex-flow: row; align-items: center; justify-content: center;"
  >
    ${renderable(
      "center",
      /** @type {(props: MuxProps) => PersistentFragment} */
      ({ showLoading }) =>
        showLoading
          ? Loading()
          : html`<media-play-button
              style="padding: 0; width: 20%"
            ></media-play-button>`,
      props
    )}
  </div>
  <media-control-bar>
    <media-mute-button></media-mute-button>
    <media-volume-range></media-volume-range>
    ${Spacer()}
    ${renderable(
      "captionsButton",
      /** @type {(props: MuxProps) => PersistentFragment | boolean} */
      ({ hasCaptions }) =>
        hasCaptions && html`<media-captions-button></media-captions-button>`,
      props
    )}
    <media-pip-button></media-pip-button>
    <media-fullscreen-button></media-fullscreen-button>
  </media-control-bar>
`;

/** @type {(props: MuxProps) => PersistentFragment} */
export const LiveChromeLarge = (props) => html`
  <div
    slot="centered-chrome"
    style="--media-background-color: transparent; --media-control-background: transparent; --media-control-hover-background: transparent; --media-button-icon-width: 100%; width: 100%; display: flex; flex-flow: row; align-items: center; justify-content: center;"
  >
    ${renderable(
      "center",
      /** @type {(props: MuxProps) => PersistentFragment} */
      ({ showLoading }) =>
        showLoading
          ? Loading()
          : html` <media-play-button
              style="padding: 0; width: 20%"
            ></media-play-button>`,
      props
    )}
  </div>
  <media-control-bar>
    <media-play-button></media-play-button>
    <media-mute-button></media-mute-button>
    <media-volume-range></media-volume-range>
    ${Spacer()}
    <media-time-display></media-time-display>
    ${renderable(
      "captionsButton",
      /** @type {(props: MuxProps) => PersistentFragment | boolean} */
      ({ hasCaptions }) =>
        hasCaptions && html`<media-captions-button></media-captions-button>`,
      props
    )}
    <media-pip-button></media-pip-button>
    <media-fullscreen-button></media-fullscreen-button>
  </media-control-bar>
`;
