import Head from 'next/head';
import MuxUploader, { ProgressTypes } from '@mux/mux-uploader-react';
import type { MuxUploaderProps } from '@mux/mux-uploader-react';
import { BooleanRenderer, EnumRenderer, NumberRenderer, URLRenderer } from '../components/renderers';
import ComponentCodeRenderer from '../components/ComponentCodeRenderer';
import URLPathRenderer from '../components/URLPathRenderer';
import { getLocationServerSideProps, usePageStateReducer } from '../app/page-state';
import type { LocationProps } from '../app/page-state';

const onUploadStart = console.log.bind(null, 'uploadStart');
const onChunkAttempt = console.log.bind(null, 'chunkAttempt');
const onChunkSuccess = console.log.bind(null, 'chunkSuccess');
const onProgress = console.log.bind(null, 'progress');
const onSuccess = console.log.bind(null, 'success');

const ProgressTypesList = Object.values(ProgressTypes);

const onUploadError = ({ detail }) => {
  console.log(detail.message);
};

export const getServerSideProps = getLocationServerSideProps;

type Props = LocationProps;

function MuxUploaderPage({ location }: Props) {
  const [state, _dispatch, genericOnChange] = usePageStateReducer<MuxUploaderProps>();

  return (
    <>
      <Head>
        <title>&lt;MuxUploader/&gt; Demo</title>
      </Head>
      <main className="component-page">
        <MuxUploader
          id="uploader"
          endpoint={state.endpoint}
          noDrop={state.noDrop}
          noProgress={state.noProgress}
          noStatus={state.noStatus}
          noRetry={state.noRetry}
          pausable={state.pausable}
          type={state.type}
          dynamicChunkSize={state.dynamicChunkSize}
          useLargeFileWorkaround={state.useLargeFileWorkaround}
          maxFileSize={state.maxFileSize}
          onUploadStart={onUploadStart}
          onChunkAttempt={onChunkAttempt}
          onChunkSuccess={onChunkSuccess}
          onSuccess={onSuccess}
          onUploadError={onUploadError}
          onProgress={onProgress}
        />
        <div className="options" style={{ marginTop: '20px' }}>
          <ComponentCodeRenderer state={state} component="MuxUploader" />
          <URLPathRenderer state={state} location={typeof window !== 'undefined' ? window.location : location} />
          <URLRenderer
            value={state.endpoint as string}
            name="endpoint"
            label="Enter your upload GCS url (required)"
            onChange={genericOnChange}
            placeholder="https://storage.googleapis.com/..."
          />
          <BooleanRenderer value={state.noDrop} name="noDrop" onChange={genericOnChange} />
          <BooleanRenderer value={state.noProgress} name="noProgress" onChange={genericOnChange} />
          <BooleanRenderer value={state.noStatus} name="noStatus" onChange={genericOnChange} />
          <BooleanRenderer value={state.noRetry} name="noRetry" onChange={genericOnChange} />
          <BooleanRenderer value={state.pausable} name="pausable" onChange={genericOnChange} />
          <EnumRenderer value={state.type} values={ProgressTypesList} name="type" onChange={genericOnChange} />
          <BooleanRenderer value={state.dynamicChunkSize} name="dynamicChunkSize" onChange={genericOnChange} />
          <BooleanRenderer
            value={state.useLargeFileWorkaround}
            name="useLargeFileWorkaround"
            onChange={genericOnChange}
          />
          <NumberRenderer value={state.maxFileSize} min={0} name="maxFileSize" onChange={genericOnChange} />
          <NumberRenderer value={state.chunkSize} min={256} step={256} name="chunkSize" onChange={genericOnChange} />
        </div>
      </main>
    </>
  );
}

export default MuxUploaderPage;
