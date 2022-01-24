import Link from "next/link";
import MuxPlayer from "@mux-elements/mux-player-react";
import { StreamTypes } from "@mux-elements/mux-player-react";
import { useRef } from "react";

function MuxPlayerPage() {
  const mediaElRef = useRef<HTMLVideoElement>(null);

  return (
    <div
      style={{
        display: "flex",
        flexFlow: "column",
        height: "100vh",
        width: "100vw",
      }}
    >
      <h1>MuxPlayer Demo</h1>
      <div style={{ flexGrow: 1, flexShrink: 1, height: "400px" }}>
        <MuxPlayer
          ref={mediaElRef}
          playbackId="ddBx5002F02xe7ftFvTFkYBxEdQ2inQ2o029CMqu9A4IcY"
          // debug
          muted
          // autoPlay
          // streamType={StreamTypes.LIVE}
          // primaryColor="#ec407a"
          // secondaryColor="#64b5f6"
          // tertiaryColor="#b4004e"
          // startTime={12}
        >
          <track
            label="English"
            kind="captions"
            srcLang="en"
            src="/vtt/ddBx5002F02xe7ftFvTFkYBxEdQ2inQ2o029CMqu9A4IcY/en-cc-mashup.vtt"
          ></track>
        </MuxPlayer>
      </div>
      <h3 className="title">
        <Link href="/">
          <a>Browse Elements</a>
        </Link>
      </h3>
    </div>
  );
}

export default MuxPlayerPage;
