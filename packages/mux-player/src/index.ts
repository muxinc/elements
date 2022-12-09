import { globalThis, document } from 'shared-polyfills';
// @ts-ignore
import { MediaController } from 'media-chrome';
import MuxVideoElement, { MediaError, Attributes as MuxVideoAttributes } from '@mux/mux-video';
import {
  ValueOf,
  Metadata,
  StreamTypes,
  PlaybackTypes,
  PlaybackEngine,
  addTextTrack,
  removeTextTrack,
  CmcdTypes,
  CmcdTypeValues,
} from '@mux/playback-core';
import VideoApiElement, { initVideoApi } from './video-api';
import {
  getPlayerVersion,
  isInLiveWindow,
  seekToLive,
  toPropName,
  AttributeTokenList,
  getPosterURLFromPlaybackId,
  getStoryboardURLFromPlaybackId,
} from './helpers';
import { template } from './template';
import { render } from './html';
import { getErrorLogs } from './errors';
import { toNumberOrUndefined, i18n, parseJwt, containsComposedNode } from './utils';
import * as logger from './logger';
import type { MuxTemplateProps, ErrorEvent } from './types';

export { MediaError };
export type Tokens = {
  playback?: string;
  thumbnail?: string;
  storyboard?: string;
};

const streamTypeValues = Object.values(StreamTypes);

const SMALL_BREAKPOINT = 700;
const XSMALL_BREAKPOINT = 300;
const MediaChromeSizes = {
  LG: 'large',
  SM: 'small',
  XS: 'extra-small',
};

function getPlayerSize(el: Element) {
  const muxPlayerRect = el.getBoundingClientRect();
  return muxPlayerRect.width < XSMALL_BREAKPOINT
    ? MediaChromeSizes.XS
    : muxPlayerRect.width < SMALL_BREAKPOINT
    ? MediaChromeSizes.SM
    : MediaChromeSizes.LG;
}

const VideoAttributes = {
  SRC: 'src',
  POSTER: 'poster',
};

const PlayerAttributes = {
  STYLE: 'style',
  DEFAULT_HIDDEN_CAPTIONS: 'default-hidden-captions',
  PRIMARY_COLOR: 'primary-color',
  SECONDARY_COLOR: 'secondary-color',
  FORWARD_SEEK_OFFSET: 'forward-seek-offset',
  BACKWARD_SEEK_OFFSET: 'backward-seek-offset',
  PLAYBACK_TOKEN: 'playback-token',
  THUMBNAIL_TOKEN: 'thumbnail-token',
  STORYBOARD_TOKEN: 'storyboard-token',
  THUMBNAIL_TIME: 'thumbnail-time',
  AUDIO: 'audio',
  NOHOTKEYS: 'nohotkeys',
  HOTKEYS: 'hotkeys',
  PLAYBACK_RATES: 'playbackrates',
  DEFAULT_SHOW_REMAINING_TIME: 'default-show-remaining-time',
  TITLE: 'title',
  PLACEHOLDER: 'placeholder',
};

function getProps(el: MuxPlayerElement, state?: any): MuxTemplateProps {
  const props = {
    // Give priority to playbackId derrived asset URL's if playbackId is set.
    src: !el.playbackId && el.src,
    playbackId: el.playbackId,
    hasSrc: !!el.playbackId || !!el.src,
    poster: el.poster,
    storyboard: el.storyboard,
    placeholder: el.getAttribute('placeholder'),
    theme: el.getAttribute('theme'),
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
    disableCookies: el.disableCookies,
    tokens: el.tokens,
    beaconCollectionDomain: el.beaconCollectionDomain,
    metadata: el.metadata,
    playerSoftwareName: el.playerSoftwareName,
    playerSoftwareVersion: el.playerSoftwareVersion,
    startTime: el.startTime,
    preferPlayback: el.preferPlayback,
    audio: el.audio,
    streamType: el.streamType,
    primaryColor: el.primaryColor,
    secondaryColor: el.secondaryColor,
    forwardSeekOffset: el.forwardSeekOffset,
    backwardSeekOffset: el.backwardSeekOffset,
    defaultHiddenCaptions: el.defaultHiddenCaptions,
    defaultShowRemainingTime: el.defaultShowRemainingTime,
    playbackRates: el.getAttribute(PlayerAttributes.PLAYBACK_RATES),
    customDomain: el.getAttribute(MuxVideoAttributes.CUSTOM_DOMAIN) ?? undefined,
    playerSize: getPlayerSize(el.mediaController ?? el),
    title: el.getAttribute(PlayerAttributes.TITLE),
    ...state,
  };

  return props;
}

