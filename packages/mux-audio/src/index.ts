import { globalThis } from './polyfills';
import {
  initialize,
  teardown,
  generatePlayerInitTime,
  MuxMediaProps,
  StreamTypes,
  PlaybackTypes,
  ValueOf,
  toMuxVideoURL,
  Metadata,
  MediaError,
  getStartDate,
  getCurrentPdt,
  getEnded,
} from '@mux/playback-core';
import type { PlaybackCore, PlaybackEngine, ExtensionMimeTypeMap } from '@mux/playback-core';
import { getPlayerVersion } from './env';
// this must be imported after playback-core for the polyfill to be included
import { CustomAudioElement, Events as AudioEvents } from 'custom-media-element';
import type { HlsConfig } from 'hls.js';

export const Attributes = {
  ENV_KEY: 'env-key',
  DEBUG: 'debug',
  PLAYBACK_ID: 'playback-id',
  PROGRAM_START_TIME: 'program-start-time',
  PROGRAM_END_TIME: 'program-end-time',
  METADATA_URL: 'metadata-url',
  PREFER_PLAYBACK: 'prefer-playback',
  BEACON_COLLECTION_DOMAIN: 'beacon-collection-domain',
  DISABLE_TRACKING: 'disable-tracking',
  DISABLE_COOKIES: 'disable-cookies',
  TYPE: 'type',
  STREAM_TYPE: 'stream-type',
  START_TIME: 'start-time',
} as const;

const AttributeNameValues = Object.values(Attributes);

const playerSoftwareVersion = getPlayerVersion();
const playerSoftwareName = 'mux-audio';

class MuxAudioElement extends CustomAudioElement implements Partial<MuxMediaProps> {
  static get observedAttributes() {
    return [...AttributeNameValues, ...(CustomAudioElement.observedAttributes ?? [])];
  }

  #core?: PlaybackCore;
  #loadRequested?: Promise<void> | null;
  #playerInitTime: number;
  #metadata: Readonly<Metadata> = {};
  #_hlsConfig?: Partial<HlsConfig>;

  constructor() {
    super();
    this.#playerInitTime = generatePlayerInitTime();
  }

  get playerInitTime() {
    return this.#playerInitTime;
  }

  get playerSoftwareName() {
    return playerSoftwareName;
  }

  get playerSoftwareVersion() {
    return playerSoftwareVersion;
  }

  // Keeping this named "_hls" since it's exposed for unadvertised "advanced usage" via getter that assumes specifically hls.js (CJP)
  get _hls(): PlaybackEngine | undefined {
    return this.#core?.engine;
  }

  get mux(): Readonly<HTMLAudioElement['mux']> | undefined {
    return this.nativeEl.mux;
  }

  get src() {
    // Use the attribute value as the source of truth.
    // No need to store it in two places.
    // This avoids needing a to read the attribute initially and update the src.
    return this.getAttribute('src') as string;
  }

  set src(val: string) {
    // If being set by attributeChangedCallback,
    // dont' cause an infinite loop
    if (val === this.src) return;

    if (val == null) {
      this.removeAttribute('src');
    } else {
      this.setAttribute('src', val);
    }
  }

  get preload() {
    const val = this.getAttribute('preload') as HTMLMediaElement['preload'];
    if (val === '') return 'auto';
    if (['none', 'metadata', 'auto'].includes(val)) return val;
    return super.preload;
  }

  set preload(val) {
    // don't cause an infinite loop
    // check the attribute because an empty string maps to the `auto` prop
    if (val == this.getAttribute('preload')) return;

    if (['', 'none', 'metadata', 'auto'].includes(val)) {
      this.setAttribute('preload', val);
    } else {
      this.removeAttribute('preload');
    }
  }

  get debug() {
    return this.getAttribute(Attributes.DEBUG) != null;
  }

  set debug(val) {
    // dont' cause an infinite loop
    if (val === this.debug) return;

    if (val) {
      this.setAttribute(Attributes.DEBUG, '');
    } else {
      this.removeAttribute(Attributes.DEBUG);
    }
  }

  get disableTracking() {
    return this.hasAttribute(Attributes.DISABLE_TRACKING);
  }

  set disableTracking(val) {
    // dont' cause an infinite loop
    if (val === this.disableTracking) return;

    this.toggleAttribute(Attributes.DISABLE_TRACKING, !!val);
  }

  get disableCookies() {
    return this.hasAttribute(Attributes.DISABLE_COOKIES);
  }

