import { fixture, assert } from '@open-wc/testing';
import '../src/index.ts';

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
});
