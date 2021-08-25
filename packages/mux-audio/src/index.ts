import "./polyfills/window";
import CustomAudioElement from "./CustomAudioElement";
import mux, { Options, HighPriorityMetadata } from "mux-embed";

import Hls from "hls.js";

type Metadata = Partial<Options["data"]>;

/** @TODO make the relationship between name+value smarter and more deriveable (CJP) */
type AttributeNames = {
  ENV_KEY: "env-key";
  DEBUG: "debug";
  METADATA_URL: "metadata-url";
  METADATA_VIDEO_ID: "metadata-video-id";
  METADATA_VIDEO_TITLE: "metadata-video-title";
  METADATA_VIEWER_USER_ID: "metadata-viewer-user-id";
  PLAYBACK_ID: "playback-id";
  PREFER_MSE: "prefer-mse";
};

const Attributes: AttributeNames = {
  ENV_KEY: "env-key",
  DEBUG: "debug",
  METADATA_URL: "metadata-url",
  METADATA_VIDEO_ID: "metadata-video-id",
  METADATA_VIDEO_TITLE: "metadata-video-title",
  METADATA_VIEWER_USER_ID: "metadata-viewer-user-id",
  PLAYBACK_ID: "playback-id",
  PREFER_MSE: "prefer-mse",
};

const AttributeNameValues = Object.values(Attributes);

const toPlaybackIdParts = (
  playbackIdWithOptionalParams: string
): [string, string?] => {
  const qIndex = playbackIdWithOptionalParams.indexOf("?");
  const idPart = playbackIdWithOptionalParams.slice(0, qIndex);
  const queryPart = playbackIdWithOptionalParams.slice(qIndex);
  if (!queryPart) return [idPart];
  return [idPart, queryPart];
};

const toMuxVideoURL = (playbackId: string | null) => {
  if (!playbackId) return null;
  const [idPart, queryPart = ""] = toPlaybackIdParts(playbackId);
  return `https://stream.mux.com/${idPart}.m3u8${queryPart}`;
};

type HTMLAudioElementWithMux = HTMLVideoElement & { mux?: typeof mux };

const getPlaybackIdAsVideoIdMetadata = (
  mediaEl: MuxAudioElement
): Partial<Pick<HighPriorityMetadata, "video_id">> => {
  const playbackIdWithOptionalParams = mediaEl.getAttribute(
    Attributes.PLAYBACK_ID
  );
  if (!playbackIdWithOptionalParams) return {};
  const [playbackId] = toPlaybackIdParts(playbackIdWithOptionalParams);
  if (!playbackId) return {};

  return { video_id: playbackId };
};

const getHighPriorityMetadata = (
  mediaEl: MuxAudioElement
): Partial<HighPriorityMetadata> => {
  const video_title = mediaEl.getAttribute(Attributes.METADATA_VIDEO_TITLE);
  const viewer_id = mediaEl.getAttribute(Attributes.METADATA_VIEWER_USER_ID);
  const video_id = mediaEl.getAttribute(Attributes.METADATA_VIDEO_ID);
  const videoTitleObj = video_title ? { video_title } : {};
  const viewerIdObj = viewer_id ? { viewer_id } : {};
  const videoIdObj = video_id ? { video_id } : {};
  return {
    ...videoTitleObj,
    ...viewerIdObj,
    ...videoIdObj,
  };
};

class MuxAudioElement extends CustomAudioElement<HTMLAudioElementWithMux> {
  static get observedAttributes() {
    return [
      ...AttributeNameValues,
      ...(CustomAudioElement.observedAttributes ?? []),
    ];
  }

  protected __hls?: Hls;
  protected __muxPlayerInitTime: number;
  protected __metadata: Readonly<Metadata> = {};

  constructor() {
    super();
    this.__muxPlayerInitTime = Date.now();
  }

  get hls() {
    return this.__hls;
  }

  get mux(): Readonly<typeof mux> | undefined {
    return this.nativeEl.mux;
  }

