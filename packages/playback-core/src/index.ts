import mux, { Options } from "mux-embed";

import Hls, { HlsConfig } from "hls.js";
import { isKeyOf } from "./util";
export type ValueOf<T> = T[keyof T];

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
  startPosition: HlsConfig["startPosition"];
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
  if (mediaEl?.mux) {
    mediaEl.mux.destroy();
    mediaEl.mux;
  }
};

export const setupHls = (
  props: Partial<
    Pick<
      MuxMediaProps,
      "debug" | "preferMse" | "streamType" | "type" | "src" | "startPosition"
    >
  >,
  mediaEl?: Pick<HTMLMediaElement, "canPlayType"> | null
) => {
  const { debug, preferMse, streamType, startPosition = -1 } = props;
  const type = getType(props);
  const hlsType = type === ExtensionMimeTypeMap.M3U8;

  const canUseNative = !type || (mediaEl?.canPlayType(type) ?? true);
  const hlsSupported = Hls.isSupported();

  // We should use native playback for hls media sources if we a) can use native playback and don't also b) prefer to use MSE/hls.js if/when it's supported
  const shouldUseNative =
    !hlsType || (canUseNative && !(preferMse && hlsSupported));

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
    >
  >,
  mediaEl?: HTMLMediaElement | null,
  hlsjs?: Hls
) => {
  const { envKey: env_key } = props;
  if (env_key && mediaEl) {
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
        env_key, // required
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
  props: Partial<Pick<MuxMediaProps, "preferMse" | "src" | "type">>,
  mediaEl?: HTMLMediaElement | null,
  hls?: Pick<
    Hls,
    | "on"
    | "startLoad"
    | "recoverMediaError"
    | "destroy"
    | "loadSource"
    | "attachMedia"
  >
) => {
  if (!mediaEl) {
    console.warn("attempting to load media before mediaEl exists");
    return;
  }
  const { preferMse } = props;
  const type = getType(props);
  const hlsType = type === ExtensionMimeTypeMap.M3U8;

  const canUseNative = !type || (mediaEl?.canPlayType(type) ?? true);
  const hlsSupported = Hls.isSupported();

  // We should use native playback for hls media sources if we a) can use native playback and don't also b) prefer to use MSE/hls.js if/when it's supported
  const shouldUseNative =
    !hlsType || (canUseNative && !(preferMse && hlsSupported));

  const { src } = props;
  if (mediaEl && canUseNative && shouldUseNative) {
    if (typeof src === "string") {
      mediaEl.setAttribute("src", src);
    } else {
      mediaEl.removeAttribute("src");
    }
  } else if (hls && src) {
    hls.on(Hls.Events.ERROR, (_event, data) => {
      if (data.fatal) {
        switch (data.type) {
          case Hls.ErrorTypes.NETWORK_ERROR:
            // try to recover network error
            console.error("fatal network error encountered, try to recover");
            hls.startLoad();
            break;
          case Hls.ErrorTypes.MEDIA_ERROR:
            console.error("fatal media error encountered, try to recover");
            hls.recoverMediaError();
            break;
          default:
            // cannot recover
            console.error(
              "unrecoverable fatal error encountered, cannot recover (check logs for more info)"
            );
            hls.destroy();
            break;
        }
      }
    });

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
