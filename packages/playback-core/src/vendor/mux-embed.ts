// AUTO-GENERATED — do not edit.
// Source: mux-embed/dist/types/mux-embed.d.ts
// Run `npm run vendor:types` to refresh.

declare module 'mux-embed' {
  type OmitFirstArg<F> = F extends (x: any, ...args: infer P) => infer R
    ? (...args: P) => R
    : never;

  // NOTE: These are minimal definitions to add some type safety, avoid version conflicts, and avoid
  // pulling in optional peer dependencies for types. A more robust version should declare the minimal expected
  // shape relied on by mux-embed (CJP)
  type GenericObject = { [k: string | number | symbol]: any };
  type Hls = GenericObject;
  type hlsjs = GenericObject;
  type dashjs = GenericObject;

  export type Metadata = {
    /**
     * Your environment key from the Mux dashboard.
     */
    env_key?: string;
    /**
     * @deprecated in favor of env_key
     */
    property_key?: string;
    /**
     * The URL for the ad asset
     */
    ad_asset_url?: string;
    /**
     * The Ad ID assigned by the customer
     */
    ad_creative_id?: string;
    /**
     * ID of the ad in the Ad Provider’s system
     */
    ad_id?: string;
    /**
     * The cumulative playing time of the ad in milliseconds. This includes all wall-clock time where ads are playing. It does not include time when ads are loading, when ads are paused, or any time between ads in a pod
     */
    ad_playing_time_ms_cumulative?: number;
    /**
     * The URL for the Ad tag
     */
    ad_tag_url?: string;
    /**
     * The Universal ID for the ad
     */
    ad_universal_id?: string;
    /**
     * The type of ad
     */
    ad_type?: AdType;
    /**
     *  Browser used for the video view (Safari, Chrome, etc.) NB: `(viewer_application_name)`
     */
    browser?: string;
    /**
     *  Browser version (e.g. Chrome 66.0.3359.158) NB: `(viewer_application_version)`
     */
    browser_version?: string;
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
     * Custom metadata field 6
     */
    custom_6?: string;
    /**
     * Custom metadata field 7
     */
    custom_7?: string;
    /**
     * Custom metadata field 8
     */
    custom_8?: string;
    /**
     * Custom metadata field 9
     */
    custom_9?: string;
    /**
     * Custom metadata field 10
     */
    custom_10?: string;
    /**
     * Custom metadata field 11
     */
    custom_11?: string;
    /**
     * Custom metadata field 12
     */
    custom_12?: string;
    /**
     * Custom metadata field 13
     */
    custom_13?: string;
    /**
     * Custom metadata field 14
     */
    custom_14?: string;
    /**
     * Custom metadata field 15
     */
    custom_15?: string;
    /**
     * Custom metadata field 16
     */
    custom_16?: string;
    /**
     * Custom metadata field 17
     */
    custom_17?: string;
    /**
     * Custom metadata field 18
     */
    custom_18?: string;
    /**
     * Custom metadata field 19
     */
    custom_19?: string;
    /**
     * Custom metadata field 20
     */
    custom_20?: string;
    /**
     *  CDN delivering the video view (either determined by Mux (network metrics), or provided as video_cdn (Custom Metadata))
     */
    cdn?: string;
    /**
     * You can use this field to separate views into different experiments, if you would like to filter by this dimension later. This should be a string value, but your account is limited to a total of 10 unique experiment names, so be sure that this value is not generated dynamically or randomly.
     */
    experiment_name?: string;
    /**
     *  Operating System (iOS, Windows, etc) NB: `(viewer_os_family)`
     */
    operating_system?: string;
    /**
     *  Operating System version (e.g. OS X 10.6) NB: `(viewer_os_version)`
     */
    operating_system_version?: string;
    /**
     * Provide the context of the page for more specific analysis. Values include watchpage, iframe, or leave empty. watchpage — A web page that is dedicated to playing a specific video (for example youtube.com/watch/ID or hulu.com/watch/ID) iframe — An iframe specifically used to embed a player on different sites/pages
     */
    page_type?: string;
    /**
     *  Page URL
     */
    page_url?: string;
    /**
     * A sub property is an optional way to group data within a property. For example, sub properties may be used by a video platform to group data by its own customers, or a media company might use them to distinguish between its many websites.
     */
    sub_property_id?: string;
    /**
     * If you are explicitly loading your page, (perhaps in a Single Page App), include the timestamp (milliseconds since Jan 1 1970) of when the page load started when you initialize the player (or for HTML5 video, when right before you add the element to the DOM) in order to accurately track page load time.
     */
    page_load_init_time?: number;
    /**
     * If you are explicitly loading your page, (perhaps in a Single Page App), include the timestamp (milliseconds since Jan 1 1970) of when the page load competed when you initialize the player (or for HTML5 video, when right before you add the element to the DOM) in order to accurately track page load time.
     */
    page_load_end_time?: number;
    /**
     *  Indicates whether the player was set to autoplay the video or not. This tracks whether the video has `autoplay=true` set; it is not always able to tell if the browser disregarded the setting, otherwise prevented the video from playing, or if the video play was triggered via a script.
     */
    player_autoplay_on?: boolean;
    /**
     * Indicates whether the player is using captions.
     */
    player_captions_enabled?: boolean;
    /**
     *  Height of the player as displayed in page, in pixels
     */
    player_height?: number;
    /**
     *  Identifies the instance of the Player class that is created when a video is initialized
     */
    player_instance_id?: string;
    /**
     * If you are explicitly loading your player in page (perhaps as a response to a user interaction), include the timestamp (milliseconds since Jan 1 1970) when you initialize the player (or for HTML5 video, when right before you add the element to the DOM) in order to accurately track page load time and player startup time.
     */
    player_init_time?: number;
    /**
     *  Indicates whether the player is paused. Corresponds with `paused=true` for the video.
     */
    player_is_paused?: boolean;
    /**
     *  Indicates whether the player is fullscreen.
     */
    player_is_fullscreen?: boolean;
    /**
     *  Player's text language
     */
    player_language_code?: string;
    /**
     * You can provide a name for the player if you want to compare different configurations or types of players around your site or application. This is different from the player software (e.g. Video.js), which is tracked automatically by the SDK.
     */
    player_name?: string;
    /**
     * Indicates whether the player is using picture-in-picture mode.
     */
    player_pip_enabled?: boolean;
    /**
     * The current playback mode of the player (e.g., 'standard', 'picture-in-picture', 'fullscreen', etc.)
     */
    player_playback_mode?: string;
    /**
     * Additional metadata associated with the playback mode as a JSON-stringified object
     */
    player_playback_mode_data?: string;
    /**
     * Specifies the playhead position in milliseconds
     */
    player_playhead_time?: number;
    /**
     *  Specifies if the player was configured to load the video when the page loads.
     */
    player_preload_on?: boolean;
    /**
     *  If the video is remote played to AirPlay as specified by the SDK.
     */
    player_remote_played?: boolean;
    /**
     *  Player Software being used to play the Video (e.g. Video.js, JW Player, etc.)
     */
    player_software?: string;
    /**
     *  Player Software being used to play the Video (e.g. Video.js, JW Player, etc.) (currently potentially redundant with player_software, above)
     */
    player_software_name?: string;
    /**
     *  Player Software Version (e.g. 2.45.5)
     */
    player_software_version?: string;
    /**
     * As you make changes to your player you can compare how new versions of your player perform. This is not the player software version (e.g. Video.js 5.0.0), which is tracked automatically by the SDK.
     */
    player_version?: string;
    /**
     *  Width of the player as displayed in page, in pixels
     */
    player_width?: number;
    /**
     *  Format of the source, as determined by the player. E.g. 'dash', 'x-application/mpegUrl', 'mp4', etc.
     */
    video_source_mime_type?: string;
    /**
     * Your internal ID for the video
     */
    video_id?: string;
    /**
     * Affiliate that the viewer is watching or referred the viewer
     */
    video_affiliate?: string;
    /**
     * Codec of the audio that played.
     */
    video_audio_codec?: string;
    /**
     * The brand associated with the video or the brand of the streaming platform the viewer is using to watch the video.
     */
    video_brand?: string;
    /**
     * Codec of the video that played.
     */
    video_codec?: string;
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
     * The format or type of dynamic range available on the video that played
     */
    video_dynamic_range_type?: string;
    /**
     * Allows you to compare different encoders or encoding settings. This could designate the encoder used (e.g. `x264`, `hevc`, or `av1`), the preset used (e.g. 'av1-0', 'av1-4', or 'av1-8'), or other properties of the encoding you want to track.
     */
    video_encoding_variant?: string;
    video_is_live?: boolean;
    /**
     * The audio language of the video, assuming it's unchangeable after playing.
     */
    video_language_code?: string;
    /**
     * The playback ranges of the video as a stringified array of start and end times when playback occurred
     */
    video_playback_range?: string;
    /**
     *  The image shown as the pre-visualisation before play
     */
    video_poster_url?: string;
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
    // NOTE: Made this optional but was required in RenditionEvent (CJP)
    video_source_bitrate?: number;
    video_source_codec?: string;
    video_source_rendition_name?: string;
    video_source_duration?: number;
    video_source_format?: string;
    video_source_fps?: number;
    /**
     *  Height of the source video being sent to the player, in pixels
     */
    video_source_height?: number;
    video_source_is_live?: boolean;
    video_source_url?: string;
    /**
     *  Width of the source video being as seen by the player
     */
    video_source_width?: number;
    /**
     * Title of the video player (e.g.: 'Awesome Show: Pilot')
     */
    video_title?: string;
    /**
     * Allows you to monitor issues with the files of specific versions of the content, for example different audio translations or versions with hard-coded/burned-in subtitles.
     */
    video_variant_name?: string;
    /**
     * Your internal ID for a video variant
     */
    video_variant_id?: string;
    /**
     *  View ID
     */
    view_id?: string;
    /**
     * CDN PoP/Edge Server information
     */
    view_cdn_edge_pop?: string;
    /**
     * CDN origin region
     */
    view_cdn_origin?: string;
    /**
     * Name of the customer's application that the viewer is using to watch the content
     */
    view_client_application_name?: string;
    /**
     * Version of the customer's application that the viewer is using to watch the content
     */
    view_client_application_version?: string;
    /**
     * Security level of the specific DRM type. Some DRM types do not have levels.
     */
    view_drm_level?: string;
    /**
     * Digital Rights Management type
     */
    view_drm_type?: string;
    /**
     * Frames dropped for the video
     */
    view_dropped_frame_count?: number;
    /**
     * An ID that can be used to correlate the view with platform services upstream such as CDN or origin logs.
     */
    view_session_id?: string;
    /**
     * Boolean value of whether a view contains advertisements
     */
    view_has_ad?: boolean;
    /**
     * Boolean indicating if this view had time_shift enabled
     */
    view_time_shift_enabled?: boolean;
    /**
     *  The type of connection used by the player, as reported by the client when available: `cellular`, `other`, `wifi`, `wired`
     */
    viewer_connection_type?: string;
    /**
     *  The form factor of the device: `tv`, `phone`, `tablet`, etc.
     */
    mux_viewer_device_category?: string;
    /**
     *  Device Manufacturer (e.g. Apple, Microsoft)
     */
    mux_viewer_device_manufacturer?: string;
    /**
     *  Device Name (e.g. iPhone)
     */
    mux_viewer_device_name?: string;
    /**
     *  Device model (e.g. iPhone 16,2)
     */
    mux_viewer_device_model?: string;
    /**
     * Name of the viewer's customer-specific subscription plan
     */
    viewer_plan?: string;
    /**
     * Category of the viewer's customer-specific subscription plan
     */
    viewer_plan_category?: string;
    /**
     * Tier of the viewer's customer-specific subscription plan
     */
    viewer_plan_status?: string;
    /**
     * The cumulative playing time of the video in milliseconds. This metric includes all wall-clock time where the player is playing. It does not include paused, rebuffering, seeking, or startup time. It does include time when ads are playing, and excludes time the ads are paused.
     */
    view_playing_time_ms_cumulative?: number;
    /**
     * An ID representing the viewer who is watching the stream. Use this to look up video views for an individual viewer. If no value is specified, a unique ID will be generated by the SDK. Note: You should not use any value that is personally identifiable on its own (such as email address, username, etc). Instead, you should supply an anonymized viewer ID which you have stored within your own system.
     */
    viewer_user_id?: string;
    /**
     * @deprecated - Use viewer_user_id
     */
    user_id?: string;
    mux_sample_number?: number;
    event?: string;
  };

