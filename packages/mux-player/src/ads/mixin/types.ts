import type MuxPlayerElement from '@mux/mux-player/base';
import type { EventMap as MuxVideoAdsEventMap } from '@mux/mux-video/ads';

export type MuxPlayerElementConstructor = Constructor<MuxPlayerElement> & {
  observedAttributes: string[];
};

export type Constructor<T> = new (...args: any[]) => T;

export interface IAdsPlayer {
  /**
   * Allow playback with ad blocker.
   */
  allowAdBlocker: boolean;

  /**
   * The URL of the ad tag to be requested.
   */
  adTagUrl: string | undefined;

  addEventListener<K extends keyof MuxVideoAdsEventMap>(
    type: K,
    listener: (this: HTMLMediaElement, ev: MuxVideoAdsEventMap[K]) => any,
    options?: boolean | AddEventListenerOptions
  ): void;

  removeEventListener<K extends keyof MuxVideoAdsEventMap>(
    type: K,
    listener: (this: HTMLMediaElement, ev: MuxVideoAdsEventMap[K]) => any,
    options?: boolean | EventListenerOptions
  ): void;
}
