import { fixture, assert } from '@open-wc/testing';
import '../src/index.ts';

describe('<mux-uploader>', () => {
  it('initiates as expected', async function () {
    const uploader = await fixture(`<mux-uploader
      endpoint="https://my-authenticated-url/storage?your-url-params"
      status
    ></mux-uploader>`);

    const indicator = uploader.shadowRoot.querySelector('mux-uploader-progress-indicator');
    assert.equal(indicator.getAttribute('type'), 'bar', 'default progress type is reflected');
  });
});