const MuxVideoAttributeNames = Object.values(MuxVideoAttributes);
const VideoAttributeNames = Object.values(VideoAttributes);
const PlayerAttributeNames = Object.values(PlayerAttributes);
const playerSoftwareVersion = getPlayerVersion();
const playerSoftwareName = 'mux-player';

const initialState = {
  dialog: undefined,
  isDialogOpen: false,
  inLiveWindow: false,
};

class MuxPlayerElement extends VideoApiElement {
  #isInit = false;
  #tokens = {};
  #userInactive = true;
  #hotkeys = new AttributeTokenList(this, 'hotkeys');
  #resizeObserver?: ResizeObserver;
  #state: Partial<MuxTemplateProps> = {
    ...initialState,
    onCloseErrorDialog: () => this.#setState({ dialog: undefined, isDialogOpen: false }),
    onInitFocusDialog: (e) => {
      const isFocusedElementInPlayer = containsComposedNode(this, document.activeElement);
      if (!isFocusedElementInPlayer) e.preventDefault();
    },
    onSeekToLive: () => seekToLive(this),
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
    this.#setState({ playerSize: getPlayerSize(this) });

    // Fixes a bug in React where mux-player's CE children were not upgraded yet.
    // These lines ensure the rendered mux-video and media-controller are upgraded,
    // even before they are connected to the main document.
    try {
      customElements.upgrade(this.theme as Node);
      if (!(this.theme instanceof globalThis.HTMLElement)) throw '';
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

    initVideoApi(this);

    this.#setUpErrors();
    this.#setUpCaptionsButton();
    this.#monitorLiveWindow();
    this.#userInactive = this.mediaController?.hasAttribute('user-inactive') ?? true;
    this.#setUpCaptionsMovement();
  }