  get src() {
    // Use the attribute value as the source of truth.
    // No need to store it in two places.
    // This avoids needing a to read the attribute initially and update the src.
    return this.getAttribute("src");
  }

  set src(val) {
    // If being set by attributeChangedCallback,
    // dont' cause an infinite loop
    if (val === this.src) return;

    if (val == null) {
      this.removeAttribute("src");
    } else {
      this.setAttribute("src", val);
    }
  }

  /** @TODO write a generic module for well defined primitive types -> attribute getter/setters/removers (CJP) */
  get debug(): boolean {
    return this.getAttribute(Attributes.DEBUG) != null;
  }

  set debug(val: boolean) {
    // dont' cause an infinite loop
    if (val === this.debug) return;

    if (val) {
      this.setAttribute(Attributes.DEBUG, "");
    } else {
      this.removeAttribute(Attributes.DEBUG);
    }
  }

  /** @TODO Followup: naming convention: all lower (common per HTMLElement props) vs. camel (common per JS convention) (CJP) */
  get preferMSE(): boolean {
    return this.getAttribute(Attributes.PREFER_MSE) != null;
  }

  set preferMSE(val: boolean) {
    if (val) {
      this.setAttribute(Attributes.PREFER_MSE, "");
    } else {
      this.removeAttribute(Attributes.PREFER_MSE);
    }
  }

  get metadata() {
    return this.__metadata;
  }

  set metadata(val: Readonly<Metadata> | undefined) {
    this.__metadata = val ?? {};
    if (!!this.mux) {
      /** @TODO Link to docs for a more detailed discussion (CJP) */
      console.info(
        "Some metadata values may not be overridable at this time. Make sure you set all metadata to override before setting the src."
      );
      this.mux.emit("hb", this.__metadata);
    }
  }

  /** @TODO Refactor as an independent function (CJP) */
  load() {
    /** @TODO Add custom errors + error codes */
    if (!this.src) {
      console.error("DONT DO THIS");
      return;
    }

    const env_key = this.getAttribute(Attributes.ENV_KEY);
    const debug = this.debug;
    const preferMSE = this.preferMSE;
    const canUseNative = this.nativeEl.canPlayType(
      "application/vnd.apple.mpegurl"
    );
    const hlsSupported = Hls.isSupported();

    // We should use native playback if we a) can use native playback and don't also b) prefer to use MSE/hls.js if/when it's supported
    const shouldUseNative = canUseNative && !(preferMSE && hlsSupported);

    // 1. create hls if we should be using it "under the hood"
    if (!shouldUseNative && hlsSupported) {
      const hls = new Hls({
        // Kind of like preload metadata, but causes spinner.
        // autoStartLoad: false,
        debug,
      });

      this.__hls = hls;
    }

    // 2. Start monitoring for mux data before we do anything else
    if (env_key) {
      const player_init_time = this.__muxPlayerInitTime;
      const metadataObj = this.__metadata;
      const hlsjs = this.__hls; // an instance of hls.js or undefined
      const playbackIdMetadata = getPlaybackIdAsVideoIdMetadata(this);
      const highPriorityMetadata = getHighPriorityMetadata(this);
      /**
       * @TODO Use documented version if/when resolved (commented out below) (CJP)
       * @see https://github.com/snowpackjs/snowpack/issues/3621
       * @see https://www.snowpack.dev/reference/environment-variables#option-2-config-file
       */
      // @ts-ignore
      const player_version = import.meta.env
        .SNOWPACK_PUBLIC_PLAYER_VERSION as string;
      // const player_version = __SNOWPACK_ENV__.PLAYER_VERSION;

      mux.monitor(this.nativeEl, {
        debug,
        hlsjs,
        Hls: hlsjs ? Hls : undefined,
        data: {
          env_key, // required
          // Metadata fields
          player_name: "mux-audio", // default player name for "mux-audio"
          player_version,
          player_init_time,
          // Default to playback-id as video_id (if available)
          ...playbackIdMetadata,
          // Use any metadata passed in programmatically (which may override the defaults above)
          ...metadataObj,
          // Use any high priority metadata passed in via attributes (which may override any of the above)
          ...highPriorityMetadata,
        },
      });
    }

    // 3. Finish any additional setup to load/play the media
    if (shouldUseNative) {
      this.nativeEl.src = this.src;
    } else if (this.__hls) {
      const hls = this.__hls;

      hls.on(Hls.Events.ERROR, (_event, data) => {
        if (data.fatal) {
          switch (data.type) {
            case Hls.ErrorTypes.NETWORK_ERROR:
              // try to recover network error
              console.error("fatal network error encountered, try to recover");
              hls.startLoad();
              break;
            case Hls.ErrorTypes.MEDIA_ERROR:
              console.error("fatal media error encountered, try to recover");
              hls.recoverMediaError();
              break;
            default:
              // cannot recover
              console.error(
                "unrecoverable fatal error encountered, cannot recover (check logs for more info)"
              );
              hls.destroy();
              break;
          }
        }
      });

      hls.loadSource(this.src);
      hls.attachMedia(this.nativeEl);
    } else {
      console.error(
        "It looks like HLS video playback will not work on this system! If possible, try upgrading to the newest versions of your browser or software."
      );
      return;
    }
  }

