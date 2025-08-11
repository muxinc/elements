/* eslint-disable @next/next/no-img-element */
import Head from 'next/head';
import MuxPlayer from "@mux/mux-player-react";

function MuxPlayerPage() {
  return (
    <>
      <Head>
        <title>&lt;MuxPlayer/&gt; (error) Demo</title>
      </Head>

      <MuxPlayer
        playbackId="ihZa7qP1zY8oyLSQW9TS602VgwQvNdyIvlk9LInEGU2"
        onError={(error) => {
          console.error('MuxPlayer onError', error);
        }}
      />
    </>
  );
}

export default MuxPlayerPage;
