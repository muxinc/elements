/* eslint-disable @typescript-eslint/no-unused-vars */
import Link from "next/link";
import Script from 'next/script';
import MuxPlayer from "@mux/mux-player-react";
import { useRef, useState } from "react";
import mediaAssetsJSON from "@mux/assets/media-assets.json";

const INITIAL_PRIMARY_COLOR = undefined;
const INITIAL_SECONDARY_COLOR = undefined;
const INITIAL_START_TIME = undefined;
const INITIAL_THUMBNAIL_TIME = undefined;
const INITIAL_DEBUG = false;
const INITIAL_MUTED = false;
const INITIAL_AUTOPLAY = false;
const INITIAL_NOHOTKEYS = false;
const INITIAL_DEFAULT_SHOW_REMAINING_TIME = true;
const INITIAL_PLAYBACK_RATES = [0.25, 0.5, 1, 1.5, 2, 3];
const INITIAL_TITLE = '';
const INITIAL_ENV_KEY = "5e67cqdt7hgc9vkla7p0qch7q";
const INITIAL_SELECTED_CSS_VARS = {};
const INITIAL_HOTKEYS = '';

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

function MuxPlayerPage() {
  const mediaElRef = useRef(null);
  const [mediaAssets, _setMediaAssets] = useState(mediaAssetsJSON);
  const [selectedAsset, setSelectedAsset] = useState(mediaAssets[0]);
  const [envKey, setEnvKey] = useState(INITIAL_ENV_KEY);
  const [paused, setPaused] = useState<boolean | undefined>(true);
  const [muted, setMuted] = useState(INITIAL_MUTED);
  const [debug, setDebug] = useState(INITIAL_DEBUG);
  const [nohotkeys, setNohotkeys] = useState(INITIAL_NOHOTKEYS);
  const [defaultShowRemainingTime, setDefaultShowRemainingTime] = useState(INITIAL_DEFAULT_SHOW_REMAINING_TIME);
  // What would be a reasonable UI for changing this? (CJP)
  const [playbackRates, _setPlaybackRates] = useState(INITIAL_PLAYBACK_RATES);
  const [startTime, _setStartTime] = useState(INITIAL_START_TIME);
  const [thumbnailTime, _setThumbnailTime] = useState(INITIAL_THUMBNAIL_TIME);
  const [autoplay, setAutoplay] = useState<"muted" | boolean>(INITIAL_AUTOPLAY);
  const [primaryColor, setPrimaryColor] = useState<string|undefined>(INITIAL_PRIMARY_COLOR);
  const [secondaryColor, setSecondaryColor] = useState<string|undefined>(INITIAL_SECONDARY_COLOR);
  const [selectedCssVars, setSelectedCssVars] = useState(INITIAL_SELECTED_CSS_VARS);
  const [hotkeys, setHotkeys] = useState(INITIAL_HOTKEYS);
  const [title, setTitle] = useState(INITIAL_TITLE);

  return (
    <div>
      <h1>MuxPlayer Demo</h1>
      <div>
        <Script src="https://www.gstatic.com/cv/js/sender/v1/cast_sender.js?loadCastFramework=1" />
        <MuxPlayer
          ref={mediaElRef}
          style={selectedCssVars}
          envKey={envKey || undefined}
          metadata={toMetadataFromMediaAsset(selectedAsset, mediaAssets)}
          title={title}
          startTime={startTime}
          thumbnailTime={thumbnailTime}
          playbackId={selectedAsset["playback-id"]}
          tokens={selectedAsset["tokens"]}
          customDomain={selectedAsset["custom-domain"]}
          forwardSeekOffset={10}
          backwardSeekOffset={10}
          nohotkeys={nohotkeys}
          hotkeys={hotkeys}
          // onPlayerReady={() => console.log("ready!")}
          debug={debug}
          muted={muted}
          paused={paused}
          autoPlay={autoplay}
          streamType={
            selectedAsset["stream-type"] as "live" | "ll-live" | "on-demand"
          }
          audio={selectedAsset["audio"] ?? false}
          primaryColor={primaryColor}
          secondaryColor={secondaryColor}
          tertiaryColor="#b4004e"
          defaultShowRemainingTime={defaultShowRemainingTime}
          playbackRates={playbackRates}
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
          <label htmlFor="primarycolor-control">Primary Color </label>
          <input
            id="primarycolor-control"
            type="color"
            onChange={(event) => setPrimaryColor(event.target.value)}
            value={primaryColor}
          />
        </div>
        <div>
          <label htmlFor="secondarycolor-control">Secondary Color </label>
          <input
            id="secondarycolor-control"
            type="color"
            onChange={(event) => setSecondaryColor(event.target.value)}
            value={secondaryColor}
          />
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
          <label htmlFor="nohotkeys-control">No Hot Keys</label>
          <input
            id="nohotkeys-control"
            type="checkbox"
            onChange={() => setNohotkeys(!nohotkeys)}
            checked={nohotkeys}
          />
        </div>
        <div>
          <label htmlFor="defaultshowremainingtime-control">Show Remaining Time by Default</label>
          <input
            id="defaultshowremainingtime-control"
            type="checkbox"
            onChange={() => setDefaultShowRemainingTime(!defaultShowRemainingTime)}
            checked={defaultShowRemainingTime}
          />
        </div>
        <div>
          <label htmlFor="title-control">Title</label>
          <input
            id="title-control"
            onChange={({ currentTarget }) => setTitle(currentTarget.value)}
            defaultValue={title}
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
        <div>
          <label htmlFor="controlsvars-control">Hide controls CSS vars </label>
          <select
            id="controlsvars-control"
            multiple
            onChange={(event) => setSelectedCssVars(
              Object.fromEntries(Array.from(event.target.selectedOptions)
                .map(({ value }) => [value, 'none']))
            )}
          >
            <option value="--controls">--controls</option>
            <option value="--top-controls">--top-controls</option>
            <option value="--center-controls">--center-controls</option>
            <option value="--bottom-controls">--bottom-controls</option>
            <option value="--duration-display">--duration-display</option>
            <option value="--bottom-duration-display">--bottom-duration-display</option>
            <option value="--play-button">--play-button</option>
            <option value="--center-play-button">--center-play-button</option>
            <option value="--bottom-play-button">--bottom-play-button</option>
            <option value="--time-range">--time-range</option>
            <option value="--bottom-time-range">--bottom-time-range</option>
            <option value="--seek-backward-button">--seek-backward-button</option>
            <option value="--bottom-seek-backward-button">--bottom-seek-backward-button</option>
            <option value="--seek-forward-button">--seek-forward-button</option>
            <option value="--bottom-seek-forward-button">--bottom-seek-forward-button</option>
            <option value="--time-display">--time-display</option>
            <option value="--title-display">--title-display</option>
            <option value="--bottom-title-display">--bottom-title-display</option>
            <option value="--top-title-display">--top-title-display</option>
            <option value="--bottom-time-display">--bottom-time-display</option>
            <option value="--mute-button">--mute-button</option>
            <option value="--bottom-mute-button">--bottom-mute-button</option>
            <option value="--volume-range">--volume-range</option>
            <option value="--bottom-volume-range">--bottom-volume-range</option>
            <option value="--playback-rate-button">--playback-rate-button</option>
            <option value="--bottom-playback-rate-button">--bottom-playback-rate-button</option>
            <option value="--captions-button">--captions-button</option>
            <option value="--top-captions-button">--top-captions-button</option>
            <option value="--bottom-captions-button">--bottom-captions-button</option>
            <option value="--airplay-button">--airplay-button</option>
            <option value="--top-airplay-button">--top-airplay-button</option>
            <option value="--bottom-airplay-button">--bottom-airplay-button</option>
            <option value="--cast-button">--cast-button</option>
            <option value="--top-cast-button">--top-cast-button</option>
            <option value="--bottom-cast-button">--bottom-cast-button</option>
            <option value="--pip-button">--pip-button</option>
            <option value="--top-pip-button">--top-pip-button</option>
            <option value="--bottom-pip-button">--bottom-pip-button</option>
            <option value="--fullscreen-button">--fullscreen-button</option>
            <option value="--bottom-fullscreen-button">--bottom-fullscreen-button</option>
          </select>
        </div>
        <div>
          <label htmlFor="hotkeys-control">hotkeys </label>
          <select
            id="hotkeys-control"
            multiple
            onChange={(event) => setHotkeys(
              Array.from(event.target.selectedOptions)
                .map(({ value }) => value).join(' ')
            )}
          >
            {['nof', 'nok', 'nom', 'nospace', 'noarrowleft', 'noarrowright'].map((token, i) => {
              return (
                <option key={i} value={token}>{token}</option>
              )
            })}
          </select>
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
