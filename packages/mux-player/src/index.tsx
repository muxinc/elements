import MuxVideoElement from "@mux-elements/mux-video";
import { StreamTypes, ValueOf } from "@mux-elements/playback-core";
import React, { render } from "./little-react";
import MuxPlayer from "./player";

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

class MuxPlayerElement extends HTMLElement {
  static get observedAttributes() {
    return [...VideoAttributeNameValues];
  }

  constructor() {
    super();

    this.attachShadow({ mode: "open" });

    console.log("RENDER", this.playbackId);
    render(
      <MuxPlayer
        playbackId={this.playbackId}
        envKey={this.envKey}
        startTime={this.startTime}
        streamType={this.streamType}
        debug={this.debug}
      />,
      this.shadowRoot as any
    );

    // Initialize all the attribute properties
    Array.prototype.forEach.call(this.attributes, (attrNode) => {
      this.attributeChangedCallback(attrNode.name, undefined, attrNode.value);
    });

    if (this.video?.hls) {
      this.video.hls.config.maxMaxBufferLength = 2;
    }

    this.querySelectorAll(":scope > track").forEach((track) => {
      this.video?.appendChild(track.cloneNode());
    });

    // Watch for child adds/removes and update the native element if necessary
    const mutationCallback = (mutationsList: any, observer: any) => {
      for (let mutation of mutationsList) {
        if (mutation.type === "childList") {
          // Child being removed
          mutation.removedNodes.forEach((node: HTMLTrackElement) => {
            const track = this.video?.querySelector(`track[src="${node.src}"]`);
            if (track) this.video?.removeChild(track);
          });

          mutation.addedNodes.forEach((node: Node) => {
            this.video?.appendChild(node.cloneNode());
          });
        }
      }
    };

    const observer = new MutationObserver(mutationCallback);
    observer.observe(this, { childList: true, subtree: true });
  }

  get video(): MuxVideoElement | null | undefined {
    return this.shadowRoot?.querySelector("mux-video");
  }

  getVideoAttribute(name: string): string | undefined {
    let value = this.video
      ? this.video.getAttribute(name)
      : this.getAttribute(name);
    if (value) return value;
  }

  get envKey(): string | undefined {
    return this.getVideoAttribute(VideoAttributes.ENV_KEY);
  }

  get debug(): boolean {
    return this.getVideoAttribute(VideoAttributes.DEBUG) != null;
  }

  get playbackId(): string | undefined {
    return this.getVideoAttribute(VideoAttributes.PLAYBACK_ID);
  }

  get streamType(): ValueOf<StreamTypes> | undefined {
    return (
      (this.getAttribute(
        VideoAttributes.STREAM_TYPE
      ) as ValueOf<StreamTypes>) ?? undefined
    );
  }

  get startTime(): number | undefined {
    return Number(this.getVideoAttribute(VideoAttributes.START_TIME));
  }

  attributeChangedCallback(
    attrName: string,
    oldValue?: string,
    newValue?: string
  ) {
    console.log("ATTRIBUTE", attrName, oldValue, newValue);
  }

  connectedCallback() {}
}

/** @TODO Refactor once using `globalThis` polyfills */
if (!globalThis.customElements.get("mux-player")) {
  globalThis.customElements.define("mux-player", MuxPlayerElement);
  /** @TODO consider externalizing this (breaks standard modularity) */
  // globalThis.MuxPlayerElement = MuxPlayerElement;
}

export default MuxPlayerElement;
