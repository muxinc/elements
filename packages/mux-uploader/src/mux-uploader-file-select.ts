import { globalThis, document } from './polyfills';
import { getMuxUploaderEl } from './utils/element-utils';
import type MuxUploaderElement from './mux-uploader';

export const fileSelectFragment = /*html*/ `
  <style>
  #file-select {
    cursor: pointer;
    line-height: 16px;
    background: #fff;
    border: 1px solid #000;
    color: #000000;
    padding: 16px 24px;
    border-radius: 4px;
    -webkit-transition: all 0.2s ease;
    transition: all 0.2s ease;
    font-family: inherit;
    font-size: inherit;
    position: relative;
  }

  #file-select:hover {
    color: #fff;
    background: #404040;
  }

  #file-select:active {
    color: #fff;
    background: #000;
  }

  </style>

  <button id="file-select" type="button" part="file-select-button">Upload a video</button>
`;

const template = document.createElement('template');

template.innerHTML = /*html*/ `
  <style>
    :host { display: inline-block; }

    :host([file-ready]) > slot  {
      display: none;
    }
  </style>

  <slot>
    ${fileSelectFragment}
  </slot>
`;

class MuxUploaderFileSelectElement extends globalThis.HTMLElement {
  #filePickerEl: HTMLElement | null | undefined;
  #uploaderEl: MuxUploaderElement | null | undefined;

  #abortController: AbortController | undefined;

  constructor() {
    super();
    const shadowRoot = this.attachShadow({ mode: 'open' });
    shadowRoot.appendChild(template.content.cloneNode(true));

    // NOTE: Binding this so that we have a reference to remove the event listener
    // but can still reference `this` in the method. (CJP)
    this.handleFilePickerElClick = this.handleFilePickerElClick.bind(this);

    // Since we have a "default slotted" element, we still need to initialize the slottable elements
    // (Note the difference in selectors and related code in 'slotchange' handler, below)
    this.filePickerEl = this.shadowRoot?.querySelector('button');

    this.shadowRoot?.querySelector('slot')?.addEventListener('slotchange', (e) => {
      const slot = e.currentTarget as HTMLSlotElement;
      this.filePickerEl = slot
        .assignedElements({ flatten: true })
        .filter((el) => !['STYLE'].includes(el.nodeName))[0] as HTMLButtonElement;
    });
  }

  connectedCallback() {
    this.#uploaderEl = getMuxUploaderEl(this);
    this.#abortController = new AbortController();

    if (this.#uploaderEl) {
      const opts = { signal: this.#abortController.signal };

      this.#uploaderEl.addEventListener(
        'file-ready',
        () => {
          this.toggleAttribute('file-ready', true);
        },
        opts
      );

      this.#uploaderEl.addEventListener('uploadstart', () => this.toggleAttribute('upload-in-progress', true), opts);

      this.#uploaderEl.addEventListener(
        'success',
        () => {
          this.toggleAttribute('upload-in-progress', false);
          this.toggleAttribute('upload-complete', true);
        },
        opts
      );

      this.#uploaderEl.addEventListener(
        'reset',
        () => {
          this.toggleAttribute('file-ready', false);
        },
        opts
      );

      this.toggleAttribute('upload-in-progress', this.#uploaderEl.hasAttribute('upload-in-progress'));
      this.toggleAttribute('upload-complete', this.#uploaderEl.hasAttribute('upload-complete'));
      this.toggleAttribute('file-ready', this.#uploaderEl.hasAttribute('file-ready'));
    }
  }

  disconnectedCallback() {
    this.#abortController?.abort();
  }

  protected get filePickerEl() {
    return this.#filePickerEl;
  }

  protected set filePickerEl(value: HTMLElement | null | undefined) {
    if (value === this.#filePickerEl) return;
    if (this.#filePickerEl) {
      this.#filePickerEl.removeEventListener('click', this.handleFilePickerElClick);
    }

    this.#filePickerEl = value;
    if (this.#filePickerEl) {
      this.#filePickerEl.addEventListener('click', this.handleFilePickerElClick);
    }
  }

  handleFilePickerElClick() {
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
