import Link from "next/link";
import Head from 'next/head';
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
    <>
      <Head>
        <title>&lt;MuxUploader/&gt; Demo</title>
      </Head>
      <MuxUploaderDrop mux-uploader="uploader" overlay overlayText="You're doing great!">
        <h2>Enter your upload GCS url:</h2>

        <input type="text" style={{
          marginBottom: "20px",
          width: "min(100%, 400px)",
          boxSizing: "border-box"
        }} placeholder="https://storage.googleapis.com/..." onChange={handleChange} />

        <MuxUploader
          style={{ display: "block", height: "200px" }}
          id="uploader"
          endpoint={url}
          type="bar"
          onUploadStart={onUploadStart}
          onChunkAttempt={onChunkAttempt}
          onChunkSuccess={onChunkSuccess}
          onSuccess={onSuccess}
          onUploadError={onUploadError}
          onProgress={onProgress}
        />
      </MuxUploaderDrop>

      <Link href="/"><a>Browse Elements</a></Link>
    </>
  );
}

export default MuxUploaderPage;
