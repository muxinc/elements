import * as UpChunk from '@mux/upchunk';
import './mux-uploader-drop';

const styles = `
:host {
  font-family: var(--uploader-font-family, Arial);
  font-size: var(--uploader-font-size, 16px);
  background-color: var(--uploader-background-color, inherit);
}

.sr-only {
  position:absolute;
  left:-10000px;
  top:auto;
  width:1px;
  height:1px;
  overflow:hidden;
  }

p {
  color: black;
}

input[type="file"] {
  display: none;
}

button {
  cursor: pointer;
  line-height: 16px;
  background: var(--button-background-color, #fff);
  border: 1px solid #000000;
  color: #000000;
  padding: 16px 24px;
  border-radius: var(--button-border-radius, 4px);
  -webkit-transition: all 0.2s ease;
  transition: all 0.2s ease;
  font-family: inherit;
  font-size: inherit;
  z-index: 10;
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

.bar-type {
  background: #e6e6e6;
  border-radius: 100px;
  position: relative;
  height: 4px;
  width: 100%;
}

.radial-type, .bar-type, .upload-status, .retry-button, .text-container {
  display: none;
}

::slotted(p) {
  display: none;
}

.upload-instruction {
  display: none;
}

.retry-button {
  color: #e22c3e;
  text-decoration-line: underline;
  cursor: pointer;
  z-index: 10;
  position: relative;
}

.text-container {
  flex-wrap: nowrap;
  justify-content: space-between;
  padding-bottom: 16px;
}

:host([type="radial"][upload-in-progress]) .radial-type {
  display: block;
}

:host([type="bar"][upload-in-progress]) .bar-type {
  display: block;
}

:host([upload-in-progress][status]) .upload-status {
  display: block;
}

:host([upload-in-progress]) ::slotted(p) {
  display: block;
}

:host([type="bar"][upload-error]) .progress-bar {
  background: #e22c3e;
}

:host([type="bar"][upload-error]) .status-message {
  color: #e22c3e;
}

:host([type="radial"][upload-error]) .status-message {
  color: #e22c3e;
}

:host([upload-error][status]) .upload-status {
  display: none;
}

:host([upload-error]) .retry-button {
  display: inline-block;
}

:host([upload-error]) .text-container {
  display: flex;
}

:host([upload-error]) ::slotted(p) {
  display: none;
}

.upload-status {
  font-size: inherit;
  margin-bottom: 16px;
}

.progress-bar {
  box-shadow: 0 10px 40px -10px #fff;
  border-radius: 100px;
  background: var(--progress-bar-fill-color, #000000);
  height: 4px;
  width: 0%;
}

:host([upload-in-progress]) button {
  display: none;
}

:host([upload-in-progress]) ::slotted(button) {
  display: none;
}

:host([upload-in-progress]) .upload-instruction {
  display: none;
}

circle {
  stroke: var(--progress-radial-fill-color, black);
  stroke-width: 6;  /* Thickness of the circle */
  fill: transparent; /* Make inside of the circle see-through */

  /* Animation */ 
  transition: 0.35s;
  transform: rotate(-90deg);
  transform-origin: 50% 50%;
  -webkit-transform-origin: 50% 50%;
  -moz-transform-origin: 50% 50%;
}
`;

const template = document.createElement('template');

template.innerHTML = `
<style>
  ${styles}
</style>

<p class="upload-instruction" id="upload-instruction">Drop file to upload</p>

<div class="sr-only" id="sr-only" aria-live="polite"></div>

<div class=text-container>
  <span class="status-message" id="status-message" aria-live="polite"></span>
  <span class="retry-button" id="retry-button" role="button" tabindex="0">Try again</span>
</div>

<input type="file" />
<slot name="custom-button"><button type="button">Upload video</button></slot>
<slot name="custom-progress"><p class="upload-status" id="upload-status"></p></slot>

<div class="bar-type">
  <div role="progressbar" aria-description="A bounded progress bar from 0 to 100" aria-valuemin="0"
  aria-valuemax="100" class="progress-bar" id="progress-bar" tabindex="0"></div>
</div>
<div class="radial-type">
  <svg
    width="120"
    height="120">
    <!-- To prevent overflow of the SVG wrapper, radius must be  (svgWidth / 2) - (circleStrokeWidth * 2)
      or use overflow: visible on the svg.-->
    <circle
      r="52"
      cx="60"
      cy="60"
    />
  <svg>
</div>

<slot name="dropzone">
  <mux-uploader-drop></mux-uploader-drop>
</slot>
`;

// Note: Use "bar" for now since the CSS for radial is WIP. (TD).
const TYPES = {
  BAR: 'bar',
  RADIAL: 'radial',
};

const getRadius = (el: MuxUploaderElement) => Number(el.svgCircle?.getAttribute('r'));

