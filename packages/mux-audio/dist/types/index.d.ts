import { generatePlayerInitTime, PlaybackTypes, MediaError } from '@mux/playback-core';
import type { ExtensionMimeTypeMap, Metadata, MuxMediaProps, PlaybackEngine, StreamTypes, ValueOf } from '@mux/playback-core';
import { CustomAudioElement, Events as AudioEvents } from 'custom-media-element';
import type { HlsConfig } from 'hls.js';
export declare const Attributes: {
    readonly PLAYER_INIT_TIME: "player-init-time";
    readonly ENV_KEY: "env-key";
    readonly DEBUG: "debug";
    readonly PLAYBACK_ID: "playback-id";
    readonly PLAYBACK_TOKEN: "playback-token";
    readonly PROGRAM_START_TIME: "program-start-time";
    readonly PROGRAM_END_TIME: "program-end-time";
    readonly ASSET_START_TIME: "asset-start-time";
    readonly ASSET_END_TIME: "asset-end-time";
    readonly METADATA_URL: "metadata-url";
    readonly PREFER_PLAYBACK: "prefer-playback";
    readonly CUSTOM_DOMAIN: "custom-domain";
    readonly BEACON_COLLECTION_DOMAIN: "beacon-collection-domain";
    readonly DISABLE_TRACKING: "disable-tracking";
    readonly DISABLE_COOKIES: "disable-cookies";
    readonly TYPE: "type";
    readonly STREAM_TYPE: "stream-type";
    readonly START_TIME: "start-time";
};
export declare const playerSoftwareVersion: string;
export declare const playerSoftwareName = "mux-audio";
declare class MuxAudioElement extends CustomAudioElement implements Partial<MuxMediaProps> {
    #private;
    static get NAME(): string;
    static get VERSION(): string;
    static get observedAttributes(): string[];
    constructor();
    get playerInitTime(): number;
    set playerInitTime(val: number);
    get playerSoftwareName(): string;
    get playerSoftwareVersion(): string;
    get _hls(): PlaybackEngine | undefined;
    get mux(): Readonly<HTMLAudioElement['mux']> | undefined;
    get src(): string;
    set src(val: string);
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
    /**
     * Get the playback token for signing the src URL.
     */
    get playbackToken(): string | undefined;
    /**
     * Set the playback token for signing the src URL.
     */
    set playbackToken(val: string | undefined);
    get tokens(): {
        playback?: string;
        drm?: string;
        thumbnail?: string;
        storyboard?: string;
    };
    set tokens(val: {
        playback?: string;
        drm?: string;
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
    getStartDate(): Date;
    get currentPdt(): Date;
    get preferPlayback(): ValueOf<PlaybackTypes> | undefined;
    set preferPlayback(val: ValueOf<PlaybackTypes> | undefined);
    get metadata(): Readonly<Metadata> | undefined;
    set metadata(val: Readonly<Metadata> | undefined);
    get _hlsConfig(): Readonly<Partial<HlsConfig>> | undefined;
    set _hlsConfig(val: Readonly<Partial<HlsConfig>> | undefined);
    load(): void;
    unload(): void;
    attributeChangedCallback(attrName: string, oldValue: string | null, newValue: string | null): void;
    connectedCallback(): void;
    disconnectedCallback(): void;
}
type MuxAudioElementType = typeof MuxAudioElement;
declare global {
    var MuxAudioElement: MuxAudioElementType;
}
export { PlaybackEngine, PlaybackEngine as Hls, ExtensionMimeTypeMap as MimeTypes, MediaError, AudioEvents, generatePlayerInitTime, };
export default MuxAudioElement;
