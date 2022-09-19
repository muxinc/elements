/* eslint-disable @typescript-eslint/no-unused-vars */
import Link from "next/link";
import Script from 'next/script';
import MuxPlayer, { MuxPlayerProps } from "@mux/mux-player-react";
import { useEffect, useReducer, useRef, useState } from "react";
import mediaAssetsJSON from "@mux/assets/media-assets.json";

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

const INITIAL_PRIMARY_COLOR = undefined;
const INITIAL_SECONDARY_COLOR = undefined;
const INITIAL_CONTROLS_BACKDROP_COLOR = undefined;
const INITIAL_START_TIME = undefined;
const INITIAL_THUMBNAIL_TIME = undefined;
const INITIAL_DEBUG = false;
const INITIAL_MUTED = false;
const INITIAL_AUTOPLAY = false;
const INITIAL_NOHOTKEYS = false;
const INITIAL_DEFAULT_SHOW_REMAINING_TIME = true;
// const INITIAL_PLAYBACK_RATES = [0.25, 0.5, 1, 1.5, 2, 3];
const INITIAL_PLAYBACK_RATES = undefined;
const INITIAL_TITLE = undefined;
// const INITIAL_ENV_KEY = "5e67cqdt7hgc9vkla7p0qch7q";
const INITIAL_ENV_KEY = undefined;
const INITIAL_SELECTED_CSS_VARS = {};
const INITIAL_HOTKEYS = undefined;
const INITIAL_FORWARD_SEEK_OFFSET = undefined;
const INITIAL_BACKWARD_SEEK_OFFSET = undefined;

const toMetadataFromMediaAsset = (mediaAsset: typeof mediaAssetsJSON[0], mediaAssets: typeof mediaAssetsJSON) => {
  const video_id = `videoId${mediaAssets.indexOf(mediaAsset) ?? -1}`;
  const video_title = `Title: ${mediaAsset.description ?? 'Some Video'}`;
  return {
    video_id,
    video_title,
  };
};

const toPlayerPropsFromJSON = (mediaAsset: typeof mediaAssetsJSON[0], mediaAssets: typeof mediaAssetsJSON) => {
  const { 
    'playback-id': playbackId,
    // 'stream-type': streamType,
    tokens,
    'custom-domain': customDomain,
    audio,
    description: title,
  } = mediaAsset;
  // NOTE: Inferred type is "string" from JSON (CJP)
  const streamType = mediaAsset['stream-type'] as MuxPlayerProps["streamType"];
  const metadata = toMetadataFromMediaAsset(mediaAsset, mediaAssets);

  return {
    playbackId,
    streamType,
    audio,
    tokens,
    customDomain,
    metadata,
    title,
  };
};

const ActionTypes = {
  UPDATE: 'UPDATE',
};

const DEFAULT_INITIAL_STATE: Partial<MuxPlayerProps> = Object.freeze({
  muted: INITIAL_MUTED,
  debug: INITIAL_DEBUG,
  autoPlay: INITIAL_AUTOPLAY,
  startTime: INITIAL_START_TIME,
  paused: true,
  nohotkeys: INITIAL_NOHOTKEYS,
  hotkeys: INITIAL_HOTKEYS,
  defaultShowRemainingTime: INITIAL_DEFAULT_SHOW_REMAINING_TIME,
  primaryColor: INITIAL_PRIMARY_COLOR,
  secondaryColor: INITIAL_SECONDARY_COLOR,
  thumbnailTime: INITIAL_THUMBNAIL_TIME,
  title: INITIAL_TITLE,
  envKey: INITIAL_ENV_KEY,
  playbackRates: INITIAL_PLAYBACK_RATES,
  forwardSeekOffset: INITIAL_FORWARD_SEEK_OFFSET,
  backwardSeekOffset: INITIAL_BACKWARD_SEEK_OFFSET,
});

const reducer = (state = DEFAULT_INITIAL_STATE, action) => {
  const { type, value } = action;
  switch (type) {
    case ActionTypes.UPDATE: {
      return {
        ...state,
        ...value,
      };
    }
    default: {
      return state;
    }
  }
};

const toInitialState = (selectedAsset: typeof mediaAssetsJSON[0] | undefined, mediaAssets: typeof mediaAssetsJSON) => {
  if (!selectedAsset) return DEFAULT_INITIAL_STATE;
  return { 
    ...DEFAULT_INITIAL_STATE,
    ...toPlayerPropsFromJSON(selectedAsset, mediaAssets)
  };
};

const updateProps = (value: Partial<MuxPlayerProps>) => {
  return {
    type: ActionTypes.UPDATE,
    value,
  };
}

