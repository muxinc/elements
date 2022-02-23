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

export type Tokens = {
  playback?: string;
  thumbnail?: string;
  storyboard?: string;
};

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
  PLAYER_SOFTWARE_VERSION: "player-software-version",
  PLAYER_SOFTWARE_NAME: "player-software-name",
  METADATA_VIDEO_ID: "metadata-video-id",
  METADATA_VIDEO_TITLE: "metadata-video-title",
  METADATA_VIEWER_USER_ID: "metadata-viewer-user-id",
  BEACON_DOMAIN: "beacon-domain",
  TYPE: "type",
  STREAM_TYPE: "stream-type",
  START_TIME: "start-time",
};

const PlayerAttributes = {
  DEFAULT_HIDDEN_CAPTIONS: "default-hidden-captions",
  PRIMARY_COLOR: "primary-color",
  SECONDARY_COLOR: "secondary-color",
  FORWARD_SEEK_OFFSET: "forward-seek-offset",
  BACKWARD_SEEK_OFFSET: "backward-seek-offset",
  PLAYBACK_TOKEN: "playback-token",
  THUMBNAIL_TOKEN: "thumbnail-token",
  STORYBOARD_TOKEN: "storyboard-token",
};

function getProps(el: MuxPlayerElement, state?: any): MuxTemplateProps {
  return {
    // Give priority to playbackId derrived asset URL's if playbackId is set.
    src: !el.playbackId && el.src,
    poster: !el.playbackId && el.poster,
    debug: el.debug,
    autoplay: el.autoplay,
    muted: el.muted,
    envKey: el.envKey,
    playbackId: el.playbackId,
    tokens: el.tokens,
    metadata: el.metadata,
    playerSoftwareName: el.playerSoftwareName,
    playerSoftwareVersion: el.playerSoftwareVersion,
    startTime: el.startTime,
    preferMse: el.preferMse,
    streamType: el.streamType,
    primaryColor: el.primaryColor,
    secondaryColor: el.secondaryColor,
    forwardSeekOffset: el.forwardSeekOffset,
    backwardSeekOffset: el.backwardSeekOffset,
    defaultHiddenCaptions: el.defaultHiddenCaptions,
    playerSize: getPlayerSize(el),
    hasCaptions: !!getCcSubTracks(el).length,
    ...state,
  };
}

const MuxVideoAttributeNames = Object.values(MuxVideoAttributes);
const PlayerAttributeNames = Object.values(PlayerAttributes);
const playerSoftwareVersion = getPlayerVersion();
const playerSoftwareName = "mux-player";

