import { MediaTheme } from 'media-chrome';
import { html, render } from '../html';
import '../media-chrome/time-display';

// @ts-ignore
import cssStr from './styles.css';
import * as icons from './icons';
import { StreamTypes } from '@mux/playback-core';

const MediaChromeSizes = {
  LG: 'large',
  SM: 'small',
  XS: 'extra-small',
};

type ThemeMuxTemplateProps = {
  streamType: string | null;
  audio: boolean;
  playerSize: string | null;
  defaultHiddenCaptions: boolean;
  forwardSeekOffset: string | null;
  backwardSeekOffset: string | null;
};

export default class MediaThemeMux extends MediaTheme {
  static get observedAttributes() {
    return [
      'audio',
      'stream-type',
      'player-size',
      'default-hidden-captions',
      'forward-seek-offset',
      'backward-seek-offset',
    ];
  }

  attributeChangedCallback() {
    this.render();
  }

  render() {
    const props = {
      audio: this.hasAttribute('audio'),
      streamType: this.getAttribute('stream-type'),
      playerSize: this.getAttribute('player-size'),
      defaultHiddenCaptions: this.hasAttribute('default-hidden-captions'),
      forwardSeekOffset: this.getAttribute('forward-seek-offset'),
      backwardSeekOffset: this.getAttribute('backward-seek-offset'),
    };

    render(
      html`
        <style>
          ${cssStr}
        </style>
        <media-controller audio="${props.audio || false}" class="size-${props.playerSize}">
          <slot name="media" slot="media"></slot>
          <media-loading-indicator slot="centered-chrome" no-auto-hide></media-loading-indicator>
          ${ChromeRenderer(props)}
          <slot></slot>
        </media-controller>
      `,
      this.shadowRoot as Node
    );
  }
}

if (!customElements.get('media-theme-mux')) {
  customElements.define('media-theme-mux', MediaThemeMux);
}

const ChromeRenderer = (props: ThemeMuxTemplateProps) => {
  const { streamType, playerSize, audio } = props;
  if (audio) {
    switch (streamType) {
      case StreamTypes.LIVE:
      case StreamTypes.LL_LIVE: {
        return AudioLiveChrome();
      }
      case StreamTypes.DVR:
      case StreamTypes.LL_DVR: {
        return AudioDvrChrome(props);
      }
      case StreamTypes.ON_DEMAND:
      default: {
        return AudioVodChrome(props);
      }
    }
  }
  /* eslint-disable no-fallthrough */
  switch (streamType) {
    case StreamTypes.LIVE:
    case StreamTypes.LL_LIVE: {
      switch (playerSize) {
        case MediaChromeSizes.LG:
          return LiveChromeLarge(props);
        case MediaChromeSizes.SM:
          return LiveChromeSmall(props);
        case MediaChromeSizes.XS:
          return LiveChromeExtraSmall(props);
      }
    }
    case StreamTypes.DVR:
    case StreamTypes.LL_DVR: {
      switch (playerSize) {
        case MediaChromeSizes.LG:
          return DvrChromeLarge(props);
        case MediaChromeSizes.SM:
          return DvrChromeSmall(props);
        case MediaChromeSizes.XS:
          return DvrChromeExtraSmall(props);
      }
    }
    case StreamTypes.ON_DEMAND:
    default: {
      switch (playerSize) {
        case MediaChromeSizes.LG:
          return VodChromeLarge(props);
        case MediaChromeSizes.SM:
          return VodChromeSmall(props);
        case MediaChromeSizes.XS:
          return VodChromeExtraSmall(props);
      }
    }
  }
  /* eslint-enable */
};

// prettier-ignore
const MediaPlayButton = () => html`
  <media-play-button>
    ${icons.Play()}
    ${icons.Pause()}
  </media-play-button>
`;

// prettier-ignore
const MediaSeekBackwardButton = (props: Partial<ThemeMuxTemplateProps>) => html`
  <media-seek-backward-button seek-offset="${props.backwardSeekOffset}">
    ${icons.SeekBackward({ value: props.backwardSeekOffset })}
  </media-seek-backward-button>
`;

// prettier-ignore
const MediaSeekForwardButton = (props: Partial<ThemeMuxTemplateProps>) => html`
  <media-seek-forward-button seek-offset="${props.forwardSeekOffset}">
    ${icons.SeekForward({ value: props.forwardSeekOffset })}
  </media-seek-forward-button>
`;

