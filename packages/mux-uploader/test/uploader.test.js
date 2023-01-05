import { fixture, assert, oneEvent } from '@open-wc/testing';
import '../src/index.ts';

describe('<mux-uploader>', () => {
  let file = new File(['foo'], 'foo.mp4', {
    type: 'video/mp4',
  });

  it('initiates as expected', async function () {
    const uploader = await fixture(`<mux-uploader
      endpoint="https://my-authenticated-url/storage?your-url-params"
      status
    ></mux-uploader>`);

    assert.equal(uploader.getAttribute('type'), 'bar', 'default progress type is reflected');
    assert.equal(
      uploader.getAttribute('endpoint'),
      'https://my-authenticated-url/storage?your-url-params',
      'endpoint matches'
    );
    assert.equal(uploader.getAttribute('status'), '', 'status matches');
  });

  it('does not init without endpoint', async function () {
    const uploader = await fixture(`<mux-uploader
      status
    ></mux-uploader>`);

    setTimeout(() => {
      uploader.dispatchEvent(
        new CustomEvent('file-ready', {
          composed: true,
          bubbles: true,
          detail: file,
        })
      );
    });

    const { detail } = await oneEvent(uploader, 'uploaderror');

    assert.equal(detail.message, 'No url or endpoint specified -- cannot handleUpload', 'error message matches');
    assert.exists(uploader.getAttribute('upload-error'), 'upload error is true');
  });

  it('completes a mock upload', async function () {
    // Endpoint is a mock endpoint that returns a 200 response
    // it is defined in the web-test-runner.config.mjs file as a middleware
    const uploader = await fixture(`<mux-uploader
      endpoint="/mock-upload-endpoint"
      status
    ></mux-uploader>`);

    setTimeout(() => {
      uploader.dispatchEvent(
        new CustomEvent('file-ready', {
          composed: true,
          bubbles: true,
          detail: file,
        })
      );
    });

    const { detail } = await oneEvent(uploader, 'uploadstart');
    assert.equal(detail.chunkSize, 30720, 'chunk size matches');
    assert.equal(detail.file, file, 'file matches');
    assert.exists(uploader.getAttribute('upload-in-progress'), 'upload in progress is true');

    await oneEvent(uploader, 'success');
    assert.equal(uploader.statusMessage.innerHTML, 'Upload complete!', 'status message matches');
  });
});
