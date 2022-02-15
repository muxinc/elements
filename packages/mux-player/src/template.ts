import "./dialog";
import {
  getChromeStylesFromProps,
  getPosterURLFromPlaybackId,
  getStoryboardURLFromPlaybackId,
} from "./helpers";
import { html } from "./html";
import * as icons from "./icons";
// @ts-ignore
import cssStr from "./styles.css";

import type { MuxTemplateProps } from "./types";

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
    ${cssStr}
  </style>
  <media-controller style="${getChromeStylesFromProps(props)}">
    <mux-video
      slot="media"
      crossorigin
      playsinline
      autoplay="${props.autoplay ||
      props.streamType === StreamTypes.LIVE ||
      props.streamType === StreamTypes.LL_LIVE}"
      muted="${props.muted}"
      debug="${props.debug}"
      prefer-mse="${props.preferMse}"
      start-time="${props.startTime != null ? props.startTime : false}"
      poster="${!!props.poster
        ? getPosterURLFromPlaybackId(props.playbackId)
        : false}"
      playback-id="${props.playbackId ?? false}"
      env-key="${props.envKey ?? false}"
      stream-type="${props.streamType ?? false}"
      metadata-video-id="${props.metadata?.video_id ?? false}"
      metadata-video-title="${props.metadata?.video_title ?? false}"
      metadata-viewer-user-id="${props.metadata?.viewer_user_id ?? false}"
    >
      ${props.playbackId &&
      props.streamType !== StreamTypes.LIVE &&
      props.streamType !== StreamTypes.LL_LIVE
        ? html`<track
            label="thumbnails"
            default
            kind="metadata"
            src="${getStoryboardURLFromPlaybackId(props.playbackId)}"
          />`
        : ""}
    </mux-video>
    <media-loading-indicator
      slot="centered-chrome"
      no-auto-hide
    ></media-loading-indicator>
    ${ChromeRenderer(props)}
    <mxp-dialog
      slot="centered-chrome"
      no-auto-hide
      open="${props.isDialogOpen}"
    >
      ${props.dialog?.title ? html`<h3>${props.dialog.title}</h3>` : ""}
      ${props.dialog?.message ? html`<p>${props.dialog.message}</p>` : ""}
    </mxp-dialog>
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

const MediaSeekBackwardButton = (props: Partial<MuxTemplateProps>) => html`
  <media-seek-backward-button seek-offset="${props.backwardSeekOffset}">
    ${icons.SeekBackward({ slot: "backward", value: props.backwardSeekOffset })}
  </media-seek-backward-button>
`;

const MediaSeekForwardButton = (props: Partial<MuxTemplateProps>) => html`
  <media-seek-forward-button seek-offset="${props.forwardSeekOffset}">
    ${icons.SeekForward({ slot: "forward", value: props.forwardSeekOffset })}
  </media-seek-forward-button>
`;

const MediaMuteButton = () => html`
  <media-mute-button>
    ${icons.VolumeHigh({ slot: "high" })} ${icons.VolumeLow({ slot: "medium" })}
    ${icons.VolumeLow({ slot: "low" })} ${icons.VolumeOff({ slot: "off" })}
  </media-mute-button>
`;

const MediaCaptionsButton = (
  props: MuxTemplateProps
) => html` <media-captions-button
  default-showing="${props.defaultShowCaptions}"
>
  ${icons.CaptionsOff({ slot: "off" })} ${icons.CaptionsOn({ slot: "on" })}
</media-captions-button>`;

const MediaAirplayButton = () => html`<media-airplay-button>
  ${icons.Airplay({ slot: "airplay" })}
</media-airplay-button>`;

const MediaPipButton = () => html`<media-pip-button>
  ${icons.Pip({ slot: "enter", title: "Enter Picture-in-Picture" })}
  ${icons.Pip({ slot: "exit", title: "Exit Picture-in-Picture" })}
</media-pip-button>`;

const MediaFullscreenButton = () => html`<media-fullscreen-button>
  ${icons.FullscreenEnter({ slot: "enter", title: "Enter Fullscreen" })}
  ${icons.FullscreenExit({ slot: "exit", title: "Exit Fullscreen" })}
</media-fullscreen-button>`;

export const VodChromeSmall = (props: MuxTemplateProps) => html`
  <media-control-bar slot="top-chrome" style="justify-content: flex-end;">
    ${props.hasCaptions ? MediaCaptionsButton(props) : ""}
    ${props.supportsAirPlay ? MediaAirplayButton() : ""} ${MediaPipButton()}
  </media-control-bar>
  <div slot="centered-chrome" class="mxp-center-controls">
    ${MediaSeekBackwardButton(props)} ${MediaPlayButton()}
    ${MediaSeekForwardButton(props)}
  </div>
  <media-control-bar>
    <media-time-range></media-time-range>
    <media-time-display show-duration remaining></media-time-display>
    ${MediaMuteButton()}
    ${props.supportsVolume
      ? html`<media-volume-range></media-volume-range>`
      : ""}
    <media-playback-rate-button></media-playback-rate-button>
    ${MediaFullscreenButton()}
  </media-control-bar>
`;

export const VodChromeLarge = (props: MuxTemplateProps) => html`
  <div slot="centered-chrome" class="mxp-center-controls">
    ${MediaPlayButton()}
  </div>
  <media-control-bar>
    ${MediaPlayButton()} ${MediaSeekBackwardButton(props)}
    ${MediaSeekForwardButton(props)}
    <media-time-range></media-time-range>
    <media-time-display show-duration remaining></media-time-display>
    ${MediaMuteButton()}
    ${props.supportsVolume
      ? html`<media-volume-range></media-volume-range>`
      : ""}
    <media-playback-rate-button></media-playback-rate-button>
    ${props.hasCaptions ? MediaCaptionsButton(props) : ""}
    ${props.supportsAirPlay ? MediaAirplayButton() : ""} ${MediaPipButton()}
    ${MediaFullscreenButton()}
  </media-control-bar>
`;

export const LiveChromeSmall = (props: MuxTemplateProps) => html`
  <div slot="centered-chrome" class="mxp-center-controls">
    ${MediaPlayButton()}
  </div>
  <media-control-bar>
    ${MediaMuteButton()}
    ${props.supportsVolume
      ? html`<media-volume-range></media-volume-range>`
      : ""}
    ${Spacer()}
    <media-time-display></media-time-display>
    ${props.hasCaptions ? MediaCaptionsButton(props) : ""}
    ${props.supportsAirPlay ? MediaAirplayButton() : ""} ${MediaPipButton()}
    ${MediaFullscreenButton()}
  </media-control-bar>
`;

export const LiveChromeLarge = (props: MuxTemplateProps) => html`
  <div slot="centered-chrome" class="mxp-center-controls">
    ${MediaPlayButton()}
  </div>
  <media-control-bar>
    ${MediaPlayButton()} ${MediaMuteButton()}
    ${props.supportsVolume
      ? html`<media-volume-range></media-volume-range>`
      : ""}
    ${Spacer()}
    <media-time-display></media-time-display>
    ${props.hasCaptions ? MediaCaptionsButton(props) : ""}
    ${props.supportsAirPlay ? MediaAirplayButton() : ""} ${MediaPipButton()}
    ${MediaFullscreenButton()}
  </media-control-bar>
`;
