import MuxVideoElement from '@mux/mux-video';
import { MuxAdManagerConfig, MuxAdManager } from './ads-manager';

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
  #mediaIsFullscreen = false;

  static getTemplateHTML = (attrs: Record<string, string>) => {
    return `
<style>
:host {
    display: inline-block;
    line-height: 0;
}
#mainContainer {
    position: relative;
}
#adContainer {
    position: absolute;
    top: 0px;
    left: 0px;
    bottom: 0px;
    right: 0px;
    z-index: -1;
}
#mainContainer #adContainer.ad-playing {
    z-index: 2;
}
</style>
<div id="mainContainer">
  <div id="content">
    <video id="contentElement" ${serializeAttributes(attrs)}></video>
  </div>
  <div id="adContainer"></div>
</div>
<slot></slot>
  `;
  };

  constructor() {
    super();
  }

  connectedCallback(): void {
    console.log('MuxVideoAds connectedCallback');
    super.connectedCallback();

    if (!MuxAdManager.isGoogleImaSDKAvailable()) {
      console.error('Missing google.ima SDK. Make sure you include it via a script tag.');
      return;
    }

    console.log('AdBreak connectedCallbk', this.#adBreak, this.adTagUrl);

    const config: MuxAdManagerConfig = {
      videoElement: this,
      isFullscreen: this.mediaIsFullscreen,
      contentVideoElement: this.nativeEl,
    };

    this.#muxAdManager = new MuxAdManager(config);
    this.#muxAdManager.setupAdsManager(this.#adContainer);

    this.#setupEventListeners();
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

    this.addEventListener(
      'ended',
      () => {
        console.log('ended', { adTagUrl: this.adTagUrl, isReady: this.#muxAdManager?.isReadyForComplete() });
        if (this.adTagUrl && this.#muxAdManager?.isReadyForComplete()) {
          this.#muxAdManager.contentComplete();
        }
      },
      { once: true }
    );

    this.addEventListener('play', this.play);

    this.addEventListener('onAdsCompleted', () => {
      this.#adBreak = false;
      this.adTagUrl = undefined;
      this.#setAdContainerPlaying(false);
      this.#dispatchAdBreakChange(false);
      this.removeEventListener('play', this.play);
      setTimeout(() => {
        this.play();
      }, 200);
    });

    this.addEventListener('webkitbeginfullscreen', () => {
      this.#mediaIsFullscreen = true;
      this.#muxAdManager?.updateViewMode(true);
    });

    this.addEventListener('webkitendfullscreen', () => {
      this.#mediaIsFullscreen = false;
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

  get #adBreak(): boolean {
    return this.#mainContainer.hasAttribute(Attributes.AD_BREAK);
  }

  set #adBreak(val: boolean) {
    if (val === this.#adBreak) return;
    this.#mainContainer.toggleAttribute(Attributes.AD_BREAK, val);
    this.#dispatchAdBreakChange(val);
  }

  #dispatchAdBreakChange(isAdBreak: boolean): void {
    this.dispatchEvent(
      new CustomEvent('adbreakchange', {
        detail: { isAdBreak },
      })
    );
  }

  play() {
    console.log('play', { adTagUrl: this.adTagUrl });

    if (this.adTagUrl) {
      this.#setAdContainerPlaying(true);
      if (this.#muxAdManager?.isReadyForInitialization()) {
        console.log('initializeAdDisplayContainer');
        this.#muxAdManager.initializeAdDisplayContainer();
        this.#muxAdManager.requestAds(this.adTagUrl);
      } else if (this.#muxAdManager?.isAdPaused()) {
        console.log('resumeAdManager');
        this.#muxAdManager.resumeAdManager();
      }
      return Promise.resolve();
    }
    this.#setAdContainerPlaying(false);
    return super.play();
  }

  pause(): void {
    if (this.#adBreak) {
      this.#muxAdManager?.pauseAdManager();
    }
    super.pause();
  }

  #setAdContainerPlaying(isPlaying: boolean): void {
    this.#adContainer?.classList.toggle('ad-playing', isPlaying);
  }

  get duration(): number {
    if (this.#adBreak) {
      return this.#muxAdManager?.getDuration() ?? 0;
    }
    return super.duration;
  }

  get currentTime(): number {
    if (this.#adBreak) {
      return this.#muxAdManager?.getCurrentTime() ?? 0;
    }
    return super.currentTime;
  }

  set currentTime(val: number) {
    if (this.#adBreak) {
      console.error('CANNOT SEEK DURING AD BREAK');
      this.dispatchEvent(new Event('timeupdate'));
      return;
    }
    super.currentTime = val;
  }

  get volume(): number {
    if (this.#adBreak) {
      return this.#muxAdManager?.getVolume() ?? 0;
    }
    return super.volume;
  }

  set volume(val: number) {
    if (this.#adBreak) {
      this.#muxAdManager?.setVolume(val);
    }
    super.volume = val;
  }

  get muted(): boolean {
    if (this.#adBreak) {
      return !this.#muxAdManager?.getVolume();
    }
    return super.muted;
  }

  set muted(val: boolean) {
    if (this.#adBreak) {
      this.#muxAdManager?.setVolume(val ? 0 : this.volume);
    }
    super.muted = val;
  }

  get readyState(): number {
    if (this.#adBreak) {
      return 4;
    }
    return super.readyState;
  }

  async requestPictureInPicture(): Promise<PictureInPictureWindow> {
    if (this.#adBreak) {
      throw new Error('Cannot use PiP while ads are playing!');
    }
    return super.requestPictureInPicture();
  }

  get mediaIsFullscreen(): boolean {
    return this.#mediaIsFullscreen;
  }

  set mediaIsFullscreen(val: boolean) {
    if (val === this.mediaIsFullscreen) return;
    this.#mediaIsFullscreen = val;
  }
}

type MuxVideoAdsElementType = typeof MuxVideoAds;
declare global {
  var MuxVideoAds: MuxVideoAdsElementType; // eslint-disable-line
}

if (!globalThis.customElements.get('mux-video-ads')) {
  globalThis.customElements.define('mux-video-ads', MuxVideoAds);
  globalThis.MuxVideoAds = MuxVideoAds;
}

export default MuxVideoAds;
