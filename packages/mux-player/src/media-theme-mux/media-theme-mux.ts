import { globalThis } from 'shared-polyfills';
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
  hotkeys: string | null;
  audio: boolean;
  playerSize: string | null;
  defaultHiddenCaptions: boolean;
  forwardSeekOffset: string | null;
  backwardSeekOffset: string | null;
  playbackRates: string | null;
  defaultShowRemainingTime: boolean;
  poster: string | null;
  placeholder: string | null;
  title: string | null;
};

type ComponentProps = ThemeMuxTemplateProps & { part?: string };

export default class MediaThemeMux extends MediaTheme {
  static get observedAttributes() {
    return [
      'audio',
      'nohotkeys',
      'hotkeys',
      'stream-type',
      'player-size',
      'default-hidden-captions',
      'forward-seek-offset',
      'backward-seek-offset',
      'playbackrates',
      'default-show-remaining-time',
      'poster',
      'placeholder',
      'title',
    ];
  }

  attributeChangedCallback() {
    this.render();
  }

  render() {
    const props: ThemeMuxTemplateProps = {
      audio: this.hasAttribute('audio'),
      nohotkeys: this.hasAttribute('nohotkeys'),
      hotkeys: this.getAttribute('hotkeys'),
      streamType: this.getAttribute('stream-type'),
      playerSize: this.getAttribute('player-size'),
      defaultHiddenCaptions: this.hasAttribute('default-hidden-captions'),
      forwardSeekOffset: this.getAttribute('forward-seek-offset'),
      backwardSeekOffset: this.getAttribute('backward-seek-offset'),
      playbackRates: this.getAttribute('playbackrates'),
      defaultShowRemainingTime: this.hasAttribute('default-show-remaining-time'),
      poster: this.getAttribute('poster'),
      placeholder: this.getAttribute('placeholder'),
      title: this.getAttribute('title'),
    };

    if (
      [StreamTypes.LIVE, StreamTypes.LL_LIVE, StreamTypes.DVR, StreamTypes.LL_DVR].includes(props.streamType as any)
    ) {
      props.hotkeys = props.hotkeys || '';
      props.hotkeys += ' noarrowleft noarrowright';
    }

    render(
      html`
        <style>
          ${cssStr}
        </style>
        <media-controller
          hotkeys="${props.hotkeys || false}"
          nohotkeys="${props.nohotkeys || false}"
          audio="${props.audio || false}"
          class="size-${props.playerSize}"
          exportparts="layer, media-layer, poster-layer, vertical-layer, centered-layer, gesture-layer"
        >
          <slot name="media" slot="media"></slot>
          <media-poster-image slot="poster" src="${props.poster}" placeholder-src="${props.placeholder}"></media-poster-image>
          <media-loading-indicator slot="centered-chrome" no-auto-hide></media-loading-indicator>
          ${ChromeRenderer(props)}
          <slot></slot>
        </media-controller>
      `,
      this.shadowRoot as Node
    );

    // Possibly add this functionality to the base class MediaTheme.
    this.shadowRoot?.querySelectorAll('*').forEach((element) => {
      if (!element.localName.includes('-')) return;

      const matches = element.localName.match(/^([^-]+)-(.*)-(button|range|display)$/);
      if (!matches) return;
      // eslint-disable-next-line prefer-const
      let [, , namePart, typePart] = matches;

      // NOTE: Since this code/implementation will be replaced for any parts support,
      // relying on an ad hoc solution for title display (CJP)
      if (namePart === 'text') {
        if (element.classList.contains('title-display')) {
          namePart = 'title';
        }
      }
      const section = element.closest('[slot="top-chrome"]')
        ? 'top'
        : element.closest('[slot="centered-chrome"]')
        ? 'center'
        : 'bottom';
      element.setAttribute('part', `${section} ${namePart} ${typePart}`);
    });
  }
}

if (!globalThis.customElements.get('media-theme-mux')) {
  globalThis.customElements.define('media-theme-mux', MediaThemeMux);
}