  #setupCSSProperties() {
    // registerProperty will throw if the prop has already been registered
    // and there's currently no way to check ahead of time
    try {
      // @ts-ignore
      window?.CSS?.registerProperty({
        name: '--primary-color',
        syntax: '<color>',
        inherits: true,
        initialValue: 'white',
      });
      // @ts-ignore
      window?.CSS?.registerProperty({
        name: '--secondary-color',
        syntax: '<color>',
        inherits: true,
        initialValue: 'transparent',
      });
    } catch (e) {}
  }

  get theme(): Element | null | undefined {
    return this.shadowRoot?.querySelector('media-theme');
  }

  get mediaController(): MediaController | null | undefined {
    return this.theme?.shadowRoot?.querySelector('media-controller');
  }

  get metadataFromAttrs() {
    return this.getAttributeNames()
      .filter((attrName) => attrName.startsWith('metadata-'))
      .reduce((currAttrs, attrName) => {
        const value = this.getAttribute(attrName);
        if (value !== null) {
          currAttrs[attrName.replace(/^metadata-/, '').replace(/-/g, '_')] = value;
        }
        return currAttrs;
      }, {} as { [key: string]: string });
  }

  connectedCallback() {
    this.#renderChrome();
    const muxVideo = this.shadowRoot?.querySelector('mux-video') as MuxVideoElement;
    if (muxVideo) {
      muxVideo.metadata = this.metadataFromAttrs;
    }
    this.#initResizing();
  }

  disconnectedCallback() {
    this.#deinitResizing();
  }

  #setState(newState: Record<string, any>) {
    Object.assign(this.#state, newState);
    this.#render();
  }

  #render(props: Record<string, any> = {}) {
    render(template(getProps(this, { ...this.#state, ...props })), this.shadowRoot as Node);
  }

  #renderChrome() {
    if (this.#state.playerSize != getPlayerSize(this.mediaController ?? this)) {
      this.#setState({ playerSize: getPlayerSize(this.mediaController ?? this) });
    }
  }

  #initResizing() {
    this.#resizeObserver = new ResizeObserver(() => this.#renderChrome());
    this.#resizeObserver.observe(this.mediaController ?? this);
  }

  #deinitResizing() {
    this.#resizeObserver?.disconnect();
  }

  #monitorLiveWindow() {
    this.mediaController?.addEventListener('mediaplayrequest', (event) => {
      if (
        (event.target as Element)?.localName === 'media-play-button' &&
        this.streamType &&
        [StreamTypes.LIVE, StreamTypes.LL_LIVE, StreamTypes.DVR, StreamTypes.LL_DVR].includes(this.streamType as any)
      ) {
        // playback core should handle the seek to live on first play
        if (this.hasPlayed) {
          seekToLive(this);
        }
      }
    });

    const updateLiveWindow = () => {
      const nextInLiveWindow = isInLiveWindow(this);
      const prevInLiveWindow = this.#state.inLiveWindow;
      if (nextInLiveWindow !== prevInLiveWindow) {
        this.#setState({ inLiveWindow: nextInLiveWindow });
        this.dispatchEvent(
          new CustomEvent('inlivewindowchange', { composed: true, bubbles: true, detail: this.inLiveWindow })
        );
      }
    };
    this.media?.addEventListener('progress', updateLiveWindow);
    this.media?.addEventListener('waiting', updateLiveWindow);
    this.media?.addEventListener('timeupdate', updateLiveWindow);
    this.media?.addEventListener('emptied', updateLiveWindow);
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
        if (!this.media?.error) return errorEvent;

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
    type Maybe<T> = T | null | undefined;

    const mc: Maybe<MediaController> = this.mediaController;

    // Any Safari
    const isSafari = /.*Version\/.*Safari\/.*/.test(navigator.userAgent);

    if (isSafari) return;

    let selectedTrack: TextTrack;
    const cuesmap = new WeakMap();

    const shouldSkipLineToggle = () => {
      // skip line toggle when:
      // - streamType is live, unless secondary color is set or player size is too small
      // - native fullscreen on iPhones
      return (
        this.streamType &&
        [StreamTypes.LIVE, StreamTypes.LL_LIVE].includes(this.streamType as any) &&
        !this.secondaryColor &&
        this.offsetWidth >= 800
      );
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
        if (!cue.snapToLines || cue.line < -5 || (cue.line >= 0 && cue.line < 10)) {
          return;
        }

        // if the user is active or if the player is paused, the captions should be moved up
        if (!userInactive || this.paused) {
          // for cues that have more than one line, we want to push the cue further up
          const lines = cue.text.split('\n').length;
          // start at -3 to account for thumbnails as well.
          // default safari styles are taller than other browsers
          let offset = isSafari ? -2 : -3;

          if (this.streamType && [StreamTypes.LIVE, StreamTypes.LL_LIVE].includes(this.streamType as any)) {
            offset = isSafari ? -1 : -2;
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

          // we have to set line to 0 first due to a chrome bug https://crbug.com/1308892
          cue.line = setTo - 1;
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
      toggleLines(selectedTrack, mc?.hasAttribute('user-inactive') ?? false);
    };

    const selectTrack = () => {
      const tracks = Array.from(mc?.media?.textTracks || []) as TextTrack[];
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
    mc?.media?.textTracks.addEventListener('change', selectTrack);
    mc?.media?.textTracks.addEventListener('addtrack', selectTrack);

    if (navigator.userAgent.includes('Chrome/')) {
      const chromeWorkaround = () => {
        toggleLines(selectedTrack, this.#userInactive, true);
        if (!this.paused) {
          window.requestAnimationFrame(chromeWorkaround);
        }
      };
      mc?.media?.addEventListener('playing', () => {
        chromeWorkaround();
      });
    }

    mc?.addEventListener('userinactivechange', () => {
      const newUserInactive = mc?.hasAttribute('user-inactive');

      if (this.#userInactive === newUserInactive) {
        return;
      }

      this.#userInactive = newUserInactive;

      toggleLines(selectedTrack, this.#userInactive);
    });
  }

  attributeChangedCallback(attrName: string, oldValue: string | null, newValue: string) {
    if (!this.#isInit) {
      // Initialize right after construction when the attributes become available.
      this.#init();
    }

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
        const { aud } = parseJwt(newValue);
        if (newValue && aud !== 't') {
          logger.warn(
            i18n(`The provided thumbnail-token should have audience value 't' instead of '{aud}'.`).format({ aud })
          );
        }
        break;
      }
      case PlayerAttributes.STORYBOARD_TOKEN: {
        const { aud } = parseJwt(newValue);
        if (newValue && aud !== 's') {
          logger.warn(
            i18n(`The provided storyboard-token should have audience value 's' instead of '{aud}'.`).format({ aud })
          );
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

        if (!this.streamType) {
          logger.devlog({
            file: 'invalid-stream-type.md',
            message: String(
              i18n(
                `No stream-type value supplied. Defaulting to \`on-demand\`. Please provide stream-type as either: \`on-demand\`, \`live\`, \`ll-live\`, \`live:dvr\`, or \`ll-live:dvr\``
              )
            ),
          });
        } else if (this.streamType != null && !streamTypeValues.includes(this.streamType as any)) {
          logger.devlog({
            file: 'invalid-stream-type.md',
            message: i18n(
              `Invalid stream-type value supplied: \`{streamType}\`. Please provide stream-type as either: \`on-demand\`, \`live\`, \`ll-live\`, \`live:dvr\`, or \`ll-live:dvr\``
            ).format({ streamType: this.streamType }),
          });
        }
        break;
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
    return this.mediaController?.hasAttribute('media-has-played') ?? false;
  }

  get inLiveWindow() {
    return this.#state.inLiveWindow;
  }

  get _hls(): PlaybackEngine | undefined {
    return this.media?._hls;
  }

  get mux() {
    return this.media?.mux;
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

    // Get the derived poster if a playbackId is present.
    if (this.playbackId && !this.audio) {
      return getPosterURLFromPlaybackId(this.playbackId, {
        domain: this.customDomain,
        thumbnailTime: this.thumbnailTime ?? this.startTime,
        token: this.tokens.thumbnail,
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
   * Return the storyboard URL when a playback ID is provided,
   * we aren't an audio player and the stream-type isn't live.
   */
  get storyboard() {
    if (
      this.playbackId &&
      !this.audio &&
      (!this.streamType ||
        ![StreamTypes.LIVE, StreamTypes.LL_LIVE, StreamTypes.DVR, StreamTypes.LL_DVR].includes(this.streamType as any))
    ) {
      return getStoryboardURLFromPlaybackId(this.playbackId, {
        domain: this.customDomain,
        token: this.tokens.storyboard,
      });
    }

    return;
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
    return this.getAttribute(PlayerAttributes.PRIMARY_COLOR) ?? undefined;
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
    return this.getAttribute(PlayerAttributes.SECONDARY_COLOR) ?? 'rgb(0 0 0 / .65)';
  }

  /**
   * Set the secondary color used by the player.
   */
  set secondaryColor(val: string | undefined) {
    this.setAttribute(PlayerAttributes.SECONDARY_COLOR, `${val}`);
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
   * Get video engine disable cookies flag.
   */
  get disableCookies() {
    return getVideoAttribute(this, MuxVideoAttributes.DISABLE_COOKIES) != null;
  }

  /**
   * Set video engine debug flag.
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
    return getVideoAttribute(this, MuxVideoAttributes.STREAM_TYPE);
  }

  /**
   * Set stream type.
   */
  set streamType(val) {
    this.setAttribute(MuxVideoAttributes.STREAM_TYPE, `${val}`);
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
    if (!this.#isInit) {
      this.#init();
    }
    // NOTE: This condition should never be met. If it is, there is a bug (CJP)
    if (!this.media) {
      logger.error('underlying media element missing when trying to set metadata. metadata will not be set.');
      return;
    }
    this.media.metadata = { ...this.metadataFromAttrs, ...val };
  }

  /**
   * Get the signing tokens for the Mux asset URL's.
   */
  get tokens(): Tokens {
    const playback = this.getAttribute(PlayerAttributes.PLAYBACK_TOKEN);
    const thumbnail = this.getAttribute(PlayerAttributes.THUMBNAIL_TOKEN);
    const storyboard = this.getAttribute(PlayerAttributes.STORYBOARD_TOKEN);
    return {
      ...this.#tokens,
      ...(playback != null ? { playback } : {}),
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
