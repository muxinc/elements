import { globalThis } from 'shared-polyfills';
import {
  initialize,
  setupAutoplay,
  generatePlayerInitTime,
  MuxMediaProps,
  StreamTypes,
  ValueOf,
  toMuxVideoURL,
  teardown,
  Metadata,
  mux,
  MediaError,
  getError,
} from '@mux/playback-core';
import type { PlaybackEngine, Autoplay, UpdateAutoplay, ExtensionMimeTypeMap } from '@mux/playback-core';
import { getPlayerVersion } from './env';
// this must be imported after playback-core for the polyfill to be included
import CustomVideoElement, { VideoEvents } from './CustomVideoElement';

/** @TODO make the relationship between name+value smarter and more deriveable (CJP) */
type AttributeNames = {
  ENV_KEY: 'env-key';
  DEBUG: 'debug';
  METADATA_URL: 'metadata-url';
  PLAYER_SOFTWARE_VERSION: 'player-software-version';
  PLAYER_SOFTWARE_NAME: 'player-software-name';
  METADATA_VIDEO_ID: 'metadata-video-id';
  METADATA_VIDEO_TITLE: 'metadata-video-title';
  METADATA_VIEWER_USER_ID: 'metadata-viewer-user-id';
  BEACON_COLLECTION_DOMAIN: 'beacon-collection-domain';
  CUSTOM_DOMAIN: 'custom-domain';
  PLAYBACK_ID: 'playback-id';
  PREFER_MSE: 'prefer-mse';
  TYPE: 'type';
  STREAM_TYPE: 'stream-type';
  START_TIME: 'start-time';
};

const Attributes: AttributeNames = {
  ENV_KEY: 'env-key',
  DEBUG: 'debug',
  PLAYBACK_ID: 'playback-id',
  METADATA_URL: 'metadata-url',
  PREFER_MSE: 'prefer-mse',
  PLAYER_SOFTWARE_VERSION: 'player-software-version',
  PLAYER_SOFTWARE_NAME: 'player-software-name',
  METADATA_VIDEO_ID: 'metadata-video-id',
  METADATA_VIDEO_TITLE: 'metadata-video-title',
  METADATA_VIEWER_USER_ID: 'metadata-viewer-user-id',
  BEACON_COLLECTION_DOMAIN: 'beacon-collection-domain',
  CUSTOM_DOMAIN: 'custom-domain',
  TYPE: 'type',
  STREAM_TYPE: 'stream-type',
  START_TIME: 'start-time',
};

const AttributeNameValues = Object.values(Attributes);

const playerSoftwareVersion = getPlayerVersion();
const playerSoftwareName = 'mux-video';

class MuxVideoElement extends CustomVideoElement<HTMLVideoElement> implements Partial<MuxMediaProps> {
  static get observedAttributes() {
    return [...AttributeNameValues, ...(CustomVideoElement.observedAttributes ?? [])];
  }

  // Keeping this named "__hls" since it's exposed for unadvertised "advanced usage" via getter that assumes specifically hls.js (CJP)
  protected __hls?: PlaybackEngine;
  protected __playerInitTime: number;
  protected __metadata: Readonly<Metadata> = {};
  protected __playerSoftwareVersion?: string;
  protected __playerSoftwareName?: string;
  protected __updateAutoplay?: UpdateAutoplay;
  protected __errorTranslator?: Function;

  constructor() {
    super();
    this.__playerInitTime = generatePlayerInitTime();
  }

  get playerInitTime() {
    return this.__playerInitTime;
  }

  get playerSoftwareName() {
    return this.__playerSoftwareName ?? playerSoftwareName;
  }

  set playerSoftwareName(value: string | undefined) {
    this.__playerSoftwareName = value;
  }

  get playerSoftwareVersion() {
    return this.__playerSoftwareVersion ?? playerSoftwareVersion;
  }

  set playerSoftwareVersion(value: string | undefined) {
    this.__playerSoftwareVersion = value;
  }

  /**
   * @deprecated please use ._hls instead
   */
  get hls(): PlaybackEngine | undefined {
    console.warn('<mux-video>.hls is deprecated, please use ._hls instead');
    return this._hls;
  }

  get _hls(): PlaybackEngine | undefined {
    return this.__hls;
  }

  get mux(): Readonly<HTMLVideoElement['mux']> | undefined {
    return this.nativeEl.mux;
  }

  // @ts-ignore
  get error(): MediaError | null {
    return getError(this.nativeEl) ?? null;
  }

