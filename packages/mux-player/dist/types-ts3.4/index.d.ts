import { MediaController } from 'media-chrome';
import 'media-chrome/dist/experimental/index.js';
import { MediaError } from '@mux/mux-video';
import { StreamTypes, PlaybackTypes, CmcdTypes, generatePlayerInitTime } from '@mux/playback-core';
import { ValueOf, Metadata, PlaybackEngine, MaxResolutionValue, MinResolutionValue, RenditionOrderValue, Chapter, CuePoint, Tokens } from '@mux/playback-core';
import VideoApiElement from './video-api';
import { AttributeTokenList } from './helpers';
import './themes/gerwig';
import { HlsConfig } from 'hls.js';
export { Tokens };
export { MediaError, generatePlayerInitTime };
export declare const playerSoftwareVersion: any;
export declare const playerSoftwareName = "mux-player";
export interface MuxPlayerElementEventMap extends HTMLVideoElementEventMap {
    cuepointchange: CustomEvent<{
        time: number;
        value: any;
    }>;
    cuepointschange: CustomEvent<Array<{
        time: number;
        value: any;
    }>>;
    chapterchange: CustomEvent<{
        startTime: number;
        endTime: number;
        value: string;
    }>;
}
interface MuxPlayerElement extends Pick<HTMLVideoElement, Exclude<keyof HTMLVideoElement, 'poster' | 'textTracks' | 'addTextTrack' | 'src' | 'videoTracks' | 'audioTracks' | 'audioRenditions' | 'videoRenditions'>> {
    addEventListener<K extends keyof MuxPlayerElementEventMap>(type: K, listener: (this: HTMLMediaElement, ev: MuxPlayerElementEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
    removeEventListener<K extends keyof MuxPlayerElementEventMap>(type: K, listener: (this: HTMLMediaElement, ev: MuxPlayerElementEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
    removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
}
declare class MuxPlayerElement extends VideoApiElement implements MuxPlayerElement {
    private "MuxPlayerElement.#private";
    allowAdBlocker: any;
    static readonly NAME: string;
    static readonly VERSION: any;
    static readonly observedAttributes: string[];
    constructor();
    readonly mediaTheme: Element | null | undefined;
    readonly mediaController: MediaController | null | undefined;
    connectedCallback(): void;
    attributeChangedCallback(attrName: string, oldValue: string | null, newValue: string): void;
    requestFullscreen(_options?: FullscreenOptions): Promise<void>;
    exitFullscreen(): Promise<void>;
    preferCmcd: ValueOf<CmcdTypes> | undefined;
    readonly hasPlayed: boolean;
    readonly inLiveWindow: boolean | undefined;
    readonly _hls: PlaybackEngine | undefined;
    readonly mux: Readonly<import("mux-embed").MuxOnVideoElement | import("mux-embed").DeletedMuxOnVideoElement | undefined>;
    /*
    * Gets the theme.
    
    
    * Sets the theme.
    */
    theme: string;
    /*
    * Get the theme attributes in a plain object (camelCase keys).
    * This doesn't include already defined attributes. e.g. streamType, disabled, etc.
    
    
    * Set the theme attributes via a plain object.
    */
    themeProps: Record<string, any> | undefined;
    /*
    * Get Mux asset playback id.
    
    
    * Set Mux asset playback id.
    */
    playbackId: string | undefined;
    /*
    * Get the string that reflects the src HTML attribute, which contains the URL of a media resource to use.
    
    
    * Set the string that reflects the src HTML attribute, which contains the URL of a media resource to use.
    */
    src: string | undefined;
    /*
    * Gets a URL of an image to display, for example, like a movie poster. This can be a still frame from the video, or another image if no video data is available.
    
    
    * Sets a URL of an image to display, for example, like a movie poster. This can be a still frame from the video, or another image if no video data is available.
    */
    poster: string | undefined;
    /*
    * Return the storyboard-src attribute URL
    
    
    * Set the storyboard-src attribute URL
    */
    storyboardSrc: string | undefined;
    /*
    * Return the storyboard URL when a playback ID or storyboard-src is provided,
    * we aren't an audio player and the stream-type isn't live.
    */
    readonly storyboard: string | undefined;
    /*
    * Gets the boolean indicator this is an audio player.
    
    
    * Sets the boolean indicator this is an audio player.
    */
    audio: boolean;
    readonly hotkeys: AttributeTokenList;
    nohotkeys: boolean;
    /*
    * Get the thumbnailTime offset used for the poster image.
    
    
    * Set the thumbnailTime offset used for the poster image.
    */
    thumbnailTime: number | undefined;
    /*
    * Get the video title shown in the player.
    
    
    * Set the video title shown in the player.
    */
    videoTitle: string;
    /*
    * Gets the data URL of a placeholder image shown before the thumbnail is loaded.
    
    
    * Sets the data URL of a placeholder image shown before the thumbnail is loaded.
    */
    placeholder: string;
    /*
    * Get the primary color used by the player.
    
    
    * Set the primary color used by the player.
    */
    primaryColor: string | undefined;
    /*
    * Get the secondary color used by the player.
    
    
    * Set the secondary color used by the player.
    */
    secondaryColor: string | undefined;
    /*
    * Get the accent color used by the player.
    
    
    * Set the accent color used by the player.
    */
    accentColor: string | undefined;
    defaultShowRemainingTime: boolean | undefined;
    /*
    * Get the playback rates applied to the playback rate control.
    
    
    * Set the playback rates applied to the playback rate control.
    */
    playbackRates: number[] | undefined;
    /*
    * Get the offset applied to the forward seek button.
    
    
    * Set the offset applied to the forward seek button.
    */
    forwardSeekOffset: number | undefined;
    /*
    * Get the offset applied to the backward seek button.
    
    
    * Set the offset applied to the forward seek button.
    */
    backwardSeekOffset: number | undefined;
    /*
    * Get the boolean value of default hidden captions.
    * By default returns false so captions are enabled on initial load.
    
    
    * Set the default hidden captions flag.
    */
    defaultHiddenCaptions: boolean | undefined;
    /*
    * Get the boolean value of default hidden captions.
    * By default returns false so captions are enabled on initial load.
    
    
    * Set the default hidden captions flag.
    */
    defaultDuration: number | undefined;
    playerInitTime: number | undefined;
    /*
    * Get the player software name. Used by Mux Data.
    */
    readonly playerSoftwareName: string;
    /*
    * Get the player software version. Used by Mux Data.
    */
    readonly playerSoftwareVersion: any;
    /*
    * Get the beacon collection domain. Used by Mux Data.
    
    
    * Set the beacon collection domain. Used by Mux Data.
    */
    beaconCollectionDomain: string | undefined;
    readonly adBreak: string | false;
    maxResolution: MaxResolutionValue | undefined;
    minResolution: MinResolutionValue | undefined;
    renditionOrder: RenditionOrderValue | undefined;
    programStartTime: number | undefined;
    programEndTime: number | undefined;
    assetStartTime: number | undefined;
    assetEndTime: number | undefined;
    extraSourceParams: Record<string, any>;
    /*
    * Get Mux asset custom domain.
    
    
    * Set Mux asset custom domain.
    */
    customDomain: string | undefined;
    /*
    * Get Mux Data env key.
    
    
    * Set Mux Data env key.
    */
    envKey: string | undefined;
    /*
    * Get no-volume-pref flag.
    
    
    * Set video engine debug flag.
    */
    noVolumePref: boolean;
    /*
    * Get video engine debug flag.
    
    
    * Set video engine debug flag.
    */
    debug: boolean;
    /*
    * Get video engine disable tracking flag.
    
    
    * Set video engine disable tracking flag.
    */
    disableTracking: boolean;
    /*
    * Get video engine disable cookies flag.
    
    
    * Set video engine disable cookies flag.
    */
    disableCookies: boolean;
    /*
    * Get stream type.
    
    
    * Set stream type.
    */
    streamType: string;
    defaultStreamType: ValueOf<StreamTypes> | undefined;
    targetLiveWindow: number | undefined;
    readonly liveEdgeStart: number | undefined;
    /*
    * Get the start time.
    
    
    * Set the start time.
    */
    startTime: number | undefined;
    preferPlayback: ValueOf<PlaybackTypes> | undefined;
    /*
    * Get the metadata object for Mux Data.
    
    
    * Set the metadata object for Mux Data.
    */
    metadata: Readonly<Metadata> | undefined;
    /*
    * Get the metadata object for Mux Data.
    
    
    * Set the metadata object for Mux Data.
    */
    _hlsConfig: Readonly<Partial<HlsConfig>> | undefined;
    addCuePoints<T = any>(cuePoints: CuePoint<T>[]): Promise<TextTrack | undefined>;
    readonly activeCuePoint: {
        time: number;
        value: any;
    } | undefined;
    readonly cuePoints: {
        time: number;
        value: any;
    }[];
    addChapters(chapters: Chapter[]): Promise<TextTrack> | undefined;
    readonly activeChapter: {
        startTime: number;
        endTime: number;
        value: string;
    } | undefined;
    readonly chapters: {
        startTime: number;
        endTime: number;
        value: string;
    }[];
    getStartDate(): Date | undefined;
    readonly currentPdt: Date | undefined;
    /*
    * Get the signing tokens for the Mux asset URL's.
    
    
    * Set the signing tokens for the Mux asset URL's.
    */
    tokens: Tokens;
    /*
    * Get the playback token for signing the src URL.
    
    
    * Set the playback token for signing the src URL.
    */
    playbackToken: string | undefined;
    /*
    * Get the playback token for signing the src URL.
    
    
    * Set the playback token for signing the src URL.
    */
    drmToken: string | undefined;
    /*
    * Get the thumbnail token for signing the poster URL.
    
    
    * Set the thumbnail token for signing the poster URL.
    */
    thumbnailToken: string | undefined;
    /*
    * Get the storyboard token for signing the storyboard URL.
    
    
    * Set the storyboard token for signing the storyboard URL.
    */
    storyboardToken: string | undefined;
    addTextTrack(kind: TextTrackKind, label: string, lang?: string, id?: string): TextTrack | undefined;
    removeTextTrack(track: TextTrack): void;
    readonly textTracks: TextTrackList | undefined;
    castReceiver: string | undefined;
    castCustomData: Record<string, any> | undefined;
    noTooltips: boolean;
    proudlyDisplayMuxBadge: boolean;
}
export declare function getVideoAttribute(el: MuxPlayerElement, name: string): string | null;
export default MuxPlayerElement;
