import Head from 'next/head';
import { useRef, useState, useEffect } from "react";
import MuxVideoAds from "@mux/mux-video/ads/react";
import '../post-video.css'

const INITIAL_AUTOPLAY = false;
const INITIAL_MUTED = false;

function MuxVideoPage() {
  const mediaElRef = useRef(null);
  const [autoplay, setAutoplay] = useState<"muted" | boolean>(INITIAL_AUTOPLAY);
  const [muted, setMuted] = useState(INITIAL_MUTED);
  const [paused, setPaused] = useState<boolean | undefined>(true);
  const [sdkLoaded, setSdkLoaded] = useState(false);  

  const mainVideo = {
    imageUrl: "https://d.newsweek.com/en/full/2616049/picture-video.jpg?w=480&h=270&q=75&f=234a33201b1c5adb080a1bec0cb4a4a0",
    title: "US Official Cars Seen Leaving Greenland Capital After Vance Scales Back Visit",
    idx: 2
  };

  const relatedVideos = [
    {
      imageUrl: "https://d.newsweek.com/en/full/2614934/picture-video.jpg?w=480&h=270&q=75&f=8dbdcf86a118c0f5afb2cba69bd4af24",
      title: "JD Vance Announces He Will Join His Wife On Visit To Greenland",
      idx: 0
    },
    {
      imageUrl: "https://d.newsweek.com/en/full/2616059/reason-why-woman-trains-specific-arm.jpg?w=480&h=270&q=75&f=5000e727dbcc4e9e9d1ca21b1215c993",
      title: "Reason Why Woman Trains Specific Arm",
      idx: 1
    },
    {
      imageUrl: "https://d.newsweek.com/en/full/2616049/picture-video.jpg?w=480&h=270&q=75&f=234a33201b1c5adb080a1bec0cb4a4a0",
      title: "US Official Cars Seen Leaving Greenland Capital After Vance Scales Back Visit",
      idx: 2
    }
  ];

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
        <title>&lt;MuxVideoAds/&gt; Demo</title>
      </Head>

      {sdkLoaded && <MuxVideoAds
        ref={mediaElRef}
        playbackId="23s11nz72DsoN657h4314PjKKjsF2JG33eBQQt6B95I"
        controls
        // allow playback with ad blocker
        allowAdBlocker={true}
        autoplay={autoplay}
        muted={muted}
        playsInline={true}
        maxResolution="2160p"
        minResolution="540p"
        renditionOrder="desc"
        preferPlayback="mse"
        adTagUrl="https://pubads.g.doubleclick.net/gampad/ads?iu=/21775744923/external/single_preroll_skippable&sz=640x480&ciu_szs=300x250%2C728x90&gdfp_req=1&output=vast&unviewed_position_start=1&env=vp&impl=s&correlator="
        onPlay={() => {
          setPaused(false);
        }}
        onPause={() => {
          setPaused(true);
        }}
          onEnded={() => {

          }}
        >
      </MuxVideoAds>}
    </>
  );
}

export default MuxVideoPage;
