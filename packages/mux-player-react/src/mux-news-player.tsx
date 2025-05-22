/* eslint @typescript-eslint/triple-slash-reference: "off" */
/// <reference types="google_interactive_media_ads_types" preserve="true"/>
import React, { useRef, useState } from 'react';
import type { MuxPlayerProps } from '@mux/mux-player-react'; // ✅ import prop types
import PlaylistEndScreen from './playlist-end-screen';
import '@mux/mux-video-ads';
import MuxPlayer from '@mux/mux-player-react';
import NewsTheme from './themes/news-theme';

const INITIAL_AUTOPLAY = false;
const INITIAL_MUTED = false;

export interface VideoItem {
  imageUrl: string;
  title: string;
  playbackId: string;
  adTagUrl: string;
}

export type PlaylistVideos = VideoItem[];

export interface PlaylistProps extends Omit<MuxPlayerProps, 'playbackId' | 'adTagUrl'> {
  videoList: PlaylistVideos;
  allowPlaybackWithAdBlocker?: boolean;
}

export const MuxNewsPlayer = ({ videoList, allowPlaybackWithAdBlocker, ...muxPlayerProps }: PlaylistProps) => {
  const mediaElRef = useRef<any>(null);
  const [autoplay, setAutoplay] = useState<'muted' | boolean>(INITIAL_AUTOPLAY);
  const [muted, setMuted] = useState(INITIAL_MUTED);
  const [paused, setPaused] = useState<boolean | undefined>(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isEndScreenVisible, setIsEndScreenVisible] = useState(false);
  const [playerKey, setPlayerKey] = useState(0);

  function playVideo() {
    setIsEndScreenVisible(false);
    setCurrentIndex(currentIndex + 1);
    setTimeout(() => {
      mediaElRef.current.play();
    }, 200);
  }

  function selectVideo(index: number) {
    setIsEndScreenVisible(false);
    setCurrentIndex(index);
    setTimeout(() => {
      mediaElRef.current.play();
    }, 200);
  }

  return (
    <div>
      <NewsTheme />
      <MuxPlayer
        {...muxPlayerProps}
        allowPlaybackWithAdBlocker={allowPlaybackWithAdBlocker}
        ref={mediaElRef}
        theme="news-theme"
        themeProps={{ controlBarVertical: true, controlBarPlace: 'start start' }}
        key={`player-${playerKey}`}
        playbackId={videoList[currentIndex].playbackId}
        style={{ aspectRatio: '16/9' }}
        muxVideoElement="mux-video-ads"
        autoPlay={autoplay}
        muted={muted}
        maxResolution="2160p"
        minResolution="540p"
        renditionOrder="desc"
        preferPlayback="mse"
        adTagUrl={videoList[currentIndex].adTagUrl}
        onPlay={() => {
          setPaused(false);
        }}
        onPause={() => {
          setPaused(true);
        }}
        onEnded={(_event) => {
          console.log('ONENDED');
          if (currentIndex < videoList.length - 1) {
            setIsEndScreenVisible(true);
          } else {
            setCurrentIndex(0);
            setPlayerKey((prev) => prev + 1);
          }
        }}
      >
        <PlaylistEndScreen
          video={currentIndex < videoList.length - 1 ? videoList[currentIndex + 1] : videoList[0]}
          relatedVideos={videoList}
          isVisible={isEndScreenVisible}
          selectVideoCallback={selectVideo}
          timerCallback={playVideo}
        />
      </MuxPlayer>
    </div>
  );
};
