import { globalThis } from './polyfills';
import { VideoEvents } from '@mux/mux-video';
import type MuxVideoElement from '@mux/mux-video';
import * as logger from './logger';
import { toNumberOrUndefined } from './utils';

export type CastOptions = {
  receiverApplicationId: string;
  autoJoinPolicy: string;
  androidReceiverCompatible: boolean;
  language: string;
  resumeSavedSession: boolean;
};

export type MuxVideoElementExt = MuxVideoElement & {
  requestCast(options: CastOptions): Promise<undefined>;
};

const AllowedVideoAttributes = {
  AUTOPLAY: 'autoplay',
  CROSSORIGIN: 'crossorigin',
  LOOP: 'loop',
  MUTED: 'muted',
  PLAYSINLINE: 'playsinline',
  PRELOAD: 'preload',
};

const CustomVideoAttributes = {
  VOLUME: 'volume',
  PLAYBACKRATE: 'playbackrate',
  // This muted attribute also reflects to the muted property while the muted
  // attribute on a native video element reflects only to video.defaultMuted.
  MUTED: 'muted',
};

const emptyTimeRanges: TimeRanges = Object.freeze({
  length: 0,
  start(index: number) {
    const unsignedIdx = index >>> 0;
    if (unsignedIdx >= this.length) {
      throw new DOMException(
        `Failed to execute 'start' on 'TimeRanges': The index provided (${unsignedIdx}) is greater than or equal to the maximum bound (${this.length}).`
      );
    }
    return 0;
  },
  end(index: number) {
    const unsignedIdx = index >>> 0;
    if (unsignedIdx >= this.length) {
      throw new DOMException(
        `Failed to execute 'end' on 'TimeRanges': The index provided (${unsignedIdx}) is greater than or equal to the maximum bound (${this.length}).`
      );
    }
    return 0;
  },
});

const AllowedVideoEvents = VideoEvents.filter((type) => type !== 'error');
const AllowedVideoAttributeNames = Object.values(AllowedVideoAttributes).filter(
  (name) => ![AllowedVideoAttributes.PLAYSINLINE].includes(name)
);
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

// NOTE: Some of these are defined in MuxPlayerElement. We may want to apply a
// `Pick<>` on these to also enforce consistency (CJP).
type PartialHTMLVideoElement = Omit<
  HTMLVideoElement,
  | 'disablePictureInPicture'
  | 'height'
  | 'width'
  | 'error'
  | 'seeking'
  | 'onenterpictureinpicture'
  | 'onleavepictureinpicture'
  | 'load'
  | 'cancelVideoFrameCallback'
  | 'getVideoPlaybackQuality'
  | 'requestPictureInPicture'
  | 'requestVideoFrameCallback'
  | 'controls'
  | 'currentSrc'
  | 'disableRemotePlayback'
  | 'mediaKeys'
  | 'networkState'
  | 'onencrypted'
  | 'onwaitingforkey'
  | 'played'
  | 'remote'
  | 'srcObject'
  | 'textTracks'
  | 'addTextTrack'
  | 'canPlayType'
  | 'fastSeek'
  | 'setMediaKeys'
  | 'HAVE_CURRENT_DATA'
  | 'HAVE_ENOUGH_DATA'
  | 'HAVE_FUTURE_DATA'
  | 'HAVE_METADATA'
  | 'HAVE_NOTHING'
  | 'NETWORK_EMPTY'
  | 'NETWORK_IDLE'
  | 'NETWORK_LOADING'
  | 'NETWORK_NO_SOURCE'
  | 'src'
  | 'poster'
  | 'mux' // NOTE: Because of our global types extension of HTMLMediaElement, `mux` is a property that also needs to be omitted (CJP)
>;

