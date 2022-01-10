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
      </ul>
    </div>
  );
}

export default HomePage;
