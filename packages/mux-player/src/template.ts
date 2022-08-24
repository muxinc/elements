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

const controlsListStyles: Record<string, string> = {
  notop: `::part(top), [part~="top"] { display: none; }`,
  nobottom: `::part(bottom), [part~="bottom"] { display: none; }`,
  nocenter: `::part(center), [part~="center"] { display: none; }`,

  nocenterplay: `::part(center play button) { display: none; }`,
  nocenterseekbackward: `::part(center seek-backward button) { display: none; }`,
  nocenterseekforward: `::part(center seek-forward button) { display: none; }`,

  noplay: `::part(bottom play button) { display: none; }`,
  noseekbackward: `::part(bottom seek-backward button) { display: none; }`,
  noseekforward: `::part(bottom seek-forward button) { display: none; }`,

  nomute: `::part(mute button) { display: none; }`,
  nocaptions: `::part(captions button) { display: none; }`,
  noairplay: `::part(airplay button) { display: none; }`,
  nopip: `::part(pip button) { display: none; }`,
  nocast: `::part(cast button) { display: none; }`,
  nofullscreen: `::part(fullscreen button) { display: none; }`,
  noplaybackrate: `::part(playbackrate button) { display: none; }`,
  novolumerange: `::part(volume range) { display: none; }`,
  notimerange: `::part(time range) { display: none; }`,
  notimedisplay: `::part(time display) { display: none; }`,
  noremoteplayback: `::part(airplay button), ::part(cast button) { display: none; }`,
  // The duration display isn't a "part", since it is controlled by an attribute in media-time-display
  // Still adding here so it shows up as a valid/available controlsList value.
  noduration: '',

  // the seek live button is in the light dom below, use attribute selector.
  noseeklive: `[part*="seek-live button"] { display: none; }`,
};

export const ControlListTokens = Object.keys(controlsListStyles);

export const template = (props: MuxTemplateProps) => html`
  <style>
    ${cssStr}
    ${[...props.controlsList]
      .map((token) => controlsListStyles[token])
      .filter(Boolean)
      .join('\n')}
  </style>
  ${content(props)}
`;

const flatCSSParts = Object.values(parts).flatMap((group) => group.split(' '));
const forwardUniqueCSSParts = [...new Set(flatCSSParts)].join(', ');

const isLive = (props: MuxTemplateProps) => [StreamTypes.LIVE, StreamTypes.LL_LIVE].includes(props.streamType as any);

const isLiveOrDVR = (props: MuxTemplateProps) =>
  [StreamTypes.LIVE, StreamTypes.LL_LIVE, StreamTypes.DVR, StreamTypes.LL_DVR].includes(props.streamType as any);

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
    playbackrates="${props.playbackRates ?? false}"
    hide-duration="${[...props.controlsList.values()].some(
      (key) => key.search(/no(top|bottom|center)?duration/) === 0
    )}"
    default-show-remaining-time="${props.defaultShowRemainingTime ?? false}"
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
      cast-stream-type="${isLive(props) ? 'live' : false}"
    >
      ${
        props.playbackId && !props.audio && !isLiveOrDVR(props)
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
    ${
      isLiveOrDVR(props)
        ? html`<button
            slot="seek-live"
            part="${isLive(props) ? 'top' : 'bottom'} seek-live button"
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
          </button>`
        : html``
    }
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