  export type MuxEvents = {
    DESTROY: 'destroy';
    /**
     * Internal event that is used to provide periodic updates on the playback state, while the player is not paused. Each core library emits heartbeat events (hb) automatically, and custom integrations should not need to emit this.
     */
    HEARTBEAT: 'hb';
    /**
     * Fired when the player is ready to be used.
     */
    PLAYER_READY: 'playerready';
    /**
     * Signals that the video being played in the player has changed. This must be called if a new video is loaded within the same player. The event should be fired immediately after the new video has been given to the player.
     */
    VIDEO_CHANGE: 'videochange';
    /**
     * For e.g. live linear channels, signals changes between content. Similar to `"videochange"`.
     */
    PROGRAM_CHANGE: 'programchange';
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
     * Signals that the playback mode has changed.
     */
    PLAYBACK_MODE_CHANGE: 'playbackmodechange';
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

    FRAGMENT_CHANGE: 'fragmentchange';
    LOADSTART: 'loadstart';
    RATECHANGE: 'ratechange';
    STALLED: 'stalled';
    WAITING: 'waiting';
  };

  export type MuxEventsInternal = MuxEvents & {
    VIEWEND: 'viewend';
    VIEWSTART: 'viewstart';
    /**
     * Signals that a new view is beginning and should be recorded. This must be called first before any additional playback events. Note that this should only be emitted for the first view within a player; for a change of videos within the same player, {@link MuxEvents.VIDEO_CHANGE `videochange`} should be used.
     */
    VIEW_INIT: 'viewinit';
  };

