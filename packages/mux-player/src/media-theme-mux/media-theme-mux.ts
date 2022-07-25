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

export const parts = {
  mediaChrome: 'layer media-layer poster-layer vertical-layer centered-layer',
  centerPlay: 'center play button',
  centerSeekBackward: 'center seek-backward button',
  centerSeekForward: 'center seek-forward button',
  play: 'play button',
  seekBackward: 'seek-backward button',
  seekForward: 'seek-forward button',
  mute: 'mute button',
  captions: 'captions button',
  airplay: 'airplay button',
  pip: 'pip button',
  fullscreen: 'fullscreen button',
  cast: 'cast button',
  playbackRate: 'playbackrate button',
  volumeRange: 'volume range',
  timeRange: 'time range',
  timeDisplay: 'time display',
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
        <media-controller
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
const MediaPlayButton = ({ part = parts.play } = {}) => html`
  <media-play-button part="${part}">
    ${icons.Play()}
    ${icons.Pause()}
  </media-play-button>
`;

// prettier-ignore
type SeekBackwardButtonProps = { backwardSeekOffset: string, part?: string };
const MediaSeekBackwardButton = ({ backwardSeekOffset, part = parts.seekBackward }: SeekBackwardButtonProps) => html`
  <media-seek-backward-button seek-offset="${backwardSeekOffset}" part="${part}">
    ${icons.SeekBackward({ value: backwardSeekOffset })}
  </media-seek-backward-button>
`;

// prettier-ignore
type SeekForwardButtonProps = { forwardSeekOffset: string, part?: string };
const MediaSeekForwardButton = ({ forwardSeekOffset, part = parts.seekForward }: SeekForwardButtonProps) => html`
  <media-seek-forward-button seek-offset="${forwardSeekOffset}" part="${part}">
    ${icons.SeekForward({ value: forwardSeekOffset })}
  </media-seek-forward-button>
`;

// prettier-ignore
const MediaMuteButton = () => html`
  <media-mute-button part="${parts.mute}">
    ${icons.VolumeHigh()}
    ${icons.VolumeMedium()}
    ${icons.VolumeLow()}
    ${icons.VolumeOff()}
  </media-mute-button>
`;

// prettier-ignore
const MediaCaptionsButton = (props: ThemeMuxTemplateProps) => html`
<media-captions-button default-showing="${!props.defaultHiddenCaptions}" part="${parts.captions}">
  ${icons.CaptionsOff()}
  ${icons.CaptionsOn()}
</media-captions-button>`;

// prettier-ignore
const MediaAirplayButton = () => html`
<media-airplay-button part="${parts.airplay}">
  ${icons.Airplay()}
</media-airplay-button>`;

// prettier-ignore
const MediaPipButton = () => html`
<media-pip-button part="${parts.pip}">
  ${icons.PipEnter()}
  ${icons.PipExit()}
</media-pip-button>`;

// prettier-ignore
const MediaFullscreenButton = () => html`
<media-fullscreen-button part="${parts.fullscreen}">
  ${icons.FullscreenEnter()}
  ${icons.FullscreenExit()}
</media-fullscreen-button>`;

// prettier-ignore
const MediaCastButton = () => html`
<media-cast-button part="${parts.cast}">
  ${icons.CastEnter()}
  ${icons.CastExit()}
</media-cast-button>`;

// prettier-ignore
const MediaPlaybackRateButton = () => html`
<media-playback-rate-button part="${parts.playbackRate}">
</media-playback-rate-button>`;

// prettier-ignore
const MediaVolumeRange = () => html`
<media-volume-range part="${parts.volumeRange}">
</media-volume-range>`;

// prettier-ignore
const MediaTimeRange = () => html`
<media-time-range part="${parts.timeRange}">
</media-time-range>`;

// prettier-ignore
const TimeDisplay = () => html`
<mxp-time-display part="${parts.timeDisplay}">
</mxp-time-display>`;

// prettier-ignore
export const AudioVodChrome = (props: ThemeMuxTemplateProps) => html`
  <media-control-bar>
    ${MediaPlayButton()}
    ${MediaSeekBackwardButton(props as SeekBackwardButtonProps)}
    ${MediaSeekForwardButton(props as SeekForwardButtonProps)}
    ${TimeDisplay()}
    ${MediaTimeRange()}
    ${MediaMuteButton()}
    ${MediaVolumeRange()}
    ${MediaPlaybackRateButton()}
    ${MediaAirplayButton()}
    ${MediaCastButton()}
  </media-control-bar>
`;

// prettier-ignore
export const AudioDvrChrome = (props: ThemeMuxTemplateProps) => html`
  <media-control-bar>
    ${MediaPlayButton()}
    <slot name="seek-to-live-button"></slot>
    ${MediaSeekBackwardButton(props as SeekBackwardButtonProps)}
    ${MediaSeekForwardButton(props as SeekForwardButtonProps)}
    ${TimeDisplay()}
    ${MediaTimeRange()}
    ${MediaMuteButton()}
    ${MediaVolumeRange()}
    ${MediaPlaybackRateButton()}
    ${MediaAirplayButton()}
    ${MediaCastButton()}
  </media-control-bar>
`;

// prettier-ignore
export const AudioLiveChrome = () => html`
  <media-control-bar>
    ${MediaPlayButton()}
    <slot name="seek-to-live-button"></slot>
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
    <div class="mxp-spacer"></div>
    ${MediaAirplayButton()}
    ${MediaCastButton()}
    ${MediaPipButton()}
  </media-control-bar>
  <div slot="centered-chrome" class="mxp-center-controls">
    ${MediaPlayButton({ part: parts.centerPlay })}
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
    ${MediaCastButton()}
    ${MediaPipButton()}
  </media-control-bar>
  <div slot="centered-chrome" class="mxp-center-controls">
    ${MediaSeekBackwardButton({ ...props, part: parts.centerSeekBackward } as SeekBackwardButtonProps)}
    ${MediaPlayButton({ part: parts.centerPlay })}
    ${MediaSeekForwardButton({ ...props, part: parts.centerSeekForward } as SeekForwardButtonProps)}
  </div>
  ${MediaTimeRange()}
  <media-control-bar>
    ${TimeDisplay()}
    ${MediaMuteButton()}
    ${MediaVolumeRange()}
    <div class="mxp-spacer"></div>
    ${MediaPlaybackRateButton()}
    ${MediaFullscreenButton()}
    <div class="mxp-padding-2"></div>
  </media-control-bar>
`;

// prettier-ignore
export const VodChromeLarge = (props: ThemeMuxTemplateProps) => html`
  <div slot="centered-chrome" class="mxp-center-controls">
    ${MediaPlayButton({ part: parts.centerPlay })}
  </div>
  ${MediaTimeRange()}
  <media-control-bar>
    ${MediaPlayButton()}
    ${MediaSeekBackwardButton(props as SeekBackwardButtonProps)}
    ${MediaSeekForwardButton(props as SeekForwardButtonProps)}
    ${TimeDisplay()}
    ${MediaMuteButton()}
    ${MediaVolumeRange()}
    <div class="mxp-spacer"></div>
    ${MediaPlaybackRateButton()}
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
    <slot name="seek-to-live-button"></slot>
    <div class="mxp-spacer"></div>
    ${MediaCaptionsButton(props)}
    ${MediaAirplayButton()}
    ${MediaCastButton()}
    ${MediaPipButton()}
  </media-control-bar>
  <div slot="centered-chrome" class="mxp-center-controls">
    ${MediaPlayButton({ part: parts.centerPlay })}
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
    <slot name="seek-to-live-button"></slot>
  </media-control-bar>
  <div slot="centered-chrome" class="mxp-center-controls">
    ${MediaPlayButton({ part: parts.centerPlay })}
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
    ${MediaCaptionsButton(props)}
    ${MediaAirplayButton()}
    ${MediaCastButton()}
    ${MediaPipButton()}
  </media-control-bar>
  <div slot="centered-chrome" class="mxp-center-controls">
    ${MediaSeekBackwardButton({ ...props, part: parts.centerSeekBackward } as SeekBackwardButtonProps)}
    ${MediaPlayButton({ part: parts.centerPlay })}
    ${MediaSeekForwardButton({ ...props, part: parts.centerSeekForward } as SeekForwardButtonProps)}
  </div>
  ${MediaTimeRange()}
  <media-control-bar>
    ${MediaMuteButton()}
    ${MediaVolumeRange()}
    <slot name="seek-to-live-button"></slot>
    <div class="mxp-spacer"></div>
    ${MediaFullscreenButton()}
    <div class="mxp-padding-2"></div>
  </media-control-bar>
`;

// prettier-ignore
export const DvrChromeLarge = (props: ThemeMuxTemplateProps) => html`
  <div slot="centered-chrome" class="mxp-center-controls">
    ${MediaPlayButton({ part: parts.centerPlay })}
  </div>
  ${MediaTimeRange()}
  <media-control-bar>
    ${MediaPlayButton()}
    ${MediaSeekBackwardButton(props as SeekBackwardButtonProps)}
    ${MediaSeekForwardButton(props as SeekForwardButtonProps)}
    ${MediaMuteButton()}
    ${MediaVolumeRange()}
    <slot name="seek-to-live-button"></slot>
    <div class="mxp-spacer"></div>
    ${MediaCaptionsButton(props)}
    ${MediaAirplayButton()}
    ${MediaCastButton()}
    ${MediaPipButton()}
    ${MediaFullscreenButton()}
    <div class="mxp-padding-2"></div>
  </media-control-bar>
`;
