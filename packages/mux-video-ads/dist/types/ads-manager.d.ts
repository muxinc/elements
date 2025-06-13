/// <reference types="google_interactive_media_ads_types" preserve="true" />
import MuxVideoAdsElement from './index.js';
export type MuxAdManagerConfig = {
    videoElement: MuxVideoAdsElement;
    contentVideoElement: HTMLVideoElement;
    originalSize: DOMRect;
    adContainer: HTMLElement;
};
export declare class MuxAdManager {
    #private;
    constructor(config: MuxAdManagerConfig);
    setupAdsManager(): void;
    static isGoogleImaSDKAvailable(): boolean;
    isReadyForInitialization(): boolean | undefined;
    isInitialized(): google.ima.AdsManager | undefined;
    isReadyForComplete(): google.ima.AdsManager | undefined;
    initializeAdDisplayContainer(): void;
    requestAds(adTagUrl: string): void;
    contentComplete(): void;
    isAdPaused(): boolean | undefined;
    resumeAdManager(): void;
    pauseAdManager(): void;
    getDuration(): number | undefined;
    getCurrentTime(): number | undefined;
    getVolume(): number;
    setVolume(val: number): void;
    isUsingSameVideoElement(): boolean;
    updateViewMode(isFullscreen: boolean): void;
    updateAdsManagerSize(width: number, height: number): void;
    get adsLoader(): google.ima.AdsLoader | undefined;
}
