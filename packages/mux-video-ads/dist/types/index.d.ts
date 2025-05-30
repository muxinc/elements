/// <reference path="../../../../node_modules/mux-embed/dist/types/mux-embed.d.ts" preserve="true" />
import MuxVideoElement from '@mux/mux-video';
import type { MuxDataSDK } from '@mux/playback-core';
declare class MuxVideoAds extends MuxVideoElement {
    #private;
    static getTemplateHTML: (attrs: Record<string, string>) => string;
    constructor();
    connectedCallback(): void;
    get adTagUrl(): string | undefined;
    set adTagUrl(value: string | undefined);
    get adBreak(): boolean;
    onEnded(): void;
    handleEvent(event: Event): void;
    play(): Promise<void>;
    pause(): void;
    get paused(): boolean;
    get duration(): number;
    get currentTime(): number;
    set currentTime(val: number);
    get volume(): number;
    set volume(val: number);
    get muted(): boolean;
    set muted(val: boolean);
    get readyState(): number;
    requestPictureInPicture(): Promise<PictureInPictureWindow>;
    get muxDataSDK(): MuxDataSDK;
    get muxDataSDKOptions(): {
        imaAdsLoader: google.ima.AdsLoader | undefined;
    };
    set muxDataKeepSession(val: boolean);
    get muxDataKeepSession(): boolean;
    get allowAdBlocker(): boolean;
    set allowAdBlocker(val: boolean);
}
type MuxVideoAdsElementType = typeof MuxVideoAds;
declare global {
    var MuxVideoAds: MuxVideoAdsElementType;
}
export default MuxVideoAds;
