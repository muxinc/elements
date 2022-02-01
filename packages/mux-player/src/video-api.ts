import type MuxVideoElement from "@mux-elements/mux-video";

const AllowedVideoAttributeNames = [
  "autoplay",
  "crossorigin",
  "loop",
  "muted",
  "playsinline",
  "src",
  "poster",
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
      this.video?.setAttribute(attrName, newValue);
    }
  }

  addEventListener(
    type: string,
    listener: EventListenerOrEventListenerObject,
    options?: boolean | EventListenerOptions
  ) {
    if (AllowedVideoEvents.includes(type)) {
      this.video?.addEventListener(type, listener, options);
    }
  }

  removeEventListener(
    type: string,
    listener: EventListenerOrEventListenerObject,
    options?: boolean | EventListenerOptions
  ) {
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

function getVideoAttribute(el: VideoApiElement, name: string) {
  return el.video ? el.video.getAttribute(name) : el.getAttribute(name);
}

export default VideoApiElement;
