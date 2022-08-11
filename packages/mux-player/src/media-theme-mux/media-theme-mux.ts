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
  nohotkeys?: boolean;
  audio: boolean;
  playerSize: string | null;
  defaultHiddenCaptions: boolean;
  forwardSeekOffset: string | null;
  backwardSeekOffset: string | null;
  playbackRates: string | null;
  hideDuration: boolean;
  defaultShowRemainingTime: boolean;
};

type ComponentProps = ThemeMuxTemplateProps & { part?: string };

export const parts = {
  mediaChrome: 'layer media-layer poster-layer vertical-layer centered-layer',
  top: 'top',
  center: 'center',
  bottom: 'bottom',
  play: 'play button',
  seekBackward: 'seek-backward button',
  seekForward: 'seek-forward button',
  mute: 'mute button',
  captions: 'captions button',
  airplay: 'airplay button',
  pip: 'pip button',
  cast: 'cast button',
  fullscreen: 'fullscreen button',
  playbackRate: 'playbackrate button',
  volumeRange: 'volume range',
  timeRange: 'time range',
  timeDisplay: 'time display',
};

export default class MediaThemeMux extends MediaTheme {
  static get observedAttributes() {
    return [
      'audio',
      'nohotkeys',
      'stream-type',
      'player-size',
      'default-hidden-captions',
      'forward-seek-offset',
      'backward-seek-offset',
      'playbackrates',
      'hide-duration',
      'default-show-remaining-time',
    ];
  }

  attributeChangedCallback() {
    this.render();
  }

