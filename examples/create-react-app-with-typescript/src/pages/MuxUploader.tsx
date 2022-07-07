import { useState, ChangeEvent } from 'react';
import { Link } from "react-router-dom";
import MuxUploader from "@mux/mux-uploader-react";

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
        height: "100%",
        width: "100%",
      }}
    >
      <h1>MuxUploader Demo</h1>
      <h2>Enter your upload GCS url:</h2>
      <input type="text" style={{ padding: "8px 12px", marginBottom: "20px", width: "400px" }} placeholder="https://storage.googleapis.com/..." onChange={handleChange} />
     
      <div style={{ flexGrow: 1, flexShrink: 1, height: "400px" }}>
        <MuxUploader
          url={url}
          type="bar"
          status
        />
      </div>
      <h3 className="title">
        <Link to="/">Browse Elements</Link>
      </h3>
    </div>
  );
}

export default MuxUploaderPage;
