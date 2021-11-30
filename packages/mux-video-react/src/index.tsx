import mux, { Options } from "mux-embed";

import Hls from "hls.js";
import { getPlayerVersion } from "./env";
import { isKeyOf } from "./util";
import useCombinedRefs from "./use-combined-refs";
import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";

type ValueOf<T> = T[keyof T];

type StreamTypes = {
  VOD: "on-demand";
  LIVE: "live";
  LL_LIVE: "ll-live";
};

const StreamTypes: StreamTypes = {
  VOD: "on-demand",
  LIVE: "live",
  LL_LIVE: "ll-live",
};

type ExtensionMimeTypeMap = {
  M3U8: "application/vnd.apple.mpegurl";
  MP4: "video/mp4";
};

const ExtensionMimeTypeMap: ExtensionMimeTypeMap = {
  M3U8: "application/vnd.apple.mpegurl",
  MP4: "video/mp4",
};

type MimeTypeShorthandMap = {
  HLS: ExtensionMimeTypeMap["M3U8"];
};

const MimeTypeShorthandMap: MimeTypeShorthandMap = {
  HLS: ExtensionMimeTypeMap.M3U8,
};

type MuxMediaPropTypes = {
  envKey: Options["data"]["env_key"];
  debug: Options["debug"] & Hls["config"]["debug"];
  metadata: Options["data"];
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
};

declare global {
  interface HTMLMediaElement {
    mux?: typeof mux;
  }
}

type HTMLVideoElementProps = React.DetailedHTMLProps<
  React.VideoHTMLAttributes<HTMLVideoElement>,
  HTMLVideoElement
>;

type MuxVideoProps = HTMLVideoElementProps & MuxMediaPropTypes;

const toPlaybackIdParts = (
  playbackIdWithOptionalParams: string
): [string, string?] => {
  const qIndex = playbackIdWithOptionalParams.indexOf("?");
  if (qIndex < 0) return [playbackIdWithOptionalParams];
  const idPart = playbackIdWithOptionalParams.slice(0, qIndex);
  const queryPart = playbackIdWithOptionalParams.slice(qIndex);
  return [idPart, queryPart];
};

const toMuxVideoURL = (playbackId?: string) => {
  if (!playbackId) return undefined;
  const [idPart, queryPart = ""] = toPlaybackIdParts(playbackId);
  return `https://stream.mux.com/${idPart}.m3u8${queryPart}`;
};

