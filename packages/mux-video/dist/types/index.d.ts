import { generatePlayerInitTime, MuxMediaProps, StreamTypes, PlaybackTypes, Metadata, MediaError, CmcdTypes } from '@mux/playback-core';
import type { PlaybackEngine, Autoplay, ExtensionMimeTypeMap, ValueOf, MaxResolutionValue, MinResolutionValue, RenditionOrderValue, Chapter, CuePoint } from '@mux/playback-core';
import { CustomVideoElement, Events as VideoEvents } from 'custom-media-element';
import type { HlsConfig } from 'hls.js';
export declare const Attributes: {
    readonly BEACON_COLLECTION_DOMAIN: "beacon-collection-domain";
    readonly CUSTOM_DOMAIN: "custom-domain";
    readonly DEBUG: "debug";
    readonly DISABLE_TRACKING: "disable-tracking";
    readonly DISABLE_COOKIES: "disable-cookies";
    readonly DRM_TOKEN: "drm-token";
    readonly PLAYBACK_TOKEN: "playback-token";
    readonly ENV_KEY: "env-key";
    readonly MAX_RESOLUTION: "max-resolution";
    readonly MIN_RESOLUTION: "min-resolution";
    readonly RENDITION_ORDER: "rendition-order";
    readonly PROGRAM_START_TIME: "program-start-time";
    readonly PROGRAM_END_TIME: "program-end-time";
    readonly ASSET_START_TIME: "asset-start-time";
    readonly ASSET_END_TIME: "asset-end-time";
    readonly METADATA_URL: "metadata-url";
    readonly PLAYBACK_ID: "playback-id";
    readonly PLAYER_SOFTWARE_NAME: "player-software-name";
    readonly PLAYER_SOFTWARE_VERSION: "player-software-version";
    readonly PLAYER_INIT_TIME: "player-init-time";
    readonly PREFER_CMCD: "prefer-cmcd";
    readonly PREFER_PLAYBACK: "prefer-playback";
    readonly START_TIME: "start-time";
    readonly STREAM_TYPE: "stream-type";
    readonly TARGET_LIVE_WINDOW: "target-live-window";
    readonly LIVE_EDGE_OFFSET: "live-edge-offset";
    readonly TYPE: "type";
    readonly LOGO: "logo";
};
export declare const playerSoftwareVersion: string;
export declare const playerSoftwareName = "mux-video";
declare class MuxVideoBaseElement extends CustomVideoElement implements Partial<MuxMediaProps> {
    #private;
    static get NAME(): string;
    static get VERSION(): string;
    static get observedAttributes(): string[];
    static getTemplateHTML(attrs?: Record<string, string>): string;
    constructor();
    get preferCmcd(): ValueOf<CmcdTypes> | undefined;
    set preferCmcd(value: ValueOf<CmcdTypes> | undefined);
    get playerInitTime(): number;
    set playerInitTime(val: number);
    get playerSoftwareName(): string | undefined;
    set playerSoftwareName(value: string | undefined);
    get playerSoftwareVersion(): string | undefined;
    set playerSoftwareVersion(value: string | undefined);
    get _hls(): PlaybackEngine | undefined;
    get mux(): Readonly<HTMLVideoElement['mux']> | undefined;
    get error(): globalThis.MediaError | null;
    get errorTranslator(): ((errorEvent: any) => any) | undefined;
    set errorTranslator(value: ((errorEvent: any) => any) | undefined);
    get src(): string;
    set src(val: string);
    get type(): ValueOf<ExtensionMimeTypeMap> | undefined;
    set type(val: ValueOf<ExtensionMimeTypeMap> | undefined);
    /** @ts-ignore */
    get autoplay(): Autoplay;
    /** @ts-ignore */
    set autoplay(val: Autoplay);
    get preload(): "" | "none" | "metadata" | "auto";
    set preload(val: "" | "none" | "metadata" | "auto");
    get debug(): boolean;
    set debug(val: boolean);
    get disableTracking(): boolean;
    set disableTracking(val: boolean);
    get disableCookies(): boolean;
    set disableCookies(val: boolean);
    get startTime(): number | undefined;
    set startTime(val: number | undefined);
    get playbackId(): string | undefined;
    set playbackId(val: string | undefined);
    get maxResolution(): MaxResolutionValue | undefined;
    set maxResolution(val: MaxResolutionValue | undefined);
    get minResolution(): MinResolutionValue | undefined;
    set minResolution(val: MinResolutionValue | undefined);
    get renditionOrder(): RenditionOrderValue | undefined;
    set renditionOrder(val: RenditionOrderValue | undefined);
    get programStartTime(): number | undefined;
    set programStartTime(val: number | undefined);
    get programEndTime(): number | undefined;
    set programEndTime(val: number | undefined);
    get assetStartTime(): number | undefined;
    set assetStartTime(val: number | undefined);
    get assetEndTime(): number | undefined;
    set assetEndTime(val: number | undefined);
    get customDomain(): string | undefined;
    set customDomain(val: string | undefined);
    get drmToken(): string | undefined;
    set drmToken(val: string | undefined);
    /**
     * Get the playback token for signing the src URL.
     */
    get playbackToken(): string | undefined;
    /**
     * Set the playback token for signing the src URL.
     */
    set playbackToken(val: string | undefined);
    get tokens(): {
        drm?: string;
        playback?: string;
        thumbnail?: string;
        storyboard?: string;
    };
    set tokens(val: {
        drm?: string;
        playback?: string;
        thumbnail?: string;
        storyboard?: string;
    });
    get ended(): boolean;
    get envKey(): string | undefined;
    set envKey(val: string | undefined);
    get beaconCollectionDomain(): string | undefined;
    set beaconCollectionDomain(val: string | undefined);
    get streamType(): ValueOf<StreamTypes> | undefined;
    set streamType(val: ValueOf<StreamTypes> | undefined);
    get targetLiveWindow(): number | undefined;
    set targetLiveWindow(val: number | undefined);
    get liveEdgeStart(): number;
    get liveEdgeOffset(): number | undefined;
    set liveEdgeOffset(val: number | undefined);
    get seekable(): TimeRanges;
    addCuePoints<T = any>(cuePoints: CuePoint<T>[]): Promise<TextTrack>;
    get activeCuePoint(): {
        time: number;
        value: any;
    } | undefined;
    get cuePoints(): {
        time: number;
        value: any;
    }[];
    addChapters(chapters: Chapter[]): Promise<TextTrack>;
    get activeChapter(): {
        startTime: number;
        endTime: number;
        value: string;
    } | undefined;
    get chapters(): {
        startTime: number;
        endTime: number;
        value: string;
    }[];
    getStartDate(): Date;
    get currentPdt(): Date;
    get preferPlayback(): ValueOf<PlaybackTypes> | undefined;
    set preferPlayback(val: ValueOf<PlaybackTypes> | undefined);
    get metadata(): Readonly<Metadata> | undefined;
    set metadata(val: Readonly<Metadata> | undefined);
    get _hlsConfig(): Readonly<Partial<HlsConfig>> | undefined;
    set _hlsConfig(val: Readonly<Partial<HlsConfig>> | undefined);
    get logo(): string | null;
    set logo(val: string | null);
    load(): void;
    unload(): void;
    attributeChangedCallback(attrName: string, oldValue: string | null, newValue: string | null): void;
    connectedCallback(): void;
    disconnectedCallback(): void;
}
declare const MuxVideoElement_base: import("media-tracks").WithMediaTracks<typeof MuxVideoBaseElement>;
declare class MuxVideoElement extends MuxVideoElement_base {
    #private;
    get muxCastCustomData(): {
        readonly mux: {
            readonly playbackId: string | undefined;
            readonly minResolution: MinResolutionValue | undefined;
            readonly maxResolution: MaxResolutionValue | undefined;
            readonly renditionOrder: "desc" | undefined;
            readonly customDomain: string | undefined;
            /** @TODO Add this.tokens to MuxVideoElement (CJP) */
            readonly tokens: {
                readonly drm: string | undefined;
            };
            readonly envKey: string | undefined;
            readonly metadata: Readonly<Partial<import("mux-embed").Metadata>> | undefined;
            readonly disableCookies: boolean;
            readonly disableTracking: boolean;
            readonly beaconCollectionDomain: string | undefined;
            readonly startTime: number | undefined;
            readonly preferCmcd: ValueOf<CmcdTypes> | undefined;
        };
    };
    get castCustomData(): Record<string, any> | undefined;
    set castCustomData(val: Record<string, any> | undefined);
}
type MuxVideoElementType = typeof MuxVideoElement;
declare global {
    var MuxVideoElement: MuxVideoElementType;
}
export { PlaybackEngine, PlaybackEngine as Hls, ExtensionMimeTypeMap as MimeTypes, MediaError, VideoEvents, generatePlayerInitTime, };
export default MuxVideoElement;
