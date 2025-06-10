/* eslint @typescript-eslint/triple-slash-reference: "off" */
/// <reference types="google_interactive_media_ads_types" preserve="true"/>
import { Events, AdEvent } from './events.js';

export type GoogleImaClientProviderConfig = {
  adContainer: HTMLElement;
  videoElement: HTMLVideoElement;
  originalSize: DOMRect;
};

export class GoogleImaClientProvider extends EventTarget {
  static isSDKAvailable() {
    if (!('google' in globalThis && 'ima' in globalThis['google'])) {
      console.error('Missing google.ima SDK. Make sure you include it via a script tag.');
      return false;
    } else {
      return true;
    }
  }

  #adContainer: HTMLElement;
  #videoElement: HTMLVideoElement;
  #originalSize: DOMRect;
  #viewMode: google.ima.ViewMode;
  #adDisplayContainer: google.ima.AdDisplayContainer | undefined;
  #adsLoader: google.ima.AdsLoader | undefined;
  #adsManager: google.ima.AdsManager | undefined;
  #ad: google.ima.Ad | undefined | null;
  #adProgressData: google.ima.AdProgressData | undefined | null;
  #initializedAdDisplayContainer = false;
  #adPaused = false;
  #videoPlayed = false;

  constructor(config: GoogleImaClientProviderConfig) {
    super();

    this.#adContainer = config.adContainer;
    this.#videoElement = config.videoElement;
    this.#originalSize = config.originalSize;
    this.#viewMode = google.ima.ViewMode.NORMAL;

    this.#videoPlayed = !this.#videoElement.paused;
    this.#videoElement.addEventListener('play', this.#onVideoPlay, { once: true });
    this.#videoElement.addEventListener('ended', this.#onVideoEnded, { once: true });

    this.#adDisplayContainer = new google.ima.AdDisplayContainer(this.#adContainer, this.#videoElement);
    this.#adsLoader = new google.ima.AdsLoader(this.#adDisplayContainer);

    this.#adsLoader.addEventListener(google.ima.AdErrorEvent.Type.AD_ERROR, this.#onAdError);
    this.#adsLoader.addEventListener(
      google.ima.AdsManagerLoadedEvent.Type.ADS_MANAGER_LOADED,
      this.#onAdsManagerLoaded
    );

    //TODO: we should listen to standard events
    // globalThis.addEventListener('mediaenterfullscreenrequest', () => {
    //   this.#adProvider?.updateViewMode(true);
    // });

