/* eslint-disable @typescript-eslint/no-unused-vars */
import Link from "next/link";
import Script from 'next/script';
import MuxPlayer, { MuxPlayerProps } from "@mux/mux-player-react";
import { useEffect, useReducer, useRef, useState } from "react";
import mediaAssetsJSON from "@mux/assets/media-assets.json";
import type MuxPlayerElement from "@mux/mux-player";
import { Fragment } from "react";

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
const INITIAL_DEFAULT_HIDDEN_CAPTIONS = undefined;
// const INITIAL_PLAYBACK_RATES = [0.25, 0.5, 1, 1.5, 2, 3];
const INITIAL_PLAYBACK_RATES = undefined;
const INITIAL_TITLE = undefined;
// const INITIAL_ENV_KEY = "5e67cqdt7hgc9vkla7p0qch7q";
const INITIAL_ENV_KEY = undefined;
const INITIAL_SELECTED_CSS_VARS = {};
const INITIAL_HOTKEYS = undefined;
const INITIAL_FORWARD_SEEK_OFFSET = undefined;
const INITIAL_BACKWARD_SEEK_OFFSET = undefined;
const INITIAL_VOLUME = undefined;
const INITIAL_LOOP = undefined;
const INITIAL_CROSS_ORIGIN = undefined;

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
  volume: INITIAL_VOLUME,
  loop: INITIAL_LOOP,
  crossOrigin: INITIAL_CROSS_ORIGIN,
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
};

const toWordsFromCamel = (string: string) => {
  const first = string[0].toUpperCase();
  const rest = string.slice(1);
  return `${first}${rest.replace(/[A-Z]/g, (match) => ` ${match}`)}`
};

const BooleanRenderer = ({ 
  name, 
  value, 
  label, 
  onChange 
}: { name: string, value: boolean | undefined, label?: string, onChange: (obj: any) => void }) => {
  const labelStr = label ?? toWordsFromCamel(name);
  return (
    <div>
      <label htmlFor={`${name}-control`}>{labelStr} (<code>{name}</code>)</label>
      <input
        id={`${name}-control`}
        type="checkbox"
        onChange={() => onChange({ [name]: !value })}
        checked={value ?? false}
      />
    </div>
  );
};

const NumberRenderer = ({ 
  name, 
  value, 
  label, 
  onChange,
  min,
  max,
  step,
}: { name: string; value: number | undefined; label?: string; onChange: (obj: any) => void; min?: number; max?: number; step?: number }) => {
  const labelStr = label ?? toWordsFromCamel(name);
  return (
    <div>
      <label htmlFor={`${name}-control`}>{labelStr} (<code>{name}</code>)</label>
      <input
        id={`${name}-control`}
        type="number"
        min={min}
        max={max}
        step={step}
        onChange={({ target: { value } }) => onChange({ [name]: value ? +value : undefined })}
        value={value ?? ''}
      />
    </div>
  );
};

const TextRenderer = ({ 
  name, 
  value, 
  label, 
  onChange,
}: { name: string; value: string | undefined; label?: string; onChange: (obj: any) => void; }) => {
  const labelStr = label ?? toWordsFromCamel(name);
  return (
    <div>
      <label htmlFor={`${name}-control`}>{labelStr} (<code>{name}</code>)</label>
      <input
        id={`${name}-control`}
        type="text"
        onChange={({ target: { value } }) => onChange({ [name]: value ? value : undefined })}
        value={value ?? ''}
      />
    </div>
  );
};

const ColorRenderer = ({ 
  name, 
  value, 
  label, 
  onChange,
}: { name: string; value: string | undefined; label?: string; onChange: (obj: any) => void; }) => {
  const labelStr = label ?? toWordsFromCamel(name);
  return (
    <div>
      <label htmlFor={`${name}-control`}>{labelStr} (<code>{name}</code>)</label>
      <input
        id={`${name}-control`}
        type="color"
        onChange={({ target: { value } }) => onChange({ [name]: value ? value : undefined })}
        value={value ?? '#000000'}
      />
    </div>
  );
};

