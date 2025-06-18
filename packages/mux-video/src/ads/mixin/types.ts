import { Events, AdEvent } from './events.js';

export type Constructor<T> = new (...args: any[]) => T;

export type Expand<T> = T extends infer O ? { [K in keyof O]: O[K] } : never;

export type EventMapFromEvents<T extends Record<string, string>> = {
  [K in T[keyof T]]: AdEvent;
};

export type EventMap = AdEventMap;
export type AdEventMap = Expand<EventMapFromEvents<typeof Events>>;

export declare class IAdsVideo {
  /**
   * Allow playback with ad blocker.
   */
  allowAdBlocker: boolean;

  /**
   * The URL of the ad tag to be requested.
   */
  adTagUrl: string | undefined;

  /**
   * The current ad being played.
   */
  ad: IAdsVideoClientAd | undefined;

  /**
   * The AdsLoader object that is used to request ads.
   */
  adsLoader: google.ima.AdsLoader | undefined;

  addEventListener<K extends keyof AdEventMap>(
    type: K,
    listener: (this: HTMLMediaElement, ev: AdEventMap[K]) => any,
    options?: boolean | AddEventListenerOptions
  ): void;

  removeEventListener<K extends keyof AdEventMap>(
    type: K,
    listener: (this: HTMLMediaElement, ev: AdEventMap[K]) => any,
    options?: boolean | EventListenerOptions
  ): void;
}

export declare class IAdsVideoClientAd {
  /**
   * Indicates whether the ad’s current mode of operation is linear or
   * non-linear. If the value is true, it indicates that the ad is in linear
   * playback mode; if false, it indicates non-linear mode. The player checks
   * the linear property and updates its state according to the details of the
   * ad placement. While the ad is in linear mode, the player pauses the
   * content video. If linear is true initially, and the ad is a pre-roll
   * (defined externally), the player may choose to delay loading the content
   * video until near the end of the ad playback.
   */
  isLinear(): boolean;

  /**
   * Returns true if a custom video element is being used to play the current
   * ad. Custom playback occurs when an optional video element is provided to
   * the <code>AdDisplayContainer</code> on platforms where a custom video
   * element would provide a more seamless ad viewing experience.
   */
  isCustomPlaybackUsed(): boolean;
}

export declare class IAdsVideoClientProvider extends EventTarget {
  get adsLoader(): google.ima.AdsLoader | undefined;
  get ad(): IAdsVideoClientAd | undefined;
  get adBreak(): boolean;

  get paused(): boolean;
  get duration(): number;
  get currentTime(): number;
  get volume(): number;
  set volume(val: number);

  initializeAdDisplayContainer(): void;
  requestAds(adTagUrl: string): void;
  play(): Promise<void>;
  pause(): void;
  unload(): void;
  destroy(): void;

  addEventListener<K extends keyof AdEventMap>(
    type: K,
    listener: (this: IAdsVideoClientProvider, ev: AdEventMap[K]) => any,
    options?: boolean | AddEventListenerOptions
  ): void;

  removeEventListener<K extends keyof AdEventMap>(
    type: K,
    listener: (this: IAdsVideoClientProvider, ev: AdEventMap[K]) => any,
    options?: boolean | EventListenerOptions
  ): void;
}
