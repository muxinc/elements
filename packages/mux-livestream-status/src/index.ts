import { globalThis } from 'shared-polyfills';
import { DEFAULT_POLL_INTERVAL, Unsubscribe } from './shared';
import { subscribeLivestreamStatus } from './subscribeLivestreamStatus';

const attributes = {
  PLAYBACK_ID: 'playback-id',
  POLL_INTERVAL: 'poll-interval',
  STATUS: 'status',
};
const attributeNames = Object.freeze(Object.values(attributes));

class MuxLivestreamStatusElement extends globalThis.HTMLElement {
  // TODO: name this better
  #unsubscribeFn: Unsubscribe | undefined = undefined;

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  static get observedAttributes() {
    return attributeNames;
  }

  get status() {
    return this.getAttribute(attributes.STATUS) ?? '';
  }

  set status(value: string) {
    if (this.status === value) return;
    this.setAttribute(attributes.STATUS, value);
  }

  get playbackId() {
    return this.getAttribute(attributes.PLAYBACK_ID) ?? '';
  }

  set playbackId(value: string) {
    if (this.playbackId === value) return;
    this.setAttribute(attributes.PLAYBACK_ID, value);
  }

  get pollInterval() {
    return this.hasAttribute(attributes.POLL_INTERVAL)
      ? +(this.getAttribute(attributes.POLL_INTERVAL) as string)
      : DEFAULT_POLL_INTERVAL;
  }

  set pollInterval(value: number) {
    if (this.pollInterval === value) return;
    this.setAttribute(attributes.POLL_INTERVAL, `${value}`);
  }

  attributeChangedCallback(name: string) {
    // no status attribute designates that we don't have a
    // status for this playback-id yet (it might not exist...)
    if (name === attributes.PLAYBACK_ID) {
      this.removeAttribute('status');
    }

    if (name === attributes.PLAYBACK_ID || name === attributes.POLL_INTERVAL) {
      this.#unsubscribe();
      this.#subscribe();
    }
  }

  connectedCallback() {
    this.#subscribe();
  }

  disconnectedCallback() {
    this.#unsubscribe();
  }

  #subscribe = () => {
    // we already have a subscription
    if (this.#unsubscribeFn) return;

    // required
    if (!this.playbackId || !this.pollInterval) return;

    this.#unsubscribeFn = subscribeLivestreamStatus(
      this.playbackId,
      this.pollInterval,
      (status) => {
        this.status = status;
        (this.shadowRoot as ShadowRoot).textContent = status;
        this.dispatchEvent(
          new CustomEvent('change', {
            detail: status,
          })
        );
      },
      (error) => {
        this.dispatchEvent(
          new CustomEvent('error', {
            detail: error,
          })
        );
      }
    );
  };

  #unsubscribe = () => {
    this.#unsubscribeFn?.();
    this.#unsubscribeFn = undefined;
  };
}

if (!globalThis.customElements.get('mux-livestream-status')) {
  globalThis.customElements.define('mux-livestream-status', MuxLivestreamStatusElement);
}

export default MuxLivestreamStatusElement;
