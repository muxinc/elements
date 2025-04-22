/* eslint @typescript-eslint/triple-slash-reference: "off" */
/// <reference types="google_interactive_media_ads_types" preserve="true"/>

import MuxVideoElement from '@mux/mux-video';
import { Hls } from '@mux/playback-core';

export type MuxAdManagerConfig = {
  videoElement: MuxVideoElement;
  contentVideoElement: HTMLVideoElement;
  originalSize: DOMRect;
};

type VideoBackup = {
  contentTime: number;
  wasPlaying: boolean;
  originalSrc: string;
};

export class MuxAdManager {
  #adDisplayContainer: google.ima.AdDisplayContainer | undefined;
  #adsLoader: google.ima.AdsLoader | undefined;
  #adsManager: google.ima.AdsManager | undefined;
  #ad: google.ima.Ad | undefined | null;
  #adProgressData: google.ima.AdProgressData | undefined | null;
  #adPaused = false;
  #videoElement: HTMLVideoElement;
  #customMediaElement: MuxVideoElement;
  #viewMode: google.ima.ViewMode;
  #videoBackup: VideoBackup | null = null;
  #originalSize: DOMRect;

  constructor(config: MuxAdManagerConfig) {
    this.#customMediaElement = config.videoElement;
    this.#videoElement = config.contentVideoElement;
    this.#viewMode = google.ima.ViewMode.NORMAL;
    this.#originalSize = config.originalSize;
  }

  setupAdsManager(adContainer: HTMLElement) {
    if (!this.#adDisplayContainer) {
      this.#adDisplayContainer = new google.ima.AdDisplayContainer(adContainer, this.#videoElement);

      this.#adsLoader = new google.ima.AdsLoader(this.#adDisplayContainer);
      console.log('adsLoader', this.#adsLoader);
      this.#adsLoader.addEventListener(
        google.ima.AdsManagerLoadedEvent.Type.ADS_MANAGER_LOADED,
        (adsManagerLoadedEvent: google.ima.AdsManagerLoadedEvent) => {
          console.log('Ad Manager loaded', adsManagerLoadedEvent);
          const adsRenderingSettings = new google.ima.AdsRenderingSettings();
          this.#adsManager = adsManagerLoadedEvent.getAdsManager(this.#videoElement, adsRenderingSettings);
          console.log('adsManager', this.#adsManager);
          this.#startAdsManager();
        },
        false
      );

      this.#adsLoader.addEventListener(
        google.ima.AdErrorEvent.Type.AD_ERROR,
        (adErrorEvent: google.ima.AdErrorEvent) => {
          console.log('AD_ERROR Loader', adErrorEvent);
          this.#customMediaElement.dispatchEvent(new Event('onAdsCompleted'));
        },
        false
      );
    }
  }

  #startAdsManager() {
    console.log('startAdsManager', this.#adsManager);
    this.#adsManager?.addEventListener(google.ima.AdEvent.Type.CONTENT_PAUSE_REQUESTED, () => {
      console.log('CONTENT_PAUSE_REQUESTED');
      const currentTime = this.#customMediaElement.currentTime;
      const wasPlaying = !this.#customMediaElement.paused;

      if (!this.#videoElement?.paused) {
        this.#videoElement?.pause();
      }

      this.#adPaused = false;

      this.#videoBackup = {
        contentTime: currentTime,
        wasPlaying: wasPlaying,
        originalSrc: this.#customMediaElement.src,
      };

