import Link from "next/link";
import MuxUploader, { MuxUploaderDrop } from '@mux/mux-uploader-react';
import { useState, ChangeEvent } from "react";

function MuxUploaderPage() {
  const [url, setUrl] = useState("");

  const handleChange = (event: ChangeEvent) => {
    const target = event.target as HTMLInputElement;
    setUrl(target.value);
  }

  return (
    <div
      style={{
        display: "flex",
        flexFlow: "column",
        height: "100vh",
        width: "100vw",
      }}
    >
      <h1>MuxUploader with MuxUploaderDrop Demo</h1>
      <h2>Enter your upload GCS url:</h2>
      <input type="text" style={{ padding: "8px 12px", marginBottom: "20px", width: "400px" }} placeholder="https://storage.googleapis.com/..." onChange={handleChange} />
     
      <div style={{ flexGrow: 1, flexShrink: 1, height: "400px" }}>
        <MuxUploader
          url={url}
          type="bar"
          disableDrop
          status
        >
          /** @todo Re-implement after refactor. */
          {/* <MuxUploaderDrop slot="dropzone" text="Upload to the interwebs" fullscreen overlay /> */}
        </MuxUploader>
      </div>
      <h3 className="title">
        <Link href="/">
          <a>Browse Elements</a>
        </Link>
      </h3>
    </div>
  );
}

export default MuxUploaderPage;
