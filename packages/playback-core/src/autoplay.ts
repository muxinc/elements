import Hls from 'hls.js';

type PlaybackEngine = Hls;

// TODO add INVIEW_MUTED, INVIEW_ANY
export type AutoplayTypes = {
  ANY: 'any';
  MUTED: 'muted';
};

export const AutoplayTypes: AutoplayTypes = {
  ANY: 'any',
  MUTED: 'muted',
};

type ValueOf<T> = T[keyof T];
type Maybe<T> = T | null | undefined;
export type Autoplay = boolean | ValueOf<AutoplayTypes>;
export type UpdateAutoplay = (newAutoplay: Maybe<string | boolean>) => void;

const AutoplayTypeValues = Object.values(AutoplayTypes);
export const isAutoplayValue = (value: unknown): value is Autoplay => {
  return (
    typeof value === 'boolean' ||
    (typeof value === 'string' && AutoplayTypeValues.includes(value as ValueOf<AutoplayTypes>))
  );
};

// Given a video element, will listen to lifecycle events to determine important
// things like whether the video is live or whether the video has played
// and then handles autoplaying the video as appropraite.
// It works with both the native video element or hls.js.
// This returns a method UpdateAutoplay, that allows the user to change
// the value of the autoplay attribute and it will react appropriately.
export const setupAutoplay = (
  mediaEl: HTMLMediaElement,
  maybeAutoplay: Maybe<string | boolean>,
  hls: PlaybackEngine | undefined
) => {
  let hasPlayed = false;
  let isLive = false;
  let autoplay: Autoplay = isAutoplayValue(maybeAutoplay) ? maybeAutoplay : !!maybeAutoplay;

  const updateHasPlayed = () => {
    // hasPlayed
    mediaEl.addEventListener(
      'playing',
      () => {
        hasPlayed = true;
      },
      { once: true }
    );
  };

  updateHasPlayed();

  // on `loadstart`
  // hasPlayed should default to false
  // we should try and autoplay
  mediaEl.addEventListener(
    'loadstart',
    () => {
      hasPlayed = false;
      updateHasPlayed();
      handleAutoplay(mediaEl, autoplay);
    },
    { once: true }
  );

  // on `loadedmetadata` we can check whether we're live in the case of native playback
  mediaEl.addEventListener(
    'loadedmetadata',
    () => {
      // only update isLive here if we're using native playback
      if (!hls) {
        isLive = !Number.isFinite(mediaEl.duration);
      }
      handleAutoplay(mediaEl, autoplay);
    },
    { once: true }
  );

  // determine if we're live for hls.js
  if (hls) {
    hls.once(Hls.Events.LEVEL_LOADED, (e: any, data: any) => {
      isLive = data.details.live ?? false;
    });
  }

  // When we are not auto-playing, we should seek to the live sync position
  // This will seek first play event of *any* live video including event-type,
  // which probably shouldn't seek
  if (!autoplay) {
    const handleSeek = () => {
      // don't seek if we're not live
      if (!isLive) {
        return;
      }
      // seek to either hls.js's liveSyncPosition or the native seekable end
      if (hls?.liveSyncPosition) {
        mediaEl.currentTime = hls.liveSyncPosition;
      } else {
        mediaEl.currentTime = mediaEl.seekable.end(0);
      }
    };
    mediaEl.addEventListener(
      'play',
      () => {
        if (mediaEl.preload === 'metadata') {
          if (hls) {
            hls.once(Hls.Events.LEVEL_UPDATED, handleSeek);
          } else if (mediaEl.seekable.end(0) === Infinity) {
            mediaEl.addEventListener(
              'canplay',
              () => {
                // we need a setTimeout because seeking immediately on canplay
                // can cause the player to stop get into a non-playing state
                setTimeout(handleSeek, 100);
              },
              { once: true }
            );
          }
        } else {
          handleSeek();
        }
      },
      { once: true }
    );
  }

  // this method allows us to update the value of autoplay
  // and try autoplaying appropriately.
  const updateAutoplay: UpdateAutoplay = (newAutoplay) => {
    if (!hasPlayed) {
      autoplay = isAutoplayValue(newAutoplay) ? newAutoplay : !!newAutoplay;
      handleAutoplay(mediaEl, autoplay);
    }
  };

  return updateAutoplay;
};

export const handleAutoplay = (mediaEl: HTMLMediaElement, autoplay: Autoplay) => {
  if (!autoplay) {
    return;
  }

  const oldMuted = mediaEl.muted;
  const restoreMuted = () => (mediaEl.muted = oldMuted);

  switch (autoplay) {
    // ANY:
    // try to play with current options
    // if it fails, mute and try playing again
    // if that fails, restore muted state and don't try playing again
    case AutoplayTypes.ANY:
      mediaEl.play().catch((error: Error) => {
        mediaEl.muted = true;
        mediaEl.play().catch(restoreMuted);
      });
      break;

    // MUTED:
    // mute the player and then try playing
    // if that fails, restore muted state
    case AutoplayTypes.MUTED:
      mediaEl.muted = true;
      mediaEl.play().catch(restoreMuted);
      break;

    // Default or if autoplay is a boolean attribute:
    // Try playing the video and catch the failed autoplay warning
    default:
      mediaEl.play().catch(() => {});
      break;
  }
};
