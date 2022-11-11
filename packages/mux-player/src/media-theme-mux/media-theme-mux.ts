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
  hasSrc: boolean;
  isDialogOpen: boolean;
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
      'has-open-dialog',
      'has-src',
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
      hasSrc: this.hasAttribute('has-src'),
      isDialogOpen: this.hasAttribute('has-open-dialog'),
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

    // if nohotkeys is false, set it to true if we don't have a source or of the dialog is open
    props.nohotkeys = props.nohotkeys || !props.hasSrc || props.isDialogOpen;

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
          gestures-disabled="${!props.hasSrc || props.isDialogOpen}"
          hotkeys="${props.hotkeys || false}"
          nohotkeys="${props.nohotkeys || false}"
          audio="${props.audio || false}"
          class="size-${props.playerSize}"
          exportparts="layer, media-layer, poster-layer, vertical-layer, centered-layer, gesture-layer"
        >
          <slot name="media" slot="media"></slot>
          <media-poster-image
            slot="poster"
            part="poster"
            src="${props.poster ?? false}"
            placeholder-src="${props.placeholder ?? false}"
          ></media-poster-image>
          <media-loading-indicator slot="centered-chrome" no-auto-hide></media-loading-indicator>
          ${ChromeRenderer(props)}
          <slot></slot>
        </media-controller>
      `,
      this.shadowRoot as Node
    );
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
const MediaPlayButton = (props: ComponentProps) => html`
  <media-play-button disabled="${!props.hasSrc || props.isDialogOpen}" aria-disabled="${!props.hasSrc || props.isDialogOpen && 'true'}">
    ${icons.Play()}
    ${icons.Pause()}
  </media-play-button>`;

// prettier-ignore
const MediaSeekBackwardButton = ({ backwardSeekOffset, hasSrc, isDialogOpen }: ComponentProps) => html`
  <media-seek-backward-button seek-offset="${backwardSeekOffset}" disabled="${!hasSrc || isDialogOpen}" aria-disabled="${!hasSrc || isDialogOpen && 'true'}">
    ${icons.SeekBackward({ value: backwardSeekOffset })}
  </media-seek-backward-button>`;

// prettier-ignore
const MediaSeekForwardButton = ({ forwardSeekOffset, hasSrc, isDialogOpen }: ComponentProps) => html`
  <media-seek-forward-button seek-offset="${forwardSeekOffset}" disabled="${!hasSrc || isDialogOpen}" aria-disabled="${!hasSrc || isDialogOpen && 'true'}">
    ${icons.SeekForward({ value: forwardSeekOffset })}
  </media-seek-forward-button>`;

// prettier-ignore
const MediaMuteButton = ({ isDialogOpen }: ComponentProps) => html`
  <media-mute-button disabled="${isDialogOpen}" aria-disabled="${isDialogOpen && 'true'}">
    ${icons.VolumeHigh()}
    ${icons.VolumeMedium()}
    ${icons.VolumeLow()}
    ${icons.VolumeOff()}
  </media-mute-button>`;

type CaptionsButtonProps = { defaultHiddenCaptions: boolean; part?: string } & Partial<ComponentProps>;
// prettier-ignore
const MediaCaptionsButton = ({ defaultHiddenCaptions, isDialogOpen }: CaptionsButtonProps) => html`
  <media-captions-button default-showing="${!defaultHiddenCaptions}" disabled="${isDialogOpen}" aria-disabled="${isDialogOpen && 'true'}">
    ${icons.CaptionsOff()}
    ${icons.CaptionsOn()}
  </media-captions-button>`;

// prettier-ignore
const MediaAirplayButton = (props: ComponentProps) => html`
  <media-airplay-button disabled="${!props.hasSrc || props.isDialogOpen}" aria-disabled="${!props.hasSrc || props.isDialogOpen && 'true'}">
    ${icons.Airplay()}
  </media-airplay-button>`;

// prettier-ignore
const MediaPipButton = (props: ComponentProps) => html`
  <media-pip-button disabled="${!props.hasSrc || props.isDialogOpen}" aria-disabled="${!props.hasSrc || props.isDialogOpen && 'true'}">
    ${icons.PipEnter()}
    ${icons.PipExit()}
  </media-pip-button>`;

// prettier-ignore
const MediaFullscreenButton = (props: ComponentProps) => html`
  <media-fullscreen-button disabled="${!props.hasSrc || props.isDialogOpen}" aria-disabled="${!props.hasSrc || props.isDialogOpen && 'true'}">
    ${icons.FullscreenEnter()}
    ${icons.FullscreenExit()}
  </media-fullscreen-button>`;

// prettier-ignore
const MediaCastButton = (props: ComponentProps) => html`
  <media-cast-button disabled="${!props.hasSrc || props.isDialogOpen}" aria-disabled="${!props.hasSrc || props.isDialogOpen && 'true'}">
    ${icons.CastEnter()}
    ${icons.CastExit()}
  </media-cast-button>`;

// prettier-ignore
const MediaPlaybackRateButton = ({ playbackRates, isDialogOpen }: ComponentProps) => html`
  <media-playback-rate-button rates="${playbackRates ?? false}" disabled="${isDialogOpen}" aria-disabled="${isDialogOpen && 'true'}">
  </media-playback-rate-button>`;

// prettier-ignore
const MediaVolumeRange = ({ isDialogOpen }: ComponentProps) => html`
  <media-volume-range disabled="${isDialogOpen}" aria-disabled="${isDialogOpen && 'true'}">
  </media-volume-range>`;

// prettier-ignore
const MediaTimeRange = (props: ComponentProps) => html`
  <media-time-range disabled="${!props.hasSrc || props.isDialogOpen}" aria-disabled="${!props.hasSrc || props.isDialogOpen && 'true'}">
  </media-time-range>`;

// prettier-ignore
const TimeDisplay = ({ defaultShowRemainingTime, hasSrc, isDialogOpen }: ComponentProps) => html`
  <mxp-time-display remaining="${defaultShowRemainingTime}" disabled="${!hasSrc || isDialogOpen}" aria-disabled="${!hasSrc || isDialogOpen && 'true'}">
  </mxp-time-display>`;

// prettier-ignore
const TitleDisplay = ({ title }: ComponentProps) => html`
  <media-text-display part="title" class="title-display">${title}</media-text-display>`;

// prettier-ignore
export const AudioVodChrome = (props: ThemeMuxTemplateProps) => html`
  ${props.title ? html`<media-control-bar>${TitleDisplay(props)}</media-control-bar>` : html``}
  <media-control-bar>
    ${MediaPlayButton(props)}
    ${MediaSeekBackwardButton(props)}
    ${MediaSeekForwardButton(props)}
    ${TimeDisplay(props)}
    ${MediaTimeRange(props)}
    ${MediaMuteButton(props)}
    ${MediaVolumeRange(props)}
    ${MediaPlaybackRateButton(props)}
    ${MediaAirplayButton(props)}
    ${MediaCastButton(props)}
  </media-control-bar>
