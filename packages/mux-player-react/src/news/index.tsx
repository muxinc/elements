import React, { useRef, useState } from 'react';
import MuxPlayer, { MuxPlayerProps } from '@mux/mux-player-react/ads';
import NewsTheme from '@mux/mux-player-react/themes/news';
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
}

const MuxNewsPlayer = ({ videoList, ...props }: PlaylistProps) => {
  const mediaElRef = useRef<any>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isEndScreenVisible, setIsEndScreenVisible] = useState(false);
  const [playerKey, setPlayerKey] = useState(0);

  function playVideo() {
    setIsEndScreenVisible(false);
    setCurrentIndex(currentIndex + 1);
    setTimeout(() => {
      try {
        mediaElRef.current.play();
      } catch {
        // Ignore AbortError: The play() request was interrupted by a call to pause()
      }
    }, 200);
  }

  function selectVideo(index: number) {
    setIsEndScreenVisible(false);
    setCurrentIndex(index);
    setTimeout(() => {
      try {
        mediaElRef.current.play();
      } catch {
        // Ignore AbortError: The play() request was interrupted by a call to pause()
      }
    }, 200);
  }

  return (
    <MuxPlayer
      theme={NewsTheme}
      style={{ aspectRatio: '16/9' }}
      preferPlayback="mse"
      maxResolution="2160p"
      minResolution="540p"
      renditionOrder="desc"
      metadata={{
        video_title: videoList[currentIndex].title,
      }}
      {...props}
      ref={mediaElRef}
      key={`player-${playerKey}`}
      playbackId={videoList[currentIndex].playbackId}
      adTagUrl={videoList[currentIndex].adTagUrl}
      onEnded={(event) => {
        if (currentIndex < videoList.length - 1) {
          setIsEndScreenVisible(true);
        } else {
          setCurrentIndex(0);
          setPlayerKey((prev) => prev + 1);
        }
        props.onEnded?.(event);
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
  );
};

export default MuxNewsPlayer;
