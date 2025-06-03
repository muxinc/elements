import Head from 'next/head';
import Script from "next/script";
import { useRef, useState } from "react";
import MuxVideoAds from "@mux/mux-video/ads/react";

function MuxVideoPage() {
  const mediaElRef = useRef(null);
  const [sdkLoaded, setSdkLoaded] = useState(false);

  return (
    <>
      <Head>
        <title>&lt;MuxVideoAds/&gt; Demo</title>
      </Head>

      <Script
        src="https://imasdk.googleapis.com/js/sdkloader/ima3.js"
        onLoad={() => {
          setSdkLoaded(true);
          console.log("Google IMA SDK loaded");
        }}
        strategy="afterInteractive"
      />

      {sdkLoaded && <MuxVideoAds
        ref={mediaElRef}
        playbackId="23s11nz72DsoN657h4314PjKKjsF2JG33eBQQt6B95I"
        controls
        playsInline={true}
        preferPlayback="mse"
        allowAdBlocker={true}
        adTagUrl="https://pubads.g.doubleclick.net/gampad/ads?iu=/21775744923/external/single_preroll_skippable&sz=640x480&ciu_szs=300x250%2C728x90&gdfp_req=1&output=vast&unviewed_position_start=1&env=vp&impl=s&correlator="
      />}
    </>
  );
}

export default MuxVideoPage;
