import { globalThis } from './polyfills';
import MuxVideoElement from '@mux/mux-video';
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
type PartialHTMLVideoElement = Pick<HTMLVideoElement, Exclude<keyof HTMLVideoElement, 'disablePictureInPicture' | 'height' | 'width' | 'error' | 'seeking' | 'onenterpictureinpicture' | 'onleavepictureinpicture' | 'load' | 'cancelVideoFrameCallback' | 'getVideoPlaybackQuality' | 'requestPictureInPicture' | 'requestVideoFrameCallback' | 'controls' | 'disableRemotePlayback' | 'mediaKeys' | 'networkState' | 'onencrypted' | 'onwaitingforkey' | 'played' | 'remote' | 'srcObject' | 'textTracks' | 'addTextTrack' | 'canPlayType' | 'fastSeek' | 'setMediaKeys' | 'HAVE_CURRENT_DATA' | 'HAVE_ENOUGH_DATA' | 'HAVE_FUTURE_DATA' | 'HAVE_METADATA' | 'HAVE_NOTHING' | 'NETWORK_EMPTY' | 'NETWORK_IDLE' | 'NETWORK_LOADING' | 'NETWORK_NO_SOURCE' | 'src' | 'poster' | 'mux'>>;
interface VideoApiElement extends PartialHTMLVideoElement, HTMLElement {
    addEventListener<K extends keyof HTMLVideoElementEventMap>(type: K, listener: (this: HTMLVideoElement, ev: HTMLVideoElementEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
    removeEventListener<K extends keyof HTMLVideoElementEventMap>(type: K, listener: (this: HTMLVideoElement, ev: HTMLVideoElementEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
    removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
}
declare class VideoApiElement extends globalThis.HTMLElement implements VideoApiElement {
    static readonly observedAttributes: string[];
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
    readonly muxVideoElement: string;
    readonly media: MuxVideoElementExt | null | undefined;
    readonly audioTracks: import("media-tracks").AudioTrackList;
    readonly videoTracks: import("media-tracks").VideoTrackList;
    readonly audioRenditions: import("media-tracks").AudioRenditionList;
    readonly videoRenditions: import("media-tracks").VideoRenditionList;
    readonly paused: boolean;
    readonly duration: number;
    readonly ended: boolean;
    readonly buffered: TimeRanges;
    readonly seekable: TimeRanges;
    readonly readyState: number;
    readonly videoWidth: number;
    readonly videoHeight: number;
    readonly currentSrc: string;
    currentTime: number;
    volume: number;
    playbackRate: number;
    defaultPlaybackRate: number;
    crossOrigin: string | null;
    autoplay: boolean;
    loop: boolean;
    muted: boolean;
    defaultMuted: boolean;
    playsInline: boolean;
    preload: HTMLVideoElement["preload"];
}
export default VideoApiElement;
