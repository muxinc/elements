import type { Props as MuxVideoProps } from "@mux-elements/mux-video-react";
import type { MuxPlayerProps } from "../types";

export const getPosterURLFromPlaybackId = (
  playbackId: MuxVideoProps["playbackId"]
) => `https://image.mux.com/${playbackId}/thumbnail.jpg`;

export const getStoryboardURLFromPlaybackId = (
  playbackId: MuxVideoProps["playbackId"]
) => `https://image.mux.com/${playbackId}/storyboard.vtt`;

let testMediaEl: HTMLMediaElement | undefined;
export const getTestMediaEl = (nodeName = "video") => {
  if (testMediaEl) return testMediaEl;
  if (typeof window !== "undefined") {
    testMediaEl = document.createElement(nodeName as "video" | "audio");
  }
  return testMediaEl;
};

export const hasVolumeSupportAsync = async (
  mediaEl: HTMLMediaElement | undefined = getTestMediaEl()
) => {
  if (!mediaEl) return false;
  const prevVolume = mediaEl.volume;
  mediaEl.volume = prevVolume / 2 + 0.1;
  return new Promise<boolean>((resolve, reject) => {
    setTimeout(() => {
      resolve(mediaEl.volume !== prevVolume);
    }, 0);
  });
};

export const getChromeStylesFromProps = (props: MuxPlayerProps) => {
  const {
    primaryColor = "#ffffff",
    secondaryColor = "transparent",
    tertiaryColor = "#eeeeee88",
  } = props;

  const primaryColorStyles = primaryColor
    ? {
        "--media-icon-color": primaryColor,
        "--media-range-thumb-background": primaryColor,
        "--media-range-bar-color": primaryColor,
        color: primaryColor,
      }
    : {};

  const secondaryColorStyles = secondaryColor
    ? {
        "--media-background-color": secondaryColor,
        "--media-control-hover-background": secondaryColor,
        "--media-control-background": secondaryColor,
      }
    : {};

  const tertiaryColorStyles = tertiaryColor
    ? {
        "--media-range-track-background": tertiaryColor,
      }
    : {};

  return {
    maxWidth: "100%",
    ...primaryColorStyles,
    ...secondaryColorStyles,
    ...tertiaryColorStyles,
  };
};

export const getTracksAvailable = (
  textTracks: TextTrackList | undefined,
  includeSubtitles: boolean = true
) => {
  if (!textTracks) return undefined;

  const ccSubTracks = Array.from(textTracks).filter(
    ({ kind }) =>
      kind === "captions" || (includeSubtitles && kind === "subtitles")
  );

  return !!ccSubTracks.length;
};

export const getLoading = (mediaEl: HTMLMediaElement | undefined) => {
  if (!mediaEl) return undefined;
  return mediaEl.readyState < 3;
};