  export type MuxEvent = MuxEvents[keyof MuxEvents];
  export type MuxEventInternal = MuxEventsInternal[keyof MuxEventsInternal];

  export type HlsOptions = {
    hlsjs: hlsjs;
    Hls?: Hls;
  };

  export type DashOptions = {
    dashjs: dashjs;
  };

  export type Options = Partial<HlsOptions & DashOptions> & {
    /**
     * Controls whether debug log statements are logged to the console
     */
    debug?: boolean;
    data?: Metadata;
    disableCookies?: boolean;
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
    errorTranslator?: (error: ErrorEvent) => ErrorEvent | boolean;
    /**
     * @private *For internal use only.*
     * If the events emitted by the the default monitors needs filtering (by yielding an empty array or a nullish value) or transformation (by yielding a different event type or data) you might find it helpful to use an emit translator.
     */
    emitTranslator?: (...args: any[]) => [any] | [any, any] | null | undefined;
    /**
     * @private *For internal use only.*
     * Callback for playhead position
     */
    getPlayheadTime?: () => number | undefined;
    /**
     * @private *For internal use only.*
     * Callback for player state
     */
    getStateData?: () => Partial<Metadata> | undefined;
    /**
     * @private *For internal use only.*
     * Callback to optionally augment/modify state data returned from getStateData()
     */
    stateDataTranslator?: (
      stateData: ReturnType<NonNullable<Options['getStateData']>>
    ) => ReturnType<NonNullable<Options['getStateData']>>;
    /**
     *
     */
    getAdData?: any;
    /**
     *
     */
    minimumRebufferDuration?: number;
    /**
     *
     */
    sustainedRebufferThreshold?: number;
    /**
     *
     */
    playbackHeartbeatTime?: number;
    /**
     *
     */
    disableRebufferTracking?: boolean;
    /**
     *
     */
    disablePlayheadRebufferTracking?: boolean;
    /**
     * Disables filtering of backward playhead jumps during ad breaks. By default, the SDK
     * ignores backward playhead jumps during ads to handle CSAI scenarios where the ad
     * playhead loops (e.g., 0→5s, 0→5s for each ad). Set this to true to disable that
     * filtering and track all playhead changes during ads.
     */
    disableAdPlaybackRangeFiltering?: boolean;
    /**
     *
     */
    sampleRate?: number;
    /**
     *
     */
    beaconCollectionDomain?: string;
    /**
     * If you are explicitly loading your page, (perhaps in a Single Page App), include the timestamp (milliseconds since Jan 1 1970) of when the page load started when you initialize the player (or for HTML5 video, when right before you add the element to the DOM) in order to accurately track page load time.
     */
    pageLoadInitTime?: number;
    /**
     * If you are explicitly loading your page, (perhaps in a Single Page App), include the timestamp (milliseconds since Jan 1 1970) of when the page load competed when you initialize the player (or for HTML5 video, when right before you add the element to the DOM) in order to accurately track page load time.
     */
    pageLoadEndTime?: number;
    /**
     * @deprecated Use `beaconCollectionDomain`
     */
    beaconDomain?: string;
    platform?: {
      name?: string;
      version?: string;
      layout?: string;
      product?: string;
      manufacturer?: string;
      os?: {
        family?: string;
        architecture?: string;
        version?: string;
      };
    };
  };

