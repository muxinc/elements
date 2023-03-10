import Link from "next/link";
import Head from 'next/head';
import { useRef, useState } from "react";
import MuxPlayer, { MuxPlayerProps } from "@mux/mux-player-react";
import "@mux/mux-player/themes/micro";

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
        <title>&lt;MuxPlayer/&gt; (theme) Demo</title>
      </Head>

      <MuxPlayer
        ref={mediaElRef}
        playbackId="vJzD4ayErsL3z5qs0201rKHfffmQOMWSk58J6A7FtECKs"
        theme="micro"
        // metadata={{
        //   video_id: "video-id-12345",
        //   video_title: "Mad Max: Fury Road Trailer",
        //   viewer_user_id: "user-id-6789",
        // }}
        // envKey="mux-data-env-key"
        streamType="on-demand"
        autoPlay={autoplay}
        muted={muted}
        onPlay={() => {
          setPaused(false);
        }}
        onPause={() => {
          setPaused(true);
        }}
      />

      <br/>
      <Link href="/"><a>Browse Elements</a></Link>
    </>
  );
}

export default MuxPlayerPage;
