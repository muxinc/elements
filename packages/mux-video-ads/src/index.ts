/* eslint @typescript-eslint/triple-slash-reference: "off" */
/// <reference path="../../../node_modules/mux-embed/dist/types/mux-embed.d.ts" preserve="true" />
import MuxVideoElement from '@mux/mux-video';
/** @TODO publish types for package to use here (CJP) */
// @ts-ignore
import mux from '@mux/mux-data-google-ima';
import { MuxAdManagerConfig, MuxAdManager } from './ads-manager';
import type { MuxDataSDK } from '@mux/playback-core';

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
  ALLOW_AD_BLOCKER: 'allow-ad-blocker',
} as const;

class MuxVideoAds extends MuxVideoElement {
  #muxAdManager: MuxAdManager | undefined;
  #lastCurrentime: number | undefined;

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
  top: 0;
  left: 0;
  z-index: 10;
  background: rgba(0, 0, 0, 0.75);
  color: white;
  font-size: 0.9em;
  text-align: center;
  line-height: 1.4;
  width: 100%;
  height: 100%;
  align-items: center;
  align-content: center;
  cursor: not-allowed;

  h4{
    font-size: 1rem;
    margin:0;
  }
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
      if (!this.allowAdBlocker) {
        this.#showAdBlockedMessage();
      } else {
        this.#adBreak = false;
      }
      return;
    }

    console.log('AdBreak connectedCallbk', this.adBreak, this.adTagUrl);

    const config: MuxAdManagerConfig = {
      videoElement: this,
      contentVideoElement: this.nativeEl,
      originalSize: this.getBoundingClientRect(),
      adContainer: this.#adContainer,
    };

    this.#muxAdManager = new MuxAdManager(config);
    this.#muxAdManager.setupAdsManager();

    this.#setupEventListeners();
  }

  #showAdBlockedMessage() {
    const fallback = document.createElement('div');
    fallback.id = 'imaUnavailableMessage';
    fallback.innerHTML = `
  <h4>Ad experience unavailable.</h4>
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

    this.nativeEl.addEventListener('play', (_event) => {
      if (this.adBreak && !this.#isUsingSameVideoElement) {
        console.warn('Video play prevented during ad break');
        this.nativeEl.pause();
        return;
      }
    });

    this.nativeEl.addEventListener('seeking', (_event) => {
      if (this.adBreak && !this.#isUsingSameVideoElement) {
        console.warn('Seek prevented during ad break');
        this.nativeEl.currentTime = this.#lastCurrentime ?? 0;
        this.nativeEl.dispatchEvent(new Event('timeupdate'));
      }
    });

    this.addEventListener('onAdsCompleted', () => {
      this.#adBreak = false;
      this.dispatchEvent(new Event('durationchange'));
      this.adTagUrl = undefined;
      this.#setAdContainerPlaying(false);
      this.#dispatchAdBreakChange(false);
      this.addEventListener('ended', this.onEnded, { once: true });
      setTimeout(() => {
        this.play();
      }, 100);
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
    if (this.adTagUrl && this.#muxAdManager?.isReadyForComplete()) {
      this.#muxAdManager.contentComplete();
    }
  }

  handleEvent(event: Event): void {
    if (this.adBreak && event.type === 'ended') {
      return;
    }
    super.handleEvent(event);
  }

  play() {
    if (this.adTagUrl && this.adBreak) {
      if (this.#muxAdManager?.isAdPaused()) {
        this.#muxAdManager?.resumeAdManager();
      }
      this.dispatchEvent(new Event('playing'));
      return Promise.resolve();
    }

    const adBlockerDetected = !this.#muxAdManager?.adsLoader;

    const adBlockerAndAllowed = adBlockerDetected && this.allowAdBlocker;

    if (this.adTagUrl && !adBlockerAndAllowed) {
      this.#lastCurrentime = this.nativeEl.currentTime;
      this.#adBreak = true;
      this.dispatchEvent(new Event('durationchange'));
      this.#setAdContainerPlaying(true);

      if (this.#muxAdManager?.isReadyForInitialization()) {
        this.#muxAdManager.initializeAdDisplayContainer();
      }

      if (this.#muxAdManager?.isReadyForInitialization() || this.#muxAdManager?.isInitialized()) {
        this.#muxAdManager.requestAds(this.adTagUrl);
      } else if (this.#muxAdManager?.isAdPaused()) {
        this.#muxAdManager.resumeAdManager();
      }

      return Promise.resolve();
    }
    this.#setAdContainerPlaying(false);
    return super.play();
  }

  pause(): void {
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

  get #isUsingSameVideoElement() {
    if (this.#muxAdManager) {
      return this.#muxAdManager.isUsingSameVideoElement();
    }
    return undefined;
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

  get muxDataSDK() {
    return mux as MuxDataSDK;
  }

  get muxDataSDKOptions() {
    return {
      imaAdsLoader: this.#muxAdManager?.adsLoader,
    };
  }

  set muxDataKeepSession(val: boolean) {
    this.toggleAttribute('mux-data-keep-session', Boolean(val));
  }

  get muxDataKeepSession(): boolean {
    return this.hasAttribute('mux-data-keep-session');
  }

  get allowAdBlocker(): boolean {
    return this.hasAttribute(Attributes.ALLOW_AD_BLOCKER);
  }

  set allowAdBlocker(val: boolean) {
    this.toggleAttribute(Attributes.ALLOW_AD_BLOCKER, !!val);
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
