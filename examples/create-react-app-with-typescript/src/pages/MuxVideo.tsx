import { Link } from "react-router-dom";
import MuxVideo from "@mux/mux-video-react";

function MuxVideoPage() {
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
          style={{ height: "100%", maxWidth: "100%" }}
          playbackId="DS00Spx1CV902MCtPj5WknGlR102V5HFkDe"
          // metadata={{
          //   video_id: "video-id-12345",
          //   video_title: "Mad Max: Fury Road Trailer",
          //   viewer_user_id: "user-id-6789",
          // }}
          // envKey="mux-data-env-key"
          streamType="on-demand"
          controls
          autoPlay
          muted
        />
      </div>
      <h3 className="title">
        <Link to="/">Browse Elements</Link>
      </h3>
    </div>
  );
}

export default MuxVideoPage;