  unload() {
    // NOTE: I believe we cannot reliably "recycle" hls player instances, but should confirm at least for optimization reasons.
    if (this.__hls) {
      this.__hls.detachMedia();
      this.__hls.destroy();
      this.__hls = undefined;
    }
    if (this.nativeEl.mux) {
      this.nativeEl.mux.destroy();
      delete this.nativeEl.mux;
    }
  }

  attributeChangedCallback(
    attrName: string,
    oldValue: string | null,
    newValue: string | null
  ) {
    switch (attrName) {
      case "src":
        const hadSrc = !!oldValue;
        const hasSrc = !!newValue;
        if (!hadSrc && hasSrc) {
          this.load();
        } else if (hadSrc && !hasSrc) {
          this.unload();
          /** @TODO Test this thoroughly (async?) and confirm unload() necessary (CJP) */
        } else if (hadSrc && hasSrc) {
          this.unload();
          this.load();
        }
        break;
      case Attributes.PLAYBACK_ID:
        /** @TODO Improv+Discuss - how should playback-id update wrt src attr changes (and vice versa) (CJP) */
        this.src = toMuxVideoURL(newValue);
        break;
      case Attributes.DEBUG:
        const debug = this.debug;
        if (!!this.mux) {
          /** @TODO Link to docs for a more detailed discussion (CJP) */
          console.info(
            "Cannot toggle debug mode of mux data after initialization. Make sure you set all metadata to override before setting the src."
          );
        }
        if (!!this.hls) {
          this.hls.config.debug = debug;
        }
        break;
      case Attributes.METADATA_URL:
        if (newValue) {
          fetch(newValue)
            .then((resp) => resp.json())
            .then((json) => (this.metadata = json))
            .catch((_err) =>
              console.error(
                `Unable to load or parse metadata JSON from metadata-url ${newValue}!`
              )
            );
        }
        break;
      default:
        break;
    }

    super.attributeChangedCallback(attrName, oldValue, newValue);
  }

  disconnectedCallback() {
    this.unload();
  }

  /** @TODO Followup - investigate why this is necessary (attributeChanged not invoked on initial load when setting playback-id) (CJP) */
  connectedCallback() {
    // Only auto-load if we have a src
    if (this.src) {
      this.load();
    }
  }
}

type MuxAudioElementType = typeof MuxAudioElement;
declare global {
  var MuxAudioElement: MuxAudioElementType;
}

if (!globalThis.customElements.get("mux-audio")) {
  globalThis.customElements.define("mux-audio", MuxAudioElement);
  /** @TODO consider externalizing this (breaks standard modularity) */
  globalThis.MuxAudioElement = MuxAudioElement;
}

export { Hls };

export default MuxAudioElement;
