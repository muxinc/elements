declare module 'mux-embed' {
  import Hls from 'hls.js';
  // import dashjs from 'dashjs';

  export type MetaData = {
    /**
     * Your environment key from the Mux dashboard.
     */
    env_key?: string;
    /**
     * Your internal ID for the video
     */
    video_id?: string;
    /**
     * Title of the video player (e.g.: 'Awesome Show: Pilot')
     */
    video_title?: string;
    /**
     * An ID representing the viewer who is watching the stream. Use this to look up video views for an individual viewer. If no value is specified, a unique ID will be generated by the SDK. Note: You should not use any value that is personally identifiable on its own (such as email address, username, etc). Instead, you should supply an anonymized viewer ID which you have stored within your own system.
     */
    viewer_user_id?: string;
    /**
     * You can use this field to separate views into different experiments, if you would like to filter by this dimension later. This should be a string value, but your account is limited to a total of 10 unique experiment names, so be sure that this value is not generated dynamically or randomly.
     */
    experiment_name?: string;
    /**
     * Provide the context of the page for more specific analysis. Values include watchpage, iframe, or leave empty. watchpage — A web page that is dedicated to playing a specific video (for example youtube.com/watch/ID or hulu.com/watch/ID) iframe — An iframe specifically used to embed a player on different sites/pages
     */
    page_type?: string;
    /**
     * If you are explicitly loading your player in page (perhaps as a response to a user interaction), include the timestamp (milliseconds since Jan 1 1970) when you initialize the player (or for HTML5 video, when right before you add the element to the DOM) in order to accurately track page load time and player startup time.
     */
    player_init_time?: number;
    /**
     * You can provide a name for the player if you want to compare different configurations or types of players around your site or application. This is different from the player software (e.g. Video.js), which is tracked automatically by the SDK.
     */
    player_name?: string;
    /**
     * As you make changes to your player you can compare how new versions of your player perform. This is not the player software version (e.g. Video.js 5.0.0), which is tracked automatically by the SDK.
     */
    player_version?: string;
    /**
     * A sub property is an optional way to group data within a property. For example, sub properties may be used by a video platform to group data by its own customers, or a media company might use them to distinguish between its many websites.
     */
    sub_property_id?: string;
    /**
     * The Content Delivery Network used to deliver the video. If using an SDK that supports CDN header extraction, this value will be auto-populated.
     */
    video_cdn?: string;
    /**
     * The type of content: 'short', 'movie', 'episode', 'clip', 'trailer', or 'event'
     */
    video_content_type?: string;
    /**
     * The length of the video in milliseconds
     */
    video_duration?: number;
    /**
     * Allows you to compare different encoders or encoding settings. This could designate the encoder used (e.g. `x264`, `hevc`, or `av1`), the preset used (e.g. 'av1-0', 'av1-4', or 'av1-8'), or other properties of the encoding you want to track.
     */
    video_encoding_variant?: string;
    /**
     * The audio language of the video, assuming it's unchangeable after playing.
     */
    video_language_code?: string;
    /**
     * The producer of the video title
     */
    video_producer?: string;
    /**
     * The series of the video (e.g.: 'Season 1')
     */
    video_series?: string;
    /**
     * The type of video stream (e.g: 'live' or 'on-demand')
     */
    video_stream_type?: string;
    /**
     * Allows you to monitor issues with the files of specific versions of the content, for example different audio translations or versions with hard-coded/burned-in subtitles.
     */
    video_variant_name?: string;
    /**
     * Your internal ID for a video variant
     */
    video_variant_id?: string;
    /**
     * An ID that can be used to correlate the view with platform services upstream such as CDN or origin logs.
     */
    view_session_id?: string;
    /**
     * Custom metadata field 1
     */
    custom_1?: string;
    /**
     * Custom metadata field 2
     */
    custom_2?: string;
    /**
     * Custom metadata field 3
     */
    custom_3?: string;
    /**
     * Custom metadata field 4
     */
    custom_4?: string;
    /**
     * Custom metadata field 5
     */
    custom_5?: string;
    /**
     *  Browser used for the video view (Safari, Chrome, etc.) NB: `(viewer_application_name)`
     */
    browser?: string;
    /**
     *  Browser version (e.g. Chrome 66.0.3359.158) NB: `(viewer_application_version)`
     */
    browser_version?: string;
    /**
     *  CDN delivering the video view (either determined by Mux (network metrics), or provided as video_cdn (Custom Metadata))
     */
    cdn?: string;
    /**
     *  Operating System (iOS, Windows, etc) NB: `(viewer_os_family)`
     */
    operating_system?: string;
    /**
     *  Operating System version (e.g. OS X 10.6) NB: `(viewer_os_version)`
     */
    operating_system_version?: string;
    /**
     *  Page URL
     */
    page_url?: string;
    /**
     *  Indicates whether the player was set to autoplay the video or not. This tracks whether the video has `autoplay=true` set; it is not always able to tell if the browser disregarded the setting, otherwise prevented the video from playing, or if the video play was triggered via a script.
     */
    player_autoplay?: boolean;
    /**
     *  Height of the player as displayed in page, in pixels
     */
    player_height?: number;
    /**
     *  Identifies the instance of the Player class that is created when a video is initialized
     */
    player_instance_id?: string;
    /**
     *  Player's text language
     */
    player_language?: string;
    /**
     *  The image shown as the pre-visualisation before play
     */
    player_poster?: string;
    /**
     *  Specifies if the player was configured to load the video when the page loads.
     */
    player_preload?: boolean;
    /**
     *  If the video is remote played to AirPlay as specified by the SDK.
     */
    player_remote_played?: boolean;
    /**
     *  Player Software being used to play the Video (e.g. Video.js, JW Player, etc.)
     */
    player_software?: string;
    /**
     *  Player Software Version (e.g. 2.45.5)
     */
    player_software_version?: string;
    /**
     *  Player Software Name (e.g. MuxPlayer)
     */
    player_software_name?: string;
    /**
     *  Height of the source video being sent to the player, in pixels
     */
    player_source_height?: number;
    /**
     *  Width of the source video being as seen by the player
     */
    player_source_width?: number;
    /**
     *  Width of the player as displayed in page, in pixels
     */
    player_width?: number;
    /**
     *  Format of the source, as determined by the player. E.g. 'dash', 'x-application/mpegUrl', 'mp4', etc.
     */
    source_type?: string;
    /**
     *  Indicates whether the viewer used full screen to watch the video.
     */
    used_fullscreen?: boolean;
    /**
     *  The type of connection used by the player, as reported by the client when available: `cellular`, `other`, `wifi`, `wired`
     */
    viewer_connection_type?: string;
    /**
     *  The form factor of the device: `tv`, `phone`, `tablet`, etc.
     */
    viewer_device_category?: string;
    /**
     *  Device Manufacturer (e.g. Apple, Microsoft)
     */
    viewer_device_manufacturer?: string;
    /**
     *  Device Name (e.g. iPhone)
     */
    viewer_device_name?: string;
  };

  type MuxEvents = {
    /**
     * Internal event that is used to provide periodic updates on the playback state, while the player is not paused. Each core library emits heartbeat events (hb) automatically, and custom integrations should not need to emit this.
     */
    HEARTBEAT: 'hb';
    /**
     * Fired when the player is ready to be used.
     */
    PLAYER_READY: 'playerready';
    /**
     * Signals that a new view is beginning and should be recorded. This must be called first before any additional playback events. Note that this should only be emitted for the first view within a player; for a change of videos within the same player, {@link MuxEvents.VIDEO_CHANGE `videochange`} should be used.
     */
    VIEW_INIT: 'viewinit';
    /**
     * Signals that the video being played in the player has changed. This must be called if a new video is loaded within the same player. The event should be fired immediately after the new video has been given to the player.
     */
    VIDEO_CHANGE: 'videochange';
    /**
     * Signals that the player is beginning its attempt to play back the video. The video is not yet showing on the screen (or moving forward in the case of a resume). The buffer may be empty or full depending on the pre-loading strategy.
     *
     * For the HTML5 video element, this correlates to the play event on the video element.
     *
     * For ad playback, once resuming from the ad break, the `play` event should be fired immediately after the {@link MuxEvents.AD_BREAK_END `adbreakend`} event, assuming the player will continue playing content after the ad break without interaction from the viewer.
     */
    PLAY: 'play';
    /**
     * Signals that playback has been intentionally delayed, either by the viewer or by the player (e.g. starting an ad).
     *
     * For the HTML5 video element, this correlates to the pause event on the video element.
     *
     * In the case of playback breaking to play an ad, the `pause` event should be fired just before the {@link MuxEvents.AD_BREAK_START `adbreakstart`} event is fired.
     */
    PAUSE: 'pause';
    /**
     * Signals that the video is now actually playing. The buffer is full enough that the player has decided it can start showing frames. In other words, this is when the first moving frame is displayed to the end user.
     *
     * For the HTML5 video element, this correlates to the playing event on the video element.
     */
    PLAYING: 'playing';
    /**
     * Signals that the playback has advanced some non-zero amount forward. This event should be emitted at least every 250 milliseconds, but can be sent more often than this.
     */
    TIME_UPDATE: 'timeupdate';
    /**
     * Signals that the user has attempted to seek forward or backward within the timeline of the video.
     */
    SEEKING: 'seeking';
    /**
     * Signals that the player has the video data for the new playback position, and is ready to immediately start playing at this new position.
     */
    SEEKED: 'seeked';
    /**
     * Signals that the player has stopped playing back content when it is expected that playback should be progressing.
     */
    REBUFFER_START: 'rebufferstart';
    /**
     * Signals that the player has resumed playing back content after playback previous stalled while attempting to play back.
     */
    REBUFFER_END: 'rebufferend';
    /**
     * Signals that the player has encountered a fatal playback error. It is important that this is emitted only for errors that are fatal (i.e. not recoverable), as this will mark the view as a playback failure within Mux.
     */
    ERROR: 'error';
    /**
     * Signals that the current video has played to completion.
     */
    ENDED: 'ended';
    /**
     * Signals that the current rendition that is actively being played has changed. Note that this event should be triggered when the playing rendition changes, not necessarily when the player logic has started requesting a different rendition.
     */
    RENDITION_CHANGE: 'renditionchange';
    /**
     * Signals that a device orientation has been changed during the view. On most platforms this information is not available directly to the player SDK so the customer implementation will notify the Mux SDK when the orientation is changed and Mux will fire an event based on the notification.
     */
    ORIENTATION_CHANGE: 'orientationchange';
    /**
     * Signals that an ad request is about to be made, or was just made but the response has not been received.
     *
     * In the process of the player retrieving an ad payload,
     * multiple {@link MuxEvents.AD_REQUEST `adrequest`} and {@link MuxEvents.AD_RESPONSE `adresponse`} events may be fired (either due to waterfall,
     * or for an ad break that has multiple ads). In the case that these requests are made in parallel,
     * the player integration must send an `ad_request_id` in the data along with each {@link MuxEvents.AD_REQUEST `adrequest`} and {@link MuxEvents.AD_RESPONSE `adresponse`} event,
     * so that Mux can match them up correctly.
     */
    AD_REQUEST: 'adrequest';
    /**
     * Signals that a response was received from the ad server.
     *
     * In the process of the player retrieving an ad payload,
     * multiple {@link MuxEvents.AD_REQUEST `adrequest`} and {@link MuxEvents.AD_RESPONSE `adresponse`} events may be fired (either due to waterfall,
     * or for an ad break that has multiple ads). In the case that these requests are made in parallel,
     * the player integration must send an `ad_request_id` in the data along with each {@link MuxEvents.AD_REQUEST `adrequest`} and {@link MuxEvents.AD_RESPONSE `adresponse`} event,
     * so that Mux can match them up correctly.
     *
     * The adresponse event can only be fired by the player integration if the adrequest events are fired as well.
     */
    AD_RESPONSE: 'adresponse';
    /**
     * Signals that an ad break has begun. This coincides with the playback of the video being paused in order to display the ads at the current position. This event should come immediately after the pause event is fired due to attempting to play back an ad break, and before any adplay, adplaying, adpause, or adended.
     *
     * The `adbreakstart` event may come before, during, or after the adrequest/adresponse events, depending on the player’s configuration for making ad requests.
     */
    AD_BREAK_START: 'adbreakstart';
    /**
     * Signals that the player is beginning its attempt to play back an individual advertisement video. The ad is not yet showing on the screen (or moving forward in the case of a resume). The buffer may be empty or full depending on the pre-loading strategy.
     *
     * This event is the ad-specific equivalent of play.
     */
    AD_PLAY: 'adplay';
    /**
     * Signals that an advertisement is now actually playing. The buffer is full enough that the player has decided it can start showing frames for the ad.
     *
     * This event is the ad-specific equivalent of playing.
     */
    AD_PLAYING: 'adplaying';
    /**
     * Signals that playback of an advertisement has been intentionally delayed, either by the viewer or by the player (e.g. user pressing pause on the ad player controls).
     *
     * This event is the ad-specific equivalent of pause.
     */
    AD_PAUSE: 'adpause';
    /**
     * Signals that the current advertisement has progressed past the first quartile in playback. This event should coincide with the point in time that the ad integration would fire the firstQuartile ad tracking beacon (in VAST terminology).
     */
    AD_FIRST_QUARTILE: 'adfirstquartile';
    /**
     * Signals that the current advertisement has progressed past the midpoint in playback. This event should coincide with the point in time that the ad integration would fire the midpoint ad tracking beacon (in VAST terminology).
     */
    AD_MID_POINT: 'admidpoint';
    /**
     * Signals that the current advertisement has progressed past the third quartile in playback. This event should coincide with the point in time that the ad integration would fire the thirdQuartile ad tracking beacon (in VAST terminology).
     */
    AD_THIRD_QUARTILE: 'adthirdquartile';
    /**
     * Signals that the advertisement has played to completion.
     *
     * This event is the ad-specific equivalent of ended.
     */
    AD_ENDED: 'adended';
    /**
     * Signals that all ads in the ad break have completed, and playback is about to resume on the main content. This event should be come immediately after the last adended event in the ad break, and before the resuming play event signifying that playback of the main content is resuming.
     *
     * There may be multiple adplay/adended combinations within a single ad break.
     */
    AD_BREAK_END: 'adbreakend';
    /**
     * Signals that an error has occurred that relates to the ad break currently in play or the ad request/response.
     */
    AD_ERROR: 'aderror';
    /**
     * Signals that a network request for a piece of content returned successfully.
     */
    REQUEST_COMPLETED: 'requestcompleted';
    /**
     * Signals that a network request for a piece of content returned unsuccessfully.
     */
    REQUEST_FAILED: 'requestfailed';
    /**
     * Signals that a network request for a piece of content was aborted before it could return (either successfully or unsuccessfully).
     */
    REQUEST_CANCELLED: 'requestcanceled';
  };

  export type Options = {
    /**
     * Controls whether debug log statements are logged to the console
     */
    debug?: boolean;
    hlsjs?: Hls;
    Hls?: typeof Hls;
    data?: MetaData;
    disableCookies?: boolean;
    /** @deprecated */
    beaconDomain?: string;
    beaconCollectionDomain?: string;
    /**
     * Respect 'Do Not Track' when set within browsers.
     */
    respectDoNotTrack?: boolean;
    /**
     * In the case that you want full control over what errors are counted as fatal or not, you may want to consider turning off Mux's automatic error tracking completely. This can be done by passing `automaticErrorTracking: false` in the configuration object.
     */
    automaticErrorTracking?: boolean;
    /**
     * If your player emits error events that are not fatal to playback or the errors are unclear and/or do not have helpful information in the default error message and codes you might find it helpful to use an error translator or disable automatic error tracking all together.
     */
    errorTranslator?: (error: ErrorEvent) => ErrorEvent | false;
  };

  export type AdEventTag = {
    ad_request_id?: string;
    ad_tag_url?: string;
  };

  export type AdEventAssets = {
    ad_asset_url?: string;
  };

  export type ErrorEvent = {
    player_error_code?: number;
    player_error_message?: string;
  };

  export type TimeUpdateEvent = {
    player_playhead_time?: number;
  };

  export type RenditionChangeEvent = {
    video_source_bitrate: number;
    video_source_width?: number;
    video_source_height?: number;
  };

  export type OrientationChangeEvent = {
    viewer_device_orientation: [number, number, number];
  };

  export type RequestCompletedEvent = {
    request_bytes_loaded?: number;
    request_response_start?: number;
    request_response_end?: number;
    request_response_headers?: Partial<Headers>;
    request_media_duration?: number;
    request_video_width?: number;
    request_video_height?: number;
  };

  export type RequestFailedEvent = {
    request_error: string;
    request_error_code: number;
    request_error_text: string;
  };

  export type NetworkEvent = {
    request_type?: 'manifest' | 'video' | 'audio' | 'video_init' | 'audio_init' | 'media';
    request_start?: number;
    request_hostname?: string;
  };

  type EventParamsMap = {
    [events.HEARTBEAT]: Partial<MetaData>;
    [events.VIEW_INIT]: void;
    [events.VIDEO_CHANGE]: void;
    [events.PLAY]: void;
    [events.PAUSE]: void;
    [events.PLAYING]: void;
    // This appears to be wrong (duplicate with mismatch below, which appears to be right from mux-embed)
    // [events.TIME_UPDATE]: void;
    [events.SEEKING]: void;
    [events.SEEKED]: void;
    [events.REBUFFER_START]: void;
    [events.REBUFFER_END]: void;
    [events.ERROR]: ErrorEvent;
    [events.ENDED]: void;
    [events.RENDITION_CHANGE]: RenditionChangeEvent;
    [events.ORIENTATION_CHANGE]: OrientationChangeEvent;
    [events.AD_REQUEST]: AdEventTag;
    [events.AD_RESPONSE]: AdEventTag;
    [events.AD_BREAK_START]: void;
    [events.AD_PLAY]: AdEventAssets;
    [events.AD_PLAYING]: AdEventAssets;
    [events.AD_PAUSE]: AdEventAssets;
    [events.AD_FIRST_QUARTILE]: void;
    [events.AD_MID_POINT]: void;
    [events.AD_THIRD_QUARTILE]: void;
    [events.AD_ENDED]: AdEventAssets;
    [events.AD_BREAK_END]: void;
    [events.AD_ERROR]: void;
    [events.REQUEST_COMPLETED]: RequestCompletedEvent & NetworkEvent;
    [events.REQUEST_FAILED]: RequestFailedEvent & NetworkEvent;
    [events.REQUEST_CANCELLED]: NetworkEvent;
    [events.TIME_UPDATE]: TimeUpdateEvent;
  };

  type PlayerId = string | HTMLMediaElement;

  /**
   * Monitor a video element
   */
  export function monitor(id: PlayerId, options?: Options): void;

  /**
   * Create a new generic player monitor
   */
  export function init(id: PlayerId, options?: Options): void;

  /**
   * Stop monitoring a normal video element
   */
  export function destroyMonitor(playerId: PlayerId): void;

  export type HlsOptions = {
    hlsjs: Hls;
    Hls?: typeof Hls;
  };

  // export type DashOptions = {
  //   dashjs: dashjs;
  //   Dash?: typeof dashjs;
  // };
  export function addHLSJS(playerId: PlayerId, options: HlsOptions): void;
  // export function addDashJS(playerId: PlayerId, options: DashOptions): void;
  export function removeHLSJS(playerId: PlayerId): void;
  // export function removeDashJS(playerId: PlayerId): void;

  /**
   * Emit an event to update the state of a player monitor.
   */
  export function emit<K extends MuxEvents[keyof MuxEvents] & keyof EventParamsMap>(
    playerId: PlayerId,
    type: K,
    payload?: EventParamsMap[K]
  ): void;

  // Public Utils
  type Headers = {
    'x-cdn': string;
    'content-type': string;
  };
  type HostnameDomain = [string, string?] | undefined;
  type publicUtils = {
    safeCall<Type, Key extends keyof Type>(object: Type, method: Key, arguments: any[]): any;
    safeIncrement<Type, Key extends keyof Type>(object: Type, prop: Key, num?: number): void;
    getComputedStyle<Key extends keyof CSSStyleDeclaration>(
      el: HTMLElement,
      prop: Key
    ): ReturnType<CSSStyleDeclaration['getPropertyValue']>;
    secondsToMs(seconds: number): number;
    headersStringToObject(headers: string): Partial<Headers>;
    extractHostnameAndDomain(url: string): HostnameDomain;
    extractHostname(url: string): HostnameDomain;
    generateUUID(): string;
    now(): number;
  };

  export const utils: publicUtils;

  export const events: MuxEvents;

  global {
    type MuxOnVideoElement = {
      deleted: false;
      destroy: () => void;
      swapElement: (playerId: PlayerId) => void;
      emit: <K extends MuxEvents[keyof MuxEvents] & keyof EventParamsMap>(type: K, payload?: EventParamsMap[K]) => void;
      addHLSJS: (options: HlsOptions) => void;
      // addDashJS: (options: DashOptions) => void;
      removeHLSJS: () => void;
      // removeDashJS: () => void;
    };
    type DeletedMuxOnVideoElement = {
      deleted: true;
      destroy: () => void;
      swapElement: () => void;
      emit: () => void;
      addHLSJS: () => void;
      // addDashJS: () => void;
      removeHLSJS: () => void;
      // removeDashJS: () => void;
    };

    interface HTMLMediaElement {
      mux?: MuxOnVideoElement | DeletedMuxOnVideoElement;
    }
  }
}
