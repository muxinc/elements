import Head from 'next/head';
import Script from 'next/script';
import { useState } from 'react';
import MuxNewsPlayer from '@mux/mux-player-react/news';

function MuxNewsPlayerPage() {

  const relatedVideos = [
    {
      imageUrl: "https://image.mux.com/gZh02tKCI015W6k2XdYSh4srGnksYvsoT1uHsYOlv4Blo/thumbnail.webp",
      title: "Test video title 1",
      playbackId: "gZh02tKCI015W6k2XdYSh4srGnksYvsoT1uHsYOlv4Blo",
      // adTagUrl: "https://pubads.g.doubleclick.net/gampad/ads?iu=/21775744923/external/single_preroll_skippable&sz=640x480&ciu_szs=300x250%2C728x90&gdfp_req=1&output=vast&unviewed_position_start=1&env=vp&impl=s&correlator=",
      // adTagUrl: () => "https://pubads.g.doubleclick.net/gampad/ads?iu=/21775744923/external/single_preroll_skippable&sz=640x480&ciu_szs=300x250%2C728x90&gdfp_req=1&output=vast&unviewed_position_start=1&env=vp&impl=s&correlator=",
      adTagUrl: () => asPromise("https://pubads.g.doubleclick.net/gampad/ads?iu=/21775744923/external/single_preroll_skippable&sz=640x480&ciu_szs=300x250%2C728x90&gdfp_req=1&output=vast&unviewed_position_start=1&env=vp&impl=s&correlator=", 1500),
    },
    {
      imageUrl: "https://image.mux.com/VcmKA6aqzIzlg3MayLJDnbF55kX00mds028Z65QxvBYaA/thumbnail.webp",
      title: "Test video title 2",
      playbackId: "VcmKA6aqzIzlg3MayLJDnbF55kX00mds028Z65QxvBYaA",
      adTagUrl: "https://pubads.g.doubleclick.net/gampad/ads?iu=/21775744923/external/vmap_ad_samples&sz=640x480&cust_params=sample_ar%3Dpreonly&ciu_szs=300x250%2C728x90&gdfp_req=1&ad_rule=1&output=vmap&unviewed_position_start=1&env=vp&impl=s&correlator=",
      // adTagUrl: () => "https://pubads.g.doubleclick.net/gampad/ads?iu=/21775744923/external/vmap_ad_samples&sz=640x480&cust_params=sample_ar%3Dpreonly&ciu_szs=300x250%2C728x90&gdfp_req=1&ad_rule=1&output=vmap&unviewed_position_start=1&env=vp&impl=s&correlator=",
      // adTagUrl: () => asPromise("https://pubads.g.doubleclick.net/gampad/ads?iu=/21775744923/external/vmap_ad_samples&sz=640x480&cust_params=sample_ar%3Dpreonly&ciu_szs=300x250%2C728x90&gdfp_req=1&ad_rule=1&output=vmap&unviewed_position_start=1&env=vp&impl=s&correlator="),
    },
    {
      imageUrl: "https://image.mux.com/maVbJv2GSYNRgS02kPXOOGdJMWGU1mkA019ZUjYE7VU7k/thumbnail.webp",
      title: "Test video title 3",
      playbackId: "maVbJv2GSYNRgS02kPXOOGdJMWGU1mkA019ZUjYE7VU7k",
      // adTagUrl: "https://pubads.g.doubleclick.net/gampad/ads?iu=/21775744923/external/vmap_ad_samples&sz=640x480&cust_params=sample_ar%3Dpreonlybumper&ciu_szs=300x250&gdfp_req=1&ad_rule=1&output=vmap&unviewed_position_start=1&env=vp&impl=s&correlator=",
      // adTagUrl: () => "https://pubads.g.doubleclick.net/gampad/ads?iu=/21775744923/external/vmap_ad_samples&sz=640x480&cust_params=sample_ar%3Dpreonlybumper&ciu_szs=300x250&gdfp_req=1&ad_rule=1&output=vmap&unviewed_position_start=1&env=vp&impl=s&correlator=",
      adTagUrl: () => asPromise("https://pubads.g.doubleclick.net/gampad/ads?iu=/21775744923/external/vmap_ad_samples&sz=640x480&cust_params=sample_ar%3Dpreonlybumper&ciu_szs=300x250&gdfp_req=1&ad_rule=1&output=vmap&unviewed_position_start=1&env=vp&impl=s&correlator=", 2250),
    },
  ];

  const [sdkReady, setSdkReady] = useState(false);

  return (
    <>
      <Head>
        <title>&lt;MuxNewsPlayer/&gt; (POC) Demo</title>
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

      {sdkReady &&
        <MuxNewsPlayer
          allowAdBlocker={true}
          videoList={relatedVideos}
          onLoadStart={() => console.log('Load Start')}
          onLoadedMetadata={() => console.log('Loaded Metadata')}
          onPlay={() => console.log('Play')}
          onPlaying={() => console.log('Playing')}
          onPause={() => console.log('Pause')}
          onEnded={() => console.log('Ended')}
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
        />}
    </>
  );
}

export default MuxNewsPlayerPage;

// NOTE: Placed asPromise function at the bottom of the module due to confusion most code highlighting tooling has when using
// generics like the one defined below in TSX, where "<" and ">" symbols are semantically confused by JSX rendering syntax. (CJP)
const DEFAULT_PROMISE_DELAY = 0;
const asPromise = <T = any>(value: T, delay = DEFAULT_PROMISE_DELAY) => {
  if (!delay) return Promise.resolve(value);
  return new Promise<T>((resolve => {
    setTimeout(resolve, delay, value);
  }));
};
