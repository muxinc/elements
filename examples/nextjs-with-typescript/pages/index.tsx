import Link from "next/link";

function HomePage() {
  return (
    <nav>
      <ul>
        <li><Link legacyBehavior href="/MuxVideo"><a className="video">&lt;MuxVideo&gt;</a></Link></li>
        <li><Link legacyBehavior href="/MuxAudio"><a className="audio">&lt;MuxAudio&gt;</a></Link></li>
        <li><Link legacyBehavior href="/MuxPlayer"><a className="player">&lt;MuxPlayer&gt;</a></Link></li>
        <li><Link legacyBehavior href="/MuxPlayerPosterSlot"><a className="player">&lt;MuxPlayer&gt;<br/>(poster slot)</a></Link></li>
        <li><Link legacyBehavior href="/MuxPlayerTheme"><a className="player">&lt;MuxPlayer&gt;<br/>(theme)</a></Link></li>
        <li><Link legacyBehavior href="/MuxPlayerCuePoints"><a className="player">&lt;MuxPlayer&gt;<br/>(CuePoints)</a></Link></li>
        <li><Link legacyBehavior href="/MuxPlayerCuePointsMeditate"><a className="player">&lt;MuxPlayer&gt;<br/>(CuePoints + Audio Only)</a></Link></li>
        <li><Link legacyBehavior href="/MuxPlayerChapters"><a className="player">&lt;MuxPlayer&gt;<br/>(Chapters)</a></Link></li>
        <li><Link legacyBehavior href="/MuxPlayerLazy"><a className="player">&lt;MuxPlayer&gt;<br/>(lazy)</a></Link></li>
        <li><Link legacyBehavior href="/MuxPlayerDynamic"><a className="player">&lt;MuxPlayer&gt;<br/>(Next.js dynamic)</a></Link></li>
        <li><Link legacyBehavior href="/MuxPlayerLazyDynamic"><a className="player">&lt;MuxPlayer&gt;<br/>(lazy + dynamic)</a></Link></li>
        <li><Link legacyBehavior href="/MuxPlayerIframe"><a className="player">&lt;MuxPlayer&gt;<br/>(w/o fullscreen)</a></Link></li>
        <li><Link legacyBehavior href="/MuxPlayerLazyIframe"><a className="player">&lt;MuxPlayer&gt;<br/>(lazy + w/o fullscreen)</a></Link></li>
        <li><Link legacyBehavior href="/MuxPlayerLazyBlurUp"><a className="player">&lt;MuxPlayer&gt;<br/>(lazy + @mux/blurup)</a></Link></li>
        <li><Link legacyBehavior href="/MuxUploader"><a className="uploader">&lt;MuxUploader&gt;</a></Link></li>
        <li><Link legacyBehavior href="/MuxUploaderSeparateComponents"><a className="uploader">&lt;MuxUploader&gt; (Separate Components)</a></Link></li>
        <li><Link legacyBehavior href="/mux-video"><a className="video">&lt;mux-video&gt;<br/>(Web Component)</a></Link></li>
        <li><Link legacyBehavior href="/mux-audio"><a className="audio">&lt;mux-audio&gt;<br/>(Web Component)</a></Link></li>
        <li><Link legacyBehavior href="/mux-player"><a className="player">&lt;mux-player&gt;<br/>(Web Component)</a></Link></li>
        <li><Link legacyBehavior href="/app-router"><a className="react">App Router</a></Link></li>
      </ul>
    </nav>
  );
}

export default HomePage;
