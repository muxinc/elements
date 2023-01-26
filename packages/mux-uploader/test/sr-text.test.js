import { server } from './utils/server';

import { fixture, assert, oneEvent, aTimeout } from '@open-wc/testing';
import '../src/index.ts';

describe('<mux-uploader-sr-text>', () => {
  it('updates with success message on success', async function () {
    let file = new File(['foo'], 'foo.mp4', {
      type: 'video/mp4',
    });

    server.respondWith('PUT', 'https://mock-upload-endpoint.com', [
      200,
      { 'Content-Type': 'application/json' },
      '{success: true}',
    ]);

    const uploader = await fixture(`<mux-uploader
      endpoint="https://mock-upload-endpoint.com"
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

    await aTimeout(500);
    server.respond();
    await oneEvent(uploader, 'success');
    assert.equal(sr.srOnlyText.innerHTML, 'Upload complete!', 'status message matches');
  });
});