      if (this.isIOSMse(this.#customMediaElement.src)) {
        // this.#customMediaElement.src = '';
        this.#customMediaElement._teardownHls();
      } else {
        // Non-iOS handling
        console.log('Standard content pause for non-iOS');
        this.#videoElement.style.display = 'none';
      }
    });

    this.#adsManager?.addEventListener(
      google.ima.AdEvent.Type.CONTENT_RESUME_REQUESTED,
      () => {
        console.log('CONTENT_RESUME_REQUESTED');
        if (this.#videoBackup && this.isIOSMse(this.#videoBackup.originalSrc)) {
          // this.#customMediaElement.src = this.#videoBackup.originalSrc;
          this.#customMediaElement._initializeHls();

          // Restore content position
          if (this.#videoBackup?.contentTime) {
            this.#customMediaElement.currentTime = this.#videoBackup.contentTime;
          }
        } else {
          // Show the video element again
          this.#videoElement.style.display = '';
        }

        this.#videoBackup = null;

        this.#adProgressData = undefined;
        this.#ad = undefined;
        this.#customMediaElement.dispatchEvent(new Event('durationchange'));
        this.#customMediaElement.dispatchEvent(new Event('onAdsCompleted'));
      },
      false
    );

    this.#adsManager?.addEventListener(
      google.ima.AdErrorEvent.Type.AD_ERROR,
      console.log.bind(null, 'AD_ERROR Manager'),
      false
    );

    this.#adsManager?.addEventListener(
      google.ima.AdEvent.Type.CLICK,
      (adEvent: google.ima.AdEvent) => {
        this.updateViewMode(false);
      },
      false
    );

    this.#adsManager?.addEventListener(
      google.ima.AdEvent.Type.LOADED,
      (adEvent: google.ima.AdEvent) => {
        console.log('loaded', adEvent);
        this.#ad = adEvent.getAd();
        this.#customMediaElement.dispatchEvent(new Event('durationchange'));
        this.#customMediaElement.dispatchEvent(new Event('timeupdate'));
        this.#customMediaElement.dispatchEvent(new Event('adbreaktotaladschange'));
      },
      false
    );

    this.#adsManager?.addEventListener(
      google.ima.AdEvent.Type.STARTED,
      (adEvent: google.ima.AdEvent) => {
        console.log('started', adEvent);
        this.#ad = adEvent.getAd();
        this.#customMediaElement.dispatchEvent(new Event('playing'));
        this.#customMediaElement.dispatchEvent(new Event('adbreakadpositionchange'));
      },
      false
    );

    this.#adsManager?.addEventListener(google.ima.AdEvent.Type.PAUSED, () => {
      console.log('paused');
      this.#adPaused = true;
      this.#customMediaElement.dispatchEvent(new Event('pause'));
    });

    this.#adsManager?.addEventListener(
      google.ima.AdEvent.Type.AD_PROGRESS,
      (adProgressEvent: google.ima.AdEvent) => {
        const prevDuration = this.#customMediaElement.duration;
        this.#adProgressData = adProgressEvent.getAdData() as google.ima.AdProgressData;
        if (prevDuration !== this.#customMediaElement.duration) {
          this.#customMediaElement.dispatchEvent(new Event('durationchange'));
        }
        this.#customMediaElement.dispatchEvent(new Event('timeupdate'));
      },
      false
    );

    this.#adsManager?.addEventListener(
      google.ima.AdEvent.Type.VOLUME_CHANGED,
      () => {
        console.log('volumeChanged');
        this.#customMediaElement.dispatchEvent(new Event('volumechange'));
      },
      false
    );

    this.#adsManager?.addEventListener(
      google.ima.AdEvent.Type.ALL_ADS_COMPLETED,
      () => {
        console.log('allAdsCompleted');
      },
      false
    );

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
    console.log('requestAds', adTagUrl);
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

  #getDeviceInfo() {
    const ua = navigator.userAgent.toLowerCase();
    console.log('User Agent:', ua);

    const deviceInfo = {
      isIPhone: /iphone/.test(ua),
      isIPad: /ipad/.test(ua) || (ua.includes('macintosh') && 'ontouchend' in document), // Modern iPads show as MacOS
      isIPod: /ipod/.test(ua),
      isIOS: false,
      deviceType: 'unknown',
    };

    deviceInfo.isIOS = deviceInfo.isIPhone || deviceInfo.isIPad || deviceInfo.isIPod;

    if (deviceInfo.isIPhone) deviceInfo.deviceType = 'iPhone';
    else if (deviceInfo.isIPad) deviceInfo.deviceType = 'iPad';
    else if (deviceInfo.isIPod) deviceInfo.deviceType = 'iPod';

    return deviceInfo;
  }

  isIOSMse(src: string): boolean {
    return (
      this.#getDeviceInfo().isIOS &&
      this.#customMediaElement.getAttribute('prefer-playback') === 'mse' &&
      src.includes('.m3u8')
    );
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