`;

// prettier-ignore
export const AudioDvrChrome = (props: ThemeMuxTemplateProps) => html`
  ${props.title ? html`<media-control-bar>${TitleDisplay(props)}</media-control-bar>` : html``}
  <media-control-bar>
    ${MediaPlayButton(props)}
    <slot name="seek-live"></slot>
    ${MediaSeekBackwardButton(props)}
    ${MediaSeekForwardButton(props)}
    ${TimeDisplay(props)}
    ${MediaTimeRange(props)}
    ${MediaMuteButton(props)}
    ${MediaVolumeRange(props)}
    ${MediaPlaybackRateButton(props)}
    ${MediaAirplayButton(props)}
    ${MediaCastButton(props)}
  </media-control-bar>
`;

// prettier-ignore
export const AudioLiveChrome = (props: ThemeMuxTemplateProps) => html`
  ${props.title ? html`<media-control-bar>${TitleDisplay(props)}</media-control-bar>` : html``}
  <media-control-bar>
    ${MediaPlayButton(props)}
    <slot name="seek-live"></slot>
    ${MediaMuteButton(props)}
    ${MediaVolumeRange(props)}
    <div class="spacer"></div>
    ${MediaAirplayButton(props)}
    ${MediaCastButton(props)}
  </media-control-bar>
`;

// prettier-ignore
export const VodChromeExtraSmall = (props: ThemeMuxTemplateProps) => html`
  ${MediaTimeRange(props)}
  <media-control-bar>
    ${MediaPlayButton(props)}
    ${MediaMuteButton(props)}
    <div class="spacer"></div>
    ${MediaCaptionsButton(props)}
    ${MediaFullscreenButton(props)}
  </media-control-bar>
`;

// prettier-ignore
export const VodChromeSmall = (props: ThemeMuxTemplateProps) => html`
  <media-control-bar slot="top-chrome">
    ${props.title ? TitleDisplay(props) : html``}
  </media-control-bar>
  <div slot="centered-chrome" class="center-controls">
    ${MediaSeekBackwardButton(props)}
    ${MediaPlayButton(props)}
    ${MediaSeekForwardButton(props)}
  </div>
  ${MediaTimeRange(props)}
  <media-control-bar>
    ${TimeDisplay(props)}
    ${MediaMuteButton(props)}
    ${MediaVolumeRange(props)}
    <div class="spacer"></div>
    ${MediaPlaybackRateButton(props)}
    ${MediaCaptionsButton(props)}
    ${MediaAirplayButton(props)}
    ${MediaCastButton(props)}
    ${MediaPipButton(props)}
    ${MediaFullscreenButton(props)}
  </media-control-bar>