const getCircumference = (el: MuxUploaderElement) => getRadius(el) * 2 * Math.PI;

class MuxUploaderElement extends HTMLElement {
  hiddenFileInput: HTMLInputElement | null | undefined;
  filePickerButton: HTMLButtonElement | null | undefined;
  svgCircle: SVGCircleElement | null | undefined;
  progressBar: HTMLElement | null | undefined;
  uploadPercentage: HTMLElement | null | undefined;
  statusMessage: HTMLElement | null | undefined;
  retryButton: HTMLElement | null | undefined;
  srOnlyText: HTMLElement | null | undefined;
  _dropHandler: Function;

  constructor() {
    super();

    const shadow = this.attachShadow({ mode: 'open' });
    const uploaderHtml = template.content.cloneNode(true);
    shadow.appendChild(uploaderHtml);

    this.hiddenFileInput = this.shadowRoot?.querySelector('input[type="file"]');
    this.filePickerButton = this.shadowRoot?.querySelector('button');
    this.svgCircle = this.shadowRoot?.querySelector('circle');
    this.progressBar = this.shadowRoot?.getElementById('progress-bar');
    this.uploadPercentage = this.shadowRoot?.getElementById('upload-status');
    this.statusMessage = this.shadowRoot?.getElementById('status-message');
    this.retryButton = this.shadowRoot?.getElementById('retry-button');
    this.srOnlyText = this.shadowRoot?.getElementById('sr-only');

    this._dropHandler = this.handleUpload.bind(this);
  }

  connectedCallback() {
    this.setDefaultType();
    this.setupFilePickerButton();
    this.setupRetry();
    this.setupDropHandler();

    // TO-DO: Might want to standardize if we prefer to have users disable or enable things. (TD).
    // Edge case: User wants to use the uploader without drag.
    // Because we slot a default mux-uploader-drop if they don't slot one,
    // in order to disable drop, the user has to pass disable-drop to mux-uploader and mux-uploader-drop
    // must apply it in order to disable the drop. It currently requires you to explicit pass "true".
    if (this.hasAttribute('disable-drop')) {
      const muxUploaderDrop = this.shadowRoot?.querySelector('mux-uploader-drop');
      muxUploaderDrop?.setAttribute('disable-drop', '');
    }
  }

  disconnectedCallback() {
    //@ts-ignore
    this.removeEventListener('mux-drop', this._dropHandler, false);
  }

  get url() {
    return this.getAttribute('url') as string;
  }

  set url(value: string) {
    this.setAttribute('url', value);
  }

  setDefaultType() {
    const currentType = this.getAttribute('type');

    if (!currentType) {
      this.setAttribute('type', TYPES.BAR);
    }

    if (currentType === TYPES.RADIAL) {
      if (this.svgCircle) {
        // strokeDasharray is the size of dashes used to draw the circle with the size of gaps in between.
        // If the dash number is the same as the gap number, no gap is visible: a full circle.
        // strokeDashoffset defines where along our circle the dashes (in our case, a dash as long as the
        // circumference of our circle) begins. The larger the offset, the farther into the circle you're
        // starting the "dash". In the beginning, offset is the same as the circumference. Meaning, the visible
        // dash starts at the end so we don't see the full circle. Instead we see a gap the size of the circle.
        // When the percentage is 100%, offset is 0 meaning the dash starts at the beginning so we can see the circle. (TD).
        this.svgCircle.style.strokeDasharray = `${getCircumference(this)} ${getCircumference(this)}`;
        this.svgCircle.style.strokeDashoffset = `${getCircumference(this)}`;
      }
    }
  }

  setupRetry() {
    this.retryButton?.addEventListener('click', () => {
      this.resetState();
    });

    this.retryButton?.addEventListener('keydown', (event) => {
      const key = event.key || event.keyCode;

      switch (key) {
        // To-DO: Space bar not being recognized but is behaviour kb users will expect with a button. (TD).
        case 'Space' || 32: {
          this.resetState();
        }
        case 'Enter' || 13: {
          this.resetState();
        }
      }
    });
  }

  setupDropHandler() {
    //@ts-ignore
    this.addEventListener('mux-drop', this._dropHandler);
  }

  resetState() {
    this.removeAttribute('upload-error');
    this.removeAttribute('upload-in-progress');
    if (this.statusMessage) this.statusMessage.innerHTML = '';
    if (this.uploadPercentage) this.uploadPercentage.innerHTML = '';
  }