  set disableCookies(val) {
    // dont' cause an infinite loop
    if (val === this.disableCookies) return;

    if (val) {
      this.setAttribute(Attributes.DISABLE_COOKIES, '');
    } else {
      this.removeAttribute(Attributes.DISABLE_COOKIES);
    }
  }

  get startTime(): number | undefined {
    const val = this.getAttribute(Attributes.START_TIME);
    if (val == null) return undefined;
    const num = +val;
    return !Number.isNaN(num) ? num : undefined;
  }

  set startTime(val: number | undefined) {
    // dont' cause an infinite loop
    if (val === this.startTime) return;

    if (val == null) {
      this.removeAttribute(Attributes.START_TIME);
    } else {
      this.setAttribute(Attributes.START_TIME, `${val}`);
    }
  }

  get playbackId(): string | undefined {
    return this.getAttribute(Attributes.PLAYBACK_ID) ?? undefined;
  }

  set playbackId(val: string | undefined) {
    // dont' cause an infinite loop
    if (val === this.playbackId) return;

    if (val) {
      this.setAttribute(Attributes.PLAYBACK_ID, val);
    } else {
      this.removeAttribute(Attributes.PLAYBACK_ID);
    }
  }

  get programStartTime() {
    const val = this.getAttribute(Attributes.PROGRAM_START_TIME);
    if (val == null) return undefined;
    const num = +val;
    return !Number.isNaN(num) ? num : undefined;
  }

  set programStartTime(val: number | undefined) {
    if (val == undefined) {
      this.removeAttribute(Attributes.PROGRAM_START_TIME);
    } else {
      this.setAttribute(Attributes.PROGRAM_START_TIME, `${val}`);
    }
  }

  get programEndTime() {
    const val = this.getAttribute(Attributes.PROGRAM_END_TIME);
    if (val == null) return undefined;
    const num = +val;
    return !Number.isNaN(num) ? num : undefined;
  }

  set programEndTime(val: number | undefined) {
    if (val == undefined) {
      this.removeAttribute(Attributes.PROGRAM_END_TIME);
    } else {
      this.setAttribute(Attributes.PROGRAM_END_TIME, `${val}`);
    }
  }

  get ended() {
    // This ensures that edge case media that doesn't properly end will
    // still announce itself as "ended".
    return getEnded(this.nativeEl, this._hls);
  }

  get envKey(): string | undefined {
    return this.getAttribute(Attributes.ENV_KEY) ?? undefined;
  }

  set envKey(val: string | undefined) {
    // dont' cause an infinite loop
    if (val === this.envKey) return;

    if (val) {
      this.setAttribute(Attributes.ENV_KEY, val);
    } else {
      this.removeAttribute(Attributes.ENV_KEY);
    }
  }

  get beaconCollectionDomain(): string | undefined {
    return this.getAttribute(Attributes.BEACON_COLLECTION_DOMAIN) ?? undefined;
  }

  set beaconCollectionDomain(val: string | undefined) {
    // dont' cause an infinite loop
    if (val === this.beaconCollectionDomain) return;

    if (val) {
      this.setAttribute(Attributes.BEACON_COLLECTION_DOMAIN, val);
    } else {
      this.removeAttribute(Attributes.BEACON_COLLECTION_DOMAIN);
    }
  }

  get streamType(): ValueOf<StreamTypes> | undefined {
    // getAttribute doesn't know that this attribute is well defined. Should explore extending for MuxVideo (CJP)
    return (this.getAttribute(Attributes.STREAM_TYPE) as ValueOf<StreamTypes>) ?? undefined;
  }

  set streamType(val: ValueOf<StreamTypes> | undefined) {
    // dont' cause an infinite loop
    if (val === this.streamType) return;

    if (val) {
      this.setAttribute(Attributes.STREAM_TYPE, val);
    } else {
      this.removeAttribute(Attributes.STREAM_TYPE);
    }
  }

  getStartDate() {
    return getStartDate(this.nativeEl, this._hls);
  }

  get currentPdt() {
    return getCurrentPdt(this.nativeEl, this._hls);
  }

  get preferPlayback(): ValueOf<PlaybackTypes> | undefined {
    const val = this.getAttribute(Attributes.PREFER_PLAYBACK);
    if (val === PlaybackTypes.MSE || val === PlaybackTypes.NATIVE) return val;
    return undefined;
  }

  set preferPlayback(val: ValueOf<PlaybackTypes> | undefined) {
    if (val === this.preferPlayback) return;

    if (val === PlaybackTypes.MSE || val === PlaybackTypes.NATIVE) {
      this.setAttribute(Attributes.PREFER_PLAYBACK, val);
    } else {
      this.removeAttribute(Attributes.PREFER_PLAYBACK);
    }
  }

