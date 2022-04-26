import './media-theme-mux/media-theme-mux';
import './dialog';
import {
  getChromeStylesFromProps,
  getSrcFromPlaybackId,
  getPosterURLFromPlaybackId,
  getStoryboardURLFromPlaybackId,
} from './helpers';
import { html } from './html';
// @ts-ignore
import cssStr from './styles.css';
import { i18n } from './utils';

import type { MuxTemplateProps } from './types';
import { StreamTypes } from './constants';

export const template = (props: MuxTemplateProps) => html`
  <style>
    ${cssStr}
  </style>
  ${content(props)}
`;

export const content = (props: MuxTemplateProps) => html`
  <media-theme-mux
    style="${getChromeStylesFromProps(props) ?? false}"
    class="size-${props.playerSize}"
    stream-type="${props.streamType}"
    player-size="${props.playerSize}"
    has-captions="${props.hasCaptions}"
    default-hidden-captions="${props.defaultHiddenCaptions}"
    forward-seek-offset="${props.forwardSeekOffset}"
    backward-seek-offset="${props.backwardSeekOffset}"
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
    <button
      slot="seek-to-live-button"
      aria-disabled="${props.inLiveWindow}"
      onclick="${function (this: HTMLButtonElement, evt: Event) {
        props.onSeekToLive?.(evt);
        if (props.paused) {
          const playRequestEvt = new CustomEvent('mediaplayrequest', { composed: true, bubbles: true });
          (this as HTMLButtonElement).dispatchEvent(playRequestEvt);
        }
      }}"
      class="mxp-seek-to-live-button"
    >
      Live
    </button>
    <mxp-dialog no-auto-hide open="${props.isDialogOpen}" onclose="${props.onCloseErrorDialog}">
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
  </media-theme-mux>
`;
