import { generatePlayerInitTime, MuxMediaProps, StreamTypes, PlaybackTypes, Metadata, MediaError, CmcdTypes } from '@mux/playback-core';
import { PlaybackEngine, Autoplay, ExtensionMimeTypeMap, ValueOf, MaxResolutionValue, MinResolutionValue, RenditionOrderValue, Chapter, CuePoint } from '@mux/playback-core';
import { CustomVideoElement, Events as VideoEvents } from 'custom-media-element';
import { HlsConfig } from 'hls.js';
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
    private "MuxVideoBaseElement.#private";
    static readonly NAME: string;
    static readonly VERSION: string;
    static readonly observedAttributes: string[];
    static getTemplateHTML(attrs?: Record<string, string>): string;
    constructor();
    preferCmcd: ValueOf<CmcdTypes> | undefined;
    playerInitTime: number;
    playerSoftwareName: string | undefined;
    playerSoftwareVersion: string | undefined;
    readonly _hls: PlaybackEngine | undefined;
    readonly mux: Readonly<HTMLVideoElement['mux']> | undefined;
    readonly error: globalThis.MediaError | null;
    errorTranslator: ((errorEvent: any) => any) | undefined;
    src: string;
    type: ValueOf<ExtensionMimeTypeMap> | undefined;
    /*@ts-ignore
    @ts-ignore */
    autoplay: Autoplay;
    preload: "" | "none" | "metadata" | "auto";
    debug: boolean;
    disableTracking: boolean;
    disableCookies: boolean;
    startTime: number | undefined;
    playbackId: string | undefined;
    maxResolution: MaxResolutionValue | undefined;
    minResolution: MinResolutionValue | undefined;
    renditionOrder: RenditionOrderValue | undefined;
    programStartTime: number | undefined;
    programEndTime: number | undefined;
    assetStartTime: number | undefined;
    assetEndTime: number | undefined;
    customDomain: string | undefined;
    drmToken: string | undefined;
    /*
    * Get the playback token for signing the src URL.
    
    
    * Set the playback token for signing the src URL.
    */
    playbackToken: string | undefined;
    tokens: {
        drm?: string;
        playback?: string;
        thumbnail?: string;
        storyboard?: string;
    };
    readonly ended: boolean;
    envKey: string | undefined;
    beaconCollectionDomain: string | undefined;
    streamType: ValueOf<StreamTypes> | undefined;
    targetLiveWindow: number | undefined;
    readonly liveEdgeStart: number;
    liveEdgeOffset: number | undefined;
    readonly seekable: TimeRanges;
    addCuePoints<T = any>(cuePoints: CuePoint<T>[]): Promise<TextTrack>;
    readonly activeCuePoint: {
        time: number;
        value: any;
    } | undefined;
    readonly cuePoints: {
        time: number;
        value: any;
    }[];
    addChapters(chapters: Chapter[]): Promise<TextTrack>;
    readonly activeChapter: {
        startTime: number;
        endTime: number;
        value: string;
    } | undefined;
    readonly chapters: {
        startTime: number;
        endTime: number;
        value: string;
    }[];
    getStartDate(): Date;
    readonly currentPdt: Date;
    preferPlayback: ValueOf<PlaybackTypes> | undefined;
    metadata: Readonly<Metadata> | undefined;
    _hlsConfig: Readonly<Partial<HlsConfig>> | undefined;
    logo: string | null;
    load(): void;
    unload(): void;
    attributeChangedCallback(attrName: string, oldValue: string | null, newValue: string | null): void;
    connectedCallback(): void;
    disconnectedCallback(): void;
}
declare const MuxVideoElement_base: import("media-tracks").WithMediaTracks<typeof MuxVideoBaseElement>;
declare class MuxVideoElement extends MuxVideoElement_base {
    private "MuxVideoElement.#private";
    readonly muxCastCustomData: {
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
    castCustomData: Record<string, any> | undefined;
}
type MuxVideoElementType = typeof MuxVideoElement;
declare global {
    var MuxVideoElement: MuxVideoElementType;
}
export { PlaybackEngine, PlaybackEngine as Hls, ExtensionMimeTypeMap as MimeTypes, MediaError, VideoEvents, generatePlayerInitTime, };
export default MuxVideoElement;
