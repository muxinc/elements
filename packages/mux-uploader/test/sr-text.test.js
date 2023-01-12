import { fixture, assert, oneEvent } from '@open-wc/testing';
import '../src/index.ts';

describe('<mux-uploader-sr-text>', () => {
  it('updates with success message on success', async function () {
    let file = new File(['foo'], 'foo.mp4', {
      type: 'video/mp4',
    });

    // Endpoint is a mock endpoint that returns a 200 response
    // it is defined in the web-test-runner.config.mjs file as a middleware
    const uploader = await fixture(`<mux-uploader
      endpoint="/mock-upload-endpoint"
      status
    ></mux-uploader>`);

    const sr = uploader.shadowRoot.querySelector('mux-uploader-sr-text');

    setTimeout(() => {
      uploader.dispatchEvent(
        new CustomEvent('file-ready', {
          composed: true,
          bubbles: true,
          detail: file,
        })
      );
    });

    await oneEvent(uploader, 'success');
    assert.equal(sr.srOnlyText.innerHTML, 'Upload complete!', 'status message matches');
  });
});
