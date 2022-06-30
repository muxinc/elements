import Link from "next/link";

function HomePage() {
  return (
    <div>
      <h1>Browse Mux Elements</h1>
      <ul>
        <li>
          <h3>
            <Link href="/MuxVideo">
              <a>Mux Video Demo</a>
            </Link>
          </h3>
        </li>
        <li>
          <h3>
            <Link href="/MuxAudio">
              <a>Mux Audio Demo</a>
            </Link>
          </h3>
        </li>
        <li>
          <h3>
            <Link href="/MuxPlayer">
              <a>Mux Player Demo</a>
            </Link>
          </h3>
        </li>
        <li>
          <h3>
            <Link href="/MuxPlayerDynamic">
              <a>Mux Player Demo (Dynamically Loaded)</a>
            </Link>
          </h3>
        </li>
        <li>
          <h3>
            <Link href="/MuxUploader">
              <a>Mux Uploader with Mux Uploader Drop Demo</a>
            </Link>
          </h3>
        </li>
        <li>
          <h3>
            <Link href="/mux-video">Mux Video (Web Component) Demo</Link>
          </h3>
        </li>
        <li>
          <h3>
            <Link href="/mux-player">Mux Player (Web Component) Demo</Link>
          </h3>
        </li>
      </ul>
    </div>
  );
}

export default HomePage;
