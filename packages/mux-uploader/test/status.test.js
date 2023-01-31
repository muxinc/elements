import { server } from './utils/server';

import { fixture, assert, oneEvent, aTimeout } from '@open-wc/testing';
import '../src/index.ts';

describe('<mux-uploader-status>', () => {
  let file = new File(['foo'], 'foo.mp4', {
    type: 'video/mp4',
  });

  it('updates with success message on success', async function () {
    server.respondWith('PUT', 'https://mock-upload-endpoint.com', [
      200,
      { 'Content-Type': 'application/json' },
      '{success: true}',
    ]);

    const uploader = await fixture(`<mux-uploader
      endpoint="https://mock-upload-endpoint.com"
    ></mux-uploader>`);

    const status = uploader.shadowRoot.querySelector('mux-uploader-status');

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
    assert.equal(status.statusMessage.innerHTML, 'Upload complete!', 'status message matches');
  });

  it('show an error when not provided an endpoint', async function () {
    const uploader = await fixture(`<mux-uploader></mux-uploader>`);
    const status = uploader.shadowRoot.querySelector('mux-uploader-status');

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
    assert.equal(status.statusMessage.innerHTML, detail.message, 'status message matches');
  });

  it('clears an error on retry click', async function () {
    const uploader = await fixture(`<mux-uploader></mux-uploader>`);
    const status = uploader.shadowRoot.querySelector('mux-uploader-status');

    setTimeout(() => {
      uploader.dispatchEvent(
        new CustomEvent('file-ready', {
          composed: true,
          bubbles: true,
          detail: file,
        })
      );
    });

    await oneEvent(uploader, 'uploaderror');

    const listener = oneEvent(uploader, 'reset');
    uploader.retryButton.click();
    const e = await listener;
    assert.equal(status.statusMessage.innerHTML, '', 'status message cleared');
  });
});
