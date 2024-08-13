import { globalThis, document } from './polyfills';
import { MediaController } from 'media-chrome';
import { Attributes as MediaControllerAttributes } from 'media-chrome/dist/media-container.js';
import { MediaUIAttributes } from 'media-chrome/dist/constants.js';
import 'media-chrome/dist/experimental/index.js';
import { MediaThemeElement } from 'media-chrome/dist/media-theme-element.js';
import MuxVideoElement, { MediaError, Attributes as MuxVideoAttributes } from '@mux/mux-video';
import {
  StreamTypes,
  PlaybackTypes,
  addTextTrack,
  removeTextTrack,
  CmcdTypes,
  CmcdTypeValues,
} from '@mux/playback-core';
import type {
  ValueOf,
  Metadata,
  PlaybackEngine,
  MaxResolutionValue,
  MinResolutionValue,
  RenditionOrderValue,
} from '@mux/playback-core';
import VideoApiElement from './video-api';
import {
  getPlayerVersion,
  toPropName,
  AttributeTokenList,
  getPosterURLFromPlaybackId,
  getStoryboardURLFromPlaybackId,
  getStreamTypeFromAttr,
} from './helpers';
import { template } from './template';
import { render } from './html';
import { getErrorLogs } from './errors';
import { toNumberOrUndefined, i18n, parseJwt, containsComposedNode, camelCase, kebabCase } from './utils';
import * as logger from './logger';
import type { MuxTemplateProps, ErrorEvent } from './types';
import './themes/gerwig';
import { HlsConfig } from 'hls.js';
const DefaultThemeName = 'gerwig';

export { MediaError };
export type Tokens = {
  playback?: string;
  drm?: string;
  thumbnail?: string;
  storyboard?: string;
};

const VideoAttributes = {
  SRC: 'src',
  POSTER: 'poster',
};

const PlayerAttributes = {
  STYLE: 'style',
  DEFAULT_HIDDEN_CAPTIONS: 'default-hidden-captions',
  PRIMARY_COLOR: 'primary-color',
  SECONDARY_COLOR: 'secondary-color',
  ACCENT_COLOR: 'accent-color',
  FORWARD_SEEK_OFFSET: 'forward-seek-offset',
  BACKWARD_SEEK_OFFSET: 'backward-seek-offset',
  PLAYBACK_TOKEN: 'playback-token',
  THUMBNAIL_TOKEN: 'thumbnail-token',
  STORYBOARD_TOKEN: 'storyboard-token',
  DRM_TOKEN: 'drm-token',
  STORYBOARD_SRC: 'storyboard-src',
  THUMBNAIL_TIME: 'thumbnail-time',
  AUDIO: 'audio',
  NOHOTKEYS: 'nohotkeys',
  HOTKEYS: 'hotkeys',
  PLAYBACK_RATES: 'playbackrates',
  DEFAULT_SHOW_REMAINING_TIME: 'default-show-remaining-time',
  DEFAULT_DURATION: 'default-duration',
  TITLE: 'title',
  PLACEHOLDER: 'placeholder',
  THEME: 'theme',
  DEFAULT_STREAM_TYPE: 'default-stream-type',
  TARGET_LIVE_WINDOW: 'target-live-window',
  EXTRA_SOURCE_PARAMS: 'extra-source-params',
  NO_VOLUME_PREF: 'no-volume-pref',
  CAST_RECEIVER: 'cast-receiver',
};

const ThemeAttributeNames = [
  'audio',
  'backwardseekoffset',
  'defaultduration',
  'defaultshowremainingtime',
  'defaultsubtitles',
  'noautoseektolive',
  'disabled',
  'exportparts',
  'forwardseekoffset',
  'hideduration',
  'hotkeys',
  'nohotkeys',
  'playbackrates',
  'defaultstreamtype',
  'streamtype',
  'style',
  'targetlivewindow',
  'template',
  'title',
  'novolumepref',
];

function getProps(el: MuxPlayerElement, state?: any): MuxTemplateProps {
  const props = {
    // Give priority to playbackId derrived asset URL's if playbackId is set.
    src: !el.playbackId && el.src,
    playbackId: el.playbackId,
    hasSrc: !!el.playbackId || !!el.src || !!el.currentSrc,
    poster: el.poster,
    storyboard: el.storyboard,
    storyboardSrc: el.getAttribute(PlayerAttributes.STORYBOARD_SRC),
    placeholder: el.getAttribute('placeholder'),
    themeTemplate: getThemeTemplate(el),
    thumbnailTime: !el.tokens.thumbnail && el.thumbnailTime,
    autoplay: el.autoplay,
    crossOrigin: el.crossOrigin,
    loop: el.loop,
    // NOTE: Renaming internal prop due to state (sometimes derived from attributeChangedCallback attr values)
    // overwriting prop value (type mismatch: string vs. boolean) (CJP)
    noHotKeys: el.hasAttribute(PlayerAttributes.NOHOTKEYS),
    hotKeys: el.getAttribute(PlayerAttributes.HOTKEYS),
    muted: el.muted,
    paused: el.paused,
    // NOTE: Currently unsupported due to "default true attribute" problem
    // playsInline: el.playsInline,
    preload: el.preload,
    envKey: el.envKey,
    preferCmcd: el.preferCmcd,
    debug: el.debug,
    disableTracking: el.disableTracking,
    disableCookies: el.disableCookies,
    tokens: el.tokens,
    beaconCollectionDomain: el.beaconCollectionDomain,
    maxResolution: el.maxResolution,
    minResolution: el.minResolution,
    programStartTime: el.programStartTime,
    programEndTime: el.programEndTime,
    renditionOrder: el.renditionOrder,
    metadata: el.metadata,
    playerSoftwareName: el.playerSoftwareName,
    playerSoftwareVersion: el.playerSoftwareVersion,
    startTime: el.startTime,
    preferPlayback: el.preferPlayback,
    audio: el.audio,
    defaultStreamType: el.defaultStreamType,
    targetLiveWindow: el.getAttribute(MuxVideoAttributes.TARGET_LIVE_WINDOW),
    streamType: getStreamTypeFromAttr(el.getAttribute(MuxVideoAttributes.STREAM_TYPE)),
    primaryColor: el.getAttribute(PlayerAttributes.PRIMARY_COLOR),
    secondaryColor: el.getAttribute(PlayerAttributes.SECONDARY_COLOR),
    accentColor: el.getAttribute(PlayerAttributes.ACCENT_COLOR),
    forwardSeekOffset: el.forwardSeekOffset,
    backwardSeekOffset: el.backwardSeekOffset,
    defaultHiddenCaptions: el.defaultHiddenCaptions,
    defaultDuration: el.defaultDuration,
    defaultShowRemainingTime: el.defaultShowRemainingTime,
    hideDuration: getHideDuration(el),
    playbackRates: el.getAttribute(PlayerAttributes.PLAYBACK_RATES),
    customDomain: el.getAttribute(MuxVideoAttributes.CUSTOM_DOMAIN) ?? undefined,
    title: el.getAttribute(PlayerAttributes.TITLE),
    novolumepref: el.hasAttribute(PlayerAttributes.NO_VOLUME_PREF),
    castReceiver: el.castReceiver,
    ...state,
    // NOTE: since the attribute value is used as the "source of truth" for the property getter,
    // moving this below the `...state` spread so it resolves to the default value when unset (CJP)
    extraSourceParams: el.extraSourceParams,
  };

  return props;
}

