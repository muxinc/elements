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
    <>
      <h2>Enter your upload GCS url:</h2>

      <input type="text" style={{
        marginBottom: "20px",
        width: "min(100%, 400px)",
        boxSizing: "border-box"
      }} placeholder="https://storage.googleapis.com/..." onChange={handleChange} />

      <MuxUploader
        style={{ display: "block", height: "200px" }}
        endpoint={url}
        type="bar"
        status
      />

      <Link to="/">Browse Elements</Link>
    </>
  );
}

export default MuxUploaderPage;
