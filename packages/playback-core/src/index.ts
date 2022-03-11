import "@mux-elements/polyfills/window";
import mux, { Options } from "mux-embed";

import Hls, { HlsConfig } from "hls.js";
import { AutoplayTypes, setupAutoplay } from "./autoplay";
import { isKeyOf } from "./util";
import type { Autoplay, UpdateAutoplay } from "./autoplay";

export type ValueOf<T> = T[keyof T];
export type Metadata = Partial<Options["data"]>;
export type PlaybackEngine = Hls;
export { mux };
export { Hls };
export { Autoplay, UpdateAutoplay, setupAutoplay };

export type StreamTypes = {
  VOD: "on-demand";
  LIVE: "live";
  LL_LIVE: "ll-live";
};

export const StreamTypes: StreamTypes = {
  VOD: "on-demand",
  LIVE: "live",
  LL_LIVE: "ll-live",
};

export type ExtensionMimeTypeMap = {
  M3U8: "application/vnd.apple.mpegurl";
  MP4: "video/mp4";
};

export const ExtensionMimeTypeMap: ExtensionMimeTypeMap = {
  M3U8: "application/vnd.apple.mpegurl",
  MP4: "video/mp4",
};

export type MimeTypeShorthandMap = {
  HLS: ExtensionMimeTypeMap["M3U8"];
};

export const MimeTypeShorthandMap: MimeTypeShorthandMap = {
  HLS: ExtensionMimeTypeMap.M3U8,
};

export const shorthandKeys = Object.keys(MimeTypeShorthandMap);
export const allMediaTypes = [
  ...(Object.values(ExtensionMimeTypeMap) as ValueOf<ExtensionMimeTypeMap>[]),
  ...(shorthandKeys as (keyof MimeTypeShorthandMap)[]),
  ...(shorthandKeys.map((k) => k.toUpperCase()) as `${Uppercase<
    keyof MimeTypeShorthandMap
  >}`[]),
  ...(shorthandKeys.map((k) => k.toLowerCase()) as `${Lowercase<
    keyof MimeTypeShorthandMap
  >}`[]),
];

export type MuxMediaPropTypes = {
  envKey: Options["data"]["env_key"];
  debug: Options["debug"] & Hls["config"]["debug"];
  metadata: Partial<Options["data"]>;
  beaconDomain: Options["beaconDomain"];
  playbackId: string;
  playerInitTime: Options["data"]["player_init_time"];
  preferMse: boolean;
  type:
    | ValueOf<ExtensionMimeTypeMap>
    | keyof MimeTypeShorthandMap
    | `${Lowercase<keyof MimeTypeShorthandMap>}`
    | `${Uppercase<keyof MimeTypeShorthandMap>}`;
  streamType: ValueOf<StreamTypes>;
  startTime: HlsConfig["startPosition"];
  autoPlay: boolean | ValueOf<AutoplayTypes>;
  autoplay: boolean | ValueOf<AutoplayTypes>;
};

declare global {
  interface HTMLMediaElement {
    mux?: typeof mux;
  }
}

export type HTMLMediaElementProps = Partial<Pick<HTMLMediaElement, "src">>;

export type MuxMediaProps = HTMLMediaElementProps & MuxMediaPropTypes;
export type MuxMediaPropsInternal = MuxMediaProps & {
  playerSoftwareName: Options["data"]["player_software_name"];
  playerSoftwareVersion: Options["data"]["player_software_version"];
};

export const toPlaybackIdParts = (
  playbackIdWithOptionalParams: string
): [string, string?] => {
  const qIndex = playbackIdWithOptionalParams.indexOf("?");
  if (qIndex < 0) return [playbackIdWithOptionalParams];
  const idPart = playbackIdWithOptionalParams.slice(0, qIndex);
  const queryPart = playbackIdWithOptionalParams.slice(qIndex);
  return [idPart, queryPart];
};

export const toMuxVideoURL = (playbackId?: string) => {
  if (!playbackId) return undefined;
  const [idPart, queryPart = ""] = toPlaybackIdParts(playbackId);
  return `https://stream.mux.com/${idPart}.m3u8${queryPart}`;
};

export const inferMimeTypeFromURL = (url: string) => {
  let pathname = "";
  try {
    pathname = new URL(url).pathname;
  } catch (e) {
    console.error("invalid url");
  }

  const extDelimIdx = pathname.lastIndexOf(".");
  if (extDelimIdx < 0) return "";

  const ext = pathname.slice(extDelimIdx + 1);
  const upperExt = ext.toUpperCase();

  return isKeyOf(upperExt, ExtensionMimeTypeMap)
    ? ExtensionMimeTypeMap[upperExt]
    : "";
};

export const getType = (
  props: Partial<Pick<MuxMediaProps, "type" | "src">>
) => {
  const type = props.type;

  if (type) {
    const upperType = type.toUpperCase();

    return isKeyOf(upperType, MimeTypeShorthandMap)
      ? MimeTypeShorthandMap[upperType]
      : type;
  }

  const { src } = props;

  if (!src) return "";

  return inferMimeTypeFromURL(src);
};

