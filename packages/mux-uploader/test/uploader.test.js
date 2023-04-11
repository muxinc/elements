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

  it('removes dropzone with no-drop param', async function () {
    const uploader = await fixture(`<mux-uploader no-drop></mux-uploader>`);
    const drop = uploader.shadowRoot.querySelector('mux-uploader-drop');

    assert.isNull(drop, 'mux-uploader-drop is null');
  });

  it('should toggle the no-drop attribute when setting nodrop', async () => {
    const uploader = await fixture(`<mux-uploader></mux-uploader>`);
    uploader.noDrop = true;
    assert.equal(uploader.hasAttribute('no-drop'), true, 'no-drop attr is set');

    let drop = uploader.shadowRoot.querySelector('mux-uploader-drop');

    assert.isNull(drop, 'mux-uploader-drop is null');

    uploader.noDrop = false;
    drop = uploader.shadowRoot.querySelector('mux-uploader-drop');

    assert.equal(uploader.hasAttribute('no-drop'), false, 'no-drop attr is removed');
    assert.isNotNull(drop, 'mux-uploader-drop is not null');
  });

  it('removes progress with no-progress param', async function () {
    const uploader = await fixture(`<mux-uploader no-progress></mux-uploader>`);
    const progress = uploader.shadowRoot.querySelector('mux-uploader-progress');

    assert.isNull(progress, 'mux-uploader-progress is null');
  });

  it('should toggle the no-progress attribute when setting noprogress', async () => {
    const uploader = await fixture(`<mux-uploader></mux-uploader>`);
    uploader.noProgress = true;
    assert.equal(uploader.hasAttribute('no-progress'), true, 'no-progress attr is set');

    let progress = uploader.shadowRoot.querySelector('mux-uploader-progress');

    assert.isNull(progress, 'mux-uploader-progress is null');

    uploader.noProgress = false;
    progress = uploader.shadowRoot.querySelector('mux-uploader-progress');

    assert.equal(uploader.hasAttribute('no-progress'), false, 'no-progress attr is removed');
    assert.isNotNull(progress, 'mux-uploader-progress is not null');
  });

  it('removes retry with no-retry param', async function () {
    const uploader = await fixture(`<mux-uploader no-retry></mux-uploader>`);
    const retry = uploader.shadowRoot.querySelector('mux-uploader-retry');

    assert.isNull(retry, 'mux-uploader-retry is null');
  });

  it('should toggle the no-retry attribute when setting noretry', async () => {
    const uploader = await fixture(`<mux-uploader></mux-uploader>`);
    uploader.noRetry = true;
    assert.equal(uploader.hasAttribute('no-retry'), true, 'no-retry attr is set');

    let retry = uploader.shadowRoot.querySelector('mux-uploader-retry');

    assert.isNull(retry, 'mux-uploader-retry is null');

    uploader.noRetry = false;
    retry = uploader.shadowRoot.querySelector('mux-uploader-retry');

    assert.equal(uploader.hasAttribute('no-retry'), false, 'no-retry attr is removed');
    assert.isNotNull(retry, 'mux-uploader-retry is not null');
  });

  it('removes status with no-status param', async function () {
    const uploader = await fixture(`<mux-uploader no-status></mux-uploader>`);
    const status = uploader.shadowRoot.querySelector('mux-uploader-status');

    assert.isNull(status, 'mux-uploader-status is null');
  });

  it('should toggle the no-status attribute when setting nostatus', async () => {
    const uploader = await fixture(`<mux-uploader></mux-uploader>`);
    uploader.noStatus = true;
    assert.equal(uploader.hasAttribute('no-status'), true, 'no-status attr is set');

    let status = uploader.shadowRoot.querySelector('mux-uploader-status');

    assert.isNull(status, 'mux-uploader-status is null');

    uploader.noStatus = false;
    status = uploader.shadowRoot.querySelector('mux-uploader-status');

    assert.equal(uploader.hasAttribute('no-status'), false, 'no-status attr is removed');
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

  it('should set and get maxFileSize attribute correctly', async () => {
    const uploader = await fixture(`<mux-uploader></mux-uploader>`);

    uploader.maxFileSize = 1000000;
    assert.equal(uploader.maxFileSize, 1000000, 'maxFileSize matches');

    uploader.removeAttribute('max-file-size');
    assert.equal(uploader.maxFileSize, undefined);
  });
});