function MuxPlayerPage() {
  const mediaElRef = useRef(null);
  const [mediaAssets, _setMediaAssets] = useState(mediaAssetsJSON);
  const [selectedAsset, setSelectedAsset] = useState(mediaAssets[0]);
  const [state, dispatch] = useReducer(reducer, toInitialState(selectedAsset, mediaAssets));
  useEffect(() => {
    dispatch(updateProps(toPlayerPropsFromJSON(selectedAsset, mediaAssets)))
  }, [selectedAsset, mediaAssets])
  // console.log('state', state);
  // What would be a reasonable UI for changing this? (CJP)
  const [controlsBackdropColor, setControlsBackdropColor] = useState<string|undefined>(INITIAL_CONTROLS_BACKDROP_COLOR);
  const [selectedCssVars, setSelectedCssVars] = useState(INITIAL_SELECTED_CSS_VARS);

  return (
    <div>
      <h1>MuxPlayer Demo</h1>
      <div>
        <Script src="https://www.gstatic.com/cv/js/sender/v1/cast_sender.js?loadCastFramework=1" />
        <MuxPlayer
          ref={mediaElRef}
          style={{
            ...selectedCssVars,
            ...(controlsBackdropColor && {'--controls-backdrop-color': controlsBackdropColor} as typeof selectedCssVars)
            }}
          envKey={state.envKey}
          metadata={state.metadata}
          title={state.title}
          startTime={state.startTime}
          thumbnailTime={state.thumbnailTime}
          playbackId={state.playbackId}
          tokens={state.tokens}
          customDomain={state.customDomain}
          forwardSeekOffset={state.forwardSeekOffset}
          backwardSeekOffset={state.backwardSeekOffset}
          nohotkeys={state.nohotkeys}
          hotkeys={state.hotkeys}
          // onPlayerReady={() => console.log("ready!")}
          debug={state.debug}
          muted={state.muted}
          paused={state.paused}
          autoPlay={state.autoPlay}
          streamType={state.streamType}
          audio={state.audio}
          primaryColor={state.primaryColor}
          secondaryColor={state.secondaryColor}
          defaultShowRemainingTime={state.defaultShowRemainingTime}
          playbackRates={state.playbackRates}
          onPlay={(evt: Event) => {
            onPlay(evt);
            dispatch(updateProps({ paused: false }));
          }}
          onPause={(evt: Event) => {
            onPause(evt);
            dispatch(updateProps({ paused: true }));
          }}
          onSeeking={onSeeking}
          onSeeked={onSeeked}
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
            onChange={({ target: { value }}) => dispatch(updateProps({ primaryColor: value ? value : undefined }))}
            value={state.primaryColor}
          />
        </div>
        <div>
          <label htmlFor="secondarycolor-control">Secondary Color </label>
          <input
            id="secondarycolor-control"
            type="color"
            onChange={({ target: { value }}) => dispatch(updateProps({ secondaryColor: value ? value : undefined }))}
            value={state.secondaryColor}
          />
        </div>
        <div>
          <label htmlFor="paused-control">Paused</label>
          <input
            id="paused-control"
            type="checkbox"
            onChange={() => dispatch(updateProps({ paused: !state.paused }))}
            checked={state.paused}
          />
        </div>
        <div>
          <label htmlFor="autoplay-control">Muted Autoplay</label>
          <input
            id="autoplay-control"
            type="checkbox"
            onChange={() => dispatch(updateProps({ autoPlay: state.autoPlay ? "muted" : false }))}
            checked={!!state.autoPlay}
          />
        </div>
        <div>
          <label htmlFor="muted-control">Muted</label>
          <input
            id="muted-control"
            type="checkbox"
            onChange={() => dispatch(updateProps({ muted: !state.muted }))}
            checked={state.muted}
          />
        </div>
        <div>
          <label htmlFor="nohotkeys-control">No Hot Keys</label>
          <input
            id="nohotkeys-control"
            type="checkbox"
            onChange={() => dispatch(updateProps({ nohotkeys: !state.nohotkeys }))}
            checked={state.nohotkeys}
          />
        </div>
        <div>
          <label htmlFor="defaultshowremainingtime-control">Show Remaining Time by Default</label>
          <input
            id="defaultshowremainingtime-control"
            type="checkbox"
            onChange={() => dispatch(updateProps({ defaultShowRemainingTime: !state.defaultShowRemainingTime }))}
            checked={state.defaultShowRemainingTime}
          />
        </div>
        <div>
          <label htmlFor="title-control">Title</label>
          <input
            id="title-control"
            onChange={({ target: { value } }) => dispatch(updateProps({ title: value ? value : undefined }))}
            defaultValue={state.title}
          />
        </div>
        <div>
          <label htmlFor="forwardseekoffset-control">Forward Seek Offset</label>
          <input
            id="forwardseekoffset-control"
            type="number"
            min={1}
            max={99}
            onChange={({ target: { value } }) => dispatch(updateProps({ forwardSeekOffset: value ? +value : undefined }))}
            defaultValue={state.forwardSeekOffset}
          />
        </div>
        <div>
          <label htmlFor="backwardseekoffset-control">Backward Seek Offset</label>
          <input
            id="backwardseekoffset-control"
            type="number"
            min={1}
            max={99}
            onChange={({ target: { value } }) => dispatch(updateProps({ backwardSeekOffset: value ? +value : undefined }))}
            defaultValue={state.backwardSeekOffset}
          />
        </div>
        <div>
          <label htmlFor="debug-control">Debug</label>
          <input
            id="debug-control"
            type="checkbox"
            onChange={() => dispatch(updateProps({ debug: !state.debug }))}
            checked={state.debug}
          />
        </div>
        <div>
          <label htmlFor="env-key-control">Env Key (Mux Data)</label>
          <input
            id="env-key-control"
            onChange={({ target: { value } }) => dispatch(updateProps({ envKey: value ? value : undefined }))}
            defaultValue={state.envKey}
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
            <option value="--seek-live-button">--seek-live-button</option>
            <option value="--top-seek-live-button">--top-seek-live-button</option>
            <option value="--bottom-seek-live-button">--bottom-seek-live-button</option>
          </select>
        </div>
        <div>
          <label htmlFor="controls-backdrop-color">Controls Backdrop Color</label>
          <input
            id="controls-backdrop-color"
            type="color"
            onChange={(event) => setControlsBackdropColor(event.target.value)}
            value={controlsBackdropColor}
          />
        </div>
        <div>
          <label htmlFor="hotkeys-control">hotkeys </label>
          <select
            id="hotkeys-control"
            multiple
            onChange={({ target: { selectedOptions } }) => {
              const hotkeys = selectedOptions 
                ? Array.from(selectedOptions, ({ value }) => value).join(' ') 
                : undefined;
              dispatch(updateProps({ hotkeys }))}
            }
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
