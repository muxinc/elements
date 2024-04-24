import Link from "next/link";
import Head from "next/head";
import Script from 'next/script';
import MuxPlayer from "@mux/mux-player-react/lazy";
import type {MuxPlayerProps} from "@mux/mux-player-react";
import { useEffect, useReducer, useRef, useState } from "react";
import mediaAssetsJSON from "@mux/assets/media-assets.json";
import type MuxPlayerElement from "@mux/mux-player";
import { useRouter } from "next/router";
import type { NextParsedUrlQuery } from "next/dist/server/request-meta";
import type { GetServerSideProps } from "next";
import { BooleanRenderer, ColorRenderer, EnumMultiSelectRenderer, EnumRenderer, NumberRenderer, TextRenderer, URLRenderer } from "../components/renderers";

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

const toMetadataFromMediaAsset = (mediaAsset: typeof mediaAssetsJSON[0], mediaAssets: typeof mediaAssetsJSON) => {
  const video_id = `videoId${mediaAssets.indexOf(mediaAsset) ?? -1}`;
  const video_title = `Title: ${mediaAsset.description ?? 'Some Video'}`;
  return {
    video_id,
    video_title,
  };
};

const toPlayerPropsFromJSON = (mediaAsset: typeof mediaAssetsJSON[0] | undefined, mediaAssets: typeof mediaAssetsJSON) => {
  const {
    'playback-id': playbackId,
    // 'stream-type': streamType,
    tokens,
    'custom-domain': customDomain,
    audio,
    description: title,
    placeholder,
  } = mediaAsset ?? {};
  // NOTE: Inferred type is "string" from JSON (CJP)
  const streamType = mediaAsset?.['stream-type'] as MuxPlayerProps["streamType"];
  const metadata = mediaAsset ? toMetadataFromMediaAsset(mediaAsset, mediaAssets) : undefined;

  return {
    playbackId,
    streamType,
    audio,
    tokens,
    customDomain,
    metadata,
    title,
    placeholder,
  };
};

const ActionTypes = {
  UPDATE: 'UPDATE',
};

const DEFAULT_INITIAL_STATE: Partial<MuxPlayerProps> = Object.freeze({
  muted: undefined,
  debug: undefined,
  autoPlay: undefined,
  preload: undefined,
  startTime: undefined,
  currentTime: undefined,
  paused: undefined,
  nohotkeys: undefined,
  hotkeys: undefined,
  defaultShowRemainingTime: undefined,
  defaultHiddenCaptions: undefined,
  primaryColor: undefined,
  secondaryColor: undefined,
  thumbnailTime: undefined,
  title: undefined,
  envKey: undefined,
  playbackRates: undefined,
  playbackRate: undefined,
  forwardSeekOffset: undefined,
  backwardSeekOffset: undefined,
  volume: undefined,
  loop: undefined,
  crossOrigin: undefined,
  customDomain: undefined,
  tokens: undefined,
  playbackId: undefined,
  streamType: undefined,
});

