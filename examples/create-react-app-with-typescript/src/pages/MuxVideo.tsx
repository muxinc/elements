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
        playbackId="a4nOgmxGWg6gULfcBbAa00gXyfcwPnAFldF8RdsNyk8M"
        preload="auto"
        startTime={4.6}
        metadata={{
          video_id: "video-id-12345",
          video_title: "Star Wars: Episode 3",
          viewer_user_id: "user-id-6789",
        }}
        streamType="on-demand"
        controls
        muted
      />

      <Link to="/">Browse Elements</Link>
    </>
  );
}

export default MuxVideoPage;
