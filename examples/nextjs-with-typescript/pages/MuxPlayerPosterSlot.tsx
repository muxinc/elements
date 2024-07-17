/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import Head from 'next/head';
import { useRef, useState } from "react";
import MuxPlayer, { MuxPlayerProps } from "@mux/mux-player-react";
import "@mux/mux-player/themes/microvideo";

const INITIAL_AUTOPLAY = false;
const INITIAL_MUTED = false;

function MuxPlayerPage() {
  const mediaElRef = useRef(null);
  const [autoplay, setAutoplay] = useState<"muted" | boolean>(INITIAL_AUTOPLAY);
  const [muted, setMuted] = useState(INITIAL_MUTED);
  const [paused, setPaused] = useState<boolean | undefined>(true);

  return (
    <>
      <Head>
        <title>&lt;MuxPlayer/&gt; (poster slot) Demo</title>
      </Head>

      <MuxPlayer
        ref={mediaElRef}
        playbackId="VcmKA6aqzIzlg3MayLJDnbF55kX00mds028Z65QxvBYaA"
        autoPlay={autoplay}
        muted={muted}
        onPlay={() => {
          setPaused(false);
        }}
        onPause={() => {
          setPaused(true);
        }}
      >
        <img
          style={{ objectFit: 'contain', height: '100%' }}
          slot="poster"
          src="https://image.mux.com/VcmKA6aqzIzlg3MayLJDnbF55kX00mds028Z65QxvBYaA/thumbnail.webp"
          alt=""
        />
      </MuxPlayer>
    </>
  );
}

export default MuxPlayerPage;
