import { globalThis, document } from 'shared-polyfills';
// Still need to import this to ensure component registration occurs when using the main module.
// Consider refactoring module structure to avoid this. (CJP)
import './mux-uploader-drop';
import * as UpChunk from '@mux/upchunk';

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

<div class="sr-only" id="sr-only" aria-live="polite"></div>

<div class=text-container>
  <span class="status-message" id="status-message" role="status" aria-live="polite"></span>
  <span class="retry-button" id="retry-button" role="button" tabindex="0">Try again</span>
</div>

<input id="hidden-file-input" type="file" />
<slot name="upload-button"><button type="button">Upload video</button></slot>
<p class="upload-status" id="upload-status"></p>

<div class="bar-type">
  <div role="progressbar" aria-valuemin="0" aria-valuemax="100" class="progress-bar" id="progress-bar" tabindex="0"></div>
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
`;

// Note: Use "bar" for now since the CSS for radial is WIP. (TD).
const TYPES = {
  BAR: 'bar',
  RADIAL: 'radial',
};

const defaultFormatProgress = (percent: number) => `${Math.floor(percent)}%`;

const getRadius = (el: MuxUploaderElement) => Number(el.svgCircle?.getAttribute('r'));

const getCircumference = (el: MuxUploaderElement) => getRadius(el) * 2 * Math.PI;

const ariaDescription = 'Media upload progress bar';

const ButtonPressedKeys = ['Enter', ' '];

type Endpoint = UpChunk.UpChunk['endpoint'] | undefined | null;
type DynamicChunkSize = UpChunk.UpChunk['dynamicChunkSize'] | undefined;

type ErrorDetail = {
  message: string;
  chunkNumber?: number;
  attempts?: number;
};

// NOTE: Progress event is already determined on HTMLElement but have inconsistent types. Should consider renaming events (CJP)
export interface MuxUploaderElementEventMap extends Omit<HTMLElementEventMap, 'progress'> {
  uploadstart: CustomEvent<{ file: File; chunkSize: number }>;
  chunkattempt: CustomEvent<{
    chunkNumber: number;
    chunkSize: number;
  }>;
  chunksuccess: CustomEvent<{
    chunk: number;
    chunkSize: number;
    attempts: number;
    timeInterval: number;
    // Note: This should be more explicitly typed in Upchunk. (TD).
    response: any;
  }>;
  uploaderror: CustomEvent<ErrorDetail>;
  progress: CustomEvent<number>;
  success: CustomEvent<undefined | null>;
}

interface MuxUploaderElement extends HTMLElement {
  addEventListener<K extends keyof MuxUploaderElementEventMap>(
    type: K,
    listener: (this: HTMLMediaElement, ev: MuxUploaderElementEventMap[K]) => any,
    options?: boolean | AddEventListenerOptions
  ): void;
  addEventListener(
    type: string,
    listener: EventListenerOrEventListenerObject,
    options?: boolean | AddEventListenerOptions
  ): void;
  removeEventListener<K extends keyof MuxUploaderElementEventMap>(
    type: K,
    listener: (this: HTMLMediaElement, ev: MuxUploaderElementEventMap[K]) => any,
    options?: boolean | EventListenerOptions
  ): void;
  removeEventListener(
    type: string,
    listener: EventListenerOrEventListenerObject,
    options?: boolean | EventListenerOptions
  ): void;
}

class MuxUploaderElement extends globalThis.HTMLElement implements MuxUploaderElement {
  protected _formatProgress: ((percent: number) => string) | null | undefined;
  protected _filePickerButton: HTMLElement | null | undefined;
  protected _endpoint: Endpoint;
  svgCircle: SVGCircleElement | null | undefined;
  progressBar: HTMLElement | null | undefined;
  uploadPercentage: HTMLElement | null | undefined;
  statusMessage: HTMLElement | null | undefined;
  retryButton: HTMLElement | null | undefined;
  srOnlyText: HTMLElement | null | undefined;

  constructor() {
    super();

    // NOTE: Binding this so that we have a reference to remove the event listener
    // but can still reference `this` in the method. (CJP)
    this.handleFilePickerButtonClick = this.handleFilePickerButtonClick.bind(this);

    const shadow = this.attachShadow({ mode: 'open' });
    const uploaderHtml = template.content.cloneNode(true);
    shadow.appendChild(uploaderHtml);

    // Since we have a "default slotted" element, we still need to initialize the slottable elements
    // (Note the difference in selectors and related code in 'slotchange' handler, below)
    this.filePickerButton = this.shadowRoot?.querySelector('slot[name=upload-button] > *');
    this.svgCircle = this.shadowRoot?.querySelector('circle');
    this.progressBar = this.shadowRoot?.getElementById('progress-bar');
    this.uploadPercentage = this.shadowRoot?.getElementById('upload-status');
    this.statusMessage = this.shadowRoot?.getElementById('status-message');
    this.retryButton = this.shadowRoot?.getElementById('retry-button');
    this.srOnlyText = this.shadowRoot?.getElementById('sr-only');

    this.progressBar?.setAttribute('aria-description', ariaDescription);

    // These should only ever be setup once on instantiation/construction.
    this.hiddenFileInput?.addEventListener('change', () => {
      const file = this.hiddenFileInput?.files?.[0];

      if (file) {
        this.dispatchEvent(
          new CustomEvent('file-ready', {
            composed: true,
            bubbles: true,
            detail: file,
          })
        );
      }
    });
    this.shadowRoot?.querySelector('slot[name=upload-button]')?.addEventListener('slotchange', () => {
      this.filePickerButton = (
        this.shadowRoot?.querySelector('slot[name=upload-button]') as HTMLSlotElement
      )?.assignedNodes()[0] as HTMLButtonElement;
    });
  }

  connectedCallback() {
    this.setDefaultType();
    this.setupRetry();
    //@ts-ignore
    this.addEventListener('file-ready', this.handleUpload);
  }

  disconnectedCallback() {
    //@ts-ignore
    this.removeEventListener('file-ready', this.handleUpload, false);
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

  protected get hiddenFileInput() {
    return this.shadowRoot?.querySelector('#hidden-file-input') as HTMLInputElement;
  }

  handleFilePickerButtonClick() {
    // TO-DO: Allow user to reattempt uploading the same file after an error.
    // Note: Apparently Chrome and Firefox do not allow changing an indexed property on FileList...(TD).
    // Source: https://stackoverflow.com/a/46689013
    this.hiddenFileInput.click();
  }

  get endpoint(): Endpoint {
    return this.getAttribute('endpoint') ?? this._endpoint;
  }

  set endpoint(value: Endpoint) {
    if (value === this.endpoint) return;
    if (typeof value === 'string') {
      this.setAttribute('endpoint', value);
    } else if (value == undefined) {
      this.removeAttribute('endpoint');
    }
    this._endpoint = value;
  }

  get dynamicChunkSize(): DynamicChunkSize {
    return this.hasAttribute('dynamic-chunk-size');
  }

  set dynamicChunkSize(value: DynamicChunkSize) {
    if (value === this.hasAttribute('dynamic-chunk-size')) return;
    if (value) {
      this.setAttribute('dynamic-chunk-size', '');
    } else {
      this.removeAttribute('dynamic-chunk-size');
    }
  }

  get formatProgress(): (percent: number) => string {
    return this._formatProgress ?? defaultFormatProgress;
  }

  set formatProgress(value: ((percent: number) => string) | null | undefined) {
    this._formatProgress = value;
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

    // NOTE: There are definitely some "false positive" cases with multi-key pressing,
    // but this should be good enough for most use cases.
    const keyUpHandler = (e: KeyboardEvent) => {
      const { key } = e;
      if (!ButtonPressedKeys.includes(key)) {
        this.removeEventListener('keyup', keyUpHandler);
        return;
      }

      this.resetState();
    };

    this.addEventListener('keydown', (e) => {
      const { metaKey, altKey, key } = e;
      if (metaKey || altKey || !ButtonPressedKeys.includes(key)) {
        this.removeEventListener('keyup', keyUpHandler);
        return;
      }
      this.addEventListener('keyup', keyUpHandler);
    });
  }

  resetState() {
    this.removeAttribute('upload-error');
    this.removeAttribute('upload-in-progress');
    // Reset file to ensure change/input events will fire, even if selecting the same file (CJP).
    this.hiddenFileInput.value = '';
    if (this.statusMessage) this.statusMessage.innerHTML = '';
    if (this.uploadPercentage) this.uploadPercentage.innerHTML = '';
  }

  setProgress(percent: number) {
    if (this.uploadPercentage) this.uploadPercentage.innerHTML = this.formatProgress(percent);
    this.progressBar?.setAttribute('aria-valuenow', `${Math.floor(percent)}`);

    switch (this.getAttribute('type')) {
      case TYPES.BAR: {
        if (this.progressBar) this.progressBar.style.width = `${percent}%`;
        break;
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
    const endpoint = this.endpoint;
    const dynamicChunkSize = this.dynamicChunkSize;

    if (!endpoint) {
      const invalidUrlMessage = 'No url or endpoint specified -- cannot handleUpload';
      if (this.statusMessage) {
        this.statusMessage.innerHTML = invalidUrlMessage;
      }
      this.setAttribute('upload-error', '');
      console.error(invalidUrlMessage);
      this.dispatchEvent(new CustomEvent('uploaderror', { detail: { message: invalidUrlMessage } }));
      // Bail early if no endpoint.
      return;
    } else {
      this.removeAttribute('upload-error');
      if (this.statusMessage) {
        this.statusMessage.innerHTML = '';
      }
    }

    this.setAttribute('upload-in-progress', '');
    this.progressBar?.focus();

    const upload = UpChunk.createUpload({
      endpoint,
      dynamicChunkSize,
      file: evt.detail,
    });

    this.dispatchEvent(new CustomEvent('uploadstart', { detail: { file: upload.file, chunkSize: upload.chunkSize } }));

    upload.on('attempt', (event) => {
      this.dispatchEvent(new CustomEvent('chunkattempt', event));
    });

    upload.on('chunkSuccess', (event) => {
      this.dispatchEvent(new CustomEvent('chunksuccess', event));
    });

    upload.on('error', (event) => {
      const errorMessage = 'An error has occurred';

      this.setAttribute('upload-error', '');

      if (this.statusMessage) {
        this.statusMessage.innerHTML = errorMessage;
      }

      console.error(event.detail.message);
      this.dispatchEvent(new CustomEvent('uploaderror', event));
    });

    upload.on('progress', (event) => {
      this.setProgress(event.detail);
      this.dispatchEvent(new CustomEvent('progress', event));
    });

    upload.on('success', (event) => {
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
      this.dispatchEvent(new CustomEvent('success', event));
    });
  }
}

type MuxUploaderElementType = typeof MuxUploaderElement;
declare global {
  // eslint-disable-next-line
  var MuxUploaderElement: MuxUploaderElementType;
}

/** @TODO Refactor once using `globalThis` polyfills */
if (!globalThis.customElements.get('mux-uploader')) {
  globalThis.customElements.define('mux-uploader', MuxUploaderElement);
  /** @TODO consider externalizing this (breaks standard modularity) */
  globalThis.MuxUploaderElement = MuxUploaderElement;
}

export default MuxUploaderElement;
