/* eslint @typescript-eslint/triple-slash-reference: "off" */
/// <reference types="google_interactive_media_ads_types" preserve="true"/>

export type GoogleImaAdsProviderConfig = {
  customVideoElement: AdsVideoElement;
  videoElement: HTMLVideoElement;
  originalSize: DOMRect;
  adContainer: HTMLElement;
};

type VideoBackup = {
  contentTime: number;
  wasPlaying: boolean;
  originalSrc: string;
};

export type AdsVideoElement = HTMLVideoElement & {
  muxDataKeepSession: boolean;
  unload(): void;
};

export class GoogleImaAdsProvider {
  #adDisplayContainer: google.ima.AdDisplayContainer | undefined;
  #adsLoader: google.ima.AdsLoader | undefined;
  #adsManager: google.ima.AdsManager | undefined;
  #ad: google.ima.Ad | undefined | null;
  #adProgressData: google.ima.AdProgressData | undefined | null;
  #adPaused = false;
  #videoElement: HTMLVideoElement;
  #customVideoElement: AdsVideoElement;
  #viewMode: google.ima.ViewMode;
  #videoBackup: VideoBackup | null = null;
  #originalSize: DOMRect;
  #adContainer: HTMLElement;

  constructor(config: GoogleImaAdsProviderConfig) {
    this.#customVideoElement = config.customVideoElement;
    this.#videoElement = config.videoElement;
    this.#viewMode = google.ima.ViewMode.NORMAL;
    this.#originalSize = config.originalSize;
    this.#adContainer = config.adContainer;
  }