class MuxPlayerElement extends VideoApiElement {
  #tokens = {};
  #resizeObserver?: ResizeObserver;
  #state: Partial<MuxTemplateProps> = {
    isDialogOpen: false,
    supportsAirPlay: false,
    supportsVolume: false,
  };

  static get observedAttributes() {
    return [
      ...(VideoApiElement.observedAttributes ?? []),
      ...MuxVideoAttributeNames,
      ...PlayerAttributeNames,
    ];
  }

  constructor() {
    super();

    this.attachShadow({ mode: "open" });
    this.#setState({ playerSize: getPlayerSize(this) });

    this.querySelectorAll(":scope > track").forEach((track) => {
      this.video?.append(track.cloneNode());
    });

    // Initialize all the attribute properties
    // The attributeChangedCallback should handle forwarding the video attributes
    // from the mux-player to the mux-video element.
    Array.prototype.forEach.call(this.attributes, (attrNode) => {
      this.attributeChangedCallback(attrNode.name, null, attrNode.value);
    });

    /**
     * @todo determine sensible defaults for preloading buffer
     * @see https://github.com/muxinc/elements/issues/51
     */
    // if (el.video?.hls) {
    //   // Temporarily here to load less segments on page load, remove later!!!!
    //   el.video.hls.config.maxMaxBufferLength = 2;
    // }

    this.#setUpErrors();
    this.#setUpLiveFirstPlay();
    this.#setUpMutedAutoplay();
    this.#setUpCaptionsButton();
    this.#setUpAirplayButton();
    this.#setUpVolumeRange();
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

  #render() {
    render(template(getProps(this, this.#state)), this.shadowRoot as Node);
  }

  #renderChrome() {
    if (this.#state.playerSize != getPlayerSize(this)) {
      this.#setState({ playerSize: getPlayerSize(this) });
    }
  }

  #initResizing() {
    this.#resizeObserver = new ResizeObserver(() => this.#renderChrome());
    this.#resizeObserver.observe(this);
  }

  #deinitResizing() {
    this.#resizeObserver?.disconnect();
  }

  #setUpErrors() {
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

      this.#setState({ isDialogOpen: true, dialog });
    };

    this.addEventListener("error", onError);

    this.video?.addEventListener("error", () => {
      const { message, code } = this.video?.error ?? {};
      this.dispatchEvent(
        new CustomEvent("error", {
          detail: new MediaError(message, code),
        })
      );
    });

    if (this.video?.hls) {
      const Hls: any = this.video.hls.constructor;
      const onHlsError = (_event: any, data: any) => {
        const errorCodeMap = {
          [Hls.ErrorTypes.NETWORK_ERROR]: MediaError.MEDIA_ERR_NETWORK,
          [Hls.ErrorTypes.MEDIA_ERROR]: MediaError.MEDIA_ERR_DECODE,
        };
        const error = new MediaError("", errorCodeMap[data.type]);
        error.fatal = data.fatal;
        error.data = data;
        this.dispatchEvent(
          new CustomEvent("error", {
            detail: error,
          })
        );
      };
      this.video.hls.on(Hls.Events.ERROR, onHlsError);
    }
  }

  #setUpLiveFirstPlay() {
    if (this.video?.hls) {
      const Hls: any = this.video.hls.constructor;
      if (!this.autoplay) {
        this.video.hls.on(Hls.Events.LEVEL_LOADED, (e: any, data: any) => {
          const isLive: boolean = data.details.live;

          if (isLive) {
            this.video?.addEventListener(
              "play",
              () => {
                if (this.video?.hls?.liveSyncPosition) {
                  this.video.currentTime = this.video.hls.liveSyncPosition;
                }
              },
              { once: true }
            );
          }
        });
      }
    }
  }

  #setUpMutedAutoplay() {
    if (this.video?.hls) {
      const Hls: any = this.video.hls.constructor;
      if (this.autoplay) {
        this.video.hls.on(Hls.Events.MANIFEST_PARSED, () => {
          var playPromise = this.video?.play();
          if (playPromise) {
            playPromise.catch((error: Error) => {
              console.log(`${error.name} ${error.message}`);
              if (error.name === "NotAllowedError") {
                console.log("Attempting to play with video muted");
                if (this.video) this.video.muted = true;
                return this.video?.play().catch(console.error);
              }
            });
          }
        });
      }
    }
  }

  #setUpCaptionsButton() {
    const onTrackCountChange = () => this.#render();
    this.video?.textTracks?.addEventListener("addtrack", onTrackCountChange);
    this.video?.textTracks?.addEventListener("removetrack", onTrackCountChange);
  }

  #setUpAirplayButton() {
    if (!!(globalThis as any).WebKitPlaybackTargetAvailabilityEvent) {
      const onPlaybackTargetAvailability = (evt: any) => {
        const supportsAirPlay = evt.availability === "available";
        this.#setState({ supportsAirPlay });
      };

      this.video?.addEventListener(
        "webkitplaybacktargetavailabilitychanged",
        onPlaybackTargetAvailability
      );
    }
  }

  async #setUpVolumeRange() {
    const supportsVolume = await hasVolumeSupportAsync();
    this.#setState({ supportsVolume });
  }

  attributeChangedCallback(
    attrName: string,
    oldValue: string | null,
    newValue: string
  ) {
    super.attributeChangedCallback(attrName, oldValue, newValue);
    this.#render();
  }

  get hls() {
    return this.video?.hls;
  }

  get mux() {
    return this.video?.mux;
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
    return (
      toNumberOrUndefined(
        this.getAttribute(PlayerAttributes.FORWARD_SEEK_OFFSET)
      ) ?? 10
    );
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
    return (
      toNumberOrUndefined(
        this.getAttribute(PlayerAttributes.BACKWARD_SEEK_OFFSET)
      ) ?? 10
    );
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
    return (
      this.getAttribute(MuxVideoAttributes.PLAYER_SOFTWARE_NAME) ??
      playerSoftwareName
    );
  }

  /**
   * Get the player software version. Used by Mux Data.
   */
  get playerSoftwareVersion() {
    return (
      this.getAttribute(MuxVideoAttributes.PLAYER_SOFTWARE_VERSION) ??
      playerSoftwareVersion
    );
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
      this.setAttribute(MuxVideoAttributes.DEBUG, "");
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
    return toNumberOrUndefined(
      getVideoAttribute(this, MuxVideoAttributes.START_TIME)
    );
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
      this.setAttribute(MuxVideoAttributes.PREFER_MSE, "");
    } else {
      this.removeAttribute(MuxVideoAttributes.PREFER_MSE);
    }
  }

  /**
   * Get the metadata object for Mux Data.
   */
  get metadata(): Readonly<Metadata> | undefined {
    return this.video?.metadata;
  }

  /**
   * Set the metadata object for Mux Data.
   */
  set metadata(val: Readonly<Metadata> | undefined) {
    if (this.video) this.video.metadata = val;
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
    return this.getAttribute(PlayerAttributes.PLAYBACK_TOKEN);
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
    return this.getAttribute(PlayerAttributes.THUMBNAIL_TOKEN);
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
    return this.getAttribute(PlayerAttributes.STORYBOARD_TOKEN);
  }

  /**
   * Set the storyboard token for signing the storyboard URL.
   */
  set storyboardToken(val) {
    this.setAttribute(PlayerAttributes.STORYBOARD_TOKEN, `${val}`);
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
