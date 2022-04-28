import { AudioEvents } from './CustomAudioElement.js';

/** @TODO Add type defs to custom-video-element directly */
export default class CustomAudioElement<V extends HTMLAudioElement = HTMLAudioElement>
  // NOTE: "lying" here since we programmatically merge props/methods from HTMLAudioElement into the CustomAudioElement's prototype in an attempt to make it "look like"
  // it extends an HTMLAudioElement.
  extends HTMLAudioElement
  implements HTMLAudioElement
{
  static readonly observedAttributes: Array<string>;
  readonly nativeEl: V;
  attributeChangedCallback(attrName: string, oldValue?: string | null, newValue?: string | null): void;
}

export const AudioEvents: string[] = AudioEvents;
