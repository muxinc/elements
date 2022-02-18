import "media-chrome";
import "@mux-elements/mux-video";
import MxpDialog from "./dialog";
import VideoApiElement from "./video-api";
import {
  getCcSubTracks,
  getPlayerVersion,
  hasVolumeSupportAsync,
  MediaError,
} from "./helpers";
import { template } from "./template";
import { render } from "./html";
import { toNumberOrUndefined } from "./utils";

import type { MuxTemplateProps } from "./types";
import type { Metadata } from "@mux-elements/playback-core";

class MuxPlayerInternal {
  el: MuxPlayerElement;
  _resizeObserver?: ResizeObserver;
  _state: Partial<MuxTemplateProps> = {
    isDialogOpen: false,
    supportsAirPlay: false,
    supportsVolume: false,
  };

  /**
   * Create a MuxPlayerInternal instance.
   * Properties used in this class are not exposed in the public API.
   */
  constructor(el: MuxPlayerElement) {
    this.el = el;

    el.attachShadow({ mode: "open" });
    this._setState({ playerSize: getPlayerSize(this.el) });

    el.querySelectorAll(":scope > track").forEach((track) => {
      el.video?.append(track.cloneNode());
    });

    // Initialize all the attribute properties
    // The attributeChangedCallback should handle forwarding the video attributes
    // from the mux-player to the mux-video element.
    Array.prototype.forEach.call(el.attributes, (attrNode) => {
      el.attributeChangedCallback(attrNode.name, null, attrNode.value);
    });

    /**
     * @todo determine sensible defaults for preloading buffer
     * @see https://github.com/muxinc/elements/issues/51
     */
    // if (el.video?.hls) {
    //   // Temporarily here to load less segments on page load, remove later!!!!
    //   el.video.hls.config.maxMaxBufferLength = 2;
    // }

    this._setUpErrors(el);
    this._setUpMutedAutoplay(el);
    this._setUpCaptionsButton(el);
    this._setUpAirplayButton(el);
    this._setUpVolumeRange(el);
  }

  connectedCallback() {
    this._renderChrome();
    this._initResizing();
  }

  disconnectedCallback() {
    this._deinitResizing();
  }

  _setState(newState: Record<string, any>) {
    Object.assign(this._state, newState);
    this._render();
  }

  _render() {
    render(
      template(getProps(this.el, this._state)),
      this.el.shadowRoot as Node
    );
  }

  _renderChrome() {
    if (this._state.playerSize != getPlayerSize(this.el)) {
      this._setState({ playerSize: getPlayerSize(this.el) });
    }
  }

  _initResizing() {
    this._resizeObserver = new ResizeObserver(() => this._renderChrome());
    this._resizeObserver.observe(this.el);
  }

  _deinitResizing() {
    this._resizeObserver?.disconnect();
  }

  _setUpErrors(el: MuxPlayerElement) {
    const onError = (event: Event) => {
      let { detail: error }: { detail: any } = event as CustomEvent;

      if (!(error instanceof MediaError)) {
        error = new MediaError(error.message, error.code, error.fatal);
      }

      // Don't show an error dialog if it's not fatal.
      if (!error?.fatal) {
        return;
      }

      let dialog;
      switch (error.code) {
        case MediaError.MEDIA_ERR_NETWORK:
          dialog = {
            title: "Network Error",
            message: `${error.message} Please reload the player and try again.`,
          };
          break;
        case MediaError.MEDIA_ERR_DECODE:
          dialog = {
            title: "Media Error",
            message: `${error.message} Please reload the player and try again.`,
          };
          break;
        case MediaError.MEDIA_ERR_SRC_NOT_SUPPORTED:
          dialog = {
            title: "Source Not Supported",
            message: error.message,
          };
          break;
        default:
          dialog = {
            title: "Error",
            message: error.message,
          };
          break;
      }

      this._setState({ isDialogOpen: true, dialog });
    };

    el.addEventListener("error", onError);

    el.video?.addEventListener("error", () => {
      const { message, code } = el.video?.error ?? {};
      el.dispatchEvent(
        new CustomEvent("error", {
          detail: new MediaError(message, code),
        })
      );
    });

    if (el.video?.hls) {
      const Hls: any = el.video.hls.constructor;
      const onHlsError = (_event: any, data: any) => {
        const errorCodeMap = {
          [Hls.ErrorTypes.NETWORK_ERROR]: MediaError.MEDIA_ERR_NETWORK,
          [Hls.ErrorTypes.MEDIA_ERROR]: MediaError.MEDIA_ERR_DECODE,
        };
        const error = new MediaError("", errorCodeMap[data.type]);
        error.fatal = data.fatal;
        error.data = data;
        el.dispatchEvent(
          new CustomEvent("error", {
            detail: error,
          })
        );
      };
      el.video.hls.on(Hls.Events.ERROR, onHlsError);
    }
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
                return el.video?.play().catch(console.error);
              }
            });
          }
        });
      }
    }
  }

  _setUpCaptionsButton(el: MuxPlayerElement) {
    const onTrackCountChange = () => this._render();
    el.video?.textTracks?.addEventListener("addtrack", onTrackCountChange);
    el.video?.textTracks?.addEventListener("removetrack", onTrackCountChange);
  }

  _setUpAirplayButton(el: MuxPlayerElement) {
    if (!!(globalThis as any).WebKitPlaybackTargetAvailabilityEvent) {
      const onPlaybackTargetAvailability = (evt: any) => {
        const supportsAirPlay = evt.availability === "available";
        this._setState({ supportsAirPlay });
      };

      el.video?.addEventListener(
        "webkitplaybacktargetavailabilitychanged",
        onPlaybackTargetAvailability
      );
    }
  }

  async _setUpVolumeRange(el: MuxPlayerElement) {
    const supportsVolume = await hasVolumeSupportAsync();
    this._setState({ supportsVolume });
  }
}

