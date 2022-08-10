import Link from "next/link";
import MuxUploader, { MuxUploaderDrop } from '@mux/mux-uploader-react';
import { useState, ChangeEvent } from "react";


const onUploadStart = console.log.bind(null, 'uploadStart');
const onChunkAttempt = console.log.bind(null, "chunkAttempt");
const onChunkSuccess = console.log.bind(null, "chunkSuccess");
const onProgress = console.log.bind(null, "progress");
const onSuccess = console.log.bind(null, "success");

const onUploadError = ({ detail }) => {
  console.log(detail.message);
}

function MuxUploaderPage() {
  const [url, setUrl] = useState("");

  const handleChange = (event: ChangeEvent) => {
    const target = event.target as HTMLInputElement;
    setUrl(target.value);
  }

  return (
    <MuxUploaderDrop mux-uploader="uploader" overlay overlayText="You're doing great!">
      <h1>MuxUploader with MuxUploaderDrop Demo</h1>
      <h2>Enter your upload GCS url:</h2>
      <input type="text" style={{ padding: "8px 12px", marginBottom: "20px", width: "400px" }} placeholder="https://storage.googleapis.com/..." onChange={handleChange} />
     
      <div style={{ flexGrow: 1, flexShrink: 1, height: "400px" }}>
          <MuxUploader
            id="uploader"
            endpoint={url}
            // Uncomment for example of custom progress formatting.
            // formatProgress={(percent: number) => `${percent} percent uploaded`}
            type="bar"
            status
            onUploadStart={onUploadStart}
            onChunkAttempt={onChunkAttempt}
            onChunkSuccess={onChunkSuccess}
            onSuccess={onSuccess}
            onUploadError={onUploadError}
            onProgress={onProgress}
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
