export declare const MuxErrorCategory: {
    readonly VIDEO: "video";
    readonly THUMBNAIL: "thumbnail";
    readonly STORYBOARD: "storyboard";
    readonly DRM: "drm";
};
export declare const MuxErrorCode: {
    readonly NOT_AN_ERROR: 0;
    readonly NETWORK_OFFLINE: 2000002;
    readonly NETWORK_UNKNOWN_ERROR: 2000000;
    readonly NETWORK_NO_STATUS: 2000001;
    readonly NETWORK_INVALID_URL: 2400000;
    readonly NETWORK_NOT_FOUND: 2404000;
    readonly NETWORK_NOT_READY: 2412000;
    readonly NETWORK_GENERIC_SERVER_FAIL: 2500000;
    readonly NETWORK_TOKEN_MISSING: 2403201;
    readonly NETWORK_TOKEN_MALFORMED: 2412202;
    readonly NETWORK_TOKEN_EXPIRED: 2403210;
    readonly NETWORK_TOKEN_AUD_MISSING: 2403221;
    readonly NETWORK_TOKEN_AUD_MISMATCH: 2403222;
    readonly NETWORK_TOKEN_SUB_MISMATCH: 2403232;
    readonly ENCRYPTED_ERROR: 5000000;
    readonly ENCRYPTED_UNSUPPORTED_KEY_SYSTEM: 5000001;
    readonly ENCRYPTED_GENERATE_REQUEST_FAILED: 5000002;
    readonly ENCRYPTED_UPDATE_LICENSE_FAILED: 5000003;
    readonly ENCRYPTED_UPDATE_SERVER_CERT_FAILED: 5000004;
    readonly ENCRYPTED_CDM_ERROR: 5000005;
    readonly ENCRYPTED_OUTPUT_RESTRICTED: 5000006;
    readonly ENCRYPTED_MISSING_TOKEN: 5000002;
};
export type MuxErrorCategory = typeof MuxErrorCategory;
export type MuxErrorCode = typeof MuxErrorCode;
export type MuxErrorCategoryValue = MuxErrorCategory[keyof MuxErrorCategory];
export type MuxErrorCodeValue = MuxErrorCode[keyof MuxErrorCode];
export declare const errorCategoryToTokenNameOrPrefix: (category: MuxErrorCategoryValue) => "thumbnail" | "storyboard" | "drm" | "playback";
type Stringable = string | {
    toString(): string;
};
declare global {
    interface ErrorConstructor {
        new (message?: Stringable): Error;
        (message?: Stringable): Error;
        readonly prototype: Error;
    }
}
export declare class MediaError extends Error {
    static MEDIA_ERR_ABORTED: 1;
    static MEDIA_ERR_NETWORK: 2;
    static MEDIA_ERR_DECODE: 3;
    static MEDIA_ERR_SRC_NOT_SUPPORTED: 4;
    static MEDIA_ERR_ENCRYPTED: 5;
    static MEDIA_ERR_CUSTOM: number;
    static defaultMessages: Record<number, string>;
    name: string;
    code: number;
    muxCode?: MuxErrorCodeValue;
    errorCategory?: MuxErrorCategoryValue;
    context?: string;
    fatal: boolean;
    data?: any;
    constructor(message?: Stringable, code?: number, fatal?: boolean, context?: string);
}
export {};
