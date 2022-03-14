/** @TODO Add type defs to custom-video-element directly */
export default class CustomVideoElement<V extends HTMLVideoElement = HTMLVideoElement>
  // NOTE: "lying" here since we programmatically merge props/methods from HTMLVideoElement into the CustomVideoElement's prototype in an attempt to make it "look like"
  // it extends an HTMLVideoElement.
  extends HTMLVideoElement
  implements HTMLVideoElement
{
  static readonly observedAttributes: Array<string>;
  readonly nativeEl: V;
  attributeChangedCallback(attrName: string, oldValue?: string | null, newValue?: string | null): void;
}
