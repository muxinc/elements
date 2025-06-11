import React, { useRef, useState } from 'react';
import '@mux/mux-video/ads';
import MuxPlayer, { MuxPlayerProps } from '@mux/mux-player-react';
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
        theme={NewsTheme}
        style={{ aspectRatio: '16/9' }}
        preferPlayback="mse"
        maxResolution="2160p"
        minResolution="540p"
        renditionOrder="desc"
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
    </div>
  );
};

export default MuxNewsPlayer;
