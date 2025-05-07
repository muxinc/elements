'use client';
import Link from "next/link";
import Head from 'next/head';
import { useRef, useState, useEffect } from "react";
import '@mux/mux-video-ads';
import MuxPlayer from "@mux/mux-player-react";
import  NewsTheme  from "@mux/mux-player-react/themes/news-theme";

const INITIAL_AUTOPLAY = false;
const INITIAL_MUTED = false;

function MuxPlayerAdsPage() {
  const mediaElRef = useRef(null);
  const [autoplay, setAutoplay] = useState<"muted" | boolean>(INITIAL_AUTOPLAY);
  const [muted, setMuted] = useState(INITIAL_MUTED);
  const [paused, setPaused] = useState<boolean | undefined>(true);

  const [sdkLoaded, setSdkLoaded] = useState(false);

  useEffect(() => {
    // Dynamically load the IMA SDK
    const loadImaSdk = () => {
      const script = document.createElement("script");
      script.src = "https://imasdk.googleapis.com/js/sdkloader/ima3.js";
      script.async = true;
      script.onload = () => {
        setSdkLoaded(true);  // Mark SDK as loaded
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

  return (
    <>
      <Head>
        <title>&lt;MuxPlayer/&gt; (theme) Demo</title>
      </Head>
      <NewsTheme/>

      {sdkLoaded && <MuxPlayer
        ref={mediaElRef}
        playbackId="ihZa7qP1zY8oyLSQW9TS602VgwQvNdyIvlk9LInEGU2s"
        theme="news-theme"
        themeProps={{ controlBarVertical: true, controlBarPlace: 'start start' }}
        metadata={{
          video_id: "video-id-12345",
          video_title: "Elephants Dream",
          viewer_user_id: "user-id-6789",
        }}
        streamType="on-demand"
        // envKey="mux-data-env-key"
        autoPlay={autoplay}
        muted={muted}
        muxVideoElement='mux-video-ads'
        adTagUrl='https://pubads.g.doubleclick.net/gampad/ads?iu=/21775744923/external/single_preroll_skippable&sz=640x480&ciu_szs=300x250%2C728x90&gdfp_req=1&output=vast&unviewed_position_start=1&env=vp&impl=s&correlator='
        onPlay={() => {
          setPaused(false);
        }}
        onPause={() => {
          setPaused(true);
        }}
      />}
    </>
  );
}

export default MuxPlayerAdsPage;
