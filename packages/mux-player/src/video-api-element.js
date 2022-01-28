const VideoAttributeNames = [
  'autoplay',
  'crossorigin',
  'loop',
  'muted',
  'playsinline',
  'src',
];

class VideoApiElement extends HTMLElement {
  static get observedAttributes() {
    return [...VideoAttributeNames];
  }

  constructor() {
    super();

    this.querySelectorAll(':scope > track').forEach((track) => {
      this.video?.append(track.cloneNode());
    });

    // Watch for child adds/removes and update the native element if necessary
    /** @type {(mutationList: MutationRecord[]) => void} */
    const mutationCallback = (mutationsList) => {
      for (let mutation of mutationsList) {
        if (mutation.type === 'childList') {
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
    if (VideoAttributeNames.includes(attrName)) {
      this.video?.setAttribute(attrName, newValue);
    }
  }

  /** @typedef { import("@mux-elements/mux-video").default } MuxVideoElement */

  /** @type {MuxVideoElement | null | undefined} */
  get video() {
    return this.shadowRoot?.querySelector('mux-video');
  }

  get autoplay() {
    return getVideoAttribute(this, 'autoplay') != null;
  }

  get crossOrigin() {
    return getVideoAttribute(this, 'crossorigin');
  }

  get loop() {
    return getVideoAttribute(this, 'loop') != null;
  }

  get muted() {
    return getVideoAttribute(this, 'muted') != null;
  }

  get src() {
    return getVideoAttribute(this, 'src');
  }

  set src(val) {
    if (val == null) {
      this.removeAttribute('src');
    } else {
      this.setAttribute('src', val);
    }
  }
}

/** @type {(el: VideoApiElement, name: string) => ?string} */
function getVideoAttribute(el, name) {
  return el.video ? el.video.getAttribute(name) : el.getAttribute(name);
}

export default VideoApiElement;
