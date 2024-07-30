import Head from 'next/head';
import MuxPlayer, { MuxPlayerProps, MaxResolution, MinResolution, RenditionOrder } from '@mux/mux-player-react';
import '@mux/mux-player/themes/classic';
import '@mux/mux-player/themes/minimal';
import '@mux/mux-player/themes/microvideo';
import '@mux/mux-player/themes/gerwig';
import { useReducer, useState } from 'react';
import mediaAssetsJSON from '@mux/assets/media-assets.json';
import type { NextParsedUrlQuery } from 'next/dist/server/request-meta';
import {
  BooleanRenderer,
  ColorRenderer,
  EnumMultiSelectRenderer,
  EnumRenderer,
  NumberRenderer,
  TextRenderer,
  URLRenderer,
} from '../components/renderers';
import URLPathRenderer from '../components/URLPathRenderer';
import ComponentCodeRenderer from '../components/ComponentCodeRenderer';
import {
  LocationProps,
  getLocationServerSideProps,
  reducer,
  updateProps,
  usePageStateReducer,
} from '../app/page-state';

const onLoadStart = console.log.bind(null, 'loadstart');
const onLoadedMetadata = console.log.bind(null, 'loadedmetadata');
const onProgress = console.log.bind(null, 'progress');
const onDurationChange = console.log.bind(null, 'durationchange');
const onVolumeChange = console.log.bind(null, 'volumechange');
const onRateChange = console.log.bind(null, 'ratechange');
const onResize = console.log.bind(null, 'resize');
const onWaiting = console.log.bind(null, 'waiting');
const onPlay = console.log.bind(null, 'play');
const onPlaying = console.log.bind(null, 'playing');
const onTimeUpdate = console.log.bind(null, 'timeupdate');
const onPause = console.log.bind(null, 'pause');
const onSeeking = console.log.bind(null, 'seeking');
const onSeeked = console.log.bind(null, 'seeked');
const onEnded = console.log.bind(null, 'ended');
const onError = console.log.bind(null, 'error');
const onPlayerReady = console.log.bind(null, 'playerready');

const toMetadataFromMediaAsset = (mediaAsset: (typeof mediaAssetsJSON)[0], mediaAssets: typeof mediaAssetsJSON) => {
  const video_id = `videoId${mediaAssets.indexOf(mediaAsset) ?? -1}`;
  const video_title = `Title: ${mediaAsset.description ?? 'Some Video'}`;
  return {
    video_id,
    video_title,
  };
};

const toPlayerPropsFromJSON = (
  mediaAsset: (typeof mediaAssetsJSON)[0] | undefined,
  mediaAssets: typeof mediaAssetsJSON
) => {
  const {
    'playback-id': playbackId,
    tokens,
    'custom-domain': customDomain,
    'storyboard-src': storyboardSrc,
    audio,
    description: title,
    placeholder,
  } = mediaAsset ?? {};
  const metadata = mediaAsset ? toMetadataFromMediaAsset(mediaAsset, mediaAssets) : undefined;

  return {
    playbackId,
    audio,
    tokens,
    customDomain,
    storyboardSrc,
    metadata,
    title,
    placeholder,
  };
};

const DEFAULT_INITIAL_STATE: Partial<MuxPlayerProps> = Object.freeze({
  preferCmcd: undefined,
  muted: undefined,
  debug: undefined,
  noVolumePref: undefined,
  disableTracking: undefined,
  disableCookies: undefined,
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
  accentColor: undefined,
  maxResolution: undefined,
  minResolution: undefined,
  renditionOrder: undefined,
  programStartTime: undefined,
  programEndTime: undefined,
  thumbnailTime: undefined,
  title: undefined,
  envKey: undefined,
  playbackRates: undefined,
  playbackRate: undefined,
  forwardSeekOffset: undefined,
  backwardSeekOffset: undefined,
  defaultDuration: undefined,
  volume: undefined,
  loop: undefined,
  crossOrigin: undefined,
  customDomain: undefined,
  tokens: undefined,
  playbackId: undefined,
  streamType: undefined,
  storyboardSrc: undefined,
  theme: undefined,
});

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