export const getStreamTypeConfig = (streamType?: ValueOf<StreamTypes>) => {
  if (streamType === StreamTypes.LL_LIVE) {
    return {
      maxFragLookUpTolerance: 0.001,
    };
  }
  return {};
};

export const teardown = (
  mediaEl?: Pick<HTMLMediaElement, "mux"> | null,
  hls?: Pick<Hls, "detachMedia" | "destroy">
) => {
  if (hls) {
    hls.detachMedia();
    hls.destroy();
  }
  if (mediaEl?.mux && !mediaEl.mux.deleted) {
    mediaEl.mux.destroy();
    mediaEl.mux;
  }
};

export const setupHls = (
  props: Partial<
    Pick<
      MuxMediaProps,
      "debug" | "preferMse" | "streamType" | "type" | "src" | "startTime"
    >
  >,
  mediaEl?: Pick<HTMLMediaElement, "canPlayType"> | null
) => {
  const { debug, preferMse, streamType, startTime: startPosition = -1 } = props;
  const type = getType(props);
  const hlsType = type === ExtensionMimeTypeMap.M3U8;

  const canUseNative = !type || (mediaEl?.canPlayType(type) ?? true);
  const hlsSupported = Hls.isSupported();
  // NOTE: Native HLS playback on Android for LL-HLS has been flaky, so we're prefering
  // MSE for those conditions for now. (CJP)
  const userAgentStr = window?.navigator?.userAgent ?? "";
  const isAndroid = userAgentStr.toLowerCase().indexOf("android") !== -1;
  const defaultPreferMse = isAndroid && streamType === StreamTypes.LL_LIVE;

  // We should use native playback for hls media sources if we a) can use native playback and don't also b) prefer to use MSE/hls.js if/when it's supported
  const shouldUseNative =
    !hlsType ||
    (canUseNative && !((preferMse || defaultPreferMse) && hlsSupported));

  // 1. if we are trying to play an hls media source create hls if we should be using it "under the hood"
  if (hlsType && !shouldUseNative && hlsSupported) {
    const streamTypeConfig = getStreamTypeConfig(streamType);
    const hls = new Hls({
      // Kind of like preload metadata, but causes spinner.
      // autoStartLoad: false,
      debug,
      startPosition,
      ...streamTypeConfig,
    });

    return hls;
  }
  return undefined;
};

const MUX_VIDEO_DOMAIN = "mux.com";

export const setupMux = (
  props: Partial<
    Pick<
      MuxMediaPropsInternal,
      | "envKey"
      | "playerInitTime"
      | "beaconDomain"
      | "metadata"
      | "debug"
      | "playerSoftwareName"
      | "playerSoftwareVersion"
      | "playbackId"
      | "src"
    >
  >,
  mediaEl?: HTMLMediaElement | null,
  hlsjs?: Hls
) => {
  const { envKey: env_key, playbackId, src } = props;
  const inferredEnv =
    !!playbackId ||
    !!(
      typeof src === "string" &&
      new URL(src).hostname.includes(MUX_VIDEO_DOMAIN)
    );
  if ((env_key || inferredEnv) && mediaEl) {
    const {
      playerInitTime: player_init_time,
      playerSoftwareName: player_software_name,
      playerSoftwareVersion: player_software_version,
      beaconDomain,
      metadata,
      debug,
    } = props;

    mux.monitor(mediaEl, {
      debug,
      beaconDomain,
      hlsjs,
      Hls: hlsjs ? Hls : undefined,
      data: {
        ...(env_key ? { env_key } : {}),
        // Metadata fields
        player_software_name,
        player_software_version,
        player_init_time,
        // Use any metadata passed in programmatically (which may override the defaults above)
        ...metadata,
      },
    });
  }
};

