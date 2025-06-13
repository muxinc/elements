import { MediaController } from 'media-chrome';
import 'media-chrome/dist/experimental/index.js';
import { MediaError } from '@mux/mux-video';
import { StreamTypes, PlaybackTypes, CmcdTypes, generatePlayerInitTime } from '@mux/playback-core';
import type { ValueOf, Metadata, PlaybackEngine, MaxResolutionValue, MinResolutionValue, RenditionOrderValue, Chapter, CuePoint, Tokens } from '@mux/playback-core';
import VideoApiElement from './video-api';
import { AttributeTokenList } from './helpers';
import './themes/gerwig';
import { HlsConfig } from 'hls.js';
export type { Tokens };
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
interface MuxPlayerElement extends Omit<HTMLVideoElement, 'poster' | 'textTracks' | 'addTextTrack' | 'src' | 'videoTracks' | 'audioTracks' | 'audioRenditions' | 'videoRenditions'> {
    addEventListener<K extends keyof MuxPlayerElementEventMap>(type: K, listener: (this: HTMLMediaElement, ev: MuxPlayerElementEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
    removeEventListener<K extends keyof MuxPlayerElementEventMap>(type: K, listener: (this: HTMLMediaElement, ev: MuxPlayerElementEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
    removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
}
declare class MuxPlayerElement extends VideoApiElement implements MuxPlayerElement {
    #private;
    allowAdBlocker: any;
    static get NAME(): string;
    static get VERSION(): any;
    static get observedAttributes(): string[];
    constructor();
    get mediaTheme(): Element | null | undefined;
    get mediaController(): MediaController | null | undefined;
    connectedCallback(): void;
    attributeChangedCallback(attrName: string, oldValue: string | null, newValue: string): void;
    requestFullscreen(_options?: FullscreenOptions): Promise<void>;
    exitFullscreen(): Promise<void>;
    get preferCmcd(): ValueOf<CmcdTypes> | undefined;
    set preferCmcd(value: ValueOf<CmcdTypes> | undefined);
    get hasPlayed(): boolean;
    get inLiveWindow(): boolean | undefined;
    get _hls(): PlaybackEngine | undefined;
    get mux(): Readonly<import("mux-embed").MuxOnVideoElement | import("mux-embed").DeletedMuxOnVideoElement | undefined>;
    /**
     * Gets the theme.
     */
    get theme(): string;
    /**
     * Sets the theme.
     */
    set theme(val: string);
    /**
     * Get the theme attributes in a plain object (camelCase keys).
     * This doesn't include already defined attributes. e.g. streamType, disabled, etc.
     */
    get themeProps(): Record<string, any> | undefined;
    /**
     * Set the theme attributes via a plain object.
     */
    set themeProps(props: Record<string, any> | undefined);
    /**
     * Get Mux asset playback id.
     */
    get playbackId(): string | undefined;
    /**
     * Set Mux asset playback id.
     */
    set playbackId(val: string | undefined);
    /**
     * Get the string that reflects the src HTML attribute, which contains the URL of a media resource to use.
     */
    get src(): string | undefined;
    /**
     * Set the string that reflects the src HTML attribute, which contains the URL of a media resource to use.
     */
    set src(val: string | undefined);
    /**
     * Gets a URL of an image to display, for example, like a movie poster. This can be a still frame from the video, or another image if no video data is available.
     */
    get poster(): string | undefined;
    /**
     * Sets a URL of an image to display, for example, like a movie poster. This can be a still frame from the video, or another image if no video data is available.
     */
    set poster(val: string | undefined);
    /**
     * Return the storyboard-src attribute URL
     */
    get storyboardSrc(): string | undefined;
    /**
     * Set the storyboard-src attribute URL
     */
    set storyboardSrc(src: string | undefined);
    /**
     * Return the storyboard URL when a playback ID or storyboard-src is provided,
     * we aren't an audio player and the stream-type isn't live.
     */
    get storyboard(): string | undefined;
    /**
     * Gets the boolean indicator this is an audio player.
     */
    get audio(): boolean;
    /**
     * Sets the boolean indicator this is an audio player.
     */
    set audio(val: boolean);
    get hotkeys(): AttributeTokenList;
    get nohotkeys(): boolean;
    set nohotkeys(val: boolean);
    /**
     * Get the thumbnailTime offset used for the poster image.
     */
    get thumbnailTime(): number | undefined;
    /**
     * Set the thumbnailTime offset used for the poster image.
     */
    set thumbnailTime(val: number | undefined);
    /**
     * Get the video title shown in the player.
     */
    get videoTitle(): string;
    /**
     * Set the video title shown in the player.
     */
    set videoTitle(val: string);
    /**
     * Gets the data URL of a placeholder image shown before the thumbnail is loaded.
     */
    get placeholder(): string;
    /**
     * Sets the data URL of a placeholder image shown before the thumbnail is loaded.
     */
    set placeholder(val: string);
    /**
     * Get the primary color used by the player.
     */
    get primaryColor(): string | undefined;
    /**
     * Set the primary color used by the player.
     */
    set primaryColor(val: string | undefined);
    /**
     * Get the secondary color used by the player.
     */
    get secondaryColor(): string | undefined;
    /**
     * Set the secondary color used by the player.
     */
    set secondaryColor(val: string | undefined);
    /**
     * Get the accent color used by the player.
     */
    get accentColor(): string | undefined;
    /**
     * Set the accent color used by the player.
     */
    set accentColor(val: string | undefined);
    get defaultShowRemainingTime(): boolean | undefined;
    set defaultShowRemainingTime(val: boolean | undefined);
    /**
     * Get the playback rates applied to the playback rate control.
     */
    get playbackRates(): number[] | undefined;
    /**
     * Set the playback rates applied to the playback rate control.
     */
    set playbackRates(val: number[] | undefined);
    /**
     * Get the offset applied to the forward seek button.
     */
    get forwardSeekOffset(): number | undefined;
    /**
     * Set the offset applied to the forward seek button.
     */
    set forwardSeekOffset(val: number | undefined);
    /**
     * Get the offset applied to the backward seek button.
     */
    get backwardSeekOffset(): number | undefined;
    /**
     * Set the offset applied to the forward seek button.
     */
    set backwardSeekOffset(val: number | undefined);
    /**
     * Get the boolean value of default hidden captions.
     * By default returns false so captions are enabled on initial load.
     */
    get defaultHiddenCaptions(): boolean | undefined;
    /**
     * Set the default hidden captions flag.
     */
    set defaultHiddenCaptions(val: boolean | undefined);
    /**
     * Get the boolean value of default hidden captions.
     * By default returns false so captions are enabled on initial load.
     */
    get defaultDuration(): number | undefined;
    /**
     * Set the default hidden captions flag.
     */
    set defaultDuration(val: number | undefined);
    get playerInitTime(): number | undefined;
    set playerInitTime(val: number | undefined);
    /**
     * Get the player software name. Used by Mux Data.
     */
    get playerSoftwareName(): string;
    /**
     * Get the player software version. Used by Mux Data.
     */
    get playerSoftwareVersion(): any;
    /**
     * Get the beacon collection domain. Used by Mux Data.
     */
    get beaconCollectionDomain(): string | undefined;
    /**
     * Set the beacon collection domain. Used by Mux Data.
     */
    set beaconCollectionDomain(val: string | undefined);
    get adBreak(): string | false;
    get maxResolution(): MaxResolutionValue | undefined;
    set maxResolution(val: MaxResolutionValue | undefined);
    get minResolution(): MinResolutionValue | undefined;
    set minResolution(val: MinResolutionValue | undefined);
    get renditionOrder(): RenditionOrderValue | undefined;
    set renditionOrder(val: RenditionOrderValue | undefined);
    get programStartTime(): number | undefined;
    set programStartTime(val: number | undefined);
    get programEndTime(): number | undefined;
    set programEndTime(val: number | undefined);
    get assetStartTime(): number | undefined;
    set assetStartTime(val: number | undefined);
    get assetEndTime(): number | undefined;
    set assetEndTime(val: number | undefined);
    get extraSourceParams(): Record<string, any>;
    set extraSourceParams(value: Record<string, any>);
    /**
     * Get Mux asset custom domain.
     */
    get customDomain(): string | undefined;
    /**
     * Set Mux asset custom domain.
     */
    set customDomain(val: string | undefined);
    /**
     * Get Mux Data env key.
     */
    get envKey(): string | undefined;
    /**
     * Set Mux Data env key.
     */
    set envKey(val: string | undefined);
    /**
     * Get no-volume-pref flag.
     */
    get noVolumePref(): boolean;
    /**
     * Set video engine debug flag.
     */
    set noVolumePref(val: boolean);
    /**
     * Get video engine debug flag.
     */
    get debug(): boolean;
    /**
     * Set video engine debug flag.
     */
    set debug(val: boolean);
    /**
     * Get video engine disable tracking flag.
     */
    get disableTracking(): boolean;
    /**
     * Set video engine disable tracking flag.
     */
    set disableTracking(val: boolean);
    /**
     * Get video engine disable cookies flag.
     */
    get disableCookies(): boolean;
    /**
     * Set video engine disable cookies flag.
     */
    set disableCookies(val: boolean);
    /**
     * Get stream type.
     */
    get streamType(): string;
    /**
     * Set stream type.
     */
    set streamType(val: string);
    get defaultStreamType(): ValueOf<StreamTypes> | undefined;
    set defaultStreamType(val: ValueOf<StreamTypes> | undefined);
    get targetLiveWindow(): number | undefined;
    set targetLiveWindow(val: number | undefined);
    get liveEdgeStart(): number | undefined;
    /**
     * Get the start time.
     */
    get startTime(): number | undefined;
    /**
     * Set the start time.
     */
    set startTime(val: number | undefined);
    get preferPlayback(): ValueOf<PlaybackTypes> | undefined;
    set preferPlayback(val: ValueOf<PlaybackTypes> | undefined);
    /**
     * Get the metadata object for Mux Data.
     */
    get metadata(): Readonly<Metadata> | undefined;
    /**
     * Set the metadata object for Mux Data.
     */
    set metadata(val: Readonly<Metadata> | undefined);
    /**
     * Get the metadata object for Mux Data.
     */
    get _hlsConfig(): Readonly<Partial<HlsConfig>> | undefined;
    /**
     * Set the metadata object for Mux Data.
     */
    set _hlsConfig(val: Readonly<Partial<HlsConfig>> | undefined);
    addCuePoints<T = any>(cuePoints: CuePoint<T>[]): Promise<TextTrack | undefined>;
    get activeCuePoint(): {
        time: number;
        value: any;
    } | undefined;
    get cuePoints(): {
        time: number;
        value: any;
    }[];
    addChapters(chapters: Chapter[]): Promise<TextTrack> | undefined;
    get activeChapter(): {
        startTime: number;
        endTime: number;
        value: string;
    } | undefined;
    get chapters(): {
        startTime: number;
        endTime: number;
        value: string;
    }[];
    getStartDate(): Date | undefined;
    get currentPdt(): Date | undefined;
    /**
     * Get the signing tokens for the Mux asset URL's.
     */
    get tokens(): Tokens;
    /**
     * Set the signing tokens for the Mux asset URL's.
     */
    set tokens(val: Tokens | undefined);
    /**
     * Get the playback token for signing the src URL.
     */
    get playbackToken(): string | undefined;
    /**
     * Set the playback token for signing the src URL.
     */
    set playbackToken(val: string | undefined);
    /**
     * Get the playback token for signing the src URL.
     */
    get drmToken(): string | undefined;
    /**
     * Set the playback token for signing the src URL.
     */
    set drmToken(val: string | undefined);
    /**
     * Get the thumbnail token for signing the poster URL.
     */
    get thumbnailToken(): string | undefined;
    /**
     * Set the thumbnail token for signing the poster URL.
     */
    set thumbnailToken(val: string | undefined);
    /**
     * Get the storyboard token for signing the storyboard URL.
     */
    get storyboardToken(): string | undefined;
    /**
     * Set the storyboard token for signing the storyboard URL.
     */
    set storyboardToken(val: string | undefined);
    addTextTrack(kind: TextTrackKind, label: string, lang?: string, id?: string): TextTrack | undefined;
    removeTextTrack(track: TextTrack): void;
    get textTracks(): TextTrackList | undefined;
    get castReceiver(): string | undefined;
    set castReceiver(val: string | undefined);
    get castCustomData(): Record<string, any> | undefined;
    set castCustomData(val: Record<string, any> | undefined);
    get noTooltips(): boolean;
    set noTooltips(val: boolean);
    get proudlyDisplayMuxBadge(): boolean;
    set proudlyDisplayMuxBadge(val: boolean);
}
export declare function getVideoAttribute(el: MuxPlayerElement, name: string): string | null;
export default MuxPlayerElement;
