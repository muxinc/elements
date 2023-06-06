import { globalThis, document } from './polyfills';
import {
  initialize,
  teardown,
  generatePlayerInitTime,
  MuxMediaProps,
  StreamTypes,
  PlaybackTypes,
  toMuxVideoURL,
  Metadata,
  MediaError,
  getError,
  CmcdTypes,
  CmcdTypeValues,
  addCuePoints,
  getCuePoints,
  getActiveCuePoint,
  getStartDate,
  getCurrentPdt,
  getStreamType,
  getTargetLiveWindow,
  getLiveEdgeStart,
  getSeekable,
  getEnded,
  getPlayPromise,
} from '@mux/playback-core';
import type { PlaybackCore, PlaybackEngine, Autoplay, ExtensionMimeTypeMap, ValueOf } from '@mux/playback-core';
import { getPlayerVersion } from './env';
// this must be imported after playback-core for the polyfill to be included
import 'castable-video';
import { CustomMediaMixin, Events as VideoEvents } from 'custom-media-element';

// Must mutate so the added events are available in custom-media-element.
VideoEvents.push('castchange', 'entercast', 'leavecast');

const CustomVideoElement = CustomMediaMixin(globalThis.HTMLElement, {
  tag: 'video',
  is: 'castable-video',
});

/** @TODO make the relationship between name+value smarter and more deriveable (CJP) */
type AttributeNames = {
  BEACON_COLLECTION_DOMAIN: 'beacon-collection-domain';
  CUSTOM_DOMAIN: 'custom-domain';
  DEBUG: 'debug';
  DISABLE_COOKIES: 'disable-cookies';
  ENV_KEY: 'env-key';
  MAX_RESOLUTION: 'max-resolution';
  METADATA_URL: 'metadata-url';
  PLAYBACK_ID: 'playback-id';
  PLAYER_SOFTWARE_NAME: 'player-software-name';
  PLAYER_SOFTWARE_VERSION: 'player-software-version';
  PREFER_CMCD: 'prefer-cmcd';
  PREFER_PLAYBACK: 'prefer-playback';
  START_TIME: 'start-time';
  STREAM_TYPE: 'stream-type';
  TARGET_LIVE_WINDOW: 'target-live-window';
  LIVE_EDGE_OFFSET: 'live-edge-offset';
  TYPE: 'type';
};

export const Attributes: AttributeNames = {
  BEACON_COLLECTION_DOMAIN: 'beacon-collection-domain',
  CUSTOM_DOMAIN: 'custom-domain',
  DEBUG: 'debug',
  DISABLE_COOKIES: 'disable-cookies',
  ENV_KEY: 'env-key',
  MAX_RESOLUTION: 'max-resolution',
  METADATA_URL: 'metadata-url',
  PLAYBACK_ID: 'playback-id',
  PLAYER_SOFTWARE_NAME: 'player-software-name',
  PLAYER_SOFTWARE_VERSION: 'player-software-version',
  PREFER_CMCD: 'prefer-cmcd',
  PREFER_PLAYBACK: 'prefer-playback',
  START_TIME: 'start-time',
  STREAM_TYPE: 'stream-type',
  TARGET_LIVE_WINDOW: 'target-live-window',
  LIVE_EDGE_OFFSET: 'live-edge-offset',
  TYPE: 'type',
};

const AttributeNameValues = Object.values(Attributes);

const playerSoftwareVersion = getPlayerVersion();
const playerSoftwareName = 'mux-video';

class MuxVideoElement extends CustomVideoElement implements Partial<MuxMediaProps> {
  static get observedAttributes() {
    return [...AttributeNameValues, ...(CustomVideoElement.observedAttributes ?? [])];
  }

  #core?: PlaybackCore;
  #loadRequested?: Promise<void> | null;
  #playerInitTime: number;
  #metadata: Readonly<Metadata> = {};
  #playerSoftwareVersion?: string;
  #playerSoftwareName?: string;
  #errorTranslator?: (errorEvent: any) => any;

  constructor() {
    super();
    this.#playerInitTime = generatePlayerInitTime();
  }

  get preferCmcd() {
    return (this.getAttribute(Attributes.PREFER_CMCD) as ValueOf<CmcdTypes>) ?? undefined;
  }

  set preferCmcd(value: ValueOf<CmcdTypes> | undefined) {
    if (value === this.preferCmcd) return;
    if (!value) {
      this.removeAttribute(Attributes.PREFER_CMCD);
    } else if (CmcdTypeValues.includes(value)) {
      this.setAttribute(Attributes.PREFER_CMCD, value);
    } else {
      console.warn(`Invalid value for preferCmcd. Must be one of ${CmcdTypeValues.join()}`);
    }
  }

  get playerInitTime() {
    return this.#playerInitTime;
  }

  get playerSoftwareName() {
    return this.#playerSoftwareName ?? playerSoftwareName;
  }

