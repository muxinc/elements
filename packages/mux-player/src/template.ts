import { document } from './polyfills';
import 'media-chrome/dist/media-theme-element.js';
import './media-chrome/time-display';
// @ts-ignore
import cssStr from './styles.css';
// @ts-ignore
import muxTheme from './media-theme-mux.html';
import './dialog';
import { getSrcFromPlaybackId } from './helpers';
import { html } from './html';
import { i18n, stylePropsToString } from './utils';

import type { MuxTemplateProps } from './types';
import { StreamTypes } from '@mux/playback-core';

const muxTemplate = document.createElement('template');
if ('innerHTML' in muxTemplate) muxTemplate.innerHTML = muxTheme;

// prettier-ignore
export const template = (props: MuxTemplateProps) => html`
  <style>
    ${cssStr}
  </style>
  ${content(props)}
`;

const isLive = (props: MuxTemplateProps) => [StreamTypes.LIVE, StreamTypes.LL_LIVE].includes(props.streamType as any);

const isDVR = (props: MuxTemplateProps) => [StreamTypes.DVR, StreamTypes.LL_DVR].includes(props.streamType as any);

const isLiveOrDVR = (props: MuxTemplateProps) => isLive(props) || isDVR(props);

const getHotKeys = (props: MuxTemplateProps) => {
  let hotKeys = props.hotKeys ? `${props.hotKeys}` : '';
  if (isLiveOrDVR(props)) {
    hotKeys += ' noarrowleft noarrowright';
  }
  return hotKeys;
};

export const content = (props: MuxTemplateProps) => html`
  <media-theme
    template="${props.themeTemplate ?? muxTemplate.content.children[0]}"
    stream-type="${isLiveOrDVR(props) ? 'live' : 'on-demand'}"
    target-live-window="${isDVR(props) ? 1 : false}"
    hotkeys="${getHotKeys(props) || false}"
    nohotkeys="${props.noHotKeys || !props.hasSrc || props.isDialogOpen || false}"
    disabled="${!props.hasSrc || props.isDialogOpen}"
    audio="${props.audio ?? false}"
    style="${stylePropsToString({
      '--media-primary-color': props.primaryColor,
      '--media-secondary-color': props.secondaryColor,
    }) ?? false}"
    default-showing-captions="${!props.defaultHiddenCaptions}"
    forward-seek-offset="${props.forwardSeekOffset ?? false}"
    backward-seek-offset="${props.backwardSeekOffset ?? false}"
    playback-rates="${props.playbackRates ?? false}"
    default-show-remaining-time="${props.defaultShowRemainingTime ?? false}"
    title="${props.title ?? false}"
    exportparts="top, center, bottom, layer, media-layer, poster-layer, vertical-layer, centered-layer, gesture-layer, poster, live, play, button, seek-backward, seek-forward, mute, captions, airplay, pip, fullscreen, cast, playback-rate, volume, range, time, display"
  >
    <mux-video
      slot="media"
      crossorigin="${props.crossOrigin ?? ''}"
      playsinline
      autoplay="${props.autoplay ?? false}"
      muted="${props.muted ?? false}"
      loop="${props.loop ?? false}"
      preload="${props.preload ?? false}"
      debug="${props.debug ?? false}"
      prefer-cmcd="${props.preferCmcd ?? false}"
      disable-cookies="${props.disableCookies ?? false}"
      prefer-playback="${props.preferPlayback ?? false}"
      start-time="${props.startTime != null ? props.startTime : false}"
      beacon-collection-domain="${props.beaconCollectionDomain ?? false}"
      player-software-name="${props.playerSoftwareName ?? false}"
      player-software-version="${props.playerSoftwareVersion ?? false}"
      env-key="${props.envKey ?? false}"
      stream-type="${props.streamType ?? false}"
      custom-domain="${props.customDomain ?? false}"
      src="${!!props.src
        ? props.src
        : props.playbackId
        ? getSrcFromPlaybackId(props.playbackId, {
            maxResolution: props.maxResolution,
            domain: props.customDomain,
            token: props.tokens.playback,
          })
        : false}"
      cast-src="${!!props.src
        ? props.src
        : props.playbackId
        ? getSrcFromPlaybackId(props.playbackId, {
            maxResolution: props.maxResolution,
            domain: props.customDomain,
            token: props.tokens.playback,
          })
        : false}"
      cast-stream-type="${isLive(props) ? 'live' : false}"
      exportparts="video"
    >
      ${props.storyboard
        ? html`<track label="thumbnails" default kind="metadata" src="${props.storyboard}" />`
        : html``}
    </mux-video>
    <media-poster-image
      slot="poster"
      part="poster"
      src="${props.poster === '' ? false : props.poster ?? false}"
      placeholder-src="${props.placeholder ?? false}"
    ></media-poster-image>
    <mxp-dialog
      no-auto-hide
      open="${props.isDialogOpen ?? false}"
      onclose="${props.onCloseErrorDialog}"
      oninitfocus="${props.onInitFocusDialog}"
    >
      ${props.dialog?.title ? html`<h3>${props.dialog.title}</h3>` : html``}
      <p>
        ${props.dialog?.message}
        ${props.dialog?.linkUrl
          ? html`<a
              href="${props.dialog.linkUrl}"
              target="_blank"
              rel="external noopener"
              aria-label="${props.dialog.linkText ?? ''} ${i18n(`(opens in a new window)`)}"
              >${props.dialog.linkText ?? props.dialog.linkUrl}</a
            >`
          : html``}
      </p>
    </mxp-dialog>
  </media-theme>
`;
