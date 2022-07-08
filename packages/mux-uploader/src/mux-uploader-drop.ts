import '@mux/polyfills';
const template = document.createElement('template');

/** @todo: Currently removing all styles. Follow up on overlay styling (CJP) */
template.innerHTML = `
<style>
  .overlay {
    display: none;
  }

  :host([overlay]) .overlay {
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    height: 100%;
    width: 100%;
  }
 
  :host([active][fullscreen][overlay]) .overlay {
    background-color: var(--overlay-background-color, rgba(226, 253, 255, 0.95));

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  h1 {
    display: none;
  }

  :host([active][overlay]) h1 {
    display: block;
  }
</style>

<div id="dropzone">
  <slot></slot>
  <div class="overlay" id="overlay">
    <h1 id="overlay-text"></h1>
  </div>
</div>
`;

class MuxUploaderDropElement extends HTMLElement {
  overlay: HTMLElement | null | undefined;
  overlayText: HTMLElement | null | undefined;

  constructor() {
    super();
    const shadowRoot = this.attachShadow({ mode: 'open' });
    shadowRoot.appendChild(template.content.cloneNode(true));

    this.overlay = shadowRoot.getElementById('overlay');
    this.overlayText = shadowRoot.getElementById('overlay-text');
  }

  connectedCallback() {
    this.setupDragEvents();
  }

  attributeChangedCallback() {
    //@ts-ignore
    this.shadowRoot.getElementById('overlay-text').innerHTML = this.getAttribute('text');
  }

  static get observedAttributes() {
    return ['text', 'mux-uploader'];
  }

  get muxUploader() {
    const uploaderId = this.getAttribute('mux-uploader');
    return uploaderId ? document.getElementById(uploaderId) : null;
  }

  setupDragEvents() {
    this.addEventListener('dragenter', (evt) => {
      evt.preventDefault();
      evt.stopPropagation();
      this.setAttribute('active', '');
    });

    this.addEventListener('dragleave', (evt) => {
      this.removeAttribute('active');
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
