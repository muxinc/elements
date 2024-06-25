import { globalThis, document } from './polyfills';
import { getMuxUploaderEl } from './utils/element-utils';
import type MuxUploaderElement from './mux-uploader';

const template = document.createElement('template');

template.innerHTML = /*html*/ `
<style>
#pause-button {
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
  display: none;
}

#pause-button:hover:not(:disabled) {
  color: #fff;
  background: #404040;
}

#pause-button:active {
  color: #fff;
  background: #000;
}

#pause-button:disabled {
  cursor: not-allowed;
}

:host([upload-in-progress]:not([upload-error], [upload-complete])) #pause-button {
  display: initial;
}
</style>

<button id="pause-button">Pause</span>
`;

class MuxUploaderPauseElement extends globalThis.HTMLElement {
  #uploaderEl: MuxUploaderElement | null | undefined;
  #abortController: AbortController | undefined;

  constructor() {
    super();
    const shadowRoot = this.attachShadow({ mode: 'open' });
    shadowRoot.appendChild(template.content.cloneNode(true));
  }

  connectedCallback() {
    this.#uploaderEl = getMuxUploaderEl(this);
    this.#abortController = new AbortController();

    if (this.#uploaderEl) {
      const opts = { signal: this.#abortController.signal };
      this.#uploaderEl.addEventListener('uploadstart', () => this.toggleAttribute('upload-in-progress', true), opts);
      this.#uploaderEl.addEventListener('uploaderror', () => {
        this.toggleAttribute('upload-error', true);
        this.toggleAttribute('upload-complete', false);
        this.toggleAttribute('upload-in-progress', false);
      });
      this.#uploaderEl.addEventListener('success', () => {
        this.toggleAttribute('upload-complete', true);
        this.toggleAttribute('upload-error', false);
        this.toggleAttribute('upload-in-progress', false);
      });
      this.#uploaderEl.addEventListener('reset', () => {
        this.toggleAttribute('upload-error', false);
        this.toggleAttribute('upload-in-progress', false);
        this.toggleAttribute('upload-complete', false);
      });
      /** @TODO Implement a more robust "pausedState" in mux-uploader (plausibly in upchunk) to account for "pausing" (CJP) */
      this.#uploaderEl.addEventListener('pausedchange', () => {
        this.pauseButton.disabled = false;
        if (!this.#uploaderEl) return;
        const nextPausedState = this.#uploaderEl.paused ?? false;
        // If entered paused, currently does not take effect until current chunk completes upload,
        // so show as "pausing"
        this.pauseButton.innerHTML = nextPausedState ? 'Pausing...' : 'Pause';
        if (nextPausedState) {
          this.pauseButton.disabled = true;
          this.#uploaderEl.addEventListener(
            'chunksuccess',
            () => {
              // Recheck paused state just in case state changed while waiting for 'chunksuccess'
              this.pauseButton.innerHTML = this.#uploaderEl?.paused ? 'Resume' : 'Pause';
              this.pauseButton.disabled = false;
            },
            { once: true }
          );
        }
      });

      this.pauseButton.addEventListener('click', this.triggerPause, opts);

      this.toggleAttribute('upload-in-progress', this.#uploaderEl.hasAttribute('upload-in-progress'));
      this.toggleAttribute('upload-complete', this.#uploaderEl.hasAttribute('upload-complete'));
      this.toggleAttribute('upload-error', this.#uploaderEl.hasAttribute('upload-error'));
    }
  }

  disconnectedCallback() {
    this.#abortController?.abort();
  }

  get pauseButton() {
    return this.shadowRoot?.getElementById('pause-button') as HTMLButtonElement;
  }

  triggerPause = () => {
    if (!this.#uploaderEl) {
      console.warn('pausing before a mux-uploader element is associated is unsupported!');
      return;
    }
    if (this.pauseButton.disabled) {
      return;
    }
    this.#uploaderEl.paused = !this.#uploaderEl.paused;
  };
}

if (!globalThis.customElements.get('mux-uploader-pause')) {
  globalThis.customElements.define('mux-uploader-pause', MuxUploaderPauseElement);
}

export default MuxUploaderPauseElement;
