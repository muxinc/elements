import 'media-chrome/dist/media-theme-element.js';
// @ts-ignore
import cssStr from './styles.css';
import './dialog';
import { getSrcFromPlaybackId, getStreamTypeFromAttr } from './helpers';
import { html } from './html';
import { i18n, stylePropsToString } from './utils';
import classicTheme from './themes/classic';
import type { MuxTemplateProps } from './types';
import { StreamTypes } from '@mux/playback-core';

export const template = (props: MuxTemplateProps) => html`
  <style>
    ${cssStr}
  </style>
  ${content(props)}
`;

const getHotKeys = (props: MuxTemplateProps) => {
  let hotKeys = props.hotKeys ? `${props.hotKeys}` : '';
  // Applies to any live content, including "dvr". We may want to only apply for non-DVR live.
  if (getStreamTypeFromAttr(props.streamType) === 'live') {
    hotKeys += ' noarrowleft noarrowright';
  }
  return hotKeys;
};

// Warning: remember to update `ThemeAttributeNames` in index.ts
// if you add or remove attributes in <media-theme>.

export const content = (props: MuxTemplateProps) => html`
  <media-theme
    template="${props.themeTemplate ?? classicTheme.template}"
    defaultstreamtype="${props.defaultStreamType ?? false}"
    hotkeys="${getHotKeys(props) || false}"
    nohotkeys="${props.noHotKeys || !props.hasSrc || props.isDialogOpen || false}"
    noautoseektolive="${!!props.streamType?.includes(StreamTypes.LIVE) && props.targetLiveWindow !== 0}"
    novolumepref="${props.novolumepref || false}"
    disabled="${!props.hasSrc || props.isDialogOpen}"
    audio="${props.audio ?? false}"
    style="${stylePropsToString({
      '--media-primary-color': props.primaryColor,
      '--media-secondary-color': props.secondaryColor,
    }) ?? false}"
    defaultsubtitles="${!props.defaultHiddenCaptions}"
    forwardseekoffset="${props.forwardSeekOffset ?? false}"
    backwardseekoffset="${props.backwardSeekOffset ?? false}"
    playbackrates="${props.playbackRates ?? false}"
    defaultshowremainingtime="${props.defaultShowRemainingTime ?? false}"
    hideduration="${props.hideDuration ?? false}"
    title="${props.title ?? false}"
    exportparts="top, center, bottom, layer, media-layer, poster-layer, vertical-layer, centered-layer, gesture-layer, poster, live, play, button, seek-backward, seek-forward, mute, captions, airplay, pip, fullscreen, cast, playback-rate, volume, range, time, display"
  >
    <mux-video
      slot="media"
      target-live-window="${props.targetLiveWindow ?? false}"
      stream-type="${getStreamTypeFromAttr(props.streamType) ?? false}"
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
