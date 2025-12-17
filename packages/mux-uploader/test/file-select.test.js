import { fixture, assert, oneEvent } from '@open-wc/testing';
import '../src/index.ts';
import { t } from '../src/utils/i18n.ts';

describe('<mux-uploader-file-select>', () => {
  it('renders default template', async function () {
    const uploader = await fixture(`
    <mux-uploader endpoint="https://my-authenticated-url/storage?your-url-params">
    </mux-uploader>`);

    const el = uploader.shadowRoot.querySelector('mux-uploader-file-select');
    const slot = el.querySelector('slot');
    const button = slot.querySelector('button');

    assert.equal(slot.getAttribute('name'), 'file-select', 'slot name is reflected');
    assert.equal(button.innerText, t('Upload a video'), 'slot content is reflected');
  });

  it('slots custom content as expected', async function () {
    const uploader = await fixture(`
    <mux-uploader
      endpoint="https://my-authenticated-url/storage?your-url-params"
    >
      <button class="btn" type="button" slot="file-select">
        Upload a video
      </button>
    </mux-uploader>`);

    const el = uploader.shadowRoot.querySelector('mux-uploader-file-select');
    const slot = el.querySelector('slot');
    const button = slot.assignedNodes()[0];

    assert.equal(slot.getAttribute('name'), 'file-select', 'slot name is reflected');
    assert.equal(button.getAttribute('class'), 'btn', 'slot content is reflected');
    assert.equal(button.innerText, 'Upload a video', 'slot content is reflected');
    assert.equal(button, el.filePickerEl, 'filePickerEl is set');
  });

  it('propagates click events to hidden file input', async function () {
    const uploader = await fixture(`
    <mux-uploader
      endpoint="https://my-authenticated-url/storage?your-url-params"
    >
      <button class="btn" type="button" slot="file-select">
        Upload a video
      </button>
    </mux-uploader>`);

    const hiddenInput = uploader.shadowRoot.querySelector('input[type="file"]');
    const listener = oneEvent(hiddenInput, 'click');

    const el = uploader.shadowRoot.querySelector('mux-uploader-file-select');
    const slot = el.querySelector('slot');
    const button = slot.assignedNodes()[0];

    button.click();

    const evt = await listener;
    assert.equal(evt.type, 'click', 'click event is propagated');
  });

  it.skip('updates button display property on events', async function () {
    let file = new File(['foo'], 'foo.mp4', {
      type: 'video/mp4',
    });

    const uploader = await fixture(`<mux-uploader></mux-uploader>`);
    const el = uploader.shadowRoot.querySelector('mux-uploader-file-select');
    const slot = el.querySelector('slot');

    setTimeout(() => {
      uploader.dispatchEvent(
        new CustomEvent('file-ready', {
          composed: true,
          bubbles: true,
          detail: file,
        })
      );
    });

    assert.equal(slot.style.display, 'none', 'display is none');
    uploader.dispatchEvent(new CustomEvent('reset'));
    assert.equal(slot.style.display, 'block', 'display is none');
  });

  describe('translations', () => {
    it('uses default locale (English) when no locale is specified', async function () {
      const uploader = await fixture(`
        <mux-uploader endpoint="https://my-authenticated-url/storage?your-url-params">
        </mux-uploader>
      `);

      const el = uploader.shadowRoot.querySelector('mux-uploader-file-select');
      const button = el.shadowRoot.querySelector('button');

      assert.equal(button.textContent, t('Upload a video'), 'displays English text by default');
      assert.equal(button.textContent, 'Upload a video', 'matches English translation');
    });

    it('displays Spanish text when locale is set to es', async function () {
      const uploader = await fixture(`
        <mux-uploader 
          endpoint="https://my-authenticated-url/storage?your-url-params"
          locale="es">
        </mux-uploader>
      `);

      const el = uploader.shadowRoot.querySelector('mux-uploader-file-select');
      const button = el.shadowRoot.querySelector('button');

      assert.equal(button.textContent, t('Upload a video', 'es'), 'displays Spanish text');
      assert.equal(button.textContent, 'Subir un video', 'matches Spanish translation');
    });

    it('displays French text when locale is set to fr', async function () {
      const uploader = await fixture(`
        <mux-uploader 
          endpoint="https://my-authenticated-url/storage?your-url-params"
          locale="fr">
        </mux-uploader>
      `);

      const el = uploader.shadowRoot.querySelector('mux-uploader-file-select');
      const button = el.shadowRoot.querySelector('button');

      assert.equal(button.textContent, t('Upload a video', 'fr'), 'displays French text');
      assert.equal(button.textContent, 'Télécharger une vidéo', 'matches French translation');
    });

    it('preserves custom button text when locale changes', async function () {
      const uploader = await fixture(`
        <mux-uploader 
          endpoint="https://my-authenticated-url/storage?your-url-params">
          <button class="btn" type="button" slot="file-select">Pick a file</button>
        </mux-uploader>
      `);

      const el = uploader.shadowRoot.querySelector('mux-uploader-file-select');
      const slot = el.querySelector('slot');
      const button = slot.assignedNodes()[0];

      // Verify initial custom text
      assert.equal(button.textContent, 'Pick a file', 'custom button text is preserved initially');

      // Change locale to Spanish
      uploader.setAttribute('locale', 'es');

      // Custom button text should still be preserved (not overwritten by translation)
      assert.equal(button.textContent, 'Pick a file', 'custom button text is preserved after locale change');
      assert.notEqual(
        button.textContent,
        t('Upload a video', 'es'),
        'custom button text is not overwritten by translation'
      );
    });
  });
});
