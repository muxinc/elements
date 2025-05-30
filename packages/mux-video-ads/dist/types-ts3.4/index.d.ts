/// <reference path="../../../../node_modules/mux-embed/dist/types/mux-embed.d.ts" preserve="true" />
import MuxVideoElement from '@mux/mux-video';
import { MuxDataSDK } from '@mux/playback-core';
declare class MuxVideoAds extends MuxVideoElement {
    private "MuxVideoAds.#private";
    static getTemplateHTML: (attrs: Record<string, string>) => string;
    constructor();
    connectedCallback(): void;
    adTagUrl: string | undefined;
    readonly adBreak: boolean;
    onEnded(): void;
    handleEvent(event: Event): void;
    play(): Promise<void>;
    pause(): void;
    readonly paused: boolean;
    readonly duration: number;
    currentTime: number;
    volume: number;
    muted: boolean;
    readonly readyState: number;
    requestPictureInPicture(): Promise<PictureInPictureWindow>;
    readonly muxDataSDK: MuxDataSDK;
    readonly muxDataSDKOptions: {
        imaAdsLoader: google.ima.AdsLoader | undefined;
    };
    muxDataKeepSession: boolean;
    allowAdBlocker: boolean;
}
type MuxVideoAdsElementType = typeof MuxVideoAds;
declare global {
    var MuxVideoAds: MuxVideoAdsElementType;
}
export default MuxVideoAds;