`;

// prettier-ignore
export const VodChromeLarge = (props: ThemeMuxTemplateProps) => html`
  <media-control-bar slot="top-chrome">
    ${props.title ? TitleDisplay(props) : html``}
  </media-control-bar>
  <div slot="centered-chrome" class="center-controls">
    ${MediaPlayButton(props)}
  </div>
  ${MediaTimeRange(props)}
  <media-control-bar>
    ${MediaPlayButton(props)}
    ${MediaSeekBackwardButton(props)}
    ${MediaSeekForwardButton(props)}
    ${TimeDisplay(props)}
    ${MediaMuteButton(props)}
    ${MediaVolumeRange(props)}
    <div class="spacer"></div>
    ${MediaPlaybackRateButton(props)}
    ${MediaCaptionsButton(props)}
    ${MediaAirplayButton(props)}
    ${MediaCastButton(props)}
    ${MediaPipButton(props)}
    ${MediaFullscreenButton(props)}
  </media-control-bar>
`;

// prettier-ignore
export const LiveChromeExtraSmall = (props: ThemeMuxTemplateProps) => html`
  <media-control-bar slot="top-chrome">
    <slot name="seek-live"></slot>
  </media-control-bar>
  <media-control-bar>
    ${MediaPlayButton(props)}
    ${MediaMuteButton(props)}
    <div class="spacer"></div>
    ${MediaCaptionsButton(props)}
    ${MediaFullscreenButton(props)}
  </media-control-bar>
`;

// prettier-ignore
export const LiveChromeSmall = (props: ThemeMuxTemplateProps) => html`
  <media-control-bar slot="top-chrome">
    <slot name="seek-live"></slot>
    ${props.title ? TitleDisplay(props) : html``}
  </media-control-bar>
  <div slot="centered-chrome" class="center-controls">
    ${MediaPlayButton(props)}
  </div>
  <media-control-bar>
    ${MediaMuteButton(props)}
    ${MediaVolumeRange(props)}
    <div class="spacer"></div>
    ${MediaCaptionsButton(props)}
    ${MediaAirplayButton(props)}
    ${MediaCastButton(props)}
    ${MediaPipButton(props)}
    ${MediaFullscreenButton(props)}
  </media-control-bar>
`;

// prettier-ignore
export const LiveChromeLarge = (props: ThemeMuxTemplateProps) => html`
  <media-control-bar slot="top-chrome">
    <slot name="seek-live"></slot>
    ${props.title ? TitleDisplay(props) : html``}
  </media-control-bar>
  <div slot="centered-chrome" class="center-controls">
    ${MediaPlayButton(props)}
  </div>
  <media-control-bar>
    ${MediaPlayButton(props)}
    ${MediaMuteButton(props)}
    ${MediaVolumeRange(props)}
    <div class="spacer"></div>
    ${MediaCaptionsButton(props)}
    ${MediaAirplayButton(props)}
    ${MediaCastButton(props)}
    ${MediaPipButton(props)}
    ${MediaFullscreenButton(props)}
  </media-control-bar>
`;

// prettier-ignore
export const DvrChromeExtraSmall = (props: ThemeMuxTemplateProps) => html`
  <media-control-bar slot="top-chrome">
    <slot name="seek-live"></slot>
  </media-control-bar>
  ${MediaTimeRange(props)}
  <media-control-bar>
    ${MediaPlayButton(props)}
    ${MediaMuteButton(props)}
    <div class="spacer"></div>
    ${MediaCaptionsButton(props)}
    ${MediaFullscreenButton(props)}
  </media-control-bar>
`;

// prettier-ignore
export const DvrChromeSmall = (props: ThemeMuxTemplateProps) => html`
  <media-control-bar slot="top-chrome">
    <slot name="seek-live"></slot>
    ${props.title ? TitleDisplay(props) : html``}
  </media-control-bar>
  <div slot="centered-chrome" class="center-controls">
    ${MediaSeekBackwardButton(props)}
    ${MediaPlayButton(props)}
    ${MediaSeekForwardButton(props)}
  </div>
  ${MediaTimeRange(props)}
  <media-control-bar>
    ${MediaMuteButton(props)}
    ${MediaVolumeRange(props)}
    <div class="spacer"></div>
    ${MediaCaptionsButton(props)}
    ${MediaAirplayButton(props)}
    ${MediaCastButton(props)}
    ${MediaPipButton(props)}
    ${MediaFullscreenButton(props)}
  </media-control-bar>
`;

// prettier-ignore
export const DvrChromeLarge = (props: ThemeMuxTemplateProps) => html`
  <media-control-bar slot="top-chrome">
    <slot name="seek-live"></slot>
    ${props.title ? TitleDisplay(props) : html``}
  </media-control-bar>
  <div slot="centered-chrome" class="center-controls">
    ${MediaPlayButton(props)}
  </div>
  ${MediaTimeRange(props)}
  <media-control-bar>
    ${MediaPlayButton(props)}
    ${MediaSeekBackwardButton(props)}
    ${MediaSeekForwardButton(props)}
    ${MediaMuteButton(props)}
    ${MediaVolumeRange(props)}
    <div class="spacer"></div>
    ${MediaCaptionsButton(props)}
    ${MediaAirplayButton(props)}
    ${MediaCastButton(props)}
    ${MediaPipButton(props)}
    ${MediaFullscreenButton(props)}
  </media-control-bar>
`;
