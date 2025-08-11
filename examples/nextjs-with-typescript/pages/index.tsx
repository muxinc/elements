import Link from "next/link";

function HomePage() {
  return (
    <nav>
      <ul>
        <li><Link href="/MuxVideo" className="video">&lt;MuxVideo&gt;</Link></li>
        <li><Link href="/MuxAudio"className="audio">&lt;MuxAudio&gt;</Link></li>
        <li><Link href='/MuxPlayer?playbackId="ihZa7qP1zY8oyLSQW9TS602VgwQvNdyIvlk9LInEGU2s"' className="player">&lt;MuxPlayer&gt;</Link></li>
        <li><Link href="/MuxPlayerAds" className="player"><>&lt;MuxPlayer&gt;<br />(ads)</></Link></li>
        <li><Link href="/MuxNewsPlayer" className="player"><>&lt;MuxNewsPlayer&gt;<br />(ads + playlist)</></Link></li>
        <li><Link href='/MuxPlayerError' className="player">&lt;MuxPlayer&gt; (error)</Link></li>
        <li><Link href="/MuxPlayerPosterSlot" className="player"><>&lt;MuxPlayer&gt;<br/>(poster slot)</></Link></li>
        <li><Link href="/MuxPlayerFreeLogo" className="player"><>&lt;MuxPlayer&gt;<br/>(free logo)</></Link></li>
        <li><Link href="/MuxPlayerTheme" className="player"><>&lt;MuxPlayer&gt;<br/>(theme)</></Link></li>
        <li><Link href="/MuxPlayerCuePoints" className="player"><>&lt;MuxPlayer&gt;<br/>(CuePoints)</></Link></li>
        <li><Link href="/MuxPlayerCuePointsMeditate" className="player"><>&lt;MuxPlayer&gt;<br/>(CuePoints + Audio Only)</></Link></li>
        <li><Link href="/MuxPlayerChapters" className="player"><>&lt;MuxPlayer&gt;<br/>(Chapters)</></Link></li>
        <li><Link href="/MuxPlayerLazy" className="player"><>&lt;MuxPlayer&gt;<br/>(lazy)</></Link></li>
        <li><Link href="/MuxPlayerDynamic" className="player"><>&lt;MuxPlayer&gt;<br/>(Next.js dynamic)</></Link></li>
        <li><Link href="/MuxPlayerLazyDynamic" className="player"><>&lt;MuxPlayer&gt;<br/>(lazy + dynamic)</></Link></li>
        <li><Link href="/MuxPlayerIframe" className="player"><>&lt;MuxPlayer&gt;<br/>(w/o fullscreen)</></Link></li>
        <li><Link href="/MuxPlayerLazyIframe" className="player"><>&lt;MuxPlayer&gt;<br/>(lazy + w/o fullscreen)</></Link></li>
        <li><Link href="/MuxPlayerLazyBlurUp" className="player"><>&lt;MuxPlayer&gt;<br/>(lazy + @mux/blurup)</></Link></li>
        <li><Link href="/MuxUploader" className="uploader"><>&lt;MuxUploader&gt;</></Link></li>
        <li><Link href="/MuxUploaderSeparateComponents" className="uploader"><>&lt;MuxUploader&gt; (Separate Components)</></Link></li>
        <li><Link href="/mux-video" className="video"><>&lt;mux-video&gt;<br/>(Web Component)</></Link></li>
        <li><Link href="/mux-audio" className="audio"><>&lt;mux-audio&gt;<br/>(Web Component)</></Link></li>
        <li><Link href="/mux-player" className="player"><>&lt;mux-player&gt;<br/>(Web Component)</></Link></li>
        <li><Link href="/mux-video-react" className="video"><>&lt;MuxVideo&gt;<br/>(React Web Component)</></Link></li>
        <li><Link href="/mux-video-ads-react" className="video"><>&lt;MuxVideo&gt; (ads)<br />(React Web Component)</></Link></li>
        <li><Link href="/app-router" className="react"><>App Router</></Link></li>
      </ul>
    </nav>
  );
}

export default HomePage;