  render() {
    const props: ThemeMuxTemplateProps = {
      audio: this.hasAttribute('audio'),
      nohotkeys: this.hasAttribute('nohotkeys'),
      streamType: this.getAttribute('stream-type'),
      playerSize: this.getAttribute('player-size'),
      defaultHiddenCaptions: this.hasAttribute('default-hidden-captions'),
      forwardSeekOffset: this.getAttribute('forward-seek-offset'),
      backwardSeekOffset: this.getAttribute('backward-seek-offset'),
      playbackRates: this.getAttribute('playbackrates'),
      hideDuration: this.hasAttribute('hide-duration'),
      defaultShowRemainingTime: this.hasAttribute('default-show-remaining-time'),
    };

    render(
      html`
        <style>
          ${cssStr}
        </style>
        <media-controller
          nohotkeys="${props.nohotkeys || false}"
          audio="${props.audio || false}"
          class="size-${props.playerSize}"
          exportparts="${parts.mediaChrome.split(' ').join(', ')}"
        >
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
const MediaPlayButton = ({ part = parts.bottom } = {}) => html`
  <media-play-button part="${part} ${parts.play}">
    ${icons.Play()}
    ${icons.Pause()}
  </media-play-button>`;

// prettier-ignore
const MediaSeekBackwardButton = ({ backwardSeekOffset, part = parts.bottom }: ComponentProps) => html`
  <media-seek-backward-button seek-offset="${backwardSeekOffset}" part="${part} ${parts.seekBackward}">
    ${icons.SeekBackward({ value: backwardSeekOffset })}
  </media-seek-backward-button>`;

// prettier-ignore
const MediaSeekForwardButton = ({ forwardSeekOffset, part = parts.bottom }: ComponentProps) => html`
  <media-seek-forward-button seek-offset="${forwardSeekOffset}" part="${part} ${parts.seekForward}">
    ${icons.SeekForward({ value: forwardSeekOffset })}
  </media-seek-forward-button>`;

// prettier-ignore
const MediaMuteButton = ({ part = parts.bottom } = {}) => html`
  <media-mute-button part="${part} ${parts.mute}">
    ${icons.VolumeHigh()}
    ${icons.VolumeMedium()}
    ${icons.VolumeLow()}
    ${icons.VolumeOff()}
  </media-mute-button>`;

type CaptionsButtonProps = { defaultHiddenCaptions: boolean; part?: string };
// prettier-ignore
const MediaCaptionsButton = ({
  defaultHiddenCaptions,
  part = parts.bottom,
}: CaptionsButtonProps) => html`
  <media-captions-button
    default-showing="${!defaultHiddenCaptions}"
    part="${part} ${parts.captions}"
  >
    ${icons.CaptionsOff()}
    ${icons.CaptionsOn()}
  </media-captions-button>`;

// prettier-ignore
const MediaAirplayButton = ({ part = parts.bottom } = {}) => html`
  <media-airplay-button part="${part} ${parts.airplay}">
    ${icons.Airplay()}
  </media-airplay-button>`;

// prettier-ignore
const MediaPipButton = ({ part = parts.bottom } = {}) => html`
  <media-pip-button part="${part} ${parts.pip}">
    ${icons.PipEnter()}
    ${icons.PipExit()}
  </media-pip-button>`;

// prettier-ignore
const MediaFullscreenButton = ({ part = parts.bottom } = {}) => html`
  <media-fullscreen-button part="${part} ${parts.fullscreen}">
    ${icons.FullscreenEnter()}
    ${icons.FullscreenExit()}
  </media-fullscreen-button>`;

// prettier-ignore
const MediaCastButton = ({ part = parts.bottom } = {}) => html`
  <media-cast-button part="${part} ${parts.cast}">
    ${icons.CastEnter()}
    ${icons.CastExit()}
  </media-cast-button>`;

// prettier-ignore
const MediaPlaybackRateButton = ({ part = parts.bottom, playbackRates }: ComponentProps) => html`
  <media-playback-rate-button part="${part} ${parts.playbackRate}" rates="${playbackRates ?? false}" >
  </media-playback-rate-button>`;

// prettier-ignore
const MediaVolumeRange = ({ part = parts.bottom } = {}) => html`
  <media-volume-range part="${part} ${parts.volumeRange}">
  </media-volume-range>`;

// prettier-ignore
const MediaTimeRange = ({ part = parts.bottom } = {}) => html`
  <media-time-range part="${part} ${parts.timeRange}">
  </media-time-range>`;

// prettier-ignore
const TimeDisplay = ({ part = parts.bottom, hideDuration, defaultShowRemainingTime }: ComponentProps) => html`
  <mxp-time-display part="${part} ${parts.timeDisplay}" hide-duration="${hideDuration}" remaining="${defaultShowRemainingTime}">
  </mxp-time-display>`;

// prettier-ignore
export const AudioVodChrome = (props: ThemeMuxTemplateProps) => html`
  <media-control-bar>
    ${MediaPlayButton()}
    ${MediaSeekBackwardButton(props)}
    ${MediaSeekForwardButton(props)}
    ${TimeDisplay(props)}
    ${MediaTimeRange()}
    ${MediaMuteButton()}
    ${MediaVolumeRange()}
    ${MediaPlaybackRateButton(props)}
    ${MediaAirplayButton()}
    ${MediaCastButton()}
  </media-control-bar>
`;

// prettier-ignore
export const AudioDvrChrome = (props: ThemeMuxTemplateProps) => html`
  <media-control-bar>
    ${MediaPlayButton()}
    <slot name="seek-live"></slot>
    ${MediaSeekBackwardButton(props)}
    ${MediaSeekForwardButton(props)}
    ${TimeDisplay(props)}
    ${MediaTimeRange()}
    ${MediaMuteButton()}
    ${MediaVolumeRange()}
    ${MediaPlaybackRateButton(props)}
    ${MediaAirplayButton()}
    ${MediaCastButton()}
  </media-control-bar>
`;

// prettier-ignore
export const AudioLiveChrome = () => html`
  <media-control-bar>
    ${MediaPlayButton()}
    <slot name="seek-live"></slot>
    ${MediaMuteButton()}
    ${MediaVolumeRange()}
    ${MediaAirplayButton()}
    ${MediaCastButton()}
  </media-control-bar>
`;

// prettier-ignore
export const VodChromeExtraSmall = (props: ThemeMuxTemplateProps) => html`
  <media-control-bar slot="top-chrome">
    ${MediaCaptionsButton({ ...props, part: parts.top })}
    <div class="mxp-spacer"></div>
    ${MediaAirplayButton({ part: parts.top })}
    ${MediaCastButton({ part: parts.top })}
    ${MediaPipButton({ part: parts.top })}
  </media-control-bar>
  <div slot="centered-chrome" class="mxp-center-controls">
    ${MediaPlayButton({ part: parts.center })}
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
    ${MediaCaptionsButton({ ...props, part: parts.top })}
    ${MediaAirplayButton({ part: parts.top })}
    ${MediaCastButton({ part: parts.top })}
    ${MediaPipButton({ part: parts.top })}
  </media-control-bar>
  <div slot="centered-chrome" class="mxp-center-controls">
    ${MediaSeekBackwardButton({ ...props, part: parts.center })}
    ${MediaPlayButton({ part: parts.center })}
    ${MediaSeekForwardButton({ ...props, part: parts.center })}
  </div>
  ${MediaTimeRange()}
  <media-control-bar>
    ${TimeDisplay(props)}
    ${MediaMuteButton()}
    ${MediaVolumeRange()}
    <div class="mxp-spacer"></div>
    ${MediaPlaybackRateButton(props)}
    ${MediaFullscreenButton()}
    <div class="mxp-padding-2"></div>
  </media-control-bar>
`;

// prettier-ignore
export const VodChromeLarge = (props: ThemeMuxTemplateProps) => html`
  <div slot="centered-chrome" class="mxp-center-controls">
    ${MediaPlayButton({ part: parts.center })}
  </div>
  ${MediaTimeRange()}
  <media-control-bar>
    ${MediaPlayButton()}
    ${MediaSeekBackwardButton(props)}
    ${MediaSeekForwardButton(props)}
    ${TimeDisplay(props)}
    ${MediaMuteButton()}
    ${MediaVolumeRange()}
    <div class="mxp-spacer"></div>
    ${MediaPlaybackRateButton(props)}
    ${MediaCaptionsButton(props)}
    ${MediaAirplayButton()}
    ${MediaCastButton()}
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
    <slot name="seek-live"></slot>
    <div class="mxp-spacer"></div>
    ${MediaCaptionsButton({ ...props, part: parts.top })}
    ${MediaAirplayButton({ part: parts.top })}
    ${MediaCastButton({ part: parts.top })}
    ${MediaPipButton({ part: parts.top })}
  </media-control-bar>
  <div slot="centered-chrome" class="mxp-center-controls">
    ${MediaPlayButton({ part: parts.center })}
  </div>
  <media-control-bar>
    ${MediaMuteButton()}
    ${MediaVolumeRange()}
    <div class="mxp-spacer"></div>
    ${MediaFullscreenButton()}
  </media-control-bar>
`;

// prettier-ignore
export const LiveChromeLarge = (props: ThemeMuxTemplateProps) => html`
  <media-control-bar slot="top-chrome">
    <slot name="seek-live"></slot>
  </media-control-bar>
  <div slot="centered-chrome" class="mxp-center-controls">
    ${MediaPlayButton({ part: parts.center })}
  </div>
  <media-control-bar>
    ${MediaMuteButton()}
    ${MediaVolumeRange()}
    <div class="mxp-spacer"></div>
    ${MediaCaptionsButton(props)}
    ${MediaAirplayButton()}
    ${MediaCastButton()}
    ${MediaPipButton()}
    ${MediaFullscreenButton()}
  </media-control-bar>
`;

// prettier-ignore
export const DvrChromeExtraSmall = VodChromeExtraSmall;

// prettier-ignore
export const DvrChromeSmall = (props: ThemeMuxTemplateProps) => html`
  <media-control-bar slot="top-chrome" style="justify-content: flex-end;">
    ${MediaCaptionsButton({ ...props, part: parts.top })}
    ${MediaAirplayButton({ part: parts.top })}
    ${MediaCastButton({ part: parts.top })}
    ${MediaPipButton({ part: parts.top })}
  </media-control-bar>
  <div slot="centered-chrome" class="mxp-center-controls">
    ${MediaSeekBackwardButton({ ...props, part: parts.center })}
    ${MediaPlayButton({ part: parts.center })}
    ${MediaSeekForwardButton({ ...props, part: parts.center })}
  </div>
  ${MediaTimeRange()}
  <media-control-bar>
    ${MediaMuteButton()}
    ${MediaVolumeRange()}
    <slot name="seek-live"></slot>
    <div class="mxp-spacer"></div>
    ${MediaFullscreenButton()}
    <div class="mxp-padding-2"></div>
  </media-control-bar>
`;

// prettier-ignore
export const DvrChromeLarge = (props: ThemeMuxTemplateProps) => html`
  <div slot="centered-chrome" class="mxp-center-controls">
    ${MediaPlayButton({ part: parts.center })}
  </div>
  ${MediaTimeRange()}
  <media-control-bar>
    ${MediaPlayButton()}
    ${MediaSeekBackwardButton(props)}
    ${MediaSeekForwardButton(props)}
    ${MediaMuteButton()}
    ${MediaVolumeRange()}
    <slot name="seek-live"></slot>
    <div class="mxp-spacer"></div>
    ${MediaCaptionsButton(props)}
    ${MediaAirplayButton()}
    ${MediaCastButton()}
    ${MediaPipButton()}
    ${MediaFullscreenButton()}
    <div class="mxp-padding-2"></div>
  </media-control-bar>
`;
