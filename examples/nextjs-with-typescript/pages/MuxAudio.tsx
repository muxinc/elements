import Link from "next/link";
import { useRef, useState } from "react";
import MuxAudio from "@mux/mux-audio-react";

const INITIAL_AUTOPLAY = false;
const INITIAL_MUTED = false;

function MuxAudioPage() {
  const mediaElRef = useRef(null);
  const [autoplay, setAutoplay] = useState<"muted" | boolean>(INITIAL_AUTOPLAY);
  const [muted, setMuted] = useState(INITIAL_MUTED);

  return (
    <div>
      <h1>MuxAudio Demo</h1>
      <div style={{ flexGrow: 1, flexShrink: 1 }}>
        <MuxAudio
          ref={mediaElRef}
          playbackId="DS00Spx1CV902MCtPj5WknGlR102V5HFkDe"
          // metadata={{
          //   video_id: "video-id-12345",
          //   video_title: "Mad Max: Fury Road Trailer",
          //   viewer_user_id: "user-id-6789",
          // }}
          // envKey="mux-data-env-key"
          streamType="on-demand"
          controls
          autoPlay={autoplay}
          muted={muted}
        />
      </div>
      <div className="options">
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

export default MuxAudioPage;
