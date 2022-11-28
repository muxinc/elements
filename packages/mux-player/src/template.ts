import './media-theme-mux/media-theme-mux';
import './dialog';
import { castThemeName, getSrcFromPlaybackId } from './helpers';
import { html, unsafeStatic } from './html';
// @ts-ignore
import cssStr from './styles.css';
import { i18n, stylePropsToString } from './utils';

import type { MuxTemplateProps } from './types';
import { StreamTypes } from '@mux/playback-core';

export const template = (props: MuxTemplateProps) => html`
  <style>
    ${cssStr}
  </style>
  ${content(props)}
`;

const isLive = (props: MuxTemplateProps) => [StreamTypes.LIVE, StreamTypes.LL_LIVE].includes(props.streamType as any);

const isLiveOrDVR = (props: MuxTemplateProps) =>
  [StreamTypes.LIVE, StreamTypes.LL_LIVE, StreamTypes.DVR, StreamTypes.LL_DVR].includes(props.streamType as any);

export const content = (props: MuxTemplateProps) => html`
  <${unsafeStatic(castThemeName(props.theme) ?? 'media-theme-mux')}
    has-src="${props.hasSrc ?? false}"
    has-open-dialog="${props.isDialogOpen ?? false}"
    nohotkeys="${props.noHotKeys ?? false}"
    audio="${props.audio ?? false}"
    style="${
      stylePropsToString({
        '--primary-color': props.primaryColor,
        '--secondary-color': props.secondaryColor,
      }) ?? false
    }"
    class="size-${props.playerSize}${props.secondaryColor ? ' two-tone' : ''}"
    stream-type="${props.streamType ?? false}"
    player-size="${props.playerSize ?? false}"
    default-hidden-captions="${props.defaultHiddenCaptions ?? false}"
    forward-seek-offset="${props.forwardSeekOffset ?? false}"
    backward-seek-offset="${props.backwardSeekOffset ?? false}"
    playbackrates="${props.playbackRates ?? false}"
    default-show-remaining-time="${props.defaultShowRemainingTime ?? false}"
    title="${props.title ?? false}"
    hotkeys="${props.hotKeys ?? false}"
    poster="${props.poster === '' ? false : props.poster ?? false}"
    placeholder="${props.placeholder ?? false}"
    exportparts="top, center, bottom, layer, media-layer, poster-layer, vertical-layer, centered-layer, gesture-layer, poster, seek-live, play, button, seek-backward, seek-forward, mute, captions, airplay, pip, fullscreen, cast, playback-rate, volume, range, time, display"
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
      metadata-video-id="${props.metadataVideoId ?? false}"
      metadata-video-title="${props.metadataVideoTitle ?? props.title ?? false}"
      metadata-viewer-user-id="${props.metadataViewerUserId ?? false}"
      beacon-collection-domain="${props.beaconCollectionDomain ?? false}"
      player-software-name="${props.playerSoftwareName ?? false}"
      player-software-version="${props.playerSoftwareVersion ?? false}"
      env-key="${props.envKey ?? false}"
      stream-type="${props.streamType ?? false}"
      custom-domain="${props.customDomain ?? false}"
      src="${
        !!props.src
          ? props.src
          : props.playbackId
          ? getSrcFromPlaybackId(props.playbackId, { domain: props.customDomain, token: props.tokens.playback })
          : false
      }"
      cast-src="${
        !!props.src
          ? props.src
          : props.playbackId
          ? getSrcFromPlaybackId(props.playbackId, { domain: props.customDomain, token: props.tokens.playback })
          : false
      }"
      cast-stream-type="${isLive(props) ? 'live' : false}"
      exportparts="video"
    >
      ${
        props.storyboard ? html`<track label="thumbnails" default kind="metadata" src="${props.storyboard}" />` : html``
      }
    </mux-video>
    ${
      isLiveOrDVR(props)
        ? html`<button
            slot="seek-live"
            part="${isLive(props) ? 'top' : 'bottom'} seek-live button"
            disabled="${props.inLiveWindow || !props.hasSrc || props.isDialogOpen}"
            aria-disabled="${(props.inLiveWindow || !props.hasSrc || props.isDialogOpen) && 'true'}"
            in-live-window="${props.inLiveWindow}"
            onclick="${function (this: HTMLButtonElement, evt: Event) {
              props.onSeekToLive?.(evt);
              if (props.paused) {
                const playRequestEvt = new CustomEvent('mediaplayrequest', { composed: true, bubbles: true });
                (this as HTMLButtonElement).dispatchEvent(playRequestEvt);
              }
            }}"
          >
            <svg viewBox="0 0 8 8"><circle cx="4" cy="4" r="4"></circle></svg>
            Live
          </button>`
        : html``
    }
    <mxp-dialog
      no-auto-hide
      open="${props.isDialogOpen ?? false}"
      onclose="${props.onCloseErrorDialog}"
      oninitfocus="${props.onInitFocusDialog}"
    >
      ${props.dialog?.title ? html`<h3>${props.dialog.title}</h3>` : html``}
      <p>
        ${props.dialog?.message}
        ${
          props.dialog?.linkUrl
            ? html`<a
                href="${props.dialog.linkUrl}"
                target="_blank"
                rel="external noopener"
                aria-label="${props.dialog.linkText ?? ''} ${i18n(`(opens in a new window)`)}"
                >${props.dialog.linkText ?? props.dialog.linkUrl}</a
              >`
            : html``
        }
      </p>
    </mxp-dialog>
  </${unsafeStatic(castThemeName(props.theme) ?? 'media-theme-mux')}>
`;
