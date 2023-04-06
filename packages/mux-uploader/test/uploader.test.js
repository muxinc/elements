import { server } from './utils/server';
import { fixture, assert, oneEvent, aTimeout } from '@open-wc/testing';
import '../src/index.ts';

describe('<mux-uploader>', () => {
  let file = new File(['foo'], 'foo.mp4', {
    type: 'video/mp4',
  });

  it('initiates as expected', async function () {
    const uploader = await fixture(`<mux-uploader
      endpoint="https://my-authenticated-url/storage?your-url-params"
    ></mux-uploader>`);

    const drop = uploader.shadowRoot.querySelector('mux-uploader-drop');

    assert.equal(
      uploader.getAttribute('endpoint'),
      'https://my-authenticated-url/storage?your-url-params',
      'endpoint matches'
    );

    assert.isNotNull(drop, 'mux-uploader-drop is not null');
  });

  it('removes dropzone with nodrop param', async function () {
    const uploader = await fixture(`<mux-uploader nodrop></mux-uploader>`);
    const drop = uploader.shadowRoot.querySelector('mux-uploader-drop');

    assert.isNull(drop, 'mux-uploader-drop is null');
  });

  it('should toggle the nodrop attribute when setting nodrop', async () => {
    const uploader = await fixture(`<mux-uploader></mux-uploader>`);
    uploader.nodrop = true;
    assert.equal(uploader.hasAttribute('nodrop'), true, 'nodrop attr is set');

    let drop = uploader.shadowRoot.querySelector('mux-uploader-drop');

    assert.isNull(drop, 'mux-uploader-drop is null');

    uploader.nodrop = false;
    drop = uploader.shadowRoot.querySelector('mux-uploader-drop');

    assert.equal(uploader.hasAttribute('nodrop'), false, 'nodrop attr is removed');
    assert.isNotNull(drop, 'mux-uploader-drop is not null');
  });

  it('removes progress with noprogress param', async function () {
    const uploader = await fixture(`<mux-uploader noprogress></mux-uploader>`);
    const progress = uploader.shadowRoot.querySelector('mux-uploader-progress');

    assert.isNull(progress, 'mux-uploader-progress is null');
  });

  it('should toggle the noprogress attribute when setting noprogress', async () => {
    const uploader = await fixture(`<mux-uploader></mux-uploader>`);
    uploader.noprogress = true;
    assert.equal(uploader.hasAttribute('noprogress'), true, 'noprogress attr is set');

    let progress = uploader.shadowRoot.querySelector('mux-uploader-progress');

    assert.isNull(progress, 'mux-uploader-progress is null');

    uploader.noprogress = false;
    progress = uploader.shadowRoot.querySelector('mux-uploader-progress');

    assert.equal(uploader.hasAttribute('noprogress'), false, 'noprogress attr is removed');
    assert.isNotNull(progress, 'mux-uploader-progress is not null');
  });

  it('removes retry with noretry param', async function () {
    const uploader = await fixture(`<mux-uploader noretry></mux-uploader>`);
    const retry = uploader.shadowRoot.querySelector('mux-uploader-retry');

    assert.isNull(retry, 'mux-uploader-retry is null');
  });

  it('should toggle the noretry attribute when setting noretry', async () => {
    const uploader = await fixture(`<mux-uploader></mux-uploader>`);
    uploader.noretry = true;
    assert.equal(uploader.hasAttribute('noretry'), true, 'noretry attr is set');

    let retry = uploader.shadowRoot.querySelector('mux-uploader-retry');

    assert.isNull(retry, 'mux-uploader-retry is null');

    uploader.noretry = false;
    retry = uploader.shadowRoot.querySelector('mux-uploader-retry');

    assert.equal(uploader.hasAttribute('noretry'), false, 'noretry attr is removed');
    assert.isNotNull(retry, 'mux-uploader-retry is not null');
  });

  it('removes status with nostatus param', async function () {
    const uploader = await fixture(`<mux-uploader nostatus></mux-uploader>`);
    const status = uploader.shadowRoot.querySelector('mux-uploader-status');

    assert.isNull(status, 'mux-uploader-status is null');
  });

  it('should toggle the nostatus attribute when setting nostatus', async () => {
    const uploader = await fixture(`<mux-uploader></mux-uploader>`);
    uploader.nostatus = true;
    assert.equal(uploader.hasAttribute('nostatus'), true, 'nostatus attr is set');

    let status = uploader.shadowRoot.querySelector('mux-uploader-status');

    assert.isNull(status, 'mux-uploader-status is null');

    uploader.nostatus = false;
    status = uploader.shadowRoot.querySelector('mux-uploader-status');

    assert.equal(uploader.hasAttribute('nostatus'), false, 'nostatus attr is removed');
    assert.isNotNull(status, 'mux-uploader-status is not null');
  });

  it('does not init without endpoint', async function () {
    const uploader = await fixture(`<mux-uploader></mux-uploader>`);

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
    server.respondWith('PUT', 'https://mock-upload-endpoint.com', [
      200,
      { 'Content-Type': 'application/json' },
      '{success: true}',
    ]);

    const uploader = await fixture(`<mux-uploader
      endpoint="https://mock-upload-endpoint.com"
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

    await aTimeout(100);
    server.respond();
    assert.equal(server.lastRequest.url, 'https://mock-upload-endpoint.com', 'request url matches');

    await oneEvent(uploader, 'success');
  });
});
