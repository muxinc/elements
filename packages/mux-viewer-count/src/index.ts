import { globalThis } from 'shared-polyfills';

const Attributes = {
  TOKEN: 'token',
  POLL_INTERVAL: 'pollinterval',
};

const DEFAULT_POLL_INTERVAL = 20;

const AttributeValues = Object.freeze(Object.values(Attributes));

/** @TODO Add code comments (CJP) */
export const subscribeViewerCount = (
  token: string,
  pollInterval: number,
  callback: (views: number) => void,
  errorCb: (errorMsg: string) => void
) => {
  const url = `https://stats.mux.com/counts?token=${token}`;
  const controller = new AbortController();
  const signal = controller.signal;
  let timeoutId: number | undefined;
  let aborted = false;
  const fetchViewerCountPoll: () => Promise<any> = async () => {
    if (aborted) return Promise.resolve();
    return fetch(url, { signal })
      .then((resp) => resp.json())
      .then((respObj) => {
        const views = respObj?.data?.[0]?.views;
        if (!!respObj?.error || views == null) {
          return Promise.reject(respObj?.error ?? 'no data in response');
        }
        callback(views);
        return views;
      })
      .catch(errorCb)
      .then(() => {
        return new Promise((resolve) => {
          timeoutId = setTimeout(async () => {
            resolve(undefined);
          }, pollInterval * 1000);
        });
      })
      .then(fetchViewerCountPoll);
  };

  fetchViewerCountPoll();

  return () => {
    aborted = true;
    controller.abort();
    if (typeof timeoutId === 'number') {
      clearTimeout(timeoutId);
      timeoutId = undefined;
    }
  };
};

class MuxViewerCountElement extends globalThis.HTMLElement {
  static get observedAttributes() {
    return AttributeValues;
  }

  #unsubscribeViewerCount: (() => void) | undefined;

  constructor() {
    super();
  }

  get token() {
    return this.getAttribute(Attributes.TOKEN) ?? '';
  }

  set token(value: string) {
    if (this.token === value) return;
    this.setAttribute(Attributes.TOKEN, value);
  }

  get pollInterval() {
    return this.hasAttribute(Attributes.POLL_INTERVAL)
      ? +(this.getAttribute(Attributes.POLL_INTERVAL) as string)
      : DEFAULT_POLL_INTERVAL;
  }

  set pollInterval(value: number) {
    if (this.pollInterval === value) return;
    this.setAttribute(Attributes.POLL_INTERVAL, `${value}`);
  }

  connectedCallback() {
    this.#setupViewerCountPolling();
  }

  disconnectedCallback() {
    this.#teardownViewerCountPolling();
  }

  attributeChangedCallback(attrName: string, oldValue: string | null, newValue: string | null) {
    /** @TODO Support dynamic (re)setting of attributes (CJP) */
  }

  #setupViewerCountPolling() {
    if (this.token && this.pollInterval && !this.#unsubscribeViewerCount) {
      this.#unsubscribeViewerCount = subscribeViewerCount(
        this.token,
        this.pollInterval,
        // Success callback
        (views) => {
          /** @TODO Add event for viewschange (CJP) */
          /** @TODO Add views getter (CJP) */
          /** @TODO Add "beefier" template (CJP) */
          this.textContent = `${views}`;
        },
        // Error callback
        (errorMsg) => {
          /** @TODO Add event for error (CJP) */
          /** @TODO Consider adding retry count/logic (CJP) */
          console.warn('Failed to retrieve viewer count: Error - ', errorMsg);
          this.#teardownViewerCountPolling();
        }
      );
    }
  }

  #teardownViewerCountPolling() {
    this.#unsubscribeViewerCount?.();
    this.#unsubscribeViewerCount = undefined;
  }
}

if (!globalThis.customElements.get('media-viewer-count')) {
  globalThis.customElements.define('media-viewer-count', MuxViewerCountElement);
}

export default MuxViewerCountElement;
