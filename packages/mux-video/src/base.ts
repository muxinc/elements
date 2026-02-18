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
  addChapters,
  getActiveChapter,
  getMetadata,
  getStartDate,
  getCurrentPdt,
  getStreamType,
  getTargetLiveWindow,
  getLiveEdgeStart,
  getSeekable,
  getEnded,
  getChapters,
  toPlaybackIdFromSrc,
  toPlaybackIdParts,
  getCoreReference,
  // isMuxVideoSrc,
} from '@mux/playback-core';
import type {
  PlaybackCore,
  PlaybackEngine,
  ExtensionMimeTypeMap,
  ValueOf,
  MaxResolutionValue,
  MinResolutionValue,
  RenditionOrderValue,
  MaxAutoResolutionValue,
  Chapter,
  CuePoint,
  Tokens,
} from '@mux/playback-core';
import { getPlayerVersion } from './env';
// this must be imported after playback-core for the polyfill to be included
import { CustomVideoElement, Events } from 'custom-media-element';
import type { HlsConfig } from 'hls.js';
import { muxLogo } from './assets/mux-logo.js';
import type { IMuxVideoBaseElement } from './types.js';

export * from './types.js';

export const Attributes = {
  BEACON_COLLECTION_DOMAIN: 'beacon-collection-domain',
  CUSTOM_DOMAIN: 'custom-domain',
  DEBUG: 'debug',
  DISABLE_TRACKING: 'disable-tracking',
  DISABLE_COOKIES: 'disable-cookies',
  DISABLE_PSEUDO_ENDED: 'disable-pseudo-ended',
  DRM_TOKEN: 'drm-token',
  PLAYBACK_TOKEN: 'playback-token',
  ENV_KEY: 'env-key',
  MAX_RESOLUTION: 'max-resolution',
  MIN_RESOLUTION: 'min-resolution',
  MAX_AUTO_RESOLUTION: 'max-auto-resolution',
  RENDITION_ORDER: 'rendition-order',
  PROGRAM_START_TIME: 'program-start-time',
  PROGRAM_END_TIME: 'program-end-time',
  ASSET_START_TIME: 'asset-start-time',
  ASSET_END_TIME: 'asset-end-time',
  METADATA_URL: 'metadata-url',
  PLAYBACK_ID: 'playback-id',
  PLAYER_SOFTWARE_NAME: 'player-software-name',
  PLAYER_SOFTWARE_VERSION: 'player-software-version',
  PLAYER_INIT_TIME: 'player-init-time',
  PREFER_CMCD: 'prefer-cmcd',
  PREFER_PLAYBACK: 'prefer-playback',
  START_TIME: 'start-time',
  STREAM_TYPE: 'stream-type',
  TARGET_LIVE_WINDOW: 'target-live-window',
  LIVE_EDGE_OFFSET: 'live-edge-offset',
  TYPE: 'type',
  LOGO: 'logo',
  CAP_RENDITION_TO_PLAYER_SIZE: 'cap-rendition-to-player-size',
} as const;

const AttributeNameValues = Object.values(Attributes);

export const playerSoftwareVersion = getPlayerVersion();
export const playerSoftwareName = 'mux-video';

export class MuxVideoBaseElement extends CustomVideoElement implements IMuxVideoBaseElement {
  static get NAME() {
    return playerSoftwareName;
  }

  static get VERSION() {
    return playerSoftwareVersion;
  }

  static get observedAttributes() {
    return [...AttributeNameValues, ...(CustomVideoElement.observedAttributes ?? [])];
  }

  #loadRequested?: Promise<void> | null;
  #defaultPlayerInitTime: number | undefined;
  #metadata: Metadata = {};
  #tokens: Tokens = {};
  #_hlsConfig?: Partial<HlsConfig>;
  #playerSoftwareVersion?: string;
  #playerSoftwareName?: string;
  #errorTranslator?: (errorEvent: any) => any;
  #logo: string = '';

  static getLogoHTML(logoValue: string | null) {
    if (!logoValue || logoValue === 'false') return '';
    return logoValue === 'default' ? muxLogo : `<img part="logo" src="${logoValue}" />`;
  }