const inferMimeTypeFromURL = (url: string) => {
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

const getType = (props: Partial<MuxVideoProps>) => {
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

const getStreamTypeConfig = (streamType?: ValueOf<StreamTypes>) => {
  if (streamType === StreamTypes.LL_LIVE) {
    return {
      maxFragLookUpTolerance: 0.001,
    };
  }
  return {};
};

const teardown = (mediaEl?: HTMLMediaElement | null, hls?: Hls) => {
  if (hls) {
    hls.detachMedia();
    hls.destroy();
  }
  if (mediaEl?.mux) {
    mediaEl.mux.destroy();
    mediaEl.mux;
  }
};

const setupHls = (
  props: Partial<MuxVideoProps>,
  mediaEl?: HTMLMediaElement | null
) => {
  const { debug, preferMse } = props;
  const type = getType(props);
  const hlsType = type === ExtensionMimeTypeMap.M3U8;

  const canUseNative = !type || (mediaEl?.canPlayType(type) ?? true);
  const hlsSupported = Hls.isSupported();

  // We should use native playback for hls media sources if we a) can use native playback and don't also b) prefer to use MSE/hls.js if/when it's supported
  const shouldUseNative =
    !hlsType || (canUseNative && !(preferMse && hlsSupported));

  // 1. if we are trying to play an hls media source create hls if we should be using it "under the hood"
  if (hlsType && !shouldUseNative && hlsSupported) {
    const streamTypeConfig = getStreamTypeConfig(props.streamType);
    const hls = new Hls({
      // Kind of like preload metadata, but causes spinner.
      // autoStartLoad: false,
      debug,
      ...streamTypeConfig,
    });

    return hls;
  }
  return undefined;
};

const setupMux = (
  props: Partial<MuxVideoProps>,
  mediaEl?: HTMLMediaElement | null,
  hlsjs?: Hls
) => {
  const env_key = props.envKey;
  if (env_key && mediaEl) {
    const player_init_time = props.playerInitTime;
    const { beaconDomain, metadata, debug } = props;
    /**
     * @TODO Use documented version if/when resolved (commented out below) (CJP)
     * @see https://github.com/snowpackjs/snowpack/issues/3621
     * @see https://www.snowpack.dev/reference/environment-variables#option-2-config-file
     */
    // @ts-ignore
    const player_version = getPlayerVersion();

    mux.monitor(mediaEl, {
      debug,
      beaconDomain,
      hlsjs,
      Hls: hlsjs ? Hls : undefined,
      data: {
        env_key, // required
        // Metadata fields
        player_name: "mux-video", // default player name for "mux-video"
        player_version,
        player_init_time,
        // Use any metadata passed in programmatically (which may override the defaults above)
        ...metadata,
      },
    });
  }
};

const loadMedia = (
  props: Partial<MuxVideoProps>,
  mediaEl?: HTMLMediaElement | null,
  hls?: Hls
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

const MuxVideo = React.forwardRef<
  HTMLVideoElement | undefined,
  Partial<MuxVideoProps>
>((props, ref) => {
  const {
    envKey,
    debug,
    beaconDomain,
    playbackId,
    preferMse,
    type,
    streamType,
    src: outerSrc,
    children,
    ...restProps
  } = props;

  const [playerInitTime] = useState(Date.now());

  const [src, setSrc] = useState<MuxVideoProps["src"]>(
    toMuxVideoURL(playbackId) ?? outerSrc
  );

  const hlsRef = useRef<Hls | undefined>(undefined);
  const innerMediaElRef = useRef<HTMLVideoElement>(null);

  const mediaElRef = useCombinedRefs(innerMediaElRef, ref);

  useEffect(() => {
    const src = toMuxVideoURL(playbackId) ?? outerSrc;
    setSrc(src);
  }, [outerSrc, playbackId]);

  useEffect(() => {
    teardown(mediaElRef.current, hlsRef.current);
    const propsWithState = { ...props, src, playerInitTime };
    hlsRef.current = setupHls(propsWithState, mediaElRef.current);
    setupMux(propsWithState, mediaElRef.current, hlsRef.current);
    loadMedia(propsWithState, mediaElRef.current, hlsRef.current);
  }, [src]);

  return (
    <video ref={mediaElRef} {...restProps}>
      {children}
    </video>
  );
});

const shorthandKeys = Object.keys(MimeTypeShorthandMap);
const allTypes = [
  ...(Object.values(ExtensionMimeTypeMap) as ValueOf<ExtensionMimeTypeMap>[]),
  ...(shorthandKeys as (keyof MimeTypeShorthandMap)[]),
  ...(shorthandKeys.map((k) => k.toUpperCase()) as `${Uppercase<
    keyof MimeTypeShorthandMap
  >}`[]),
  ...(shorthandKeys.map((k) => k.toLowerCase()) as `${Lowercase<
    keyof MimeTypeShorthandMap
  >}`[]),
];

MuxVideo.propTypes = {
  envKey: PropTypes.string,
  debug: PropTypes.bool,
  // Improve this by adding a full shape() definition for all metadata props
  // metadata: PropTypes.shape({}),
  metadata: PropTypes.any,
  beaconDomain: PropTypes.string,
  playbackId: PropTypes.string,
  playerInitTime: PropTypes.number,
  preferMse: PropTypes.bool,
  type: PropTypes.oneOf(allTypes),
  streamType: PropTypes.oneOf(Object.values(StreamTypes)),
};

export default MuxVideo;
