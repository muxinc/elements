import Link from "next/link";
import { useRef, useState } from "react";

const INITIAL_AUTOPLAY = false;
const INITIAL_MUTED = true;

function VideoVanillaPage() {
  const mediaElRef = useRef(null);
  // const trackElRef = useRef(null);
  const [autoplay, setAutoplay] = useState<"muted" | boolean>(INITIAL_AUTOPLAY);
  const [muted, setMuted] = useState(INITIAL_MUTED);
  const [paused, setPaused] = useState<boolean | undefined>(true);

  return (
    <div
      style={{
        display: "flex",
        flexFlow: "column",
        height: "100vh",
        width: "100vw",
      }}
    >
      <h1>MuxVideo Demo</h1>
      <div style={{ flexGrow: 1, flexShrink: 1, height: "400px" }}>
        <video
          ref={mediaElRef}
          style={{ height: "100%", maxWidth: "100%" }}
          src="https://stream.mux.com/qP5Eb2cj7MrNnoxBGz012pbZkMHqpIcrKMzd7ykGr01gM/low.mp4"
          crossOrigin=""
          controls
          muted={muted}
        >
        <track
          ref={(trackEl) => {
            const track = trackEl?.track as TextTrack;
            if (!track) return;
            track.addEventListener('cuechange', () => {
              console.log(
                'activeCues',
                ...Array.prototype.slice.call(track.activeCues)
              );
            })
          }}
          default
          id="main-track"
          label="English"
          kind="captions"
          srcLang="en"
          src="/tears_of_steal.vtt"
        />
          </video>
      </div>
      <div>
        <div>
          <label htmlFor="paused-control">Paused</label>
          <input
            id="paused-control"
            type="checkbox"
            onChange={() => setPaused(!paused)}
            checked={paused}
          />
        </div>
        <div>
          <label htmlFor="autoplay-control">Muted Autoplay</label>
          <input
            id="autoplay-control"
            type="checkbox"
            onChange={() => setAutoplay(!autoplay ? "muted" : false)}
            checked={!!autoplay}
          />
        </div>
        <div>
          <label htmlFor="muted-control">Muted</label>
          <input
            id="muted-control"
            type="checkbox"
            onChange={() => setMuted(!muted)}
            checked={muted}
          />
        </div>
      </div>
      <h3 className="title">
        <Link href="/">
          <a>Browse Elements</a>
        </Link>
      </h3>
    </div>
  );
}

export default VideoVanillaPage;
