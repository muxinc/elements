/* eslint @typescript-eslint/triple-slash-reference: "off" */
/// <reference path="../../../node_modules/mux-embed/dist/types/mux-embed.d.ts" preserve="true" />
import MuxVideoElement from '@mux/mux-video';
/** @TODO publish types for package to use here (CJP) */
// @ts-ignore
import mux from '@mux/mux-data-google-ima';
import { MuxAdManagerConfig, MuxAdManager } from './ads-manager';
// import type { MuxDataSDK } from '@mux/playback-core';

const serializeAttributes = (attrs = {}) => {
  return (
    ' ' +
    Object.entries(attrs)
      .map(([key, value]) => (value === '' ? `${key}` : `${key}="${value}"`))
      .join(' ')
  );
};

const Attributes = {
  AD_TAG_URL: 'adtagurl',
  AD_BREAK: 'adbreak',
} as const;

class MuxVideoAds extends MuxVideoElement {
  #muxAdManager: MuxAdManager | undefined;

  static getTemplateHTML = (attrs: Record<string, string>) => {
    return `
<style>
:host {
  aspect-ratio: var(--media-aspect-ratio, 16 / 9);
  display: inline-block;
  line-height: 0;
  width: 100%;
  height: 100%;
  display: block;
}
video {
  display: block;
  max-width: 100%;
  max-height: 100%;
  min-width: 100%;
  min-height: 100%;
  object-fit: var(--media-object-fit, contain);
  object-position: var(--media-object-position, 50% 50%);
}
video::-webkit-media-text-track-container {
  transform: var(--media-webkit-text-track-transform);
  transition: var(--media-webkit-text-track-transition);
}
#mainContainer {
    position: relative;
    width: 100%;
    height: 100%;
}
#adContainer {
    position: absolute;
    top: 0px;
    left: 0px;
    bottom: 0px;
    right: 0px;
    z-index: -1;
    width: 100%;
    height: 100%;
}
#mainContainer #adContainer.ad-playing {
    z-index: 2;
}
#imaUnavailableMessage {
  position: absolute;
  top: 40%;
  left: 50%;
  transform: translateX(-50%);
  z-index: 10;
  background: rgba(0, 0, 0, 0.75);
  color: white;
  padding: 1em 1.5em;
  border-radius: 6px;
  font-size: 0.9em;
  text-align: center;
  max-width: 90%;
  line-height: 1.4;
  box-shadow: 0 4px 12px rgba(0,0,0,0.5);
}
</style>
<div id="mainContainer">
    <slot name="media">
      <video id="contentElement" ${serializeAttributes(attrs)}></video>
    </slot>
  <div id="adContainer"></div>
</div>
<slot></slot>
  `;
  };

