import React, { useEffect, useMemo } from "react";
import MuxVideo from "@mux-elements/mux-video-react";
import type { Props as MuxVideoProps } from "@mux-elements/mux-video-react";
import {
  MediaController,
  MediaControlBar,
  MediaPlayButton,
  MediaSeekBackwardButton,
  MediaSeekForwardButton,
  MediaMuteButton,
  MediaVolumeRange,
  MediaTimeRange,
  MediaTimeDisplay,
  MediaCaptionsButton,
  MediaPlaybackRateButton,
  MediaPipButton,
  MediaFullscreenButton,
} from "./media-chrome.js";
import { useRef } from "react";

const getPosterURLFromPlaybackId = (playbackId: MuxVideoProps["playbackId"]) =>
  `https://image.mux.com/${playbackId}/thumbnail.jpg`;

const getStoryboardURLFromPlaybackId = (
  playbackId: MuxVideoProps["playbackId"]
) => `https://image.mux.com/${playbackId}/storyboard.vtt`;

type ChromeProps = {};

export const VodChromeSmall = () => {};

export const VodChromeLarge: React.FC<ChromeProps> = (props) => {
  return (
    <>
      <div slot="centered-chrome">
        <MediaSeekBackwardButton></MediaSeekBackwardButton>
        <MediaPlayButton></MediaPlayButton>
        <MediaSeekForwardButton></MediaSeekForwardButton>
      </div>
      <MediaControlBar>
        <MediaTimeRange></MediaTimeRange>
        <MediaTimeDisplay show-duration remaining></MediaTimeDisplay>
      </MediaControlBar>
      <MediaControlBar>
        <MediaPlayButton></MediaPlayButton>
        <MediaSeekForwardButton></MediaSeekForwardButton>
        <MediaSeekBackwardButton></MediaSeekBackwardButton>
        <MediaMuteButton></MediaMuteButton>
        <MediaVolumeRange></MediaVolumeRange>
        <div></div>
        <MediaTimeRange></MediaTimeRange>
        <MediaTimeDisplay show-duration remaining></MediaTimeDisplay>
        <MediaCaptionsButton></MediaCaptionsButton>
        <MediaPlaybackRateButton></MediaPlaybackRateButton>
        <MediaPipButton></MediaPipButton>
        <MediaFullscreenButton></MediaFullscreenButton>
      </MediaControlBar>
    </>
  );
};

export const LiveChromeSmall = () => {};
export const LiveChromeLarge = () => {};

export const DefaultChromeRenderer: React.FC<ChromeProps> = (props) => {
  return <VodChromeLarge />;
};

type ReactInstanceBasic = React.ReactElement | null;
export type MuxPlayerProps = Partial<MuxVideoProps> & {
  ChromeRenderer: (props: ChromeProps) => ReactInstanceBasic;
};

export const MuxPlayer: React.FC<MuxPlayerProps> = ({
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
  ChromeRenderer = DefaultChromeRenderer,
}) => {
  const muxVideoRef = useRef(null);
  let isAndroid = false;

  useEffect(() => {
    isAndroid =
      window?.navigator?.userAgent.toLowerCase().indexOf("android") !== -1;
  }, []);

  /*
   *
   * For Android specifically with ll-live, it has a BadTime with native,
   * so we're going to force mse for that situation
   *
   */
  const defaultPreferMSE = useMemo(() => {
    if (isAndroid && streamType === "ll-live") {
      return true;
    }
    return undefined;
  }, [isAndroid, streamType]);

  return (
    <MediaController>
      <MuxVideo
        key={playbackId}
        ref={muxVideoRef}
        slot="media"
        // src={src}
        playbackId={playbackId}
        envKey={envKey}
        streamType={streamType}
        metadata={metadata}
        debug={debug}
        startTime={startTime}
        preferMse={preferMse ?? defaultPreferMSE}
        autoPlay={autoPlay}
        poster={poster ?? getPosterURLFromPlaybackId(playbackId)}
        crossOrigin=""
        playsInline
        muted={muted}
      >
        <track
          label="thumbnails"
          default
          kind="metadata"
          src={getStoryboardURLFromPlaybackId(playbackId)}
        />
      </MuxVideo>
      <ChromeRenderer />
    </MediaController>
  );
};

export default MuxPlayer;