  static getTemplateHTML(attrs: Record<string, string> = {}) {
    return /* html */ `
      ${CustomVideoElement.getTemplateHTML(attrs)}
      <style>
        :host {
          position: relative;
        }
        slot[name="logo"] {
          display: flex;
          justify-content: end;
          position: absolute;
          top: 1rem;
          right: 1rem;
          opacity: 0;
          transition: opacity 0.25s ease-in-out;
          z-index: 1;
        }
        slot[name="logo"]:has([part="logo"]) {
          opacity: 1;
        }
        slot[name="logo"] [part="logo"] {
          width: 5rem;
          pointer-events: none;
          user-select: none;
        }
      </style>
      <slot name="logo">
        ${this.getLogoHTML(attrs[Attributes.LOGO] ?? '')}
      </slot>
    `;
  }

  constructor() {
    super();
    this.#defaultPlayerInitTime = generatePlayerInitTime();

    this.nativeEl.addEventListener('muxmetadata', (_event: Event) => {
      const fetchedMetadata = getMetadata(this.nativeEl);
      const userMetadata = this.metadata ?? {};

      // User metadata takes precedence over fetched metadata...
      this.metadata = {
        ...fetchedMetadata,
        ...userMetadata,
      };

      // ...except for the free plan branding metadata
      if ((fetchedMetadata as any)?.['com.mux.video.branding'] === 'mux-free-plan') {
        this.#logo = 'default';
        this.updateLogo();
      }
    });
  }

