import 'media-chrome/dist/media-theme-element.js';
// @ts-ignore
import cssStr from './styles.css';
import { getStreamTypeFromAttr } from './helpers';
import { html } from './html';
import { stylePropsToString } from './utils';
import type { MuxTemplateProps } from './types';
import { StreamTypes, toMuxVideoURL } from '@mux/playback-core';

const getPropsCSS = (props: MuxTemplateProps) => {
  const { tokens } = props;
  if (!tokens.drm) return '';
  // See styles.css for usage.
  return ':host { --_cast-button-drm-display: none; }';
};

export const template = (props: MuxTemplateProps) => html`
  <style>
    ${getPropsCSS(props)}
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

// NOTE: Make sure to add/update internal parts here so they're available for Mux Player users for advanced CSS customization!
export const Parts = {
  // media container regions
  TOP: 'top',
  CENTER: 'center',
  BOTTOM: 'bottom',
  // media container layers
  LAYER: 'layer', // Generic
  MEDIA_LAYER: 'media-layer',
  POSTER_LAYER: 'poster-layer',
  VERTICAL_LAYER: 'vertical-layer',
  CENTERED_LAYER: 'centered-layer',
  GESTURE_LAYER: 'gesture-layer',
  CONTROLLER_LAYER: 'controller',
  // component/subcomponent types
  BUTTON: 'button',
  RANGE: 'range',
  DISPLAY: 'display',
  CONTROL_BAR: 'control-bar',
  MENU_BUTTON: 'menu-button',
  LISTBOX: 'listbox',
  OPTION: 'option',
  // component/subcomponent purposes
  POSTER: 'poster',
  LIVE: 'live',
  PLAY: 'play',
  PRE_PLAY: 'pre-play',
  SEEK_BACKWARD: 'seek-backward',
  SEEK_FORWARD: 'seek-forward',
  MUTE: 'mute',
  CAPTIONS: 'captions',
  AIRPLAY: 'airplay',
  PIP: 'pip',
  FULLSCREEN: 'fullscreen',
  CAST: 'cast',
  PLAYBACK_RATE: 'playback-rate',
  VOLUME: 'volume',
  TIME: 'time',
  TITLE: 'title',
  AUDIO_TRACK: 'audio-track',
  RENDITION: 'rendition',
};

export const partsListStr = Object.values(Parts).join(', ');

export const content = (props: MuxTemplateProps) => html`
  <media-theme
    template="${props.themeTemplate || false}"
    defaultstreamtype="${props.defaultStreamType ?? false}"
    hotkeys="${getHotKeys(props) || false}"
    nohotkeys="${props.noHotKeys || !props.hasSrc || false}"
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
    defaultduration="${props.defaultDuration ?? false}"
    hideduration="${props.hideDuration ?? false}"
    title="${props.title ?? false}"
    exportparts="${partsListStr}"
    onclose="${props.onCloseErrorDialog}"
    onfocusin="${props.onFocusInErrorDialog}"
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
      disable-tracking="${props.disableTracking ?? false}"
      disable-cookies="${props.disableCookies ?? false}"
      prefer-playback="${props.preferPlayback ?? false}"
      start-time="${props.startTime != null ? props.startTime : false}"
      beacon-collection-domain="${props.beaconCollectionDomain ?? false}"
      player-init-time="${props.playerInitTime ?? false}"
      player-software-name="${props.playerSoftwareName ?? false}"
      player-software-version="${props.playerSoftwareVersion ?? false}"
      env-key="${props.envKey ?? false}"
      custom-domain="${props.customDomain ?? false}"
      src="${!!props.src ? props.src : props.playbackId ? toMuxVideoURL(props) : false}"
      cast-src="${!!props.src ? props.src : props.playbackId ? toMuxVideoURL(props) : false}"
      cast-receiver="${props.castReceiver ?? false}"
      drm-token="${props.tokens?.drm ?? false}"
      exportparts="video"
    >
      ${props.storyboard
        ? html`<track label="thumbnails" default kind="metadata" src="${props.storyboard}" />`
        : html``}
      <slot></slot>
    </mux-video>
    <slot name="poster" slot="poster">
      <media-poster-image
        part="poster"
        exportparts="poster, img"
        src="${!!props.poster ? props.poster : false}"
        placeholdersrc="${props.placeholder ?? false}"
      ></media-poster-image>
    </slot>
  </media-theme>
`;
