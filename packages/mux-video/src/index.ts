import CustomVideoElement from './CustomVideoElement';

import {
  initialize,
  MuxMediaProps,
  StreamTypes,
  ValueOf,
  ExtensionMimeTypeMap,
  toMuxVideoURL,
  teardown,
  Metadata,
  PlaybackEngine,
  mux,
} from '@mux-elements/playback-core';
import { getPlayerVersion } from './env';

/** @TODO make the relationship between name+value smarter and more deriveable (CJP) */
type AttributeNames = {
  ENV_KEY: 'env-key';
  DEBUG: 'debug';
  METADATA_URL: 'metadata-url';
  METADATA_VIDEO_ID: 'metadata-video-id';
  METADATA_VIDEO_TITLE: 'metadata-video-title';
  METADATA_VIEWER_USER_ID: 'metadata-viewer-user-id';
  BEACON_DOMAIN: 'beacon-domain';
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
  METADATA_VIDEO_ID: 'metadata-video-id',
  METADATA_VIDEO_TITLE: 'metadata-video-title',
  METADATA_VIEWER_USER_ID: 'metadata-viewer-user-id',
  BEACON_DOMAIN: 'beacon-domain',
  TYPE: 'type',
  STREAM_TYPE: 'stream-type',
  START_TIME: 'start-time',
};

const AttributeNameValues = Object.values(Attributes);

const playerSoftwareVersion = getPlayerVersion();
const playerSoftwareName = 'mux-video';

class MuxVideoElement
  extends CustomVideoElement<HTMLVideoElement>
  implements Partial<MuxMediaProps>
{
  static get observedAttributes() {
    return [
      ...AttributeNameValues,
      ...(CustomVideoElement.observedAttributes ?? []),
    ];
  }

  // Keeping this named "__hls" since it's exposed for unadvertised "advanced usage" via getter that assumes specifically hls.js (CJP)
  protected __hls?: PlaybackEngine;
  protected __muxPlayerInitTime: number;
  protected __metadata: Readonly<Metadata> = {};

  constructor() {
    super();
    this.__muxPlayerInitTime = Date.now();
  }

  get playerSoftwareName() {
    return playerSoftwareName;
  }

  get playerSoftwareVersion() {
    return playerSoftwareVersion;
  }

  get hls() {
    return this.__hls;
  }

  get mux(): Readonly<typeof mux> | undefined {
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

  get beaconDomain(): string | undefined {
    return this.getAttribute(Attributes.BEACON_DOMAIN) ?? undefined;
  }

  set beaconDomain(val: string | undefined) {
    // dont' cause an infinite loop
    if (val === this.beaconDomain) return;

    if (val) {
      this.setAttribute(Attributes.BEACON_DOMAIN, val);
    } else {
      this.removeAttribute(Attributes.BEACON_DOMAIN);
    }
  }

  get streamType(): ValueOf<StreamTypes> | undefined {
    // getAttribute doesn't know that this attribute is well defined. Should explore extending for MuxVideo (CJP)
    return (
      (this.getAttribute(Attributes.STREAM_TYPE) as ValueOf<StreamTypes>) ??
      undefined
    );
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
  get preferMSE(): boolean {
    return this.getAttribute(Attributes.PREFER_MSE) != null;
  }

  set preferMSE(val: boolean) {
    if (val) {
      this.setAttribute(Attributes.PREFER_MSE, '');
    } else {
      this.removeAttribute(Attributes.PREFER_MSE);
    }
  }

  get metadata() {
    return this.__metadata;
  }

  set metadata(val: Readonly<Metadata> | undefined) {
    this.__metadata = val ?? {};
    if (!!this.mux) {
      this.mux.emit('hb', this.__metadata);
    }
  }

  load() {
    const nextHlsInstance = initialize(
      this as Partial<MuxMediaProps>,
      this.nativeEl,
      this.__hls
    );
    this.__hls = nextHlsInstance;
  }

  unload() {
    teardown(this.nativeEl, this.__hls);
    this.__hls = undefined;
  }

  // NOTE: This was carried over from hls-video-element. Is it needed for an edge case?
  // play() {
  //   if (this.readyState === 0 && this.networkState < 2) {
  //     this.load();
  //     this.hls.on(Hls.Events.MANIFEST_PARSED,function() {
  //     video.play();
  //
  //     return this.nativeEl.play();
  //   }
  // }

  attributeChangedCallback(
    attrName: string,
    oldValue: string | null,
    newValue: string | null
  ) {
    switch (attrName) {
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
      case Attributes.PLAYBACK_ID:
        /** @TODO Improv+Discuss - how should playback-id update wrt src attr changes (and vice versa) (CJP) */
        this.src = toMuxVideoURL(newValue ?? undefined) as string;
        break;
      case Attributes.DEBUG:
        const debug = this.debug;
        if (!!this.mux) {
          /** @TODO Link to docs for a more detailed discussion (CJP) */
          console.info(
            'Cannot toggle debug mode of mux data after initialization. Make sure you set all metadata to override before setting the src.'
          );
        }
        if (!!this.hls) {
          this.hls.config.debug = debug;
        }
        break;
      case Attributes.METADATA_URL:
        if (newValue) {
          fetch(newValue)
            .then((resp) => resp.json())
            .then((json) => (this.metadata = json))
            .catch((_err) =>
              console.error(
                `Unable to load or parse metadata JSON from metadata-url ${newValue}!`
              )
            );
        }
        break;
      default:
        break;
    }

    super.attributeChangedCallback(attrName, oldValue, newValue);
  }

  disconnectedCallback() {
    this.unload();
  }

  /** @TODO Followup - investigate why this is necessary (attributeChanged not invoked on initial load when setting playback-id) (CJP) */
  connectedCallback() {
    // Only auto-load if we have a src
    if (this.src) {
      this.load();
    }

    // NOTE: This was carried over from hls-video-element. Is it needed for an edge case?
    // Not preloading might require faking the play() promise
    // so that you can call play(), call load() within that
    // But wait until MANIFEST_PARSED to actually call play()
    // on the nativeEl.
    // if (this.preload === 'auto') {
    //   this.load();
    // }
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

export {
  PlaybackEngine,
  PlaybackEngine as Hls,
  ExtensionMimeTypeMap as MimeTypes,
};

export default MuxVideoElement;
