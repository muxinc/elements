import { globalThis, document } from 'shared-polyfills';
const template = document.createElement('template');

template.innerHTML = `
<style>

button {
  cursor: pointer;
  line-height: 16px;
  background: var(--button-background-color, #fff);
  border: var(--button-border, 1px solid #000000);
  color: #000000;
  padding: var(--button-padding, 16px 24px);
  border-radius: var(--button-border-radius, 4px);
  -webkit-transition: all 0.2s ease;
  transition: all 0.2s ease;
  font-family: inherit;
  font-size: inherit;
  position: relative;
}

button:hover {
  color: var(--button-hover-text, #fff);
  background: var(--button-hover-background, #404040);
}

button:active {
  color: var(--button-active-text, #fff);
  background: var(--button-active-background, #000000);
}

:host([upload-in-progress]) button {
  display: none;
}

:host([upload-in-progress]) ::slotted(button) {
  display: none;
}
</style>

<slot>
<button type="button">Upload video</button>
</slot>
`;

class MuxUploaderFileSelectElement extends globalThis.HTMLElement {
  protected _filePickerButton: HTMLElement | null | undefined;

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

      this.filePickerButton = slot.assignedElements({ flatten: true })[0] as HTMLButtonElement;
    });
  }

  protected get filePickerButton() {
    return this._filePickerButton;
  }

  protected set filePickerButton(value: HTMLElement | null | undefined) {
    if (value === this._filePickerButton) return;
    if (this._filePickerButton) {
      this._filePickerButton.removeEventListener('click', this.handleFilePickerButtonClick);
    }

    this._filePickerButton = value;
    if (this._filePickerButton) {
      this._filePickerButton.addEventListener('click', this.handleFilePickerButtonClick);
    }
  }

  handleFilePickerButtonClick() {
    // TO-DO: Allow user to reattempt uploading the same file after an error.
    // Note: Apparently Chrome and Firefox do not allow changing an indexed property on FileList...(TD).
    // Source: https://stackoverflow.com/a/46689013
    const attr = this.getAttribute('mux-uploader');
    const controller = attr ? document.getElementById(attr) : (<ShadowRoot>this.getRootNode()).host;

    controller?.shadowRoot?.querySelector<HTMLInputElement>('#hidden-file-input')?.click();
  }
}

if (!globalThis.customElements.get('mux-uploader-select')) {
  globalThis.customElements.define('mux-uploader-select', MuxUploaderFileSelectElement);
}

export default MuxUploaderFileSelectElement;