  export type AdType = 'preroll' | 'midroll' | 'postroll';

  export type AdEvent = {
    ad_request_id?: string;
    ad_tag_url?: string;
    ad_asset_url?: string;
    ad_creative_id?: string;
    ad_id?: string;
    ad_universal_id?: string;
    ad_type?: AdType;
  };

  export type ErrorSeverity = {
    fatal: 'fatal';
    warning: 'warning';
  };

  export type ErrorEvent = {
    player_error_code?: number;
    player_error_message?: string;
    player_error_context?: string;
    player_error_severity?: keyof ErrorSeverity;
    player_error_business_exception?: boolean;
  };

  export type TimeUpdateEvent = Partial<Pick<Metadata, 'player_playhead_time'>>;

  export type FragmentChangeEvent = {
    currentFragmentPDT: number;
    currentFragmentStart: number;
  };

  export type RenditionChangeEvent = Partial<
    Pick<
      Metadata,
      | 'video_source_width'
      | 'video_source_height'
      | 'video_source_bitrate'
      | 'video_source_fps'
      | 'video_source_codec'
      | 'video_source_rendition_name'
    >
  >;

  export type OrientationChangeEvent = {
    viewer_device_orientation: [number, number, number];
  };

  export type RequestCompletedEvent = {
    request_event_type?: string;
    request_bytes_loaded?: number;
    request_current_level?: string;
    request_hostname?: string;
    request_id?: string;
    request_labeled_bitrate?: number;
    request_media_duration?: number;
    request_rendition_lists?: any;
    request_response_end?: number;
    request_response_headers?: Headers;
    request_response_start?: number;
    request_start?: number;
    request_type?: string;
    request_video_width?: number;
    request_video_height?: number;
    player_manifest_newest_program_time?: number;
    video_holdback?: number;
    video_part_holdback?: number;
    video_part_target_duration?: number;
    video_target_duration?: number;
    video_source_is_live?: boolean;
  };

