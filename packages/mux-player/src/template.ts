import 'media-chrome/dist/media-theme-element.js';
// @ts-ignore
import cssStr from './styles.css';
import './dialog';
import { getStreamTypeFromAttr } from './helpers';
import { html } from './html';
import { i18n, stylePropsToString } from './utils';
import type { MuxTemplateProps } from './types';
import { StreamTypes, toMuxVideoURL } from '@mux/playback-core';

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
    template="${props.themeTemplate || false}"
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
      '--media-accent-color': props.accentColor,
    }) ?? false}"
    defaultsubtitles="${!props.defaultHiddenCaptions}"
    forwardseekoffset="${props.forwardSeekOffset ?? false}"
    backwardseekoffset="${props.backwardSeekOffset ?? false}"
    playbackrates="${props.playbackRates ?? false}"
    defaultshowremainingtime="${props.defaultShowRemainingTime ?? false}"
    hideduration="${props.hideDuration ?? false}"
    title="${props.title ?? false}"
    exportparts="top, center, bottom, layer, media-layer, poster-layer, vertical-layer, centered-layer, gesture-layer, controller, poster, live, play, button, seek-backward, seek-forward, mute, captions, airplay, pip, fullscreen, cast, playback-rate, volume, range, time, display, control-bar"
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
      src="${!!props.src ? props.src : props.playbackId ? toMuxVideoURL(props) : false}"
      cast-src="${!!props.src ? props.src : props.playbackId ? toMuxVideoURL(props) : false}"
      exportparts="video"
    >
      ${props.storyboard
        ? html`<track label="thumbnails" default kind="metadata" src="${props.storyboard}" />`
        : html``}
    </mux-video>
    <slot name="poster" slot="poster">
      <media-poster-image
        part="poster"
        exportparts="poster, img"
        src="${props.poster === '' ? false : props.poster ?? false}"
        placeholdersrc="${props.placeholder ?? false}"
      ></media-poster-image>
    </slot>
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
