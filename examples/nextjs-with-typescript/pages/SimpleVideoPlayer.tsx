import Head from 'next/head';
import type { NextParsedUrlQuery } from 'next/dist/server/request-meta';
import { PlaybackData, SimpleVideoPlayer } from '../components/SimpleVideoPlayer';
import { TextRenderer } from '../components/renderers';
import URLPathRenderer from '../components/URLPathRenderer';
import ComponentCodeRenderer from '../components/ComponentCodeRenderer';
import { LocationProps, getLocationServerSideProps, usePageStateReducer } from '../app/page-state';

const DEFAULT_INITIAL_STATE: Partial<PlaybackData> = Object.freeze({
  tokens: undefined,
  playbackId: undefined,
});

const toInitialState = (query: NextParsedUrlQuery) => {
  const queryState = Object.fromEntries(Object.entries(query).map(([k, v]) => [k, JSON.parse(v as string)]));
  const initialState = {
    ...DEFAULT_INITIAL_STATE,
    ...queryState,
  };
  return initialState as Partial<PlaybackData>;
};

export const getServerSideProps = getLocationServerSideProps;

type Props = LocationProps;

function MuxPlayerPage({ location }: Props) {
  /** @TODO fix typing complexities here (CJP) */
  // @ts-ignore
  const [state, _dispatch, genericOnChange] = usePageStateReducer<PlaybackData>(toInitialState, [undefined]);

  return (
    <>
      <Head>
        <title>&lt;MuxPlayer/&gt; Demo</title>
      </Head>
      <main className="component-page">
        <SimpleVideoPlayer
          // ref={mediaElRef}
          // Test _hlsConfig for MuxPlayer (react) (Note: This also indirectly tests <mux-player> & <mux-video>)
          // _hlsConfig={{
          //   startLevel: 2,
          //   debug: true,
          // }}
          playbackId={state.playbackId}
          tokens={state.tokens}
        />

        <div className="options">
          <ComponentCodeRenderer state={state} component="SimpleVideoPlayerPlayer" />
          <URLPathRenderer state={state} location={typeof window !== 'undefined' ? window.location : location} />
          <div>
            <h2>Manual Config</h2>
          </div>
          <TextRenderer value={state.playbackId} name="playbackId" onChange={genericOnChange} />
          <TextRenderer value={state.tokens?.playback} name="tokens.playback" onChange={genericOnChange} />
          <TextRenderer value={state.tokens?.drm} name="tokens.drm" onChange={genericOnChange} />
        </div>
      </main>
    </>
  );
}

export default MuxPlayerPage;