  get metadata() {
    const inferredMetadataAttrs: { [key: string]: string } = this.getAttributeNames()
      .filter((attrName) => {
        return attrName.startsWith('metadata-') && !([Attributes.METADATA_URL] as string[]).includes(attrName);
      })
      .reduce(
        (currAttrs, attrName) => {
          const value = this.getAttribute(attrName);
          if (value != null) {
            currAttrs[attrName.replace(/^metadata-/, '').replace(/-/g, '_') as string] = value;
          }
          return currAttrs;
        },
        {} as { [key: string]: string }
      );

    return {
      ...inferredMetadataAttrs,
      ...this.#metadata,
    };
  }

  set metadata(val: Readonly<Metadata> | undefined) {
    this.#metadata = val ?? {};
    if (!!this.mux) {
      /** @TODO Link to docs for a more detailed discussion (CJP) */
      console.info(
        'Some metadata values may not be overridable at this time. Make sure you set all metadata to override before setting the src.'
      );
      this.mux.emit('hb', this.#metadata);
    }
  }

  get _hlsConfig() {
    return this.#_hlsConfig;
  }

  set _hlsConfig(val: Readonly<Partial<HlsConfig>> | undefined) {
    this.#_hlsConfig = val;
  }

  async #requestLoad() {
    if (this.#loadRequested) return;
    await (this.#loadRequested = Promise.resolve());
    this.#loadRequested = null;
    this.load();
  }

  load() {
    this.#core = initialize(this as Partial<MuxMediaProps>, this.nativeEl, this.#core);
  }

  unload() {
    teardown(this.nativeEl, this.#core);
    this.#core = undefined;
  }

  attributeChangedCallback(attrName: string, oldValue: string | null, newValue: string | null) {
    // Only forward the attributes to the native media element that are not handled.
    const isNativeAttr = CustomAudioElement.observedAttributes.includes(attrName);
    if (isNativeAttr && !['src', 'autoplay', 'preload'].includes(attrName)) {
      super.attributeChangedCallback(attrName, oldValue, newValue);
    }

    switch (attrName) {
      case 'src': {
        const hadSrc = !!oldValue;
        const hasSrc = !!newValue;
        if (!hadSrc && hasSrc) {
          this.#requestLoad();
        } else if (hadSrc && !hasSrc) {
          this.unload();
          /** @TODO Test this thoroughly (async?) and confirm unload() necessary (CJP) */
        } else if (hadSrc && hasSrc) {
          this.unload();
          this.#requestLoad();
        }
        break;
      }
      case 'autoplay':
        if (newValue === oldValue) {
          break;
        }
        /** In case newValue is an empty string or null, use this.autoplay which translates to booleans (WL) */
        this.#core?.setAutoplay(this.autoplay);
        break;
      case 'preload':
        if (newValue === oldValue) {
          break;
        }
        this.#core?.setPreload(newValue as HTMLMediaElement['preload']);
        break;
      case Attributes.PLAYBACK_ID:
        this.src = toMuxVideoURL(this) as string;
        break;
      case Attributes.DEBUG: {
        const debug = this.debug;
        if (!!this.mux) {
          /** @TODO Link to docs for a more detailed discussion (CJP) */
          console.info(
            'Cannot toggle debug mode of mux data after initialization. Make sure you set all metadata to override before setting the src.'
          );
        }
        if (!!this._hls) {
          this._hls.config.debug = debug;
        }
        break;
      }
      case Attributes.METADATA_URL:
        if (newValue) {
          fetch(newValue)
            .then((resp) => resp.json())
            .then((json) => (this.metadata = json))
            .catch(() => console.error(`Unable to load or parse metadata JSON from metadata-url ${newValue}!`));
        }
        break;
      default:
        break;
    }
  }

  connectedCallback(): void {
    super.connectedCallback?.();
    if (this.nativeEl && this.src && !this.#core) {
      this.#requestLoad();
    }
  }

  disconnectedCallback() {
    this.unload();
  }
}

type MuxAudioElementType = typeof MuxAudioElement;
declare global {
  var MuxAudioElement: MuxAudioElementType; // eslint-disable-line
}

if (!globalThis.customElements.get('mux-audio')) {
  globalThis.customElements.define('mux-audio', MuxAudioElement);
  /** @TODO consider externalizing this (breaks standard modularity) */
  globalThis.MuxAudioElement = MuxAudioElement;
}

export { PlaybackEngine, PlaybackEngine as Hls, ExtensionMimeTypeMap as MimeTypes, MediaError, AudioEvents };

export default MuxAudioElement;
