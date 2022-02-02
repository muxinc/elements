import {
  getChromeStylesFromProps,
  getPosterURLFromPlaybackId,
  getStoryboardURLFromPlaybackId,
} from "./helpers";
import { html, renderable } from "./utils";
import * as icons from "./icons";

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
  <style>
    media-controller {
      --media-control-background: transparent;
      --media-control-hover-background: transparent;
      --media-range-track-background: rgba(255, 255, 255, 0.5);
      --media-range-track-border-radius: 3px;
      --media-aspect-ratio: 16 / 9;
    }
    .mxp-spacer {
      flex-grow: 1;
      height: 100%;
      background-color: var(--media-control-background, rgba(20, 20, 30, 0.7));
    }
    .mxp-center-controls {
      --media-background-color: transparent;
      --media-button-icon-width: 100%;
      --media-button-icon-height: auto;
      pointer-events: none;
      width: 100%;
      display: flex;
      flex-flow: row;
      align-items: center;
      justify-content: center;
    }
    .mxp-center-controls media-play-button {
      padding: 0;
      width: min(9%, 90px);
    }
    .mxp-center-controls media-seek-backward-button,
    .mxp-center-controls media-seek-forward-button {
      padding: 0;
      margin: 0 10%;
      width: min(7%, 70px);
    }
    media-loading-indicator {
      --media-loading-icon-width: 100%;
      --media-button-icon-height: auto;
      pointer-events: none;
      position: absolute;
      width: min(15%, 150px);
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
  <media-controller style="${getChromeStylesFromProps(props)}">
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

const MediaPlayButton = () => html`
  <media-play-button>
    ${icons.Play({ slot: "play", title: "Play" })}
    ${icons.Pause({ slot: "pause", title: "Pause" })}
  </media-play-button>
`;

const MediaSeekBackwardButton = () => html`
  <media-seek-backward-button>
    ${icons.SeekBackward({ slot: "backward", amount: 30 })}
  </media-seek-backward-button>
`;

const MediaSeekForwardButton = () => html`
  <media-seek-forward-button>
    ${icons.SeekForward({ slot: "forward", amount: 30 })}
  </media-seek-forward-button>
`;

const MediaMuteButton = () => html`
  <media-mute-button>
    ${icons.VolumeHigh({ slot: "high" })} ${icons.VolumeLow({ slot: "medium" })}
    ${icons.VolumeLow({ slot: "low" })} ${icons.VolumeOff({ slot: "off" })}
  </media-mute-button>
`;

const MediaCaptionsButton = () => html` <media-captions-button>
  ${icons.CaptionsOff({ slot: "off" })} ${icons.CaptionsOn({ slot: "on" })}
</media-captions-button>`;

const MediaAirplayButton = () => html`<media-airplay-button>
  ${icons.Airplay({ slot: "airplay" })}
</media-airplay-button>`;

const MediaPipButton = () => html` <media-pip-button>
  ${icons.Pip({ slot: "enter", title: "Enter Picture-in-Picture" })}
  ${icons.Pip({ slot: "exit", title: "Exit Picture-in-Picture" })}
</media-pip-button>`;

const MediaFullscreenButton = () => html` <media-fullscreen-button>
  ${icons.FullscreenEnter({ slot: "enter", title: "Enter Fullscreen" })}
  ${icons.FullscreenExit({ slot: "exit", title: "Exit Fullscreen" })}
</media-fullscreen-button>`;

export const VodChromeSmall = (props: MuxTemplateProps) => html`
  <media-loading-indicator
    slot="centered-chrome"
    no-auto-hide
  ></media-loading-indicator>
  <media-control-bar slot="top-chrome" style="justify-content: flex-end;">
    ${renderable(
      "captionsButton",
      ({ hasCaptions }: Partial<MuxTemplateProps>) =>
        hasCaptions && MediaCaptionsButton(),
      props
    )}
    ${renderable(
      "airplayButton",
      ({ supportsAirPlay }: Partial<MuxTemplateProps>) =>
        supportsAirPlay && MediaAirplayButton(),
      props
    )}
    ${MediaPipButton()}
  </media-control-bar>
  <div slot="centered-chrome" class="mxp-center-controls">
    ${MediaSeekBackwardButton()} ${MediaPlayButton()}
    ${MediaSeekForwardButton()}
  </div>
  <media-control-bar>
    <media-time-range></media-time-range>
    <media-time-display show-duration remaining></media-time-display>
    ${MediaMuteButton()}
    ${renderable(
      "volumeRange",
      ({ supportsVolume }: Partial<MuxTemplateProps>) =>
        supportsVolume && html`<media-volume-range></media-volume-range>`,
      props
    )}
    <media-playback-rate-button></media-playback-rate-button>
    ${MediaFullscreenButton()}
  </media-control-bar>
`;

export const VodChromeLarge = (props: MuxTemplateProps) => html`
  <media-loading-indicator
    slot="centered-chrome"
    no-auto-hide
  ></media-loading-indicator>
  <div slot="centered-chrome" class="mxp-center-controls">
    ${MediaPlayButton()}
  </div>
  <media-control-bar>
    ${MediaPlayButton()} ${MediaSeekBackwardButton()}
    ${MediaSeekForwardButton()}
    <media-time-range></media-time-range>
    <media-time-display show-duration remaining></media-time-display>
    ${MediaMuteButton()}
    ${renderable(
      "volumeRange",
      ({ supportsVolume }: Partial<MuxTemplateProps>) =>
        supportsVolume && html`<media-volume-range></media-volume-range>`,
      props
    )}
    <media-playback-rate-button></media-playback-rate-button>
    ${renderable(
      "captionsButton",
      ({ hasCaptions }: Partial<MuxTemplateProps>) =>
        hasCaptions && MediaCaptionsButton(),
      props
    )}
    ${renderable(
      "airplayButton",
      ({ supportsAirPlay }: Partial<MuxTemplateProps>) =>
        supportsAirPlay && MediaAirplayButton(),
      props
    )}
    ${MediaPipButton()} ${MediaFullscreenButton()}
  </media-control-bar>
`;

export const LiveChromeSmall = (props: MuxTemplateProps) => html`
  <media-loading-indicator
    slot="centered-chrome"
    no-auto-hide
  ></media-loading-indicator>
  <div slot="centered-chrome" class="mxp-center-controls">
    ${MediaPlayButton()}
  </div>
  <media-control-bar>
    ${MediaMuteButton()}
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
        hasCaptions && MediaCaptionsButton(),
      props
    )}
    ${renderable(
      "airplayButton",
      ({ supportsAirPlay }: Partial<MuxTemplateProps>) =>
        supportsAirPlay && MediaAirplayButton(),
      props
    )}
    ${MediaPipButton()} ${MediaFullscreenButton()}
  </media-control-bar>
`;

export const LiveChromeLarge = (props: MuxTemplateProps) => html`
  <media-loading-indicator
    slot="centered-chrome"
    no-auto-hide
  ></media-loading-indicator>
  <div slot="centered-chrome" class="mxp-center-controls">
    ${MediaPlayButton()}
  </div>
  <media-control-bar>
    ${MediaPlayButton()} ${MediaMuteButton()}
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
        hasCaptions && MediaCaptionsButton(),
      props
    )}
    ${renderable(
      "airplayButton",
      ({ supportsAirPlay }: Partial<MuxTemplateProps>) =>
        supportsAirPlay && MediaAirplayButton(),
      props
    )}
    ${MediaPipButton()} ${MediaFullscreenButton()}
  </media-control-bar>
`;
