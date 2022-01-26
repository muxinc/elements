import "media-chrome";
import "@mux-elements/mux-video";
import { StreamTypes } from "@mux-elements/playback-core";
import VideoApiElement from "./video-api-element.js";
import { html, renderable, stylePropsToString } from "./utils.js";

const VideoAttributes = {
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
  DEFAULT_SHOW_CAPTIONS: "default-show-captions",
};

const VideoAttributeNameValues = Object.values(VideoAttributes);

const getPosterURLFromPlaybackId = (playbackId) =>
  `https://image.mux.com/${playbackId}/thumbnail.jpg`;

const getStoryboardURLFromPlaybackId = (playbackId) =>
  `https://image.mux.com/${playbackId}/storyboard.vtt`;

const getChromeStylesFromProps = (props) => {
  const { primaryColor, secondaryColor, tertiaryColor } = props;

  const primaryColorStyles = primaryColor
    ? {
        "--media-icon-color": primaryColor,
        "--media-range-thumb-background": primaryColor,
        "--media-range-bar-color": primaryColor,
        color: primaryColor,
      }
    : {};

  const secondaryColorStyles = secondaryColor
    ? {
        "--media-background-color": secondaryColor,
        "--media-control-background": secondaryColor,
      }
    : {};

  const tertiaryColorStyles = tertiaryColor
    ? {
        "--media-range-track-background": tertiaryColor,
      }
    : {};

  return stylePropsToString({
    maxWidth: "100%",
    color: "#ffffff",
    ...primaryColorStyles,
    ...secondaryColorStyles,
    ...tertiaryColorStyles,
  });
};

const MuxPlayer = (props) => html`
  <media-controller style="${getChromeStylesFromProps(props)}">
    <mux-video
      slot="media"
      playback-id="${props.playbackId}"
      env-key="${props.envKey}"
      stream-type="${props.streamType}"
      metadata="${props.metadata}"
      start-time="${props.startTime}"
      poster="${props.poster ?? getPosterURLFromPlaybackId(props.playbackId)}"
      crossorigin
      playsinline
      ${props.debug ? "debug" : ""}
      ${props.muted ? "muted" : ""}
      ${props.preferMse ? "prefer-mse" : ""}
      ${props.autoplay ||
      props.streamType === StreamTypes.LIVE ||
      props.streamType === StreamTypes.LL_LIVE
        ? "autoplay"
        : ""}
    >
      <track
        label="thumbnails"
        default
        kind="metadata"
        src=${getStoryboardURLFromPlaybackId(props.playbackId)}
      />
    </mux-video>
    ${renderable("chromeRenderer", ChromeRenderer, props)}
  </media-controller>
`;

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

const VodChromeSmall = (props) => html`
  <div
    slot="centered-chrome"
    style="--media-background-color: none; --media-control-background: none; --media-button-icon-width: 100%; width: 100%; display: flex; flex-flow: row; align-items: center; justify-content: center;"
  >
    ${renderable(
      "center",
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
      "captionsButton",
      ({ hasCaptions }) =>
        hasCaptions && html`<media-captions-button></media-captions-button>`,
      props
    )}
    <media-pip-button></media-pip-button>
    <media-fullscreen-button></media-fullscreen-button>
  </media-control-bar>
`;

const VodChromeLarge = (props) => html`
  <div
    slot="centered-chrome"
    style="--media-background-color: none; --media-control-background: none; --media-button-icon-width: 100%; width: 100%; display: flex; flex-flow: row; align-items: center; justify-content: center;"
  >
    ${renderable(
      "center",
      ({ showLoading }) => showLoading && Loading(),
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
      "captionsButton",
      ({ hasCaptions }) =>
        hasCaptions && html`<media-captions-button></media-captions-button>`,
      props
    )}
    <media-pip-button></media-pip-button>
    <media-fullscreen-button></media-fullscreen-button>
  </media-control-bar>
`;

const LiveChromeSmall = (props) => html`
  <div
    slot="centered-chrome"
    style="--media-background-color: none; --media-control-background: none; --media-button-icon-width: 100%; width: 100%; display: flex; flex-flow: row; align-items: center; justify-content: center;"
  >
    ${renderable(
      "center",
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
      "captionsButton",
      ({ hasCaptions }) =>
        hasCaptions && html`<media-captions-button></media-captions-button>`,
      props
    )}
    <media-pip-button></media-pip-button>
    <media-fullscreen-button></media-fullscreen-button>
  </media-control-bar>
`;