// prettier-ignore
const MediaMuteButton = () => html`
  <media-mute-button>
    ${icons.VolumeHigh()}
    ${icons.VolumeMedium()}
    ${icons.VolumeLow()}
    ${icons.VolumeOff()}
  </media-mute-button>
`;

// prettier-ignore
const MediaCaptionsButton = (props: ThemeMuxTemplateProps) => html`
<media-captions-button default-showing="${!props.defaultHiddenCaptions}" >
  ${icons.CaptionsOff()}
  ${icons.CaptionsOn()}
</media-captions-button>`;

// prettier-ignore
const MediaAirplayButton = () => html`
<media-airplay-button>
  ${icons.Airplay()}
</media-airplay-button>`;

// prettier-ignore
const MediaPipButton = () => html`
<media-pip-button>
  ${icons.PipEnter()}
  ${icons.PipExit()}
</media-pip-button>`;

// prettier-ignore
const MediaFullscreenButton = () => html`
<media-fullscreen-button>
  ${icons.FullscreenEnter()}
  ${icons.FullscreenExit()}
</media-fullscreen-button>`;

export const AudioVodChrome = (props: ThemeMuxTemplateProps) => html`
  <media-control-bar>
    ${MediaPlayButton()} ${MediaSeekBackwardButton(props)} ${MediaSeekForwardButton(props)}
    <mxp-time-display></mxp-time-display>
    <media-time-range></media-time-range>
    ${MediaMuteButton()}
    <media-volume-range></media-volume-range>
    <media-playback-rate-button></media-playback-rate-button>
    ${MediaAirplayButton()}
    <media-cast-button></media-cast-button>
  </media-control-bar>
`;

export const AudioDvrChrome = (props: ThemeMuxTemplateProps) => html`
  <media-control-bar>
    ${MediaPlayButton()}
    <slot name="seek-to-live-button"></slot>
    ${MediaSeekBackwardButton(props)} ${MediaSeekForwardButton(props)}
    <mxp-time-display></mxp-time-display>
    <media-time-range></media-time-range>
    ${MediaMuteButton()}
    <media-volume-range></media-volume-range>
    <media-playback-rate-button></media-playback-rate-button>
    ${MediaAirplayButton()}
    <media-cast-button></media-cast-button>
  </media-control-bar>
`;

export const AudioLiveChrome = () => html`
  <media-control-bar>
    ${MediaPlayButton()}
    <slot name="seek-to-live-button"></slot>
    ${MediaMuteButton()}
    <media-volume-range></media-volume-range>
    ${MediaAirplayButton()}
    <media-cast-button></media-cast-button>
  </media-control-bar>
`;

// prettier-ignore
export const VodChromeExtraSmall = (props: ThemeMuxTemplateProps) => html`
  <media-control-bar slot="top-chrome">
    ${MediaCaptionsButton(props)}
    <div class="mxp-spacer"></div>
    ${MediaAirplayButton()}
    <media-cast-button></media-cast-button>
    ${MediaPipButton()}
  </media-control-bar>
  <div slot="centered-chrome" class="mxp-center-controls">
    ${MediaPlayButton()}
  </div>
  <media-control-bar>
    ${MediaMuteButton()}
    <div class="mxp-spacer"></div>
    ${MediaFullscreenButton()}
  </media-control-bar>
`;

// prettier-ignore
export const VodChromeSmall = (props: ThemeMuxTemplateProps) => html`
  <media-control-bar slot="top-chrome" style="justify-content: flex-end;">
    ${MediaCaptionsButton(props)}
    ${MediaAirplayButton()}
    <media-cast-button></media-cast-button>
    ${MediaPipButton()}
  </media-control-bar>
  <div slot="centered-chrome" class="mxp-center-controls">
    ${MediaSeekBackwardButton(props)}
    ${MediaPlayButton()}
    ${MediaSeekForwardButton(props)}
  </div>
  <media-time-range></media-time-range>
  <media-control-bar>
    <mxp-time-display></mxp-time-display>
    ${MediaMuteButton()}
    <media-volume-range></media-volume-range>
    <div class="mxp-spacer"></div>
    <media-playback-rate-button></media-playback-rate-button>
    ${MediaFullscreenButton()}
    <div class="mxp-padding-2"></div>
  </media-control-bar>
`;

