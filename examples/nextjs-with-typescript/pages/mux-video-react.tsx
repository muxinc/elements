import Head from 'next/head';
import { useRef, useState } from "react";
import MuxVideo from "@mux/mux-video/react";
import MuxPlayerElement from '@mux/mux-player';
import { EnumRenderer, OptionalBooleanRenderer } from '../components/renderers';
import MuxVideoElement from '@mux/mux-video';

const INITIAL_AUTOPLAY = false;
const INITIAL_MUTED = false;
const INITIAL_CAP_LEVEL_TO_PLAYER_SIZE = undefined;
const INITIAL_PREFER_PLAYBACK = undefined;

function MuxVideoPage() {
  const mediaElRef = useRef<MuxVideoElement>(null);
  const [autoplay, setAutoplay] = useState<"muted" | boolean>(INITIAL_AUTOPLAY);
  const [muted, setMuted] = useState(INITIAL_MUTED);
  const [preferPlayback, setPreferPlayback] = useState<MuxPlayerElement["preferPlayback"]>(INITIAL_PREFER_PLAYBACK);
  const [capLevelToPlayerSize, setCapLevelToPlayerSize] = useState(INITIAL_CAP_LEVEL_TO_PLAYER_SIZE);
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
        capLevelToPlayerSize={capLevelToPlayerSize}
        autoplay={autoplay}
        muted={muted}
        maxResolution="2160p"
        minResolution="540p"
        renditionOrder="desc"
        preferPlayback={preferPlayback}
        onPlay={() => {
          setPaused(false);
        }}
        onPause={() => {
          setPaused(true);
        }}
      />

      <div className="options">
        <button onClick={() => {
          if (!mediaElRef.current) return;
          mediaElRef.current.load();
        }}>Reload</button>
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
        <EnumRenderer
          value={preferPlayback}
          name="preferPlayback"
          onChange={({ preferPlayback }) => setPreferPlayback(preferPlayback as MuxPlayerElement["preferPlayback"])}
          values={['mse', 'native']}
        />
        <OptionalBooleanRenderer
          value={capLevelToPlayerSize}
          name="capLevelToPlayerSize"
          onChange={({ capLevelToPlayerSize }) => setCapLevelToPlayerSize(capLevelToPlayerSize)}
        />
      </div>
    </>
  );
}

export default MuxVideoPage;
