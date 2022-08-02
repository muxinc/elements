// import playback-core here to make sure that the polyfill is loaded
import '@mux/playback-core';
// @ts-ignore
import { MediaController } from 'media-chrome';
import MuxVideoElement, { MediaError } from '@mux/mux-video';
import { Metadata, StreamTypes, addTextTrack, removeTextTrack } from '@mux/playback-core';
import VideoApiElement, { initVideoApi } from './video-api';
import { getPlayerVersion, isInLiveWindow, seekToLive, toPropName } from './helpers';
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
};

const MuxVideoAttributes = {
  ENV_KEY: 'env-key',
  DEBUG: 'debug',
  PLAYBACK_ID: 'playback-id',
  METADATA_URL: 'metadata-url',
  PREFER_MSE: 'prefer-mse',
  PLAYER_SOFTWARE_VERSION: 'player-software-version',
  PLAYER_SOFTWARE_NAME: 'player-software-name',
  METADATA_VIDEO_ID: 'metadata-video-id',
  METADATA_VIDEO_TITLE: 'metadata-video-title',
  METADATA_VIEWER_USER_ID: 'metadata-viewer-user-id',
  BEACON_COLLECTION_DOMAIN: 'beacon-collection-domain',
  CUSTOM_DOMAIN: 'custom-domain',
  TYPE: 'type',
  STREAM_TYPE: 'stream-type',
  START_TIME: 'start-time',
};

const PlayerAttributes = {
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
};

function getProps(el: MuxPlayerElement, state?: any): MuxTemplateProps {
  return {
    // Give priority to playbackId derrived asset URL's if playbackId is set.
    src: !el.playbackId && el.src,
    // NOTE: Always use the externally set poster attribute here to guarantee
    // it's used if/when it's been explicitly set "from the outside"
    // (See template.ts for additional context) (CJP)
    poster: el.getAttribute('poster'),
    theme: el.getAttribute('theme'),
    thumbnailTime: !el.tokens.thumbnail && el.thumbnailTime,
    autoplay: el.autoplay,
    crossOrigin: el.crossOrigin,
    loop: el.loop,
    // NOTE: Renaming internal prop due to state (sometimes derived from attributeChangedCallback attr values)
    // overwriting prop value (type mismatch: string vs. boolean) (CJP)
    noHotKeys: el.hasAttribute(PlayerAttributes.NOHOTKEYS),
    muted: el.muted,
    paused: el.paused,
    playsInline: el.playsInline,
    preload: el.preload,
    playbackId: el.playbackId,
    envKey: el.envKey,
    debug: el.debug,
    tokens: el.tokens,
    beaconCollectionDomain: el.beaconCollectionDomain,
    metadata: el.metadata,
    playerSoftwareName: el.playerSoftwareName,
    playerSoftwareVersion: el.playerSoftwareVersion,
    startTime: el.startTime,
    preferMse: el.preferMse,
    audio: el.audio,
    streamType: el.streamType,
    primaryColor: el.primaryColor,
    secondaryColor: el.secondaryColor,
    forwardSeekOffset: el.forwardSeekOffset,
    backwardSeekOffset: el.backwardSeekOffset,
    defaultHiddenCaptions: el.defaultHiddenCaptions,
    customDomain: el.getAttribute(MuxVideoAttributes.CUSTOM_DOMAIN) ?? undefined,
    playerSize: getPlayerSize(el.mediaController ?? el),
    // NOTE: In order to guarantee all expected metadata props are set "from the outside" when used
    // and to guarantee they'll all be set *before* the playback id is set, using attr values here (CJP)
    metadataVideoId: el.getAttribute(MuxVideoAttributes.METADATA_VIDEO_ID),
    metadataVideoTitle: el.getAttribute(MuxVideoAttributes.METADATA_VIDEO_TITLE),
    metadataViewerUserId: el.getAttribute(MuxVideoAttributes.METADATA_VIEWER_USER_ID),
    ...state,
  };
}

