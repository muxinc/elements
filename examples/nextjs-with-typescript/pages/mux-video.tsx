/* eslint-disable @typescript-eslint/no-unused-vars */
// @ts-nocheck
import Link from "next/link";
import Script from 'next/script';
import "@mux/mux-video";
import { useRef, useState } from "react";
import mediaAssetsJSON from "@mux/assets/media-assets.json";

const INITIAL_START_TIME = undefined;
const INITIAL_DEBUG = false;
const INITIAL_MUTED = false;
const INITIAL_AUTOPLAY = false;
const INITIAL_ENV_KEY = "5e67cqdt7hgc9vkla7p0qch7q";

const toMetadataFromMediaAsset = (mediaAsset: typeof mediaAssetsJSON[0], mediaAssets: typeof mediaAssetsJSON) => {
  const video_id = `videoId${mediaAssets.indexOf(mediaAsset) ?? -1}`;
  const video_title = `Title: ${mediaAsset.description ?? 'Some Video'}`;
  return {
    video_id,
    video_title,
  };
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

function MuxVideoPage() {
  // const mediaElRef = useRef(null);
  const [mediaAssets, _setMediaAssets] = useState(mediaAssetsJSON);
  const [selectedAsset, setSelectedAsset] = useState(mediaAssets[0]);
  const [envKey, setEnvKey] = useState(INITIAL_ENV_KEY);
  const [paused, setPaused] = useState<boolean | undefined>(true);
  const [muted, setMuted] = useState(INITIAL_MUTED);
  const [debug, setDebug] = useState(INITIAL_DEBUG);
  const [startTime, _setStartTime] = useState(INITIAL_START_TIME);
  const [autoplay, setAutoplay] = useState<"muted" | boolean>(INITIAL_AUTOPLAY);

  return (
    <div>
      <h1>MuxPlayer Demo</h1>
      <div>
        <Script src="https://www.gstatic.com/cv/js/sender/v1/cast_sender.js?loadCastFramework=1" />
        <mux-video
          // ref={mediaElRef}
          key={selectedAsset["playback-id"]}
          env-key={envKey || undefined}
          metadata={toMetadataFromMediaAsset(selectedAsset, mediaAssets)}
          start-time={startTime || undefined}
          playback-id={selectedAsset["playback-id"]}
          // tokens={selectedAsset["tokens"]}
          custom-domain={selectedAsset["custom-domain"]}
          // onPlayerReady={() => console.log("ready!")}
          debug={debug || undefined}
          muted={muted || undefined}
          paused={paused || undefined}
          stream-type={
            selectedAsset["stream-type"] as "live" | "ll-live" | "on-demand"
          }
          // onPlay={(evt: Event) => {
          //   onPlay(evt);
          //   setPaused(false);
          // }}
          // onPause={(evt: Event) => {
          //   onPause(evt);
          //   setPaused(true);
          // }}
          // onSeeking={onSeeking}
          // onSeeked={onSeeked}
        ></mux-video>
      </div>
      <div className="options">
        <div>
          <select
            onChange={({ target: { value } }) => {
              setSelectedAsset(mediaAssets[value]);
            }}
          >
            {mediaAssets.map((value, i) => {
              const { description, error } = value;
              const label = `${error ? "👎 " : ""}${description}`;
              return (
                <option key={i} value={i}>
                  {label}
                </option>
              );
            })}
          </select>
        </div>
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
      </div>
      <h3 className="title">
        <Link href="/">
          <a>Browse Elements</a>
        </Link>
      </h3>
    </div>
  );
}

export default MuxVideoPage;
