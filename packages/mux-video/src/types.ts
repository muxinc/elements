import { Events } from 'custom-media-element';
import { MuxMediaEventsMap } from '@mux/playback-core';

type Expand<T> = T extends infer O ? { [K in keyof O]: O[K] } : never;

type EventMapFromEvents<T extends readonly string[]> = {
  [K in T[number]]: CustomEvent<{ composed: true }>;
};

export type EventMap = Expand<EventMapFromEvents<typeof Events> & MuxMediaEventsMap>;

export interface IMuxVideoBaseElement extends HTMLVideoElement {
  addEventListener<K extends keyof EventMap>(
    type: K,
    listener: (this: HTMLMediaElement, ev: EventMap[K]) => any,
    options?: boolean | AddEventListenerOptions
  ): void;
  addEventListener(
    type: string,
    listener: EventListenerOrEventListenerObject,
    options?: boolean | AddEventListenerOptions
  ): void;
  removeEventListener<K extends keyof EventMap>(
    type: K,
    listener: (this: HTMLMediaElement, ev: EventMap[K]) => any,
    options?: boolean | EventListenerOptions
  ): void;
  removeEventListener(
    type: string,
    listener: EventListenerOrEventListenerObject,
    options?: boolean | EventListenerOptions
  ): void;
}
