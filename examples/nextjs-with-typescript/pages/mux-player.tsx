import Head from "next/head";
import "@mux/mux-player";
import { useEffect, useRef, useState } from "react";
import MuxPlayerElement from "@mux/mux-player";
import { OptionalBooleanRenderer } from "../components/renderers";
import { Autoplay, MuxMediaPropTypes } from "../../../packages/playback-core/dist/types/types";

const INITIAL_DEBUG = false;
const INITIAL_MUTED = true;
const INITIAL_AUTOPLAY: Autoplay = false;
const INITIAL_PLAYBACK_ID = "g65IqSFtWdpGR100c2W8VUHrfIVWTNRen";
const INITIAL_CAP_LEVEL_TO_PLAYER_SIZE : boolean | undefined = undefined;

function MuxPlayerWCPage() {
  const mediaElRef = useRef<MuxPlayerElement>(null);
  const [playbackId, setPlaybackId] = useState(INITIAL_PLAYBACK_ID);
  const [muted, setMuted] = useState(INITIAL_MUTED);
  const [debug, setDebug] = useState(INITIAL_DEBUG);
  const [autoplay, setAutoplay] = useState<MuxMediaPropTypes["autoplay"]>(INITIAL_AUTOPLAY);
  const [capRenditionToPlayerSize, setCapRenditionToPlayerSize] = useState<boolean | undefined>(INITIAL_CAP_LEVEL_TO_PLAYER_SIZE);
  const debugObj : {debug?: boolean}=  debug ? { debug: true } : {};
  const mutedObj : {muted?: boolean} = muted ? { muted: true } : {};
  const autoplayObj : {autoplay?: Autoplay}  = autoplay ? { autoplay: autoplay } : {};

  // Set capRenditionToPlayerSize via JavaScript property (supports undefined, true, and false)
  useEffect(() => {
    if (mediaElRef.current) {
      mediaElRef.current.capRenditionToPlayerSize = capRenditionToPlayerSize;
    }
  }, [capRenditionToPlayerSize]);

  return (
    <>
      <Head>
        <title>&lt;mux-player&gt; Demo</title>
      </Head>

      <div>
        <mux-player
          ref={mediaElRef}
          playback-id={playbackId}
          forward-seek-offset={10}
          backward-seek-offset={10}
          max-auto-resolution="720p"
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
        <button onClick={() => {
          if (!mediaElRef.current) return;
          mediaElRef.current.load();
        }}>Reload</button>
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
        <OptionalBooleanRenderer
          value={capRenditionToPlayerSize}
          name="capRenditionToPlayerSize"
          onChange={({ capRenditionToPlayerSize }) => setCapRenditionToPlayerSize(capRenditionToPlayerSize)}
        />
      </div>
    </>
  );
}

export default MuxPlayerWCPage;