const reducer = (state: Partial<{ [k: string]: any }>, action): Partial<{ [k: string]: any }> => {
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

const toInitialState = (selectedAsset: typeof mediaAssetsJSON[0] | undefined, mediaAssets: typeof mediaAssetsJSON, query: NextParsedUrlQuery) => {
  const queryState = Object.fromEntries(Object.entries(query).map(([k, v]) => [k, JSON.parse(v as string)]));
  const selectedAssetState = toPlayerPropsFromJSON(selectedAsset, mediaAssets);
  const initialState = {
    ...DEFAULT_INITIAL_STATE,
    ...selectedAssetState,
    ...queryState,
  };
  return initialState;
};

const updateProps = <T extends any = any>(value: Partial<T>) => {
  return {
    type: ActionTypes.UPDATE,
    value,
  };
};

const toValueString = (value: any) => {
  if (['boolean', 'number', 'string'].includes(typeof value)) return `${JSON.stringify(value)}`;
  if (Array.isArray(value)) return `[${value.map(toValueString).join(', ')}]`;
  if (typeof value === 'object') return `{ ${Object.entries(value).map(([key, entryValue]) => `${key}: ${toValueString(entryValue)}`).join(', ')} }`;
  return value;
};

const MuxPlayerCodeRenderer = ({ state, component = 'MuxPlayer' }: { state: Partial<MuxPlayerProps>; component?: string; }) => {
  const stateEntries = Object.entries(state).filter(([,value]) => value != undefined);
  const propsStr = stateEntries.length
    ? `\n${stateEntries.map(([key, value]) => `  ${key}={${toValueString(value)}}`).join('\n')}\n`
    : '';
  const codeStr = `<${component}${propsStr}/>`;
  const copyToClipboard = () => {
    navigator.clipboard?.writeText(codeStr);
  };
  return (
    <div className="code-renderer" style={{}}>
      <pre>
        <code>{codeStr}</code>
      </pre>
      <button onClick={copyToClipboard}>Copy code</button>
    </div>
  );
};

const UrlPathRenderer = ({
  state,
  location: { origin, pathname } = {
    origin: '',
    pathname: './'
  },
}: { state: Partial<MuxPlayerProps>; location?: Pick<Location, 'origin' | 'pathname'>; }) => {
  const stateEntries = Object.entries(state).filter(([,value]) => value != undefined);
  const urlSearchParamsStr = stateEntries.length
    ? `?${new URLSearchParams(Object.fromEntries(stateEntries.map(([k, v]) => [k, JSON.stringify(v)]))).toString()}`
    : ''
  const urlStr = `${origin}${pathname}${urlSearchParamsStr}`;
  const copyToClipboard = () => {
    navigator.clipboard?.writeText(urlStr);
  };
  return (
    <div className="url-renderer">
      <a href={urlStr} target="_blank">{urlStr}</a>
      <button onClick={copyToClipboard}>Copy URL</button>
    </div>
  );
};

const SMALL_BREAKPOINT = 700;
const XSMALL_BREAKPOINT = 300;
const MediaChromeSizes = {
  LG: 'large',
  SM: 'small',
  XS: 'extra-small',
};

const PlayerSizeWidths = {
  [MediaChromeSizes.LG]: 800,
  [MediaChromeSizes.SM]: 600,
  [MediaChromeSizes.XS]: 250,
};
const PlayerSizeHeights = {
  [MediaChromeSizes.LG]: 450,
  [MediaChromeSizes.SM]: 338,
  [MediaChromeSizes.XS]: 141,
};

function getPlayerSize(width) {
  if (width == undefined) return undefined;
  return width < XSMALL_BREAKPOINT
    ? MediaChromeSizes.XS
    : width < SMALL_BREAKPOINT
    ? MediaChromeSizes.SM
    : MediaChromeSizes.LG;
}

const ControlCustomizationCSSVars = [
  "--controls",
  "--top-controls",
  "--center-controls",
  "--bottom-controls",
  "--duration-display",
  "--bottom-duration-display",
  "--play-button",
  "--center-play-button",
  "--bottom-play-button",
  "--time-range",
  "--bottom-time-range",
  "--seek-backward-button",
  "--bottom-seek-backward-button",
  "--seek-forward-button",
  "--bottom-seek-forward-button",
  "--time-display",
  "--title-display",
  "--bottom-title-display",
  "--top-title-display",
  "--bottom-time-display",
  "--mute-button",
  "--bottom-mute-button",
  "--volume-range",
  "--bottom-volume-range",
  "--playback-rate-button",
  "--bottom-playback-rate-button",
  "--captions-button",
  "--top-captions-button",
  "--bottom-captions-button",
  "--airplay-button",
  "--top-airplay-button",
  "--bottom-airplay-button",
  "--cast-button",
  "--top-cast-button",
  "--bottom-cast-button",
  "--pip-button",
  "--top-pip-button",
  "--bottom-pip-button",
  "--fullscreen-button",
  "--bottom-fullscreen-button",
  "--live-button",
  "--top-live-button",
  "--bottom-live-button",
];

const getControlCustomizationCSSVars = (state) => {
  return Object.entries(state)
    .filter(([k, v]) => ControlCustomizationCSSVars.includes(k) && !!v)
    .map(([k]) => k);
};

type Props = { location?: Pick<Location, 'origin' | 'pathname'> };

const getUrl = ({ req, resolvedUrl }) => {
  const { headers } = req;
  const refererUrl = headers.referer && new URL(headers.referer);
  const baseUrlHost = headers.host.toLowerCase();
  const refererHost = refererUrl?.host?.toLowerCase();


  if (refererHost === baseUrlHost && headers["sec-fetch-site"] === "same-origin") {
    return new URL(refererUrl?.origin ? refererUrl.origin + resolvedUrl : './');
  }

  const startsLocal = baseUrlHost.startsWith('localhost') || baseUrlHost.startsWith('127.') || baseUrlHost.startsWith('192.');
  const protocol = startsLocal ? 'http:' : 'https:';
  return new URL(`${protocol}//${baseUrlHost}${resolvedUrl}`);
};

export const getServerSideProps: GetServerSideProps<Props> = async context => {
  const { origin, pathname }: Pick<Location, 'origin' | 'pathname'> = getUrl(context);
  const location = { origin, pathname };
  return ({ props: { location } })
};

function MuxPlayerPage({ location }: Props) {
  const router = useRouter();
  const [isRefSafeToCheck, setIsRefSafeToCheck] = useState(false)
  const mediaElRef = useRef(null);
  const [mediaAssets, _setMediaAssets] = useState(mediaAssetsJSON);
  const [selectedAsset, setSelectedAsset] = useState(undefined);
  const [state, dispatch] = useReducer(reducer, toInitialState(selectedAsset, mediaAssets, router.query));
  useEffect(() => {
    if (!router.isReady) return;
    dispatch(updateProps(toInitialState(selectedAsset, mediaAssets, router.query)))
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.query, router.isReady]);
  const [stylesState, dispatchStyles] = useReducer(reducer, {});
  const genericOnChange = (obj) => dispatch(updateProps<MuxPlayerProps>(obj));
  const genericOnStyleChange = (obj) => dispatchStyles(updateProps(obj));

  const [optionStyles, optionsDispatchStyles] = useReducer(reducer, {
    '--player-height': '450px'
  });
  const optionsGenericOnStyleChange = (obj) => optionsDispatchStyles(updateProps(obj));
  useEffect(() => {
    if (isRefSafeToCheck) {
      const height = mediaElRef.current.offsetHeight;
      optionsGenericOnStyleChange({'--player-height': height + 'px'});
    }
  }, [mediaElRef, isRefSafeToCheck]);

  return (
    <>
      <Head>
        <title>&lt;MuxPlayer/&gt; Demo</title>
      </Head>

      <MuxPlayer
        ref={mediaElRef}
        style={stylesState}
        envKey={state.envKey}
        metadata={state.metadata}
        title={state.title}
        startTime={state.startTime}
        currentTime={state.currentTime}
        thumbnailTime={state.thumbnailTime}
        poster={state.poster}
        placeholder={state.placeholder}
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
        preload={state.preload}
        streamType={state.streamType}
        audio={state.audio}
        primaryColor={state.primaryColor}
        secondaryColor={state.secondaryColor}
        defaultShowRemainingTime={state.defaultShowRemainingTime}
        defaultHiddenCaptions={state.defaultHiddenCaptions}
        /** @TODO This doesn't appear to work? (CJP) */
        // playbackRate={state.playbackRate}
        playbackRates={state.playbackRates}
        onPlay={(evt: Event) => {
          onPlay(evt);
          // dispatch(updateProps({ paused: false }));
        }}
        onPause={(evt: Event) => {
          onPause(evt);
          // dispatch(updateProps({ paused: true }));
        }}
        onVolumeChange={(event) => {
          // const muxPlayerEl = event.target as MuxPlayerElement
          // dispatch(updateProps({ muted: muxPlayerEl.muted, volume: muxPlayerEl.volume }));
        }}
        onSeeking={onSeeking}
        onSeeked={onSeeked}
        onLoadStart={(evt) => {
          onLoadStart(evt)
          // onLoadStart will fire after mux-player-react/lazy has mounted
          setIsRefSafeToCheck(true)
        }}
      />

      <div className="options" style={optionStyles}>
        <MuxPlayerCodeRenderer state={state}/>
        <UrlPathRenderer
          state={state}
          location={typeof window !== 'undefined' ? window.location : location}
        />
        <div>
          <label htmlFor="assets-control">Select from one of our example assets</label>
          <select
            id="assets-control"
            onChange={({ target: { value } }) => {
              setSelectedAsset(mediaAssets[value]);
              dispatch(updateProps<MuxPlayerProps>(toPlayerPropsFromJSON(mediaAssets[value], mediaAssets)));
            }}
            value={mediaAssets.indexOf(selectedAsset)}
          >
            <option value="-1">
              None
            </option>
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
        <div><h2>Manual Config</h2></div>
        <TextRenderer
          value={state.playbackId}
          name="playbackId"
          onChange={genericOnChange}
        />
        <EnumRenderer
          value={state.streamType}
          name="streamType"
          onChange={genericOnChange}
          values={['on-demand', 'live', 'll-live', 'live:dvr', 'll-live:dvr']}
        />
        <EnumRenderer
          value={getPlayerSize(stylesState.width)}
          name="width"
          label="Width Cutoffs for Responsive Player Chrome/UI"
          onChange={({ width: playerSize }) => {
            const width = PlayerSizeWidths[playerSize?.split(' ')[0]];
            const height = PlayerSizeHeights[playerSize?.split(' ')[0]];
            dispatchStyles(updateProps({ width }));
            if (height) {
              optionsGenericOnStyleChange({'--player-height': height + 'px'});
            } else {
              optionsGenericOnStyleChange({'--player-height': ''});
            }
          }}
          values={['extra-small', 'small', 'large']}
        />
        <BooleanRenderer
          value={state.audio}
          name="audio"
          onChange={genericOnChange}
        />
        <TextRenderer
          value={state.envKey}
          name="envKey"
          label="Env Key (Mux Data)"
          onChange={genericOnChange}
          placeholder={`Inferred from playbackId`}
        />
        <URLRenderer
          value={state.customDomain}
          name="customDomain"
          onChange={genericOnChange}
          placeholder="my.customdomain.com"
        />
        <URLRenderer
          value={state.poster}
          name="poster"
          onChange={genericOnChange}
          placeholder={`Inferred from playbackId`}
        />
        <TextRenderer
          value={state.placeholder}
          name="placeholder"
          label="Placeholder Image"
          onChange={genericOnChange}
        />
        <TextRenderer
          value={state.title}
          name="title"
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
        <EnumRenderer
          value={state.preload}
          name="preload"
          onChange={genericOnChange}
          values={['none', 'metadata', 'auto']}
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
        <NumberRenderer
          value={state.startTime}
          name="startTime"
          onChange={genericOnChange}
          min={0}
        />
        <NumberRenderer
          value={state.currentTime}
          name="currentTime"
          onChange={genericOnChange}
          min={0}
          /** @TODO solve `undefined` error cases (CJP) */
          // max={mediaElRef.current?.duration}
        />
        <NumberRenderer
          value={state.thumbnailTime}
          name="thumbnailTime"
          onChange={genericOnChange}
          min={0}
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
        <EnumRenderer
          value={state.crossOrigin}
          name="crossOrigin"
          onChange={genericOnChange}
          values={['anonymous', 'use-credentials']}
        />
        {/** @TODO This doesn't appear to work? (CJP) */}
        {/* <NumberRenderer
          value={state.playbackRate}
          name="playbackRate"
          onChange={genericOnChange}
          min={0}
          max={3}
          step={0.25}
        /> */}
        {/** @TODO Is this sufficient for a UI or do we want a "fancier" one that allows adding/removing dynamic items from a list (CJP) */}
        <EnumMultiSelectRenderer
          value={state.playbackRates}
          name="playbackRates"
          onChange={genericOnChange}
          values={[0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2, 2.5, 3]}
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
        <EnumMultiSelectRenderer
          value={getControlCustomizationCSSVars(stylesState)}
          name='--controls'
          label="Display Controls CSS vars (Hiding usage)"
          onChange={({ ['--controls']: cssVars }) => {
            const nextCSSVars = ControlCustomizationCSSVars.reduce((curCSSVars, cssVarName) => {
              curCSSVars[cssVarName] = cssVars.includes(cssVarName) ? 'none' : undefined;
              return curCSSVars;
            }, {});
            genericOnStyleChange(nextCSSVars);
          }}
          values={ControlCustomizationCSSVars}
        />
        <ColorRenderer
          value={stylesState['--controls-backdrop-color']}
          name="--controls-backdrop-color"
          label="Controls Backdrop Color"
          onChange={genericOnStyleChange}
        />
        <EnumMultiSelectRenderer
          value={state.hotkeys?.split(' ')}
          name='hotkeys'
          label="Hot Keys"
          onChange={({ hotkeys }) => {
            genericOnChange({ hotkeys: hotkeys.join(' ') });
          }}
          values={['noc', 'nof', 'nok', 'nom', 'nospace', 'noarrowleft', 'noarrowright']}
        />
      </div>
    </>
  );
}

export default MuxPlayerPage;