const SMALL_BREAKPOINT = 700;
const XSMALL_BREAKPOINT = 300;
const MediaChromeSizes = {
  LG: "large",
  SM: "small",
  XS: "extra-small",
};

function getPlayerSize(el: Element) {
  const muxPlayerRect = el.getBoundingClientRect();
  return muxPlayerRect.width < XSMALL_BREAKPOINT
    ? MediaChromeSizes.XS
    : muxPlayerRect.width < SMALL_BREAKPOINT
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
  PRIMARY_COLOR: "primary-color",
  SECONDARY_COLOR: "secondary-color",
  FORWARD_SEEK_OFFSET: "forward-seek-offset",
  BACKWARD_SEEK_OFFSET: "backward-seek-offset",
};

function getProps(el: MuxPlayerElement, state?: any): MuxTemplateProps {
  return {
    debug: el.debug,
    muted: el.muted,
    envKey: el.envKey,
    playbackId: el.playbackId,
    poster: el.poster,
    metadata: el.metadata,
    startTime: el.startTime,
    preferMse: el.preferMse,
    streamType: el.streamType,
    primaryColor: el.primaryColor,
    secondaryColor: el.secondaryColor,
    forwardSeekOffset: el.forwardSeekOffset,
    backwardSeekOffset: el.backwardSeekOffset,
    defaultShowCaptions: el.defaultShowCaptions,
    playerSize: getPlayerSize(el),
    hasCaptions: !!getCcSubTracks(el).length,
    ...state,
  };
}

const MuxVideoAttributeNames = Object.values(MuxVideoAttributes);
const PlayerAttributeNames = Object.values(PlayerAttributes);
const playerSoftwareVersion = getPlayerVersion();
const playerSoftwareName = "mux-player";

// Until real private properties are supported create private internals.
const internals = new WeakMap();

class MuxPlayerElement extends VideoApiElement {
  static get observedAttributes() {
    return [
      ...(VideoApiElement.observedAttributes ?? []),
      ...MuxVideoAttributeNames,
      ...PlayerAttributeNames,
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
      if (newValue === null) {
        this.video?.removeAttribute(attrName);
      } else {
        this.video?.setAttribute(attrName, newValue);
      }
    }
  }

  get primaryColor() {
    return this.getAttribute(PlayerAttributes.PRIMARY_COLOR);
  }

  get secondaryColor() {
    return this.getAttribute(PlayerAttributes.SECONDARY_COLOR);
  }

  get forwardSeekOffset() {
    return (
      toNumberOrUndefined(
        this.getAttribute(PlayerAttributes.FORWARD_SEEK_OFFSET)
      ) ?? 10
    );
  }

  get backwardSeekOffset() {
    return (
      toNumberOrUndefined(
        this.getAttribute(PlayerAttributes.BACKWARD_SEEK_OFFSET)
      ) ?? 10
    );
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
    return toNumberOrUndefined(
      getVideoAttribute(this, MuxVideoAttributes.START_TIME)
    );
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
