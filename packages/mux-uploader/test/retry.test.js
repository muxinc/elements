import { fixture, assert, oneEvent, aTimeout } from '@open-wc/testing';
import '../src/index.ts';

describe('<mux-uploader-retry>', () => {
  let file = new File(['foo'], 'foo.mp4', {
    type: 'video/mp4',
  });

  it('fires a reset event on reset btn click', async function () {
    const uploader = await fixture(`<mux-uploader
      endpoint="https://mock-upload-endpoint.com"
    ></mux-uploader>`);

    const retry = uploader.shadowRoot.querySelector('mux-uploader-retry');

    const listener = oneEvent(uploader, 'reset');
    retry.retryButton.click();
    const e = await listener;
    assert.exists(e);
  });

  it('fires a reset event on Enter keypress', async function () {
    const uploader = await fixture(`<mux-uploader
    endpoint="https://mock-upload-endpoint.com"
  ></mux-uploader>`);

    const retry = uploader.shadowRoot.querySelector('mux-uploader-retry');

    const listener = oneEvent(uploader, 'reset');
    retry.retryButton.dispatchEvent(
      new KeyboardEvent('keyup', {
        key: 'Enter',
      })
    );

    const e = await listener;
    assert.exists(e);
  });
});
