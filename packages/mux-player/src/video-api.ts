import { VideoEvents } from '@mux-elements/mux-video';
import type MuxVideoElement from '@mux-elements/mux-video';
import * as logger from './logger';

const AllowedVideoAttributes = {
  AUTOPLAY: 'autoplay',
  CROSSORIGIN: 'crossorigin',
  LOOP: 'loop',
  MUTED: 'muted',
  PLAYSINLINE: 'playsinline',
  SRC: 'src',
  POSTER: 'poster',
  PRELOAD: 'preload',
};

const CustomVideoAttributes = {
  VOLUME: 'volume',
  PLAYBACKRATE: 'playbackrate',
  // This muted attribute also reflects to the muted property while the muted
  // attribute on a native video element reflects only to video.defaultMuted.
  MUTED: 'muted',
};

const AllowedVideoEvents = VideoEvents.filter((type) => type !== 'error');
const AllowedVideoAttributeNames = Object.values(AllowedVideoAttributes);
const CustomVideoAttributesNames = Object.values(CustomVideoAttributes);

/**
 * Gets called from mux-player when mux-video is rendered and upgraded.
 * We might just merge VideoApiElement in MuxPlayerElement and remove this?
 */
export function initVideoApi(el: VideoApiElement) {
  el.querySelectorAll(':scope > track').forEach((track) => {
    el.media?.append(track.cloneNode());
  });

  // The video events are dispatched on the VideoApiElement instance.
  // This makes it possible to add event listeners before the element is upgraded.
  AllowedVideoEvents.forEach((type) => {
    el.media?.addEventListener(type, (evt) => {
      el.dispatchEvent(new Event(evt.type));
    });
  });
}

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

    this.querySelectorAll(':scope > track').forEach((track) => {
      this.media?.append(track.cloneNode());
    });

    // Watch for child adds/removes and update the native element if necessary
    /** @type {(mutationList: MutationRecord[]) => void} */
    const mutationCallback = (mutationsList: MutationRecord[]) => {
      for (const mutation of mutationsList) {
        if (mutation.type === 'childList') {
          // Child being removed
          mutation.removedNodes.forEach((node) => {
            const track = this.media?.querySelector(`track[src="${(node as HTMLTrackElement).src}"]`);
            if (track) this.media?.removeChild(track);
          });

          mutation.addedNodes.forEach((node) => {
            this.media?.append(node.cloneNode());
          });
        }
      }
    };

    const observer = new MutationObserver(mutationCallback);
    observer.observe(this, { childList: true, subtree: true });
  }

  attributeChangedCallback(attrName: string, oldValue: string | null, newValue: string) {
    switch (attrName) {
      case CustomVideoAttributes.MUTED: {
        if (this.media) {
          this.media.muted = newValue != null;
        }
        return;
      }
      case CustomVideoAttributes.VOLUME: {
        const val = +newValue;
        if (this.media && !Number.isNaN(val)) {
          this.media.volume = val;
        }
        return;
      }
      case CustomVideoAttributes.PLAYBACKRATE: {
        const val = +newValue;
        if (this.media && !Number.isNaN(val)) {
          this.media.playbackRate = val;
        }
        return;
      }
    }
  }

  play() {
    return this.media?.play();
  }

  pause() {
    this.media?.pause();
  }

  get media(): MuxVideoElement | null | undefined {
    return this.shadowRoot?.querySelector('mux-video');
  }

  /**
   * @deprecated please use .media instead
   */
  get video(): MuxVideoElement | null | undefined {
    logger.warn('<mux-player>.video is deprecated, please use .media instead');
    return this.media;
  }

  get hasPlayed() {
    const mc = this.shadowRoot?.querySelector('media-controller');

    if (mc) {
      return mc.hasAttribute('media-has-played');
    }

    return false;
  }

  get paused() {
    return this.media?.paused ?? true;
  }

  get duration() {
    return this.media?.duration ?? NaN;
  }

  get ended() {
    return this.media?.ended ?? false;
  }

  get buffered() {
    return this.media?.buffered;
  }

  get readyState() {
    return this.media?.readyState ?? 0;
  }

  get videoWidth() {
    return this.media?.videoWidth;
  }

  get videoHeight() {
    return this.media?.videoHeight;
  }

  get currentTime() {
    return this.media?.currentTime ?? 0;
  }

  set currentTime(val) {
    if (this.media) {
      this.media.currentTime = Number(val);
    }
  }

  get volume() {
    return this.media?.volume ?? 1;
  }

  set volume(val) {
    if (this.media) {
      this.media.volume = Number(val);
    }
  }

  get src() {
    return getVideoAttribute(this, AllowedVideoAttributes.SRC);
  }

  set src(val) {
    this.setAttribute(AllowedVideoAttributes.SRC, `${val}`);
  }

  get poster() {
    return getVideoAttribute(this, AllowedVideoAttributes.POSTER) ?? '';
  }

  set poster(val) {
    this.setAttribute(AllowedVideoAttributes.POSTER, `${val}`);
  }

  get playbackRate() {
    return this.media?.playbackRate ?? 1;
  }

  set playbackRate(val) {
    if (this.media) {
      this.media.playbackRate = Number(val);
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
      this.setAttribute(AllowedVideoAttributes.AUTOPLAY, typeof val === 'string' ? val : '');
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
      this.setAttribute(AllowedVideoAttributes.LOOP, '');
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
      this.setAttribute(AllowedVideoAttributes.MUTED, '');
    } else {
      // Remove boolean attribute if false, 0, '', null, undefined.
      this.removeAttribute(AllowedVideoAttributes.MUTED);
    }
  }

  get playsInline() {
    return getVideoAttribute(this, AllowedVideoAttributes.PLAYSINLINE) != null;
  }

  set playsInline(val) {
    if (val) {
      this.setAttribute(AllowedVideoAttributes.PLAYSINLINE, '');
    } else {
      // Remove boolean attribute if false, 0, '', null, undefined.
      this.removeAttribute(AllowedVideoAttributes.PLAYSINLINE);
    }
  }

  get preload() {
    return getVideoAttribute(this, AllowedVideoAttributes.PRELOAD);
  }

  set preload(val) {
    if (val) {
      this.setAttribute(AllowedVideoAttributes.PRELOAD, val);
    } else {
      // Remove boolean attribute if false, 0, '', null, undefined.
      this.removeAttribute(AllowedVideoAttributes.PRELOAD);
    }
  }
}

function getVideoAttribute(el: VideoApiElement, name: string) {
  return el.media ? el.media.getAttribute(name) : el.getAttribute(name);
}

export default VideoApiElement;
