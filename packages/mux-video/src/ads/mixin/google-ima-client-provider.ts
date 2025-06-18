/* eslint @typescript-eslint/triple-slash-reference: "off" */
/// <reference types="google_interactive_media_ads_types" preserve="true"/>
import { Events, AdEvent } from './events.js';
import { GoogleImaClientAd } from './google-ima-client-ad.js';
import { IAdsVideoClientProvider } from './types.js';

export type GoogleImaClientProviderConfig = {
  adContainer: HTMLElement;
  videoElement: HTMLVideoElement;
  originalSize: DOMRect;
};

export class GoogleImaClientProvider extends EventTarget implements IAdsVideoClientProvider {
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
  #resizeObserver?: ResizeObserver;
  #adDisplayContainer: google.ima.AdDisplayContainer;
  #adsLoader: google.ima.AdsLoader;
  #adsManager?: google.ima.AdsManager;
  #imaAd?: google.ima.Ad | null;
  #ad?: GoogleImaClientAd;
  #adProgressData?: google.ima.AdProgressData;
  #initializedAdDisplayContainer = false;
  #adPaused = false;
  #videoPlayed = false;
  #adBreak = false;
  #lastCurrentTime = 0;

  constructor(config: GoogleImaClientProviderConfig) {
    super();

    this.#adContainer = config.adContainer;
    this.#videoElement = config.videoElement;
    this.#originalSize = config.originalSize;

    this.#videoPlayed = !this.#videoElement.paused;
    this.#videoElement.addEventListener('play', this.#onVideoPlay);
    this.#videoElement.addEventListener('seeking', this.#onVideoSeeking);
    this.#videoElement.addEventListener('ended', this.#onVideoEnded);

    this.#adDisplayContainer = new google.ima.AdDisplayContainer(this.#adContainer, this.#videoElement);
    this.#adsLoader = new google.ima.AdsLoader(this.#adDisplayContainer);

    this.#adsLoader.addEventListener(google.ima.AdErrorEvent.Type.AD_ERROR, this.#onAdError);
    this.#adsLoader.addEventListener(
      google.ima.AdsManagerLoadedEvent.Type.ADS_MANAGER_LOADED,
      this.#onAdsManagerLoaded
    );

