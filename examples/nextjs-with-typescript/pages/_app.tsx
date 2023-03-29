import '../styles.css'
import Head from 'next/head';
import Link from "next/link";
import Image from "next/image";

const MuxContent = () => {
  return (<>
    <div className="left-header">
      <a className="mux-logo" href="https://www.mux.com/player" target="_blank" rel="noreferrer">
        <Image width="81" height="26" src="/images/mux-logo@2x.webp" alt="Mux logo" decoding="async" />
      </a>
      <h1><Link href="/">Elements</Link></h1>
    </div>
    <div className="right-header">
      <a className="github-logo" href="https://github.com/muxinc/elements" target="_blank" rel="noreferrer">
        <Image width="32" height="32" src="/images/github-logo.svg" alt="Github logo" />
      </a>
    </div>
  </>);
};

const DefaultHeader = () => {
  return (
    <header>
      <MuxContent/>
    </header>
  );
}

// This default export is required in a new `pages/_app.js` file.
export default function MyApp({ Component, pageProps }) {
  const {
    hideDefaultHeader
  } = pageProps;

  return <>
    <Head>
      <title>Mux Elements</title>
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/water.css@2/out/water.css" />
    </Head>
    {!hideDefaultHeader && <DefaultHeader/>}
    <Component {...pageProps} />
  </>
}