const EnumRenderer = ({ 
  name, 
  value, 
  label, 
  onChange,
  values,
}: { name: string; value: any | undefined; label?: string; onChange: (obj: any) => void; values: any[] }) => {
  const labelStr = label ?? toWordsFromCamel(name);
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
      <label>{labelStr} (<code>{name}</code>)</label>
      <div>
        <input
          id={`${name}-none-control`}
          type="radio"
          onChange={() => onChange({ [name]: undefined })}
          value=""
          checked={!value}
        />
        <label htmlFor={`${name}-none-control`}>None</label>
        {values.map((enumValue, i) => {
          return (<Fragment key={`${name}-${enumValue}`}>
            <input
              id={`${name}-${enumValue}-control`}
              type="radio"
              onChange={() => onChange({ [name]: values[i] })}
              value={enumValue}
              checked={value === enumValue}
            />
            <label htmlFor={`${name}-${enumValue}-control`}><code>{JSON.stringify(enumValue)}</code></label>
            </Fragment>
          )
        })}
      </div>
    </div>
  );
};

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

  const genericOnChange = (obj) => dispatch(updateProps(obj));

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
          crossOrigin={state.crossOrigin}
          nohotkeys={state.nohotkeys}
          hotkeys={state.hotkeys}
          // onPlayerReady={() => console.log("ready!")}
          debug={state.debug}
          loop={state.loop}
          muted={state.muted}
          volume={state.volume}
          paused={state.paused}
          autoPlay={state.autoPlay}
          streamType={state.streamType}
          audio={state.audio}
          primaryColor={state.primaryColor}
          secondaryColor={state.secondaryColor}
          defaultShowRemainingTime={state.defaultShowRemainingTime}
          defaultHiddenCaptions={state.defaultHiddenCaptions}
          playbackRates={state.playbackRates}
          onPlay={(evt: Event) => {
            onPlay(evt);
            dispatch(updateProps({ paused: false }));
          }}
          onPause={(evt: Event) => {
            onPause(evt);
            dispatch(updateProps({ paused: true }));
          }}
          onVolumeChange={(event) => {
            const muxPlayerEl = event.target as MuxPlayerElement
            dispatch(updateProps({ muted: muxPlayerEl.muted, volume: muxPlayerEl.volume }));
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
        <EnumRenderer 
          value={state.streamType} 
          name="streamType" 
          onChange={genericOnChange}
          values={['on-demand', 'live', 'll-live', 'live:dvr', 'll-live:dvr']}
        />
        <ColorRenderer
          value={state.primaryColor}
          name="primaryColor"
          onChange={genericOnChange}
        />
        <ColorRenderer
          value={state.secondaryColor}
          name="secondaryColor"
          onChange={genericOnChange}
        />
        <BooleanRenderer 
          value={state.paused} 
          name="paused"
          onChange={genericOnChange}
        />
        <EnumRenderer 
          value={state.autoPlay} 
          name="autoPlay" 
          onChange={genericOnChange} 
          values={[true, false, 'any', 'muted']}
        />
        <BooleanRenderer 
          value={state.muted} 
          name="muted"
          onChange={genericOnChange}
        />
        <BooleanRenderer 
          value={state.nohotkeys} 
          name="nohotkeys"
          label="No Hot Keys"
          onChange={genericOnChange}
        />
        <BooleanRenderer 
          value={state.defaultShowRemainingTime} 
          name="defaultShowRemainingTime"
          onChange={genericOnChange}
        />
        <BooleanRenderer 
          value={state.defaultHiddenCaptions} 
          name="defaultHiddenCaptions"
          onChange={genericOnChange}
        />
        <TextRenderer
          value={state.title}
          name="title"
          onChange={genericOnChange}
        />
        <NumberRenderer
          value={state.forwardSeekOffset}
          name="forwardSeekOffset"
          onChange={genericOnChange}
          min={1}
          max={99}
        />
        <NumberRenderer
          value={state.backwardSeekOffset}
          name="backwardSeekOffset"
          onChange={genericOnChange}
          min={1}
          max={99}
        />
        <NumberRenderer
          value={state.volume}
          name="volume"
          onChange={genericOnChange}
          min={0}
          max={1}
          step={0.05}
        />
        <BooleanRenderer 
          value={state.debug} 
          name="debug"
          onChange={genericOnChange}
        />
        <BooleanRenderer 
          value={state.loop} 
          name="loop"
          onChange={genericOnChange}
        />
        <TextRenderer
          value={state.envKey}
          name="envKey"
          label="Env Key (Mux Data)"
          onChange={genericOnChange}
        />
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
            value={controlsBackdropColor ?? '#000000'}
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
