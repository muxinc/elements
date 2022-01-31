import "media-chrome";
import "@mux-elements/mux-video";
import VideoApiElement from "./video-api.js";
import { getCcSubTracks, getPlayerVersion } from "./helpers.js";
import { template } from "./template.js";

/** @typedef { import("./utils").PersistentFragment } PersistentFragment */
/** @typedef { import("./utils").RenderableFragment } RenderableFragment */
/** @typedef { import('@mux-elements/playback-core').Metadata } Metadata */

/** @type {(el: MuxPlayerElement) => boolean} */
const showLoading = (el) =>
  !el.video?.paused && (el.video?.readyState ?? 0) < 3;

class MuxPlayerInternal {
  /**
   * Create a MuxPlayerInternal instance.
   * Properties used in this class are not exposed in the public API.
   * @param  {MuxPlayerElement} el
   */
  constructor(el) {
    this.el = el;

    let muxPlayer = template(getProps(el));
    this._chromeRenderer = muxPlayer.fragments.chromeRenderer;
    this._captionsButton = this._chromeRenderer.fragments.captionsButton;
    this._center = this._chromeRenderer.fragments.center;

    el.attachShadow({ mode: "open" });
    el.shadowRoot?.append(...muxPlayer.childNodes);

    el.querySelectorAll(":scope > track").forEach((track) => {
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
      // Temporarily here to load less segments on page load, remove later!!!!
      el.video.hls.config.maxMaxBufferLength = 2;
    }

    this._setUpMutedAutoplay(el);
    this._setUpLoadingIndicator(el);
    this._setUpCaptionsButton(el);
  }

  connectedCallback() {
    this._renderChrome();
    this._initResizing();
  }

  disconnectedCallback() {
    this._deinitResizing();
  }

  /** @param {MuxPlayerElement} el */
  _setUpMutedAutoplay(el) {
    if (el.video?.hls) {
      /** @type {*} */
      const Hls = el.video.hls.constructor;
      if (el.autoplay) {
        el.video.hls.on(Hls.Events.MANIFEST_PARSED, () => {
          var playPromise = el.video?.play();
          if (playPromise) {
            playPromise.catch((error) => {
              console.log(`${error.name} ${error.message}`);
              if (error.name === "NotAllowedError") {
                console.log("Attempting to play with video muted");
                if (el.video) el.video.muted = true;
                return el.video?.play();
              }
            });
          }
        });
      }
    }
  }

  /** @param {MuxPlayerElement} el */
  _setUpLoadingIndicator(el) {
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

    el.video?.addEventListener("waiting", onLoadingStateChange);
    el.video?.addEventListener("playing", onLoadingStateChange);
  }

  /** @param {MuxPlayerElement} el */
  _setUpCaptionsButton(el) {
    const onTrackCountChange = () => {
      const ccSubTracks = getCcSubTracks(el);
      this._captionsButton.render({ hasCaptions: !!ccSubTracks.length });

      // NOTE: This is a hack solution to "default" CC selection. Solution *should*
      // be better default state support in media-chrome (CJP).
      if (el.defaultShowCaptions && ccSubTracks.length && el.video) {
        const [ccSubTrack] = ccSubTracks;
        const eventType =
          ccSubTrack.kind === "captions"
            ? "mediashowcaptionsrequest"
            : "mediashowsubtitlesrequest";
        const showCCSubEvent = new CustomEvent(eventType, {
          composed: true,
          bubbles: true,
          detail: ccSubTrack,
        });
        el.video?.dispatchEvent(showCCSubEvent);
      }
    };

    el.video?.textTracks?.addEventListener("addtrack", onTrackCountChange);
    el.video?.textTracks?.addEventListener("removetrack", onTrackCountChange);
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

/**
 * @typedef {{
 *   debug: boolean,
 *   envKey: string?,
 *   playbackId: string?,
 *   streamType: string?,
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

const SMALL_BREAKPOINT = 700;
const MediaChromeSizes = {
  LG: "large",
  SM: "small",
};

/** @type {(el: Element) => string} */
function getPlayerSize(el) {
  const muxPlayerRect = el.getBoundingClientRect();
  return muxPlayerRect.width < SMALL_BREAKPOINT
    ? MediaChromeSizes.SM
    : MediaChromeSizes.LG;
}

const MuxVideoAttributes = {
  ENV_KEY: "env-key",
  DEBUG: "debug",
  PLAYBACK_ID: "playback-id",
  METADATA_URL: "metadata-url",
  PREFER_MSE: "prefer-mse",
  METADATA_VIDEO_ID: "metadata-video-id",
  METADATA_VIDEO_TITLE: "metadata-video-title",
  METADATA_VIEWER_USER_ID: "metadata-viewer-user-id",
  BEACON_DOMAIN: "beacon-domain",
  TYPE: "type",
  STREAM_TYPE: "stream-type",
  START_TIME: "start-time",
};

const PlayerAttributes = {
  DEFAULT_SHOW_CAPTIONS: "default-show-captions",
};

const MuxVideoAttributeNames = Object.values(MuxVideoAttributes);
const playerSoftwareVersion = getPlayerVersion();
const playerSoftwareName = "mux-player";

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
   * @return {string?}
   */
  get playbackId() {
    return getVideoAttribute(this, MuxVideoAttributes.PLAYBACK_ID);
  }

  /**
   * Mux Data env key
   * @return {string?}
   */
  get envKey() {
    return getVideoAttribute(this, MuxVideoAttributes.ENV_KEY);
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
      this.setAttribute(MuxVideoAttributes.DEBUG, "");
    } else {
      this.removeAttribute(MuxVideoAttributes.DEBUG);
    }
  }

  /**
   * Get stream type.
   * @return {string?}
   */
  get streamType() {
    return getVideoAttribute(this, MuxVideoAttributes.STREAM_TYPE);
  }

  /**
   * Set stream type.
   * @param  {string?} val
   */
  set streamType(val) {
    this.setAttribute(MuxVideoAttributes.STREAM_TYPE, `${val}`);
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
    this.setAttribute(MuxVideoAttributes.START_TIME, `${val}`);
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
      this.setAttribute(MuxVideoAttributes.PREFER_MSE, "");
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

/** @type {(el: MuxPlayerElement, name: string) => ?string} */
export function getVideoAttribute(el, name) {
  return el.video ? el.video.getAttribute(name) : el.getAttribute(name);
}

/** @TODO Refactor once using `globalThis` polyfills */
if (!globalThis.customElements.get("mux-player")) {
  globalThis.customElements.define("mux-player", MuxPlayerElement);
  /** @TODO consider externalizing this (breaks standard modularity) */
  /** @type {any} */
  (globalThis).MuxPlayerElement = MuxPlayerElement;
}

export default MuxPlayerElement;
