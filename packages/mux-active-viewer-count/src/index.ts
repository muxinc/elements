import { globalThis } from './polyfills';

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
  const fetchViewerCountPoll: () => Promise<any> = () => {
    // If the polling has been aborted (via an "unsubscribe()"),
    // we can simply bail on the recursion.
    if (aborted) return Promise.resolve();
    // GET the latest view count, providing an abort signal
    // for unsubscription.
    return (
      fetch(url, { signal })
        // Grab the JSON value of the response
        .then((resp) => resp.json())
        // Confirm that response wasn't an error and the JSON
        // has the expected data
        .then((respObj) => {
          const views = respObj?.data?.[0]?.views;
          if (!!respObj?.error || views == null) {
            // If not, treat as an error.
            return Promise.reject(respObj?.error ?? 'no data in response');
          }
          // Otherwise, we successfully retrieved the latest views, so
          // provide that info out via `callback()`.
          callback(views);
          return views;
        })
        // Catch and invoke errorCb before timeout + re-fetch. This allows
        // for re-fetching by default, but provides the opportunity
        // to unsubscribe externally via `errorCb` if desired (CJP)
        .catch(errorCb)
        // Wait the duration of the polling interval before restarting
        // the next fetch
        .then(() => {
          return new Promise((resolve) => {
            timeoutId = setTimeout(() => {
              resolve(undefined);
            }, pollInterval * 1000);
          });
        })
        // Restart process of re-fetching by invoking this method again
        // (async recursion)
        .then(fetchViewerCountPoll)
    );
  };

  // Kick off the polling functionality.
  fetchViewerCountPoll();

  // Return an "unsubscribe()" function. Invoking this will abort
  // any mid-flight fetches, clear any pending timeouts for
  // a re-fetch, and mark this process as "aborted".
  return () => {
    aborted = true;
    controller.abort();
    if (typeof timeoutId === 'number') {
      clearTimeout(timeoutId);
      timeoutId = undefined;
    }
  };
};

const Attributes = {
  TOKEN: 'token',
  POLL_INTERVAL: 'poll-interval',
  DISABLED: 'disabled',
};

const DEFAULT_POLL_INTERVAL = 20;

const AttributeValues = Object.freeze(Object.values(Attributes));

const ARIA_LABEL = 'Viewer Count';
const DEFAULT_VIEWER_COUNT_VALUE = '??';
const toAriaLabel = ({ viewerCount }: { viewerCount?: number }) => {
  const viewerCountStr = typeof viewerCount === 'number' ? `${viewerCount}` : 'Unknown';
  return `${ARIA_LABEL} ${viewerCountStr}`;
};

const template = document.createElement('template');
template.innerHTML = `
<style>
</style>
<span id="viewer-count">
${DEFAULT_VIEWER_COUNT_VALUE}
</span>
`;

class MuxActiveViewerCountElement extends globalThis.HTMLElement {
  static get observedAttributes() {
    return AttributeValues;
  }

  #unsubscribeViewerCount: (() => void) | undefined;

  get #viewerCountEl() {
    return (this.shadowRoot as ShadowRoot).querySelector('#viewer-count') as HTMLElement;
  }

  #views?: number;

  get views(): number {
    return this.#views ?? Number.NaN;
  }

  constructor() {
    super();
    const shadowRoot = this.attachShadow({ mode: 'open' });
    shadowRoot.appendChild(template.content.cloneNode(true));
  }

  get token() {
    return this.getAttribute(Attributes.TOKEN) ?? '';
  }

  set token(value: string) {
    if (this.token === value) return;
    this.#views = undefined;
    this.setAttribute(Attributes.TOKEN, value);
  }

  get pollInterval() {
    let temp = this.hasAttribute(Attributes.POLL_INTERVAL)
      ? +(this.getAttribute(Attributes.POLL_INTERVAL) as string)
      : DEFAULT_POLL_INTERVAL;
    if (temp < 15) {
      console.warn('Poll interval must be at least 15 seconds, setting to 15.');
      temp = 15;
    }
    return temp;
  }

  set pollInterval(value: number) {
    if (this.pollInterval === value) return;
    this.setAttribute(Attributes.POLL_INTERVAL, `${value}`);
  }

  enable() {
    this.setAttribute('tabindex', '0');
  }

  disable() {
    this.removeAttribute('tabindex');
  }

  connectedCallback() {
    if (!this.hasAttribute('disabled')) {
      this.enable();
    }

    /** @TODO Update to use `viewerCount` prop when available (CJP) */
    this.setAttribute('aria-label', toAriaLabel({}));
    this.setAttribute('role', 'presentation');
    this.#setupViewerCountPolling();
  }

  disconnectedCallback() {
    this.#teardownViewerCountPolling();
  }

  attributeChangedCallback(attrName: string, oldValue: string | null, newValue: string | null) {
    if (attrName === Attributes.POLL_INTERVAL || attrName === Attributes.TOKEN) {
      this.#teardownViewerCountPolling();
      this.#setupViewerCountPolling();
    } else if (attrName === Attributes.DISABLED && oldValue !== newValue) {
      if (newValue) {
        this.disable();
      } else {
        this.enable();
      }
    }
  }

  #setupViewerCountPolling() {
    if (this.token && this.pollInterval && !this.#unsubscribeViewerCount) {
      this.#unsubscribeViewerCount = subscribeViewerCount(
        this.token,
        this.pollInterval,
        // Success callback
        (views) => {
          this.#views = views;
          this.dispatchEvent(
            new CustomEvent('change', {
              detail: views,
            })
          );
          this.#viewerCountEl.textContent = `${this.views}`;
          /** @TODO Update to use `viewerCount` prop when available (CJP) */
          this.setAttribute('aria-label', toAriaLabel({ viewerCount: views }));
        },
        // Error callback
        (errorMsg) => {
          this.dispatchEvent(
            new CustomEvent('error', {
              detail: errorMsg,
            })
          );
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

if (!globalThis.customElements.get('mux-active-viewer-count')) {
  globalThis.customElements.define('mux-active-viewer-count', MuxActiveViewerCountElement);
}

export default MuxActiveViewerCountElement;
