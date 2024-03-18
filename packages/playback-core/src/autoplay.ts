import { addEventListenerWithTeardown } from './util';
import { ValueOf, Autoplay, AutoplayTypes, PlaybackEngine, MuxMediaPropsInternal, StreamTypes } from './types';
import Hls from './hls';

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
  props: Partial<MuxMediaPropsInternal>,
  mediaEl: HTMLMediaElement,
  hls?: PlaybackEngine
) => {
  const { autoplay: maybeAutoplay } = props;
  let hasPlayed = false;
  let isLive = false;
  let autoplay: Autoplay = isAutoplayValue(maybeAutoplay) ? maybeAutoplay : !!maybeAutoplay;

  const updateHasPlayed = () => {
    // hasPlayed

    if (!hasPlayed) {
      addEventListenerWithTeardown(
        mediaEl,
        'playing',
        () => {
          hasPlayed = true;
        },
        { once: true }
      );
    }
  };

  updateHasPlayed();

  // on `loadstart`
  // hasPlayed should default to false
  // we should try and autoplay
  addEventListenerWithTeardown(
    mediaEl,
    'loadstart',
    () => {
      hasPlayed = false;
      updateHasPlayed();
      handleAutoplay(mediaEl, autoplay);
    },
    { once: true }
  );

  // on `loadedmetadata` we can check whether we're live in the case of native playback
  addEventListenerWithTeardown(
    mediaEl,
    'loadstart',
    () => {
      // only update isLive here if we're using native playback
      if (!hls) {
        // defer to streamType if set (including inferred)
        if (props.streamType && props.streamType !== StreamTypes.UNKNOWN) {
          isLive = props.streamType === StreamTypes.LIVE;
        } else {
          isLive = !Number.isFinite(mediaEl.duration);
        }
      }
      handleAutoplay(mediaEl, autoplay);
    },
    { once: true }
  );

  // determine if we're live for hls.js
  if (hls) {
    hls.once(Hls.Events.LEVEL_LOADED, (e: any, data: any) => {
      // defer to streamType if set (including inferred)
      if (props.streamType && props.streamType !== StreamTypes.UNKNOWN) {
        isLive = props.streamType === StreamTypes.LIVE;
      } else {
        isLive = data.details.live ?? false;
      }
    });
  }

  // When we are not auto-playing, we should seek to the live sync position
  // This will seek first play event of *any* live video including event-type,
  // which probably shouldn't seek
  if (!autoplay) {
    const handleSeek = () => {
      // don't seek if we're not live or if a `startTime` has been explicitly set
      if (!isLive || Number.isFinite(props.startTime)) {
        return;
      }
      // seek to either hls.js's liveSyncPosition or the native seekable end
      if (hls?.liveSyncPosition) {
        mediaEl.currentTime = hls.liveSyncPosition;
      } else {
        if (Number.isFinite(mediaEl.seekable.end(0))) {
          mediaEl.currentTime = mediaEl.seekable.end(0);
        }
      }
    };
    if (hls) {
      addEventListenerWithTeardown(
        mediaEl,
        'play',
        () => {
          if (mediaEl.preload === 'metadata') {
            hls.once(Hls.Events.LEVEL_UPDATED, handleSeek);
          } else {
            handleSeek();
          }
        },
        { once: true }
      );
    }
  }

  // this method allows us to update the value of autoplay
  // and try autoplaying appropriately.
  const updateAutoplay = (newAutoplay?: Autoplay) => {
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
      mediaEl.play().catch(() => {
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
    default: // eslint-disable-next-line
      mediaEl.play().catch(() => {});
      break;
  }
};
