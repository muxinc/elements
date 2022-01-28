import 'media-chrome';
import '@mux-elements/mux-video';
import VideoApiElement from './video-api-element.js';
import { html, renderable, stylePropsToString } from './utils.js';
import { getPlayerVersion } from './env.js';

/** @typedef { import("./utils").PersistentFragment } PersistentFragment */
/** @typedef { import("./utils").RenderableFragment } RenderableFragment */
/** @typedef { import('@mux-elements/playback-core').Metadata } Metadata */

const playerSoftwareVersion = getPlayerVersion();
const playerSoftwareName = 'mux-player';

export const StreamTypes = {
  VOD: 'on-demand',
  LIVE: 'live',
  LL_LIVE: 'll-live',
};

const MuxVideoAttributes = {
  ENV_KEY: 'env-key',
  DEBUG: 'debug',
  PLAYBACK_ID: 'playback-id',
  METADATA_URL: 'metadata-url',
  PREFER_MSE: 'prefer-mse',
  METADATA_VIDEO_ID: 'metadata-video-id',
  METADATA_VIDEO_TITLE: 'metadata-video-title',
  METADATA_VIEWER_USER_ID: 'metadata-viewer-user-id',
  BEACON_DOMAIN: 'beacon-domain',
  TYPE: 'type',
  STREAM_TYPE: 'stream-type',
  START_TIME: 'start-time',
};

const PlayerAttributes = {
  DEFAULT_SHOW_CAPTIONS: 'default-show-captions',
};

const MuxVideoAttributeNames = Object.values(MuxVideoAttributes);

/** @type {(playbackId: string | undefined) => string} */
const getPosterURLFromPlaybackId = (playbackId) =>
  `https://image.mux.com/${playbackId}/thumbnail.jpg`;

/** @type {(playbackId: string | undefined) => string} */
const getStoryboardURLFromPlaybackId = (playbackId) =>
  `https://image.mux.com/${playbackId}/storyboard.vtt`;

/** @type {(props: any) => any} */
const getChromeStylesFromProps = (props) => {
  const { primaryColor, secondaryColor, tertiaryColor } = props;

  const primaryColorStyles = primaryColor
    ? {
        '--media-icon-color': primaryColor,
        '--media-range-thumb-background': primaryColor,
        '--media-range-bar-color': primaryColor,
        color: primaryColor,
      }
    : {};

  const secondaryColorStyles = secondaryColor
    ? {
        '--media-background-color': secondaryColor,
        '--media-control-background': secondaryColor,
      }
    : {};

  const tertiaryColorStyles = tertiaryColor
    ? {
        '--media-range-track-background': tertiaryColor,
      }
    : {};

  return stylePropsToString({
    maxWidth: '100%',
    color: '#ffffff',
    ...primaryColorStyles,
    ...secondaryColorStyles,
    ...tertiaryColorStyles,
  });
};

/** @type {(props: MuxProps) => PersistentFragment} */
const MuxPlayer = (props) => html`
  <media-controller style="${getChromeStylesFromProps(props)}">
    <mux-video
      slot="media"
      playback-id="${props.playbackId}"
      env-key="${props.envKey}"
      ${props.metadata?.video_id
        ? `metadata-video-id="${props.metadata.video_id}"`
        : ''}
      ${props.metadata?.video_title
        ? `metadata-video-title="${props.metadata.video_title}"`
        : ''}
      ${props.metadata?.viewer_user_id
        ? `metadata-viewer-user-id="${props.metadata.viewer_user_id}"`
        : ''}
      stream-type="${props.streamType}"
      start-time="${props.startTime}"
      poster="${props.poster ?? getPosterURLFromPlaybackId(props.playbackId)}"
      crossorigin
      playsinline
      ${props.debug ? 'debug' : ''}
      ${props.muted ? 'muted' : ''}
      ${props.preferMse ? 'prefer-mse' : ''}
      ${props.autoplay ||
      props.streamType === StreamTypes.LIVE ||
      props.streamType === StreamTypes.LL_LIVE
        ? 'autoplay'
        : ''}
    >
      <track
        label="thumbnails"
        default
        kind="metadata"
        src=${getStoryboardURLFromPlaybackId(props.playbackId)}
      />
    </mux-video>
    ${renderable('chromeRenderer', ChromeRenderer, props)}
  </media-controller>
`;