  setupAdsManager() {
    if (!this.#adDisplayContainer) {
      this.#adDisplayContainer = new google.ima.AdDisplayContainer(this.#adContainer, this.#videoElement);
      this.#adsLoader = new google.ima.AdsLoader(this.#adDisplayContainer);

      this.#adsLoader.addEventListener(
        google.ima.AdsManagerLoadedEvent.Type.ADS_MANAGER_LOADED,
        (adsManagerLoadedEvent: google.ima.AdsManagerLoadedEvent) => {
          const adsRenderingSettings = new google.ima.AdsRenderingSettings();
          this.#adsManager = adsManagerLoadedEvent.getAdsManager(this.#videoElement, adsRenderingSettings);
          this.#startAdsManager();
        }
      );

      this.#adsLoader.addEventListener(
        google.ima.AdErrorEvent.Type.AD_ERROR,
        (_adErrorEvent: google.ima.AdErrorEvent) => {
          this.#customVideoElement.dispatchEvent(new Event('adbreakend'));
        }
      );
    }
  }

  #startAdsManager() {
    this.#adsManager?.addEventListener(google.ima.AdEvent.Type.CONTENT_PAUSE_REQUESTED, () => {
      const currentTime = this.#customVideoElement.currentTime;
      const wasPlaying = !this.#customVideoElement.paused;

      if (!this.#videoElement?.paused) {
        this.#videoElement?.pause();
      }

      this.#adPaused = false;

      this.#videoBackup = {
        contentTime: currentTime,
        wasPlaying: wasPlaying,
        originalSrc: this.#customVideoElement.src,
      };

      if (this.isUsingSameVideoElement()) {
        this.#customVideoElement.muxDataKeepSession = true;
        this.#customVideoElement.unload();
        this.#customVideoElement.muxDataKeepSession = false;
      } else {
        this.#videoElement.style.display = 'none';
      }
    });

    this.#adsManager?.addEventListener(google.ima.AdEvent.Type.CONTENT_RESUME_REQUESTED, () => {
      if (this.#videoBackup && this.isUsingSameVideoElement()) {
        this.#customVideoElement.muxDataKeepSession = true;
        this.#customVideoElement.load();
        this.#customVideoElement.muxDataKeepSession = false;

        // Restore content position
        if (this.#videoBackup?.contentTime) {
          this.#customVideoElement.currentTime = this.#videoBackup.contentTime;
        }
      } else {
        // Show the video element again
        this.#videoElement.style.display = '';
      }

      this.#videoBackup = null;

      this.#adProgressData = undefined;
      this.#ad = undefined;
      this.#customVideoElement.dispatchEvent(new Event('durationchange'));
      this.#customVideoElement.dispatchEvent(new Event('adbreakend'));
    });

    this.#adsManager?.addEventListener(google.ima.AdErrorEvent.Type.AD_ERROR, console.error, false);

    this.#adsManager?.addEventListener(google.ima.AdEvent.Type.CLICK, (_adEvent: google.ima.AdEvent) => {
      this.updateViewMode(false);
    });

    this.#adsManager?.addEventListener(google.ima.AdEvent.Type.LOADED, (adEvent: google.ima.AdEvent) => {
      this.#ad = adEvent.getAd();
      this.#customVideoElement.dispatchEvent(new Event('durationchange'));
      this.#customVideoElement.dispatchEvent(new Event('timeupdate'));
    });

    this.#adsManager?.addEventListener(google.ima.AdEvent.Type.STARTED, (adEvent: google.ima.AdEvent) => {
      this.#ad = adEvent.getAd();
      this.#customVideoElement.dispatchEvent(new Event('playing'));
    });

    this.#adsManager?.addEventListener(google.ima.AdEvent.Type.PAUSED, () => {
      this.#adPaused = true;
      this.#customVideoElement.dispatchEvent(new Event('pause'));
    });

    this.#adsManager?.addEventListener(google.ima.AdEvent.Type.RESUMED, () => {
      this.#adPaused = false;
    });

    this.#adsManager?.addEventListener(google.ima.AdEvent.Type.AD_PROGRESS, (adProgressEvent: google.ima.AdEvent) => {
      const prevDuration = this.#customVideoElement.duration;
      this.#adProgressData = adProgressEvent.getAdData() as google.ima.AdProgressData;

      if (prevDuration !== this.#customVideoElement.duration) {
        this.#customVideoElement.dispatchEvent(new Event('durationchange'));
      }
      this.#customVideoElement.dispatchEvent(new Event('timeupdate'));
    });

    this.#adsManager?.addEventListener(google.ima.AdEvent.Type.VOLUME_CHANGED, () => {
      this.#customVideoElement.dispatchEvent(new Event('volumechange'));
    });

    this.#adsManager?.init(this.#originalSize.width, this.#originalSize.height, this.#viewMode);
    this.#adsManager?.start();
  }

  static isGoogleImaSDKAvailable() {
    if (!('google' in globalThis && 'ima' in globalThis['google'])) {
      console.error('Missing google.ima SDK. Make sure you include it via a script tag.');
      return false;
    } else {
      return true;
    }
  }

  isReadyForInitialization() {
    return this.#adDisplayContainer && !this.#adsManager;
  }

  isInitialized() {
    return this.#adDisplayContainer && this.#adsManager;
  }

  isReadyForComplete() {
    return this.#adsLoader && this.#adsManager;
  }

  initializeAdDisplayContainer() {
    this.#adDisplayContainer?.initialize();
  }

  requestAds(adTagUrl: string) {
    const adsRequest = new google.ima.AdsRequest();
    adsRequest.adTagUrl = adTagUrl;
    this.#adsLoader?.requestAds(adsRequest);
  }

  contentComplete() {
    this.#adsLoader?.contentComplete();
  }

  isAdPaused() {
    return this.#adsManager && this.#adPaused;
  }

  resumeAdManager() {
    this.#adsManager?.resume();
    this.#adPaused = false;
  }

  pauseAdManager() {
    if (this.#adsManager) {
      this.#adsManager.pause();
    }
  }

  getDuration() {
    return this.#adProgressData?.duration ?? this.#ad?.getDuration();
  }

  getCurrentTime() {
    return this.#adProgressData?.currentTime;
  }

  getVolume(): number {
    return this.#adsManager?.getVolume() ?? 1;
  }

  setVolume(val: number) {
    this.#adsManager?.setVolume(val);
  }

  isUsingSameVideoElement(): boolean {
    const videoElements = this.#adContainer.querySelectorAll('video');
    return videoElements.length === 0;
  }

  updateViewMode(isFullscreen: boolean) {
    this.#viewMode = isFullscreen ? google.ima.ViewMode.FULLSCREEN : google.ima.ViewMode.NORMAL;
  }

  updateAdsManagerSize(width: number, height: number) {
    this.#originalSize = { ...this.#originalSize, width, height };
    this.#adsManager?.resize(this.#originalSize.width, this.#originalSize.height, this.#viewMode);
  }

  get adsLoader() {
    return this.#adsLoader;
  }
}
