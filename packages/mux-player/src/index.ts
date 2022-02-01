import "media-chrome";
import "@mux-elements/mux-video";
import VideoApiElement from "./video-api";
import { getCcSubTracks, getPlayerVersion } from "./helpers";
import { template } from "./template";

import type { MuxTemplateProps } from "./types";
import type { Metadata } from "@mux-elements/playback-core";
import type { PersistentFragment } from "./utils";
import type { RenderableFragment } from "./utils";

const showLoading = (el: MuxPlayerElement) =>
  !el.video?.paused && (el.video?.readyState ?? 0) < 3;

class MuxPlayerInternal {
  el: MuxPlayerElement;
  _chromeRenderer: RenderableFragment;
  _captionsButton: RenderableFragment;
  _airplayButton: RenderableFragment;
  _playerSize?: string;
  _resizeObserver?: ResizeObserver;

  /**
   * Create a MuxPlayerInternal instance.
   * Properties used in this class are not exposed in the public API.
   */
  constructor(el: MuxPlayerElement) {
    this.el = el;

    let muxPlayer = template(getProps(el));
    this._chromeRenderer = muxPlayer.fragments.chromeRenderer;
    this._captionsButton = this._chromeRenderer.fragments.captionsButton;
    this._airplayButton = this._chromeRenderer.fragments.airplayButton;

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
    this._setUpCaptionsButton(el);
    this._setUpAirplayButton(el);
  }

  connectedCallback() {
    this._renderChrome();
    this._initResizing();
  }

  disconnectedCallback() {
    this._deinitResizing();
  }

  _setUpMutedAutoplay(el: MuxPlayerElement) {
    if (el.video?.hls) {
      const Hls: any = el.video.hls.constructor;
      if (el.autoplay) {
        el.video.hls.on(Hls.Events.MANIFEST_PARSED, () => {
          var playPromise = el.video?.play();
          if (playPromise) {
            playPromise.catch((error: Error) => {
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

  _setUpCaptionsButton(el: MuxPlayerElement) {
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

  _setUpAirplayButton(el: MuxPlayerElement) {
    if (!!(globalThis as any).WebKitPlaybackTargetAvailabilityEvent) {
      const onPlaybackTargetAvailability = (evt: any) => {
        const supportsAirPlay = evt.availability === "available";
        this._airplayButton.render({ supportsAirPlay });
      };

      el.video?.addEventListener(
        "webkitplaybacktargetavailabilitychanged",
        onPlaybackTargetAvailability
      );
    }
  }

  _renderChrome() {
    if (this._playerSize != getPlayerSize(this.el)) {
      this._playerSize = getPlayerSize(this.el);
      this._chromeRenderer.render(getProps(this.el));
      // Get the references to the new child fragments.
      this._captionsButton = this._chromeRenderer.fragments.captionsButton;
      this._airplayButton = this._chromeRenderer.fragments.airplayButton;
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

function getProps(el: MuxPlayerElement, props?: any): MuxTemplateProps {
  return {
    debug: el.debug,
    envKey: el.envKey,
    playbackId: el.playbackId,
    poster: el.poster,
    startTime: el.startTime,
    streamType: el.streamType,
    playerSize: getPlayerSize(el),
    hasCaptions: !!getCcSubTracks(el).length,
    showLoading: showLoading(el),
    supportsAirPlay: false,
    ...props,
  };
}

const SMALL_BREAKPOINT = 700;
const MediaChromeSizes = {
  LG: "large",
  SM: "small",
};

function getPlayerSize(el: Element) {
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

  attributeChangedCallback(
    attrName: string,
    oldValue: string | null,
    newValue: string
  ) {
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

export function getVideoAttribute(el: MuxPlayerElement, name: string) {
  return el.video ? el.video.getAttribute(name) : el.getAttribute(name);
}

/** @TODO Refactor once using `globalThis` polyfills */
if (!globalThis.customElements.get("mux-player")) {
  globalThis.customElements.define("mux-player", MuxPlayerElement);
  /** @TODO consider externalizing this (breaks standard modularity) */
  (globalThis as any).MuxPlayerElement = MuxPlayerElement;
}

export default MuxPlayerElement;
