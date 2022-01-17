import "media-chrome";
import MuxVideoElement from "@mux-elements/mux-video";
import {
  MediaController,
  MediaControlBar,
  MediaPlayButton,
  MediaSeekBackwardButton,
  MediaSeekForwardButton,
  MediaMuteButton,
  MediaVolumeRange,
  MediaTimeRange,
  MediaTimeDisplay,
  MediaCaptionsButton,
  MediaPlaybackRateButton,
  MediaPipButton,
  MediaFullscreenButton,
} from "./media-chrome";
import { StreamTypes } from "@mux-elements/playback-core";
export { StreamTypes };
import { h, Fragment, render } from "./common/little-vdom.js";
import { toNativeProps } from "./common/utils.js";

const MediaChromeSizes = {
  LG: "large",
  SM: "small",
};

const getPosterURLFromPlaybackId = (playbackId) =>
  `https://image.mux.com/${playbackId}/thumbnail.jpg`;

const getStoryboardURLFromPlaybackId = (playbackId) =>
  `https://image.mux.com/${playbackId}/storyboard.vtt`;

const MuxVideo = ({ children, ...props }) => {
  return h("mux-video", toNativeProps(props), children);
};

const Spacer = () => {
  return (
    <div
      style={{
        flexGrow: 1,
        height: "100%",
        backgroundColor: "var(--media-control-background, rgba(20,20,30, 0.7))",
      }}
    ></div>
  );
};

