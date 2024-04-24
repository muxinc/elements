import Link from 'next/link';
import DefaultHeader from '../components/default-header';
import '../styles.css'
import Head from 'next/head';
import { useRouter } from 'next/router';

// This default export is required in a new `pages/_app.js` file.
export default function MyApp({ Component, pageProps }) {
  const {
    hideDefaultLayout
  } = pageProps;
  const router = useRouter();
  const isHome = router.pathname === '/';

  return <>
    <Head>
      <title>Mux Elements</title>
    </Head>
    {!hideDefaultLayout && <DefaultHeader/>}
    <Component {...pageProps} />
    {!isHome && !hideDefaultLayout && <>
      <br/>
      <Link href="/">← Browse Elements</Link>
    </>}
  </>
}