  setupFilePickerButton() {
    this.shadowRoot?.querySelector('slot[name=custom-button]')?.addEventListener('slotchange', () => {
      this.filePickerButton = this.shadowRoot?.querySelector('slot[name=custom-button]');
    });

    this.filePickerButton?.addEventListener('click', () => {
      // TO-DO: Allows user to reattempt uploading the same file after an error.
      // Note: Apparently Chrome and Firefox do not allow changing an indexed property on FileList...(TD).
      // Source: https://stackoverflow.com/a/46689013

      this.hiddenFileInput?.click();
    });

    this.hiddenFileInput?.addEventListener('change', (evt) => {
      const file = this.hiddenFileInput?.files?.[0];

      if (file) {
        this.dispatchEvent(
          new CustomEvent('mux-drop', {
            composed: true,
            bubbles: true,
            detail: file,
          })
        );
      }
    });
  }

  setProgress(percent: number) {
    if (this.uploadPercentage) this.uploadPercentage.innerHTML = `${Math.floor(percent)}%`;
    this.progressBar?.setAttribute('aria-valuenow', `${Math.floor(percent)}`);

    switch (this.getAttribute('type')) {
      case TYPES.BAR: {
        if (this.progressBar) this.progressBar.style.width = `${percent}%`;
      }
      case TYPES.RADIAL: {
        if (this.svgCircle) {
          // The closer the upload percentage gets to 100%, the closer offset gets to 0.
          // The closer offset gets to 0, the more we can see the circumference of our circle. (TD).
          const offset = getCircumference(this) - (percent / 100) * getCircumference(this);

          this.svgCircle.style.strokeDashoffset = offset.toString();
        }
      }
    }
  }

  handleUpload(evt: CustomEvent) {
    const url = this.url;
    const invalidUrlMessage = 'No url attribute specified -- cannot handleUpload';

    if (!url) {
      if (this.statusMessage) this.statusMessage.innerHTML = invalidUrlMessage;
      console.error(invalidUrlMessage);
    } else {
      if (this.statusMessage) this.statusMessage.innerHTML = '';
    }

    if (this.statusMessage) {
      this.removeAttribute('upload-error');
      this.statusMessage.innerHTML = '';
    }

    this.setAttribute('upload-in-progress', '');
    this.progressBar?.focus();

    const upload = UpChunk.createUpload({
      endpoint:
        url ||
        'https://storage.googleapis.com/video-storage-us-east1-uploads/B6vYEZ9utvayi7tJlcwjG4ckho8W5100QHse5OEIyOqg?Expires=1654714562&GoogleAccessId=direct-uploads-writer-prod%40mux-cloud.iam.gserviceaccount.com&Signature=ZQLdkP8u432oNZ5WtQwPB22qR%2B03BWd0DOdEFohak0dNG2fzJpE9RLCyAb8uJo3N8YH62UecxJs%2FefKFETicJd978Dldh3E4yTJQLWFR%2B%2FpCrYdS6EQRG7D08Vb9yz82jRJRgJ37cnJgNCzUFUx8AFX%2FG0o8BA3Wcm2AkdcLRWhvt2tj5wTzbxm8ZBflhYckJs7kNaiKEfIXk0UzNBPRJPGzyjzKUyyU1Keu0rERepH7BM8wJeGiw7KrD1TkqeMcA2NSpht4COKXYp3aNrryLGYfx%2B362U3KR0TaRalskKdqODbhBtTlLbFRALog3mGFq3CVJ2CG5Vztq6rXa00VRQ%3D%3D&upload_id=ADPycdsGqgIsU8tBAiu2k4Gt5hPa4QUaURD71neXpjQMfoQUeFGVDvE3qyAN7kzAVUcbSfK6tDhHwpSNiQMSvW41tPiTxw',
      file: evt.detail,
    });

    upload.on('error', (err) => {
      const errorMessage = 'An error has occurred';

      this.setAttribute('upload-error', '');

      if (this.statusMessage) {
        this.statusMessage.innerHTML = errorMessage;
      }

      console.error(err.detail.message);
    });

    upload.on('progress', (progress) => {
      this.setProgress(progress.detail);
    });

    upload.on('success', () => {
      const successMessage = 'Upload complete!';

      if (this.statusMessage) {
        this.statusMessage.innerHTML = successMessage;
      }

      // TO-DO: It seems like statusMessage cannot be updated within two different events. (TD).
      // Timing? Need to look into this...
      if (this.srOnlyText) {
        this.srOnlyText.innerHTML = successMessage;
      }

      console.info(successMessage);
    });
  }
}

type MuxUploaderElementType = typeof MuxUploaderElement;
declare global {
  var MuxUploaderElement: MuxUploaderElementType;
}

/** @TODO Refactor once using `globalThis` polyfills */
if (!globalThis.customElements.get('mux-uploader')) {
  globalThis.customElements.define('mux-uploader', MuxUploaderElement);
  /** @TODO consider externalizing this (breaks standard modularity) */
  globalThis.MuxUploaderElement = MuxUploaderElement;
}

export default MuxUploaderElement;
