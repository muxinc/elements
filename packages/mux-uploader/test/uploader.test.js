import { fixture, assert, aTimeout } from '@open-wc/testing';
import '../src/index.ts';

describe('<mux-uploader>', () => {
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
});
