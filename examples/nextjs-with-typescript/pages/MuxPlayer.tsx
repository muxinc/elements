/* eslint-disable @typescript-eslint/no-unused-vars */
import Link from "next/link";
import MuxPlayer from "@mux-elements/mux-player-react";
import { useRef, useState } from "react";
import mediaAssetsJSON from "@mux-elements/assets/media-assets.json";

const INITIAL_DEBUG = false;
const INITIAL_MUTED = false;
const INITIAL_AUTOPLAY = false;
const INITIAL_ENV_KEY = "5e67cqdt7hgc9vkla7p0qch7q";
const INITIAL_METADATA = {
  "video-id": "video-id-bc789",
  "video-title": "Great Stuff",
  "user-id": "user-id-6af7",
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
  const [mediaAssets, _setMediaAssets] = useState(mediaAssetsJSON);
  const [selectedAsset, setSelectedAsset] = useState(mediaAssets[0]);
  const [envKey, setEnvKey] = useState(INITIAL_ENV_KEY);
  const [metadata, _setMetadata] = useState(INITIAL_METADATA);
  const [paused, setPaused] = useState<boolean | undefined>(true);
  const [muted, setMuted] = useState(INITIAL_MUTED);
  const [debug, setDebug] = useState(INITIAL_DEBUG);
  const [autoplay, setAutoplay] = useState<"muted" | boolean>(INITIAL_AUTOPLAY);
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
          // envKey={envKey}
          metadata={metadata}
          playbackId={selectedAsset["playback-id"]}
          tokens={selectedAsset["tokens"]}
          forwardSeekOffset={10}
          backwardSeekOffset={10}
          // onPlayerReady={() => console.log("ready!")}
          debug={debug}
          muted={muted}
          paused={paused}
          autoPlay={autoplay}
          streamType={
            selectedAsset["stream-type"] as "live" | "ll-live" | "on-demand"
          }
          primaryColor="#ec407a"
          secondaryColor="#64b5f6"
          tertiaryColor="#b4004e"
          onPlay={(evt: Event) => {
            onPlay(evt);
            setPaused(false);
          }}
          onPause={(evt: Event) => {
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
          <label htmlFor="env-key-control">Env Key (Mux Data)</label>
          <input
            id="env-key-control"
            onBlur={({ currentTarget }) => setEnvKey(currentTarget.value)}
            defaultValue={envKey}
          />
        </div>
        <select
          onChange={({ target: { value } }) => {
            setSelectedAsset(mediaAssets[value]);
          }}
        >
          {mediaAssets.map((value, i) => {
            const { description } = value;
            return (
              <option key={i} value={i}>
                {description}
              </option>
            );
          })}
        </select>
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
