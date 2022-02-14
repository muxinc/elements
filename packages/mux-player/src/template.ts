import "./dialog";
import {
  getChromeStylesFromProps,
  getPosterURLFromPlaybackId,
  getStoryboardURLFromPlaybackId,
} from "./helpers";
import { html, renderable } from "./utils";
import * as icons from "./icons";
// @ts-ignore
import cssStr from "./styles.css";

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

const Spacer = () => `<div class="mxp-spacer"></div>`;

export const template = (props: MuxTemplateProps) => html`
  <style>
    ${cssStr}
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
      ${props.poster
        ? `poster="${
            props.poster ?? getPosterURLFromPlaybackId(props.playbackId)
          }"`
        : ""}
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
      ${props.playbackId &&
      props.streamType !== StreamTypes.LIVE &&
      props.streamType !== StreamTypes.LL_LIVE
        ? `<track
            label="thumbnails"
            default
            kind="metadata"
            src=${getStoryboardURLFromPlaybackId(props.playbackId)}
          />`
        : ""}
    </mux-video>
    <media-loading-indicator
      slot="centered-chrome"
      no-auto-hide
    ></media-loading-indicator>
    ${renderable("chromeRenderer", ChromeRenderer, props)}
    <div class="foo baz"></div>
    <mxp-dialog
      slot="centered-chrome"
      no-auto-hide${props.isDialogOpen && " open"}
    >
      ${renderable(
        "dialogContent",
        (dialog: { title: string; message: string }) =>
          html`
            ${dialog?.title ? `<h3>${dialog.title}</h3>` : ""}
            ${dialog?.message ? `<p>${dialog.message}</p>` : ""}
          `,
        props.dialog
      )}
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

const MediaPlayButton = () => `
  <media-play-button>
    ${icons.Play({ slot: "play", title: "Play" })}
    ${icons.Pause({ slot: "pause", title: "Pause" })}
  </media-play-button>
`;

const MediaSeekBackwardButton = (props: Partial<MuxTemplateProps>) => `
  <media-seek-backward-button seek-offset="${props.backwardSeekOffset}">
    ${icons.SeekBackward({ slot: "backward", value: props.backwardSeekOffset })}
  </media-seek-backward-button>
`;

const MediaSeekForwardButton = (props: Partial<MuxTemplateProps>) => `
  <media-seek-forward-button seek-offset="${props.forwardSeekOffset}">
    ${icons.SeekForward({ slot: "forward", value: props.forwardSeekOffset })}
  </media-seek-forward-button>
`;

const MediaMuteButton = () => `
  <media-mute-button>
    ${icons.VolumeHigh({ slot: "high" })} ${icons.VolumeLow({ slot: "medium" })}
    ${icons.VolumeLow({ slot: "low" })} ${icons.VolumeOff({ slot: "off" })}
  </media-mute-button>
`;

const MediaCaptionsButton = (props: MuxTemplateProps) => html`
<media-captions-button${props.defaultShowCaptions ? " default-showing" : ""}>
  ${icons.CaptionsOff({ slot: "off" })} ${icons.CaptionsOn({ slot: "on" })}
</media-captions-button>`;

const MediaAirplayButton = () => html`<media-airplay-button>
  ${icons.Airplay({ slot: "airplay" })}
</media-airplay-button>`;

const MediaPipButton = () => `<media-pip-button>
  ${icons.Pip({ slot: "enter", title: "Enter Picture-in-Picture" })}
  ${icons.Pip({ slot: "exit", title: "Exit Picture-in-Picture" })}
</media-pip-button>`;

const MediaFullscreenButton = () => `<media-fullscreen-button>
  ${icons.FullscreenEnter({ slot: "enter", title: "Enter Fullscreen" })}
  ${icons.FullscreenExit({ slot: "exit", title: "Exit Fullscreen" })}
</media-fullscreen-button>`;

export const VodChromeSmall = (props: MuxTemplateProps) => html`
  <media-control-bar slot="top-chrome" style="justify-content: flex-end;">
    ${renderable(
      "captionsButton",
      ({ hasCaptions }: Partial<MuxTemplateProps>) =>
        hasCaptions && MediaCaptionsButton(props),
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
    ${MediaSeekBackwardButton(props)} ${MediaPlayButton()}
    ${MediaSeekForwardButton(props)}
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
  <div slot="centered-chrome" class="mxp-center-controls">
    ${MediaPlayButton()}
  </div>
  <media-control-bar>
    ${MediaPlayButton()} ${MediaSeekBackwardButton(props)}
    ${MediaSeekForwardButton(props)}
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
        hasCaptions && MediaCaptionsButton(props),
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
        hasCaptions && MediaCaptionsButton(props),
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
        hasCaptions && MediaCaptionsButton(props),
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