function getThemeTemplate(el: MuxPlayerElement) {
  let themeName = el.theme;

  if (themeName) {
    const templateElement = (el.getRootNode() as ShadowRoot | Document | null)?.getElementById?.(themeName);
    // NOTE: Since folks may unknowingly use matching ids for elements other than their theme
    // (intending to use path two for template identification, below), make sure the matching
    // element is, in fact, an HTMLTemplateElement (CJP)
    if (templateElement && templateElement instanceof HTMLTemplateElement) return templateElement;

    if (!themeName.startsWith('media-theme-')) {
      themeName = `media-theme-${themeName}`;
    }

    const ThemeElement = globalThis.customElements.get(themeName) as MediaThemeElement | undefined;
    if (ThemeElement?.template) return ThemeElement.template;
  }
}

function getHideDuration(el: MuxPlayerElement) {
  const timeDisplay = el.mediaController?.querySelector('media-time-display');
  return (
    timeDisplay &&
    getComputedStyle(timeDisplay as unknown as HTMLElement)
      .getPropertyValue('--media-duration-display-display')
      .trim() === 'none'
  );
}

function getMetadataFromAttrs(el: MuxPlayerElement) {
  // Adding title defaulting, when present, as a seed value here to ensure it's
  // overridden by metadata-video-title if it is also present. (CJP)
  const seedValue: { [key: string]: string } = el.hasAttribute(PlayerAttributes.TITLE)
    ? { video_title: el.getAttribute(PlayerAttributes.TITLE) as string }
    : {};
  return el
    .getAttributeNames()
    .filter((attrName) => attrName.startsWith('metadata-'))
    .reduce((currAttrs, attrName) => {
      const value = el.getAttribute(attrName);
      if (value !== null) {
        currAttrs[attrName.replace(/^metadata-/, '').replace(/-/g, '_')] = value;
      }
      return currAttrs;
    }, seedValue);
}

const MuxVideoAttributeNames = Object.values(MuxVideoAttributes);
const VideoAttributeNames = Object.values(VideoAttributes);
const PlayerAttributeNames = Object.values(PlayerAttributes);
const playerSoftwareVersion = getPlayerVersion();
const playerSoftwareName = 'mux-player';

const initialState = {
  dialog: undefined,
  isDialogOpen: false,
};

const DEFAULT_EXTRA_PLAYLIST_PARAMS = { redundant_streams: true };

export interface MuxPlayerElementEventMap extends HTMLVideoElementEventMap {
  cuepointchange: CustomEvent<{ time: number; value: any }>;
  cuepointschange: CustomEvent<Array<{ time: number; value: any }>>;
  chapterchange: CustomEvent<{ startTime: number; endTime: number; value: string }>;
}

interface MuxPlayerElement
  extends Omit<
    HTMLVideoElement,
    | 'poster'
    | 'textTracks'
    | 'addTextTrack'
    | 'src'
    | 'videoTracks'
    | 'audioTracks'
    | 'audioRenditions'
    | 'videoRenditions'
  > {
  addEventListener<K extends keyof MuxPlayerElementEventMap>(
    type: K,
    listener: (this: HTMLMediaElement, ev: MuxPlayerElementEventMap[K]) => any,
    options?: boolean | AddEventListenerOptions
  ): void;
  addEventListener(
    type: string,
    listener: EventListenerOrEventListenerObject,
    options?: boolean | AddEventListenerOptions
  ): void;
  removeEventListener<K extends keyof MuxPlayerElementEventMap>(
    type: K,
    listener: (this: HTMLMediaElement, ev: MuxPlayerElementEventMap[K]) => any,
    options?: boolean | EventListenerOptions
  ): void;
  removeEventListener(
    type: string,
    listener: EventListenerOrEventListenerObject,
    options?: boolean | EventListenerOptions
  ): void;
}

