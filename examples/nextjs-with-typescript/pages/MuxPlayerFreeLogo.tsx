/* eslint-disable @next/next/no-img-element */
import Head from 'next/head';
import MuxPlayer from "@mux/mux-player-react";
import "@mux/mux-player/themes/microvideo";

function MuxPlayerPage() {
  return (
    <>
      <Head>
        <title>&lt;MuxPlayer/&gt; (free logo) Demo</title>
      </Head>

      <MuxPlayer
        customDomain="staging.mux.com"
        playbackId="MxcYf7HJjOxK4A4ZnQLwMokE02tgD6bD5BZ3FVLY6qcc"
        thumbnailTime={10}
        preferPlayback="native"
        preload="metadata"
      />
    </>
  );
}

export default MuxPlayerPage;