/** @type {(props: MuxProps) => PersistentFragment} */
const ChromeRenderer = (props) => {
  const { streamType, playerSize } = props;
  if (streamType === StreamTypes.LIVE || streamType === StreamTypes.LL_LIVE) {
    if (playerSize === MediaChromeSizes.LG) {
      return LiveChromeLarge(props);
    }
    return LiveChromeSmall(props);
  }
  if (playerSize === MediaChromeSizes.LG) {
    return VodChromeLarge(props);
  }
  return VodChromeSmall(props);
};

const Spacer = () => html`
  <div
    style="flex-grow: 1; height: 100%; background-color: var(--media-control-background, rgba(20,20,30, 0.7));"
  ></div>
`;

const Loading = () => html`<div>Loading...</div>`;

/** @type {(props: MuxProps) => PersistentFragment} */
const VodChromeSmall = (props) => html`
  <div
    slot="centered-chrome"
    style="--media-background-color: transparent; --media-control-background: transparent; --media-control-hover-background: transparent; --media-button-icon-width: 100%; width: 100%; display: flex; flex-flow: row; align-items: center; justify-content: center;"
  >
    ${renderable(
      'center',
      /** @type {(props: MuxProps) => PersistentFragment} */
      ({ showLoading }) =>
        showLoading
          ? Loading()
          : html`<media-seek-backward-button
                style="padding: 0; width: 20%"
              ></media-seek-backward-button>
              <media-play-button
                style="padding: 0; width: 20%"
              ></media-play-button>
              <media-seek-forward-button
                style="padding: 0; width: 20%"
              ></media-seek-forward-button>`,
      props
    )}
  </div>
  <media-control-bar>
    <media-time-range></media-time-range>
    <media-time-display show-duration remaining></media-time-display>
  </media-control-bar>
  <media-control-bar>
    <media-mute-button></media-mute-button>
    <media-volume-range></media-volume-range>
    ${Spacer()}
    ${renderable(
      'captionsButton',
      /** @type {(props: MuxProps) => PersistentFragment | boolean} */
      ({ hasCaptions }) =>
        hasCaptions && html`<media-captions-button></media-captions-button>`,
      props
    )}
    <media-pip-button></media-pip-button>
    <media-fullscreen-button></media-fullscreen-button>
  </media-control-bar>
`;

/** @type {(props: MuxProps) => PersistentFragment} */
const VodChromeLarge = (props) => html`
  <div
    slot="centered-chrome"
    style="--media-background-color: transparent; --media-control-background: transparent; --media-control-hover-background: transparent; --media-button-icon-width: 100%; width: 100%; display: flex; flex-flow: row; align-items: center; justify-content: center;"
  >
    ${renderable(
      'center',
      /** @type {(props: MuxProps) => PersistentFragment} */
      ({ showLoading }) =>
        showLoading
          ? Loading()
          : html` <media-play-button
              style="padding: 0; width: 20%"
            ></media-play-button>`,
      props
    )}
  </div>
  <media-control-bar>
    <media-play-button></media-play-button>
    <media-seek-backward-button></media-seek-backward-button>
    <media-seek-forward-button></media-seek-forward-button>
    <media-mute-button></media-mute-button>
    <media-volume-range></media-volume-range>
    <media-time-range></media-time-range>
    <media-time-display show-duration remaining></media-time-display>
    <media-playback-rate-button></media-playback-rate-button>
    ${renderable(
      'captionsButton',
      /** @type {(props: MuxProps) => PersistentFragment | boolean} */
      ({ hasCaptions }) =>
        hasCaptions && html`<media-captions-button></media-captions-button>`,
      props
    )}
    <media-pip-button></media-pip-button>
    <media-fullscreen-button></media-fullscreen-button>
  </media-control-bar>
`;

