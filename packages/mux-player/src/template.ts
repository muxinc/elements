import './dialog';
import './time-display';
import {
  getChromeStylesFromProps,
  getSrcFromPlaybackId,
  getPosterURLFromPlaybackId,
  getStoryboardURLFromPlaybackId,
} from './helpers';
import { html } from './html';
import * as icons from './icons';
// @ts-ignore
import cssStr from './styles.css';
import { i18n } from './utils';

import type { MuxTemplateProps } from './types';
import { StreamTypes } from './constants';

const MediaChromeSizes = {
  LG: 'large',
  SM: 'small',
  XS: 'extra-small',
};

const Spacer = () => html`<div class="mxp-spacer"></div>`;

export const template = (props: MuxTemplateProps) => html`
  <style>
    ${cssStr}
  </style>
  <style class="sizes">
    :host {
      aspect-ratio: 16 / 9;
    }
  </style>
  ${content(props)}
`;

export const content = (props: MuxTemplateProps) => html`
  <media-controller style="${getChromeStylesFromProps(props) ?? false}" class="size-${props.playerSize}">
    <mux-video
      slot="media"
      crossorigin
      playsinline
      autoplay="${props.autoplay ?? false}"
      muted="${props.muted ?? false}"
      loop="${props.loop ?? false}"
      preload="${props.preload ?? false}"
      debug="${props.debug ?? false}"
      prefer-mse="${props.preferMse ?? false}"
      start-time="${props.startTime != null ? props.startTime : false}"
      metadata-video-id="${props.metadataVideoId ?? props.metadata?.video_id ?? false}"
      metadata-video-title="${props.metadataVideoTitle ?? props.metadata?.video_title ?? false}"
      metadata-viewer-user-id="${props.metadataViewerUserId ?? props.metadata?.viewer_user_id ?? false}"
      beacon-collection-domain="${props.beaconCollectionDomain ?? false}"
      player-software-name="${props.playerSoftwareName}"
      player-software-version="${props.playerSoftwareVersion}"
      env-key="${props.envKey ?? false}"
      stream-type="${props.streamType ?? false}"
      src="${!!props.src
        ? props.src
        : props.playbackId
        ? getSrcFromPlaybackId(props.playbackId, props.tokens.playback)
        : false}"
      poster="${!!props.poster
        ? props.poster
        : props.playbackId
        ? getPosterURLFromPlaybackId(props.playbackId, props.tokens.thumbnail)
        : false}"
    >
      ${props.playbackId && props.streamType !== StreamTypes.LIVE && props.streamType !== StreamTypes.LL_LIVE
        ? html`<track
            label="thumbnails"
            default
            kind="metadata"
            src="${getStoryboardURLFromPlaybackId(props.playbackId, props.tokens.storyboard)}"
          />`
        : html``}
    </mux-video>
    <media-loading-indicator slot="centered-chrome" no-auto-hide></media-loading-indicator>
    ${ChromeRenderer(props)}
    <mxp-dialog slot="centered-chrome" no-auto-hide open="${props.isDialogOpen}" onclose="${props.onCloseErrorDialog}">
      ${props.dialog?.title ? html`<h3>${props.dialog.title}</h3>` : html``}
      <p>
        ${props.dialog?.message}
        ${props.dialog?.linkUrl
          ? html`<a
              href="${props.dialog.linkUrl}"
              target="_blank"
              rel="external noopener"
              aria-label="${props.dialog.linkText ?? ''} ${i18n`(opens in a new window)`}"
              >${props.dialog.linkText ?? props.dialog.linkUrl}</a
            >`
          : html``}
      </p>
    </mxp-dialog>
  </media-controller>
`;