const DEFAULT_INITIAL_STYLES_STATE = {
  width: `${PlayerSizeWidths[MediaChromeSizes.LG] + 1} + px`,
  // width: PlayerSizeWidths[MediaChromeSizes.LG] + 'px',
  // height: PlayerSizeHeights[MediaChromeSizes.LG] + 'px',
};

const toInitialState = (
  query: NextParsedUrlQuery,
  selectedAsset?: (typeof mediaAssetsJSON)[0] | undefined,
  mediaAssets?: typeof mediaAssetsJSON
) => {
  const queryState = Object.fromEntries(Object.entries(query).map(([k, v]) => [k, JSON.parse(v as string)]));
  const selectedAssetState = toPlayerPropsFromJSON(selectedAsset, mediaAssets);
  const initialState = {
    ...selectedAssetState,
    ...DEFAULT_INITIAL_STATE,
    ...queryState,
  };
  return initialState as Partial<MuxPlayerProps>;
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
  '--controls',
  '--top-controls',
  '--center-controls',
  '--bottom-controls',
  '--loading-indicator',
  '--dialog',
  '--duration-display',
  '--bottom-duration-display',
  '--play-button',
  '--center-play-button',
  '--bottom-play-button',
  '--time-range',
  '--bottom-time-range',
  '--seek-backward-button',
  '--bottom-seek-backward-button',
  '--seek-forward-button',
  '--bottom-seek-forward-button',
  '--time-display',
  '--title-display',
  '--bottom-title-display',
  '--top-title-display',
  '--bottom-time-display',
  '--mute-button',
  '--bottom-mute-button',
  '--volume-range',
  '--bottom-volume-range',
  '--rendition-selectmenu',
  '--top-rendition-selectmenu',
  '--bottom-rendition-selectmenu',
  '--playback-rate-button',
  '--bottom-playback-rate-button',
  '--audio-track-selectmenu',
  '--top-audio-track-selectmenu',
  '--bottom-audio-track-selectmenu',
  '--captions-button',
  '--top-captions-button',
  '--bottom-captions-button',
  '--captions-selectmenu',
  '--top-captions-selectmenu',
  '--bottom-captions-selectmenu',
  '--airplay-button',
  '--top-airplay-button',
  '--bottom-airplay-button',
  '--cast-button',
  '--top-cast-button',
  '--bottom-cast-button',
  '--pip-button',
  '--top-pip-button',
  '--bottom-pip-button',
  '--fullscreen-button',
  '--bottom-fullscreen-button',
  '--live-button',
  '--top-live-button',
  '--bottom-live-button',
];

const getControlCustomizationCSSVars = (state) => {
  return Object.entries(state)
    .filter(([k, v]) => ControlCustomizationCSSVars.includes(k) && !!v)
    .map(([k]) => k);
};

const MaxResolutionValues = Object.values(MaxResolution);
const MinResolutionValues = Object.values(MinResolution);
const RenditionOrderValues = Object.values(RenditionOrder);

export const getServerSideProps = getLocationServerSideProps;

type Props = LocationProps;