    //TODO: we should listen to standard events
    // globalThis.addEventListener('mediaexitfullscreenrequest', () => {
    //   this.#adProvider?.updateViewMode(false);
    // });
  }

  destroy() {
    this.#videoElement.removeEventListener('play', this.#onVideoPlay);
    this.#videoElement.removeEventListener('ended', this.#onVideoEnded);

    this.#adsManager?.stop();
    this.#adsManager?.destroy();
    this.#adDisplayContainer?.destroy();
    this.#adsLoader?.destroy();
  }

  #onVideoPlay = () => {
    this.#videoPlayed = true;
  };

  #onVideoEnded = () => {
    this.#adsLoader?.contentComplete();
  };

  #onAdError = (_adErrorEvent: google.ima.AdErrorEvent) => {
    this.dispatchEvent(new AdEvent(Events.AD_ERROR));
    this.#onAdComplete();
  };

  #onAdComplete = (_adEvent?: google.ima.AdEvent) => {
    this.dispatchEvent(new AdEvent(Events.AD_ENDED));
  };

  #onAdsManagerLoaded = (loadedEvent: google.ima.AdsManagerLoadedEvent) => {
    const adsRenderingSettings = new google.ima.AdsRenderingSettings();
    this.#adsManager = loadedEvent.getAdsManager(this.#videoElement, adsRenderingSettings);

    this.#adsManager?.addEventListener(google.ima.AdErrorEvent.Type.AD_ERROR, this.#onAdError);

    this.#adsManager?.addEventListener(google.ima.AdEvent.Type.LOADED, () => {
      this.dispatchEvent(new AdEvent(Events.AD_RESPONSE));
    });

    this.#adsManager?.addEventListener(google.ima.AdEvent.Type.DURATION_CHANGE, () => {
      this.dispatchEvent(new AdEvent(Events.DURATION_CHANGE));
    });

    this.#adsManager?.addEventListener(google.ima.AdEvent.Type.CONTENT_PAUSE_REQUESTED, (event: google.ima.AdEvent) => {
      this.#ad = event.getAd();
      this.dispatchEvent(new AdEvent(Events.AD_BREAK_START));
    });

    this.#adsManager?.addEventListener(google.ima.AdEvent.Type.FIRST_QUARTILE, () => {
      this.dispatchEvent(new AdEvent(Events.AD_FIRST_QUARTILE));
    });

    this.#adsManager?.addEventListener(google.ima.AdEvent.Type.MIDPOINT, () => {
      this.dispatchEvent(new AdEvent(Events.AD_MIDPOINT));
    });

    this.#adsManager?.addEventListener(google.ima.AdEvent.Type.THIRD_QUARTILE, () => {
      this.dispatchEvent(new AdEvent(Events.AD_THIRD_QUARTILE));
    });

    this.#adsManager?.addEventListener(google.ima.AdEvent.Type.COMPLETE, (event: google.ima.AdEvent) => {
      this.#onAdComplete(event);
    });

    this.#adsManager?.addEventListener(google.ima.AdEvent.Type.SKIPPED, (event: google.ima.AdEvent) => {
      this.#onAdComplete(event);
    });

    this.#adsManager?.addEventListener(google.ima.AdEvent.Type.CONTENT_RESUME_REQUESTED, () => {
      this.dispatchEvent(new AdEvent(Events.AD_BREAK_END));
    });

    this.#adsManager?.addEventListener(google.ima.AdEvent.Type.CLICK, () => {
      this.#updateViewMode(false);
    });

    this.#adsManager?.addEventListener(google.ima.AdEvent.Type.STARTED, () => {
      this.dispatchEvent(new AdEvent(Events.PLAYING));
    });

    this.#adsManager?.addEventListener(google.ima.AdEvent.Type.PAUSED, () => {
      this.#adPaused = true;
      this.dispatchEvent(new AdEvent(Events.PAUSE));
    });

    this.#adsManager?.addEventListener(google.ima.AdEvent.Type.RESUMED, () => {
      this.#adPaused = false;
      this.dispatchEvent(new AdEvent(Events.PLAY));
    });

    this.#adsManager?.addEventListener(google.ima.AdEvent.Type.AD_PROGRESS, (adProgressEvent: google.ima.AdEvent) => {
      this.#adProgressData = adProgressEvent.getAdData() as google.ima.AdProgressData;
      this.dispatchEvent(new AdEvent(Events.TIME_UPDATE));
    });

    this.#adsManager?.addEventListener(google.ima.AdEvent.Type.VOLUME_CHANGED, () => {
      this.dispatchEvent(new AdEvent(Events.VOLUME_CHANGE));
    });

    this.#adsManager?.addEventListener(google.ima.AdEvent.Type.VOLUME_MUTED, () => {
      this.dispatchEvent(new AdEvent(Events.VOLUME_CHANGE));
    });

    try {
      if (this.#videoPlayed) {
        this.#startAds();
      } else {
        this.#videoElement.addEventListener(
          'play',
          () => {
            this.#videoPlayed = true;
            this.#startAds();
          },
          { once: true }
        );
      }
    } catch {
      this.#onAdComplete();
    }
  };

  #startAds() {
    // init() is included here because some ads (VMAP) start playing without the start() call.
    this.#adsManager?.init(this.#originalSize.width, this.#originalSize.height, this.#viewMode);
    this.#adsManager?.start();
  }

  #updateViewMode(isFullscreen: boolean) {
    this.#viewMode = isFullscreen ? google.ima.ViewMode.FULLSCREEN : google.ima.ViewMode.NORMAL;
  }

  get adsLoader() {
    return this.#adsLoader;
  }

  get ad() {
    return this.#ad;
  }

  get paused() {
    return this.#adsManager && this.#adPaused;
  }

  get duration() {
    return this.#adProgressData?.duration ?? this.#ad?.getDuration();
  }

  get currentTime() {
    return this.#adProgressData?.currentTime;
  }

  get volume() {
    return this.#adsManager?.getVolume() ?? 1;
  }

  set volume(val: number) {
    this.#adsManager?.setVolume(val);
  }

  play() {
    this.#adsManager?.resume();
    // todo: resolve on playing event
    return Promise.resolve();
  }

  pause() {
    this.#adsManager?.pause();
  }

  /**
   * Initializes the ad display container video elements for playback.
   * You must call this method as a direct result of a user action,
   * so that the browser can mark the video element as user initiated.
   */
  initializeAdDisplayContainer() {
    if (this.#initializedAdDisplayContainer) return;
    this.#initializedAdDisplayContainer = true;
    this.#adDisplayContainer?.initialize();
  }

  requestAds(adTagUrl: string) {
    // Destroy the current AdsManager to prevent any previously requested post-roll ads from playing.
    if (this.#adsManager) {
      this.#adsManager.destroy();
    }

    // Reuse the existing AdsLoader instance initialized on page load.
    if (this.#adsLoader) {
      // Reset the IMA SDK.
      this.#adsLoader.contentComplete();
    }

    const adsRequest = new google.ima.AdsRequest();
    adsRequest.adTagUrl = adTagUrl;
    this.#adsLoader?.requestAds(adsRequest);
    this.dispatchEvent(new AdEvent(Events.AD_REQUEST));
  }

  resize(width: number, height: number) {
    this.#originalSize = { ...this.#originalSize, width, height };
    this.#adsManager?.resize(this.#originalSize.width, this.#originalSize.height, this.#viewMode);
  }
}
