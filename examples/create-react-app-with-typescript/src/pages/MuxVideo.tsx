import { Link } from "react-router-dom";
import MuxVideo from "@mux-elements/mux-video-react";
import { useRef, useState } from "react";

const INITIAL_AUTOPLAY = false;
const INITIAL_MUTED = false;

function MuxVideoPage() {
  const mediaElRef = useRef(null);
  const [playbackId, _setPlaybackId] = useState("qP5Eb2cj7MrNnoxBGz012pbZkMHqpIcrKMzd7ykGr01gM")
  const [autoplay, setAutoplay] = useState<"muted" | boolean>(INITIAL_AUTOPLAY);
  const [muted, setMuted] = useState(INITIAL_MUTED);
  const [paused, setPaused] = useState<boolean | undefined>(true);
  return (
    <div
      style={{
        display: "flex",
        flexFlow: "column",
        height: "100%",
        width: "100%",
      }}
    >
      <h1>MuxVideo Demo</h1>
      <div style={{ flexGrow: 1, flexShrink: 1, height: "400px" }}>
        <MuxVideo
          ref={mediaElRef}
          style={{ height: "100%", maxWidth: "100%" }}
          playbackId={playbackId}
          crossOrigin=""
          // src={toMuxVideoURL("qP5Eb2cj7MrNnoxBGz012pbZkMHqpIcrKMzd7ykGr01gM")}
          // metadata={{
          //   video_id: "video-id-12345",
          //   video_title: "Mad Max: Fury Road Trailer",
          //   viewer_user_id: "user-id-6789",
          // }}
          // envKey="mux-data-env-key"
          controls
          // autoPlay={autoplay}
          muted={muted}
          onPlay={() => {
            setPaused(false);
          }}
          onPause={() => {
            setPaused(true);
          }}
        />
      </div>
      <h3 className="title">
        <Link to="/">Browse Elements</Link>
      </h3>
    </div>
  );
}

export default MuxVideoPage;
