import { GoogleImaClientProvider } from './google-ima-client-provider';
import type { CustomVideoElement } from 'custom-media-element';
import { Events as AdEvents, AdEvent } from './events.js';
import { Constructor, IAdsVideo } from './types.js';

export * from './events.js';
export * from './types.js';

export const Attributes = {
  AD_TAG_URL: 'ad-tag-url',
  ALLOW_AD_BLOCKER: 'allow-ad-blocker',
} as const;

type VideoBackup = {
  currentTime: number;
};

export function AdsVideoMixin<T extends CustomVideoElement>(superclass: T): Constructor<IAdsVideo> & T {
  class AdsVideo extends superclass implements IAdsVideo {
    static get observedAttributes() {
      return [...super.observedAttributes, 'src', Attributes.AD_TAG_URL];
    }

    static get Events() {
      // Filter out any duplicate events with a Set.
      return [...new Set([...(super.Events ?? []), ...Object.values(AdEvents)])];
    }

    static getTemplateHTML = (attrs: Record<string, string>) => {
      return (
        superclass.getTemplateHTML(attrs) +
        /*html*/ `
          <style>
            :host {
              position: relative;
            }

            #ad-container {
              position: absolute;
              top: 0px;
              left: 0px;
              bottom: 0px;
              right: 0px;
              z-index: -1;
              width: 100%;
              height: 100%;
            }

            #ad-container.ad-break {
              z-index: 0;
            }

            #ima-unavailable-message {
              position: absolute;
              inset: 0;
              z-index: 10;
              background: rgba(0, 0, 0, 0.75);
              color: white;
              font-size: 0.9em;
              text-align: center;
              line-height: 1.4;
              align-items: center;
              align-content: center;
              cursor: not-allowed;
            }

            #ima-unavailable-message h4 {
              font-size: 1rem;
              margin: 0;
            }
          </style>
          <div id="ad-container"></div>
        `
      );
    };

    #videoMetadataLoaded = false;
    #oldAdTagUrl?: string | null;
    #adProvider?: GoogleImaClientProvider;
    #videoBackup?: VideoBackup;

    connectedCallback() {
      super.connectedCallback();

      if (!GoogleImaClientProvider.isSDKAvailable()) {
        console.error('Missing google.ima SDK. Make sure you include it via a script tag.');

        if (!this.allowAdBlocker) {
          this.#showAdBlockedMessage();
        }
        return;
      }

      if (!this.#adProvider) {
        this.#adProvider = new GoogleImaClientProvider({
          adContainer: this.#adContainer,
          videoElement: this.nativeEl,
          originalSize: this.getBoundingClientRect(),
        });

        for (const event of Object.values(AdEvents)) {
          this.#adProvider.addEventListener(event, this);
        }
      }
    }

    attributeChangedCallback(attrName: string, oldValue?: string | null, newValue?: string | null): void {
      super.attributeChangedCallback(attrName, oldValue, newValue);

      if (attrName === 'src' && newValue !== oldValue) {
        // If subsequent videos are loaded, reset the old ad tag url
        // to allow the same ads to be requested for a new video.
        // Don't use events to reset the state as they could be triggered
        // if Google IMA reuses the same video element for ads.
        this.#oldAdTagUrl = undefined;
        this.#videoBackup = undefined;
        this.#videoMetadataLoaded = false;
      }

      if (attrName === Attributes.AD_TAG_URL) {
        this.#resetAds();
      }
    }

    /**
     * See https://github.com/muxinc/media-elements/blob/main/packages/custom-media-element/custom-media-element.ts#L345-L359
     * In custom-media-element this method forwards events from the native video element to the custom element.
     */
    handleEvent(event: Event | AdEvent): void {
      if (event instanceof AdEvent) {
        this.#handleAdEvent(event);
        return;
      }

      // If we are in an ad-break block the events from the native video element.
      // This can happen when Google IMA reuses the same video element for ads.
      if (this.#adProvider?.adBreak) {
        return;
      }

      if (event.type === 'loadedmetadata') {
        this.#onLoadedMetadata();
      } else if (event.type === 'play') {
        this.#onPlay();
      }

      super.handleEvent(event);
    }

    #onLoadedMetadata() {
      this.#videoMetadataLoaded = true;
      // When a new video is loaded, make sure we reset the ads.
      this.#resetAds();
    }

    #onPlay() {
      // Make sure the ads are reset before playing if needed.
      this.#resetAds();
      this.#adProvider?.initializeAdDisplayContainer();
    }

    #resetAds() {
      if (this.adTagUrl) {
        this.#requestAds();
      } else {
        this.#destroyAds();
      }
    }

    async #requestAds() {
      // The container element must be in the DOM to initialize the ad display container.
      if (!this.adTagUrl || !this.isConnected) return;

      // Wait until the video metadata has loaded before requesting ads to avoid unnecessary requests.
      if (!this.#videoMetadataLoaded) return;

      if (this.adTagUrl !== this.#oldAdTagUrl) {
        this.#oldAdTagUrl = this.adTagUrl;
        this.#adProvider?.requestAds(this.adTagUrl);
      }
    }

    #destroyAds() {
      this.#adProvider?.unload();
      this.#oldAdTagUrl = undefined;
    }

    get #adContainer() {
      return this.shadowRoot?.getElementById('ad-container') as HTMLElement;
    }

    #showAdBlockedMessage() {
      if (this.shadowRoot?.querySelector('#ima-unavailable-message')) {
        return;
      }

      this.#adContainer?.insertAdjacentHTML(
        'afterend',
        /* html */ `
          <div id="ima-unavailable-message">
            <h4>Ad experience unavailable.</h4>
            <span>This may be due to a missing SDK, network issue, or ad blocker.</span>
          </div>
        `
      );
    }

    #handleAdEvent(event: Event | AdEvent) {
      if (event.type === AdEvents.AD_BREAK_START) {
        this.#onAdBreakStart();
        this.#dispatchAdEvent(AdEvents.DURATION_CHANGE);
        this.#dispatchAdEvent(event.type);
        return;
      }

      if (event.type === AdEvents.AD_BREAK_END) {
        this.#onAdBreakEnd();
        this.#dispatchAdEvent(AdEvents.DURATION_CHANGE);
        this.#dispatchAdEvent(event.type);
        return;
      }

      this.#dispatchAdEvent(event.type);
    }

    #dispatchAdEvent(eventType: string) {
      // Composed events are forwarded to parent shadow hosts (e.g. mux-player).
      this.dispatchEvent(new AdEvent(eventType, { composed: true }));
    }

    #onAdBreakStart() {
      this.#adContainer?.classList.toggle('ad-break', true);

      if (!this.ad?.isLinear()) {
        return;
      }

      super.pause();

      this.#videoBackup = {
        currentTime: super.currentTime,
      };
    }

    #onAdBreakEnd() {
      this.#adContainer?.classList.toggle('ad-break', false);

      if (this.#videoBackup?.currentTime) {
        this.currentTime = this.#videoBackup.currentTime;
      }

      this.#videoBackup = undefined;

      setTimeout(() => {
        if (!super.ended) {
          try {
            this.play();
          } catch {
            // Ignore abort errors
          }
        }
      }, 100);
    }

    play() {
      if (!GoogleImaClientProvider.isSDKAvailable() && !this.allowAdBlocker) {
        return Promise.reject(new Error('Playback failed: Ad experience not available'));
      }
      if (this.#adProvider?.adBreak) {
        return this.#adProvider.play();
      }
      return super.play();
    }

    pause() {
      if (this.#adProvider?.adBreak) {
        this.#adProvider?.pause();
      }
      super.pause();
    }

    get ad() {
      return this.#adProvider?.ad;
    }

    get adsLoader() {
      if (!this.#adProvider) {
        console.warn('adsLoader not available yet');
      }
      return this.#adProvider?.adsLoader;
    }

    get adTagUrl() {
      return this.getAttribute(Attributes.AD_TAG_URL) ?? undefined;
    }

    set adTagUrl(value) {
      if (value == this.adTagUrl) return;

      if (value == null) {
        this.removeAttribute(Attributes.AD_TAG_URL);
      } else {
        this.setAttribute(Attributes.AD_TAG_URL, value);
      }
    }

    get allowAdBlocker() {
      return this.hasAttribute(Attributes.ALLOW_AD_BLOCKER);
    }

    set allowAdBlocker(val) {
      this.toggleAttribute(Attributes.ALLOW_AD_BLOCKER, Boolean(val));
    }

    get paused() {
      if (this.#adProvider?.adBreak) {
        return this.#adProvider?.paused ?? false;
      }
      return super.paused;
    }

    get duration() {
      if (this.#adProvider?.adBreak) {
        return this.#adProvider?.duration ?? 0;
      }
      return super.duration;
    }

    get currentTime() {
      if (this.#adProvider?.adBreak) {
        return this.#adProvider?.currentTime ?? 0;
      }
      return super.currentTime;
    }

    set currentTime(val) {
      if (this.#adProvider?.adBreak) {
        return;
      }
      super.currentTime = val;
    }

    get volume() {
      if (this.#adProvider?.adBreak) {
        return this.#adProvider?.volume ?? 0;
      }
      return super.volume;
    }

    set volume(val) {
      if (this.#adProvider?.adBreak) {
        if (this.#adProvider) {
          this.#adProvider.volume = val;
        }
      }
      super.volume = val;
    }

    get muted() {
      if (this.#adProvider?.adBreak) {
        return !this.#adProvider?.volume;
      }
      return super.muted;
    }

    set muted(val) {
      if (this.#adProvider?.adBreak) {
        if (this.#adProvider) {
          this.#adProvider.volume = val ? 0 : this.volume;
        }
      }
      super.muted = val;
    }

    get readyState() {
      if (this.#adProvider?.adBreak) {
        return 4;
      }
      return super.readyState;
    }

    async requestPictureInPicture(): Promise<PictureInPictureWindow> {
      if (this.#adProvider?.adBreak) {
        throw new Error('Cannot use PiP while ads are playing!');
      }
      return super.requestPictureInPicture();
    }
  }

  return AdsVideo as unknown as Constructor<IAdsVideo> & T;
}