  export type RequestFailedEvent = {
    request_error: string;
    request_error_code: number;
    request_error_text: string;
    request_id?: string;
  };

  export type NetworkEvent = {
    request_type?:
      | 'manifest'
      | 'video'
      | 'audio'
      | 'video_init'
      | 'audio_init'
      | 'media'
      | 'subtitle'
      | 'encryption';
    request_start?: number;
    request_hostname?: string;
    request_event_type?: string;
    request_url?: string;
    request_id?: string;
  };

  export type PlaybackModeChangeEvent = {
    player_playback_mode: string;
    player_playback_mode_data: string; // JSON stringified object
  };

  export type EventParamsMap = {
    /** @TODO As a followup, implement a metadatachange event for this use case and make this payload `void` (CJP) */
    [events.HEARTBEAT]: Partial<Metadata>;
    // NOTE: Internal Only!
    // [events.VIEW_INIT]: Partial<Metadata>;
    [events.VIDEO_CHANGE]: Partial<Metadata>;
    [events.PROGRAM_CHANGE]: Partial<Metadata>;
    [events.PLAY]: void;
    [events.PAUSE]: void;
    [events.PLAYING]: void;
    [events.SEEKING]: void;
    [events.SEEKED]: void;
    [events.REBUFFER_START]: void;
    [events.REBUFFER_END]: void;
    [events.ERROR]: ErrorEvent;
    [events.ENDED]: void;
    [events.RENDITION_CHANGE]: RenditionChangeEvent;
    [events.ORIENTATION_CHANGE]: OrientationChangeEvent;
    [events.PLAYBACK_MODE_CHANGE]: PlaybackModeChangeEvent;
    [events.AD_REQUEST]: AdEvent;
    [events.AD_RESPONSE]: AdEvent;
    [events.AD_BREAK_START]: AdEvent;
    [events.AD_PLAY]: AdEvent;
    [events.AD_PLAYING]: AdEvent;
    [events.AD_PAUSE]: AdEvent;
    [events.AD_FIRST_QUARTILE]: AdEvent;
    [events.AD_MID_POINT]: AdEvent;
    [events.AD_THIRD_QUARTILE]: AdEvent;
    [events.AD_ENDED]: AdEvent;
    [events.AD_BREAK_END]: AdEvent;
    [events.AD_ERROR]: AdEvent;
    [events.REQUEST_COMPLETED]: RequestCompletedEvent & NetworkEvent;
    [events.REQUEST_FAILED]: RequestFailedEvent & NetworkEvent;
    [events.REQUEST_CANCELLED]: NetworkEvent;
    [events.TIME_UPDATE]: TimeUpdateEvent;
    [events.DESTROY]: void;
    [events.PLAYER_READY]: void;
    [events.FRAGMENT_CHANGE]: FragmentChangeEvent;
    [events.LOADSTART]: void;
    [events.RATECHANGE]: void;
    [events.STALLED]: void;
    [events.WAITING]: void;
  };