/** @type {(props: MuxProps) => PersistentFragment} */
const LiveChromeSmall = (props) => html`
  <div
    slot="centered-chrome"
    style="--media-background-color: transparent; --media-control-background: transparent; --media-control-hover-background: transparent; --media-button-icon-width: 100%; width: 100%; display: flex; flex-flow: row; align-items: center; justify-content: center;"
  >
    ${renderable(
      'center',
      /** @type {(props: MuxProps) => PersistentFragment} */
      ({ showLoading }) =>
        showLoading
          ? Loading()
          : html`<media-play-button
              style="padding: 0; width: 20%"
            ></media-play-button>`,
      props
    )}
  </div>
  <media-control-bar>
    <media-mute-button></media-mute-button>
    <media-volume-range></media-volume-range>
    ${Spacer()}
    ${renderable(
      'captionsButton',
      /** @type {(props: MuxProps) => PersistentFragment | boolean} */
      ({ hasCaptions }) =>
        hasCaptions && html`<media-captions-button></media-captions-button>`,
      props
    )}
    <media-pip-button></media-pip-button>
    <media-fullscreen-button></media-fullscreen-button>
  </media-control-bar>
`;

/** @type {(props: MuxProps) => PersistentFragment} */
const LiveChromeLarge = (props) => html`
  <div
    slot="centered-chrome"
    style="--media-background-color: transparent; --media-control-background: transparent; --media-control-hover-background: transparent; --media-button-icon-width: 100%; width: 100%; display: flex; flex-flow: row; align-items: center; justify-content: center;"
  >
    ${renderable(
      'center',
      /** @type {(props: MuxProps) => PersistentFragment} */
      ({ showLoading }) =>
        showLoading
          ? Loading()
          : html` <media-play-button
              style="padding: 0; width: 20%"
            ></media-play-button>`,
      props
    )}
  </div>
  <media-control-bar>
    <media-play-button></media-play-button>
    <media-mute-button></media-mute-button>
    <media-volume-range></media-volume-range>
    ${Spacer()}
    <media-time-display></media-time-display>
    ${renderable(
      'captionsButton',
      /** @type {(props: MuxProps) => PersistentFragment | boolean} */
      ({ hasCaptions }) =>
        hasCaptions && html`<media-captions-button></media-captions-button>`,
      props
    )}
    <media-pip-button></media-pip-button>
    <media-fullscreen-button></media-fullscreen-button>
  </media-control-bar>
`;

const SMALL_BREAKPOINT = 700;
const MediaChromeSizes = {
  LG: 'large',
  SM: 'small',
};

/** @type {(el: Element) => string} */
function getPlayerSize(el) {
  const muxPlayerRect = el.getBoundingClientRect();
  return muxPlayerRect.width < SMALL_BREAKPOINT
    ? MediaChromeSizes.SM
    : MediaChromeSizes.LG;
}

/**
 * @typedef {{
 *   debug: boolean,
 *   envKey?: string,
 *   playbackId?: string,
 *   streamType?: string,
 *   startTime: number,
 *   playerSize: string,
 *   hasCaptions: boolean,
 *   showLoading: boolean,
 *   poster?: string,
 *   muted?: boolean,
 *   loop?: boolean,
 *   autoplay?: boolean,
 *   preferMse?: boolean,
 *   metadata?: Metadata
 * }} MuxProps
 */

/**
 * @param  {MuxPlayerElement} el
 * @param  {MuxProps} [props]
 * @return {MuxProps}
 */
function getProps(el, props) {
  return {
    debug: el.debug,
    envKey: el.envKey,
    playbackId: el.playbackId,
    startTime: el.startTime,
    streamType: el.streamType,
    playerSize: getPlayerSize(el),
    hasCaptions: !!getCcSubTracks(el).length,
    showLoading: showLoading(el),
    ...props,
  };
}

/** @type {(el: MuxPlayerElement) => boolean} */
const showLoading = (el) =>
  !el.video?.paused && (el.video?.readyState ?? 0) < 3;

/** @type {(el: MuxPlayerElement, name: string) => ?string} */
function getVideoAttribute(el, name) {
  return el.video ? el.video.getAttribute(name) : el.getAttribute(name);
}

/** @type {(el: MuxPlayerElement) => TextTrack[]} */
function getCcSubTracks(el) {
  return el.video
    ? Array.from(el.video.textTracks).filter(
        ({ kind }) => kind === 'subtitles' || kind === 'captions'
      )
    : [];
}

