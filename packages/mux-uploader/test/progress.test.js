import { server } from './utils/server';

import { fixture, assert, oneEvent, aTimeout } from '@open-wc/testing';
import '../src/index.ts';

describe('<mux-uploader>', () => {
  it('initiates as expected', async function () {
    const uploader = await fixture(`<mux-uploader
      endpoint="https://my-authenticated-url/storage?your-url-params"
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

    uploader.dispatchEvent(new CustomEvent('reset'));

    assert.equal(percentage.uploadPercentage.innerHTML, '', 'reset matches');
  });

  it('updates radial progress', async function () {
    let file = new File(['foo'], 'foo.mp4', {
      type: 'video/mp4',
    });

    server.respondWith('PUT', 'https://mock-upload-endpoint.com', [
      200,
      { 'Content-Type': 'application/json' },
      '{success: true}',
    ]);

    const html = await fixture(`<div><mux-uploader
      id="my-uploader"
      endpoint="https://mock-upload-endpoint.com"
    ></mux-uploader>
    <mux-uploader-progress type="radial" mux-uploader="my-uploader"></mux-uploader-progress></div>`);

    const uploader = html.querySelector('mux-uploader');
    const radialProgress = html.querySelector('mux-uploader-progress[type="radial"]');

    assert.notEqual(radialProgress.svgCircle.style.strokeDashoffset, 0, 'offset is not 0');

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

    assert.equal(radialProgress.svgCircle.style.strokeDashoffset, 0, 'offset matches');

    uploader.dispatchEvent(new CustomEvent('reset'));
    assert.notEqual(radialProgress.svgCircle.style.strokeDashoffset, 0, 'offset is not 0');
  });
});
