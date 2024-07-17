import Link from "next/link";
import Head from 'next/head';
import { useRef, useState } from "react";
import MuxVideo from "@mux/mux-video-react";

const INITIAL_AUTOPLAY = false;
const INITIAL_MUTED = false;

function MuxVideoPage() {
  const mediaElRef = useRef(null);
  const [autoplay, setAutoplay] = useState<"muted" | boolean>(INITIAL_AUTOPLAY);
  const [muted, setMuted] = useState(INITIAL_MUTED);
  const [paused, setPaused] = useState<boolean | undefined>(true);

  return (
    <>
      <Head>
        <title>&lt;MuxVideo/&gt; Demo</title>
      </Head>

      <MuxVideo
        ref={mediaElRef}
        playbackId="23s11nz72DsoN657h4314PjKKjsF2JG33eBQQt6B95I"
        // Test _hlsConfig for MuxVideo (react)
        // _hlsConfig={{
        //   startLevel: 1,
        //   debug: true,
        // }}
        // metadata={{
        //   video_id: "video-id-12345",
        //   video_title: "Mad Max: Fury Road Trailer",
        //   viewer_user_id: "user-id-6789",
        // }}
        // envKey="mux-data-env-key"
        controls
        autoPlay={autoplay}
        muted={muted}
        maxResolution="2160p"
        minResolution="540p"
        renditionOrder="desc"
        preferPlayback="native"
        onPlay={() => {
          setPaused(false);
        }}
        onPause={() => {
          setPaused(true);
        }}
      />

      <div className="options">
        <div>
          <label htmlFor="paused-control">Paused</label>
          <input
            id="paused-control"
            type="checkbox"
            onChange={() => paused ? mediaElRef.current.play() : mediaElRef.current.pause()}
            checked={paused}
          />
        </div>
        <div>
          <label htmlFor="autoplay-control">Muted Autoplay</label>
          <input
            id="autoplay-control"
            type="checkbox"
            onChange={() => setAutoplay(!autoplay ? "muted" : false)}
            checked={!!autoplay}
          />
        </div>
        <div>
          <label htmlFor="muted-control">Muted</label>
          <input
            id="muted-control"
            type="checkbox"
            onChange={() => setMuted(!muted)}
            checked={muted}
          />
        </div>
      </div>
    </>
  );
}

export default MuxVideoPage;
