/* eslint @typescript-eslint/triple-slash-reference: "off" */
/// <reference path="../../../../node_modules/mux-embed/dist/types/mux-embed.d.ts" preserve="true" />
/** @TODO publish types for package to use here (CJP) */
// @ts-ignore
import mux from '@mux/mux-data-google-ima';
import { GoogleImaClientProvider } from './google-ima-client-provider';
import type { MuxDataSDK } from '@mux/playback-core';
import type { CustomVideoElement } from 'custom-media-element';
import { Events as AdEvents, AdEvent } from './events';
import { IAdsVideo } from './types';

export const Attributes = {
  AD_TAG_URL: 'ad-tag-url',
  ALLOW_AD_BLOCKER: 'allow-ad-blocker',
} as const;

type VideoBackup = {
  currentTime: number;
};

type Constructor<T> = new (...args: any[]) => T;

export function AdsVideoMixin<T extends CustomVideoElement>(superclass: T): Constructor<IAdsVideo> & T {
  class AdsVideo extends superclass {
    static get observedAttributes() {
      return [...super.observedAttributes, Attributes.AD_TAG_URL];
    }

    static get Events() {
      // Filter out any duplicate events with a Set.
      return [...new Set([...(super.Events ?? []), ...Object.values(AdEvents)])];
    }

    static getTemplateHTML = (attrs: Record<string, string>) => {
      return (
        super.getTemplateHTML(attrs) +
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

          #ad-container.ad-playing {
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

    #oldAdTagUrl?: string | null;
    #adProvider?: GoogleImaClientProvider;
    #lastCurrentime?: number;
    #adBreak = false;
    #resizeObserver?: ResizeObserver;
    #videoBackup?: VideoBackup;
    #muxDataKeepSession = false;

    constructor(...args: any[]) {
      super(...args);

      this.addEventListener('loadedmetadata', this.#onLoadedMetadata);
      this.addEventListener('play', this.#onPlay);

      // TODO: re-evaluate
      // this.nativeEl.addEventListener('play', (_event) => {
      //   if (this.adBreak && !this.#isUsingSameVideoElement()) {
      //     this.nativeEl.pause();
      //     return;
      //   }
      // });

      // this.nativeEl.addEventListener('seeking', (_event) => {
      //   if (this.adBreak && !this.#isUsingSameVideoElement()) {
      //     this.nativeEl.currentTime = this.#lastCurrentime ?? 0;
      //     this.nativeEl.dispatchEvent(new Event('timeupdate'));
      //   }
      // });
    }

    connectedCallback() {
      super.connectedCallback();

      if (!GoogleImaClientProvider.isSDKAvailable()) {
        console.error('Missing google.ima SDK. Make sure you include it via a script tag.');

        if (!this.allowAdBlocker) {
          this.#showAdBlockedMessage();
        }
        return;
      }

      this.#resizeObserver = new ResizeObserver((entries) => {
        for (const entry of entries) {
          const { width, height } = entry.contentRect;
          if (width > 0 && height > 0) {
            this.#adProvider?.resize(width, height);
          }
        }
      });
      this.#resizeObserver?.observe(this);
    }

    disconnectedCallback() {
      super.disconnectedCallback();

      this.#resizeObserver?.disconnect();
      this.#resizeObserver = undefined;
    }

    attributeChangedCallback(attrName: string, oldValue?: string | null, newValue?: string | null): void {
      super.attributeChangedCallback(attrName, oldValue, newValue);

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
      if (this.adBreak) {
        return;
      }

      super.handleEvent(event);
    }

    #onLoadedMetadata() {
      // When a new video is loaded, make sure we reset the ads.
      this.#resetAds();
    }

    #onPlay() {
      // Make sure the ads are reset before playing.
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

    #requestAds() {
      // The container element must be in the DOM to initialize the ad display container.
      if (!this.adTagUrl || !this.isConnected) return;

      if (!this.#adProvider && GoogleImaClientProvider.isSDKAvailable()) {
        this.#adProvider = new GoogleImaClientProvider({
          adContainer: this.#adContainer,
          videoElement: this.nativeEl,
          originalSize: this.getBoundingClientRect(),
        });

        for (const event of Object.values(AdEvents)) {
          this.#adProvider.addEventListener(event, this);
        }
      }

      if (this.adTagUrl !== this.#oldAdTagUrl) {
        this.#oldAdTagUrl = this.adTagUrl;
        this.#adProvider?.requestAds(this.adTagUrl);
      }
    }

    #destroyAds() {
      for (const event of Object.values(AdEvents)) {
        this.#adProvider?.removeEventListener(event, this);
      }

      this.#adProvider?.destroy();
      this.#adProvider = undefined;
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

      if (event.type === AdEvents.AD_ENDED) {
        this.#onAdEnded();
      }

      this.#dispatchAdEvent(event.type);
    }

    #dispatchAdEvent(eventType: string) {
      // Composed events are forwarded to parent shadow hosts (e.g. mux-player).
      this.dispatchEvent(new AdEvent(eventType, { composed: true }));
    }

    #onAdBreakStart() {
      if (this.#adProvider?.ad?.isLinear()) {
        this.#setAdBreak(true);
        super.pause();

        this.#videoBackup = {
          currentTime: this.currentTime,
        };

        if (this.#isUsingSameVideoElement()) {
          // todo: make the following less Mux specific.
          this.muxDataKeepSession = true;
          // @ts-ignore mux-video has an unload method
          this.unload();
          this.muxDataKeepSession = false;
        } else {
          this.nativeEl.style.display = 'none';
        }
      }
    }

    #onAdEnded() {
      if (this.#adProvider?.ad?.isLinear()) {
        if (this.#isUsingSameVideoElement()) {
          // todo: make the following less Mux specific.
          this.muxDataKeepSession = true;
          this.load();
          this.muxDataKeepSession = false;

          if (this.#videoBackup?.currentTime) {
            this.currentTime = this.#videoBackup.currentTime;
          }
        } else {
          // Show the video element again
          this.nativeEl.style.removeProperty('display');
        }

        this.#videoBackup = undefined;
      }
    }

    #onAdBreakEnd() {
      this.#setAdBreak(false);

      setTimeout(() => {
        this.play();
      }, 100);
    }

    #isUsingSameVideoElement() {
      if (this.#adProvider) {
        const videoElements = this.#adContainer.querySelectorAll('video');
        return videoElements.length === 0;
      }
      return undefined;
    }

    #setAdBreak(val: boolean) {
      if (val === this.adBreak) return;
      this.#adBreak = val;
      this.#adContainer?.classList.toggle('ad-playing', this.#adBreak);
    }

    play() {
      if (!GoogleImaClientProvider.isSDKAvailable() && !this.allowAdBlocker) {
        return Promise.reject(new Error('Playback failed: Ad experience not available'));
      }
      if (this.adBreak && this.#adProvider) {
        return this.#adProvider.play();
      }
      return super.play();
    }

    pause() {
      if (this.adBreak) {
        this.#adProvider?.pause();
      }
      super.pause();
    }

    get adBreak() {
      return this.#adBreak;
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

    get paused() {
      if (this.adBreak) {
        return this.#adProvider?.paused ?? false;
      }
      return super.paused;
    }

    get duration() {
      if (this.adBreak) {
        return this.#adProvider?.duration ?? 0;
      }
      return super.duration;
    }

    get currentTime() {
      if (this.adBreak) {
        return this.#adProvider?.currentTime ?? 0;
      }
      return super.currentTime;
    }

    set currentTime(val) {
      if (this.adBreak) {
        return;
      }
      super.currentTime = val;
    }

    get volume() {
      if (this.adBreak) {
        return this.#adProvider?.volume ?? 0;
      }
      return super.volume;
    }

    set volume(val) {
      if (this.adBreak) {
        if (this.#adProvider) {
          this.#adProvider.volume = val;
        }
      }
      super.volume = val;
    }

    get muted() {
      if (this.adBreak) {
        return !this.#adProvider?.volume;
      }
      return super.muted;
    }

    set muted(val) {
      if (this.adBreak) {
        if (this.#adProvider) {
          this.#adProvider.volume = val ? 0 : this.volume;
        }
      }
      super.muted = val;
    }

    get readyState() {
      if (this.adBreak) {
        return 4;
      }
      return super.readyState;
    }

    async requestPictureInPicture(): Promise<PictureInPictureWindow> {
      if (this.adBreak) {
        throw new Error('Cannot use PiP while ads are playing!');
      }
      return super.requestPictureInPicture();
    }

    // todo: remove following Mux specific methods
    get muxDataSDK() {
      return mux as MuxDataSDK;
    }

    get muxDataSDKOptions() {
      return {
        imaAdsLoader: this.#adProvider?.adsLoader,
      };
    }

    set muxDataKeepSession(val) {
      // Don't sprout attributes here, this setter is used internally.
      this.#muxDataKeepSession = Boolean(val);
    }

    get muxDataKeepSession() {
      return this.#muxDataKeepSession;
    }

    get allowAdBlocker() {
      return this.hasAttribute(Attributes.ALLOW_AD_BLOCKER);
    }

    set allowAdBlocker(val) {
      this.toggleAttribute(Attributes.ALLOW_AD_BLOCKER, Boolean(val));
    }
  }
  return AdsVideo as unknown as Constructor<IAdsVideo> & T;
}
