/* eslint @typescript-eslint/triple-slash-reference: "off" */
/// <reference types="google_interactive_media_ads_types" preserve="true"/>
import React, { useRef, useState } from 'react';
import '@mux/mux-video/ads';
import '@mux/mux-player/themes/news';
import MuxPlayer, { MuxPlayerProps } from '@mux/mux-player-react';
import PlaylistEndScreen from './playlist-end-screen';

export interface VideoItem {
  imageUrl: string;
  title: string;
  playbackId: string;
  adTagUrl: string;
}

export type PlaylistVideos = VideoItem[];

export interface PlaylistProps extends Omit<MuxPlayerProps, 'playbackId' | 'adTagUrl'> {
  videoList: PlaylistVideos;
  allowAdBlocker?: boolean;
}

const MuxNewsPlayer = ({ allowAdBlocker, videoList, ...props }: PlaylistProps) => {
  const mediaElRef = useRef<any>(null);
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
      <MuxPlayer
        {...props}
        allowAdBlocker={allowAdBlocker}
        ref={mediaElRef}
        theme="news"
        key={`player-${playerKey}`}
        playbackId={videoList[currentIndex].playbackId}
        style={{ aspectRatio: '16/9' }}
        maxResolution="2160p"
        minResolution="540p"
        renditionOrder="desc"
        preferPlayback="mse"
        adTagUrl={videoList[currentIndex].adTagUrl}
        onEnded={(_event) => {
          if (currentIndex < videoList.length - 1) {
            setIsEndScreenVisible(true);
          } else {
            setCurrentIndex(0);
            setPlayerKey((prev) => prev + 1);
          }
        }}
        {...props}
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

export default MuxNewsPlayer;