export const VodChromeSmall = (props) => {
  const { onAirPlaySelected, hasAirPlay = false } = props;
  return (
    <>
      <div
        slot="centered-chrome"
        style={{
          "--media-background-color": "none",
          "--media-control-background": "none",
          "--media-button-icon-width": "100%",
          width: "100%",
          display: "flex",
          flexFlow: "row",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <MediaSeekBackwardButton
          style={{ padding: 0, width: "20%" }}
        ></MediaSeekBackwardButton>
        <MediaPlayButton style={{ padding: 0, width: "20%" }}></MediaPlayButton>
        <MediaSeekForwardButton
          style={{ padding: 0, width: "20%" }}
        ></MediaSeekForwardButton>
      </div>
      <MediaControlBar>
        <MediaTimeRange></MediaTimeRange>
        <MediaTimeDisplay show-duration remaining></MediaTimeDisplay>
      </MediaControlBar>
      <MediaControlBar>
        <MediaMuteButton></MediaMuteButton>
        <MediaVolumeRange></MediaVolumeRange>
        <Spacer />
        <MediaCaptionsButton></MediaCaptionsButton>
        <MediaPipButton></MediaPipButton>
        <MediaFullscreenButton></MediaFullscreenButton>
        {hasAirPlay && <AirPlayButton onClick={onAirPlaySelected} />}
      </MediaControlBar>
    </>
  );
};

export const VodChromeLarge = (props) => {
  const { onAirPlaySelected, hasAirPlay = false } = props;
  return (
    <>
      {/* <div slot="centered-chrome">
        <MediaSeekBackwardButton></MediaSeekBackwardButton>
        <MediaPlayButton></MediaPlayButton>
        <MediaSeekForwardButton></MediaSeekForwardButton>
      </div> */}
      {/* <MediaControlBar>
        <MediaTimeRange></MediaTimeRange>
        <MediaTimeDisplay show-duration remaining></MediaTimeDisplay>
      </MediaControlBar> */}
      <MediaControlBar>
        <MediaPlayButton></MediaPlayButton>
        <MediaSeekForwardButton></MediaSeekForwardButton>
        <MediaSeekBackwardButton></MediaSeekBackwardButton>
        <MediaMuteButton></MediaMuteButton>
        <MediaVolumeRange></MediaVolumeRange>
        <MediaTimeRange></MediaTimeRange>
        <MediaTimeDisplay
          show-duration
          remaining
          style={{ color: "inherit" }}
        ></MediaTimeDisplay>
        <MediaCaptionsButton></MediaCaptionsButton>
        <MediaPipButton></MediaPipButton>
        <MediaFullscreenButton></MediaFullscreenButton>
        {hasAirPlay && <AirPlayButton onClick={onAirPlaySelected} />}
      </MediaControlBar>
    </>
  );
};

export const LiveChromeSmall = (props) => {
  const { onAirPlaySelected, hasAirPlay = false } = props;
  return (
    <>
      <div
        slot="centered-chrome"
        style={{
          "--media-background-color": "none",
          "--media-control-background": "none",
          "--media-button-icon-width": "100%",
          width: "100%",
          display: "flex",
          flexFlow: "row",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <MediaPlayButton style={{ padding: 0, width: "20%" }}></MediaPlayButton>
      </div>
      <MediaControlBar>
        <MediaMuteButton></MediaMuteButton>
        <MediaVolumeRange></MediaVolumeRange>
        <Spacer />
        <MediaCaptionsButton></MediaCaptionsButton>
        <MediaPipButton></MediaPipButton>
        <MediaFullscreenButton></MediaFullscreenButton>
        {hasAirPlay && <AirPlayButton onClick={onAirPlaySelected} />}
      </MediaControlBar>
    </>
  );
};

export const LiveChromeLarge = (props) => {
  const { onAirPlaySelected, hasAirPlay = false } = props;
  return (
    <>
      <MediaControlBar>
        <MediaPlayButton></MediaPlayButton>
        <MediaMuteButton></MediaMuteButton>
        <MediaVolumeRange></MediaVolumeRange>
        <Spacer />
        <MediaCaptionsButton></MediaCaptionsButton>
        <MediaPlaybackRateButton></MediaPlaybackRateButton>
        <MediaPipButton></MediaPipButton>
        <MediaFullscreenButton></MediaFullscreenButton>
        {hasAirPlay && <AirPlayButton onClick={onAirPlaySelected} />}
      </MediaControlBar>
    </>
  );
};

export const DefaultChromeRenderer = (props) => {
  const { streamType, playerSize } = props;
  if (playerSize === MediaChromeSizes.SM) {
    if (streamType === StreamTypes.LIVE || streamType === StreamTypes.LL_LIVE) {
      return <LiveChromeSmall {...props} />;
    }
    return <VodChromeSmall {...props} />;
  }
  if (streamType === StreamTypes.LIVE || streamType === StreamTypes.LL_LIVE) {
    return <LiveChromeLarge {...props} />;
  }
  return <VodChromeLarge {...props} />;
};

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

  return {
    width: "100%",
    maxWidth: "100%",
    color: "#ffffff",
    ...primaryColorStyles,
    ...secondaryColorStyles,
    ...tertiaryColorStyles,
  };
};

export const MuxPlayer = (props) => {
  const {
    playbackId = "",
    streamType,
    envKey,
    metadata,
    startTime,
    preferMse,
    //   src,
    poster,
    muted,
    autoplay,
    debug,
    ChromeRenderer = DefaultChromeRenderer,
  } = props;

  let hasAirPlay = false;
  let playerSize = props.playerSize;
  let mediaControllerRef = props.mediaControllerRef;
  let muxVideoRef = props.muxVideoRef;

  return (
    <MediaController
      ref={mediaControllerRef}
      style={getChromeStylesFromProps(props)}
    >
      <MuxVideo
        key={playbackId}
        ref={muxVideoRef}
        slot="media"
        // src={src}
        playbackId={playbackId}
        envKey={envKey}
        streamType={streamType}
        metadata={metadata}
        debug={debug}
        startTime={startTime}
        preferMse={preferMse}
        autoplay={
          autoplay ||
          streamType === StreamTypes.LIVE ||
          streamType === StreamTypes.LL_LIVE
        }
        poster={poster ?? getPosterURLFromPlaybackId(playbackId)}
        crossOrigin=""
        playsInline
        muted={muted}
      >
        <track
          label="thumbnails"
          default
          kind="metadata"
          src={getStoryboardURLFromPlaybackId(playbackId)}
        />
      </MuxVideo>
      <ChromeRenderer
        hasAirPlay={hasAirPlay}
        onAirPlaySelected={() => {
          muxVideoRef.current?.webkitShowPlaybackTargetPicker?.();
        }}
        streamType={streamType}
        playerSize={playerSize}
      />
    </MediaController>
  );
};

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
};

const VideoAttributeNameValues = Object.values(VideoAttributes);
const SMALL_BREAKPOINT = 700;

function renderMuxPlayer(el) {
  let mediaControllerRef = {};
  let muxVideoRef = {};
  let playerSize = getPlayerSize(el);

  function getPlayerSize(el) {
    const muxPlayerRect = el.getBoundingClientRect();
    return muxPlayerRect.width < SMALL_BREAKPOINT
      ? MediaChromeSizes.SM
      : MediaChromeSizes.LG;
  }

  function renderToShadowRoot() {
    console.log("RENDER", el.playbackId);
    render(
      <MuxPlayer
        playbackId={el.playbackId}
        mediaControllerRef={mediaControllerRef}
        muxVideoRef={muxVideoRef}
        playerSize={playerSize}
      />,
      el.shadowRoot
    );
  }

  renderToShadowRoot();

  window.addEventListener("resize", () => {
    if (playerSize != getPlayerSize(el)) {
      playerSize = getPlayerSize(el);
      renderToShadowRoot();
    }
  });
}

class MuxPlayerElement extends HTMLElement {
  static get observedAttributes() {
    return [...VideoAttributeNameValues];
  }

  constructor() {
    super();

    this.attachShadow({ mode: "open" });
    renderMuxPlayer(this);

    // Initialize all the attribute properties
    Array.prototype.forEach.call(this.attributes, (attrNode) => {
      this.attributeChangedCallback(attrNode.name, null, attrNode.value);
    });

    if (this.video) this.video.hls.config.maxMaxBufferLength = 2;
  }

  get video() {
    return this.shadowRoot.querySelector("mux-video");
  }

  getVideoAttribute(name) {
    return this.video ? this.video.getAttribute(name) : this.getAttribute(name);
  }

  get envKey() {
    return this.getVideoAttribute(VideoAttributes.ENV_KEY);
  }

  get debug() {
    return this.getVideoAttribute(VideoAttributes.DEBUG);
  }

  get playbackId() {
    return this.getVideoAttribute(VideoAttributes.PLAYBACK_ID);
  }

  get streamType() {
    return this.getVideoAttribute(VideoAttributes.STREAM_TYPE);
  }

  get envKey() {
    return this.getVideoAttribute(VideoAttributes.ENV_KEY);
  }

  attributeChangedCallback(attrName, oldValue, newValue) {
    if (VideoAttributeNameValues.includes(attrName)) {
      this.video?.attributeChangedCallback(attrName, oldValue, newValue);
      return;
    }

    switch (attrName) {
    }
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
