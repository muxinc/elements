import { Link } from "react-router-dom";
import MuxVideo from "@mux/mux-video-react";

function MuxVideoPage() {
  return (
    <>
      <style>
        {`video {
          display: block;
          width: 100%;
          aspect-ratio: 16 / 9;
          margin: 1rem 0 2rem;
        }`}
      </style>

      <MuxVideo
        playbackId="23s11nz72DsoN657h4314PjKKjsF2JG33eBQQt6B95I"
        metadata={{
          video_id: "video-id-12345",
          video_title: "Star Wars: Episode 3",
          viewer_user_id: "user-id-6789",
        }}
        controls
        muted
      />

      <Link to="/">Browse Elements</Link>
    </>
  );
}

export default MuxVideoPage;
