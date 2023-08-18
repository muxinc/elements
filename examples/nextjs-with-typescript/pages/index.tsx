import Link from "next/link";

function HomePage() {
  return (
    <nav>
      <ul>
        <li><Link href="/MuxVideo"><a className="video">&lt;MuxVideo&gt;</a></Link></li>
        <li><Link href="/MuxAudio"><a className="audio">&lt;MuxAudio&gt;</a></Link></li>
        <li><Link href="/MuxPlayer"><a className="player">&lt;MuxPlayer&gt;</a></Link></li>
        <li><Link href="/MuxPlayerPosterSlot"><a className="player">&lt;MuxPlayer&gt;<br/>(poster slot)</a></Link></li>
        <li><Link href="/MuxPlayerTheme"><a className="player">&lt;MuxPlayer&gt;<br/>(theme)</a></Link></li>
        <li><Link href="/MuxPlayerCuePoints"><a className="player">&lt;MuxPlayer&gt;<br/>(CuePoints)</a></Link></li>
        <li><Link href="/MuxPlayerCuePointsMeditate"><a className="player">&lt;MuxPlayer&gt;<br/>(CuePoints + Audio Only)</a></Link></li>
        <li><Link href="/MuxPlayerLazy"><a className="player">&lt;MuxPlayer&gt;<br/>(lazy)</a></Link></li>
        <li><Link href="/MuxPlayerDynamic"><a className="player">&lt;MuxPlayer&gt;<br/>(Next.js dynamic)</a></Link></li>
        <li><Link href="/MuxPlayerLazyDynamic"><a className="player">&lt;MuxPlayer&gt;<br/>(lazy + dynamic)</a></Link></li>
        <li><Link href="/MuxPlayerIframe"><a className="player">&lt;MuxPlayer&gt;<br/>(w/o fullscreen)</a></Link></li>
        <li><Link href="/MuxPlayerLazyIframe"><a className="player">&lt;MuxPlayer&gt;<br/>(lazy + w/o fullscreen)</a></Link></li>
        <li><Link href="/MuxPlayerLazyBlurhash"><a className="player">&lt;MuxPlayer&gt;<br/>(lazy + @mux/blurhash)</a></Link></li>
        <li><Link href="/MuxUploader"><a className="uploader">&lt;MuxUploader&gt;</a></Link></li>
        <li><Link href="/mux-video"><a className="video">&lt;mux-video&gt;<br/>(Web Component)</a></Link></li>
        <li><Link href="/mux-audio"><a className="audio">&lt;mux-audio&gt;<br/>(Web Component)</a></Link></li>
        <li><Link href="/mux-player"><a className="player">&lt;mux-player&gt;<br/>(Web Component)</a></Link></li>
      </ul>
    </nav>
  );
}

export default HomePage;
