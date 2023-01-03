import { fixture, assert, expect, oneEvent, aTimeout } from '@open-wc/testing';
import '../src/index.ts';
import sinon from 'sinon';

describe('<mux-uploader>', () => {
  let server;
  beforeEach(function () {
    server = sinon.fakeServer.create();
  });

  afterEach(function () {
    server.restore();
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

  it('completes a mock upload', async function () {
    server.respondWith('PUT', 'https://mock-upload-endpoint.com', [
      200,
      { 'Content-Type': 'application/json' },
      '{success: true}',
    ]);

    const uploader = await fixture(`<mux-uploader
      endpoint="/mock-upload-endpoint"
      status
    ></mux-uploader>`);

    const file = new File(['foo'], 'foo.mp4', {
      type: 'video/mp4',
    });

    uploader.dispatchEvent(
      new CustomEvent('file-ready', {
        composed: true,
        bubbles: true,
        detail: file,
      })
    );

    const { detail } = await oneEvent(uploader, 'uploadstart');
    await oneEvent(uploader, 'attempt');
    await aTimeout(1000);
    server.respond();
    expect(server.requests.length).to.eq(1);
  });
});
