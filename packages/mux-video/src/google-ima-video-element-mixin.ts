import { CustomVideoElement } from 'custom-media-element';
import type { AdDisplayContainer, AdsLoader, AdsManager } from './google-ima-html5-sdk';

/** @TODO Add export of serializeAttributers from custom-media-element package for reuse/maintainability (CJP) */
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

export const GoogleIMAVideoMixin = (superclass: typeof CustomVideoElement) => {
  class GoogleIMAVideoElement extends superclass {
    // Override the default template HTML for CustomVideoElement to include Ads-specific elements, used by Google IMA HTML5 SDK
    static getTemplateHTML = (attrs: Record<string, any>) => {
      return /*html*/ `
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
}

:host(:not([adbreak])) {
  pointer-events: none;
}

#contentElement {
  overflow: hidden;
}

video {
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

    #adDisplayContainer: AdDisplayContainer | undefined;
    #adsLoader: AdsLoader | undefined;
    #adsManager: AdsManager | undefined;
    /**
     * Indicates that playback is currently in an ad break (whether or not a given ad is paused)
     */
    #adBreak = false;
    /**
     * Indicates that ad playback is currently paused
     */
    #adPaused = false;
    /**
     * Stores the currently loaded ad data. NOTE: TS def is non-exhaustive and may be inaccurate under conditions if polymorphic based on ad type
     */
    #adData:
      | {
          duration: number;
          skippable: boolean;
          skipTimeOffset: number; // -1 for non-skippable
          description: string;
          title: string;
          clickThroughUrl: string;
          vastMediaBitrate: number;
          vastMediaHeight: number;
          vastMediaWidth: number;
          vpaid: boolean;
          adPodInfo: {
            adPosition: number; // Which ad is currently active in a given ad pod/break
            isBumper: boolean;
            maxDuration: number; // Total duration of the whole ad pod. NOTE: may end up being shorter if bids were unavailable to fill target duration.
            podIndex: number;
            timeOffset: number; // When this ad will play wrt the media's presentation timeline
            totalAds: number; // Total number of ads in the pod/break
          };
        }
      | undefined;

    /**
     * Stores the latest progress data of ad playback. Retrieved from the AD_PROGRESS event
     */
    #adProgressData:
      | {
          adBreakDuration: number; // Actual duration of the ad pod/break
          adPosition: number; // Which ad in the ad pod/break is currently playing
          currentTime: number; // The current time of the current ad's playhead
          duration: number; // The duration of the specific ad playing
        }
      | undefined;

    constructor() {
      super();
    }

    connectedCallback() {
      super.connectedCallback();
      /** @TODO figure out why TS doesn't like this (CJP) */
      /** @ts-ignore */
      if (!('google' in globalThis && 'ima' in globalThis['google'])) {
        console.error('Missing google.ima SDK. Make sure you include it via a script tag.');
        return;
      }

      if (!this.#adDisplayContainer) {
        this.#adDisplayContainer = new google.ima.AdDisplayContainer(
          this.#adContainer,
          this.nativeEl
          // NOTE: This would be an external element and is currently out of scope for initial impl (CJP)
          // this.customClickEl
        );
        this.#adsLoader = new google.ima.AdsLoader(this.#adDisplayContainer);
        this.#adsLoader.addEventListener(
          google.ima.AdsManagerLoadedEvent.Type.ADS_MANAGER_LOADED,
          (adsManagerLoadedEvent) => {
            const adsRenderingSettings = new google.ima.AdsRenderingSettings();
            adsRenderingSettings.restoreCustomPlaybackStateOnAdBreakComplete = true;
            this.#adsManager = adsManagerLoadedEvent.getAdsManager(this.nativeEl, adsRenderingSettings);
            this.#startAdsManager(this.#adsManager as AdsManager);
          },
          false
        );
        this.#adsLoader.addEventListener(
          google.ima.AdErrorEvent.Type.AD_ERROR,
          console.log.bind(null, 'AD_ERROR'),
          false
        );

        /** @TODO Account for resetting of src as well (emptied evt?) (CJP) */
        /** @TODO Account for disconnectedCallback as well (instance method?) (CJP) */
        this.addEventListener(
          'loadedmetadata',
          () => {
            if (this.adTagUrl && this.#adDisplayContainer && !this.#adsManager) {
              this.#adDisplayContainer.initialize();
              if (!this.nativeEl.paused) {
                this.nativeEl.pause();
              }
              this.#requestAds(this.adTagUrl);
            }
          },
          { once: true }
        );
        // this.#adDisplayContainer && !this.#adsManager
      }
    }

    #startAdsManager(adsManager: AdsManager) {
      // if (adsManager.isCustomClickTrackingUsed() && this.customClickDiv_) {
      //   this.customClickDiv_.style.display = 'table';
      // }
      // Attach the pause/resume events.
      adsManager.addEventListener(
        google.ima.AdEvent.Type.CONTENT_PAUSE_REQUESTED,
        (contentPauseRequestedEvent) => {
          console.log('CONTENT_PAUSE_REQUESTED', contentPauseRequestedEvent.getAd());
          if (!this.nativeEl.paused) {
            this.nativeEl.pause();
          }
          /** @TODO Consider moving to STARTED event. 'play' vs. 'playing' evts? (CJP) */
          this.#adBreak = true;
          this.toggleAttribute(Attributes.AD_BREAK, true);
          this.#adPaused = false;
          this.#adData = contentPauseRequestedEvent.getAd()?.data ?? undefined;
          console.log('AD DATA', this.#adData);
          this.dispatchEvent(new Event('durationchange'));
          this.dispatchEvent(new Event('timeupdate'));
        },
        false
      );
      adsManager.addEventListener(
        google.ima.AdEvent.Type.CONTENT_RESUME_REQUESTED,
        (contentResumeRequestedEvent) => {
          console.log('CONTENT_RESUME_REQUESTED', contentResumeRequestedEvent);
          this.#adBreak = false;
          this.#adData = undefined;
          if (this.nativeEl.paused) {
            this.toggleAttribute(Attributes.AD_BREAK, false);
            this.play();
          }

          // Notify these values have changed back (CJP)
          this.dispatchEvent(new Event('durationchange'));
          this.dispatchEvent(new Event('timeupdate'));
        },
        false
      );
      // Handle errors.

      adsManager.addEventListener(google.ima.AdErrorEvent.Type.AD_ERROR, console.log.bind(null, 'AD_ERROR'), false);
      const events = [
        google.ima.AdEvent.Type.AD_PROGRESS,
        google.ima.AdEvent.Type.ALL_ADS_COMPLETED,
        google.ima.AdEvent.Type.CLICK,
        google.ima.AdEvent.Type.COMPLETE,
        // google.ima.AdEvent.Type.FIRST_QUARTILE,
        google.ima.AdEvent.Type.LOADED,
        // google.ima.AdEvent.Type.MIDPOINT,
        // google.ima.AdEvent.Type.PAUSED,
        google.ima.AdEvent.Type.STARTED,
        google.ima.AdEvent.Type.VOLUME_CHANGED,
        google.ima.AdEvent.Type.VOLUME_MUTED,
        // google.ima.AdEvent.Type.THIRD_QUARTILE,
      ];
      for (const index in events) {
        adsManager.addEventListener(
          events[index],
          (adEvent) => {
            if (events[index] === 'adProgress') return;
            console.log(events[index], adEvent);
            console.log('ad data', adEvent?.getAdData());
            console.log('ad ', adEvent?.getAd());
          },
          false
        );
      }

      adsManager.addEventListener(
        google.ima.AdEvent.Type.STARTED,
        () => {
          this.dispatchEvent(new Event('playing'));
        },
        false
      );

      adsManager.addEventListener(
        google.ima.AdEvent.Type.PAUSED,
        () => {
          this.#adPaused = true;
          this.dispatchEvent(new Event('pause'));
        },
        false
      );

      adsManager.addEventListener(
        google.ima.AdEvent.Type.AD_PROGRESS,
        (adProgressEvent) => {
          const prevDuration = this.duration;
          this.#adProgressData = adProgressEvent.getAdData();
          if (prevDuration !== this.duration) {
            this.dispatchEvent(new Event('durationchange'));
          }
          this.dispatchEvent(new Event('timeupdate'));
        },
        false
      );

      adsManager.addEventListener(
        google.ima.AdEvent.Type.VOLUME_CHANGED,
        () => {
          this.dispatchEvent(new Event('volumechange'));
        },
        false
      );

      //   let initWidth, initHeight;
      /** @TODO Re-implement correctly (CJP) */
      // if (this.application_.fullscreen) {
      //   initWidth = this.application_.fullscreenWidth;
      //   initHeight = this.application_.fullscreenHeight;
      // } else {
      //   initWidth = this.videoPlayer_.width;
      //   initHeight = this.videoPlayer_.height;
      // }
      //   initWidth = this.videoPlayer_.width;
      //   initHeight = this.videoPlayer_.height;
      // adsManager.init(initWidth, initHeight, google.ima.ViewMode.NORMAL);

      const elementDims = this.getBoundingClientRect();
      console.log('elementDims', elementDims);
      adsManager.init(elementDims.width, elementDims.height, google.ima.ViewMode.NORMAL);

      adsManager.start();
    }

    attributeChangedCallback(attrName: string, oldValue?: string | null, newValue?: string | null): void {
      super.attributeChangedCallback(attrName, oldValue, newValue);
      if (attrName === Attributes.AD_TAG_URL && oldValue != newValue) {
        if (newValue) {
        }
      }
    }

    get adTagUrl() {
      return this.getAttribute(Attributes.AD_TAG_URL) ?? undefined;
    }

    set addTagUrl(value: string | undefined) {
      if (value === this.adTagUrl) return;
      if (value == undefined) {
        this.removeAttribute(Attributes.AD_TAG_URL);
        return;
      }
      this.setAttribute(Attributes.AD_TAG_URL, value);
    }

    get #adContainer() {
      return this.shadowRoot?.getElementById('adContainer') as HTMLElement;
    }

    #requestAds(adTagUrl: string) {
      const adsRequest = new google.ima.AdsRequest();
      adsRequest.adTagUrl = adTagUrl;
      // adsRequest.linearAdSlotWidth = this.videoPlayer_.width;
      // adsRequest.linearAdSlotHeight = this.videoPlayer_.height;
      // adsRequest.nonLinearAdSlotWidth = this.videoPlayer_.width;
      // adsRequest.nonLinearAdSlotHeight = this.videoPlayer_.height;
      this.#adsLoader?.requestAds(adsRequest);
    }

    get paused() {
      if (this.#adBreak) {
        return this.#adPaused;
      }
      return super.paused;
    }

    play() {
      if (this.adTagUrl) {
        if (this.#adDisplayContainer && !this.#adsManager) {
          /** @TODO initialization and ad requesting is one time (or at least not per play) but play/pause of ad should be toggled here */
          /** @TODO This should happen as a result of user interaction, particularly for mobile where this is a pre-req. (CJP) */
          this.#adDisplayContainer.initialize();
          this.#requestAds(this.adTagUrl);
          this.dispatchEvent(new Event('play'));
          return Promise.resolve();
        } else if (this.#adsManager && this.#adPaused) {
          this.#adsManager.resume();
          /** @TODO Determine if there is an (async) event tied to resuming ad playback. If so, update #adPaused and dispatch event there (CJP) */
          this.#adPaused = false;
          this.dispatchEvent(new Event('play'));
          return Promise.resolve();
        }
      }
      return super.play();
    }

    pause() {
      if (this.#adsManager && this.#adBreak) {
        this.#adsManager.pause();
        return;
      }
      return super.pause();
    }

    get duration() {
      if (this.#adBreak) {
        return this.#adProgressData?.duration ?? this.#adData?.duration ?? 0;
      }

      return super.duration;
    }

    get currentTime() {
      if (this.#adBreak) {
        return this.#adProgressData?.currentTime ?? 0;
      }

      return super.currentTime;
    }

    set currentTime(val: number) {
      if (this.#adBreak) {
        console.error('CANNOT SEEK DURING AD BREAK');
        // NOTE: re-dispatch timeupdate for observers who may presumptuously think time will have changed. (CJP)
        this.dispatchEvent(new Event('timeupdate'));
        return;
      }
      super.currentTime = val;
    }

    get volume() {
      if (this.#adBreak) {
        return this.#adsManager?.getVolume() ?? 0;
      }
      return super.volume;
    }

    set volume(val) {
      if (this.#adBreak) {
        this.#adsManager?.setVolume(val);
      }
      super.volume = val;
    }

    get muted() {
      if (this.#adBreak) {
        return !this.#adsManager?.getVolume();
      }
      return super.muted;
    }

    set muted(val: boolean) {
      if (this.#adBreak) {
        this.#adsManager?.setVolume(val ? 0 : this.volume);
      }
      super.muted = val;
    }

    get readyState() {
      /** @TODO use different ima sdk events and model readyState more accurately (CJP) */
      if (this.#adBreak) {
        return 4;
      }
      return super.readyState;
    }

    /** @TODO Translate these to actual text track cues? (CJP) */
    get adCuePoints() {
      return (this.#adsManager?.getCuePoints() ?? []).map((startTime: number) => {
        return {
          startTime,
          value: 'AD_BREAK', // What should this be?
        };
      });
    }
  }

  return GoogleIMAVideoElement;
};
