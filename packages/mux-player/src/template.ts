import {
  getChromeStylesFromProps,
  getPosterURLFromPlaybackId,
  getStoryboardURLFromPlaybackId,
} from "./helpers";
import { html, renderable } from "./utils";

import type { MuxTemplateProps } from "./types";
import type { PersistentFragment } from "./utils";

export const StreamTypes = {
  VOD: "on-demand",
  LIVE: "live",
  LL_LIVE: "ll-live",
};

const MediaChromeSizes = {
  LG: "large",
  SM: "small",
};

const Spacer = () => html`<div class="mxp-spacer"></div>`;

export const template = (props: MuxTemplateProps) => html`
  <media-controller
    style="--media-aspect-ratio: 16/9; ${getChromeStylesFromProps(props)}"
  >
    <mux-video
      slot="media"
      crossorigin
      playsinline
      ${props.autoplay ||
      props.streamType === StreamTypes.LIVE ||
      props.streamType === StreamTypes.LL_LIVE
        ? "autoplay"
        : ""}
      ${props.muted ? "muted" : ""}
      ${props.debug ? "debug" : ""}
      ${props.preferMse ? "prefer-mse" : ""}
      ${props.startTime != null ? `start-time="${props.startTime}"` : ""}
      poster="${props.poster ?? getPosterURLFromPlaybackId(props.playbackId)}"
      ${props.playbackId ? `playback-id="${props.playbackId}"` : ""}
      ${props.envKey ? `env-key="${props.envKey}"` : ""}
      ${props.streamType ? `stream-type="${props.streamType}"` : ""}
      ${props.metadata?.video_id
        ? `metadata-video-id="${props.metadata.video_id}"`
        : ""}
      ${props.metadata?.video_title
        ? `metadata-video-title="${props.metadata.video_title}"`
        : ""}
      ${props.metadata?.viewer_user_id
        ? `metadata-viewer-user-id="${props.metadata.viewer_user_id}"`
        : ""}
    >
      <track
        label="thumbnails"
        default
        kind="metadata"
        src=${getStoryboardURLFromPlaybackId(props.playbackId)}
      />
    </mux-video>
    <style>
      .mxp-spacer {
        flex-grow: 1;
        height: 100%;
        background-color: var(
          --media-control-background,
          rgba(20, 20, 30, 0.7)
        );
      }
      .mxp-center-controls {
        --media-background-color: transparent;
        --media-control-background: transparent;
        --media-control-hover-background: transparent;
        --media-button-icon-width: 100%;
        pointer-events: none;
        width: 100%;
        display: flex;
        flex-flow: row;
        align-items: center;
        justify-content: center;
      }
      .mxp-center-controls media-play-button {
        padding: 0;
        width: min(15%, 200px);
      }
      .mxp-center-controls media-seek-backward-button,
      .mxp-center-controls media-seek-forward-button {
        padding: 0 1%;
        width: min(12%, 120px);
      }
      media-loading-indicator {
        --media-loading-icon-width: 100%;
        pointer-events: none;
        position: absolute;
        width: min(15%, 200px);
        display: flex;
        flex-flow: row;
        align-items: center;
        justify-content: center;
      }
      /* Intentionally don't target the div for transition but the children
         of the div. Prevents messing with media-chrome's autohide feature. */
      media-loading-indicator + div * {
        transition: opacity 0.15s;
        opacity: 1;
      }
      media-loading-indicator[media-loading]:not([media-paused]) ~ div > * {
        opacity: 0;
        transition-delay: 400ms;
      }
      media-volume-range {
        width: min(100%, 100px);
      }
      media-time-display {
        white-space: nowrap;
      }
    </style>
    ${renderable("chromeRenderer", ChromeRenderer, props)}
  </media-controller>
`;

