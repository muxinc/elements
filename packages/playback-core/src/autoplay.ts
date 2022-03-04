import Hls from "hls.js";

// TODO add INVIEW_MUTED, INVIEW_ANY
export type AutoplayTypes = {
  ANY: "any";
  MUTED: "muted";
};

export const AutoplayTypes: AutoplayTypes = {
  ANY: "any",
  MUTED: "muted",
};

type ValueOf<T> = T[keyof T];
type Autoplay = boolean | ValueOf<AutoplayTypes> | undefined;

export const setupAutoplay = (
  mediaEl: HTMLMediaElement,
  autoplay: Autoplay,
  hls
) => {
  let hasPlayed = false;
  let isLive = false;

  const updateHasPlayed = () => {
    // hasPlayed
    mediaEl.addEventListener(
      "playing",
      () => {
        hasPlayed = true;
      },
      { once: true }
    );
  };

  updateHasPlayed();

  mediaEl.addEventListener(
    "loadstart",
    () => {
      hasPlayed = false;
      updateHasPlayed();
      handleAutoplay(mediaEl, autoplay);
    },
    { once: true }
  );

  if (hls) {
    hls.once(Hls.Events.LEVEL_LOADED, (e: any, data: any) => {
      isLive = data.details.live ?? false;
    });
  }

  // When we are not auto-playing, we should seek to the live sync position
  // This will seek first play event of *any* live video including event-type,
  // which probably shouldn't seek
  if (!autoplay) {
    mediaEl.addEventListener(
      "play",
      () => {
        // seek to either hls.js's liveSyncPosition or the native seekable end
        if (hls?.liveSyncPosition) {
          mediaEl.currentTime = hls.liveSyncPosition;
        } else {
          mediaEl.currentTime = mediaEl.seekable.end(0);
        }
      },
      { once: true }
    );
  } else if (autoplay) {
    mediaEl.addEventListener(
      "loadedmetadata",
      () => {
        handleAutoplay(mediaEl, autoplay);
      },
      { once: true }
    );
  }

  return (newAutoplay) => {
    if (!hasPlayed) {
      autoplay = newAutoplay;
      handleAutoplay(mediaEl, autoplay);
    }
  };
};

export const handleAutoplay = (
  mediaEl: HTMLMediaElement,
  autoplay: Autoplay
) => {
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