  get #core(): PlaybackCore | undefined {
    return getCoreReference(this.nativeEl);
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
    if (!this.hasAttribute(Attributes.PLAYER_INIT_TIME)) return this.#defaultPlayerInitTime;
    return +(this.getAttribute(Attributes.PLAYER_INIT_TIME) as string) as number;
  }

  set playerInitTime(val) {
    // don't cause an infinite loop and avoid change event dispatching
    if (val == this.playerInitTime) return;

    if (val == null) {
      this.removeAttribute(Attributes.PLAYER_INIT_TIME);
    } else {
      this.setAttribute(Attributes.PLAYER_INIT_TIME, `${+val}`);
    }
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
    return this.nativeEl?.mux;
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

  get disablePseudoEnded() {
    return this.hasAttribute(Attributes.DISABLE_PSEUDO_ENDED);
  }

  set disablePseudoEnded(val) {
    // dont' cause an infinite loop
    if (val === this.disablePseudoEnded) return;

    if (val) {
      this.setAttribute(Attributes.DISABLE_PSEUDO_ENDED, '');
    } else {
      this.removeAttribute(Attributes.DISABLE_PSEUDO_ENDED);
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

  // NOTE: playbackId may contain additional query params (e.g. token= for playback token) (CJP)
  get playbackId(): string | undefined {
    if (this.hasAttribute(Attributes.PLAYBACK_ID)) {
      return this.getAttribute(Attributes.PLAYBACK_ID) as string;
    }

    return toPlaybackIdFromSrc(this.src) ?? undefined;
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
    return (this.getAttribute(Attributes.MAX_RESOLUTION) as MaxResolutionValue) ?? undefined;
  }

  set maxResolution(val: MaxResolutionValue | undefined) {
    if (val === this.maxResolution) return;

    if (val) {
      this.setAttribute(Attributes.MAX_RESOLUTION, val);
    } else {
      this.removeAttribute(Attributes.MAX_RESOLUTION);
    }
  }

  get minResolution() {
    return (this.getAttribute(Attributes.MIN_RESOLUTION) as MinResolutionValue) ?? undefined;
  }

  set minResolution(val: MinResolutionValue | undefined) {
    if (val === this.minResolution) return;

    if (val) {
      this.setAttribute(Attributes.MIN_RESOLUTION, val);
    } else {
      this.removeAttribute(Attributes.MIN_RESOLUTION);
    }
  }

  get maxAutoResolution() {
    return (this.getAttribute(Attributes.MAX_AUTO_RESOLUTION) as MaxAutoResolutionValue) ?? undefined;
  }

  set maxAutoResolution(val: MaxAutoResolutionValue | undefined) {
    if (val == undefined) {
      this.removeAttribute(Attributes.MAX_AUTO_RESOLUTION);
    } else {
      this.setAttribute(Attributes.MAX_AUTO_RESOLUTION, val);
    }
  }

  get renditionOrder() {
    return (this.getAttribute(Attributes.RENDITION_ORDER) as RenditionOrderValue) ?? undefined;
  }

  set renditionOrder(val: RenditionOrderValue | undefined) {
    if (val === this.renditionOrder) return;

    if (val) {
      this.setAttribute(Attributes.RENDITION_ORDER, val);
    } else {
      this.removeAttribute(Attributes.RENDITION_ORDER);
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

  get assetStartTime() {
    const val = this.getAttribute(Attributes.ASSET_START_TIME);
    if (val == null) return undefined;
    const num = +val;
    return !Number.isNaN(num) ? num : undefined;
  }

  set assetStartTime(val: number | undefined) {
    if (val == undefined) {
      this.removeAttribute(Attributes.ASSET_START_TIME);
    } else {
      this.setAttribute(Attributes.ASSET_START_TIME, `${val}`);
    }
  }

  get assetEndTime() {
    const val = this.getAttribute(Attributes.ASSET_END_TIME);
    if (val == null) return undefined;
    const num = +val;
    return !Number.isNaN(num) ? num : undefined;
  }

  set assetEndTime(val: number | undefined) {
    if (val == undefined) {
      this.removeAttribute(Attributes.ASSET_END_TIME);
    } else {
      this.setAttribute(Attributes.ASSET_END_TIME, `${val}`);
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

  /** Keeps track of attribute status */
  #capRenditionToPlayerSize: boolean | undefined = undefined;
  /** Returns capRenditionToPlayerSize based on its attribute and {@link _hlsConfig} */
  get capRenditionToPlayerSize(): boolean | undefined {
    if (this._hlsConfig?.capLevelToPlayerSize != undefined) {
      return this._hlsConfig.capLevelToPlayerSize;
    }
    return this.#capRenditionToPlayerSize;
  }

  set capRenditionToPlayerSize(val: boolean | undefined) {
    this.#capRenditionToPlayerSize = val;
  }

  get drmToken() {
    return this.getAttribute(Attributes.DRM_TOKEN) ?? undefined;
  }

  set drmToken(val: string | undefined) {
    // dont' cause an infinite loop
    if (val === this.drmToken) return;

    if (val) {
      this.setAttribute(Attributes.DRM_TOKEN, val);
    } else {
      this.removeAttribute(Attributes.DRM_TOKEN);
    }
  }

  /**
   * Get the playback token for signing the src URL.
   */
  get playbackToken() {
    if (this.hasAttribute(Attributes.PLAYBACK_TOKEN)) {
      return this.getAttribute(Attributes.PLAYBACK_TOKEN) ?? undefined;
    }
    if (this.hasAttribute(Attributes.PLAYBACK_ID)) {
      const [, queryParts] = toPlaybackIdParts(this.playbackId ?? '');
      return new URLSearchParams(queryParts).get('token') ?? undefined;
    }
    if (this.src) {
      return new URLSearchParams(this.src).get('token') ?? undefined;
    }
    return undefined;
  }

  /**
   * Set the playback token for signing the src URL.
   */
  set playbackToken(val: string | undefined) {
    if (val === this.playbackToken) return;

    if (val) {
      this.setAttribute(Attributes.PLAYBACK_TOKEN, val);
    } else {
      this.removeAttribute(Attributes.PLAYBACK_TOKEN);
    }
  }

  get tokens() {
    const playback = this.getAttribute(Attributes.PLAYBACK_TOKEN);
    const drm = this.getAttribute(Attributes.DRM_TOKEN);
    return {
      ...this.#tokens,
      ...(playback != null ? { playback } : {}),
      ...(drm != null ? { drm } : {}),
    };
  }

  set tokens(val) {
    this.#tokens = val ?? {};
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
    if (val == this.liveEdgeOffset) return;

    if (val == null) {
      this.removeAttribute(Attributes.LIVE_EDGE_OFFSET);
    } else {
      this.setAttribute(Attributes.LIVE_EDGE_OFFSET, `${+val}`);
    }
  }

  get seekable() {
    return getSeekable(this.nativeEl);
  }

  async addCuePoints<T = any>(cuePoints: CuePoint<T>[]) {
    return addCuePoints(this.nativeEl, cuePoints);
  }

  get activeCuePoint() {
    return getActiveCuePoint(this.nativeEl);
  }

  get cuePoints() {
    return getCuePoints(this.nativeEl);
  }

  async addChapters(chapters: Chapter[]) {
    return addChapters(this.nativeEl, chapters);
  }

  get activeChapter() {
    return getActiveChapter(this.nativeEl);
  }

  get chapters() {
    return getChapters(this.nativeEl);
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
      this.mux.emit('hb', this.#metadata);
    }
  }

  get _hlsConfig() {
    return this.#_hlsConfig;
  }

  set _hlsConfig(val: Readonly<Partial<HlsConfig>> | undefined) {
    this.#_hlsConfig = val;
  }

  get logo() {
    return this.getAttribute(Attributes.LOGO) ?? this.#logo;
  }

  set logo(val) {
    if (val) {
      this.setAttribute(Attributes.LOGO, val);
    } else {
      this.removeAttribute(Attributes.LOGO);
    }
  }

  async #requestLoad() {
    if (this.#loadRequested) return;
    await (this.#loadRequested = Promise.resolve());
    this.#loadRequested = null;
    this.load();
  }

  load() {
    initialize(this as Partial<MuxMediaProps>, this.nativeEl, this.#core);
  }

  unload() {
    teardown(this.nativeEl, this.#core, this as Partial<MuxMediaProps>);
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
      case Attributes.LOGO:
        if (newValue == null || newValue !== oldValue) {
          this.updateLogo();
        }
        break;
      case Attributes.DISABLE_TRACKING: {
        if (newValue == null || newValue !== oldValue) {
          const currentTime = this.currentTime;
          const paused = this.paused;
          this.unload();
          this.#requestLoad().then(() => {
            this.currentTime = currentTime;
            if (!paused) {
              this.play();
            }
          });
        }
        break;
      }
      case Attributes.DISABLE_COOKIES: {
        if (newValue == null || newValue !== oldValue) {
          const disabled = this.disableCookies;
          if (disabled) {
            document.cookie.split(';').forEach((c) => {
              if (c.trim().startsWith('muxData')) {
                document.cookie = c
                  .replace(/^ +/, '')
                  .replace(/=.*/, '=;expires=' + new Date().toUTCString() + ';path=/');
              }
            });
          }
        }
        break;
      }
      case Attributes.CAP_RENDITION_TO_PLAYER_SIZE: {
        if (newValue == null || newValue !== oldValue) {
          // Presence-based: attribute present = true, absent = undefined
          this.capRenditionToPlayerSize = newValue != null ? true : undefined;
        }
      }
    }
  }

  updateLogo() {
    if (!this.shadowRoot) return;

    const slotLogo = this.shadowRoot.querySelector('slot[name="logo"]');
    if (!slotLogo) return;

    const logoHTML = (this.constructor as typeof MuxVideoElement).getLogoHTML(this.#logo || this.logo);
    slotLogo.innerHTML = logoHTML;
  }

  connectedCallback(): void {
    super.connectedCallback?.();
    if (this.nativeEl && this.src && !this.#core) {
      this.#requestLoad();
    }
  }

  disconnectedCallback(): void {
    this.unload();
  }

  handleEvent(event: Event): void {
    if (event.target === this.nativeEl) {
      // Composed events are forwarded to parent shadow hosts (e.g. mux-player).
      this.dispatchEvent(
        new CustomEvent(event.type, {
          composed: true,
          detail: (event as CustomEvent).detail,
        })
      );
    }
  }
}

export {
  PlaybackEngine,
  PlaybackEngine as Hls,
  ExtensionMimeTypeMap as MimeTypes,
  MediaError,
  Events,
  generatePlayerInitTime,
};