const MuxVideoAttributeNames = Object.values(MuxVideoAttributes);
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
    return [...(VideoApiElement.observedAttributes ?? []), ...MuxVideoAttributeNames, ...PlayerAttributeNames];
  }

  constructor() {
    super();

    this.attachShadow({ mode: 'open' });

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
      if (!(this.theme instanceof HTMLElement)) throw '';
    } catch (error) {
      logger.error(`<${this.theme?.localName}> failed to upgrade!`);
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

    /**
     * @todo determine sensible defaults for preloading buffer
     * @see https://github.com/muxinc/elements/issues/51
     */
    // if (this.media?._hls) {
    //   // Temporarily here to load less segments on page load, remove later!!!!
    //   this.media._hls.config.maxMaxBufferLength = 2;
    // }

    this.#setUpErrors();
    this.#setUpCaptionsButton();
    this.#monitorLiveWindow();
    this.#userInactive = this.mediaController?.hasAttribute('user-inactive') ?? true;
    this.#setUpCaptionsMovement();
  }

  get theme(): Element | null | undefined {
    return Array.from(this.shadowRoot?.children ?? []).find(({ localName }) => localName.startsWith('media-theme-'));
  }

  get mediaController(): MediaController | null | undefined {
    return this.theme?.shadowRoot?.querySelector('media-controller');
  }

  connectedCallback() {
    this.#renderChrome();
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
    const isIphone = /.*iPhone.*/.test(navigator.userAgent);

    // ignore iphones
    if (isIphone) return;

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
    const toggleLines = (track: TextTrack, userInactive: boolean) => {
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
          if (cue.line === setTo) {
            return;
          }

          if (!cuesmap.has(cue)) {
            cuesmap.set(cue, cue.line);
          }

          // we have to set line to 0 first due to a chrome bug https://crbug.com/1308892
          cue.line = 0;
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

    const shouldClearState = [
      MuxVideoAttributes.PLAYBACK_ID,
      VideoAttributes.SRC,
      PlayerAttributes.PLAYBACK_TOKEN,
    ].includes(attrName);

    if (shouldClearState && oldValue !== newValue) {
      this.#state = { ...this.#state, ...initialState };
    }

    this.#render({ [toPropName(attrName)]: newValue });

    switch (attrName) {
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
        if (newValue.includes('?token')) {
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
                `No stream-type value supplied. Defaulting to \`on-demand\`. Please provide stream-type as either: \`on-demand\`, \`live\` or \`ll-live\``
              )
            ),
          });
        } else if (this.streamType != null && !streamTypeValues.includes(this.streamType as any)) {
          logger.devlog({
            file: 'invalid-stream-type.md',
            message: i18n(
              `Invalid stream-type value supplied: \`{streamType}\`. Please provide stream-type as either: \`on-demand\`, \`live\` or \`ll-live\``
            ).format({ streamType: this.streamType }),
          });
        }
        break;
      }
    }
  }

  get hasPlayed() {
    return this.mediaController?.hasAttribute('media-has-played') ?? false;
  }

  get inLiveWindow() {
    return this.#state.inLiveWindow;
  }

  /**
   * @deprecated please use ._hls instead
   */
  get hls() {
    logger.warn('<mux-player>.hls is deprecated, please use ._hls instead');
    return this._hls;
  }

  get _hls() {
    return this.media?._hls;
  }

  get mux() {
    return this.media?.mux;
  }

  /**
   * Get the thumbnailTime offset used for the poster image.
   */
  get audio() {
    return this.hasAttribute(PlayerAttributes.AUDIO);
  }

  /**
   * Set the thumbnailTime offset used for the poster image.
   */
  set audio(val: boolean) {
    if (!val) {
      this.removeAttribute(PlayerAttributes.AUDIO);
    }
    this.setAttribute(PlayerAttributes.AUDIO, '');
  }

  get nohotkeys() {
    return this.hasAttribute(PlayerAttributes.NOHOTKEYS);
  }

  set nohotkeys(val: boolean) {
    if (!val) {
      this.removeAttribute(PlayerAttributes.NOHOTKEYS);
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
    return this.getAttribute(PlayerAttributes.SECONDARY_COLOR) ?? undefined;
  }

  /**
   * Set the secondary color used by the player.
   */
  set secondaryColor(val: string | undefined) {
    this.setAttribute(PlayerAttributes.SECONDARY_COLOR, `${val}`);
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
  set playbackId(val: string | undefined) {
    this.setAttribute(MuxVideoAttributes.PLAYBACK_ID, `${val}`);
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

  /**
   * Get the preference flag for using media source.
   */
  get preferMse() {
    return getVideoAttribute(this, MuxVideoAttributes.PREFER_MSE) != null;
  }

  /**
   * Set the preference flag for using media source.
   */
  set preferMse(val) {
    if (val) {
      this.setAttribute(MuxVideoAttributes.PREFER_MSE, '');
    } else {
      this.removeAttribute(MuxVideoAttributes.PREFER_MSE);
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
    this.media.metadata = val;
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
