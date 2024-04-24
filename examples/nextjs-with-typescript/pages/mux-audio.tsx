// @ts-nocheck
import Link from "next/link";
import Head from 'next/head';
import "@mux/mux-audio";
import { useState } from "react";

// const INITIAL_DEBUG = true;
const INITIAL_DEBUG = false;
const INITIAL_MUTED = false;
const INITIAL_AUTOPLAY = false;
const INITIAL_PLAYBACK_ID = "g65IqSFtWdpGR100c2W8VUHrfIVWTNRen";

function MuxAudioWCPage() {
  // const mediaElRef = useRef(null);
  const [playbackId, setPlaybackId] = useState(INITIAL_PLAYBACK_ID);
  const [muted, setMuted] = useState(INITIAL_MUTED);
  const [debug, setDebug] = useState(INITIAL_DEBUG);
  const [autoplay, setAutoplay] = useState(INITIAL_AUTOPLAY);
  const debugObj = debug ? { debug: "" } : {};
  const mutedObj = muted ? { muted: "" } : {};
  const autoplayObj = autoplay ? { autoplay } : {};
  return (
    <>
      <Head>
        <title>&lt;mux-audio&gt; Demo</title>
      </Head>

      <mux-audio
        // style={{ aspectRatio: "16 / 9" }}
        playback-id={playbackId}
        // onPlayerReady={() => console.log("ready!")}
        {...debugObj}
        {...mutedObj}
        {...autoplayObj}
        // stream-type="live"
        // primary-color="#ec407a"
        // secondary-color="#64b5f6"
        // tertiary-color="#b4004e"
        // startTime={12}
        controls
      ></mux-audio>

      <div className="options">
        <div>
          <label htmlFor="autoplay-control">Muted Autoplay</label>
          <input
            id="autoplay-control"
            type="checkbox"
            onChange={() => setAutoplay(!autoplay ? "muted" : false)}
            checked={autoplay}
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
        <div>
          <label htmlFor="debug-control">Debug</label>
          <input
            id="debug-control"
            type="checkbox"
            onChange={() => setDebug(!debug)}
            checked={debug}
          />
        </div>
        <div>
          <label htmlFor="playback-id-control">Playback Id</label>
          <input
            id="playback-id-control"
            onBlur={({ currentTarget }) => setPlaybackId(currentTarget.value)}
            defaultValue={playbackId}
          />
        </div>
      </div>
    </>
  );
}

export default MuxAudioWCPage;
