import type { MuxDataSDK } from '@mux/playback-core';
import { Events, AdEvent } from './events.js';

export type Expand<T> = T extends infer O ? { [K in keyof O]: O[K] } : never;

export type EventMapFromEvents<T extends Record<string, string>> = {
  [K in T[keyof T]]: AdEvent;
};

export type AdEventMap = Expand<EventMapFromEvents<typeof Events>>;

export declare class IAdsVideo {
  /** Allow playback with ad blocker */
  allowAdBlocker: boolean;
  adTagUrl: string | undefined;
  adBreak: boolean;
  // todo: remove following Mux specific methods
  muxDataSDK: MuxDataSDK;
  muxDataSDKOptions: Record<string, any>;
  muxDataKeepSession: boolean;

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
