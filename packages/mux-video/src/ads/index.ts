/* eslint @typescript-eslint/triple-slash-reference: "off" */
/// <reference types="google_interactive_media_ads_types" preserve="true"/>
/// <reference path="../../../../node_modules/mux-embed/dist/types/mux-embed.d.ts" preserve="true" />

/** @TODO publish types for package to use here (CJP) */
// @ts-ignore
import mux from '@mux/mux-data-google-ima';
import type { MuxDataSDK } from '@mux/playback-core';
import { Autoplay } from '@mux/playback-core';
import { MuxVideoBaseElement, Attributes as BaseAttributes, EventMap as BaseEventMap } from '@mux/mux-video/base';
import { CastableMediaMixin } from 'castable-video/castable-mixin.js';
import { MediaTracksMixin } from 'media-tracks';
import { globalThis } from '../polyfills';
import {
  AdsVideoMixin,
  Attributes as AdsAttributes,
  Events as AdEvents,
  Expand,
  EventMap as AdEventMap,
} from '@mux/mux-video/ads/mixin';

export * from '@mux/mux-video/base';

export type EventMap = Expand<BaseEventMap & AdEventMap>;

export const Attributes = {
  ...BaseAttributes,
  ...AdsAttributes,
} as const;

// castable-video should be mixed in last so that it can override load().
class MuxVideoElement extends CastableMediaMixin(MediaTracksMixin(AdsVideoMixin(MuxVideoBaseElement))) {
  #muxDataKeepSession = false;

  handleEvent(event: Event) {
    super.handleEvent(event);

    if (event.type === AdEvents.AD_BREAK_START) {
      this.#handleAdBreakStart();
    } else if (event.type === AdEvents.AD_BREAK_END) {
      this.#handleAdBreakEnd();
    }
  }

  #handleAdBreakStart() {
    if (!this.ad?.isLinear()) return;

    if (this.ad?.isCustomPlaybackUsed()) {
      this.muxDataKeepSession = true;
      this.unload();
      this.muxDataKeepSession = false;
    }
  }

  #handleAdBreakEnd() {
    if (!this.ad?.isLinear()) return;

    if (this.ad?.isCustomPlaybackUsed()) {
      this.muxDataKeepSession = true;
      this.load();
      this.muxDataKeepSession = false;
    }
  }

  get muxDataSDK() {
    return mux as MuxDataSDK;
  }

  get muxDataSDKOptions() {
    return {
      imaAdsLoader: this.adsLoader,
    };
  }

  set muxDataKeepSession(val) {
    // Don't sprout attributes here, this setter is used internally.
    this.#muxDataKeepSession = Boolean(val);
  }

  get muxDataKeepSession() {
    return this.#muxDataKeepSession;
  }

  // Define autoplay in the most outer layer because mux-video accepts string | boolean
  // which is not compatible the CustomVideoElement.autoplay boolean only type.
  /** @ts-ignore */
  get autoplay(): Autoplay {
    const attr = this.getAttribute('autoplay');

    if (attr === null) {
      return false;
    } else if (attr === '') {
      return true;
    } else {
      return attr as Autoplay;
    }
  }

  /** @ts-ignore */
  set autoplay(val: Autoplay) {
    const currentVal = this.autoplay;
    if (val === currentVal) {
      return;
    }

    if (val) {
      this.setAttribute('autoplay', typeof val === 'string' ? val : '');
    } else {
      this.removeAttribute('autoplay');
    }
  }

  // NOTE: CastableMediaMixin needs to be a subclass of whatever implements the load() method
  // (i.e. MuxVideoBaseElement), but we're overriding castCustomData to provide mux-specific
  // values by default, so it needs to be defined here (i.e. in the composed subclass of
  // CastableMediaMixin). (CJP)
  #castCustomData: Record<string, any> | undefined;

  get muxCastCustomData() {
    return {
      mux: {
        // Mux Video values
        playbackId: this.playbackId,
        minResolution: this.minResolution,
        maxResolution: this.maxResolution,
        renditionOrder: this.renditionOrder,
        customDomain: this.customDomain,
        /** @TODO Add this.tokens to MuxVideoElement (CJP) */
        tokens: {
          drm: this.drmToken,
        },
        // Mux Data values
        envKey: this.envKey,
        metadata: this.metadata,
        disableCookies: this.disableCookies,
        disableTracking: this.disableTracking,
        beaconCollectionDomain: this.beaconCollectionDomain,
        // Playback values
        startTime: this.startTime,
        // Other values
        preferCmcd: this.preferCmcd,
      },
    } as const;
  }

  get castCustomData() {
    return this.#castCustomData ?? this.muxCastCustomData;
  }

  set castCustomData(val: Record<string, any> | undefined) {
    this.#castCustomData = val;
  }
}

if (!globalThis.customElements.get('mux-video')) {
  globalThis.customElements.define('mux-video', MuxVideoElement);
}

export default MuxVideoElement;
