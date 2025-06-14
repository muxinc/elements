import type { IAdsVideoClientAd } from './types.js';

export class GoogleImaClientAd implements IAdsVideoClientAd {
  #ad: google.ima.Ad;
  #manager: google.ima.AdsManager;

  constructor(ad: google.ima.Ad, manager: google.ima.AdsManager) {
    this.#ad = ad;
    this.#manager = manager;
  }

  isLinear() {
    return this.#ad.isLinear();
  }

  isCustomPlaybackUsed() {
    return this.#manager.isCustomPlaybackUsed();
  }
}