class MuxPlayerInternal {
  /**
   * Create a MuxPlayerInternal instance.
   * Properties used in this class are not exposed in the public API.
   * @param  {MuxPlayerElement} el
   */
  constructor(el) {
    this.el = el;

    let muxPlayer = MuxPlayer(getProps(el));
    this._chromeRenderer = muxPlayer.fragments.chromeRenderer;
    this._captionsButton = this._chromeRenderer.fragments.captionsButton;
    this._center = this._chromeRenderer.fragments.center;

    el.attachShadow({ mode: 'open' });
    el.shadowRoot?.append(...muxPlayer.childNodes);

    el.querySelectorAll(':scope > track').forEach((track) => {
      el.video?.append(track.cloneNode());
    });

    // Initialize all the attribute properties
    // The attributeChangedCallback should handle forwarding the video attributes
    // from the mux-player to the mux-video element.
    Array.prototype.forEach.call(el.attributes, (attrNode) => {
      el.attributeChangedCallback(attrNode.name, null, attrNode.value);
    });

    // Neither Chrome or Firefox support setting the muted attribute
    // after using document.createElement.
    // One way to get around this would be to build the native tag as a string.
    // But just fixing it manually for now.
    if (el.video) {
      el.video.muted = el.video.defaultMuted;
    }

    if (el.video?.hls) {
      /** @type {*} */
      const Hls = el.video.hls.constructor;

      // Temporarily here to load less segments on page load, remove later!!!!
      el.video.hls.config.maxMaxBufferLength = 2;

      if (el.autoplay) {
        el.video.hls.on(Hls.Events.MANIFEST_PARSED, () => {
          var playPromise = el.video?.play();
          if (playPromise) {
            playPromise.catch((error) => {
              console.log(`${error.name} ${error.message}`);
              if (error.name === 'NotAllowedError') {
                console.log('Attempting to play with video muted');
                if (el.video) el.video.muted = true;
                return el.video?.play();
              }
            });
          }
        });
      }
    }

    /** @type {number?} */
    let timeout;
    const onLoadingStateChange = () => {
      if (!timeout && showLoading(el)) {
        timeout = setTimeout(
          () => this._center.render({ showLoading: showLoading(el) }),
          500
        );
      } else if (timeout && !showLoading(el)) {
        clearTimeout(timeout);
        timeout = null;
        this._center.render({ showLoading: false });
      }
    };

    el.video?.addEventListener('waiting', onLoadingStateChange);
    el.video?.addEventListener('playing', onLoadingStateChange);

    const onTrackCountChange = () => {
      const ccSubTracks = getCcSubTracks(el);
      this._captionsButton.render({ hasCaptions: !!ccSubTracks.length });

      // NOTE: This is a hack solution to "default" CC selection. Solution *should*
      // be better default state support in media-chrome (CJP).
      if (el.defaultShowCaptions && ccSubTracks.length && el.video) {
        const [ccSubTrack] = ccSubTracks;
        const eventType =
          ccSubTrack.kind === 'captions'
            ? 'mediashowcaptionsrequest'
            : 'mediashowsubtitlesrequest';
        const showCCSubEvent = new CustomEvent(eventType, {
          composed: true,
          bubbles: true,
          detail: ccSubTrack,
        });
        el.video?.dispatchEvent(showCCSubEvent);
      }
    };

    el.video?.textTracks.addEventListener('addtrack', onTrackCountChange);
    el.video?.textTracks.addEventListener('removetrack', onTrackCountChange);
  }

  connectedCallback() {
    this._renderChrome();
    this._initResizing();
  }

  disconnectedCallback() {
    this._deinitResizing();
  }

  _renderChrome() {
    if (this._playerSize != getPlayerSize(this.el)) {
      this._playerSize = getPlayerSize(this.el);
      this._chromeRenderer.render(getProps(this.el));
      // Get the references to the new child fragments.
      this._captionsButton = this._chromeRenderer.fragments.captionsButton;
      this._center = this._chromeRenderer.fragments.center;
    }
  }

