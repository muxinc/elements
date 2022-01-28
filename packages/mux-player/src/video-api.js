const AllowedVideoAttributeNames = [
  "autoplay",
  "crossorigin",
  "loop",
  "muted",
  "playsinline",
  "src",
];

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

class VideoApiElement extends HTMLElement {
  static get observedAttributes() {
    return [...AllowedVideoAttributeNames];
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
    const mutationCallback = (mutationsList) => {
      for (let mutation of mutationsList) {
        if (mutation.type === "childList") {
          // Child being removed
          mutation.removedNodes.forEach((node) => {
            const track = this.video?.querySelector(
              `track[src="${/** @type {HTMLTrackElement} */ (node).src}"]`
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

  /**
   * @param  {string} attrName
   * @param  {string | null} oldValue
   * @param  {string} newValue
   */
  attributeChangedCallback(attrName, oldValue, newValue) {
    if (AllowedVideoAttributeNames.includes(attrName)) {
      this.video?.setAttribute(attrName, newValue);
    }
  }

  /** @type {<T extends EventTarget['addEventListener']>(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions) => void} */
  addEventListener(type, listener, options) {
    if (AllowedVideoEvents.includes(type)) {
      this.video?.addEventListener(type, listener, options);
    }
  }

  /** @type {<T extends EventTarget['removeEventListener']>(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions) => void} */
  removeEventListener(type, listener, options) {
    if (AllowedVideoEvents.includes(type)) {
      this.video?.removeEventListener(type, listener, options);
    }
  }

  play() {
    return this.video?.play();
  }

  pause() {
    this.video?.pause();
  }

  /** @typedef { import("@mux-elements/mux-video").default } MuxVideoElement */

  /** @type {MuxVideoElement | null | undefined} */
  get video() {
    return this.shadowRoot?.querySelector("mux-video");
  }

  get duration() {
    return this.video?.duration;
  }

  get ended() {
    return this.video?.ended;
  }

  get buffered() {
    return this.video?.buffered;
  }

  get readyState() {
    return this.video?.readyState;
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

  get src() {
    return getVideoAttribute(this, "src");
  }

  set src(val) {
    this.setAttribute("src", `${val}`);
  }

  get poster() {
    return getVideoAttribute(this, "poster") ?? "";
  }

  set poster(val) {
    this.setAttribute("poster", `${val}`);
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
    return getVideoAttribute(this, "crossorigin");
  }

  set crossOrigin(val) {
    this.setAttribute("crossorigin", `${val}`);
  }

  get autoplay() {
    return getVideoAttribute(this, "autoplay") != null;
  }

  set autoplay(val) {
    if (val) {
      this.setAttribute("autoplay", "");
    } else {
      // Remove boolean attribute if false, 0, '', null, undefined.
      this.removeAttribute("autoplay");
    }
  }

  get loop() {
    return getVideoAttribute(this, "loop") != null;
  }

  set loop(val) {
    if (val) {
      this.setAttribute("loop", "");
    } else {
      // Remove boolean attribute if false, 0, '', null, undefined.
      this.removeAttribute("loop");
    }
  }

  get muted() {
    return getVideoAttribute(this, "muted") != null;
  }

  set muted(val) {
    if (val) {
      this.setAttribute("muted", "");
    } else {
      // Remove boolean attribute if false, 0, '', null, undefined.
      this.removeAttribute("muted");
    }
  }
}

/** @type {(el: VideoApiElement, name: string) => ?string} */
function getVideoAttribute(el, name) {
  return el.video ? el.video.getAttribute(name) : el.getAttribute(name);
}

export default VideoApiElement;
