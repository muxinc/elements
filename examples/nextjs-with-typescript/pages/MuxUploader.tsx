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
    <MuxUploaderDrop style={{ display: "flex", flexFlow: "column", height: "100vh", width: "100vw",backgroundColor: "pink" }} mux-uploader="uploader">
      <h1>MuxUploader with MuxUploaderDrop Demo</h1>
      <h2>Enter your upload GCS url:</h2>
      <input type="text" style={{ padding: "8px 12px", marginBottom: "20px", width: "400px" }} placeholder="https://storage.googleapis.com/..." onChange={handleChange} />
     
      <div style={{ flexGrow: 1, flexShrink: 1, height: "400px" }}>
          <MuxUploader
            id="uploader"
            url={url}
            type="bar"
            status
          />
      </div>
      <h3 className="title">
        <Link href="/">
          <a>Browse Elements</a>
        </Link>
      </h3>
    </MuxUploaderDrop>
  );
}

export default MuxUploaderPage;
