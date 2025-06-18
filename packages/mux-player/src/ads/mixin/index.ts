import { MuxPlayerElementConstructor, Constructor, IAdsPlayer } from './types.js';

export const Attributes = {
  AD_TAG_URL: 'ad-tag-url',
  ALLOW_AD_BLOCKER: 'allow-ad-blocker',
} as const;

export function AdsPlayerMixin<T extends MuxPlayerElementConstructor>(superclass: T): Constructor<IAdsPlayer> & T {
  class AdsPlayer extends superclass implements IAdsPlayer {
    static get observedAttributes() {
      return [...super.observedAttributes, ...Object.values(Attributes)];
    }

    #tracks: HTMLTrackElement[] = [];

    connectedCallback() {
      super.connectedCallback();

      if (this.media) {
        this.media.allowAdBlocker = this.allowAdBlocker;
        this.media.adTagUrl = this.adTagUrl;
      }

      this.addEventListener('adbreakstart', () => {
        this.mediaTheme?.toggleAttribute('mediaadbreak', true);

        // Remove any tracks during ad-break to prevent cues from showing
        // but also to fix a bug on iOS where the video would not start.
        this.#tracks = Array.from(this.media?.querySelectorAll('track') || []);
        this.#tracks.forEach((track) => track.remove());
      });

      this.addEventListener('adbreakend', () => {
        this.mediaTheme?.toggleAttribute('mediaadbreak', false);
        this.media?.append(...this.#tracks);
      });
    }

    attributeChangedCallback(attrName: string, oldValue: string | null, newValue: string) {
      super.attributeChangedCallback(attrName, oldValue, newValue);

      if (!this.media) return;

      switch (attrName) {
        case Attributes.ALLOW_AD_BLOCKER:
          this.media.allowAdBlocker = this.allowAdBlocker;
          break;
        case Attributes.AD_TAG_URL:
          this.media.adTagUrl = this.adTagUrl;
          break;
      }
    }

    get allowAdBlocker() {
      return this.hasAttribute(Attributes.ALLOW_AD_BLOCKER);
    }

    set allowAdBlocker(val: boolean) {
      if (val === this.allowAdBlocker) return;
      this.toggleAttribute(Attributes.ALLOW_AD_BLOCKER, Boolean(val));
    }

    get adTagUrl() {
      return this.getAttribute(Attributes.AD_TAG_URL) ?? undefined;
    }

    set adTagUrl(val: string | undefined) {
      if (val === this.adTagUrl) return;
      if (val) {
        this.setAttribute(Attributes.AD_TAG_URL, val);
      } else {
        this.removeAttribute(Attributes.AD_TAG_URL);
      }
    }
  }

  return AdsPlayer as unknown as Constructor<IAdsPlayer> & T;
}
