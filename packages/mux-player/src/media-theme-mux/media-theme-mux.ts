import 'media-chrome';
import { html, render } from '../html';
import '../media-chrome/time-display';

// @ts-ignore
import cssStr from './styles.css';
import * as icons from './icons';

export const StreamTypes = {
  VOD: 'on-demand',
  LIVE: 'live',
  LL_LIVE: 'll-live',
};

const MediaChromeSizes = {
  LG: 'large',
  SM: 'small',
  XS: 'extra-small',
};

const Spacer = () => html`<div class="mxp-spacer"></div>`;

type ThemeMuxTemplateProps = {
  streamType: string;
  playerSize: string;
  defaultHiddenCaptions: boolean;
  hasCaptions: boolean;
  forwardSeekOffset: number;
  backwardSeekOffset: number;
};

const template = (props: ThemeMuxTemplateProps) => html`
  <style>
    ${cssStr}
  </style>

  <media-controller class="size-${props.playerSize}">
    <slot name="media" slot="media"></slot>
    <media-loading-indicator slot="centered-chrome" no-auto-hide></media-loading-indicator>
    ${ChromeRenderer(props)}
    <slot></slot>
  </media-controller>
`;

const ChromeRenderer = (props: ThemeMuxTemplateProps) => {
  const { streamType, playerSize } = props;
  if (streamType === StreamTypes.LIVE || streamType === StreamTypes.LL_LIVE) {
    switch (playerSize) {
      case MediaChromeSizes.LG:
        return LiveChromeLarge(props);
      case MediaChromeSizes.SM:
        return LiveChromeSmall(props);
      case MediaChromeSizes.XS:
        return LiveChromeExtraSmall(props);
    }
  }
  switch (playerSize) {
    case MediaChromeSizes.LG:
      return VodChromeLarge(props);
    case MediaChromeSizes.SM:
      return VodChromeSmall(props);
    case MediaChromeSizes.XS:
      return VodChromeExtraSmall(props);
  }
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

// prettier-ignore
export const VodChromeExtraSmall = (props: ThemeMuxTemplateProps) => html`
  <media-control-bar slot="top-chrome">
    ${props.hasCaptions ? MediaCaptionsButton(props) : html``}
    ${Spacer()}
    ${MediaAirplayButton()}
    ${MediaPipButton()}
  </media-control-bar>
  <div slot="centered-chrome" class="mxp-center-controls">
    ${MediaPlayButton()}
  </div>
  <media-control-bar>
    ${MediaMuteButton()}
    ${Spacer()}
    ${MediaFullscreenButton()}
  </media-control-bar>
`;

// prettier-ignore
export const VodChromeSmall = (props: ThemeMuxTemplateProps) => html`
  <media-control-bar slot="top-chrome" style="justify-content: flex-end;">
    ${props.hasCaptions ? MediaCaptionsButton(props) : html``}
    ${MediaAirplayButton()}
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
    ${Spacer()}
    <media-playback-rate-button></media-playback-rate-button>
    ${MediaFullscreenButton()}
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
    ${Spacer()}
    <media-playback-rate-button></media-playback-rate-button>
    ${props.hasCaptions ? MediaCaptionsButton(props) : html``}
    ${MediaAirplayButton()}
    ${MediaPipButton()}
    ${MediaFullscreenButton()}
  </media-control-bar>
`;

// prettier-ignore
export const LiveChromeExtraSmall = VodChromeExtraSmall;

// prettier-ignore
export const LiveChromeSmall = (props: ThemeMuxTemplateProps) => html`
  <media-control-bar slot="top-chrome">
    <slot name="seek-to-live-button"></slot>
    ${Spacer()}
    ${props.hasCaptions ? MediaCaptionsButton(props) : html``}
    ${MediaAirplayButton()}
    ${MediaPipButton()}
  </media-control-bar>
  <div slot="centered-chrome" class="mxp-center-controls">
    ${MediaPlayButton()}
  </div>
  <media-control-bar>
    ${MediaMuteButton()}
    <media-volume-range></media-volume-range>
    ${Spacer()}
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
    ${Spacer()}
    ${props.hasCaptions ? MediaCaptionsButton(props) : html``}
    ${MediaAirplayButton()}
    ${MediaPipButton()}
    ${MediaFullscreenButton()}
  </media-control-bar>
`;

function getProps(el: MediaThemeMux, state?: any): ThemeMuxTemplateProps {
  return {
    streamType: el.getAttribute('stream-type'),
    playerSize: el.getAttribute('player-size'),
    defaultHiddenCaptions: el.hasAttribute('default-hidden-captions'),
    hasCaptions: el.hasAttribute('has-captions'),
    forwardSeekOffset: el.getAttribute('forward-seek-offset'),
    backwardSeekOffset: el.getAttribute('backward-seek-offset'),
    ...state,
  };
}

class MediaThemeMux extends HTMLElement {
  static get observedAttributes() {
    return [
      'stream-type',
      'player-size',
      'default-hidden-captions',
      'has-captions',
      'forward-seek-offset',
      'backward-seek-offset',
    ];
  }

  constructor() {
    super();

    this.attachShadow({ mode: 'open' });
    render(template(getProps(this)), this.shadowRoot as Node);
  }

  attributeChangedCallback() {
    render(template(getProps(this)), this.shadowRoot as Node);
  }
}

if (!customElements.get('media-theme-mux')) {
  customElements.define('media-theme-mux', MediaThemeMux);
}

export default MediaThemeMux;
