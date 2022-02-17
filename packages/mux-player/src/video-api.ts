import type MuxVideoElement from "@mux-elements/mux-video";

const AllowedVideoAttributes = {
  AUTOPLAY: "autoplay",
  CROSSORIGIN: "crossorigin",
  LOOP: "loop",
  MUTED: "muted",
  PLAYSINLINE: "playsinline",
  SRC: "src",
  POSTER: "poster",
  PRELOAD: "preload",
};

const CustomVideoAttributes = {
  VOLUME: "volume",
  PLAYBACKRATE: "playbackrate",
  // This muted attribute also reflects to the muted property while the muted
  // attribute on a native video element reflects only to video.defaultMuted.
  MUTED: "muted",
};

const AllowedVideoEvents = [
  "loadstart",
  "loadedmetadata",
  "progress",
  "durationchange",
  "volumechange",
  "ratechange",
  "resize",
  "waiting",
  "play",
  "playing",
  "timeupdate",
  "pause",
  "seeking",
  "seeked",
  "ended",
];

const AllowedVideoAttributeNames = Object.values(AllowedVideoAttributes);
const CustomVideoAttributesNames = Object.values(CustomVideoAttributes);

class VideoApiElement extends HTMLElement {
  static get observedAttributes() {
    return [...AllowedVideoAttributeNames, ...CustomVideoAttributesNames];
  }

  /**
   * Create a HTMLVideoElement like API with opt-in methods to expose publicly.
   * This class is intentionally not extending MuxVideoElement but composing it
   * to opt in methods and not expose too much. More flexibility in the future.
   */
  constructor() {
    super();

    this.querySelectorAll(":scope > track").forEach((track) => {
      this.video?.append(track.cloneNode());
    });

    // Watch for child adds/removes and update the native element if necessary
    /** @type {(mutationList: MutationRecord[]) => void} */
    const mutationCallback = (mutationsList: MutationRecord[]) => {
      for (let mutation of mutationsList) {
        if (mutation.type === "childList") {
          // Child being removed
          mutation.removedNodes.forEach((node) => {
            const track = this.video?.querySelector(
              `track[src="${(node as HTMLTrackElement).src}"]`
            );
            if (track) this.video?.removeChild(track);
          });

          mutation.addedNodes.forEach((node) => {
            this.video?.append(node.cloneNode());
          });
        }
      }
    };

    const observer = new MutationObserver(mutationCallback);
    observer.observe(this, { childList: true, subtree: true });
  }

  attributeChangedCallback(
    attrName: string,
    oldValue: string | null,
    newValue: string
  ) {
    if (
      AllowedVideoAttributeNames.includes(attrName) &&
      this.video?.getAttribute(attrName) != newValue
    ) {
      if (newValue === null) {
        this.video?.removeAttribute(attrName);
      } else {
        this.video?.setAttribute(attrName, newValue);
      }
    }

    switch (attrName) {
      case CustomVideoAttributes.MUTED: {
        if (this.video) {
          this.video.muted = newValue != null;
        }
        return;
      }
      case CustomVideoAttributes.VOLUME: {
        const val = +newValue;
        if (this.video && !Number.isNaN(val)) {
          this.video.volume = val;
        }
        return;
      }
      case CustomVideoAttributes.PLAYBACKRATE: {
        const val = +newValue;
        if (this.video && !Number.isNaN(val)) {
          this.video.playbackRate = val;
        }
        return;
      }
    }
  }

  addEventListener(
    type: string,
    listener: EventListenerOrEventListenerObject,
    options?: boolean | EventListenerOptions
  ) {
    if (AllowedVideoEvents.includes(type)) {
      this.video?.addEventListener(type, listener, options);
      return;
    }
    super.addEventListener(type, listener, options);
  }

  removeEventListener(
    type: string,
    listener: EventListenerOrEventListenerObject,
    options?: boolean | EventListenerOptions
  ) {
    if (AllowedVideoEvents.includes(type)) {
      this.video?.removeEventListener(type, listener, options);
      return;
    }
    super.removeEventListener(type, listener, options);
  }

  play() {
    return this.video?.play();
  }

  pause() {
    this.video?.pause();
  }

  get video(): MuxVideoElement | null | undefined {
    return this.shadowRoot?.querySelector("mux-video");
  }

  get paused() {
    return this.video?.paused ?? true;
  }

  get duration() {
    return this.video?.duration ?? NaN;
  }

  get ended() {
    return this.video?.ended ?? false;
  }

  get buffered() {
    return this.video?.buffered;
  }

  get readyState() {
    return this.video?.readyState ?? 0;
  }

  get videoWidth() {
    return this.video?.videoWidth;
  }

  get videoHeight() {
    return this.video?.videoHeight;
  }

  get currentTime() {
    return this.video?.currentTime ?? 0;
  }

  set currentTime(val) {
    if (this.video) {
      this.video.currentTime = Number(val);
    }
  }

  get volume() {
    return this.video?.volume ?? 1;
  }

  set volume(val) {
    if (this.video) {
      this.video.volume = Number(val);
    }
  }

  get src() {
    return getVideoAttribute(this, AllowedVideoAttributes.SRC);
  }

  set src(val) {
    this.setAttribute(AllowedVideoAttributes.SRC, `${val}`);
  }

  get poster() {
    return getVideoAttribute(this, AllowedVideoAttributes.POSTER) ?? "";
  }

  set poster(val) {
    this.setAttribute(AllowedVideoAttributes.POSTER, `${val}`);
  }

  get playbackRate() {
    return this.video?.playbackRate ?? 1;
  }

  set playbackRate(val) {
    if (this.video) {
      this.video.playbackRate = Number(val);
    }
  }

  get crossOrigin() {
    return getVideoAttribute(this, AllowedVideoAttributes.CROSSORIGIN);
  }

  set crossOrigin(val) {
    this.setAttribute(AllowedVideoAttributes.CROSSORIGIN, `${val}`);
  }

  get autoplay() {
    return getVideoAttribute(this, AllowedVideoAttributes.AUTOPLAY) != null;
  }

  set autoplay(val) {
    if (val) {
      this.setAttribute(AllowedVideoAttributes.AUTOPLAY, "");
    } else {
      // Remove boolean attribute if false, 0, '', null, undefined.
      this.removeAttribute(AllowedVideoAttributes.AUTOPLAY);
    }
  }

  get loop() {
    return getVideoAttribute(this, AllowedVideoAttributes.LOOP) != null;
  }

  set loop(val) {
    if (val) {
      this.setAttribute(AllowedVideoAttributes.LOOP, "");
    } else {
      // Remove boolean attribute if false, 0, '', null, undefined.
      this.removeAttribute(AllowedVideoAttributes.LOOP);
    }
  }

  get muted() {
    return getVideoAttribute(this, AllowedVideoAttributes.MUTED) != null;
  }

  set muted(val) {
    if (val) {
      this.setAttribute(AllowedVideoAttributes.MUTED, "");
    } else {
      // Remove boolean attribute if false, 0, '', null, undefined.
      this.removeAttribute(AllowedVideoAttributes.MUTED);
    }
  }
}

function getVideoAttribute(el: VideoApiElement, name: string) {
  return el.video ? el.video.getAttribute(name) : el.getAttribute(name);
}

export default VideoApiElement;