  set playerSoftwareName(value: string | undefined) {
    this.#playerSoftwareName = value;
  }

  get playerSoftwareVersion() {
    return this.#playerSoftwareVersion ?? playerSoftwareVersion;
  }

  set playerSoftwareVersion(value: string | undefined) {
    this.#playerSoftwareVersion = value;
  }

  // Keeping this named "_hls" since it's exposed for unadvertised "advanced usage" via getter that assumes specifically hls.js (CJP)
  get _hls(): PlaybackEngine | undefined {
    return this.#core?.engine;
  }

  get mux(): Readonly<HTMLVideoElement['mux']> | undefined {
    return this.nativeEl.mux;
  }

  get error() {
    return getError(this.nativeEl) ?? null;
  }

  get errorTranslator(): ((errorEvent: any) => any) | undefined {
    return this.#errorTranslator;
  }

  set errorTranslator(value: ((errorEvent: any) => any) | undefined) {
    this.#errorTranslator = value;
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

  get type(): ValueOf<ExtensionMimeTypeMap> | undefined {
    return (this.getAttribute(Attributes.TYPE) as ValueOf<ExtensionMimeTypeMap>) ?? undefined;
  }

  set type(val: ValueOf<ExtensionMimeTypeMap> | undefined) {
    // dont' cause an infinite loop
    if (val === this.type) return;

    if (val) {
      this.setAttribute(Attributes.TYPE, val);
    } else {
      this.removeAttribute(Attributes.TYPE);
    }
  }

  /** @ts-ignore */
  get autoplay(): Autoplay {
    const attr = this.getAttribute('autoplay');

    if (attr === null) {
      return false;
    } else if (attr === '') {
      return true;
    } else {
      return attr as Autoplay;
    }
  }

  /** @ts-ignore */
  set autoplay(val: Autoplay) {
    const currentVal = this.autoplay;
    if (val === currentVal) {
      return;
    }

    if (val) {
      this.setAttribute('autoplay', typeof val === 'string' ? val : '');
    } else {
      this.removeAttribute('autoplay');
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

  get debug(): boolean {
    return this.getAttribute(Attributes.DEBUG) != null;
  }

  set debug(val: boolean) {
    // dont' cause an infinite loop
    if (val === this.debug) return;

    if (val) {
      this.setAttribute(Attributes.DEBUG, '');
    } else {
      this.removeAttribute(Attributes.DEBUG);
    }
  }

  get disableCookies(): boolean {
    return this.hasAttribute(Attributes.DISABLE_COOKIES);
  }

  set disableCookies(val: boolean) {
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

  get maxResolution() {
    return this.getAttribute(Attributes.MAX_RESOLUTION) ?? undefined;
  }

  set maxResolution(val: string | undefined) {
    if (val === this.maxResolution) return;

    if (val) {
      this.setAttribute(Attributes.MAX_RESOLUTION, val);
    } else {
      this.removeAttribute(Attributes.MAX_RESOLUTION);
    }
  }

  get customDomain() {
    return this.getAttribute(Attributes.CUSTOM_DOMAIN) ?? undefined;
  }

  set customDomain(val: string | undefined) {
    // dont' cause an infinite loop
    if (val === this.customDomain) return;

    if (val) {
      this.setAttribute(Attributes.CUSTOM_DOMAIN, val);
    } else {
      this.removeAttribute(Attributes.CUSTOM_DOMAIN);
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
    // don't cause an infinite loop
    if (val === this.beaconCollectionDomain) return;

    if (val) {
      this.setAttribute(Attributes.BEACON_COLLECTION_DOMAIN, val);
    } else {
      this.removeAttribute(Attributes.BEACON_COLLECTION_DOMAIN);
    }
  }

  get streamType(): ValueOf<StreamTypes> | undefined {
    // Allow overriding inferred `streamType`
    return (this.getAttribute(Attributes.STREAM_TYPE) as ValueOf<StreamTypes>) ?? getStreamType(this.nativeEl);
  }

  set streamType(val: ValueOf<StreamTypes> | undefined) {
    // don't cause an infinite loop and avoid change event dispatching
    if (val === this.streamType) return;

    if (val) {
      this.setAttribute(Attributes.STREAM_TYPE, val);
    } else {
      this.removeAttribute(Attributes.STREAM_TYPE);
    }
  }

  get targetLiveWindow() {
    // Allow overriding inferred `targetLiveWindow`
    if (this.hasAttribute(Attributes.TARGET_LIVE_WINDOW)) {
      return +(this.getAttribute(Attributes.TARGET_LIVE_WINDOW) as string) as number;
    }
    return getTargetLiveWindow(this.nativeEl);
  }

  set targetLiveWindow(val: number | undefined) {
    // don't cause an infinite loop and avoid change event dispatching
    if (val == this.targetLiveWindow) return;

    if (val == null) {
      this.removeAttribute(Attributes.TARGET_LIVE_WINDOW);
    } else {
      this.setAttribute(Attributes.TARGET_LIVE_WINDOW, `${+val}`);
    }
  }

  get liveEdgeStart() {
    if (this.hasAttribute(Attributes.LIVE_EDGE_OFFSET)) {
      const { liveEdgeOffset } = this;
      const seekableEnd = this.nativeEl.seekable.end(0) ?? 0;
      const seekableStart = this.nativeEl.seekable.start(0) ?? 0;
      return Math.max(seekableStart, seekableEnd - (liveEdgeOffset as number));
    }
    return getLiveEdgeStart(this.nativeEl);
  }

  get liveEdgeOffset() {
    if (!this.hasAttribute(Attributes.LIVE_EDGE_OFFSET)) return undefined;
    return +(this.getAttribute(Attributes.LIVE_EDGE_OFFSET) as string) as number;
  }

  set liveEdgeOffset(val: number | undefined) {
    // don't cause an infinite loop and avoid change event dispatching
    if (val == this.targetLiveWindow) return;

    if (val == null) {
      this.removeAttribute(Attributes.LIVE_EDGE_OFFSET);
    } else {
      this.setAttribute(Attributes.LIVE_EDGE_OFFSET, `${+val}`);
    }
  }

  get seekable() {
    return getSeekable(this.nativeEl);
  }

  async addCuePoints<T = any>(cuePoints: { time: number; value: T }[]) {
    return addCuePoints(this.nativeEl, cuePoints);
  }

  get activeCuePoint() {
    return getActiveCuePoint(this.nativeEl);
  }

  get cuePoints() {
    return getCuePoints(this.nativeEl);
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
      .reduce((currAttrs, attrName) => {
        const value = this.getAttribute(attrName);
        if (value != null) {
          currAttrs[attrName.replace(/^metadata-/, '').replace(/-/g, '_') as string] = value;
        }
        return currAttrs;
      }, {} as { [key: string]: string });

    return {
      ...inferredMetadataAttrs,
      ...this.#metadata,
    };
  }

  set metadata(val: Readonly<Metadata> | undefined) {
    this.#metadata = val ?? {};
    if (!!this.mux) {
      this.mux.emit('hb', this.#metadata);
    }
  }

  async #requestLoad() {
    if (this.#loadRequested) return;
    await (this.#loadRequested = Promise.resolve());
    this.#loadRequested = null;
    this.load();
  }

  play() {
    // This accounts for "replay" behavior for edge case media that doesn't properly enter
    // the "ended" state. See also: get ended(), above.
    return getPlayPromise(this.nativeEl, this._hls);
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
    const isNativeAttr = CustomVideoElement.observedAttributes.includes(attrName);
    if (isNativeAttr && !['src', 'autoplay', 'preload'].includes(attrName)) {
      super.attributeChangedCallback(attrName, oldValue, newValue);
    }

    switch (attrName) {
      case Attributes.PLAYER_SOFTWARE_NAME:
        this.playerSoftwareName = newValue ?? undefined;
        break;
      case Attributes.PLAYER_SOFTWARE_VERSION:
        this.playerSoftwareVersion = newValue ?? undefined;
        break;
      case 'src': {
        const hadSrc = !!oldValue;
        const hasSrc = !!newValue;
        if (!hadSrc && hasSrc) {
          this.#requestLoad();
        } else if (hadSrc && !hasSrc) {
          this.unload();
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
        this.src = toMuxVideoURL(newValue ?? undefined, {
          maxResolution: this.maxResolution,
          domain: this.customDomain,
        }) as string;
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
      case Attributes.STREAM_TYPE:
        // If the newValue is unset
        if (newValue == null || newValue !== oldValue) {
          this.dispatchEvent(new CustomEvent('streamtypechange', { composed: true, bubbles: true }));
        }
        break;
      case Attributes.TARGET_LIVE_WINDOW:
        if (newValue == null || newValue !== oldValue) {
          this.dispatchEvent(
            new CustomEvent('targetlivewindowchange', { composed: true, bubbles: true, detail: this.targetLiveWindow })
          );
        }
        break;
      default:
        break;
    }
  }

  disconnectedCallback() {
    this.unload();
  }
}

type MuxVideoElementType = typeof MuxVideoElement;
declare global {
  var MuxVideoElement: MuxVideoElementType; // eslint-disable-line
}

if (!globalThis.customElements.get('mux-video')) {
  globalThis.customElements.define('mux-video', MuxVideoElement);
  globalThis.MuxVideoElement = MuxVideoElement;
}

export { PlaybackEngine, PlaybackEngine as Hls, ExtensionMimeTypeMap as MimeTypes, MediaError, VideoEvents };

export default MuxVideoElement;
