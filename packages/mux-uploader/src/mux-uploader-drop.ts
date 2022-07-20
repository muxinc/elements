import '@mux/polyfills';
const template = document.createElement('template');

/** @todo: Currently removing all styles. Follow up on overlay styling (CJP) */
template.innerHTML = `
<style>
  :host {
    position: relative;
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

<slot></slot>
<div id="overlay">
  <h1 id="overlay-label"></h1>
</div>
`;

const Attributes = {
  MUX_UPLOADER: 'mux-uploader',
  OVERLAY_TEXT: 'overlay-text',
};

class MuxUploaderDropElement extends HTMLElement {
  overlayText: HTMLElement;

  constructor() {
    super();
    const shadowRoot = this.attachShadow({ mode: 'open' });
    shadowRoot.appendChild(template.content.cloneNode(true));

    this.overlayText = shadowRoot.getElementById('overlay-label') as HTMLElement;
  }

  connectedCallback() {
    this.setupDragEvents();
  }

  attributeChangedCallback(attributeName: string, oldValue: string | null, newValue: string | null) {
    if (attributeName === Attributes.OVERLAY_TEXT && oldValue !== newValue) {
      this.overlayText.innerHTML = newValue ?? '';
    } else if (attributeName === 'active') {
      if (this.getAttribute('overlay') && newValue != null) {
        this._currentDragTarget = this;
      }
    }
  }

  static get observedAttributes() {
    return [Attributes.OVERLAY_TEXT, Attributes.MUX_UPLOADER, 'active'];
  }

  get muxUploader() {
    const uploaderId = this.getAttribute(Attributes.MUX_UPLOADER);
    return uploaderId ? document.getElementById(uploaderId) : null;
  }

  protected _currentDragTarget?: Node;

  setupDragEvents() {
    this.addEventListener('dragenter', (evt) => {
      this._currentDragTarget = evt.target as Node;
      evt.preventDefault();
      evt.stopPropagation();
      this.setAttribute('active', '');
    });

    this.addEventListener('dragleave', (evt) => {
      if (this._currentDragTarget === evt.target) {
        this._currentDragTarget = undefined;
        this.removeAttribute('active');
      }
    });

    this.addEventListener('dragover', (evt) => {
      evt.preventDefault();
      evt.stopPropagation();
    });

    this.addEventListener('drop', (evt) => {
      evt.preventDefault();
      evt.stopPropagation();
      const { dataTransfer } = evt;
      //@ts-ignore
      const { files } = dataTransfer;
      const file = files[0];

      const uploaderController = this.muxUploader ?? this;

      uploaderController.dispatchEvent(
        new CustomEvent('file-ready', {
          composed: true,
          bubbles: true,
          detail: file,
        })
      );

      this.removeAttribute('active');
    });
  }
}

if (!globalThis.customElements.get('mux-uploader-drop')) {
  globalThis.customElements.define('mux-uploader-drop', MuxUploaderDropElement);
  //@ts-ignore
  globalThis.MuxUploaderDropElement = MuxUploaderDropElement;
}

export default MuxUploaderDropElement;
