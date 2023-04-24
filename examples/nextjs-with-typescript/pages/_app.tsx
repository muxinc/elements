import '../styles.css'
import Head from 'next/head';
import Link from "next/link";

// This default export is required in a new `pages/_app.js` file.
export default function MyApp({ Component, pageProps }) {
  return <>
    <Head>
      <title>Mux Elements</title>
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/water.css@2/out/water.css" />
    </Head>
    <header>
      <div className="left-header">
        <a className="mux-logo" href="https://www.mux.com/player" target="_blank" rel="noreferrer">
          <picture>
            <source media="(prefers-color-scheme: dark)" srcSet="https://user-images.githubusercontent.com/360826/233653989-11cd8603-c20f-4008-8bf7-dc15b743c52b.svg" />
            <source media="(prefers-color-scheme: light)" srcSet="https://user-images.githubusercontent.com/360826/233653583-50dda726-cbe7-4182-a113-059a91ae83e6.svg" />
            <img alt="Mux Logo" src="https://user-images.githubusercontent.com/360826/233653583-50dda726-cbe7-4182-a113-059a91ae83e6.svg" />
          </picture>
        </a>
        <h1><Link href="/">Elements</Link></h1>
      </div>
      <div className="right-header">
        <a className="github-logo" href="https://github.com/muxinc/elements" target="_blank" rel="noreferrer">
          <img width="32" height="32" src="./images/github-logo.svg" alt="Github logo" />
        </a>
      </div>
    </header>
    <Component {...pageProps} />
  </>
}
