import { globalThis } from './polyfills';
import type MuxVideoElement from '@mux/mux-video';
export type CastOptions = {
    receiverApplicationId: string;
    autoJoinPolicy: string;
    androidReceiverCompatible: boolean;
    language: string;
    resumeSavedSession: boolean;
};
export type MuxVideoElementExt = MuxVideoElement & {
    requestCast(options: CastOptions): Promise<undefined>;
};
export declare const Attributes: {
    readonly VOLUME: string;
    readonly PLAYBACKRATE: string;
    readonly MUTED: string;
    readonly MUX_VIDEO_ELEMENT: string;
    readonly AUTOPLAY: "autoplay";
    readonly CROSSORIGIN: "crossorigin";
    readonly LOOP: "loop";
    readonly PLAYSINLINE: "playsinline";
    readonly PRELOAD: "preload";
};
export declare const AttributeNames: string[];
type PartialHTMLVideoElement = Omit<HTMLVideoElement, 'disablePictureInPicture' | 'height' | 'width' | 'error' | 'seeking' | 'onenterpictureinpicture' | 'onleavepictureinpicture' | 'load' | 'cancelVideoFrameCallback' | 'getVideoPlaybackQuality' | 'requestPictureInPicture' | 'requestVideoFrameCallback' | 'controls' | 'disableRemotePlayback' | 'mediaKeys' | 'networkState' | 'onencrypted' | 'onwaitingforkey' | 'played' | 'remote' | 'srcObject' | 'textTracks' | 'addTextTrack' | 'canPlayType' | 'fastSeek' | 'setMediaKeys' | 'HAVE_CURRENT_DATA' | 'HAVE_ENOUGH_DATA' | 'HAVE_FUTURE_DATA' | 'HAVE_METADATA' | 'HAVE_NOTHING' | 'NETWORK_EMPTY' | 'NETWORK_IDLE' | 'NETWORK_LOADING' | 'NETWORK_NO_SOURCE' | 'src' | 'poster' | 'mux'>;
interface VideoApiElement extends PartialHTMLVideoElement, HTMLElement {
    addEventListener<K extends keyof HTMLVideoElementEventMap>(type: K, listener: (this: HTMLVideoElement, ev: HTMLVideoElementEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
    removeEventListener<K extends keyof HTMLVideoElementEventMap>(type: K, listener: (this: HTMLVideoElement, ev: HTMLVideoElementEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
    removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
}
declare class VideoApiElement extends globalThis.HTMLElement implements VideoApiElement {
    static get observedAttributes(): string[];
    /**
     * Create a HTMLVideoElement like API with opt-in methods to expose publicly.
     * This class is intentionally not extending MuxVideoElement but composing it
     * to opt in methods and not expose too much. More flexibility in the future.
     */
    constructor();
    /**
     * Gets called from mux-player when mux-video is rendered and upgraded.
     * We might just merge VideoApiElement in MuxPlayerElement and remove this?
     */
    init(): void;
    attributeChangedCallback(attrName: string, _oldValue: string | null, newValue: string): void;
    play(): Promise<void>;
    pause(): void;
    load(): void;
    requestCast(options: CastOptions): Promise<undefined> | undefined;
    get muxVideoElement(): string;
    get media(): MuxVideoElementExt | null | undefined;
    get audioTracks(): import("media-tracks").AudioTrackList;
    get videoTracks(): import("media-tracks").VideoTrackList;
    get audioRenditions(): import("media-tracks").AudioRenditionList;
    get videoRenditions(): import("media-tracks").VideoRenditionList;
    get paused(): boolean;
    get duration(): number;
    get ended(): boolean;
    get buffered(): TimeRanges;
    get seekable(): TimeRanges;
    get readyState(): number;
    get videoWidth(): number;
    get videoHeight(): number;
    get currentSrc(): string;
    get currentTime(): number;
    set currentTime(val: number);
    get volume(): number;
    set volume(val: number);
    get playbackRate(): number;
    set playbackRate(val: number);
    get defaultPlaybackRate(): number;
    set defaultPlaybackRate(val: number);
    get crossOrigin(): string | null;
    set crossOrigin(val: string | null);
    get autoplay(): boolean;
    set autoplay(val: boolean);
    get loop(): boolean;
    set loop(val: boolean);
    get muted(): boolean;
    set muted(val: boolean);
    get defaultMuted(): boolean;
    set defaultMuted(val: boolean);
    get playsInline(): boolean;
    set playsInline(val: boolean);
    get preload(): HTMLVideoElement["preload"];
    set preload(val: HTMLVideoElement["preload"]);
}
export default VideoApiElement;