  export type EventParamsMapInternal = EventParamsMap & {
    [eventsInternal.VIEWEND]: Partial<Metadata>;
    [eventsInternal.VIEWSTART]: Partial<Metadata>;
    [eventsInternal.VIEW_INIT]: Partial<Metadata>;
  };

  export type PlayerId = string | HTMLMediaElement;

  /**
   * Monitor a video element
   */
  function monitor(id: PlayerId, options?: Options): void;

  /**
   * Create a new generic player monitor
   */
  function init(id: PlayerId, options?: Options): void;

  /**
   * Stop monitoring a normal video element
   */
  function destroyMonitor(playerId: PlayerId): void;

  function addHLSJS(playerId: PlayerId, options: HlsOptions): void;
  function addDashJS(playerId: PlayerId, options: DashOptions): void;
  function removeHLSJS(playerId: PlayerId): void;
  function removeDashJS(playerId: PlayerId): void;
  function checkDoNotTrack(): boolean;
  function updateData(playerId: PlayerId, data: Partial<Metadata>): void;

  /**
   * Emit an event to update the state of a player monitor.
   */
  function emit<K extends MuxEventsInternal[keyof MuxEventsInternal]>(
    playerId: PlayerId,
    type: K,
    payload?: EventParamsMapInternal[K]
  ): void;

  // Public Utils
  export type Headers = {
    'x-cdn'?: string;
    'content-type'?: string;
    'x-request-id'?: string;
    'cf-ray'?: string;
    'x-amz-cf-id'?: string;
    'x-akamai-request-id'?: string;
  };
  type HostnameDomain = [string, string?] | undefined;
  type publicUtils = {
    safeCall<Type, Key extends keyof Type>(object: Type, method: Key, arguments?: any[]): any;
    safeIncrement<Type, Key extends keyof Type>(object: Type, prop: Key, num?: number): void;
    getComputedStyle<Key extends keyof CSSStyleDeclaration>(
      el: HTMLElement | null | undefined,
      prop: Key
    ): ReturnType<CSSStyleDeclaration['getPropertyValue']>;
    secondsToMs(seconds: number): number;
    headersStringToObject(headers: string): Headers;
    cdnHeadersToRequestId(headers: Headers): string | undefined;
    extractHostnameAndDomain(url: string): HostnameDomain;
    extractHostname(url: string): HostnameDomain;
    generateShortID: () => string;
    generateUUID: () => string;
    now: () => number;
    assign: typeof Object.assign;
    /** @TODO This is a class. Make sure to update appropriately in final type defs (CJP) */
    manifestParser: any;
    /**
     * @TODO improve return type:
     * [
     *   HTMLElement, // Typically HTMLMediaElement/HTMLVideoElement, but not necessarily
     *   string,
     *   string // Typically nodeName of HTMLElement, or '' if not an HTMLElement
     * ]
     * (CJP)
     */
    findMediaElement: (id: PlayerId) => [any, any, any];
  };