export const loadMedia = (
  props: Partial<
    Pick<
      MuxMediaProps,
      "preferMse" | "src" | "type" | "startTime" | "streamType" | "autoplay"
    >
  >,
  mediaEl?: HTMLMediaElement | null,
  hls?: Pick<
    Hls,
    | "on"
    | "once"
    | "startLoad"
    | "recoverMediaError"
    | "destroy"
    | "loadSource"
    | "attachMedia"
    | "liveSyncPosition"
  >
) => {
  if (!mediaEl) {
    console.warn("attempting to load media before mediaEl exists");
    return;
  }
  const { preferMse, streamType } = props;
  const type = getType(props);
  const hlsType = type === ExtensionMimeTypeMap.M3U8;

  const canUseNative = !type || (mediaEl?.canPlayType(type) ?? true);
  const hlsSupported = Hls.isSupported();
  const userAgentStr = window?.navigator?.userAgent ?? "";
  // NOTE: Native HLS playback on Android for LL-HLS has been flaky, so we're prefering
  // MSE for those conditions for now. (CJP)
  const isAndroid = userAgentStr.toLowerCase().indexOf("android") !== -1;
  const defaultPreferMse = isAndroid && streamType === StreamTypes.LL_LIVE;

  // We should use native playback for hls media sources if we a) can use native playback and don't also b) prefer to use MSE/hls.js if/when it's supported
  const shouldUseNative =
    !hlsType ||
    (canUseNative && !((preferMse || defaultPreferMse) && hlsSupported));

  const { src } = props;
  if (mediaEl && canUseNative && shouldUseNative) {
    if (typeof src === "string") {
      const { startTime } = props;
      mediaEl.setAttribute("src", src);
      if (startTime) {
        const setStartTimeOnLoad = ({
          target,
        }: HTMLMediaElementEventMap["loadedmetadata"]) => {
          (target as HTMLMediaElement).currentTime = startTime;
          (target as HTMLMediaElement).removeEventListener(
            "loadedmetadata",
            setStartTimeOnLoad
          );
        };

        mediaEl.addEventListener("loadedmetadata", setStartTimeOnLoad);
      }
    } else {
      mediaEl.removeAttribute("src");
    }
  } else if (hls && src) {
    hls.on(Hls.Events.ERROR, (_event, data) => {
      // if (data.fatal) {
      //   switch (data.type) {
      //     case Hls.ErrorTypes.NETWORK_ERROR:
      //       // try to recover network error
      //       console.error("fatal network error encountered, try to recover");
      //       hls.startLoad();
      //       break;
      //     case Hls.ErrorTypes.MEDIA_ERROR:
      //       console.error("fatal media error encountered, try to recover");
      //       hls.recoverMediaError();
      //       break;
      //     default:
      //       // cannot recover
      //       console.error(
      //         "unrecoverable fatal error encountered, cannot recover (check logs for more info)"
      //       );
      //       hls.destroy();
      //       break;
      //   }
      // }

      const errorCodeMap: Record<string, number> = {
        [Hls.ErrorTypes.NETWORK_ERROR]: MediaError.MEDIA_ERR_NETWORK,
        [Hls.ErrorTypes.MEDIA_ERROR]: MediaError.MEDIA_ERR_DECODE,
      };
      const error = new MediaError("", errorCodeMap[data.type]);
      error.fatal = data.fatal;
      error.data = data;
      mediaEl.dispatchEvent(
        new CustomEvent("error", {
          detail: error,
        })
      );
    });

    const forceHiddenThumbnails = () => {
      // Keeping this a forEach in case we want to expand the scope of this.
      Array.from(mediaEl.textTracks).forEach((track) => {
        if (["subtitles", "caption"].includes(track.kind)) return;
        if (track.label !== "thumbnails") return;
        if (!track.cues?.length) {
          const trackEl = mediaEl.querySelector(
            'track[label="thumbnails"]'
          ) as HTMLTrackElement;
          // Force a reload of the cues if they've been removed
          const src = trackEl?.getAttribute("src") ?? "";
          trackEl?.removeAttribute("src");
          setTimeout(() => {
            trackEl?.setAttribute("src", src);
          }, 0);
        }
        // Force hidden mode if it's not hidden
        if (track.mode !== "hidden") {
          track.mode = "hidden";
        }
      });
    };

    // hls.js will forcibly clear all cues from tracks on manifest loads or media attaches.
    // This ensures that we re-load them after it's done that.
    hls.once(Hls.Events.MANIFEST_LOADED, forceHiddenThumbnails);
    hls.once(Hls.Events.MEDIA_ATTACHED, forceHiddenThumbnails);

    hls.loadSource(src);
    hls.attachMedia(mediaEl);
  } else {
    console.error(
      "It looks like the video you're trying to play will not work on this system! If possible, try upgrading to the newest versions of your browser or software."
    );
  }
};

export const initialize = (
  props: Partial<MuxMediaPropsInternal>,
  mediaEl?: HTMLMediaElement | null,
  hls?: Hls
) => {
  // Automatically tear down previously initialized mux data & hls instance if it exists.
  teardown(mediaEl, hls);
  const nextHlsInstance = setupHls(props, mediaEl);
  setupMux(props, mediaEl, nextHlsInstance);
  loadMedia(props, mediaEl, nextHlsInstance);
  return nextHlsInstance;
};

export class MediaError extends Error {
  static MEDIA_ERR_CUSTOM: number = 0;
  static MEDIA_ERR_ABORTED: number = 1;
  static MEDIA_ERR_NETWORK: number = 2;
  static MEDIA_ERR_DECODE: number = 3;
  static MEDIA_ERR_SRC_NOT_SUPPORTED: number = 4;
  static MEDIA_ERR_ENCRYPTED: number = 5;

  static defaultMessages: Record<number, string> = {
    1: "You aborted the media playback",
    2: "A network error caused the media download to fail.",
    3: "A media error caused playback to be aborted. The media could be corrupt or your browser does not support this format.",
    4: "An unsupported error occurred. The server or network failed, or your browser does not support this format.",
    5: "The media is encrypted and there are no keys to decrypt it.",
  };

  name: string;
  code: number;
  fatal: boolean;
  data?: any;

  constructor(message?: string, code: number = 0, fatal?: boolean) {
    super(message);
    this.name = "MediaError";
    this.code = code;
    this.fatal = fatal ?? code >= MediaError.MEDIA_ERR_NETWORK;

    if (!this.message) {
      this.message = MediaError.defaultMessages[this.code] ?? "";
    }
  }
}
