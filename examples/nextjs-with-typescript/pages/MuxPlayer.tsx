/* eslint-disable @typescript-eslint/no-unused-vars */
import Link from "next/link";
import MuxPlayer from "@mux-elements/mux-player-react";
import { useRef, useState } from "react";

const INITIAL_DEBUG = false;
const INITIAL_MUTED = true;
const INITIAL_PLAYBACK_ID = "g65IqSFtWdpGR100c2W8VUHrfIVWTNRen";
const INITIAL_ENV_KEY = "5e67cqdt7hgc9vkla7p0qch7q";
const INITIAL_METADATA = {
  "metadata-video-id": "video-id-bc789",
  "metadata-video-title": "Great Stuff",
  "metadata-viewer-user-id": "user-id-6af7",
};

const onLoadStart = console.log.bind(null, "loadstart");
const onLoadedMetadata = console.log.bind(null, "loadedmetadata");
const onProgress = console.log.bind(null, "progress");
const onDurationChange = console.log.bind(null, "durationchange");
const onVolumeChange = console.log.bind(null, "volumechange");
const onRateChange = console.log.bind(null, "ratechange");
const onResize = console.log.bind(null, "resize");
const onWaiting = console.log.bind(null, "waiting");
const onPlay = console.log.bind(null, "play");
const onPlaying = console.log.bind(null, "playing");
const onTimeUpdate = console.log.bind(null, "timeupdate");
const onPause = console.log.bind(null, "pause");
const onSeeking = console.log.bind(null, "seeking");
const onSeeked = console.log.bind(null, "seeked");
const onEnded = console.log.bind(null, "ended");
const onError = console.log.bind(null, "error");
const onPlayerReady = console.log.bind(null, "playerready");

function MuxPlayerPage() {
  const mediaElRef = useRef(null);
  const [playbackId, setPlaybackId] = useState(INITIAL_PLAYBACK_ID);
  const [envKey, setEnvKey] = useState(INITIAL_ENV_KEY);
  const [metadata, _setMetadata] = useState(INITIAL_METADATA);
  const [paused, setPaused] = useState<boolean | undefined>(false);
  const [muted, setMuted] = useState(INITIAL_MUTED);
  const [debug, setDebug] = useState(INITIAL_DEBUG);
  return (
    <div
      style={{
        display: "flex",
        flexFlow: "column",
        height: "100%",
        width: "100%",
      }}
    >
      <h1>MuxPlayer Demo</h1>
      <div>
        <MuxPlayer
          ref={mediaElRef}
          // style={{ aspectRatio: "16 / 9" }}
          envKey={envKey}
          metadata={metadata}
          playbackId={playbackId}
          forwardSeekOffset={10}
          backwardSeekOffset={10}
          // onPlayerReady={() => console.log("ready!")}
          debug={debug}
          muted={muted}
          paused={paused}
          autoPlay
          // streamType={"live"}
          primaryColor="#ec407a"
          secondaryColor="#64b5f6"
          tertiaryColor="#b4004e"
          onPlay={(evt) => {
            onPlay(evt);
            setPaused(false);
          }}
          onPause={(evt) => {
            onPause(evt);
            setPaused(true);
          }}
          onSeeking={onSeeking}
          onSeeked={onSeeked}
          // startTime={12}
        />
      </div>
      <div>
        <div>
          <label htmlFor="paused-control">Paused</label>
          <input
            id="paused-control"
            type="checkbox"
            onChange={() => setPaused(!paused)}
            checked={paused}
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
        <div>
          <label htmlFor="env-key-control">Env Key (Mux Data)</label>
          <input
            id="env-key-control"
            onBlur={({ currentTarget }) => setEnvKey(currentTarget.value)}
            defaultValue={envKey}
          />
        </div>
      </div>
      <h3 className="title">
        <Link href="/">
          <a>Browse Elements</a>
        </Link>
      </h3>
    </div>
  );
}

export default MuxPlayerPage;