  const utils: publicUtils;

  const events: MuxEvents;
  const eventsInternal: MuxEventsInternal;

  export interface MuxOnVideoElement {
    deleted: false;
    destroy: () => void;
    swapElement: (playerId: PlayerId) => void;
    emit: OmitFirstArg<typeof emit>;
    addHLSJS: OmitFirstArg<typeof addHLSJS>;
    addDashJS: OmitFirstArg<typeof addDashJS>;
    removeHLSJS: OmitFirstArg<typeof removeHLSJS>;
    removeDashJS: OmitFirstArg<typeof removeDashJS>;
    updateData: OmitFirstArg<typeof updateData>;
    /**
     * @private *For internal use only.*
     * @param emitTranslator
     * @returns
     */
    setEmitTranslator: (emitTranslator: Options['emitTranslator']) => void;
    /**
     * @private *For internal use only.*
     * @param setStateDataTranslator
     * @returns
     */
    setStateDataTranslator: (stateDataTranslator: Options['stateDataTranslator']) => void;
    /**
     * @private *For internal use only.*
     * @param setGetPlayheadTime
     * @returns
     */
    setGetPlayheadTime: (getPlayheadTime: Options['getPlayheadTime']) => void;
    /** @TODO Hopefully we can move this out of the core interface def and instead keep it explicit in the ima-specific code (CJP) */
    triggerAdRequest?: () => void;
  }
  export interface DeletedMuxOnVideoElement {
    deleted: true;
    destroy: () => void;
    swapElement: () => void;
    emit: () => void;
    addHLSJS: () => void;
    addDashJS: () => void;
    removeHLSJS: () => void;
    removeDashJS: () => void;
    updateData: () => void;
    /**
     * @private *For internal use only.*
     * @param emitTranslator
     * @returns
     */
    setEmitTranslator: () => void;
    /**
     * @private *For internal use only.*
     * @param setStateDataTranslator
     * @returns
     */
    setStateDataTranslator: () => void;
    /**
     * @private *For internal use only.*
     * @param setGetPlayheadTime
     * @returns
     */
    setGetPlayheadTime: () => void;
    /** @TODO Hopefully we can move this out of the core interface def and instead keep it explicit in the ima-specific code (CJP) */
    triggerAdRequest?: () => void;
  }

  export interface Mux {
    (task: any, ...args: any[]): void;
    loaded: number;
    NAME: string;
    VERSION: string;
    API_VERSION: string;
    PLAYER_TRACKED: boolean;
    monitor: typeof monitor;
    destroyMonitor: typeof destroyMonitor;
    addHLSJS: typeof addHLSJS;
    addDashJS: typeof addDashJS;
    removeHLSJS: typeof removeHLSJS;
    removeDashJS: typeof removeDashJS;
    init: typeof init;
    emit: typeof emit;
    checkDoNotTrack: typeof checkDoNotTrack;
    updateData: typeof updateData;
    /** @TODO Revisit type def (CJP) */
    log: any;
    utils: typeof utils;
    events: MuxEvents;
    WINDOW_HIDDEN: boolean;
    WINDOW_UNLOADING: boolean;
  }

  const mux: Mux;
  export default mux;

  global {
    interface HTMLMediaElement {
      mux?: MuxOnVideoElement | DeletedMuxOnVideoElement;
      getVideoPlaybackQuality?: () => {
        droppedVideoFrames?: number;
      };
    }
  }
}
