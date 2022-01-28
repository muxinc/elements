import { stylePropsToString } from "./utils.js";

/** @typedef { import(".").default } MuxPlayerElement */

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

/** @type {(playbackId: string | undefined) => string} */
export const getPosterURLFromPlaybackId = (playbackId) =>
  `https://image.mux.com/${playbackId}/thumbnail.jpg`;

/** @type {(playbackId: string | undefined) => string} */
export const getStoryboardURLFromPlaybackId = (playbackId) =>
  `https://image.mux.com/${playbackId}/storyboard.vtt`;

/** @type {(el: MuxPlayerElement, name: string) => ?string} */
export function getVideoAttribute(el, name) {
  return el.video ? el.video.getAttribute(name) : el.getAttribute(name);
}

/** @type {(el: MuxPlayerElement) => TextTrack[]} */
export function getCcSubTracks(el) {
  return el.video
    ? Array.from(el.video.textTracks).filter(
        ({ kind }) => kind === "subtitles" || kind === "captions"
      )
    : [];
}

/** @type {(props: any) => any} */
export function getChromeStylesFromProps(props) {
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