interface VideoApiElement extends PartialHTMLVideoElement, HTMLElement {
  addEventListener<K extends keyof HTMLVideoElementEventMap>(
    type: K,
    listener: (this: HTMLVideoElement, ev: HTMLVideoElementEventMap[K]) => any,
    options?: boolean | AddEventListenerOptions
  ): void;
  addEventListener(
    type: string,
    listener: EventListenerOrEventListenerObject,
    options?: boolean | AddEventListenerOptions
  ): void;
  removeEventListener<K extends keyof HTMLVideoElementEventMap>(
    type: K,
    listener: (this: HTMLVideoElement, ev: HTMLVideoElementEventMap[K]) => any,
    options?: boolean | EventListenerOptions
  ): void;
  removeEventListener(
    type: string,
    listener: EventListenerOrEventListenerObject,
    options?: boolean | EventListenerOptions
  ): void;
}

class VideoApiElement extends globalThis.HTMLElement implements VideoApiElement {
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
          this.media.defaultMuted = newValue != null;
        }
        return;
      }
      case CustomVideoAttributes.VOLUME: {
        const val = toNumberOrUndefined(newValue) ?? 1;
        if (this.media) {
          this.media.volume = val;
        }
        return;
      }
      case CustomVideoAttributes.PLAYBACKRATE: {
        const val = toNumberOrUndefined(newValue) ?? 1;
        if (this.media) {
          this.media.playbackRate = val;
          this.media.defaultPlaybackRate = val;
        }
        return;
      }
    }
  }

  play() {
    return this.media?.play() ?? Promise.reject();
  }

  pause() {
    this.media?.pause();
  }

  requestCast(options: CastOptions) {
    return this.media?.requestCast(options);
  }

  get media(): MuxVideoElementExt | null | undefined {
    return this.shadowRoot?.querySelector('mux-video');
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
    return this.media?.buffered ?? emptyTimeRanges;
  }

  get seekable() {
    return this.media?.seekable ?? emptyTimeRanges;
  }

  get readyState() {
    return this.media?.readyState ?? 0;
  }

  get videoWidth() {
    return this.media?.videoWidth ?? 0;
  }

  get videoHeight() {
    return this.media?.videoHeight ?? 0;
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

  get playbackRate() {
    return this.media?.playbackRate ?? 1;
  }

  set playbackRate(val) {
    if (this.media) {
      this.media.playbackRate = Number(val);
    }
  }

  get defaultPlaybackRate() {
    return toNumberOrUndefined(this.getAttribute(CustomVideoAttributes.PLAYBACKRATE)) ?? 1;
  }

  set defaultPlaybackRate(val) {
    if (val != null) {
      this.setAttribute(CustomVideoAttributes.PLAYBACKRATE, `${val}`);
    } else {
      // Remove boolean attribute if false, 0, '', null, undefined.
      this.removeAttribute(CustomVideoAttributes.PLAYBACKRATE);
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
    return this.media?.muted ?? false;
  }

  set muted(val) {
    if (this.media) {
      this.media.muted = Boolean(val);
    }
  }

  get defaultMuted() {
    return getVideoAttribute(this, AllowedVideoAttributes.MUTED) != null;
  }

  set defaultMuted(val) {
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
    logger.error('playsInline is set to true by default and is not currently supported as a setter.');
    // if (val) {
    //   this.setAttribute(AllowedVideoAttributes.PLAYSINLINE, '');
    // } else {
    //   // Remove boolean attribute if false, 0, '', null, undefined.
    //   this.removeAttribute(AllowedVideoAttributes.PLAYSINLINE);
    // }
  }

  get preload() {
    // The browser has a default preload that is only available via the native `media.preload`.
    return (this.media ? this.media.preload : this.getAttribute('preload')) as HTMLVideoElement['preload'];
  }

  set preload(val) {
    // An empty string is a valid value and is an alias for the `auto` value.
    if (['', 'none', 'metadata', 'auto'].includes(val)) {
      this.setAttribute(AllowedVideoAttributes.PRELOAD, val);
    } else {
      this.removeAttribute(AllowedVideoAttributes.PRELOAD);
    }
  }
}

function getVideoAttribute(el: VideoApiElement, name: string) {
  return el.media ? el.media.getAttribute(name) : el.getAttribute(name);
}

export default VideoApiElement;
