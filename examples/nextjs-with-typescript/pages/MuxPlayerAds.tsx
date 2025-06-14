import Script from 'next/script';
import Head from 'next/head';
import { useState } from 'react';
import MuxPlayer from '@mux/mux-player-react/ads';
import NewsTheme from '@mux/mux-player-react/themes/news';

function MuxPlayerAdsPage() {
  const [sdkReady, setSdkReady] = useState(false);

  return (
    <>
      <Head>
        <title>&lt;MuxPlayer/&gt; (ads) Demo</title>
      </Head>

      <Script
        src="https://imasdk.googleapis.com/js/sdkloader/ima3.js"
        onReady={() => {
          setSdkReady(true);
          console.log("Google IMA SDK loaded");
        }}
        onError={() => {
          setSdkReady(true);
          console.log("Google IMA SDK failed to load");
        }}
        strategy="afterInteractive"
      />

      {/*
        single preroll skippable
        adTagUrl="https://pubads.g.doubleclick.net/gampad/ads?iu=/21775744923/external/single_preroll_skippable&sz=640x480&ciu_szs=300x250%2C728x90&gdfp_req=1&output=vast&unviewed_position_start=1&env=vp&impl=s&correlator="

        single postroll
        adTagUrl="https://pubads.g.doubleclick.net/gampad/ads?iu=/21775744923/external/vmap_ad_samples&sz=640x480&cust_params=sample_ar%3Dpostonly&ciu_szs=300x250&gdfp_req=1&ad_rule=1&output=vmap&unviewed_position_start=1&env=vp&impl=s&correlator="

        VMAP - Pre-roll Single Ad, Mid-roll Standard Pod with 3 ads, Post-roll Single Ad
        adTagUrl="https://pubads.g.doubleclick.net/gampad/ads?iu=/21775744923/external/vmap_ad_samples&sz=640x480&cust_params=sample_ar%3Dpremidpostpod&ciu_szs=300x250&gdfp_req=1&ad_rule=1&output=vmap&unviewed_position_start=1&env=vp&impl=s&cmsid=496&vid=short_onecue&correlator="
      */}

      {sdkReady && <MuxPlayer
        theme={NewsTheme}
        streamType="on-demand"
        playbackId="ihZa7qP1zY8oyLSQW9TS602VgwQvNdyIvlk9LInEGU2s"
        adTagUrl="https://pubads.g.doubleclick.net/gampad/ads?iu=/21775744923/external/single_preroll_skippable&sz=640x480&ciu_szs=300x250%2C728x90&gdfp_req=1&output=vast&unviewed_position_start=1&env=vp&impl=s&correlator="
        allowAdBlocker={true}
        onAdRequest={() => console.log('Ad Request')}
        onAdResponse={() => console.log('Ad Response')}
        onAdImpression={() => console.log('Ad Impression')}
        onAdBreakStart={() => console.log('Ad Break Start')}
        onAdPlay={() => console.log('Ad Play')}
        onAdPlaying={() => console.log('Ad Playing')}
        onAdPause={() => console.log('Ad Pause')}
        onAdFirstQuartile={() => console.log('Ad First Quartile')}
        onAdMidpoint={() => console.log('Ad Midpoint')}
        onAdThirdQuartile={() => console.log('Ad Third Quartile')}
        onAdClick={() => console.log('Ad Click')}
        onAdSkip={() => console.log('Ad Skip')}
        onAdClose={() => console.log('Ad Close')}
        onAdEnded={() => console.log('Ad Ended')}
        onAdBreakEnd={() => console.log('Ad Break End')}
        onAdError={() => console.log('Ad Error')}
        metadata={{
          video_id: "video-id-12345",
          video_title: "Elephants Dream",
          viewer_user_id: "user-id-6789",
        }}
      />}
    </>
  );
}

export default MuxPlayerAdsPage;
