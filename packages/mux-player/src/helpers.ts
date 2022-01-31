import { stylePropsToString } from "./utils";
import type MuxPlayerElement from ".";

/* eslint-disable */
const getEnvPlayerVersion = () => {
  try {
    // @ts-ignore
    return PLAYER_VERSION;
  } catch {}
  return "UNKNOWN";
};

const player_version = getEnvPlayerVersion();
export const getPlayerVersion = () => player_version;

export const getPosterURLFromPlaybackId = (playbackId?: string) =>
  `https://image.mux.com/${playbackId}/thumbnail.jpg`;

export const getStoryboardURLFromPlaybackId = (playbackId?: string) =>
  `https://image.mux.com/${playbackId}/storyboard.vtt`;

export function getCcSubTracks(el: MuxPlayerElement) {
  return el.video
    ? Array.from(el.video.textTracks).filter(
        ({ kind }) => kind === "subtitles" || kind === "captions"
      )
    : [];
}

export function getChromeStylesFromProps(props: any) {
  const { primaryColor, secondaryColor, tertiaryColor } = props;

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
        "--media-control-background": secondaryColor,
      }
    : {};

  const tertiaryColorStyles = tertiaryColor
    ? {
        "--media-range-track-background": tertiaryColor,
      }
    : {};

  return stylePropsToString({
    maxWidth: "100%",
    color: "#ffffff",
    ...primaryColorStyles,
    ...secondaryColorStyles,
    ...tertiaryColorStyles,
  });
}