export const ChromeRenderer = (props: MuxTemplateProps) => {
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
const SeekToLiveButton = (props: Partial<MuxTemplateProps>) => html`
  <button 
    aria-disabled="${props.inLiveWindow}"
    onclick="${function (this: HTMLButtonElement, evt: Event) {
      props.onSeekToLive?.(evt);
      if (props.paused) {
        const playRequestEvt = new CustomEvent(
          'mediaplayrequest', 
          { composed: true, bubbles: true }
        );
        (this as HTMLButtonElement).dispatchEvent(playRequestEvt);
      }
    }}" 
    class="mxp-seek-to-live-button"
  >
    Live
  </button>
`;

// prettier-ignore
const MediaPlayButton = (props: Partial<MuxTemplateProps>) => html`
  <media-play-button 
    onmediaplayrequest="${props.streamType === StreamTypes.LIVE || props.streamType === StreamTypes.LL_LIVE ? props.onSeekToLive : false}"
  >
    ${icons.Play()}
    ${icons.Pause()}
  </media-play-button>
`;

// prettier-ignore
const MediaSeekBackwardButton = (props: Partial<MuxTemplateProps>) => html`
  <media-seek-backward-button seek-offset="${props.backwardSeekOffset}">
    ${icons.SeekBackward({ value: props.backwardSeekOffset })}
  </media-seek-backward-button>
`;

// prettier-ignore
const MediaSeekForwardButton = (props: Partial<MuxTemplateProps>) => html`
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
const MediaCaptionsButton = (props: MuxTemplateProps) => html`
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
export const VodChromeExtraSmall = (props: MuxTemplateProps) => html`
  <media-control-bar slot="top-chrome">
    ${props.hasCaptions ? MediaCaptionsButton(props) : html``}
    ${Spacer()}
    ${props.supportsAirPlay ? MediaAirplayButton() : html``}
    ${MediaPipButton()}
  </media-control-bar>
  <div slot="centered-chrome" class="mxp-center-controls">
    ${MediaPlayButton(props)}
  </div>
  <media-control-bar>
    ${MediaMuteButton()}
    ${Spacer()}
    ${MediaFullscreenButton()}
  </media-control-bar>
`;

// prettier-ignore
export const VodChromeSmall = (props: MuxTemplateProps) => html`
  <media-control-bar slot="top-chrome" style="justify-content: flex-end;">
    ${props.hasCaptions ? MediaCaptionsButton(props) : html``}
    ${props.supportsAirPlay ? MediaAirplayButton() : html``}
    ${MediaPipButton()}
  </media-control-bar>
  <div slot="centered-chrome" class="mxp-center-controls">
    ${MediaSeekBackwardButton(props)}
    ${MediaPlayButton(props)}
    ${MediaSeekForwardButton(props)}
  </div>
  <media-control-bar>
    <media-time-range></media-time-range>
    <mxp-time-display></mxp-time-display>
    ${MediaMuteButton()}
    ${props.supportsVolume ? html`<media-volume-range></media-volume-range>` : html``}
    <media-playback-rate-button></media-playback-rate-button>
    ${MediaFullscreenButton()}
  </media-control-bar>
`;

// prettier-ignore
export const VodChromeLarge = (props: MuxTemplateProps) => html`
  <div slot="centered-chrome" class="mxp-center-controls">
    ${MediaPlayButton(props)}
  </div>
  <media-control-bar>
    ${MediaPlayButton(props)}
    ${MediaSeekBackwardButton(props)}
    ${MediaSeekForwardButton(props)}
    <media-time-range></media-time-range>
    <mxp-time-display></mxp-time-display>
    ${MediaMuteButton()}
    ${props.supportsVolume ? html`<media-volume-range></media-volume-range>` : html``}
    <media-playback-rate-button></media-playback-rate-button>
    ${props.hasCaptions ? MediaCaptionsButton(props) : html``}
    ${props.supportsAirPlay ? MediaAirplayButton() : html``}
    ${MediaPipButton()}
    ${MediaFullscreenButton()}
  </media-control-bar>
`;

// prettier-ignore
export const LiveChromeExtraSmall = VodChromeExtraSmall;

// prettier-ignore
export const LiveChromeSmall = (props: MuxTemplateProps) => html`
  <media-control-bar slot="top-chrome">
    ${SeekToLiveButton(props)}
    ${Spacer()}
    ${props.hasCaptions ? MediaCaptionsButton(props) : html``}
    ${props.supportsAirPlay ? MediaAirplayButton() : html``}
    ${MediaPipButton()}
  </media-control-bar>
  <div slot="centered-chrome" class="mxp-center-controls">
    ${MediaPlayButton(props)}
  </div>
  <media-control-bar>
    ${MediaMuteButton()}
    ${props.supportsVolume ? html`<media-volume-range></media-volume-range>` : html``}
    ${Spacer()}
    ${MediaFullscreenButton()}
  </media-control-bar>
`;

// prettier-ignore
export const LiveChromeLarge = (props: MuxTemplateProps) => html`
  <media-control-bar slot="top-chrome">
    ${SeekToLiveButton(props)}
  </media-control-bar>
  <div slot="centered-chrome" class="mxp-center-controls">
    ${MediaPlayButton(props)}
  </div>
  <media-control-bar>
    ${MediaMuteButton()}
    ${props.supportsVolume ? html`<media-volume-range></media-volume-range>` : html``}
    ${Spacer()}
    ${props.hasCaptions ? MediaCaptionsButton(props) : html``}
    ${props.supportsAirPlay ? MediaAirplayButton() : html``}
    ${MediaPipButton()}
    ${MediaFullscreenButton()}
  </media-control-bar>
`;