    this.#resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width, height } = entry.contentRect;
        if (width > 0 && height > 0) {
          this.#resize(width, height);
        }
      }
    });
    this.#resizeObserver?.observe(this.#adContainer);
  }

  destroy() {
    this.#videoElement.removeEventListener('play', this.#onVideoPlay);
    this.#videoElement.removeEventListener('seeking', this.#onVideoSeeking);
    this.#videoElement.removeEventListener('ended', this.#onVideoEnded);

    this.#resizeObserver?.disconnect();
    this.#resizeObserver = undefined;

    this.#adsManager?.stop();
    this.#adsManager?.destroy();
    this.#adDisplayContainer?.destroy();
    this.#adsLoader?.destroy();
  }

  unload() {
    this.#adsManager?.stop();
    // Wait for the next tick to ensure the ad is stopped and the content is resumed.
    setTimeout(() => {
      this.#adsManager?.destroy();
    }, 0);
  }

  #resize(width: number, height: number) {
    this.#originalSize = { ...this.#originalSize, width, height };
    this.#adsManager?.resize(this.#originalSize.width, this.#originalSize.height);
  }

  #onVideoPlay = () => {
    this.#videoPlayed = true;

    if (this.#adBreak && !this.#adsManager?.isCustomPlaybackUsed()) {
      console.warn('Video play prevented during ad break');
      this.#videoElement.pause();
    }
  };

  #onVideoSeeking = () => {
    if (this.#adBreak && !this.#adsManager?.isCustomPlaybackUsed()) {
      if (this.#videoElement.currentTime !== this.#lastCurrentTime) {
        console.warn('Seek prevented during ad break');
        this.#videoElement.currentTime = this.#lastCurrentTime;
        this.#videoElement.dispatchEvent(new Event('timeupdate'));
      }
    }
  };

  #onVideoEnded = () => {
    this.#adsLoader?.contentComplete();
  };

  #onAdError = (adErrorEvent: google.ima.AdErrorEvent) => {
    console.error('Ad error', adErrorEvent.getError()?.getMessage());
    this.dispatchEvent(new AdEvent(Events.AD_ERROR));
    this.#onAdComplete();
  };

  #onAdComplete(_adEvent?: google.ima.AdEvent) {
    this.dispatchEvent(new AdEvent(Events.AD_ENDED));
  }

  #onAdsManagerLoaded = async (loadedEvent: google.ima.AdsManagerLoadedEvent) => {
    const adsRenderingSettings = new google.ima.AdsRenderingSettings();
    this.#adsManager = loadedEvent.getAdsManager(this.#videoElement, adsRenderingSettings);

    this.#adsManager?.addEventListener(google.ima.AdErrorEvent.Type.AD_ERROR, this.#onAdError);

    this.#adsManager?.addEventListener(google.ima.AdEvent.Type.LOADED, () => {
      this.dispatchEvent(new AdEvent(Events.AD_RESPONSE));
    });

    this.#adsManager?.addEventListener(google.ima.AdEvent.Type.CONTENT_PAUSE_REQUESTED, (event: google.ima.AdEvent) => {
      this.#imaAd = event.getAd();

      if (!this.#imaAd || !this.#adsManager) {
        console.warn('Google IMA ad is undefined');
        return;
      }

      this.#adBreak = true;
      this.#lastCurrentTime = this.#videoElement.currentTime || 0;
      this.#ad = new GoogleImaClientAd(this.#imaAd, this.#adsManager);
      this.dispatchEvent(new AdEvent(Events.AD_BREAK_START));
    });

    this.#adsManager?.addEventListener(google.ima.AdEvent.Type.CLICK, () => {
      this.dispatchEvent(new AdEvent(Events.AD_CLICK));
    });

    this.#adsManager?.addEventListener(google.ima.AdEvent.Type.IMPRESSION, () => {
      this.dispatchEvent(new AdEvent(Events.AD_IMPRESSION));
    });

    this.#adsManager?.addEventListener(google.ima.AdEvent.Type.SKIPPED, () => {
      this.dispatchEvent(new AdEvent(Events.AD_SKIP));
    });

    this.#adsManager?.addEventListener(google.ima.AdEvent.Type.USER_CLOSE, () => {
      this.dispatchEvent(new AdEvent(Events.AD_CLOSE));
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
      this.#adBreak = false;
      this.dispatchEvent(new AdEvent(Events.AD_BREAK_END));
    });

    this.#adsManager?.addEventListener(google.ima.AdEvent.Type.STARTED, () => {
      this.dispatchEvent(new AdEvent(Events.AD_PLAYING));
      this.dispatchEvent(new AdEvent(Events.PLAYING));
    });

    this.#adsManager?.addEventListener(google.ima.AdEvent.Type.PAUSED, () => {
      this.#adPaused = true;
      this.dispatchEvent(new AdEvent(Events.AD_PAUSE));
      this.dispatchEvent(new AdEvent(Events.PAUSE));
    });

    this.#adsManager?.addEventListener(google.ima.AdEvent.Type.RESUMED, () => {
      this.#adPaused = false;
      this.dispatchEvent(new AdEvent(Events.AD_PLAY));
      this.dispatchEvent(new AdEvent(Events.PLAY));
      this.dispatchEvent(new AdEvent(Events.AD_PLAYING));
      this.dispatchEvent(new AdEvent(Events.PLAYING));
    });

    this.#adsManager?.addEventListener(google.ima.AdEvent.Type.AD_BUFFERING, () => {
      this.dispatchEvent(new AdEvent(Events.WAITING));
    });

    this.#adsManager?.addEventListener(google.ima.AdEvent.Type.AD_PROGRESS, (adProgressEvent: google.ima.AdEvent) => {
      this.#adProgressData = adProgressEvent.getAdData() as google.ima.AdProgressData;
      this.dispatchEvent(new AdEvent(Events.TIME_UPDATE));
    });

    this.#adsManager?.addEventListener(google.ima.AdEvent.Type.DURATION_CHANGE, () => {
      this.dispatchEvent(new AdEvent(Events.DURATION_CHANGE));
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
    this.#adBreak = true;
    this.#videoElement.pause();

    // init() is included here because some ads (VMAP) start playing without the start() call.
    this.#adsManager?.init(this.#originalSize.width, this.#originalSize.height);
    this.#adsManager?.start();
  }

  get adsLoader() {
    return this.#adsLoader;
  }

  get ad() {
    return this.#ad;
  }

  get adBreak() {
    return this.#adBreak;
  }

  get paused() {
    return this.#adPaused;
  }

  get duration() {
    return this.#adProgressData?.duration ?? this.#imaAd?.getDuration() ?? NaN;
  }

  get currentTime() {
    return this.#adProgressData?.currentTime ?? 0;
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
}
