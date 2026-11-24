import { fixture, assert } from '@open-wc/testing';
import '../src/index.ts';
import { t } from '../src/utils/i18n.ts';

const controls = [
  {
    tag: 'mux-uploader-progress',
    event: 'success',
    changed: (el) => el.hasAttribute('upload-complete'),
  },
  {
    tag: 'mux-uploader-retry',
    event: 'uploaderror',
    changed: (el) => el.hasAttribute('upload-error'),
  },
  {
    tag: 'mux-uploader-pause',
    event: 'success',
    changed: (el) => el.hasAttribute('upload-complete'),
  },
  {
    tag: 'mux-uploader-sr-text',
    event: 'success',
    changed: (el) => !!el.srOnlyText.textContent,
  },
];

describe('mux-uploader control elements', () => {
  controls.forEach(({ tag, event, changed }) => {
    it(`<${tag}> stops listening to the uploader once it is removed`, async function () {
      const uploader = await fixture(`<mux-uploader endpoint="https://mock-upload-endpoint.com"></mux-uploader>`);
      const el = document.createElement(tag);
      uploader.append(el);

      uploader.dispatchEvent(new CustomEvent(event, { detail: { message: 'Upload failed' } }));
      assert.isTrue(changed(el), 'Assert that the connected element reacts to the event.');

      el.remove();
      el.getAttributeNames().forEach((name) => name.startsWith('upload-') && el.removeAttribute(name));
      el.shadowRoot.getElementById('sr-only')?.replaceChildren();

      uploader.dispatchEvent(new CustomEvent(event, { detail: { message: 'Upload failed' } }));
      assert.isFalse(changed(el), 'Assert that the removed element ignores the event.');
    });
  });

  it('does not keep the replaced layout reacting to uploader events', async function () {
    const uploader = await fixture(`<mux-uploader endpoint="https://mock-upload-endpoint.com"></mux-uploader>`);
    const staleProgress = uploader.shadowRoot.querySelector('mux-uploader-progress');

    // Changing an observed attribute rebuilds the layout and disconnects the previous elements.
    uploader.noDrop = true;
    assert.isFalse(staleProgress.isConnected, 'Assert that the previous layout was replaced.');

    uploader.dispatchEvent(new CustomEvent('success'));
    assert.isFalse(staleProgress.hasAttribute('upload-complete'), 'Assert that the replaced element ignores events.');
  });

  it('<mux-uploader-pause> reacts to uploaderror and reset only while connected', async function () {
    const uploader = await fixture(`<mux-uploader endpoint="https://mock-upload-endpoint.com"></mux-uploader>`);
    const pause = document.createElement('mux-uploader-pause');
    uploader.append(pause);

    uploader.dispatchEvent(new CustomEvent('uploadstart'));
    uploader.dispatchEvent(new CustomEvent('uploaderror', { detail: { message: 'Upload failed' } }));
    assert.isTrue(pause.hasAttribute('upload-error'), 'uploaderror sets upload-error');
    assert.isFalse(pause.hasAttribute('upload-in-progress'), 'uploaderror clears upload-in-progress');
    assert.isFalse(pause.hasAttribute('upload-complete'), 'uploaderror clears upload-complete');

    uploader.dispatchEvent(new CustomEvent('reset'));
    assert.isFalse(pause.hasAttribute('upload-error'), 'reset clears upload-error');

    pause.remove();

    uploader.dispatchEvent(new CustomEvent('uploaderror', { detail: { message: 'Upload failed' } }));
    assert.isFalse(pause.hasAttribute('upload-error'), 'removed element ignores uploaderror');

    pause.toggleAttribute('upload-error', true);
    uploader.dispatchEvent(new CustomEvent('reset'));
    assert.isTrue(pause.hasAttribute('upload-error'), 'removed element ignores reset');
  });

  it('<mux-uploader-pause> reacts to pausedchange and chunksuccess only while connected', async function () {
    const uploader = await fixture(`<mux-uploader endpoint="https://mock-upload-endpoint.com"></mux-uploader>`);
    Object.defineProperty(uploader, 'paused', { value: false, writable: true, configurable: true });
    const pause = document.createElement('mux-uploader-pause');
    uploader.append(pause);

    uploader.paused = true;
    uploader.dispatchEvent(new CustomEvent('pausedchange', { detail: true }));
    assert.isTrue(pause.pauseButton.disabled, 'button is disabled while pausing');

    uploader.dispatchEvent(new CustomEvent('chunksuccess'));
    assert.isFalse(pause.pauseButton.disabled, 'button is enabled once the chunk completes');

    uploader.paused = false;
    uploader.dispatchEvent(new CustomEvent('pausedchange', { detail: false }));
    assert.isFalse(pause.pauseButton.disabled, 'button stays enabled when resuming');
    assert.equal(pause.pauseButton.textContent, t('Pause'), 'shows pause text');

    // Disconnect while waiting for the current chunk to finish.
    uploader.paused = true;
    uploader.dispatchEvent(new CustomEvent('pausedchange', { detail: true }));
    assert.isTrue(pause.pauseButton.disabled, 'button is disabled while pausing');
    const textBeforeRemove = pause.pauseButton.textContent;
    pause.remove();

    uploader.dispatchEvent(new CustomEvent('chunksuccess'));
    assert.isTrue(pause.pauseButton.disabled, 'removed element ignores the pending chunksuccess');
    assert.equal(pause.pauseButton.textContent, textBeforeRemove, 'removed element keeps its text');

    uploader.paused = false;
    uploader.dispatchEvent(new CustomEvent('pausedchange', { detail: false }));
    assert.isTrue(pause.pauseButton.disabled, 'removed element ignores pausedchange');
  });

  it('<mux-uploader-sr-text> reacts to localechange only while connected', async function () {
    const uploader = await fixture(`<mux-uploader endpoint="https://mock-upload-endpoint.com"></mux-uploader>`);
    const sr = document.createElement('mux-uploader-sr-text');
    uploader.append(sr);

    uploader.locale = 'es';
    assert.equal(sr.srOnlyText.textContent, '', 'localechange does not add text before an upload completes');

    uploader.dispatchEvent(new CustomEvent('success'));
    assert.equal(sr.srOnlyText.textContent, t('Upload complete!', 'es'), 'shows the success text');

    uploader.locale = 'fr';
    assert.equal(sr.srOnlyText.textContent, t('Upload complete!', 'fr'), 'localechange updates the text');

    sr.remove();

    uploader.locale = 'en';
    assert.equal(sr.srOnlyText.textContent, t('Upload complete!', 'fr'), 'removed element ignores localechange');
  });

  it('re-attaches listeners when a control element is reconnected to another uploader', async function () {
    const container = await fixture(`<div>
      <mux-uploader id="uploader-a" endpoint="https://mock-upload-endpoint.com"></mux-uploader>
      <mux-uploader id="uploader-b" endpoint="https://mock-upload-endpoint.com"></mux-uploader>
    </div>`);
    const uploaderA = container.querySelector('#uploader-a');
    const uploaderB = container.querySelector('#uploader-b');

    const pause = document.createElement('mux-uploader-pause');
    pause.setAttribute('mux-uploader', 'uploader-a');
    container.append(pause);

    uploaderA.dispatchEvent(new CustomEvent('success'));
    assert.isTrue(pause.hasAttribute('upload-complete'), 'reacts to the first uploader');

    pause.remove();
    pause.setAttribute('mux-uploader', 'uploader-b');
    container.append(pause);
    assert.isFalse(pause.hasAttribute('upload-complete'), 'state is synced from the new uploader');

    uploaderA.dispatchEvent(new CustomEvent('success'));
    assert.isFalse(pause.hasAttribute('upload-complete'), 'ignores the previous uploader');

    uploaderB.dispatchEvent(new CustomEvent('success'));
    assert.isTrue(pause.hasAttribute('upload-complete'), 'reacts to the new uploader');
  });
});