// prettier-ignore
export const VodChromeLarge = (props: ThemeMuxTemplateProps) => html`
  <div slot="centered-chrome" class="mxp-center-controls">
    ${MediaPlayButton()}
  </div>
  <media-time-range></media-time-range>
  <media-control-bar>
    ${MediaPlayButton()}
    ${MediaSeekBackwardButton(props)}
    ${MediaSeekForwardButton(props)}
    <mxp-time-display></mxp-time-display>
    ${MediaMuteButton()}
    <media-volume-range></media-volume-range>
    <div class="mxp-spacer"></div>
    <media-playback-rate-button></media-playback-rate-button>
    ${MediaCaptionsButton(props)}
    ${MediaAirplayButton()}
    <media-cast-button></media-cast-button>
    ${MediaPipButton()}
    ${MediaFullscreenButton()}
    <div class="mxp-padding-2"></div>
  </media-control-bar>
`;

// prettier-ignore
export const LiveChromeExtraSmall = VodChromeExtraSmall;

// prettier-ignore
export const LiveChromeSmall = (props: ThemeMuxTemplateProps) => html`
  <media-control-bar slot="top-chrome">
    <slot name="seek-to-live-button"></slot>
    <div class="mxp-spacer"></div>
    ${MediaCaptionsButton(props)}
    ${MediaAirplayButton()}
    <media-cast-button></media-cast-button>
    ${MediaPipButton()}
  </media-control-bar>
  <div slot="centered-chrome" class="mxp-center-controls">
    ${MediaPlayButton()}
  </div>
  <media-control-bar>
    ${MediaMuteButton()}
    <media-volume-range></media-volume-range>
    <div class="mxp-spacer"></div>
    ${MediaFullscreenButton()}
  </media-control-bar>
`;

// prettier-ignore
export const LiveChromeLarge = (props: ThemeMuxTemplateProps) => html`
  <media-control-bar slot="top-chrome">
    <slot name="seek-to-live-button"></slot>
  </media-control-bar>
  <div slot="centered-chrome" class="mxp-center-controls">
    ${MediaPlayButton()}
  </div>
  <media-control-bar>
    ${MediaMuteButton()}
    <media-volume-range></media-volume-range>
    <div class="mxp-spacer"></div>
    ${MediaCaptionsButton(props)}
    ${MediaAirplayButton()}
    <media-cast-button></media-cast-button>
    ${MediaPipButton()}
    ${MediaFullscreenButton()}
  </media-control-bar>
`;

// prettier-ignore
export const DvrChromeExtraSmall = VodChromeExtraSmall;

// prettier-ignore
export const DvrChromeSmall = (props: ThemeMuxTemplateProps) => html`
  <media-control-bar slot="top-chrome" style="justify-content: flex-end;">
    ${MediaCaptionsButton(props)}
    ${MediaAirplayButton()}
    <media-cast-button></media-cast-button>
    ${MediaPipButton()}
  </media-control-bar>
  <div slot="centered-chrome" class="mxp-center-controls">
    ${MediaSeekBackwardButton(props)}
    ${MediaPlayButton()}
    ${MediaSeekForwardButton(props)}
  </div>
  <media-time-range></media-time-range>
  <media-control-bar>
    ${MediaMuteButton()}
    <media-volume-range></media-volume-range>
    <slot name="seek-to-live-button"></slot>
    <div class="mxp-spacer"></div>
    ${MediaFullscreenButton()}
    <div class="mxp-padding-2"></div>
  </media-control-bar>
`;

// prettier-ignore
export const DvrChromeLarge = (props: ThemeMuxTemplateProps) => html`
  <div slot="centered-chrome" class="mxp-center-controls">
    ${MediaPlayButton()}
  </div>
  <media-time-range></media-time-range>
  <media-control-bar>
    ${MediaPlayButton()}
    ${MediaSeekBackwardButton(props)}
    ${MediaSeekForwardButton(props)}
    ${MediaMuteButton()}
    <media-volume-range></media-volume-range>
    <slot name="seek-to-live-button"></slot>
    <div class="mxp-spacer"></div>
    ${MediaCaptionsButton(props)}
    ${MediaAirplayButton()}
    <media-cast-button></media-cast-button>
    ${MediaPipButton()}
    ${MediaFullscreenButton()}
    <div class="mxp-padding-2"></div>
  </media-control-bar>
`;
