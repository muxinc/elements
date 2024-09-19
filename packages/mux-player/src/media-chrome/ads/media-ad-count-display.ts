import { MediaTextDisplay } from 'media-chrome/dist/media-text-display.js';
import { getNumericAttr, getStringAttr, setNumericAttr, setStringAttr } from 'media-chrome/dist/utils/element-utils.js';
import { globalThis } from 'media-chrome/dist/utils/server-safe-globals.js';
import { MediaUIAttributes as MediaUIAttributesBase } from 'media-chrome/dist/constants.js';
// import { nouns } from 'media-chrome/dist/labels/labels.js';

const MediaUIAttributes = {
  ...MediaUIAttributesBase,
  MEDIA_AD_BREAK_TOTAL_ADS: 'mediaadbreaktotalads',
  MEDIA_AD_BREAK_AD_POSITION: 'mediaadbreakadposition',
} as const;

export const Attributes = {
  PREFIX: 'prefix',
};

const CombinedAttributes = [
  ...Object.values(Attributes),
  MediaUIAttributes.MEDIA_AD_BREAK_TOTAL_ADS,
  MediaUIAttributes.MEDIA_AD_BREAK_AD_POSITION,
];

// Todo: Use data locals: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleTimeString

const DEFAULT_COUNT_SEP = 'of';
const DEFAULT_PREFIX = 'Advertisement';

const formatLabel = (el: MediaAdCountDisplay, { countSep = DEFAULT_COUNT_SEP } = {}): string => {
  const prefixPart = el.prefix ? `${el.prefix}: ` : '';
  return `${prefixPart}${el.mediaAdBreakAdPosition} ${countSep} ${el.mediaAdBreakTotalAds}`;
};

// const DEFAULT_MISSING_TIME_PHRASE = 'video not loaded, unknown time.';

const updateAriaValueText = (el: MediaAdCountDisplay): void => {
  const fullPhrase = formatLabel(el);
  el.setAttribute('aria-valuetext', fullPhrase);
};

/**
 * @attr {string} prefix - the prefix string for the display. 'Advertisement' by default.
 * @attr {number} mediaadbreaktotalads - (read-only) total number of ads in the current ad break
 * @attr {number} mediaadbreakadposition - (read-only) current ad index playing in the current ad break
 */
class MediaAdCountDisplay extends MediaTextDisplay {
  #slot: HTMLSlotElement;

  static get observedAttributes(): string[] {
    return [...super.observedAttributes, ...CombinedAttributes, 'disabled'];
  }

  constructor() {
    super();

    this.#slot = this.shadowRoot?.querySelector('slot') as HTMLSlotElement;
    this.#slot.innerHTML = `${formatLabel(this)}`;
  }

  connectedCallback(): void {
    if (!this.hasAttribute('disabled')) {
      this.enable();
    }

    /** @TODO Implement these */
    this.setAttribute('role', 'progressbar');
    this.setAttribute('aria-label', 'FILL ME IN');

    super.connectedCallback();
  }

  disconnectedCallback(): void {
    this.disable();
    super.disconnectedCallback();
  }

  attributeChangedCallback(attrName: string, oldValue: string | null, newValue: string | null): void {
    if (CombinedAttributes.includes(attrName)) {
      this.update();
    } else if (attrName === 'disabled' && newValue !== oldValue) {
      if (newValue == null) {
        this.enable();
      } else {
        this.disable();
      }
    }

    super.attributeChangedCallback(attrName, oldValue, newValue);
  }

  enable(): void {
    this.tabIndex = 0;
  }

  disable(): void {
    this.tabIndex = -1;
  }

  // Own props

  /**
   * Describe me
   */
  get prefix(): string {
    return getStringAttr(this, Attributes.PREFIX, DEFAULT_PREFIX);
  }

  set prefix(val: string | undefined) {
    /** @TODO inaccurate type def in media chrome. Accepts/expects nullish. (CJP) */
    /** @ts-ignore */
    setStringAttr(this, Attributes.PREFIX, val);
  }

  // Props derived from media UI attributes

  /**
   * Describe me
   */
  get mediaAdBreakTotalAds(): number | undefined {
    return getNumericAttr(this, MediaUIAttributes.MEDIA_AD_BREAK_TOTAL_ADS);
  }

  set mediaAdBreakTotalAds(val: number | undefined) {
    /** @TODO inaccurate type def in media chrome. Accepts/expects nullish. (CJP) */
    /** @ts-ignore */
    setNumericAttr(this, MediaUIAttributes.MEDIA_AD_BREAK_TOTAL_ADS, val);
  }

  /**
   * Describe me
   */
  get mediaAdBreakAdPosition(): number | undefined {
    return getNumericAttr(this, MediaUIAttributes.MEDIA_AD_BREAK_AD_POSITION);
  }

  set mediaAdBreakAdPosition(val: number | undefined) {
    /** @TODO inaccurate type def in media chrome. Accepts/expects nullish. (CJP) */
    /** @ts-ignore */
    setNumericAttr(this, MediaUIAttributes.MEDIA_AD_BREAK_AD_POSITION, val);
  }

  update(): void {
    const label = formatLabel(this);
    updateAriaValueText(this);
    // Only update if it changed, timeupdate events are called a few times per second.
    if (label !== this.#slot.innerHTML) {
      this.#slot.innerHTML = label;
    }
  }
}

if (!globalThis.customElements.get('media-ad-count-display')) {
  globalThis.customElements.define('media-ad-count-display', MediaAdCountDisplay);
}

export default MediaAdCountDisplay;
