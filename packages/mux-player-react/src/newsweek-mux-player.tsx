import React, { useRef, useState } from 'react';
import PlaylistEndScreen from './playlist-end-screen';
import MuxPlayer from '@mux/mux-player-react';
import NewsweekTheme from './themes/newsweek-theme';

const INITIAL_AUTOPLAY = false;
const INITIAL_MUTED = false;

export interface VideoItem {
  imageUrl: string;
  title: string;
  playbackId: string;
  adTagUrl: string;
}

export type PlaylistVideos = VideoItem[];

export interface PlaylistProps {
  videoList: PlaylistVideos;
}

export const NewsweekMuxPlayer = ({ videoList }: PlaylistProps) => {
  const mediaElRef = useRef<any>(null);
  const [autoplay, setAutoplay] = useState<'muted' | boolean>(INITIAL_AUTOPLAY);
  const [muted, setMuted] = useState(INITIAL_MUTED);
  const [paused, setPaused] = useState<boolean | undefined>(true);
  const [sdkLoaded, setSdkLoaded] = useState(false);
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
      <NewsweekTheme />
      <MuxPlayer
        ref={mediaElRef}
        theme="newsweek-theme"
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
        onEnded={(event) => {
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
