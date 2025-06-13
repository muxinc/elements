import { ValueOf, PlaybackCore, MuxMediaProps, MuxMediaPropsInternal, MuxMediaPropTypes } from './types';
import mux from 'mux-embed';
import Hls from './hls';
import { HlsInterface } from './hls';
import { HlsConfig } from 'hls.js';
import { MediaError, MuxErrorCategory, MuxErrorCode, errorCategoryToTokenNameOrPrefix } from './errors';
import { addTextTrack, removeTextTrack, getTextTrack, addCuePoints, getCuePoints, getActiveCuePoint, setupCuePoints, addChapters, getChapters, getActiveChapter, setupChapters } from './text-tracks';
import { getStartDate, getCurrentPdt } from './pdt';
import { toPlaybackIdParts, i18n, parseJwt } from './util';
import { StreamTypes, MediaTypes } from './types';
import { MuxJWTAud } from './request-errors';
export { mux, Hls, MediaError, MuxErrorCategory, MuxErrorCode, errorCategoryToTokenNameOrPrefix, MuxJWTAud, addTextTrack, removeTextTrack, getTextTrack, addCuePoints, getCuePoints, getActiveCuePoint, setupCuePoints, addChapters, getChapters, getActiveChapter, setupChapters, getStartDate, getCurrentPdt, toPlaybackIdParts, i18n, parseJwt, };
export * from './types';
declare const DRMType: {
    readonly FAIRPLAY: "fairplay";
    readonly PLAYREADY: "playready";
    readonly WIDEVINE: "widevine";
};
type DRMTypeValue = (typeof DRMType)[keyof typeof DRMType];
export declare const toDRMTypeFromKeySystem: (keySystem: string) => DRMTypeValue | undefined;
export declare const getMediaPlaylistLinesFromMultivariantPlaylistSrc: (src: string) => Promise<string[]>;
export declare const getStreamInfoFromPlaylistLines: (playlistLines: string[]) => {
    streamType: "on-demand" | "live";
    targetLiveWindow: number;
    liveEdgeStartOffset: number | undefined;
};
export declare const getStreamInfoFromSrcAndType: (src: string, type?: MediaTypes | "") => Promise<{
    streamType: "on-demand" | "live";
    targetLiveWindow: number;
    liveEdgeStartOffset: number | undefined;
} | {
    streamType: undefined;
    targetLiveWindow: undefined;
    liveEdgeStartOffset: undefined;
}>;
export declare const updateStreamInfoFromSrc: (src: string, mediaEl: HTMLMediaElement, type?: MediaTypes | "") => Promise<void>;
export declare const getStreamInfoFromHlsjsLevelDetails: (levelDetails: any) => {
    streamType: "on-demand" | "live";
    targetLiveWindow: number;
    liveEdgeStartOffset: number | undefined;
    lowLatency: boolean;
};
export declare const updateStreamInfoFromHlsjsLevelDetails: (levelDetails: any, mediaEl: HTMLMediaElement, hls: Pick<Hls, "config" | "userConfig" | "liveSyncPosition">) => void;
declare global {
    interface NavigatorUAData {
        platform: string;
        mobile: boolean;
        brands: Array<{
            brand: string;
            version: string;
        }>;
    }
    interface Navigator {
        userAgentData?: NavigatorUAData;
    }
}
export declare const muxMediaState: WeakMap<HTMLMediaElement, Partial<MuxMediaProps> & {
    seekable?: TimeRanges;
    liveEdgeStartOffset?: number;
}>;
export declare const generatePlayerInitTime: () => number;
export declare const generateUUID: () => string;
type MuxVideoURLProps = Partial<Pick<MuxMediaPropTypes, 'playbackId' | 'customDomain' | 'maxResolution' | 'minResolution' | 'renditionOrder' | 'programStartTime' | 'programEndTime' | 'assetStartTime' | 'assetEndTime' | 'tokens' | 'playbackToken' | 'extraSourceParams'>>;
export declare const toMuxVideoURL: ({ playbackId: playbackIdWithParams, customDomain: domain, maxResolution, minResolution, renditionOrder, programStartTime, programEndTime, assetStartTime, assetEndTime, playbackToken, tokens: { playback: token }, extraSourceParams, }?: MuxVideoURLProps) => string | undefined;
export declare const toPlaybackIdFromSrc: (src: string | undefined) => string | undefined;
export declare const getError: (mediaEl: HTMLMediaElement) => globalThis.MediaError | (globalThis.MediaError & MediaError) | null | undefined;
export declare const getStreamType: (mediaEl: HTMLMediaElement) => ValueOf<StreamTypes>;
export declare const getTargetLiveWindow: (mediaEl: HTMLMediaElement) => number;
export declare const getSeekable: (mediaEl: HTMLMediaElement) => TimeRanges;
export declare const getLiveEdgeStart: (mediaEl: HTMLMediaElement) => number;
export declare const isPseudoEnded: (mediaEl: HTMLMediaElement, moe?: number) => boolean;
export declare const isStuckOnLastFragment: (mediaEl: HTMLMediaElement, hls?: Pick<Hls, 
/** Should we add audio fragments logic here, too? (CJP) */
"levels" | "currentLevel">) => boolean | undefined;
export declare const getEnded: (mediaEl: HTMLMediaElement, hls?: Pick<Hls, 
/** Should we add audio fragments logic here, too? (CJP) */
"levels" | "currentLevel">) => boolean;
export declare const initialize: (props: Partial<MuxMediaPropsInternal>, mediaEl: HTMLMediaElement, core?: PlaybackCore) => {
    engine: Hls | undefined;
    setAutoplay: (newAutoplay?: import("./types").Autoplay) => void;
    setPreload: (val?: HTMLMediaElement["preload"]) => void;
};
export declare const teardown: (mediaEl?: HTMLMediaElement | null, core?: PlaybackCore, props?: Partial<MuxMediaPropsInternal>) => void;
export declare const setupHls: (props: Partial<Pick<MuxMediaPropsInternal, "debug" | "streamType" | "type" | "startTime" | "metadata" | "preferCmcd" | "_hlsConfig" | "tokens" | "drmTypeCb">>, mediaEl: Pick<HTMLMediaElement, "canPlayType">) => Hls | undefined;
export declare const getStreamTypeConfig: (streamType?: ValueOf<StreamTypes>) => {};
export declare const getDRMConfig: (props: Partial<Pick<MuxMediaPropsInternal, "src" | "playbackId" | "tokens" | "customDomain" | "drmTypeCb">>) => Partial<HlsConfig>;
export declare const getAppCertificate: (appCertificateUrl: string) => Promise<ArrayBuffer>;
export declare const getLicenseKey: (message: ArrayBuffer, licenseServerUrl: string) => Promise<Uint8Array<ArrayBuffer>>;
export declare const setupNativeFairplayDRM: (props: Partial<Pick<MuxMediaPropsInternal, "playbackId" | "tokens" | "playbackToken" | "customDomain" | "drmTypeCb">>, mediaEl: HTMLMediaElement) => void;
export declare const toLicenseKeyURL: ({ playbackId: playbackIdWithParams, tokens: { drm: token }, customDomain, }: Partial<Pick<MuxMediaPropsInternal, "playbackId" | "tokens" | "customDomain">>, scheme: "widevine" | "playready" | "fairplay") => string;
export declare const toAppCertURL: ({ playbackId: playbackIdWithParams, tokens: { drm: token }, customDomain, }: Partial<Pick<MuxMediaPropsInternal, "playbackId" | "tokens" | "customDomain">>, scheme: "widevine" | "playready" | "fairplay") => string;
export declare const isMuxVideoSrc: ({ playbackId, src, customDomain, }: Partial<Pick<MuxMediaPropsInternal, "playbackId" | "src" | "customDomain">>) => boolean;
export declare const setupMux: (props: Partial<Pick<MuxMediaPropsInternal, "envKey" | "playerInitTime" | "beaconCollectionDomain" | "errorTranslator" | "metadata" | "debug" | "playerSoftwareName" | "playerSoftwareVersion" | "playbackId" | "src" | "customDomain" | "disableCookies" | "disableTracking" | "muxDataSDK" | "muxDataSDKOptions">>, mediaEl: HTMLMediaElement, hlsjs?: HlsInterface) => void;
export declare const loadMedia: (props: Partial<Pick<MuxMediaProps, "preferPlayback" | "src" | "type" | "startTime" | "streamType" | "autoplay" | "playbackId" | "tokens" | "customDomain">>, mediaEl: HTMLMediaElement, hls?: Pick<Hls, "config" | "on" | "once" | "off" | "trigger" | "startLoad" | "stopLoad" | "recoverMediaError" | "destroy" | "loadSource" | "attachMedia" | "liveSyncPosition" | "subtitleTracks" | "subtitleTrack" | "userConfig" | "audioTrack" | "audioTracks" | "autoLevelEnabled" | "nextLevel" | "levels" | "currentLevel">) => void;