function MuxPlayerPage({ location }: Props) {
  // const mediaElRef = useRef<MuxPlayerElement>(null);
  const [mediaAssets, _setMediaAssets] = useState(mediaAssetsJSON);
  const [selectedAsset, setSelectedAsset] = useState(undefined);
  /** @TODO fix typing complexities here (CJP) */
  // @ts-ignore
  const [state, dispatch, genericOnChange] = usePageStateReducer<MuxPlayerProps>(toInitialState, [
    selectedAsset,
    mediaAssets,
  ]);
  const [stylesState, dispatchStyles] = useReducer(reducer, DEFAULT_INITIAL_STYLES_STATE);
  const genericOnStyleChange = (obj) => dispatchStyles(updateProps(obj));

  return (
    <>
      <Head>
        <title>&lt;MuxPlayer/&gt; Demo</title>
      </Head>
      <main className="component-page">
        <MuxPlayer
          // ref={mediaElRef}
          style={stylesState}
          theme={state.theme}
          envKey={state.envKey}
          metadata={state.metadata}
          // Test _hlsConfig for MuxPlayer (react) (Note: This also indirectly tests <mux-player> & <mux-video>)
          // _hlsConfig={{
          //   startLevel: 2,
          //   debug: true,
          // }}
          title={state.title}
          startTime={state.startTime}
          currentTime={state.currentTime}
          thumbnailTime={state.thumbnailTime}
          poster={state.poster}
          placeholder={state.placeholder}
          playbackId={state.playbackId}
          tokens={state.tokens}
          storyboardSrc={state.storyboardSrc}
          customDomain={state.customDomain}
          forwardSeekOffset={state.forwardSeekOffset}
          backwardSeekOffset={state.backwardSeekOffset}
          crossOrigin={state.crossOrigin}
          nohotkeys={state.nohotkeys}
          hotkeys={state.hotkeys}
          // onPlayerReady={() => console.log("ready!")}
          preferCmcd={state.preferCmcd}
          debug={state.debug}
          noVolumePref={state.noVolumePref}
          disableTracking={state.disableTracking}
          disableCookies={state.disableCookies}
          loop={state.loop}
          muted={state.muted}
          volume={state.volume}
          paused={state.paused}
          autoPlay={state.autoPlay}
          maxResolution={state.maxResolution}
          minResolution={state.minResolution}
          renditionOrder={state.renditionOrder}
          programStartTime={state.programStartTime}
          programEndTime={state.programEndTime}
          // To test/apply extra playlist params to resultant src URL (CJP)
          // extraSourceParams={{
          //   foo: 'str',
          //   bar: true,
          //   baz: 1,
          // }}
          preload={state.preload}
          streamType={state.streamType}
          targetLiveWindow={state.targetLiveWindow}
          defaultStreamType={state.defaultStreamType}
          audio={state.audio}
          primaryColor={state.primaryColor}
          secondaryColor={state.secondaryColor}
          accentColor={state.accentColor}
          defaultShowRemainingTime={state.defaultShowRemainingTime}
          defaultHiddenCaptions={state.defaultHiddenCaptions}
          defaultDuration={state.defaultDuration}
          playbackRate={state.playbackRate}
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
          onEnded={onEnded}
          onWaiting={onWaiting}
        />

        <div className="options">
          <ComponentCodeRenderer state={state} component="MuxPlayer" />
          <URLPathRenderer state={state} location={typeof window !== 'undefined' ? window.location : location} />
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
              <option value="-1">None</option>
              {mediaAssets.map((value, i) => {
                const { description, error } = value;
                const label = `${error ? '👎 ' : ''}${description}`;
                return (
                  <option key={i} value={i}>
                    {label}
                  </option>
                );
              })}
            </select>
          </div>
          <div>
            <h2>Manual Config</h2>
          </div>
          <TextRenderer value={state.playbackId} name="playbackId" onChange={genericOnChange} />
          <EnumRenderer
            value={state.streamType}
            name="streamType"
            onChange={genericOnChange}
            values={['on-demand', 'live', 'll-live', 'live:dvr', 'll-live:dvr', 'unknown']}
            formatter={(enumValue) =>
              ['on-demand', 'live', 'unknown'].includes(enumValue) ? (
                <code>{JSON.stringify(enumValue)}</code>
              ) : (
                <>
                  <code>{JSON.stringify(enumValue)}</code> (deprecated)
                </>
              )
            }
          />
          <EnumRenderer
            value={state.targetLiveWindow}
            name="targetLiveWindow"
            onChange={genericOnChange}
            values={[Infinity, 0, NaN]}
          />
          <EnumRenderer
            value={state.defaultStreamType}
            name="defaultStreamType"
            onChange={genericOnChange}
            values={['on-demand', 'live', 'unknown']}
          />
          <EnumRenderer
            value={getPlayerSize(stylesState.width)}
            name="width"
            label="Width Cutoffs for Responsive Player Chrome/UI"
            onChange={({ width: playerSize }) => {
              const width = PlayerSizeWidths[playerSize?.split(' ')[0]];
              dispatchStyles(updateProps({ width }));
            }}
            values={['extra-small', 'small', 'large']}
          />
          <BooleanRenderer value={state.audio} name="audio" onChange={genericOnChange} />
          <EnumRenderer
            value={state.theme}
            name="theme"
            onChange={genericOnChange}
            values={['classic', 'microvideo', 'minimal', 'gerwig']}
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
          <URLRenderer
            value={state.storyboardSrc}
            name="storyboardSrc"
            onChange={genericOnChange}
            placeholder={`Inferred from playbackId`}
          />
          <TextRenderer
            value={state.placeholder}
            name="placeholder"
            label="Placeholder Image"
            onChange={genericOnChange}
          />
          <TextRenderer value={state.title} name="title" onChange={genericOnChange} />
          <BooleanRenderer value={state.paused} name="paused" onChange={genericOnChange} />
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
          <BooleanRenderer value={state.muted} name="muted" onChange={genericOnChange} />
          <BooleanRenderer value={state.nohotkeys} name="nohotkeys" label="No Hot Keys" onChange={genericOnChange} />
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
          <NumberRenderer value={state.volume} name="volume" onChange={genericOnChange} min={0} max={1} step={0.05} />
          <BooleanRenderer value={state.noVolumePref} name="noVolumePref" onChange={genericOnChange} />
          <NumberRenderer value={state.startTime} name="startTime" onChange={genericOnChange} min={0} />
          <NumberRenderer
            value={state.currentTime}
            name="currentTime"
            onChange={genericOnChange}
            min={0}
            /** @TODO solve `undefined` error cases (CJP) */
            // max={mediaElRef.current?.duration}
          />
          <NumberRenderer value={state.thumbnailTime} name="thumbnailTime" onChange={genericOnChange} min={0} />
          <BooleanRenderer value={state.disableTracking} name="disableTracking" onChange={genericOnChange} />
          <BooleanRenderer value={state.disableCookies} name="disableCookies" onChange={genericOnChange} />
          <BooleanRenderer value={state.debug} name="debug" onChange={genericOnChange} />
          <EnumRenderer
            value={state.preferCmcd}
            name="preferCmcd"
            onChange={genericOnChange}
            values={['query', 'header', 'none']}
          />
          <BooleanRenderer value={state.loop} name="loop" onChange={genericOnChange} />
          <EnumRenderer
            value={state.crossOrigin}
            name="crossOrigin"
            onChange={genericOnChange}
            values={['anonymous', 'use-credentials']}
          />
          <NumberRenderer
            value={state.playbackRate}
            name="playbackRate"
            onChange={genericOnChange}
            min={0}
            max={3}
            step={0.25}
          />
          {/** @TODO Is this sufficient for a UI or do we want a "fancier" one that allows adding/removing dynamic items from a list (CJP) */}
          <EnumMultiSelectRenderer
            value={state.playbackRates}
            name="playbackRates"
            onChange={genericOnChange}
            values={[0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2, 2.5, 3]}
          />
          <NumberRenderer
            value={state.defaultDuration}
            name="defaultDuration"
            onChange={genericOnChange}
            min={0}
            step={1}
          />
          <ColorRenderer value={state.primaryColor} name="primaryColor" onChange={genericOnChange} />
          <ColorRenderer value={state.secondaryColor} name="secondaryColor" onChange={genericOnChange} />
          <ColorRenderer value={state.accentColor} name="accentColor" onChange={genericOnChange} />
          <EnumMultiSelectRenderer
            value={getControlCustomizationCSSVars(stylesState)}
            name="--controls"
            label="Display Controls CSS vars (Hiding usage)"
            onChange={({ ['--controls']: cssVars = [] }) => {
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
            name="hotkeys"
            label="Hot Keys"
            onChange={({ hotkeys }) => {
              genericOnChange({ hotkeys: hotkeys?.join(' ') ?? undefined });
            }}
            values={['noc', 'nof', 'nok', 'nom', 'nospace', 'noarrowleft', 'noarrowright']}
          />
          <EnumRenderer
            value={state.maxResolution}
            name="maxResolution"
            onChange={genericOnChange}
            values={MaxResolutionValues}
          />
          <EnumRenderer
            value={state.minResolution}
            name="minResolution"
            onChange={genericOnChange}
            values={MinResolutionValues}
          />
          <EnumRenderer
            value={state.renditionOrder}
            name="renditionOrder"
            onChange={genericOnChange}
            values={RenditionOrderValues}
          />
          <NumberRenderer
            value={state.programStartTime}
            name="programStartTime"
            onChange={genericOnChange}
            min={0}
            step={1}
          />
          <NumberRenderer
            value={state.programEndTime}
            name="programEndTime"
            onChange={genericOnChange}
            min={0}
            step={1}
          />
        </div>
      </main>
    </>
  );
}

export default MuxPlayerPage;
