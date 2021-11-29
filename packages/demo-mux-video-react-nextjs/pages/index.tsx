import MuxVideo from "@mux-elements/mux-video-react";

function HomePage() {
  return (
    <div>
      <MuxVideo
        style={{ width: "100%", height: "100%" }}
        playbackId="DS00Spx1CV902MCtPj5WknGlR102V5HFkDe"
        // metadataVideoId="video-id-12345"
        // metadataVideoTitle="Star Wars: Episode 3"
        // metadataViewerUserId="user-id-6789"
        // envKey="mux-data-env-key"
        streamType="on-demand"
        controls
        autoPlay
        muted
      />
    </div>
  );
}

export default HomePage;
