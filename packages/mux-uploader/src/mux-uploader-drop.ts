import { globalThis, document } from './polyfills';
import { getMuxUploaderEl } from './utils/element-utils';
import type MuxUploaderElement from './mux-uploader';

const template = document.createElement('template');

template.innerHTML = /*html*/ `
<style>
  :host {
    position: relative;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border: 2px dashed #ccc;
    padding: 2.5rem 2rem;
    border-radius: .25rem;
  }

  slot[name='heading'] > * {
    margin-bottom: 0.75rem;
    font-size: 1.75rem;
    text-align: center;
  }

  slot[name='separator'] > * {
    margin-bottom: 0.75rem;
  }

  #overlay {
    display: none;
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    height: 100%;
    width: 100%;
  }

  :host([active][overlay]) > #overlay {
    background: var(--overlay-background-color, rgba(226, 253, 255, 0.95));
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
</style>

<div id="overlay">
  <h1 id="overlay-label"></h1>
</div>

<slot name="heading" part="heading">
  <span>Drop a video file here to upload</span>
</slot>
<slot name="separator" part="separator">
  <span>or</span>
</slot>
<slot></slot>
`;

const Attributes = {
  MUX_UPLOADER: 'mux-uploader',
  OVERLAY_TEXT: 'overlay-text',
};

class MuxUploaderDropElement extends globalThis.HTMLElement {
  #overlayTextEl: HTMLElement;
  #uploaderEl: MuxUploaderElement | null | undefined;
  #headingEl: HTMLSlotElement | null | undefined;
  #separatorEl: HTMLSlotElement | null | undefined;

  #abortController: AbortController | undefined;

  constructor() {
    super();
    const shadowRoot = this.attachShadow({ mode: 'open' });
    shadowRoot.appendChild(template.content.cloneNode(true));

    this.#overlayTextEl = shadowRoot.getElementById('overlay-label') as HTMLElement;
    this.#headingEl = shadowRoot.querySelector('slot[name="heading"]') as HTMLSlotElement;
    this.#separatorEl = shadowRoot.querySelector('slot[name="separator"]') as HTMLSlotElement;
  }

  connectedCallback() {
    this.#uploaderEl = getMuxUploaderEl(this);
    this.#abortController = new AbortController();

    if (this.#uploaderEl) {
      const opts = { signal: this.#abortController.signal };

      this.#uploaderEl.addEventListener(
        'file-ready',
        () => {
          if (this.#headingEl) {
            this.#headingEl.style.display = 'none';
          }

          if (this.#separatorEl) {
            this.#separatorEl.style.display = 'none';
          }
        },
        opts
      );

      this.#uploaderEl.addEventListener('uploadstart', () => this.setAttribute('upload-in-progress', ''), opts);

      this.#uploaderEl.addEventListener(
        'success',
        () => {
          this.removeAttribute('upload-in-progress');
          this.setAttribute('upload-complete', '');
        },
        opts
      );

      this.#uploaderEl.addEventListener(
        'reset',
        () => {
          this.removeAttribute('upload-in-progress');
          this.removeAttribute('upload-complete');
        },
        opts
      );

      this.setupDragEvents(opts);
    }
  }

  disconnectedCallback() {
    this.#abortController?.abort();
  }

  attributeChangedCallback(attributeName: string, oldValue: string | null, newValue: string | null) {
    if (attributeName === Attributes.OVERLAY_TEXT && oldValue !== newValue) {
      this.#overlayTextEl.innerHTML = newValue ?? '';
    } else if (attributeName === 'active') {
      if (this.getAttribute('overlay') && newValue != null) {
        this._currentDragTarget = this;
      }
    }
  }

  static get observedAttributes() {
    return [Attributes.OVERLAY_TEXT, Attributes.MUX_UPLOADER, 'active'];
  }

  protected _currentDragTarget?: Node;

  setupDragEvents(opts: AddEventListenerOptions) {
    this.addEventListener(
      'dragenter',
      (evt) => {
        this._currentDragTarget = evt.target as Node;
        evt.preventDefault();
        evt.stopPropagation();
        this.setAttribute('active', '');
      },
      opts
    );

    this.addEventListener(
      'dragleave',
      (evt) => {
        if (this._currentDragTarget === evt.target) {
          this._currentDragTarget = undefined;
          this.removeAttribute('active');
        }
      },
      opts
    );

    this.addEventListener(
      'dragover',
      (evt) => {
        evt.preventDefault();
        evt.stopPropagation();
      },
      opts
    );

    this.addEventListener(
      'drop',
      (evt) => {
        evt.preventDefault();
        evt.stopPropagation();
        const { dataTransfer } = evt;
        //@ts-ignore
        const { files } = dataTransfer;
        const file = files[0];

        const uploaderController = this.#uploaderEl ?? this;

        uploaderController.dispatchEvent(
          new CustomEvent('file-ready', {
            composed: true,
            bubbles: true,
            detail: file,
          })
        );

        this.removeAttribute('active');
      },
      opts
    );
  }
}

if (!globalThis.customElements.get('mux-uploader-drop')) {
  globalThis.customElements.define('mux-uploader-drop', MuxUploaderDropElement);
  //@ts-ignore
  globalThis.MuxUploaderDropElement = MuxUploaderDropElement;
}

export default MuxUploaderDropElement;
