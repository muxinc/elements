import { globalThis, document } from 'shared-polyfills';
import { getMuxUploaderEl } from './utils/element-utils';
import type MuxUploaderElement from './mux-uploader';

// @ts-ignore
import btnFragment from './mux-uploader-file-select/buttonFragment.html';
export { btnFragment };

const template = document.createElement('template');

template.innerHTML = `
<style>
  :host { display: inline-block; }
</style>

<slot>
  ${btnFragment}
</slot>
`;

class MuxUploaderFileSelectElement extends globalThis.HTMLElement {
  #filePickerButton: HTMLElement | null | undefined;

  constructor() {
    super();
    const shadowRoot = this.attachShadow({ mode: 'open' });
    shadowRoot.appendChild(template.content.cloneNode(true));

    // NOTE: Binding this so that we have a reference to remove the event listener
    // but can still reference `this` in the method. (CJP)
    this.handleFilePickerButtonClick = this.handleFilePickerButtonClick.bind(this);

    // Since we have a "default slotted" element, we still need to initialize the slottable elements
    // (Note the difference in selectors and related code in 'slotchange' handler, below)
    this.filePickerButton = this.shadowRoot?.querySelector('button');

    this.shadowRoot?.querySelector('slot')?.addEventListener('slotchange', (e) => {
      const slot = e.currentTarget as HTMLSlotElement;
      this.filePickerButton = slot
        .assignedElements({ flatten: true })
        .filter((el) => !['STYLE'].includes(el.nodeName))[0] as HTMLButtonElement;
    });
  }

  protected get filePickerButton() {
    return this.#filePickerButton;
  }

  protected set filePickerButton(value: HTMLElement | null | undefined) {
    if (value === this.#filePickerButton) return;
    if (this.#filePickerButton) {
      this.#filePickerButton.removeEventListener('click', this.handleFilePickerButtonClick);
    }

    this.#filePickerButton = value;
    if (this.#filePickerButton) {
      this.#filePickerButton.addEventListener('click', this.handleFilePickerButtonClick);
    }
  }

  handleFilePickerButtonClick() {
    // TO-DO: Allow user to reattempt uploading the same file after an error.
    // Note: Apparently Chrome and Firefox do not allow changing an indexed property on FileList...(TD).
    // Source: https://stackoverflow.com/a/46689013
    const attr = this.getAttribute('mux-uploader');
    const controller = attr ? document.getElementById(attr) : (this.getRootNode() as ShadowRoot).host;

    controller?.shadowRoot?.querySelector<HTMLInputElement>('#hidden-file-input')?.click();
  }
}

if (!globalThis.customElements.get('mux-uploader-file-select')) {
  globalThis.customElements.define('mux-uploader-file-select', MuxUploaderFileSelectElement);
}

export default MuxUploaderFileSelectElement;
