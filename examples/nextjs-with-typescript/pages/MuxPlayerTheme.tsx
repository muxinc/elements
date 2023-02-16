import Link from "next/link";
import Head from 'next/head';
import { useRef, useState } from "react";
import MuxPlayer, { MuxPlayerProps } from "@mux/mux-player-react";
import "media-chrome/dist/themes/media-theme-youtube";

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
        playbackId="23s11nz72DsoN657h4314PjKKjsF2JG33eBQQt6B95I"
        theme="youtube"
        // metadata={{
        //   video_id: "video-id-12345",
        //   video_title: "Mad Max: Fury Road Trailer",
        //   viewer_user_id: "user-id-6789",
        // }}
        // envKey="mux-data-env-key"
        streamType="on-demand"
        controls
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
