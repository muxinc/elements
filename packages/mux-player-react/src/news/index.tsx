import React, { useEffect, useRef, useState } from 'react';
import MuxPlayer, { MuxPlayerProps } from '@mux/mux-player-react/ads';
import NewsTheme from '@mux/mux-player-react/themes/news';
import PlaylistEndScreen from './playlist-end-screen';

export interface VideoItem {
  imageUrl: string;
  title: string;
  playbackId: string;
  adTagUrl: string | (() => string) | (() => Promise<string>); // NOTE: Consider making this and possibly other props optional (CJP)
}

export type PlaylistVideos = VideoItem[];

export interface PlaylistProps extends Omit<MuxPlayerProps, 'playbackId' | 'adTagUrl'> {
  videoList: PlaylistVideos;
}

const MuxNewsPlayer = ({ videoList, ...props }: PlaylistProps) => {
  const mediaElRef = useRef<any>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const [currentAdTagUrlString, setCurrentAdTagUrlString] = useState(
    typeof videoList[currentIndex]?.adTagUrl === 'string' ? videoList[currentIndex]?.adTagUrl : undefined
  );

  useEffect(() => {
    setCurrentIndex(0);
  }, [videoList]);

  useEffect(() => {
    const videoAdTagUrl = videoList[currentIndex]?.adTagUrl;
    if (typeof videoAdTagUrl === 'string') {
      setCurrentAdTagUrlString(videoAdTagUrl);
    } else if (typeof videoAdTagUrl === 'function') {
      const adTagUrlFnReturnVal = videoAdTagUrl();
      if (typeof adTagUrlFnReturnVal === 'string') {
        setCurrentAdTagUrlString(adTagUrlFnReturnVal);
      } else if (typeof adTagUrlFnReturnVal?.then === 'function') {
        setCurrentAdTagUrlString(undefined);
        adTagUrlFnReturnVal.then(setCurrentAdTagUrlString);
      }
    }
  }, [currentIndex]);

  const [endScreenVisible, setEndScreenVisible] = useState(false);
  const [playerKey, setPlayerKey] = useState(0);

  function selectVideo(index: number) {
    setEndScreenVisible(false);
    setCurrentAdTagUrlString(undefined);
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
      playbackId={currentAdTagUrlString ? videoList[currentIndex].playbackId : undefined}
      adTagUrl={currentAdTagUrlString}
      onEnded={(event) => {
        if (currentIndex < videoList.length - 1) {
          setEndScreenVisible(true);
        } else {
          setCurrentIndex(0);
          setPlayerKey((prev) => prev + 1);
        }
        props.onEnded?.(event);
      }}
    >
      <PlaylistEndScreen
        currentIndex={currentIndex}
        relatedVideos={videoList}
        visible={endScreenVisible}
        selectVideoCallback={selectVideo}
      />
    </MuxPlayer>
  );
};

export default MuxNewsPlayer;