  _initResizing() {
    this._resizeObserver = new ResizeObserver(() => this._renderChrome());
    this._resizeObserver.observe(this.el);
  }

  _deinitResizing() {
    this._resizeObserver?.disconnect();
  }
}

// Until real private properties are supported create private internals.
const internals = new WeakMap();

class MuxPlayerElement extends VideoApiElement {
  static get observedAttributes() {
    return [
      ...(VideoApiElement.observedAttributes ?? []),
      ...MuxVideoAttributeNames,
    ];
  }

  constructor() {
    super();
    internals.set(this, new MuxPlayerInternal(this));
  }

  connectedCallback() {
    internals.get(this).connectedCallback();
  }

  disconnectedCallback() {
    internals.get(this).disconnectedCallback();
  }

  /**
   * @param  {string} attrName
   * @param  {string | null} oldValue
   * @param  {string} newValue
   */
  attributeChangedCallback(attrName, oldValue, newValue) {
    super.attributeChangedCallback(attrName, oldValue, newValue);

    if (MuxVideoAttributeNames.includes(attrName)) {
      this.video?.setAttribute(attrName, newValue);
    }
  }

  get defaultShowCaptions() {
    return this.getAttribute(PlayerAttributes.DEFAULT_SHOW_CAPTIONS) || true;
  }

  get playerSoftwareName() {
    return playerSoftwareName;
  }

  get playerSoftwareVersion() {
    return playerSoftwareVersion;
  }

  get hls() {
    return this.video?.hls;
  }

  get mux() {
    return this.video?.mux;
  }

  /**
   * Get Mux asset playback id.
   * @return {string | undefined}
   */
  get playbackId() {
    return getVideoAttribute(this, MuxVideoAttributes.PLAYBACK_ID) ?? undefined;
  }

  /**
   * Mux Data env key
   * @return {string | undefined}
   */
  get envKey() {
    return getVideoAttribute(this, MuxVideoAttributes.ENV_KEY) ?? undefined;
  }

  /**
   * Get video engine debug flag.
   * @return {boolean}
   */
  get debug() {
    return getVideoAttribute(this, MuxVideoAttributes.DEBUG) != null;
  }

  /**
   * Set video engine debug flag.
   * @param  {boolean} val
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
   * @return {string | undefined}
   */
  get streamType() {
    return getVideoAttribute(this, MuxVideoAttributes.STREAM_TYPE) ?? undefined;
  }

  /**
   * Set stream type.
   * @param  {string | undefined} val
   */
  set streamType(val) {
    if (val) {
      this.setAttribute(MuxVideoAttributes.STREAM_TYPE, val);
    } else {
      this.removeAttribute(MuxVideoAttributes.STREAM_TYPE);
    }
  }

  /**
   * Get the start time.
   * @return {number}
   */
  get startTime() {
    return Number(getVideoAttribute(this, MuxVideoAttributes.START_TIME));
  }

  /**
   * Set the start time.
   * @param  {number} val
   */
  set startTime(val) {
    if (val == null) {
      this.removeAttribute(MuxVideoAttributes.START_TIME);
    } else {
      this.setAttribute(MuxVideoAttributes.START_TIME, `${val}`);
    }
  }

  /**
   * Get the preference flag for using media source.
   * @return {boolean}
   */
  get preferMse() {
    return getVideoAttribute(this, MuxVideoAttributes.PREFER_MSE) != null;
  }

  /**
   * Set the preference flag for using media source.
   * @param  {boolean} val
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
   * @return {Metadata | undefined}
   */
  get metadata() {
    return this.video?.metadata;
  }

  /**
   * Set the metadata object for Mux Data.
   * @param  {Metadata | undefined} val
   */
  set metadata(val) {
    if (this.video) this.video.metadata = val;
  }
}

/** @TODO Refactor once using `globalThis` polyfills */
if (!globalThis.customElements.get('mux-player')) {
  globalThis.customElements.define('mux-player', MuxPlayerElement);
  /** @TODO consider externalizing this (breaks standard modularity) */
  /** @type {any} */
  (globalThis).MuxPlayerElement = MuxPlayerElement;
}

export default MuxPlayerElement;
