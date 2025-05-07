/// <reference path="../../../../node_modules/mux-embed/dist/types/mux-embed.d.ts" preserve="true" />
import type { Options, Mux } from 'mux-embed';
import type { MediaError } from './errors';
import type { HlsConfig } from 'hls.js';
import type Hls from 'hls.js';
type KeyTypes = string | number | symbol;
type Maybe<T> = T | null | undefined;
export declare const isKeyOf: <T extends {} = any>(k: KeyTypes, o: Maybe<T>) => k is keyof T;
export type ValueOf<T> = T[keyof T];
export type Metadata = Partial<Required<Options>['data']>;
type MetaData = Metadata;
export type PlaybackEngine = Hls;
export type MuxDataSDK = Mux;
export type PlaybackCore = {
    engine?: PlaybackEngine;
    muxDataSDK?: MuxDataSDK;
    setAutoplay: (autoplay?: Autoplay) => void;
    setPreload: (preload?: HTMLMediaElement['preload']) => void;
};
export type AutoplayTypes = {
    ANY: 'any';
    MUTED: 'muted';
};
export declare const AutoplayTypes: AutoplayTypes;
export type Autoplay = boolean | ValueOf<AutoplayTypes>;
export type HlsPlaylistTypes = 'VOD' | 'EVENT' | null | undefined;
export type StreamTypes = {
    ON_DEMAND: 'on-demand';
    LIVE: 'live';
    UNKNOWN: 'unknown';
};
export declare const StreamTypes: StreamTypes;
export type PlaybackTypes = {
    MSE: 'mse';
    NATIVE: 'native';
};
export declare const PlaybackTypes: PlaybackTypes;
export type CmcdTypes = {
    HEADER: 'header';
    QUERY: 'query';
    NONE: 'none';
};
export declare const CmcdTypes: CmcdTypes;
export declare const CmcdTypeValues: ("none" | "header" | "query")[];
export type ExtensionMimeTypeMap = {
    M3U8: 'application/vnd.apple.mpegurl';
    MP4: 'video/mp4';
};
export declare const ExtensionMimeTypeMap: ExtensionMimeTypeMap;
export type MimeTypeShorthandMap = {
    HLS: ExtensionMimeTypeMap['M3U8'];
};
export declare const MimeTypeShorthandMap: MimeTypeShorthandMap;
export declare const shorthandKeys: string[];
export type MediaTypes = ValueOf<ExtensionMimeTypeMap> | keyof MimeTypeShorthandMap
/** @TODO Figure out a way to "downgrade" derived types below to early TS syntax (e.g. 3.4) instead of explicit versions here (CJP) */
 | 'hls';
export declare const allMediaTypes: MediaTypes[];
type CueLike<T = any> = {
    startTime: number;
    endTime?: number;
    value: T;
};
export type CuePoint<T = any> = CueLike<T> | {
    time: number;
    value: T;
};
export type Chapter = CueLike<string>;
export declare const MaxResolution: {
    readonly upTo720p: "720p";
    readonly upTo1080p: "1080p";
    readonly upTo1440p: "1440p";
    readonly upTo2160p: "2160p";
};
export declare const MinResolution: {
    readonly noLessThan480p: "480p";
    readonly noLessThan540p: "540p";
    readonly noLessThan720p: "720p";
    readonly noLessThan1080p: "1080p";
    readonly noLessThan1440p: "1440p";
    readonly noLessThan2160p: "2160p";
};
export declare const RenditionOrder: {
    readonly DESCENDING: "desc";
};
export type MaxResolutionValue = ValueOf<typeof MaxResolution>;
export type MinResolutionValue = ValueOf<typeof MinResolution>;
export type RenditionOrderValue = ValueOf<typeof RenditionOrder>;
export type Tokens = {
    playback?: string;
    drm?: string;
    thumbnail?: string;
    storyboard?: string;
};
export type MuxMediaPropTypes = {
    _hlsConfig?: Partial<HlsConfig>;
    autoPlay?: Autoplay;
    autoplay?: Autoplay;
    beaconCollectionDomain: Options['beaconCollectionDomain'];
    customDomain: string;
    debug: Options['debug'] & Hls['config']['debug'];
    disableCookies: Options['disableCookies'];
    disableTracking: boolean;
    drmToken?: string;
    playbackToken?: string;
    envKey: MetaData['env_key'];
    error?: HTMLMediaElement['error'] | MediaError;
    errorTranslator: Options['errorTranslator'];
    liveEdgeStart: number;
    maxResolution: MaxResolutionValue;
    metadata: Partial<Options['data']>;
    minResolution: MinResolutionValue;
    playbackId: string;
    playerInitTime: MetaData['player_init_time'];
    preferCmcd: ValueOf<CmcdTypes> | undefined;
    preferPlayback: ValueOf<PlaybackTypes> | undefined;
    programStartTime: number;
    programEndTime: number;
    assetStartTime: number;
    assetEndTime: number;
    renditionOrder: RenditionOrderValue;
    startTime: Hls['config']['startPosition'];
    streamType: ValueOf<StreamTypes>;
    targetLiveWindow: number;
    tokens: Tokens;
    type: MediaTypes;
    extraSourceParams: Record<string, any>;
};
export type HTMLMediaElementProps = Partial<Pick<HTMLMediaElement, 'src' | 'preload' | 'error' | 'seekable'>>;
export type MuxMediaProps = HTMLMediaElementProps & MuxMediaPropTypes;
export type MuxMediaPropsInternal = MuxMediaProps & {
    playerSoftwareName: MetaData['player_software_name'];
    playerSoftwareVersion: MetaData['player_software_version'];
    muxDataSDK?: Mux;
    muxDataSDKOptions?: Mux;
    muxDataKeepSession?: boolean;
    drmTypeCb?: (drmType: Metadata['view_drm_type']) => void;
};
export {};
