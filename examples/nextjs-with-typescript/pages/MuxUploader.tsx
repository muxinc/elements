import Head from 'next/head';
import MuxUploader from '@mux/mux-uploader-react';
import { useState } from "react";
import { BooleanRenderer, URLRenderer } from "../components/renderers";

const onUploadStart = console.log.bind(null, 'uploadStart');
const onChunkAttempt = console.log.bind(null, "chunkAttempt");
const onChunkSuccess = console.log.bind(null, "chunkSuccess");
const onProgress = console.log.bind(null, "progress");
const onSuccess = console.log.bind(null, "success");

const onUploadError = ({ detail }) => {
  console.log(detail.message);
}

function MuxUploaderPage() {
  const [endpoint, setEndpoint] = useState<string>();
  const [pausable, setPausable] = useState(false);
  const [dynamicChunkSize, setDynamicChunkSize] = useState(false);
  const [useLargeFileWorkaround, setUseLargeFileWorkaround] = useState(false);

  return (
    <>
      <Head>
        <title>&lt;MuxUploader/&gt; Demo</title>
      </Head>

      <MuxUploader
        id="uploader"
        pausable={pausable}
        dynamicChunkSize={dynamicChunkSize}
        useLargeFileWorkaround={useLargeFileWorkaround}
        endpoint={endpoint}
        onUploadStart={onUploadStart}
        onChunkAttempt={onChunkAttempt}
        onChunkSuccess={onChunkSuccess}
        onSuccess={onSuccess}
        onUploadError={onUploadError}
        onProgress={onProgress}
      />
      <div className="options" style={{ marginTop: '20px' }}>
        <URLRenderer
            value={endpoint}
            name="endpoint"
            label="Enter your upload GCS url (required)"
            onChange={({ endpoint }) => {
              setEndpoint(endpoint)
            }}
            placeholder="https://storage.googleapis.com/..."
          />
        <BooleanRenderer
          value={pausable}
          name="pausable"
          onChange={({ pausable }) => {
            setPausable(pausable)
          }}
        />
        <BooleanRenderer
          value={dynamicChunkSize}
          name="dynamicChunkSize"
          onChange={({ dynamicChunkSize }) => {
            setDynamicChunkSize(dynamicChunkSize)
          }}
        />
        <BooleanRenderer
          value={useLargeFileWorkaround}
          name="useLargeFileWorkaround"
          onChange={({ useLargeFileWorkaround }) => {
            setUseLargeFileWorkaround(useLargeFileWorkaround)
          }}
        />
      </div>
    </>
  );
}

export default MuxUploaderPage;
