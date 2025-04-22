import Head from 'next/head';
import '../post-video.css'
import Playlist from '../components/playlist';

function MuxVideoPage() {

  const relatedVideos = [
    {
      imageUrl: "https://image.mux.com/DVBhwqkhxkOiLRjUAYJS6mCBJSuC00tB4iWjJmEofJoo/thumbnail.jpg",
      title: "Test video title 1",
      playbackId: "DVBhwqkhxkOiLRjUAYJS6mCBJSuC00tB4iWjJmEofJoo",
      adTagUrl: "https://pubads.g.doubleclick.net/gampad/ads?iu=/21775744923/external/single_preroll_skippable&sz=640x480&ciu_szs=300x250%2C728x90&gdfp_req=1&output=vast&unviewed_position_start=1&env=vp&impl=s&correlator=",
    },
    {
      imageUrl: "https://image.mux.com/VcmKA6aqzIzlg3MayLJDnbF55kX00mds028Z65QxvBYaA/thumbnail.jpg",
      title: "Test video title 2",
      playbackId: "VcmKA6aqzIzlg3MayLJDnbF55kX00mds028Z65QxvBYaA",
      adTagUrl: "https://pubads.g.doubleclick.net/gampad/ads?iu=/21775744923/external/vmap_ad_samples&sz=640x480&cust_params=sample_ar%3Dpreonly&ciu_szs=300x250%2C728x90&gdfp_req=1&ad_rule=1&output=vmap&unviewed_position_start=1&env=vp&impl=s&correlator=",
    },
    {
      imageUrl: "https://image.mux.com/gZh02tKCI015W6k2XdYSh4srGnksYvsoT1uHsYOlv4Blo/thumbnail.jpg",
      title: "Test video title 3",
      playbackId: "gZh02tKCI015W6k2XdYSh4srGnksYvsoT1uHsYOlv4Blo",
      adTagUrl: "https://pubads.g.doubleclick.net/gampad/ads?iu=/21775744923/external/single_preroll_skippable&sz=640x480&ciu_szs=300x250%2C728x90&gdfp_req=1&output=vast&unviewed_position_start=1&env=vp&impl=s&correlator=",
    },
  ];

  return (
    <>
      <Head>
        <title>&lt;Playlist/&gt; Demo</title>
      </Head>
      
      <Playlist videoList={relatedVideos}></Playlist>

    </>
  );
}

export default MuxVideoPage;