const ChromeRenderer = (props: ThemeMuxTemplateProps) => {
  const { streamType, playerSize, audio } = props;
  if (audio) {
    switch (streamType) {
      case StreamTypes.LIVE:
      case StreamTypes.LL_LIVE: {
        return AudioLiveChrome(props);
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
  </media-play-button>`;

// prettier-ignore
const MediaSeekBackwardButton = ({ backwardSeekOffset }: ComponentProps) => html`
  <media-seek-backward-button seek-offset="${backwardSeekOffset}">
    ${icons.SeekBackward({ value: backwardSeekOffset })}
  </media-seek-backward-button>`;

// prettier-ignore
const MediaSeekForwardButton = ({ forwardSeekOffset }: ComponentProps) => html`
  <media-seek-forward-button seek-offset="${forwardSeekOffset}">
    ${icons.SeekForward({ value: forwardSeekOffset })}
  </media-seek-forward-button>`;

// prettier-ignore
const MediaMuteButton = () => html`
  <media-mute-button>
    ${icons.VolumeHigh()}
    ${icons.VolumeMedium()}
    ${icons.VolumeLow()}
    ${icons.VolumeOff()}
  </media-mute-button>`;

type CaptionsButtonProps = { defaultHiddenCaptions: boolean; part?: string };
// prettier-ignore
const MediaCaptionsButton = ({ defaultHiddenCaptions }: CaptionsButtonProps) => html`
  <media-captions-button default-showing="${!defaultHiddenCaptions}">
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
const MediaCastButton = () => html`
  <media-cast-button>
    ${icons.CastEnter()}
    ${icons.CastExit()}
  </media-cast-button>`;

// prettier-ignore
const MediaPlaybackRateButton = ({ playbackRates }: ComponentProps) => html`
  <media-playback-rate-button rates="${playbackRates ?? false}">
  </media-playback-rate-button>`;

// prettier-ignore
const MediaVolumeRange = () => html`
  <media-volume-range>
  </media-volume-range>`;

// prettier-ignore
const MediaTimeRange = () => html`
  <media-time-range>
  </media-time-range>`;

// prettier-ignore
const TimeDisplay = ({ defaultShowRemainingTime }: ComponentProps) => html`
  <mxp-time-display remaining="${defaultShowRemainingTime}">
  </mxp-time-display>`;

// prettier-ignore
const TitleDisplay = ({ title }: ComponentProps) => html`
  <media-text-display part="title" class="title-display">${title}</media-text-display>`;

// prettier-ignore
export const AudioVodChrome = (props: ThemeMuxTemplateProps) => html`
  <media-control-bar>${props.title ? TitleDisplay(props) : html``}</media-control-bar>
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
  <media-control-bar>${props.title ? TitleDisplay(props) : html``}</media-control-bar>
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
export const AudioLiveChrome = (props: ThemeMuxTemplateProps) => html`
  <media-control-bar>${props.title ? TitleDisplay(props) : html``}</media-control-bar>
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
    ${MediaCaptionsButton(props)}
    <div class="spacer"></div>
    ${MediaAirplayButton()}
    ${MediaCastButton()}
    ${MediaPipButton()}
  </media-control-bar>
  <div slot="centered-chrome" class="center-controls">
    ${MediaPlayButton()}
  </div>
  <media-control-bar>
    ${MediaMuteButton()}
    <div class="spacer"></div>
    ${MediaFullscreenButton()}
  </media-control-bar>
`;

// prettier-ignore
export const VodChromeSmall = (props: ThemeMuxTemplateProps) => html`
  <media-control-bar slot="top-chrome">
    ${props.title ? TitleDisplay(props) : html``}
    <div class="spacer"></div>
    ${MediaCaptionsButton(props)}
    ${MediaAirplayButton()}
    ${MediaCastButton()}
    ${MediaPipButton()}
  </media-control-bar>
  <div slot="centered-chrome" class="center-controls">
    ${MediaSeekBackwardButton(props)}
    ${MediaPlayButton()}
    ${MediaSeekForwardButton(props)}
  </div>
  ${MediaTimeRange()}
  <media-control-bar>
    ${TimeDisplay(props)}
    ${MediaMuteButton()}
    ${MediaVolumeRange()}
    <div class="spacer"></div>
    ${MediaPlaybackRateButton(props)}
    ${MediaFullscreenButton()}
    <div class="padding-2"></div>
  </media-control-bar>
`;

// prettier-ignore
export const VodChromeLarge = (props: ThemeMuxTemplateProps) => html`
  <media-control-bar slot="top-chrome">
    ${props.title ? TitleDisplay(props) : html``}
  </media-control-bar>
  <div slot="centered-chrome" class="center-controls">
    ${MediaPlayButton()}
  </div>
  ${MediaTimeRange()}
  <media-control-bar>
    ${MediaPlayButton()}
    ${MediaSeekBackwardButton(props)}
    ${MediaSeekForwardButton(props)}
    ${TimeDisplay(props)}
    ${MediaMuteButton()}
    ${MediaVolumeRange()}
    <div class="spacer"></div>
    ${MediaPlaybackRateButton(props)}
    ${MediaCaptionsButton(props)}
    ${MediaAirplayButton()}
    ${MediaCastButton()}
    ${MediaPipButton()}
    ${MediaFullscreenButton()}
    <div class="padding-2"></div>
  </media-control-bar>
`;

// prettier-ignore
export const LiveChromeExtraSmall = VodChromeExtraSmall;

// prettier-ignore
export const LiveChromeSmall = (props: ThemeMuxTemplateProps) => html`
  <media-control-bar slot="top-chrome">
    ${props.title ? TitleDisplay(props) : html``}
    <div class="spacer"></div>
    ${MediaCaptionsButton(props)}
    ${MediaAirplayButton()}
    ${MediaCastButton()}
    ${MediaPipButton()}
  </media-control-bar>
  <div slot="centered-chrome" class="center-controls">
    ${MediaPlayButton()}
  </div>
  <media-control-bar>
    ${MediaMuteButton()}
    ${MediaVolumeRange()}
    <slot name="seek-live"></slot>
    <div class="spacer"></div>
    ${MediaFullscreenButton()}
  </media-control-bar>
`;

// prettier-ignore
export const LiveChromeLarge = (props: ThemeMuxTemplateProps) => html`
  <media-control-bar slot="top-chrome">
    ${props.title ? TitleDisplay(props) : html``}
  </media-control-bar>
  <div slot="centered-chrome" class="center-controls">
    ${MediaPlayButton()}
  </div>
  <media-control-bar>
    ${MediaMuteButton()}
    ${MediaVolumeRange()}
    <slot name="seek-live"></slot>
    <div class="spacer"></div>
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
  <media-control-bar slot="top-chrome">
    ${props.title ? TitleDisplay(props) : html``}
    <div class="spacer"></div>
    ${MediaCaptionsButton(props)}
    ${MediaAirplayButton()}
    ${MediaCastButton()}
    ${MediaPipButton()}
  </media-control-bar>
  <div slot="centered-chrome" class="center-controls">
    ${MediaSeekBackwardButton(props)}
    ${MediaPlayButton()}
    ${MediaSeekForwardButton(props)}
  </div>
  ${MediaTimeRange()}
  <media-control-bar>
    ${MediaMuteButton()}
    ${MediaVolumeRange()}
    <slot name="seek-live"></slot>
    <div class="spacer"></div>
    ${MediaFullscreenButton()}
    <div class="padding-2"></div>
  </media-control-bar>
`;

// prettier-ignore
export const DvrChromeLarge = (props: ThemeMuxTemplateProps) => html`
  <media-control-bar slot="top-chrome">
    ${props.title ? TitleDisplay(props) : html``}
  </media-control-bar>
  <div slot="centered-chrome" class="center-controls">
    ${MediaPlayButton()}
  </div>
  ${MediaTimeRange()}
  <media-control-bar>
    ${MediaPlayButton()}
    ${MediaSeekBackwardButton(props)}
    ${MediaSeekForwardButton(props)}
    ${MediaMuteButton()}
    ${MediaVolumeRange()}
    <slot name="seek-live"></slot>
    <div class="spacer"></div>
    ${MediaCaptionsButton(props)}
    ${MediaAirplayButton()}
    ${MediaCastButton()}
    ${MediaPipButton()}
    ${MediaFullscreenButton()}
    <div class="padding-2"></div>
  </media-control-bar>
`;
