import Link from "next/link";
import Head from "next/head";
import type { GetStaticProps } from "next";

import muxBlurHash from '@mux/blurhash'

import MuxPlayerLazy from '@mux/mux-player-react/lazy';

type Props = {
  playbackId: string
  blurHashBase64: string
  sourceWidth: number
  sourceHeight: number
}
function MuxPlayerLazyPage({ playbackId, blurHashBase64, sourceWidth, sourceHeight }: Props) {
  return (
    <>
      <Head>
        <title>&lt;MuxPlayerLazy/&gt; Demo</title>
      </Head>

      <h3>Scroll down too see the Lazy Mux Player ↓</h3>
      <pre style={{ minHeight: '100vh' }}>
        <code>
          {`import muxBlurHash from '@mux/blurhash'

import MuxPlayerLazy from '@mux/mux-player-react/lazy';

function MuxPlayerLazyPage({ playbackId, blurHashBase64, sourceWidth, sourceHeight }) {
  return (
      <MuxPlayerLazy
        playbackId={playbackId}
        placeholder={blurHashBase64}
        style={{ aspectRatio: \`\${sourceWidth}/\${sourceHeight}\` }}
        streamType="on-demand"
      />
  );
}

export const getStaticProps = async () => {
  const playbackId = "a4nOgmxGWg6gULfcBbAa00gXyfcwPnAFldF8RdsNyk8M"
  const { blurHashBase64, sourceWidth, sourceHeight } = await muxBlurHash(playbackId)

  return {
    props: {
      playbackId,
      blurHashBase64,
      sourceWidth,
      sourceHeight
    }
  }
}

export default MuxPlayerLazyPage;            
`}
        </code>
      </pre>

      <MuxPlayerLazy
        playbackId={playbackId}
        placeholder={blurHashBase64}
        style={{ aspectRatio: `${sourceWidth}/${sourceHeight}` }}
        streamType="on-demand"
      />

      <br/>
      <Link href="/">Browse Elements</Link>
    </>
  );
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  const playbackId = "a4nOgmxGWg6gULfcBbAa00gXyfcwPnAFldF8RdsNyk8M"
  const { blurHashBase64, sourceWidth, sourceHeight } = await muxBlurHash(playbackId)

  return {
    props: {
      playbackId,
      blurHashBase64,
      sourceWidth,
      sourceHeight
    }
  }
}

export default MuxPlayerLazyPage;