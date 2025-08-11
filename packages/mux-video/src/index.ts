import { globalThis } from './polyfills';
import { Autoplay } from '@mux/playback-core';
import { MuxVideoBaseElement } from '@mux/mux-video/base';
import { CastableMediaMixin } from 'castable-video/castable-mixin.js';
import { MediaTracksMixin } from 'media-tracks';

export * from '@mux/mux-video/base';

// castable-video should be mixed in last so that it can override load().
class MuxVideoElement extends CastableMediaMixin(MediaTracksMixin(MuxVideoBaseElement)) {
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

type MuxVideoElementType = typeof MuxVideoElement;
declare global {
  var MuxVideoElement: MuxVideoElementType; // eslint-disable-line
}

if (!globalThis.customElements.get('mux-video')) {
  globalThis.customElements.define('mux-video', MuxVideoElement);
  globalThis.MuxVideoElement = MuxVideoElement;
}

export default MuxVideoElement;
