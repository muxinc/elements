/** @TODO Add type defs to custom-video-element directly */
export default class CustomVideoElement<
    V extends Omit<HTMLVideoElement, 'autoplay'> = Omit<HTMLVideoElement, 'autoplay'>
  >
  // NOTE: "lying" here since we programmatically merge props/methods from HTMLVideoElement into the CustomVideoElement's prototype in an attempt to make it "look like"
  // it extends an HTMLVideoElement.
  extends Omit<HTMLVideoElement, 'autoplay'>
  implements Omit<HTMLVideoElement, 'autoplay'>
{
  static readonly observedAttributes: Array<string>;
  readonly nativeEl: V;
  attributeChangedCallback(attrName: string, oldValue?: string | null, newValue?: string | null): void;
}
