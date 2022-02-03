import React, { useCallback, useEffect, useState } from "react";
import MuxVideo from "@mux-elements/mux-video-react";
import { MediaController } from "./media-chrome";
import { useRef } from "react";
import { StreamTypes, ValueOf } from "@mux-elements/playback-core";
import { useBoundingclientrect } from "./hooks/useBoundingclientrect";
import { useCombinedRefs } from "./hooks/useCombinedRefs";
import DefaultChromeRenderer from "./components/DefaultChromeRenderer";
import { MediaChromeSizes } from "./shared/constants";
import { MuxPlayerProps } from "./types";
import {
  getChromeStylesFromProps,
  getPosterURLFromPlaybackId,
  getStoryboardURLFromPlaybackId,
  hasVolumeSupportAsync,
} from "./shared/utils";
import Styles from "./components/Styles";

export { StreamTypes };

const SMALL_BREAKPOINT = 700;

export const MuxPlayer = React.forwardRef<
  HTMLVideoElement | undefined,
  Omit<MuxPlayerProps, "ref">
>((props, ref) => {
  const {
    playbackId = "",
    streamType,
    envKey,
    metadata,
    startTime,
    preferMse,
    //   src,
    poster,
    muted,
    autoPlay,
    debug,
    defaultShowCaptions = true,
    ChromeRenderer = DefaultChromeRenderer,
    children,
    key,
    onPlayerReady,
    // onError,
    ...restProps
  } = props;

  const { src } = restProps;

  const muxVideoRef = useRef<HTMLVideoElement>();
  const mediaElRef = useCombinedRefs(muxVideoRef, ref);

  const [supportsVolume, setSupportsVolume] = useState<boolean>();
  useEffect(() => {
    (async () => {
      setSupportsVolume(await hasVolumeSupportAsync());
    })();
  }, []);

  const [srcLoaded, setSrcLoaded] = useState<boolean>();

  /*
   * This is a pretty naiive check -- may have to make this more sophisticated
   */
  const onLoadingStateChange = useCallback(({ target }: Event) => {
    const mediaEl = target as HTMLMediaElement;
    const nextIsLoading = mediaEl.readyState < 3;
    if (!srcLoaded && nextIsLoading) {
      setSrcLoaded(true);
    }
  }, []);

  const [supportsAirPlay, setSupportsAirPlay] = useState<boolean>();
  const onPlaybackTargetChanged = (
    event: Event & { availability?: boolean }
  ) => {
    setSupportsAirPlay(!!event.availability);
  };

  const [captionsAvailable, setCaptionsAvailable] = useState<boolean>();

  useEffect(() => {
    setSrcLoaded(undefined);
    setCaptionsAvailable(undefined);
    setPlayerReady(false);
  }, [src, playbackId]);

  const onTrackCountChange = ({ target }: TrackEvent) => {
    const textTracks = target as TextTrackList;
    const ccSubTracks = Array.from(textTracks).filter(
      ({ kind }) => kind === "subtitles" || kind === "captions"
    );

    // NOTE: This is a hack solution to "default" CC selection. Solution *should*
    // be better default state support in media-chrome (CJP).
    // if (defaultShowCaptions && ccSubTracks.length && muxVideoRef.current) {
    //   const [ccSubTrack] = ccSubTracks;
    //   const eventType =
    //     ccSubTrack.kind === "captions"
    //       ? "mediashowcaptionsrequest"
    //       : "mediashowsubtitlesrequest";
    //   const showCCSubEvent = new CustomEvent(eventType, {
    //     composed: true,
    //     bubbles: true,
    //     detail: ccSubTrack,
    //   });
    //   muxVideoRef.current.dispatchEvent(showCCSubEvent);
    // }
    setCaptionsAvailable(!!ccSubTracks.length);
  };

  const muxVideoRefCb = useCallback((node?: HTMLVideoElement) => {
    if (mediaElRef?.current) {
      mediaElRef.current.removeEventListener(
        "timeupdate",
        onLoadingStateChange
      );
      mediaElRef.current.removeEventListener("canplay", onLoadingStateChange);
      mediaElRef.current.removeEventListener(
        "loadedmetadata",
        onLoadingStateChange
      );
      mediaElRef.current.removeEventListener("waiting", onLoadingStateChange);

      // Remove Event Handlers from prev
      if (!!window.WebKitPlaybackTargetAvailabilityEvent) {
        mediaElRef.current.removeEventListener(
          "webkitplaybacktargetavailabilitychanged",
          onPlaybackTargetChanged
        );
      }

      mediaElRef.current.textTracks.removeEventListener(
        "addtrack",
        onTrackCountChange
      );
      mediaElRef.current.textTracks.removeEventListener(
        "removetrack",
        onTrackCountChange
      );
    }

    mediaElRef.current = node;
    if (!mediaElRef?.current) return;

    const { textTracks } = mediaElRef.current;
    const ccSubTracks = Array.from(textTracks).filter(
      ({ kind }) => kind === "subtitles" || kind === "captions"
    );

    // NOTE: This is a hack solution to "default" CC selection. Solution *should*
    // be better default state support in media-chrome (CJP).
    // if (defaultShowCaptions && ccSubTracks.length) {
    //   const [ccSubTrack] = ccSubTracks;
    //   const eventType =
    //     ccSubTrack.kind === "captions"
    //       ? "mediashowcaptionsrequest"
    //       : "mediashowsubtitlesrequest";
    //   const showCCSubEvent = new CustomEvent(eventType, {
    //     composed: true,
    //     bubbles: true,
    //     detail: ccSubTrack,
    //   });
    //   mediaElRef.current.dispatchEvent(showCCSubEvent);
    // }
    setCaptionsAvailable(!!ccSubTracks.length);

    mediaElRef.current.addEventListener("timeupdate", onLoadingStateChange);
    mediaElRef.current.addEventListener("canplay", onLoadingStateChange);
    mediaElRef.current.addEventListener("loadedmetadata", onLoadingStateChange);
    mediaElRef.current.addEventListener("waiting", onLoadingStateChange);
    mediaElRef.current.addEventListener("stalled", onLoadingStateChange);

    mediaElRef.current.addEventListener(
      "webkitplaybacktargetavailabilitychanged",
      onPlaybackTargetChanged
    );

    mediaElRef.current.textTracks.addEventListener(
      "addtrack",
      onTrackCountChange
    );
    mediaElRef.current.textTracks.addEventListener(
      "removetrack",
      onTrackCountChange
    );
  }, []);

  const [playerSize, setPlayerSize] = useState<
    ValueOf<typeof MediaChromeSizes>
  >(MediaChromeSizes.LG);

  const mediaControllerRef = useRef(null);
  const mediaControllerRect = useBoundingclientrect(mediaControllerRef);
  useEffect(() => {
    if (!mediaControllerRect) return;

    const nextPlayerSize =
      mediaControllerRect.width < SMALL_BREAKPOINT
        ? MediaChromeSizes.SM
        : MediaChromeSizes.LG;

    setPlayerSize(nextPlayerSize);
  }, [mediaControllerRect]);

  const [playerReady, setPlayerReady] = useState(false);
  useEffect(() => {
    const allReady = ![
      supportsVolume,
      supportsAirPlay,
      captionsAvailable,
      srcLoaded,
    ].every((value) => value != undefined);

    if (!allReady) return;
    setPlayerReady(true);
    // params?
  }, [supportsVolume, supportsAirPlay, captionsAvailable, srcLoaded]);
  useEffect(() => {
    if (!onPlayerReady) return;
    if (!playerReady) return;
    onPlayerReady();
  }, [playerReady]);

  return (
    <>
      <Styles />
      <MediaController
        className="mux-player"
        ref={mediaControllerRef}
        style={getChromeStylesFromProps(props)}
        autohide={1}
      >
        <MuxVideo
          // This results in an RTE from Media Chrome/<media-controller>
          // when swapping instances based on key changes. Need to investigate.
          // Likely edge case bug in Media Chrome/<media-controller>.
          // key={playbackId}
          ref={muxVideoRefCb}
          slot="media"
          // src={src}
          playbackId={playbackId}
          envKey={envKey}
          streamType={streamType}
          metadata={metadata}
          debug={debug}
          startTime={startTime}
          preferMse={preferMse}
          autoPlay={
            autoPlay ||
            streamType === StreamTypes.LIVE ||
            streamType === StreamTypes.LL_LIVE
          }
          poster={poster ?? getPosterURLFromPlaybackId(playbackId)}
          crossOrigin=""
          playsInline
          muted={muted}
          {...restProps}
        >
          <track
            label="thumbnails"
            default
            kind="metadata"
            src={getStoryboardURLFromPlaybackId(playbackId)}
          />
          {children}
        </MuxVideo>
        {/* <Poster playbackId={playbackId} poster={poster} onLoaded={() => console.log('loaded!!!!')}/> */}
        <ChromeRenderer
          captionsAvailable={captionsAvailable}
          supportsVolume={supportsVolume}
          paused={!!muxVideoRef.current?.paused}
          supportsAirPlay={supportsAirPlay}
          streamType={streamType}
          playerSize={playerSize}
        />
      </MediaController>
    </>
  );
});

export default MuxPlayer;