const LiveChromeLarge = (props) => html`
  <div
    slot="centered-chrome"
    style="--media-background-color: none; --media-control-background: none; --media-button-icon-width: 100%; width: 100%; display: flex; flex-flow: row; align-items: center; justify-content: center;"
  >
    ${renderable(
      "center",
      ({ showLoading }) => showLoading && Loading(),
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
      "captionsButton",
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
  LG: "large",
  SM: "small",
};

function getPlayerSize(el) {
  const muxPlayerRect = el.getBoundingClientRect();
  return muxPlayerRect.width < SMALL_BREAKPOINT
    ? MediaChromeSizes.SM
    : MediaChromeSizes.LG;
}

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

const showLoading = (el) => !el.video?.paused && el.video?.readyState < 3;

function getVideoAttribute(el, name) {
  return el.video ? el.video.getAttribute(name) : el.getAttribute(name);
}

function getCcSubTracks(el) {
  return el.video
    ? Array.from(el.video.textTracks).filter(
        ({ kind }) => kind === "subtitles" || kind === "captions"
      )
    : [];
}

class MuxPlayerElement extends VideoApiElement {
  static get observedAttributes() {
    return [...VideoAttributeNameValues];
  }

  constructor() {
    super();

    let muxPlayer = MuxPlayer(getProps(this));
    let { chromeRenderer } = muxPlayer.fragments;
    let { captionsButton, center } = chromeRenderer.fragments;

    this.attachShadow({ mode: "open" });
    this.shadowRoot.append(...muxPlayer.childNodes);

    // Temporarily here to load less segments on page load, remove later!!!!
    if (this.video?.hls) {
      this.video.hls.config.maxMaxBufferLength = 2;
    }

    let playerSize = getPlayerSize(this);
    window.addEventListener("resize", () => {
      if (playerSize != getPlayerSize(this)) {
        playerSize = getPlayerSize(this);
        chromeRenderer.render(getProps(this));
        // Get the references to the new child fragments.
        ({ captionsButton, center } = chromeRenderer.fragments);
      }
    });

    let timeout;
    const onLoadingStateChange = () => {
      if (!timeout && showLoading(this)) {
        timeout = setTimeout(
          () => center.render({ showLoading: showLoading(this) }),
          500
        );
      } else if (timeout && !showLoading(this)) {
        clearTimeout(timeout);
        timeout = null;
        center.render({ showLoading: false });
      }
    };

    this.video?.addEventListener("timeupdate", onLoadingStateChange);
    this.video?.addEventListener("canplay", onLoadingStateChange);
    this.video?.addEventListener("loadedmetadata", onLoadingStateChange);
    this.video?.addEventListener("waiting", onLoadingStateChange);
    this.video?.addEventListener("stalled", onLoadingStateChange);

    const onTrackCountChange = () => {
      const ccSubTracks = getCcSubTracks(this);
      captionsButton.render({ hasCaptions: !!ccSubTracks.length });

      // NOTE: This is a hack solution to "default" CC selection. Solution *should*
      // be better default state support in media-chrome (CJP).
      if (this.defaultShowCaptions && ccSubTracks.length && this.video) {
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
        this.video?.dispatchEvent(showCCSubEvent);
      }
    };

    this.video?.textTracks.addEventListener("addtrack", onTrackCountChange);
    this.video?.textTracks.addEventListener("removetrack", onTrackCountChange);
  }

  get defaultShowCaptions() {
    return this.getAttribute(VideoAttributes.DEFAULT_SHOW_CAPTIONS) || true;
  }

  get envKey() {
    return getVideoAttribute(this, VideoAttributes.ENV_KEY);
  }

  get debug() {
    return getVideoAttribute(this, VideoAttributes.DEBUG) != null;
  }

  get playbackId() {
    return getVideoAttribute(this, VideoAttributes.PLAYBACK_ID);
  }

  get streamType() {
    return getVideoAttribute(this, VideoAttributes.STREAM_TYPE) ?? undefined;
  }

  get startTime() {
    return Number(getVideoAttribute(this, VideoAttributes.START_TIME));
  }

  attributeChangedCallback(attrName, oldValue, newValue) {
    // console.log('ATTRIBUTE', attrName, oldValue, newValue);
  }

  connectedCallback() {}
}

/** @TODO Refactor once using `globalThis` polyfills */
if (!globalThis.customElements.get("mux-player")) {
  globalThis.customElements.define("mux-player", MuxPlayerElement);
  /** @TODO consider externalizing this (breaks standard modularity) */
  globalThis.MuxPlayerElement = MuxPlayerElement;
}

export default MuxPlayerElement;
