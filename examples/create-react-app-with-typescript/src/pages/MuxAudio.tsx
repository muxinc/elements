import { Link } from "react-router-dom";
import MuxAudio from "@mux/mux-audio-react";

function MuxAudioPage() {
  return (
    <>
      <style>
        {`audio {
          width: 100%;
          margin: 1rem 0 2rem;
        }`}
      </style>

      <MuxAudio
        playbackId="DS00Spx1CV902MCtPj5WknGlR102V5HFkDe"
        controls
        muted
      />

      <Link to="/">Browse Elements</Link>
    </>
  );
}

export default MuxAudioPage;
