import Link from "next/link";
import { useRef, useState } from "react";
import MuxVideo from "@mux-elements/mux-video-react";
import mediaAssetsJSON from "@mux-elements/assets/media-assets.json";

const INITIAL_AUTOPLAY = false;
const INITIAL_MUTED = false;

function MuxVideoPage() {
  const mediaElRef = useRef(null);
  const [autoplay, setAutoplay] = useState<"muted" | boolean>(INITIAL_AUTOPLAY);
  const [mediaAssets, _setMediaAssets] = useState(mediaAssetsJSON);
  const [selectedAsset, setSelectedAsset] = useState(mediaAssets.find(({ description}) => description.toLowerCase().includes('subtitles')) ?? mediaAssets[0]);
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
        <MuxVideo
          ref={mediaElRef}
          style={{ height: "100%", maxWidth: "100%" }}
          playbackId={selectedAsset["playback-id"]}
          // metadata={{
          //   video_id: "video-id-12345",
          //   video_title: "Mad Max: Fury Road Trailer",
          //   viewer_user_id: "user-id-6789",
          // }}
          // envKey="mux-data-env-key"
          streamType={
            selectedAsset["stream-type"] as "live" | "ll-live" | "on-demand"
          }
          controls
          autoPlay={autoplay}
          muted={muted}
          onPlay={() => {
            setPaused(false);
          }}
          onPause={() => {
            setPaused(true);
          }}
        />
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

export default MuxVideoPage;
