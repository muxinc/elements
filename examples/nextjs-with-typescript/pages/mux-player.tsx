// @ts-nocheck
import Link from "next/link";
import Head from "next/head";
import "@mux/mux-player";
import { useState } from "react";

const INITIAL_DEBUG = false;
const INITIAL_MUTED = false;
const INITIAL_AUTOPLAY = false;
const INITIAL_PLAYBACK_ID = "g65IqSFtWdpGR100c2W8VUHrfIVWTNRen";

function MuxPlayerWCPage() {
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
        <title>&lt;mux-player&gt; Demo</title>
      </Head>

      <div>
        <mux-player
          // style={{ aspectRatio: "16 / 9" }}
          playback-id={playbackId}
          forward-seek-offset={10}
          backward-seek-offset={10}
          // onPlayerReady={() => console.log("ready!")}
          {...debugObj}
          {...mutedObj}
          {...autoplayObj}
          // stream-type="live"
          // primary-color="#ec407a"
          // secondary-color="#64b5f6"
          // tertiary-color="#b4004e"
          // startTime={12}
        ></mux-player>
      </div>
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

export default MuxPlayerWCPage;
