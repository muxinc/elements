import Link from "next/link";
import Head from "next/head";
import type { GetStaticProps } from "next";

import muxBlurUp from '@mux/blurup'

import MuxPlayerLazy from '@mux/mux-player-react/lazy';

type Props = {
  playbackId: string
  blurDataURL: string
  aspectRatio: number
}

function MuxPlayerLazyPage({ playbackId, blurDataURL, aspectRatio }: Props) {
  return (
    <>
      <Head>
        <title>&lt;MuxPlayerLazy/&gt; Demo</title>
      </Head>

      <h3>Scroll down too see the Lazy Mux Player ↓</h3>
      <pre style={{ minHeight: '100vh' }}>
        <code>
          {`import muxBlurUp from '@mux/blurup'

import MuxPlayerLazy from '@mux/mux-player-react/lazy';

function MuxPlayerLazyPage({ playbackId, blurDataURL, aspectRatio }) {
  return (
      <MuxPlayerLazy
        playbackId={playbackId}
        placeholder={blurDataURL}
        style={{ aspectRatio }}
      />
  );
}

export const getStaticProps = async () => {
  const playbackId = "a4nOgmxGWg6gULfcBbAa00gXyfcwPnAFldF8RdsNyk8M"
  const { blurDataURL, aspectRatio } = await muxBlurUp(playbackId)

  return {
    props: {
      playbackId,
      blurDataURL,
      aspectRatio,
    }
  }
}

export default MuxPlayerLazyPage;            
`}
        </code>
      </pre>

      <MuxPlayerLazy
        playbackId={playbackId}
        placeholder={blurDataURL}
        style={{ aspectRatio }}
      />
    </>
  );
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  const playbackId = "a4nOgmxGWg6gULfcBbAa00gXyfcwPnAFldF8RdsNyk8M"
  const { blurDataURL, aspectRatio } = await muxBlurUp(playbackId)

  return {
    props: {
      playbackId,
      blurDataURL,
      aspectRatio,
    }
  }
}

export default MuxPlayerLazyPage;