  get errorTranslator() {
    return this.__errorTranslator;
  }

  set errorTranslator(value: Function | undefined) {
    this.__errorTranslator = value;
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

  /** @TODO write a generic module for well defined primitive types -> attribute getter/setters/removers (CJP) */
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

  /** @TODO Followup: naming convention: all lower (common per HTMLElement props) vs. camel (common per JS convention) (CJP) */
  get preferMse(): boolean {
    return this.getAttribute(Attributes.PREFER_MSE) != null;
  }

  set preferMse(val: boolean) {
    if (val) {
      this.setAttribute(Attributes.PREFER_MSE, '');
    } else {
      this.removeAttribute(Attributes.PREFER_MSE);
    }
  }

  get metadata() {
    const video_id = this.getAttribute(Attributes.METADATA_VIDEO_ID);
    const video_title = this.getAttribute(Attributes.METADATA_VIDEO_TITLE);
    const viewer_user_id = this.getAttribute(Attributes.METADATA_VIEWER_USER_ID);
    return {
      ...this.__metadata,
      ...(video_id != null ? { video_id } : {}),
      ...(video_title != null ? { video_title } : {}),
      ...(viewer_user_id != null ? { viewer_user_id } : {}),
    };
  }

  set metadata(val: Readonly<Metadata> | undefined) {
    this.__metadata = val ?? {};
    if (!!this.mux) {
      this.mux.emit('hb', this.__metadata);
    }
  }

  load() {
    const nextHlsInstance = initialize(this as Partial<MuxMediaProps>, this.nativeEl, this.__hls);
    this.__hls = nextHlsInstance;
    const updateAutoplay = setupAutoplay(this.nativeEl, this.autoplay, nextHlsInstance);
    this.__updateAutoplay = updateAutoplay;
  }

  unload() {
    teardown(this.nativeEl, this.__hls);
    this.__hls = undefined;
    this.__updateAutoplay = undefined;
  }

  // NOTE: This was carried over from hls-video-element. Is it needed for an edge case?
  // play() {
  //   if (this.readyState === 0 && this.networkState < 2) {
  //     this.load();
  //     this._hls.on(Hls.Events.MANIFEST_PARSED,function() {
  //     video.play();
  //
  //     return this.nativeEl.play();
  //   }
  // }

  attributeChangedCallback(attrName: string, oldValue: string | null, newValue: string | null) {
    super.attributeChangedCallback(attrName, oldValue, newValue);

    switch (attrName) {
      case Attributes.PLAYER_SOFTWARE_NAME:
        this.playerSoftwareName = newValue ?? undefined;
        break;
      case Attributes.PLAYER_SOFTWARE_VERSION:
        this.playerSoftwareVersion = newValue ?? undefined;
        break;
      case 'src':
        const hadSrc = !!oldValue;
        const hasSrc = !!newValue;
        if (!hadSrc && hasSrc) {
          this.load();
        } else if (hadSrc && !hasSrc) {
          this.unload();
          /** @TODO Test this thoroughly (async?) and confirm unload() necessary (CJP) */
        } else if (hadSrc && hasSrc) {
          this.unload();
          this.load();
        }
        break;
      case 'autoplay':
        if (newValue === oldValue) {
          break;
        }
        /** In case newValue is an empty string or null, use this.autoplay which translates to booleans (WL) */
        this.__updateAutoplay?.(this.autoplay);
        break;
      case Attributes.PLAYBACK_ID:
        /** @TODO Improv+Discuss - how should playback-id update wrt src attr changes (and vice versa) (CJP) */
        this.src = toMuxVideoURL(newValue ?? undefined, { domain: this.customDomain }) as string;
        break;
      case Attributes.DEBUG:
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
      case Attributes.METADATA_URL:
        if (newValue) {
          fetch(newValue)
            .then((resp) => resp.json())
            .then((json) => (this.metadata = json))
            .catch((_err) => console.error(`Unable to load or parse metadata JSON from metadata-url ${newValue}!`));
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
  var MuxVideoElement: MuxVideoElementType;
}

/** @TODO Refactor once using `globalThis` polyfills */
if (!globalThis.customElements.get('mux-video')) {
  globalThis.customElements.define('mux-video', MuxVideoElement);
  /** @TODO consider externalizing this (breaks standard modularity) */
  globalThis.MuxVideoElement = MuxVideoElement;
}

export { PlaybackEngine, PlaybackEngine as Hls, ExtensionMimeTypeMap as MimeTypes, MediaError, VideoEvents };

export default MuxVideoElement;
