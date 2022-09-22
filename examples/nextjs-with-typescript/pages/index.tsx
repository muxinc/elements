import Link from "next/link";

function HomePage() {
  return (
    <nav>
      <ul>
        <li><Link href="/MuxVideo"><a className="video">&lt;MuxVideo&gt;</a></Link></li>
        <li><Link href="/MuxAudio"><a className="audio">&lt;MuxAudio&gt;</a></Link></li>
        <li><Link href="/MuxPlayer"><a className="player">&lt;MuxPlayer&gt;</a></Link></li>
        <li><Link href="/MuxPlayerDynamic"><a className="player">&lt;MuxPlayer&gt; (dynamic)</a></Link></li>
        <li><Link href="/MuxPlayerIframe"><a className="player">&lt;MuxPlayer&gt; (w/o fullscreen)</a></Link></li>
        <li><Link href="/MuxUploader"><a className="uploader">&lt;MuxUploader&gt;</a></Link></li>
        <li><Link href="/mux-video"><a className="video">&lt;mux-video&gt; (Web Component)</a></Link></li>
        <li><Link href="/mux-audio"><a className="audio">&lt;mux-audio&gt; (Web Component)</a></Link></li>
        <li><Link href="/mux-player"><a className="player">&lt;mux-player&gt; (Web Component)</a></Link></li>
      </ul>
    </nav>
  );
}

export default HomePage;
