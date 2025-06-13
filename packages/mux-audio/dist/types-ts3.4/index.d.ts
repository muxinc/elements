import { generatePlayerInitTime, PlaybackTypes, MediaError } from '@mux/playback-core';
import { ExtensionMimeTypeMap, Metadata, MuxMediaProps, PlaybackEngine, StreamTypes, ValueOf } from '@mux/playback-core';
import { CustomAudioElement, Events as AudioEvents } from 'custom-media-element';
import { HlsConfig } from 'hls.js';
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
    private "MuxAudioElement.#private";
    static readonly NAME: string;
    static readonly VERSION: string;
    static readonly observedAttributes: string[];
    constructor();
    playerInitTime: number;
    readonly playerSoftwareName: string;
    readonly playerSoftwareVersion: string;
    readonly _hls: PlaybackEngine | undefined;
    readonly mux: Readonly<HTMLAudioElement['mux']> | undefined;
    src: string;
    preload: "" | "none" | "metadata" | "auto";
    debug: boolean;
    disableTracking: boolean;
    disableCookies: boolean;
    startTime: number | undefined;
    playbackId: string | undefined;
    programStartTime: number | undefined;
    programEndTime: number | undefined;
    assetStartTime: number | undefined;
    assetEndTime: number | undefined;
    customDomain: string | undefined;
    /*
    * Get the playback token for signing the src URL.
    
    
    * Set the playback token for signing the src URL.
    */
    playbackToken: string | undefined;
    tokens: {
        playback?: string;
        drm?: string;
        thumbnail?: string;
        storyboard?: string;
    };
    readonly ended: boolean;
    envKey: string | undefined;
    beaconCollectionDomain: string | undefined;
    streamType: ValueOf<StreamTypes> | undefined;
    getStartDate(): Date;
    readonly currentPdt: Date;
    preferPlayback: ValueOf<PlaybackTypes> | undefined;
    metadata: Readonly<Metadata> | undefined;
    _hlsConfig: Readonly<Partial<HlsConfig>> | undefined;
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
