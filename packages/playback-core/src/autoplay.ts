export type ValueOf<T> = T[keyof T];

// TODO add INVIEW_MUTED, INVIEW_ANY
export type AutoplayTypes = {
  ANY: "any";
  MUTED: "muted";
};

export const AutoplayTypes: AutoplayTypes = {
  ANY: "any",
  MUTED: "muted",
};

// export const setupAutoplay = (mediaEl: HTMLMediaElement) => {
//   const hasPlayed = false;
//
//   return (newAutoplay) => {
//   };
// };

export const handleAutoplay = (
  mediaEl: HTMLMediaElement,
  autoplay: boolean | ValueOf<AutoplayTypes> | undefined
) => {
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
