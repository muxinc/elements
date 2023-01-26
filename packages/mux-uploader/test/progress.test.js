import { server } from './utils/server';

import { fixture, assert, oneEvent, aTimeout } from '@open-wc/testing';
import '../src/index.ts';

describe('<mux-uploader>', () => {
  it('initiates as expected', async function () {
    const uploader = await fixture(`<mux-uploader
      endpoint="https://my-authenticated-url/storage?your-url-params"
      status
    ></mux-uploader>`);

    const indicator = uploader.shadowRoot.querySelector('mux-uploader-progress:not([type="percentage"])');
    assert.equal(indicator.getAttribute('type'), 'bar', 'default progress type is reflected');
  });

  it('updates percentage progress', async function () {
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

    const percentage = uploader.shadowRoot.querySelector('mux-uploader-progress[type="percentage"]');

    setTimeout(() => {
      uploader.dispatchEvent(
        new CustomEvent('file-ready', {
          composed: true,
          bubbles: true,
          detail: file,
        })
      );
    });

    await aTimeout(100);
    server.respond();
    await oneEvent(uploader, 'success');
    assert.equal(percentage.uploadPercentage.innerHTML, '100%', 'percentage matches');
  });
});