export const ChromeRenderer = (props: MuxTemplateProps) => {
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

export const VodChromeSmall = (props: MuxTemplateProps) => html`
  <media-loading-indicator
    slot="centered-chrome"
    no-auto-hide
  ></media-loading-indicator>
  <div slot="centered-chrome" class="mxp-center-controls">
    <media-seek-backward-button></media-seek-backward-button>
    <media-play-button></media-play-button>
    <media-seek-forward-button></media-seek-forward-button>
  </div>
  <media-control-bar>
    <media-time-range></media-time-range>
    <media-time-display show-duration remaining></media-time-display>
  </media-control-bar>
  <media-control-bar>
    <media-mute-button></media-mute-button>
    ${renderable(
      "volumeRange",
      ({ supportsVolume }: Partial<MuxTemplateProps>) =>
        supportsVolume && html`<media-volume-range></media-volume-range>`,
      props
    )}
    ${Spacer()}
    ${renderable(
      "captionsButton",
      ({ hasCaptions }: Partial<MuxTemplateProps>) =>
        hasCaptions && html`<media-captions-button></media-captions-button>`,
      props
    )}
    ${renderable(
      "airplayButton",
      ({ supportsAirPlay }: Partial<MuxTemplateProps>) =>
        supportsAirPlay && html`<media-airplay-button></media-airplay-button>`,
      props
    )}
    <media-pip-button></media-pip-button>
    <media-fullscreen-button></media-fullscreen-button>
  </media-control-bar>
`;

export const VodChromeLarge = (props: MuxTemplateProps) => html`
  <media-loading-indicator
    slot="centered-chrome"
    no-auto-hide
  ></media-loading-indicator>
  <div slot="centered-chrome" class="mxp-center-controls">
    <media-play-button></media-play-button>
  </div>
  <media-control-bar>
    <media-play-button></media-play-button>
    <media-seek-backward-button></media-seek-backward-button>
    <media-seek-forward-button></media-seek-forward-button>
    <media-mute-button></media-mute-button>
    ${renderable(
      "volumeRange",
      ({ supportsVolume }: Partial<MuxTemplateProps>) =>
        supportsVolume && html`<media-volume-range></media-volume-range>`,
      props
    )}
    <media-time-range></media-time-range>
    <media-time-display show-duration remaining></media-time-display>
    <media-playback-rate-button></media-playback-rate-button>
    ${renderable(
      "captionsButton",
      ({ hasCaptions }: Partial<MuxTemplateProps>) =>
        hasCaptions && html`<media-captions-button></media-captions-button>`,
      props
    )}
    ${renderable(
      "airplayButton",
      ({ supportsAirPlay }: Partial<MuxTemplateProps>) =>
        supportsAirPlay && html`<media-airplay-button></media-airplay-button>`,
      props
    )}
    <media-pip-button></media-pip-button>
    <media-fullscreen-button></media-fullscreen-button>
  </media-control-bar>
`;

export const LiveChromeSmall = (props: MuxTemplateProps) => html`
  <media-loading-indicator
    slot="centered-chrome"
    no-auto-hide
  ></media-loading-indicator>
  <div slot="centered-chrome" class="mxp-center-controls">
    <media-play-button></media-play-button>
  </div>
  <media-control-bar>
    <media-mute-button></media-mute-button>
    ${renderable(
      "volumeRange",
      ({ supportsVolume }: Partial<MuxTemplateProps>) =>
        supportsVolume && html`<media-volume-range></media-volume-range>`,
      props
    )}
    ${Spacer()}
    ${renderable(
      "captionsButton",
      ({ hasCaptions }: Partial<MuxTemplateProps>) =>
        hasCaptions && html`<media-captions-button></media-captions-button>`,
      props
    )}
    <media-pip-button></media-pip-button>
    <media-fullscreen-button></media-fullscreen-button>
  </media-control-bar>
`;

export const LiveChromeLarge = (props: MuxTemplateProps) => html`
  <media-loading-indicator
    slot="centered-chrome"
    no-auto-hide
  ></media-loading-indicator>
  <div slot="centered-chrome" class="mxp-center-controls">
    <media-play-button></media-play-button>
  </div>
  <media-control-bar>
    <media-play-button></media-play-button>
    <media-mute-button></media-mute-button>
    ${renderable(
      "volumeRange",
      ({ supportsVolume }: Partial<MuxTemplateProps>) =>
        supportsVolume && html`<media-volume-range></media-volume-range>`,
      props
    )}
    ${Spacer()}
    <media-time-display></media-time-display>
    ${renderable(
      "captionsButton",
      ({ hasCaptions }: Partial<MuxTemplateProps>) =>
        hasCaptions && html`<media-captions-button></media-captions-button>`,
      props
    )}
    <media-pip-button></media-pip-button>
    <media-fullscreen-button></media-fullscreen-button>
  </media-control-bar>
`;
