const styles = `
  :host {
    cursor: pointer;
  }
  media-time-display {
    color: inherit;
  }
`;
const template = document.createElement('template');
template.innerHTML = `
  <style>
    ${styles}
  </style>
  <media-time-display show-duration></media-time-display>
`;

const ButtonPressedKeys = ['Enter', ' '];

class MxpTimeDisplay extends HTMLElement {
  static get observedAttributes() {
    return ['hide-duration', 'remaining'];
  }
  static styles: string = styles;
  static template: HTMLTemplateElement = template;
  timeDisplayEl: HTMLElement | null | undefined;
  #displayInterval: any;

  constructor() {
    super();

    this.attachShadow({ mode: 'open' });
    this.shadowRoot?.appendChild((this.constructor as any).template.content.cloneNode(true));
    this.timeDisplayEl = this.shadowRoot?.querySelector('media-time-display');
  }

  toggleTimeDisplay() {
    if (this.timeDisplayEl?.hasAttribute('remaining')) {
      this.timeDisplayEl?.removeAttribute('remaining');
    } else {
      this.timeDisplayEl?.setAttribute('remaining', '');
    }
  }

  connectedCallback() {
    const keyUpHandler = (e: KeyboardEvent) => {
      const { key } = e;
      if (!ButtonPressedKeys.includes(key)) {
        this.removeEventListener('keyup', keyUpHandler);
        return;
      }

      this.toggleTimeDisplay();
    };

    this.addEventListener('keydown', (e) => {
      const { metaKey, altKey, key } = e;
      if (metaKey || altKey || !ButtonPressedKeys.includes(key)) {
        this.removeEventListener('keyup', keyUpHandler);
        return;
      }
      this.addEventListener('keyup', keyUpHandler);
    });

    this.addEventListener('click', this.toggleTimeDisplay);

    // Temporary fix until CSS vars are available in the time-display Media Chrome
    // component to target each time variant: current, remaining, duration.
    this.#displayInterval = setInterval(() => {
      if (getComputedStyle(this).getPropertyValue('--media-duration-display').trim() === 'none') {
        this.timeDisplayEl?.removeAttribute('show-duration');
      } else {
        this.timeDisplayEl?.setAttribute('show-duration', '');
      }
    }, 200);
  }

  disconnectedCallback() {
    clearInterval(this.#displayInterval);
  }

  attributeChangedCallback(attrName: string, _oldValue: string | null, newValue: string | null) {
    if (attrName === 'hide-duration') {
      if (newValue != null) {
        this.timeDisplayEl?.removeAttribute('show-duration');
      } else {
        this.timeDisplayEl?.setAttribute('show-duration', '');
      }
    }
    if (attrName === 'remaining') {
      if (newValue != null) {
        this.timeDisplayEl?.setAttribute('remaining', '');
      } else {
        this.timeDisplayEl?.removeAttribute('remaining');
      }
    }
  }
}

if (!globalThis.customElements.get('mxp-time-display')) {
  globalThis.customElements.define('mxp-time-display', MxpTimeDisplay);
  (globalThis as any).MxpTimeDisplay = MxpTimeDisplay;
}

export default MxpTimeDisplay;
