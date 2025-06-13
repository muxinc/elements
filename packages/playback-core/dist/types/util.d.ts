import type { HlsPlaylistTypes, MuxMediaProps } from './types';
type addEventListenerWithTeardown = <K extends keyof HTMLMediaElementEventMap, T extends EventTarget = HTMLMediaElement>(mediaEl: HTMLMediaElement, type: K, listener: (this: T, ev: HTMLMediaElementEventMap[K]) => any, options?: boolean | AddEventListenerOptions, target?: T | HTMLMediaElement) => void;
export declare const addEventListenerWithTeardown: addEventListenerWithTeardown;
export declare function inSeekableRange(seekable: TimeRanges, duration: number, time: number): boolean;
export declare const toPlaybackIdParts: (playbackIdWithOptionalParams: string) => [string, string?];
export declare const getType: (props: Partial<Pick<MuxMediaProps, "type" | "src" | "customDomain">>) => "" | import("./types").MediaTypes;
export declare const toStreamTypeFromPlaylistType: (playlistType: HlsPlaylistTypes) => "on-demand" | "live";
export declare const toTargetLiveWindowFromPlaylistType: (playlistType: HlsPlaylistTypes) => number;
export declare const inferMimeTypeFromURL: (props: Partial<Pick<MuxMediaProps, "src" | "customDomain">>) => "" | "application/vnd.apple.mpegurl" | "video/mp4";
export declare const isExtensionLessMuxM3U8URL: ({ src, customDomain, }: Partial<Pick<MuxMediaProps, "src" | "customDomain">>) => boolean;
export type MuxJWT = {
    sub: string;
    aud: 'v' | 't' | 'g' | 's' | 'd';
    exp: number;
};
export declare const parseJwt: (token: string | undefined) => Partial<MuxJWT> | undefined;
export declare const isJWTExpired: ({ exp }: Partial<Pick<MuxJWT, "exp">>, referenceTime?: number) => boolean;
export declare const isJWTSubMismatch: ({ sub }: Partial<Pick<MuxJWT, "sub">>, expectedSub: string | undefined) => boolean;
export declare const isJWTAudMissing: ({ aud }: Partial<Pick<MuxJWT, "aud">>, _expectedAud: string | undefined) => boolean;
export declare const isJWTAudMismatch: ({ aud }: Partial<Pick<MuxJWT, "aud">>, expectedAud: string | undefined) => boolean;
export declare function i18n(str: string, translate?: boolean): IntlMessageFormat;
/**
 * Poor man's IntlMessageFormat, enrich if need be.
 * @see https://formatjs.io/docs/intl-messageformat/
 */
declare class IntlMessageFormat {
    message: string;
    locale: string;
    /** @TODO re-implement esbuild custom plugin for code usage (CJP) */
    constructor(message: string, locale?: any);
    format(values: Record<string, any>): string;
    toString(): string;
}
export {};