  constructor() {
    super();

    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width, height } = entry.contentRect;
        if (width > 0 && height > 0) {
          this.#muxAdManager?.updateAdsManagerSize(width, height);
        }
      }
    });
    resizeObserver.observe(this);
  }

  connectedCallback(): void {
    console.log('MuxVideoAds connectedCallback');
    super.connectedCallback();

    if (!MuxAdManager.isGoogleImaSDKAvailable()) {
      console.error('Missing google.ima SDK. Make sure you include it via a script tag.');
      this.#showAdBlockedMessage();
      return;
    }

    console.log('AdBreak connectedCallbk', this.adBreak, this.adTagUrl);

    const config: MuxAdManagerConfig = {
      videoElement: this,
      contentVideoElement: this.nativeEl,
      originalSize: this.getBoundingClientRect(),
    };

    this.#muxAdManager = new MuxAdManager(config);
    this.#muxAdManager.setupAdsManager(this.#adContainer);

    this.#setupEventListeners();
  }

  #showAdBlockedMessage() {
    const fallback = document.createElement('div');
    fallback.id = 'imaUnavailableMessage';
    fallback.innerHTML = `
  <strong>Ad experience unavailable.</strong><br />
  <span>This may be due to a missing SDK, network issue, or ad blocker.</span>
`;
    this.shadowRoot?.getElementById('mainContainer')?.appendChild(fallback);
  }

  #setupEventListeners(): void {
    this.addEventListener(
      'loadedmetadata',
      () => {
        console.log('loadedmetadata', {
          adTagUrl: this.adTagUrl,
          isReady: this.#muxAdManager?.isReadyForInitialization(),
        });
        if (this.adTagUrl && this.#muxAdManager?.isReadyForInitialization()) {
          this.#muxAdManager.initializeAdDisplayContainer();
          const prevPaused = this.nativeEl.paused;
          if (!this.nativeEl.paused) {
            this.nativeEl.pause();
          }
          if (!prevPaused) {
            this.#muxAdManager.requestAds(this.adTagUrl);
          }
        }
      },
      { once: true }
    );

    this.addEventListener('play', this.play);

    this.addEventListener('onAdsCompleted', () => {
      this.#adBreak = false;
      this.dispatchEvent(new Event('durationchange'));
      this.adTagUrl = undefined;
      this.#setAdContainerPlaying(false);
      this.#dispatchAdBreakChange(false);
      setTimeout(() => {
        this.play();
      }, 200);
    });

    //TODO: should we move this to muxplayer?
    globalThis.addEventListener('mediaenterfullscreenrequest', () => {
      this.#muxAdManager?.updateViewMode(true);
    });

    //TODO: should we move this to muxplayer?
    globalThis.addEventListener('mediaexitfullscreenrequest', () => {
      this.#muxAdManager?.updateViewMode(false);
    });
  }

  get #adContainer() {
    return this.shadowRoot?.getElementById('adContainer') as HTMLElement;
  }

  get #mainContainer() {
    return this.shadowRoot?.getElementById('mainContainer') as HTMLElement;
  }

  get adTagUrl(): string | undefined {
    return this.getAttribute(Attributes.AD_TAG_URL) ?? undefined;
  }

  set adTagUrl(value: string | undefined) {
    if (value === this.adTagUrl) return;
    if (value === undefined) {
      this.removeAttribute(Attributes.AD_TAG_URL);
      return;
    }
    this.setAttribute(Attributes.AD_TAG_URL, value);
  }

  get adBreak(): boolean {
    return this.hasAttribute(Attributes.AD_BREAK);
  }

  set #adBreak(val: boolean) {
    if (val === this.adBreak) return;
    this.toggleAttribute(Attributes.AD_BREAK, !!val);
    this.#dispatchAdBreakChange(val);
  }

  #dispatchAdBreakChange(isAdBreak: boolean): void {
    this.dispatchEvent(
      new CustomEvent('adbreakchange', {
        detail: { isAdBreak },
        composed: true,
        bubbles: true,
      })
    );
  }

  onEnded() {
    //TODO: this is a hack to prevent the play event from being called twice but we are able to propagate the event to the parent
    this.dispatchEvent(new CustomEvent('ended', { composed: true, bubbles: true }));
    if (this.adTagUrl && this.#muxAdManager?.isReadyForComplete()) {
      this.#muxAdManager.contentComplete();
    }
  }

  play() {
    //TODO: this is a hack to prevent the play event from being called twice but we are able to propagate the event to the parent
    this.removeEventListener('play', this.play);
    this.dispatchEvent(new CustomEvent('play', { composed: true, bubbles: true }));
    this.addEventListener('play', this.play);

    if (this.adTagUrl && this.adBreak) {
      this.#muxAdManager?.resumeAdManager();
      this.dispatchEvent(new Event('playing'));
      return Promise.resolve();
    }

    if (this.adTagUrl) {
      this.#adBreak = true;
      this.dispatchEvent(new Event('durationchange'));
      this.#setAdContainerPlaying(true);

      if (this.#muxAdManager?.isReadyForInitialization()) {
        this.#muxAdManager.initializeAdDisplayContainer();
      }

      if (this.#muxAdManager?.isReadyForInitialization() || this.#muxAdManager?.isInitialized()) {
        this.#muxAdManager.requestAds(this.adTagUrl);
        this.addEventListener('ended', this.onEnded, { once: true });
      } else if (this.#muxAdManager?.isAdPaused()) {
        this.#muxAdManager.resumeAdManager();
      }

      return Promise.resolve();
    }
    this.#setAdContainerPlaying(false);
    return super.play();
  }

  pause(): void {
    //TODO: this is a hack to prevent the play event from being called twice but we are able to propagate the event to the parent
    this.removeEventListener('pause', this.pause);
    this.dispatchEvent(new CustomEvent('pause', { composed: true, bubbles: true }));
    this.addEventListener('pause', this.pause);

    if (this.adBreak) {
      this.#muxAdManager?.pauseAdManager();
    }
    super.pause();
  }

  get paused(): boolean {
    if (this.adBreak) {
      return this.#muxAdManager?.isAdPaused() ?? false;
    }
    return super.paused;
  }

  #setAdContainerPlaying(isPlaying: boolean): void {
    this.#adContainer?.classList.toggle('ad-playing', isPlaying);
  }

  get duration(): number {
    if (this.adBreak) {
      return this.#muxAdManager?.getDuration() ?? 0;
    }
    return super.duration;
  }

  get currentTime(): number {
    if (this.adBreak) {
      return this.#muxAdManager?.getCurrentTime() ?? 0;
    }
    return super.currentTime;
  }

  set currentTime(val: number) {
    if (this.adBreak) {
      console.error('CANNOT SEEK DURING AD BREAK');
      // this.dispatchEvent(new Event('timeupdate'));
      return;
    }
    super.currentTime = val;
  }

  get volume(): number {
    if (this.adBreak) {
      return this.#muxAdManager?.getVolume() ?? 0;
    }
    return super.volume;
  }

  set volume(val: number) {
    if (this.adBreak) {
      this.#muxAdManager?.setVolume(val);
    }
    super.volume = val;
  }

  get muted(): boolean {
    if (this.adBreak) {
      return !this.#muxAdManager?.getVolume();
    }
    return super.muted;
  }

  set muted(val: boolean) {
    if (this.adBreak) {
      this.#muxAdManager?.setVolume(val ? 0 : this.volume);
    }
    super.muted = val;
  }

  get readyState(): number {
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

  // get muxDataSDK() {
  //   return mux as MuxDataSDK;
  // }

  get muxDataSDKOptions() {
    return {
      imaAdsLoader: this.#muxAdManager?.adsLoader,
    };
  }
}

type MuxVideoAdsElementType = typeof MuxVideoAds;
declare global {
  var MuxVideoAds: MuxVideoAdsElementType; // eslint-disable-line
}

if (globalThis.customElements && !globalThis.customElements.get('mux-video-ads')) {
  globalThis.customElements.define('mux-video-ads', MuxVideoAds);
  globalThis.MuxVideoAds = MuxVideoAds;
}

export default MuxVideoAds;
