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
        src="https://stream.staging.mux.com/MxcYf7HJjOxK4A4ZnQLwMokE02tgD6bD5BZ3FVLY6qcc.m3u8"
        preload="none"
      />
    </>
  );
}

export default MuxPlayerPage;
