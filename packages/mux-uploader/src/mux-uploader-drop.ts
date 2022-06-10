const template = document.createElement('template');

template.innerHTML = `
<style>
  /* These styles simulate a user passing these via props. Until
     that's implemented, we just hardcode it for non-full-screen demo purposes. (TD).
  */
  .dropzone {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    height: 100%;
    width: 100%;
  }

  /* TO-DO: Make default dropzone hover more apparent. (TD).*/

  :host([disable-drop]) .dropzone {
    display: none;
  }

  .overlay {
    display: none;
  }

  :host([fullscreen]) .dropzone {
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    height: 100%;
    width: 100%;
    z-index: 1;
  }

  :host([fullscreen][overlay]) .overlay {
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    height: 100%;
    width: 100%;
    z-index: -1;
  }
 
  :host([active][fullscreen][overlay]) .overlay {
    z-index: 10;
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

<div class="overlay" id="overlay">
  <h1 id="overlay-text"></h1>
</div>
<div class="dropzone" id="dropzone">
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

  /* TO-DO: Maybe use something like this from player so allow users to fully customize the dropzone
     without having to make a ton of CSS variables available i.e. position absolute. (TD).

  kebabCase(string: String) {
    return string.replace(/[A-Z]/g, (match) => `-${match.toLowerCase()}`);
  }

  stylePropsToString(props: any) {
    let style = '';
    Object.entries(props).forEach(([key, value]) => {
      style += `${this.kebabCase(key)}: ${value}; `;
    });
    return style ? style.trim() : undefined;
  }
  

  customizeDropzone() {
    if(this.getAttribute('props')) {
      // change .dropzone to use styles returned from stylePropsToString;
      // this.setClass('dropzone', this.stylePropsToString(this.getAttribute('props')));
    }
  }
  */

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
        new CustomEvent('mux-drop', {
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