class MuxPlayerElement extends VideoApiElement implements MuxPlayerElement {
  #isInit = false;
  #tokens = {};
  #userInactive = true;
  #hotkeys = new AttributeTokenList(this, 'hotkeys');
  #state: Partial<MuxTemplateProps> = {
    ...initialState,
    onCloseErrorDialog: () => this.#setState({ dialog: undefined, isDialogOpen: false }),
    onInitFocusDialog: (e) => {
      const isFocusedElementInPlayer = containsComposedNode(this, document.activeElement);
      if (!isFocusedElementInPlayer) e.preventDefault();
    },
  };

  static get observedAttributes() {
    return [
      ...(VideoApiElement.observedAttributes ?? []),
      ...VideoAttributeNames,
      ...MuxVideoAttributeNames,
      ...PlayerAttributeNames,
    ];
  }

  constructor() {
    super();

    this.attachShadow({ mode: 'open' });
    this.#setupCSSProperties();

    // If the custom element is defined before the <mux-player> HTML is parsed
    // no attributes will be available in the constructor (construction process).
    // Wait until initializing attributes in the attributeChangedCallback.
    // If this element is connected to the DOM, the attributes will be available.
    if (this.isConnected) {
      this.#init();
    }
  }

  #init() {
    if (this.#isInit) return;
    this.#isInit = true;

    // The next line triggers the first render of the template.
    this.#render();

    // Fixes a bug in React where mux-player's CE children were not upgraded yet.
    // These lines ensure the rendered mux-video and media-controller are upgraded,
    // even before they are connected to the main document.
    try {
      customElements.upgrade(this.mediaTheme as Node);
      if (!(this.mediaTheme instanceof globalThis.HTMLElement)) throw '';
    } catch (error) {
      logger.error(`<media-theme> failed to upgrade!`);
    }

    try {
      customElements.upgrade(this.media as Node);
      if (!(this.media instanceof MuxVideoElement)) throw '';
    } catch (error) {
      logger.error('<mux-video> failed to upgrade!');
    }

    try {
      customElements.upgrade(this.mediaController as Node);
      if (!(this.mediaController instanceof MediaController)) throw '';
    } catch (error) {
      logger.error(`<media-controller> failed to upgrade!`);
    }

    this.init();

    this.#setUpThemeAttributes();
    this.#setUpErrors();
    this.#setUpCaptionsButton();
    this.#userInactive = this.mediaController?.hasAttribute(MediaControllerAttributes.USER_INACTIVE) ?? true;
    this.#setUpCaptionsMovement();

    // NOTE: Make sure we re-render when stream type changes to ensure other props-driven
    // template details get updated appropriately (e.g. thumbnails track) (CJP)
    this.media?.addEventListener('streamtypechange', () => this.#render());

    // NOTE: Make sure we re-render when <source> tags are appended so hasSrc is updated.
    this.media?.addEventListener('loadstart', () => this.#render());
  }

  #setupCSSProperties() {
    // registerProperty will throw if the prop has already been registered
    // and there's currently no way to check ahead of time.
    // initialValue's are defined in the theme
    try {
      // @ts-ignore
      window?.CSS?.registerProperty({
        name: '--media-primary-color',
        syntax: '<color>',
        inherits: true,
      });
      // @ts-ignore
      window?.CSS?.registerProperty({
        name: '--media-secondary-color',
        syntax: '<color>',
        inherits: true,
      });
    } catch (e) {}
  }

  get mediaTheme(): Element | null | undefined {
    return this.shadowRoot?.querySelector('media-theme');
  }

  get mediaController(): MediaController | null | undefined {
    return this.mediaTheme?.shadowRoot?.querySelector('media-controller');
  }

  connectedCallback() {
    const muxVideo = this.shadowRoot?.querySelector('mux-video') as MuxVideoElement;
    if (muxVideo) {
      muxVideo.metadata = getMetadataFromAttrs(this);
    }
  }

  #setState(newState: Record<string, any>) {
    Object.assign(this.#state, newState);
    this.#render();
  }

  #render(props: Record<string, any> = {}) {
    render(template(getProps(this, { ...this.#state, ...props })), this.shadowRoot as Node);
  }

  #setUpThemeAttributes() {
    // Forward `theme-` prefixed attributes to the theme.
    // e.g. `theme-control-bar-vertical` for the Micro theme.
    const setThemeAttribute = (attributeName: string | null) => {
      if (!attributeName?.startsWith('theme-')) return;

      const themeAttrName = attributeName.replace(/^theme-/, '');
      if (ThemeAttributeNames.includes(themeAttrName)) return;

      const value = this.getAttribute(attributeName);
      if (value != null) {
        this.mediaTheme?.setAttribute(themeAttrName, value);
      } else {
        this.mediaTheme?.removeAttribute(themeAttrName);
      }
    };

    const observer = new MutationObserver((mutationList) => {
      for (const { attributeName } of mutationList) {
        setThemeAttribute(attributeName);
      }
    });

    observer.observe(this, { attributes: true });
    this.getAttributeNames().forEach(setThemeAttribute);
  }

  #setUpErrors() {
    const onError = (event: Event) => {
      let { detail: error }: { detail: any } = event as CustomEvent;

      if (!(error instanceof MediaError)) {
        error = new MediaError(error.message, error.code, error.fatal);
      }

      // Don't show an error dialog if it's not fatal.
      if (!error?.fatal) {
        logger.warn(error);
        if (error.data) {
          logger.warn(`${error.name} data:`, error.data);
        }
        return;
      }

      const { dialog, devlog } = getErrorLogs(error, !window.navigator.onLine, this.playbackId, this.playbackToken);

      if (devlog.message) {
        logger.devlog(devlog);
      }

      logger.error(error);
      if (error.data) {
        logger.error(`${error.name} data:`, error.data);
      }

      this.#setState({ isDialogOpen: true, dialog });
    };

    // Keep this event listener on mux-player instead of calling onError directly
    // from video.onerror. This allows us to simulate errors from the outside.
    this.addEventListener('error', onError);

    if (this.media) {
      this.media.errorTranslator = (errorEvent: ErrorEvent = {}) => {
        if (!(this.media?.error instanceof MediaError)) return errorEvent;

        const { devlog } = getErrorLogs(
          this.media?.error,
          !window.navigator.onLine,
          this.playbackId,
          this.playbackToken,
          false
        );

        return {
          player_error_code: this.media?.error.code,
          player_error_message: devlog.message ? String(devlog.message) : errorEvent.player_error_message,
          player_error_context: devlog.context ? String(devlog.context) : errorEvent.player_error_context,
        };
      };
    }

    this.media?.addEventListener('error', (event: Event) => {
      let { detail: error }: { detail: any } = event as CustomEvent;

      // If it is a hls.js error event there will be an error object in the event.
      // If it is a native video error event there will be no error object.
      if (!error) {
        const { message, code } = this.media?.error ?? {};
        error = new MediaError(message, code);
      }

      // Don't fire a mux-player error event for non-fatal errors.
      if (!error?.fatal) return;

      this.dispatchEvent(
        new CustomEvent('error', {
          detail: error,
        })
      );
    });
  }

  #setUpCaptionsButton() {
    const onTrackCountChange = () => this.#render();
    this.media?.textTracks?.addEventListener('addtrack', onTrackCountChange);
    this.media?.textTracks?.addEventListener('removetrack', onTrackCountChange);
  }

  #setUpCaptionsMovement() {
    const isFirefox = /Firefox/i.test(navigator.userAgent);
    if (!isFirefox) return;

    let selectedTrack: TextTrack;
    const cuesmap = new WeakMap();

    const shouldSkipLineToggle = () => {
      // skip line toggle when:
      // - streamType is live, unless secondary color is set or player size is too small
      // - native fullscreen on iPhones
      return this.streamType === StreamTypes.LIVE && !this.secondaryColor && this.offsetWidth >= 800;
    };

    // toggles activeCues for a particular track depending on whether the user is active or not
    const toggleLines = (track: TextTrack, userInactive: boolean, force = false) => {
      if (shouldSkipLineToggle()) {
        return;
      }

      const cues = Array.from((track && track.activeCues) || []) as VTTCue[];

      cues.forEach((cue) => {
        // ignore cues that are
        // - positioned vertically via percentage.
        // - cues that are not at the bottom
        //   - line is less than -5
        //   - line is between 0 and 10
        // @ts-ignore
        if (!cue.snapToLines || cue.line < -5 || (cue.line >= 0 && cue.line < 10)) {
          return;
        }

        // if the user is active or if the player is paused, the captions should be moved up
        if (!userInactive || this.paused) {
          // for cues that have more than one line, we want to push the cue further up
          const lines = cue.text.split('\n').length;
          // start at -3 to account for thumbnails as well.
          let offset = -3;

          if (this.streamType === StreamTypes.LIVE) {
            offset = -2;
          }

          const setTo = offset - lines;

          // if the line is already set to -4, we don't want to update it again
          // this can happen in the same tick on chrome and safari which fire a cuechange
          // event when the line property is changed to a different value.
          if (cue.line === setTo && !force) {
            return;
          }

          if (!cuesmap.has(cue)) {
            cuesmap.set(cue, cue.line);
          }

          cue.line = setTo;
        } else {
          setTimeout(() => {
            cue.line = cuesmap.get(cue) || 'auto';
          }, 500);
        }
      });
    };

    // this is necessary so that if a cue becomes active while the user is active, we still position it above the control bar
    const cuechangeHandler = () => {
      toggleLines(selectedTrack, this.mediaController?.hasAttribute(MediaControllerAttributes.USER_INACTIVE) ?? false);
    };

    const selectTrack = () => {
      const tracks = Array.from(this.mediaController?.media?.textTracks || []) as TextTrack[];
      const newSelectedTrack = tracks.filter(
        (t) => ['subtitles', 'captions'].includes(t.kind) && t.mode === 'showing'
      )[0] as TextTrack;

      if (newSelectedTrack !== selectedTrack) {
        selectedTrack?.removeEventListener('cuechange', cuechangeHandler);
      }

      selectedTrack = newSelectedTrack;
      selectedTrack?.addEventListener('cuechange', cuechangeHandler);
      // it's possible there are currently active cues on the new track
      toggleLines(selectedTrack, this.#userInactive);
    };

    selectTrack();
    // update the selected track as necessary
    this.textTracks?.addEventListener('change', selectTrack);
    this.textTracks?.addEventListener('addtrack', selectTrack);

    this.addEventListener('userinactivechange', () => {
      const newUserInactive = this.mediaController?.hasAttribute(MediaControllerAttributes.USER_INACTIVE) ?? true;

      if (this.#userInactive === newUserInactive) {
        return;
      }

      this.#userInactive = newUserInactive;

      toggleLines(selectedTrack, this.#userInactive);
    });
  }

  attributeChangedCallback(attrName: string, oldValue: string | null, newValue: string) {
    // Initialize right after construction when the attributes become available.
    this.#init();

    super.attributeChangedCallback(attrName, oldValue, newValue);

    switch (attrName) {
      case PlayerAttributes.HOTKEYS:
        this.#hotkeys.value = newValue;
        break;
      case PlayerAttributes.THUMBNAIL_TIME: {
        if (newValue != null && this.tokens.thumbnail) {
          logger.warn(
            i18n(`Use of thumbnail-time with thumbnail-token is currently unsupported. Ignore thumbnail-time.`).format(
              {}
            )
          );
        }
        break;
      }
      case PlayerAttributes.THUMBNAIL_TOKEN: {
        if (newValue) {
          const { aud } = parseJwt(newValue);
          if (aud !== 't') {
            logger.warn(
              i18n(`The provided thumbnail-token should have audience value 'd' instead of '{aud}'.`).format({ aud })
            );
          }
        }
        break;
      }
      case PlayerAttributes.STORYBOARD_TOKEN: {
        if (newValue) {
          const { aud } = parseJwt(newValue);
          if (aud !== 's') {
            logger.warn(
              i18n(`The provided storyboard-token should have audience value 'd' instead of '{aud}'.`).format({ aud })
            );
          }
        }
        break;
      }
      case PlayerAttributes.DRM_TOKEN: {
        if (newValue) {
          const { aud } = parseJwt(newValue);
          if (aud !== 'd') {
            logger.warn(
              i18n(`The provided drm-token should have audience value 'd' instead of '{aud}'.`).format({ aud })
            );
          }
        }
        break;
      }
      case MuxVideoAttributes.PLAYBACK_ID: {
        if (newValue?.includes('?token')) {
          logger.error(
            i18n(
              'The specificed playback ID {playbackId} contains a token which must be provided via the playback-token attribute.'
            ).format({
              playbackId: newValue,
            })
          );
        }
        break;
      }
      case MuxVideoAttributes.STREAM_TYPE: {
        if (newValue && ![StreamTypes.LIVE, StreamTypes.ON_DEMAND, StreamTypes.UNKNOWN].includes(newValue as any)) {
          // Handle deprecated values by translating to new properties for the time being.
          // NOTE: The value of `streamType` / `stream-type` will be translated at the template
          // level. See template.ts for more information (CJP).
          if (['ll-live', 'live:dvr', 'll-live:dvr'].includes(this.streamType as any)) {
            // NOTE: For now, we won't log any warnings/errors for "deprecated" stream types (CJP).
            // logger.devlog({
            //   file: 'deprecated-stream-type.md',
            //   message: i18n(
            //     `The stream type is deprecated: \`{streamType}\`. Please provide stream-type as either: \`on-demand\`, \`live\`. For DVR, please use \`target-live-window="Infinity"\``
            //   ).format({ streamType: this.streamType }),
            // });
            this.targetLiveWindow = newValue.includes('dvr') ? Number.POSITIVE_INFINITY : 0;
          } else {
            logger.devlog({
              file: 'invalid-stream-type.md',
              message: i18n(
                `Invalid stream-type value supplied: \`{streamType}\`. Please provide stream-type as either: \`on-demand\` or \`live\``
              ).format({ streamType: this.streamType }),
            });
          }
        } else {
          // NOTE: For now, since we are continuing support of the deprecated stream types (namely, "dvr" types) and not advertising the
          // new APIs such as `targetLiveWindow`/`target-live-window`, we will (presumpuously) update the `targetLiveWindow` based on the
          // stream type (CJP).
          if (newValue === StreamTypes.LIVE) {
            // Don't override if the user has already set a value.
            if (this.getAttribute(PlayerAttributes.TARGET_LIVE_WINDOW) == null) {
              this.targetLiveWindow = 0;
            }
          } else {
            this.targetLiveWindow = Number.NaN;
          }
        }
      }
    }

    const shouldClearState = [
      MuxVideoAttributes.PLAYBACK_ID,
      VideoAttributes.SRC,
      PlayerAttributes.PLAYBACK_TOKEN,
    ].includes(attrName);

    if (shouldClearState && oldValue !== newValue) {
      this.#state = { ...this.#state, ...initialState };
    }

    this.#render({ [toPropName(attrName)]: newValue });
  }

  get preferCmcd() {
    return (this.getAttribute(MuxVideoAttributes.PREFER_CMCD) as ValueOf<CmcdTypes>) ?? undefined;
  }

  set preferCmcd(value: ValueOf<CmcdTypes> | undefined) {
    if (value === this.preferCmcd) return;
    if (!value) {
      this.removeAttribute(MuxVideoAttributes.PREFER_CMCD);
    } else if (CmcdTypeValues.includes(value)) {
      this.setAttribute(MuxVideoAttributes.PREFER_CMCD, value);
    } else {
      logger.warn(`Invalid value for preferCmcd. Must be one of ${CmcdTypeValues.join()}`);
    }
  }

  get hasPlayed() {
    return this.mediaController?.hasAttribute(MediaUIAttributes.MEDIA_HAS_PLAYED) ?? false;
  }

  get inLiveWindow() {
    return this.mediaController?.hasAttribute(MediaUIAttributes.MEDIA_TIME_IS_LIVE);
  }

  get _hls(): PlaybackEngine | undefined {
    return this.media?._hls;
  }

  get mux() {
    return this.media?.mux;
  }

  /**
   * Gets the theme.
   */
  get theme() {
    return this.getAttribute(PlayerAttributes.THEME) ?? DefaultThemeName;
  }

  /**
   * Sets the theme.
   */
  set theme(val) {
    this.setAttribute(PlayerAttributes.THEME, `${val}`);
  }

  /**
   * Get the theme attributes in a plain object (camelCase keys).
   * This doesn't include already defined attributes. e.g. streamType, disabled, etc.
   */
  get themeProps() {
    const theme = this.mediaTheme;
    if (!theme) return;

    const props: Record<string, any> = {};

    for (const name of theme.getAttributeNames()) {
      if (ThemeAttributeNames.includes(name)) continue;

      const value: string | boolean | null = theme.getAttribute(name);
      props[camelCase(name)] = value === '' ? true : value;
    }

    return props;
  }

  /**
   * Set the theme attributes via a plain object.
   */
  set themeProps(props) {
    this.#init();

    const themeProps = { ...this.themeProps, ...props };

    for (const name in themeProps) {
      if (ThemeAttributeNames.includes(name)) continue;

      const value: string | boolean | null | undefined = props?.[name];

      if (typeof value === 'boolean' || value == null) {
        this.mediaTheme?.toggleAttribute(kebabCase(name), Boolean(value));
      } else {
        this.mediaTheme?.setAttribute(kebabCase(name), value);
      }
    }
  }

  /**
   * Get Mux asset playback id.
   */
  get playbackId() {
    // Don't get the mux-video attribute here because it could have the
    // playback token appended to it.
    return this.getAttribute(MuxVideoAttributes.PLAYBACK_ID) ?? undefined;
  }

  /**
   * Set Mux asset playback id.
   */
  set playbackId(val) {
    if (val) {
      this.setAttribute(MuxVideoAttributes.PLAYBACK_ID, val);
    } else {
      this.removeAttribute(MuxVideoAttributes.PLAYBACK_ID);
    }
  }

  /**
   * Get the string that reflects the src HTML attribute, which contains the URL of a media resource to use.
   */
  get src() {
    // Only get the internal video.src if a playbackId is present.
    if (this.playbackId) {
      return getVideoAttribute(this, VideoAttributes.SRC) ?? undefined;
    }
    return this.getAttribute(VideoAttributes.SRC) ?? undefined;
  }

  /**
   * Set the string that reflects the src HTML attribute, which contains the URL of a media resource to use.
   */
  set src(val) {
    if (val) {
      this.setAttribute(VideoAttributes.SRC, val);
    } else {
      this.removeAttribute(VideoAttributes.SRC);
    }
  }

  /**
   * Gets a URL of an image to display, for example, like a movie poster. This can be a still frame from the video, or another image if no video data is available.
   */
  get poster() {
    const val = this.getAttribute(VideoAttributes.POSTER);
    if (val != null) return val;
    // If a playback token but no thumbnail token is provided,
    // assume a token is required for the thumbnail/poster URL and
    // simply avoid requesting it in this case.
    const { tokens } = this;
    if (tokens.playback && !tokens.thumbnail) {
      logger.warn('Missing expected thumbnail token. No poster image will be shown');
      return undefined;
    }

    // Get the derived poster if a playbackId is present.
    if (this.playbackId && !this.audio) {
      return getPosterURLFromPlaybackId(this.playbackId, {
        customDomain: this.customDomain,
        thumbnailTime: this.thumbnailTime ?? this.startTime,
        programTime: this.programStartTime,
        token: tokens.thumbnail,
      });
    }

    return undefined;
  }

  /**
   * Sets a URL of an image to display, for example, like a movie poster. This can be a still frame from the video, or another image if no video data is available.
   */
  set poster(val) {
    if (val || val === '') {
      this.setAttribute(VideoAttributes.POSTER, val);
    } else {
      this.removeAttribute(VideoAttributes.POSTER);
    }
  }

  /**
   * Return the storyboard-src attribute URL
   */
  get storyboardSrc() {
    return this.getAttribute(PlayerAttributes.STORYBOARD_SRC) ?? undefined;
  }

  /**
   * Set the storyboard-src attribute URL
   */
  set storyboardSrc(src: string | undefined) {
    if (!src) {
      this.removeAttribute(PlayerAttributes.STORYBOARD_SRC);
    } else {
      this.setAttribute(PlayerAttributes.STORYBOARD_SRC, src);
    }
  }

  /**
   * Return the storyboard URL when a playback ID or storyboard-src is provided,
   * we aren't an audio player and the stream-type isn't live.
   */
  get storyboard() {
    const { tokens } = this;
    // If the storyboardSrc has been explicitly set, assume it should be used
    if (this.storyboardSrc && !tokens.storyboard) return this.storyboardSrc;
    if (
      // NOTE: Some audio use cases may have a storyboard (e.g. it's an audio+video stream being played *as* audio)
      // Consider supporting cases (CJP)
      this.audio ||
      !this.playbackId ||
      !this.streamType ||
      [StreamTypes.LIVE, StreamTypes.UNKNOWN].includes(this.streamType as any) ||
      // If a playback token but no storyboard token is provided,
      // assume a token is required for the storyboard URL URL and
      // simply avoid requesting it in this case.
      (tokens.playback && !tokens.storyboard)
    ) {
      return undefined;
    }
    return getStoryboardURLFromPlaybackId(this.playbackId, {
      customDomain: this.customDomain,
      token: tokens.storyboard,
      programStartTime: this.programStartTime,
      programEndTime: this.programEndTime,
    });
  }

  /**
   * Gets the boolean indicator this is an audio player.
   */
  get audio() {
    return this.hasAttribute(PlayerAttributes.AUDIO);
  }

  /**
   * Sets the boolean indicator this is an audio player.
   */
  set audio(val: boolean) {
    if (!val) {
      this.removeAttribute(PlayerAttributes.AUDIO);
      return;
    }
    this.setAttribute(PlayerAttributes.AUDIO, '');
  }

  get hotkeys() {
    return this.#hotkeys;
  }

  get nohotkeys() {
    return this.hasAttribute(PlayerAttributes.NOHOTKEYS);
  }

  set nohotkeys(val: boolean) {
    if (!val) {
      this.removeAttribute(PlayerAttributes.NOHOTKEYS);
      return;
    }
    this.setAttribute(PlayerAttributes.NOHOTKEYS, '');
  }

  /**
   * Get the thumbnailTime offset used for the poster image.
   */
  get thumbnailTime() {
    return toNumberOrUndefined(this.getAttribute(PlayerAttributes.THUMBNAIL_TIME));
  }

  /**
   * Set the thumbnailTime offset used for the poster image.
   */
  set thumbnailTime(val: number | undefined) {
    this.setAttribute(PlayerAttributes.THUMBNAIL_TIME, `${val}`);
  }

  /**
   * Get the title shown in the player.
   */
  get title() {
    return this.getAttribute(PlayerAttributes.TITLE) ?? '';
  }

  /**
   * Set the title shown in the player.
   */
  set title(val: string) {
    if (val === this.title) return;

    if (!!val) {
      this.setAttribute(PlayerAttributes.TITLE, val);
    } else {
      this.removeAttribute('title');
    }
    // Calling super.title for tooltip usage
    super.title = val;
  }

  /**
   * Gets the data URL of a placeholder image shown before the thumbnail is loaded.
   */
  get placeholder() {
    return getVideoAttribute(this, PlayerAttributes.PLACEHOLDER) ?? '';
  }

  /**
   * Sets the data URL of a placeholder image shown before the thumbnail is loaded.
   */
  set placeholder(val) {
    this.setAttribute(PlayerAttributes.PLACEHOLDER, `${val}`);
  }

  /**
   * Get the primary color used by the player.
   */
  get primaryColor() {
    let color = this.getAttribute(PlayerAttributes.PRIMARY_COLOR);
    if (color != null) return color;

    // Fallback to computed style if no attribute is set, causes layout.
    // https://gist.github.com/paulirish/5d52fb081b3570c81e3a
    if (this.mediaTheme) {
      color = globalThis.getComputedStyle(this.mediaTheme)?.getPropertyValue('--_primary-color')?.trim();
      if (color) return color;
    }
  }

  /**
   * Set the primary color used by the player.
   */
  set primaryColor(val: string | undefined) {
    this.setAttribute(PlayerAttributes.PRIMARY_COLOR, `${val}`);
  }

  /**
   * Get the secondary color used by the player.
   */
  get secondaryColor() {
    let color = this.getAttribute(PlayerAttributes.SECONDARY_COLOR);
    if (color != null) return color;

    // Fallback to computed style if no attribute is set, causes layout.
    // https://gist.github.com/paulirish/5d52fb081b3570c81e3a
    if (this.mediaTheme) {
      color = globalThis.getComputedStyle(this.mediaTheme)?.getPropertyValue('--_secondary-color')?.trim();
      if (color) return color;
    }
  }

  /**
   * Set the secondary color used by the player.
   */
  set secondaryColor(val: string | undefined) {
    this.setAttribute(PlayerAttributes.SECONDARY_COLOR, `${val}`);
  }

  /**
   * Get the accent color used by the player.
   */
  get accentColor() {
    let color = this.getAttribute(PlayerAttributes.ACCENT_COLOR);
    if (color != null) return color;

    // Fallback to computed style if no attribute is set, causes layout.
    // https://gist.github.com/paulirish/5d52fb081b3570c81e3a
    if (this.mediaTheme) {
      color = globalThis.getComputedStyle(this.mediaTheme)?.getPropertyValue('--_accent-color')?.trim();
      if (color) return color;
    }
  }

  /**
   * Set the accent color used by the player.
   */
  set accentColor(val: string | undefined) {
    this.setAttribute(PlayerAttributes.ACCENT_COLOR, `${val}`);
  }

  get defaultShowRemainingTime() {
    return this.hasAttribute(PlayerAttributes.DEFAULT_SHOW_REMAINING_TIME);
  }

  set defaultShowRemainingTime(val: boolean | undefined) {
    if (!val) {
      this.removeAttribute(PlayerAttributes.DEFAULT_SHOW_REMAINING_TIME);
    } else {
      this.setAttribute(PlayerAttributes.DEFAULT_SHOW_REMAINING_TIME, '');
    }
  }

  /**
   * Get the playback rates applied to the playback rate control.
   */
  get playbackRates() {
    if (!this.hasAttribute(PlayerAttributes.PLAYBACK_RATES)) return undefined;
    // /NOTE: This is duplicating the code from Media Chrome's media-playback-rate-button (CJP)
    return (this.getAttribute(PlayerAttributes.PLAYBACK_RATES) as string)
      .trim()
      .split(/\s*,?\s+/)
      .map((str) => Number(str))
      .filter((num) => !Number.isNaN(num))
      .sort((a, b) => a - b);
  }

  /**
   * Set the playback rates applied to the playback rate control.
   */
  set playbackRates(val: number[] | undefined) {
    if (!val) {
      this.removeAttribute(PlayerAttributes.PLAYBACK_RATES);
      return;
    }
    this.setAttribute(PlayerAttributes.PLAYBACK_RATES, val.join(' '));
  }

  /**
   * Get the offset applied to the forward seek button.
   */
  get forwardSeekOffset() {
    return toNumberOrUndefined(this.getAttribute(PlayerAttributes.FORWARD_SEEK_OFFSET)) ?? 10;
  }

  /**
   * Set the offset applied to the forward seek button.
   */
  set forwardSeekOffset(val: number | undefined) {
    this.setAttribute(PlayerAttributes.FORWARD_SEEK_OFFSET, `${val}`);
  }

  /**
   * Get the offset applied to the backward seek button.
   */
  get backwardSeekOffset() {
    return toNumberOrUndefined(this.getAttribute(PlayerAttributes.BACKWARD_SEEK_OFFSET)) ?? 10;
  }

  /**
   * Set the offset applied to the forward seek button.
   */
  set backwardSeekOffset(val: number | undefined) {
    this.setAttribute(PlayerAttributes.BACKWARD_SEEK_OFFSET, `${val}`);
  }

  /**
   * Get the boolean value of default hidden captions.
   * By default returns false so captions are enabled on initial load.
   */
  get defaultHiddenCaptions() {
    return this.hasAttribute(PlayerAttributes.DEFAULT_HIDDEN_CAPTIONS);
  }

  /**
   * Set the default hidden captions flag.
   */
  set defaultHiddenCaptions(val: boolean | undefined) {
    if (!val) {
      this.removeAttribute(PlayerAttributes.DEFAULT_HIDDEN_CAPTIONS);
    } else {
      this.setAttribute(PlayerAttributes.DEFAULT_HIDDEN_CAPTIONS, '');
    }
  }

  /**
   * Get the boolean value of default hidden captions.
   * By default returns false so captions are enabled on initial load.
   */
  get defaultDuration() {
    return toNumberOrUndefined(this.getAttribute(PlayerAttributes.DEFAULT_DURATION));
  }

  /**
   * Set the default hidden captions flag.
   */
  set defaultDuration(val: number | undefined) {
    if (val == undefined) {
      this.removeAttribute(PlayerAttributes.DEFAULT_DURATION);
    } else {
      this.setAttribute(PlayerAttributes.DEFAULT_DURATION, `${val}`);
    }
  }

  /**
   * Get the player software name. Used by Mux Data.
   */
  get playerSoftwareName() {
    return this.getAttribute(MuxVideoAttributes.PLAYER_SOFTWARE_NAME) ?? playerSoftwareName;
  }

  /**
   * Get the player software version. Used by Mux Data.
   */
  get playerSoftwareVersion() {
    return this.getAttribute(MuxVideoAttributes.PLAYER_SOFTWARE_VERSION) ?? playerSoftwareVersion;
  }

  /**
   * Get the beacon collection domain. Used by Mux Data.
   */
  get beaconCollectionDomain() {
    return this.getAttribute(MuxVideoAttributes.BEACON_COLLECTION_DOMAIN) ?? undefined;
  }

  /**
   * Set the beacon collection domain. Used by Mux Data.
   */
  set beaconCollectionDomain(val: string | undefined) {
    // don't cause an infinite loop
    if (val === this.beaconCollectionDomain) return;

    if (val) {
      this.setAttribute(MuxVideoAttributes.BEACON_COLLECTION_DOMAIN, val);
    } else {
      this.removeAttribute(MuxVideoAttributes.BEACON_COLLECTION_DOMAIN);
    }
  }

  get maxResolution() {
    return (this.getAttribute(MuxVideoAttributes.MAX_RESOLUTION) as MaxResolutionValue) ?? undefined;
  }

  set maxResolution(val: MaxResolutionValue | undefined) {
    if (val === this.maxResolution) return;

    if (val) {
      this.setAttribute(MuxVideoAttributes.MAX_RESOLUTION, val);
    } else {
      this.removeAttribute(MuxVideoAttributes.MAX_RESOLUTION);
    }
  }

  get minResolution() {
    return (this.getAttribute(MuxVideoAttributes.MIN_RESOLUTION) as MinResolutionValue) ?? undefined;
  }

  set minResolution(val: MinResolutionValue | undefined) {
    if (val === this.minResolution) return;

    if (val) {
      this.setAttribute(MuxVideoAttributes.MIN_RESOLUTION, val);
    } else {
      this.removeAttribute(MuxVideoAttributes.MIN_RESOLUTION);
    }
  }

  get renditionOrder() {
    return (this.getAttribute(MuxVideoAttributes.RENDITION_ORDER) as RenditionOrderValue) ?? undefined;
  }

  set renditionOrder(val: RenditionOrderValue | undefined) {
    if (val === this.renditionOrder) return;

    if (val) {
      this.setAttribute(MuxVideoAttributes.RENDITION_ORDER, val);
    } else {
      this.removeAttribute(MuxVideoAttributes.RENDITION_ORDER);
    }
  }

  get programStartTime() {
    return toNumberOrUndefined(this.getAttribute(MuxVideoAttributes.PROGRAM_START_TIME));
  }

  set programStartTime(val: number | undefined) {
    if (val == undefined) {
      this.removeAttribute(MuxVideoAttributes.PROGRAM_START_TIME);
    } else {
      this.setAttribute(MuxVideoAttributes.PROGRAM_START_TIME, `${val}`);
    }
  }

  get programEndTime() {
    return toNumberOrUndefined(this.getAttribute(MuxVideoAttributes.PROGRAM_END_TIME));
  }

  set programEndTime(val: number | undefined) {
    if (val == undefined) {
      this.removeAttribute(MuxVideoAttributes.PROGRAM_END_TIME);
    } else {
      this.setAttribute(MuxVideoAttributes.PROGRAM_END_TIME, `${val}`);
    }
  }

  get extraSourceParams() {
    if (!this.hasAttribute(PlayerAttributes.EXTRA_SOURCE_PARAMS)) {
      return DEFAULT_EXTRA_PLAYLIST_PARAMS;
    }

    return [...new URLSearchParams(this.getAttribute(PlayerAttributes.EXTRA_SOURCE_PARAMS) as string).entries()].reduce(
      (paramsObj, [k, v]) => {
        paramsObj[k] = v;
        return paramsObj;
      },
      {} as Record<string, any>
    );
  }

  set extraSourceParams(value: Record<string, any>) {
    if (value == null) {
      this.removeAttribute(PlayerAttributes.EXTRA_SOURCE_PARAMS);
    } else {
      this.setAttribute(PlayerAttributes.EXTRA_SOURCE_PARAMS, new URLSearchParams(value).toString());
    }
  }

  /**
   * Get Mux asset custom domain.
   */
  get customDomain() {
    return this.getAttribute(MuxVideoAttributes.CUSTOM_DOMAIN) ?? undefined;
  }

  /**
   * Set Mux asset custom domain.
   */
  set customDomain(val: string | undefined) {
    // dont' cause an infinite loop
    if (val === this.customDomain) return;

    if (val) {
      this.setAttribute(MuxVideoAttributes.CUSTOM_DOMAIN, val);
    } else {
      this.removeAttribute(MuxVideoAttributes.CUSTOM_DOMAIN);
    }
  }

  /**
   * Get Mux Data env key.
   */
  get envKey() {
    return getVideoAttribute(this, MuxVideoAttributes.ENV_KEY) ?? undefined;
  }

  /**
   * Set Mux Data env key.
   */
  set envKey(val: string | undefined) {
    this.setAttribute(MuxVideoAttributes.ENV_KEY, `${val}`);
  }

  /**
   * Get no-volume-pref flag.
   */
  get noVolumePref() {
    return this.hasAttribute(PlayerAttributes.NO_VOLUME_PREF);
  }

  /**
   * Set video engine debug flag.
   */
  set noVolumePref(val) {
    if (val) {
      this.setAttribute(PlayerAttributes.NO_VOLUME_PREF, '');
    } else {
      this.removeAttribute(PlayerAttributes.NO_VOLUME_PREF);
    }
  }

  /**
   * Get video engine debug flag.
   */
  get debug() {
    return getVideoAttribute(this, MuxVideoAttributes.DEBUG) != null;
  }

  /**
   * Set video engine debug flag.
   */
  set debug(val) {
    if (val) {
      this.setAttribute(MuxVideoAttributes.DEBUG, '');
    } else {
      this.removeAttribute(MuxVideoAttributes.DEBUG);
    }
  }

  /**
   * Get video engine disable tracking flag.
   */
  get disableTracking() {
    return getVideoAttribute(this, MuxVideoAttributes.DISABLE_TRACKING) != null;
  }

  /**
   * Set video engine disable tracking flag.
   */
  set disableTracking(val) {
    this.toggleAttribute(MuxVideoAttributes.DISABLE_TRACKING, !!val);
  }

  /**
   * Get video engine disable cookies flag.
   */
  get disableCookies() {
    return getVideoAttribute(this, MuxVideoAttributes.DISABLE_COOKIES) != null;
  }

  /**
   * Set video engine disable cookies flag.
   */
  set disableCookies(val) {
    if (val) {
      this.setAttribute(MuxVideoAttributes.DISABLE_COOKIES, '');
    } else {
      this.removeAttribute(MuxVideoAttributes.DISABLE_COOKIES);
    }
  }

  /**
   * Get stream type.
   */
  get streamType() {
    return this.getAttribute(MuxVideoAttributes.STREAM_TYPE) ?? this.media?.streamType ?? StreamTypes.UNKNOWN;
  }

  /**
   * Set stream type.
   */
  set streamType(val) {
    this.setAttribute(MuxVideoAttributes.STREAM_TYPE, `${val}`);
  }

  get defaultStreamType() {
    return (
      (this.getAttribute(PlayerAttributes.DEFAULT_STREAM_TYPE) as ValueOf<StreamTypes>) ??
      (this.mediaController?.getAttribute(PlayerAttributes.DEFAULT_STREAM_TYPE) as ValueOf<StreamTypes>) ??
      StreamTypes.ON_DEMAND
    );
  }

  set defaultStreamType(val: ValueOf<StreamTypes> | undefined) {
    if (val) {
      this.setAttribute(PlayerAttributes.DEFAULT_STREAM_TYPE, val);
    } else {
      this.removeAttribute(PlayerAttributes.DEFAULT_STREAM_TYPE);
    }
  }

  get targetLiveWindow() {
    // Allow overriding inferred `targetLiveWindow`
    if (this.hasAttribute(PlayerAttributes.TARGET_LIVE_WINDOW)) {
      return +(this.getAttribute(PlayerAttributes.TARGET_LIVE_WINDOW) as string) as number;
    }
    return this.media?.targetLiveWindow ?? Number.NaN;
  }

  set targetLiveWindow(val: number | undefined) {
    // don't cause an infinite loop and avoid change event dispatching
    if (val == this.targetLiveWindow || (Number.isNaN(val) && Number.isNaN(this.targetLiveWindow))) return;

    if (val == null) {
      this.removeAttribute(PlayerAttributes.TARGET_LIVE_WINDOW);
    } else {
      this.setAttribute(PlayerAttributes.TARGET_LIVE_WINDOW, `${+val}`);
    }
  }

  get liveEdgeStart() {
    return this.media?.liveEdgeStart;
  }

  /**
   * Get the start time.
   */
  get startTime() {
    return toNumberOrUndefined(getVideoAttribute(this, MuxVideoAttributes.START_TIME));
  }

  /**
   * Set the start time.
   */
  set startTime(val) {
    this.setAttribute(MuxVideoAttributes.START_TIME, `${val}`);
  }

  get preferPlayback(): ValueOf<PlaybackTypes> | undefined {
    const val = this.getAttribute(MuxVideoAttributes.PREFER_PLAYBACK);
    if (val === PlaybackTypes.MSE || val === PlaybackTypes.NATIVE) return val;
    return undefined;
  }

  set preferPlayback(val: ValueOf<PlaybackTypes> | undefined) {
    if (val === this.preferPlayback) return;

    if (val === PlaybackTypes.MSE || val === PlaybackTypes.NATIVE) {
      this.setAttribute(MuxVideoAttributes.PREFER_PLAYBACK, val);
    } else {
      this.removeAttribute(MuxVideoAttributes.PREFER_PLAYBACK);
    }
  }

  /**
   * Get the metadata object for Mux Data.
   */
  get metadata(): Readonly<Metadata> | undefined {
    return this.media?.metadata;
  }

  /**
   * Set the metadata object for Mux Data.
   */
  set metadata(val: Readonly<Metadata> | undefined) {
    this.#init();

    // NOTE: This condition should never be met. If it is, there is a bug (CJP)
    if (!this.media) {
      logger.error('underlying media element missing when trying to set metadata. metadata will not be set.');
      return;
    }
    this.media.metadata = { ...getMetadataFromAttrs(this), ...val };
  }

  /**
   * Get the metadata object for Mux Data.
   */
  get _hlsConfig() {
    return this.media?._hlsConfig;
  }

  /**
   * Set the metadata object for Mux Data.
   */
  set _hlsConfig(val: Readonly<Partial<HlsConfig>> | undefined) {
    this.#init();

    // NOTE: This condition should never be met. If it is, there is a bug (CJP)
    if (!this.media) {
      logger.error('underlying media element missing when trying to set _hlsConfig. _hlsConfig will not be set.');
      return;
    }
    this.media._hlsConfig = val;
  }

  async addCuePoints<T = any>(cuePoints: { time: number; value: T }[]) {
    this.#init();

    // NOTE: This condition should never be met. If it is, there is a bug (CJP)
    if (!this.media) {
      logger.error('underlying media element missing when trying to addCuePoints. cuePoints will not be added.');
      return;
    }
    return this.media?.addCuePoints(cuePoints);
  }

  get activeCuePoint() {
    return this.media?.activeCuePoint;
  }

  get cuePoints() {
    return this.media?.cuePoints ?? [];
  }

  addChapters(chapters: { startTime: number; endTime: number; value: string }[]) {
    this.#init();

    // NOTE: This condition should never be met. If it is, there is a bug (CJP)
    if (!this.media) {
      logger.error('underlying media element missing when trying to addChapters. chapters will not be added.');
      return;
    }

    return this.media?.addChapters(chapters);
  }

  get activeChapter() {
    return this.media?.activeChapter;
  }

  get chapters() {
    return this.media?.chapters ?? [];
  }

  getStartDate() {
    return this.media?.getStartDate();
  }

  get currentPdt() {
    return this.media?.currentPdt;
  }

  /**
   * Get the signing tokens for the Mux asset URL's.
   */
  get tokens(): Tokens {
    const playback = this.getAttribute(PlayerAttributes.PLAYBACK_TOKEN);
    const drm = this.getAttribute(PlayerAttributes.DRM_TOKEN);
    const thumbnail = this.getAttribute(PlayerAttributes.THUMBNAIL_TOKEN);
    const storyboard = this.getAttribute(PlayerAttributes.STORYBOARD_TOKEN);
    return {
      ...this.#tokens,
      ...(playback != null ? { playback } : {}),
      ...(drm != null ? { drm } : {}),
      ...(thumbnail != null ? { thumbnail } : {}),
      ...(storyboard != null ? { storyboard } : {}),
    };
  }

  /**
   * Set the signing tokens for the Mux asset URL's.
   */
  set tokens(val: Tokens | undefined) {
    this.#tokens = val ?? {};
  }

  /**
   * Get the playback token for signing the src URL.
   */
  get playbackToken() {
    return this.getAttribute(PlayerAttributes.PLAYBACK_TOKEN) ?? undefined;
  }

  /**
   * Set the playback token for signing the src URL.
   */
  set playbackToken(val) {
    this.setAttribute(PlayerAttributes.PLAYBACK_TOKEN, `${val}`);
  }

  /**
   * Get the playback token for signing the src URL.
   */
  get drmToken() {
    return this.getAttribute(PlayerAttributes.DRM_TOKEN) ?? undefined;
  }

  /**
   * Set the playback token for signing the src URL.
   */
  set drmToken(val) {
    this.setAttribute(PlayerAttributes.DRM_TOKEN, `${val}`);
  }

  /**
   * Get the thumbnail token for signing the poster URL.
   */
  get thumbnailToken() {
    return this.getAttribute(PlayerAttributes.THUMBNAIL_TOKEN) ?? undefined;
  }

  /**
   * Set the thumbnail token for signing the poster URL.
   */
  set thumbnailToken(val) {
    this.setAttribute(PlayerAttributes.THUMBNAIL_TOKEN, `${val}`);
  }

  /**
   * Get the storyboard token for signing the storyboard URL.
   */
  get storyboardToken() {
    return this.getAttribute(PlayerAttributes.STORYBOARD_TOKEN) ?? undefined;
  }

  /**
   * Set the storyboard token for signing the storyboard URL.
   */
  set storyboardToken(val) {
    this.setAttribute(PlayerAttributes.STORYBOARD_TOKEN, `${val}`);
  }

  addTextTrack(kind: TextTrackKind, label: string, lang?: string, id?: string) {
    const mediaEl = this.media?.nativeEl;
    if (!mediaEl) return;
    return addTextTrack(mediaEl, kind, label, lang, id);
  }

  removeTextTrack(track: TextTrack) {
    const mediaEl = this.media?.nativeEl;
    if (!mediaEl) return;
    return removeTextTrack(mediaEl, track);
  }

  get textTracks() {
    return this.media?.textTracks;
  }

  get castReceiver(): string | undefined {
    return this.getAttribute(PlayerAttributes.CAST_RECEIVER) ?? undefined;
  }

  set castReceiver(val: string | undefined) {
    if (val === this.castReceiver) return;
    if (val) {
      this.setAttribute(PlayerAttributes.CAST_RECEIVER, val);
    } else {
      this.removeAttribute(PlayerAttributes.CAST_RECEIVER);
    }
  }

  get castCustomData() {
    return this.media?.castCustomData;
  }

  set castCustomData(val) {
    // NOTE: This condition should never be met. If it is, there is a bug (CJP)
    if (!this.media) {
      logger.error(
        'underlying media element missing when trying to set castCustomData. castCustomData will not be set.'
      );
      return;
    }
    this.media.castCustomData = val;
  }
}

export function getVideoAttribute(el: MuxPlayerElement, name: string) {
  return el.media ? el.media.getAttribute(name) : el.getAttribute(name);
}

/** @TODO Refactor once using `globalThis` polyfills */
if (!globalThis.customElements.get('mux-player')) {
  globalThis.customElements.define('mux-player', MuxPlayerElement);
  /** @TODO consider externalizing this (breaks standard modularity) */
  (globalThis as any).MuxPlayerElement = MuxPlayerElement;
}

export default MuxPlayerElement;
