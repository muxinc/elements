import React, { useEffect, useRef, useState } from "react";
import PlaylistPostVideo from "./playlist-post-video";
import '@mux/mux-video-ads';
import MuxPlayer from "@mux/mux-player-react";
import NewsweekTheme from "../pages/newsweek-theme";

const INITIAL_AUTOPLAY = false;
const INITIAL_MUTED = false;

const Playlist = ({videoList}) => {
  const mediaElRef = useRef(null);
  const [autoplay, setAutoplay] = useState<"muted" | boolean>(INITIAL_AUTOPLAY);
  const [muted, setMuted] = useState(INITIAL_MUTED);
  const [paused, setPaused] = useState<boolean | undefined>(true);
  const [sdkLoaded, setSdkLoaded] = useState(false);  
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isEndScreenVisible, setIsEndScreenVisible] = useState(false);
  const [playerKey, setPlayerKey] = useState(0);
  
  
  useEffect(() => {
    // Dynamically load the IMA SDK
    const loadImaSdk = () => {
      const script = document.createElement("script");
      script.src = "https://imasdk.googleapis.com/js/sdkloader/ima3.js";
      script.async = true;

      script.onload = () => {
        setSdkLoaded(true); // Mark SDK as loaded
        console.log("Google IMA SDK loaded");
      };

      script.onerror = () => {
        console.warn("Google IMA SDK failed to load. Likely blocked by ad blocker.");
        setSdkLoaded(true);
      };

      document.head.appendChild(script);
    };

    if (!window.google || !window.google.ima) {
      loadImaSdk();
    } else {
      setSdkLoaded(true);
    }
  
    return () => {
      // Cleanup by removing the script
      const scriptElement = document.querySelector('script[src="https://imasdk.googleapis.com/js/sdkloader/ima3.js"]');
      if (scriptElement) {
        scriptElement.remove();
      }
    };
  }, []);

  function playVideo() {
    setIsEndScreenVisible(false);
    setCurrentIndex(currentIndex + 1);
    setTimeout(() => {
      mediaElRef.current.play();
    }, 200);
  }

  function selectVideo(index) {
    setIsEndScreenVisible(false);
    setCurrentIndex(index);
    setTimeout(() => {
      mediaElRef.current.play();
    }, 200);
  }

  return (
    <div>
      <NewsweekTheme/>
      {sdkLoaded && <MuxPlayer
          ref={mediaElRef}
          theme="newsweek-theme"
          themeProps={{ controlBarVertical: true, controlBarPlace: 'start start' }}
          key={`player-${playerKey}`}
          playbackId={videoList[currentIndex].playbackId}
          style={{ aspectRatio: "16/9" }}
          muxVideoElement='mux-video-ads'
          autoPlay={autoplay}
          muted={muted}
          maxResolution="2160p"
          minResolution="540p"
          renditionOrder="desc"
          preferPlayback="native"
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
              setPlayerKey(prev => prev + 1);
            }
          }}
        >
           <PlaylistPostVideo video={currentIndex < videoList.length - 1 ? videoList[currentIndex + 1] : videoList[0]} relatedVideos={videoList} isVisible={isEndScreenVisible} selectVideoCallback={selectVideo} timerCallback={playVideo} />
      </MuxPlayer>}

    </div>
  )
}

export default Playlist;