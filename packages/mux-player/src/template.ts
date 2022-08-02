import { parts } from './media-theme-mux/media-theme-mux';
import './dialog';
import {
  castThemeName,
  getSrcFromPlaybackId,
  getPosterURLFromPlaybackId,
  getStoryboardURLFromPlaybackId,
} from './helpers';
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

const flatCSSParts = Object.values(parts).flatMap((group) => group.split(' '));
const forwardUniqueCSSParts = [...new Set(flatCSSParts)].join(', ');

export const content = (props: MuxTemplateProps) => html`
  <${unsafeStatic(castThemeName(props.theme) ?? 'media-theme-mux')}
    nohotkeys="${props.noHotKeys ?? false}"
    audio="${props.audio || false}"
    style="${
      stylePropsToString({
        '--primary-color': props.primaryColor,
        '--secondary-color': props.secondaryColor,
      }) ?? false
    }"
    class="size-${props.playerSize}${props.secondaryColor ? ' two-tone' : ''}"
    stream-type="${props.streamType}"
    player-size="${props.playerSize}"
    default-hidden-captions="${props.defaultHiddenCaptions}"
    forward-seek-offset="${props.forwardSeekOffset}"
    backward-seek-offset="${props.backwardSeekOffset}"
    exportparts="seek-live, ${forwardUniqueCSSParts}"
  >
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
      metadata-video-id="${props.metadataVideoId ?? false}"
      metadata-video-title="${props.metadataVideoTitle ?? false}"
      metadata-viewer-user-id="${props.metadataViewerUserId ?? false}"
      beacon-collection-domain="${props.beaconCollectionDomain ?? false}"
      player-software-name="${props.playerSoftwareName}"
      player-software-version="${props.playerSoftwareVersion}"
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
      poster="${
        !!props.poster
          ? props.poster
          : props.playbackId && !props.audio
          ? getPosterURLFromPlaybackId(props.playbackId, {
              domain: props.customDomain,
              thumbnailTime: props.thumbnailTime ?? props.startTime,
              token: props.tokens.thumbnail,
            })
          : false
      }"
      cast-src="${
        !!props.src
          ? props.src
          : props.playbackId
          ? getSrcFromPlaybackId(props.playbackId, { domain: props.customDomain, token: props.tokens.playback })
          : false
      }"
      cast-stream-type="${[StreamTypes.LIVE, StreamTypes.LL_LIVE].includes(props.streamType as any) ? 'live' : false}"
    >
      ${
        props.playbackId &&
        !props.audio &&
        ![StreamTypes.LIVE, StreamTypes.LL_LIVE, StreamTypes.DVR, StreamTypes.LL_DVR].includes(props.streamType as any)
          ? html`<track
              label="thumbnails"
              default
              kind="metadata"
              src="${getStoryboardURLFromPlaybackId(props.playbackId, {
                domain: props.customDomain,
                token: props.tokens.storyboard,
              })}"
            />`
          : html``
      }
    </mux-video>
    <button
      slot="seek-to-live-button"
      part="seek-live button"
      class="mxp-seek-to-live-button"
      aria-disabled="${props.inLiveWindow}"
      onclick="${function (this: HTMLButtonElement, evt: Event) {
        props.onSeekToLive?.(evt);
        if (props.paused) {
          const playRequestEvt = new CustomEvent('mediaplayrequest', { composed: true, bubbles: true });
          (this as HTMLButtonElement).dispatchEvent(playRequestEvt);
        }
      }}"
    >
      Live
    </button>
    <mxp-dialog
      no-auto-hide
      open="${props.isDialogOpen}"
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
