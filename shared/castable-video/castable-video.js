/* global globalThis, chrome, cast */

const CastableVideoMixin = (superclass) =>
  class CastableVideo extends superclass {
    static observedAttributes = ['cast-src'];
    static instances = new Set();

    static #castElement;
    static get castElement() {
      return CastableVideo.#castElement;
    }

    static #castEnabled = false;
    static get castEnabled() {
      return CastableVideo.#castEnabled;
    }

    static async exitCast() {
      // Should the receiver application be stopped or just disconnected.
      const stopCasting = true;
      try {
        await CastableVideo.#castContext.endCurrentSession(stopCasting);
      } catch (err) {
        console.error(err);
        return;
      }
    }

    static initCast = () => {
      if (!this.#isChromeCastAvailable) {
        globalThis.__onGCastApiAvailable = () => {
          // The globalThis.__onGCastApiAvailable callback alone is not reliable for
          // the added cast.framework. It's loaded in a separate JS file.
          // http://www.gstatic.com/eureka/clank/101/cast_sender.js
          // http://www.gstatic.com/cast/sdk/libs/sender/1.0/cast_framework.js
          customElements.whenDefined('google-cast-button').then(() => this.#onSdkLoaded(chrome.cast.isAvailable));
        };
      } else if (!this.#isCastFrameworkAvailable) {
        customElements.whenDefined('google-cast-button').then(() => this.#onSdkLoaded(chrome.cast.isAvailable));
      } else {
        this.#onSdkLoaded(chrome.cast.isAvailable);
      }
    };

    static #onSdkLoaded = (isAvailable) => {
      if (isAvailable) {
        this.#castEnabled = true;

        for (const video of this.instances) {
          video.#init();
        }
      }
    };

    static get #isChromeCastAvailable() {
      return typeof chrome !== 'undefined' && chrome.cast && chrome.cast.isAvailable;
    }

    static get #isCastFrameworkAvailable() {
      return typeof cast !== 'undefined' && cast.framework;
    }

    static get #castContext() {
      if (CastableVideo.#isCastFrameworkAvailable) {
        return cast.framework.CastContext.getInstance();
      }
      return undefined;
    }

    static get #currentSession() {
      return CastableVideo.#castContext?.getCurrentSession();
    }

    #editTracksInfo(request) {
      return new Promise((resolve, reject) => {
        CastableVideo.#currentSession?.getSessionObj().media[0].editTracksInfo(request, resolve, reject);
      });
    }

    #isInit = false;
    #localState = { paused: false };
    #remoteState = { paused: false, currentTime: 0, muted: false };
    #remotePlayer;
    #remoteListeners = [];
    #enterCastCallback;
    #leaveCastCallback;
    #castChangeCallback;

    constructor() {
      super();
      this.castEnabled = false;

      CastableVideo.instances.add(this);
      this.#init();
    }

    get castPlayer() {
      if (CastableVideo.castElement === this) return this.#remotePlayer;
      return undefined;
    }

    get #isMediaLoaded() {
      return this.#remotePlayer?.isMediaLoaded;
    }

    attributeChangedCallback(attrName) {
      if (!this.castPlayer) return;

      switch (attrName) {
        case 'cast-src':
          this.load();
          break;
      }
    }

    #disconnect() {
      if (CastableVideo.#castElement !== this) return;

      this.#remoteListeners.forEach(([event, listener]) => {
        this.#remotePlayer.controller.removeEventListener(event, listener);
      });

      CastableVideo.#castElement = undefined;

      this.muted = this.#remoteState.muted;
      this.currentTime = this.#remoteState.currentTime;
      if (this.#remoteState.paused === false) {
        this.play();
      }
    }

    #init() {
      if (!CastableVideo.#isCastFrameworkAvailable || this.#isInit) return;
      this.#isInit = true;
      this.#setOptions();

      this.textTracks.addEventListener('change', this.#syncTextTrack.bind(this));

      /** @todo add listeners for addtrack, removetrack */

      // Cast state: NO_DEVICES_AVAILABLE, NOT_CONNECTED, CONNECTING, CONNECTED
      // https://developers.google.com/cast/docs/reference/web_sender/cast.framework#.CastState
      const { CAST_STATE_CHANGED } = cast.framework.CastContextEventType;
      CastableVideo.#castContext.addEventListener(CAST_STATE_CHANGED, () => {
        this.dispatchEvent(
          new CustomEvent('castchange', {
            detail: CastableVideo.#castContext.getCastState(),
          })
        );
      });

      this.dispatchEvent(
        new CustomEvent('castchange', {
          detail: CastableVideo.#castContext.getCastState(),
        })
      );

      this.#remotePlayer = new cast.framework.RemotePlayer();
      new cast.framework.RemotePlayerController(this.#remotePlayer);

      this.#remoteListeners = [
        [
          cast.framework.RemotePlayerEventType.IS_CONNECTED_CHANGED,
          ({ value }) => {
            if (value === false) {
              this.#disconnect();
            }
            this.dispatchEvent(new Event(value ? 'entercast' : 'leavecast'));
          },
        ],
        [
          cast.framework.RemotePlayerEventType.DURATION_CHANGED,
          () => {
            this.dispatchEvent(new Event('durationchange'));
          },
        ],
        [
          cast.framework.RemotePlayerEventType.VOLUME_LEVEL_CHANGED,
          () => this.dispatchEvent(new Event('volumechange')),
        ],
        [
          cast.framework.RemotePlayerEventType.IS_MUTED_CHANGED,
          () => {
            this.#remoteState.muted = this.muted;
            this.dispatchEvent(new Event('volumechange'));
          },
        ],
        [
          cast.framework.RemotePlayerEventType.CURRENT_TIME_CHANGED,
          () => {
            if (this.#isMediaLoaded) {
              this.#remoteState.currentTime = this.currentTime;
              this.dispatchEvent(new Event('timeupdate'));
            }
          },
        ],
        [
          cast.framework.RemotePlayerEventType.VIDEO_INFO_CHANGED,
          () => {
            this.dispatchEvent(new Event('resize'));
          },
        ],
        [
          cast.framework.RemotePlayerEventType.IS_PAUSED_CHANGED,
          () => {
            this.#remoteState.paused = this.paused;
            this.dispatchEvent(new Event(this.paused ? 'pause' : 'play'));
          },
        ],
        [
          cast.framework.RemotePlayerEventType.PLAYER_STATE_CHANGED,
          () => {
            // pause event is handled above.
            if (this.castPlayer?.playerState === chrome.cast.media.PlayerState.PAUSED) {
              return;
            }
            this.dispatchEvent(
              new Event(
                {
                  [chrome.cast.media.PlayerState.PLAYING]: 'playing',
                  [chrome.cast.media.PlayerState.BUFFERING]: 'waiting',
                  [chrome.cast.media.PlayerState.IDLE]: 'emptied',
                }[this.castPlayer?.playerState]
              )
            );
          },
        ],
        [
          cast.framework.RemotePlayerEventType.MEDIA_INFO_CHANGED,
          () => {
            this.#onRemoteMediaInfoChanged();
          },
        ],
      ];
    }

    #setOptions(options) {
      return CastableVideo.#castContext.setOptions({
        // Set the receiver application ID to your own (created in the
        // Google Cast Developer Console), or optionally
        // use the chrome.cast.media.DEFAULT_MEDIA_RECEIVER_APP_ID
        receiverApplicationId: chrome.cast.media.DEFAULT_MEDIA_RECEIVER_APP_ID,

        // Auto join policy can be one of the following three:
        // ORIGIN_SCOPED - Auto connect from same appId and page origin
        // TAB_AND_ORIGIN_SCOPED - Auto connect from same appId, page origin, and tab
        // PAGE_SCOPED - No auto connect
        autoJoinPolicy: chrome.cast.AutoJoinPolicy.ORIGIN_SCOPED,

        // The following flag enables Cast Connect(requires Chrome 87 or higher)
        // https://developers.googleblog.com/2020/08/introducing-cast-connect-android-tv.html
        androidReceiverCompatible: false,

        language: 'en-US',
        resumeSavedSession: false,

        ...options,
      });
    }

    async requestCast(options = {}) {
      this.#setOptions(options);
      CastableVideo.#castElement = this;

      this.#remoteListeners.forEach(([event, listener]) => {
        this.#remotePlayer.controller.addEventListener(event, listener);
      });

      try {
        // Open browser cast menu.
        await CastableVideo.#castContext.requestSession();
      } catch (err) {
        CastableVideo.#castElement = undefined;
        // console.error(err); // Don't show an error if dismissing the menu.
        return;
      }

      // Pause locally when the session is created.
      this.#localState.paused = super.paused;
      super.pause();

      // Sync over the muted state but not volume, 100% is different on TV's :P
      this.muted = super.muted;

      try {
        await this.load();
      } catch (err) {
        console.error(err);
      }
    }

    async load() {
      if (!this.castPlayer) return super.load();

      const mediaInfo = new chrome.cast.media.MediaInfo(this.castSrc, this.castContentType);

      // Manually add text tracks with a `src` attribute.
      // M3U8's load text tracks in the receiver, handle these in the media loaded event.
      const subtitles = [...this.querySelectorAll('track')].filter(({ kind, src }) => {
        return src && (kind === 'subtitles' || kind === 'captions');
      });

      const activeTrackIds = [];
      let textTrackIdCount = 0;

      if (subtitles.length) {
        mediaInfo.tracks = subtitles.map((trackEl) => {
          const trackId = ++textTrackIdCount;
          // only activate 1 subtitle text track.
          if (activeTrackIds.length === 0 && trackEl.track.mode === 'showing') {
            activeTrackIds.push(trackId);
          }

          const track = new chrome.cast.media.Track(trackId, chrome.cast.media.TrackType.TEXT);
          track.trackContentId = trackEl.src;
          track.trackContentType = 'text/vtt';
          track.subtype =
            trackEl.kind === 'captions'
              ? chrome.cast.media.TextTrackType.CAPTIONS
              : chrome.cast.media.TextTrackType.SUBTITLES;
          track.name = trackEl.label;
          track.language = trackEl.srclang;
          return track;
        });
      }

      if (this.castStreamType === 'live') {
        mediaInfo.streamType = chrome.cast.media.StreamType.LIVE;
      } else {
        mediaInfo.streamType = chrome.cast.media.StreamType.BUFFERED;
      }

      mediaInfo.metadata = new chrome.cast.media.GenericMediaMetadata();
      mediaInfo.metadata.title = this.title;
      mediaInfo.metadata.images = [
        {
          url: this.poster,
        },
      ];

      const request = new chrome.cast.media.LoadRequest(mediaInfo);
      request.currentTime = super.currentTime ?? 0;
      request.autoplay = !this.#localState.paused;
      request.activeTrackIds = activeTrackIds;

      await CastableVideo.#currentSession?.loadMedia(request);

      this.dispatchEvent(new Event('volumechange'));
    }

    #onRemoteMediaInfoChanged() {
      this.#syncTextTrack();
    }

    async #syncTextTrack() {
      if (!this.castPlayer) return;

      // Get the tracks w/ trackId's that have been loaded; manually or via a playlist like a M3U8 or MPD.
      const remoteTracks = this.#remotePlayer.mediaInfo.tracks;
      const remoteSubtitles = remoteTracks.filter(({ type }) => type === chrome.cast.media.TrackType.TEXT);

      const localSubtitles = [...this.textTracks].filter(({ kind }) => kind === 'subtitles' || kind === 'captions');

      // Create a new array from the local subs w/ the trackId's from the remote subs.
      const subtitles = remoteSubtitles.map(({ language, name, trackId }) => {
        // Find the corresponding local text track and assign the trackId.
        const { mode } = localSubtitles.find((local) => local.language === language && local.label === name);
        if (mode) return { mode, trackId };
      });

      const hiddenSubtitles = subtitles.filter(({ mode }) => mode && mode !== 'showing');
      const hiddenTrackIds = hiddenSubtitles.map(({ trackId }) => trackId);
      const showingSubtitle = subtitles.find(({ mode }) => mode === 'showing');

      // Note this could also include audio or video tracks, diff against local state.
      const activeTrackIds = CastableVideo.#currentSession?.getSessionObj().media[0]?.activeTrackIds;
      let requestTrackIds = activeTrackIds;

      if (activeTrackIds.length) {
        // Filter out all local hidden subtitle trackId's.
        requestTrackIds = requestTrackIds.filter((id) => !hiddenTrackIds.includes(id));
      }

      if (showingSubtitle?.trackId) {
        requestTrackIds = [...requestTrackIds, showingSubtitle.trackId];
      }

      // Remove duplicate ids.
      requestTrackIds = [...new Set(requestTrackIds)];

      const arrayEquals = (a, b) => a.length === b.length && a.every((a) => b.includes(a));
      if (!arrayEquals(activeTrackIds, requestTrackIds)) {
        try {
          const request = new chrome.cast.media.EditTracksInfoRequest(requestTrackIds);
          await this.#editTracksInfo(request);
        } catch (error) {
          console.error(error);
        }
      }
    }

    play() {
      if (this.castPlayer) {
        if (this.castPlayer.isPaused) {
          this.castPlayer.controller?.playOrPause();
        }
        return;
      }
      return super.play();
    }

    pause() {
      if (this.castPlayer) {
        if (!this.castPlayer.isPaused) {
          this.castPlayer.controller?.playOrPause();
        }
        return;
      }
      super.pause();
    }

    // Allow the cast source url to be different than <video src>, could be a blob.
    get castSrc() {
      // Try the first <source src> for usage with even more native markup.
      return this.getAttribute('cast-src') ?? this.querySelector('source')?.src ?? this.currentSrc;
    }

    set castSrc(val) {
      if (this.castSrc == val) return;
      this.setAttribute('cast-src', `${val}`);
    }

    get castContentType() {
      return this.getAttribute('cast-content-type') ?? undefined;
    }

    set castContentType(val) {
      this.setAttribute('cast-content-type', `${val}`);
    }

    get castStreamType() {
      return this.getAttribute('cast-stream-type') ?? undefined;
    }

    set castStreamType(val) {
      this.setAttribute('cast-stream-type', `${val}`);
    }

    get readyState() {
      if (this.castPlayer) {
        switch (this.castPlayer.playerState) {
          case chrome.cast.media.PlayerState.IDLE:
            return 0;
          case chrome.cast.media.PlayerState.BUFFERING:
            return 2;
          default:
            return 3;
        }
      }
      return super.readyState;
    }

    get paused() {
      if (this.castPlayer) return this.castPlayer.isPaused;
      return super.paused;
    }

    get muted() {
      if (this.castPlayer) return this.castPlayer?.isMuted;
      return super.muted;
    }

    set muted(val) {
      if (this.castPlayer) {
        if ((val && !this.castPlayer.isMuted) || (!val && this.castPlayer.isMuted)) {
          this.castPlayer.controller?.muteOrUnmute();
        }
        return;
      }
      super.muted = val;
    }

    get volume() {
      if (this.castPlayer) return this.castPlayer?.volumeLevel ?? 1;
      return super.volume;
    }

    set volume(val) {
      if (this.castPlayer) {
        this.castPlayer.volumeLevel = val;
        this.castPlayer.controller?.setVolumeLevel();
        return;
      }
      super.volume = val;
    }

    get duration() {
      // castPlayer duration returns `0` when no media is loaded.
      if (this.castPlayer && this.#isMediaLoaded) {
        return this.castPlayer?.duration ?? NaN;
      }
      return super.duration;
    }

    get currentTime() {
      if (this.castPlayer && this.#isMediaLoaded) {
        return this.castPlayer?.currentTime ?? 0;
      }
      return super.currentTime;
    }

    set currentTime(val) {
      if (this.castPlayer) {
        this.castPlayer.currentTime = val;
        this.castPlayer.controller?.seek();
        return;
      }
      super.currentTime = val;
    }

    get onentercast() {
      return this.#enterCastCallback;
    }

    set onentercast(callback) {
      if (this.#enterCastCallback) {
        this.removeEventListener('entercast', this.#enterCastCallback);
        this.#enterCastCallback = null;
      }
      if (typeof callback == 'function') {
        this.#enterCastCallback = callback;
        this.addEventListener('entercast', callback);
      }
    }

    get onleavecast() {
      return this.#leaveCastCallback;
    }

    set onleavecast(callback) {
      if (this.#leaveCastCallback) {
        this.removeEventListener('leavecast', this.#leaveCastCallback);
        this.#leaveCastCallback = null;
      }
      if (typeof callback == 'function') {
        this.#leaveCastCallback = callback;
        this.addEventListener('leavecast', callback);
      }
    }

    get oncastchange() {
      return this.#castChangeCallback;
    }

    set oncastchange(callback) {
      if (this.#castChangeCallback) {
        this.removeEventListener('castchange', this.#castChangeCallback);
        this.#castChangeCallback = null;
      }
      if (typeof callback == 'function') {
        this.#castChangeCallback = callback;
        this.addEventListener('castchange', callback);
      }
    }
  };

const CastableVideoElement = CastableVideoMixin(HTMLVideoElement);

if (!customElements.get('castable-video')) {
  customElements.define('castable-video', CastableVideoElement, {
    extends: 'video',
  });
  globalThis.CastableVideoElement = CastableVideoElement;
}

CastableVideoElement.initCast();
