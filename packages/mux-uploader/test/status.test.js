import { server } from './utils/server';
import { fixture, assert, oneEvent, aTimeout } from '@open-wc/testing';
import '../src/index.ts';
import { t } from '../src/utils/i18n.ts';

describe('<mux-uploader-status>', () => {
  let file = new File(['foo'], 'foo.mp4', {
    type: 'video/mp4',
  });

  it('updates with success message on success', async function () {
    server.respondWith('PUT', 'https://mock-upload-endpoint.com', [
      200,
      { 'Content-Type': 'application/json' },
      '{success: true}',
    ]);

    const uploader = await fixture(`<mux-uploader
      endpoint="https://mock-upload-endpoint.com"
    ></mux-uploader>`);

    const status = uploader.shadowRoot.querySelector('mux-uploader-status');

    setTimeout(() => {
      uploader.dispatchEvent(
        new CustomEvent('file-ready', {
          composed: true,
          bubbles: true,
          detail: file,
        })
      );
    });

    await aTimeout(500);
    server.respond();
    await oneEvent(uploader, 'success');
    assert.equal(status.statusMessage.innerHTML, t('Upload complete!'), 'status message matches');
  });

  it('show an error when not provided an endpoint', async function () {
    const uploader = await fixture(`<mux-uploader></mux-uploader>`);
    const status = uploader.shadowRoot.querySelector('mux-uploader-status');

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
    assert.equal(status.statusMessage.innerHTML, detail.message, 'status message matches');
  });

  it('clears an error on retry click', async function () {
    const uploader = await fixture(`<mux-uploader></mux-uploader>`);
    const status = uploader.shadowRoot.querySelector('mux-uploader-status');

    setTimeout(() => {
      uploader.dispatchEvent(
        new CustomEvent('file-ready', {
          composed: true,
          bubbles: true,
          detail: file,
        })
      );
    });

    await oneEvent(uploader, 'uploaderror');

    setTimeout(() => {
      uploader.dispatchEvent(new CustomEvent('reset'));
    });

    const e = await oneEvent(uploader, 'reset');
    assert.equal(status.statusMessage.innerHTML, '', 'status message cleared');
  });

  describe('translations', () => {
    it('displays English success message when no locale is specified', async function () {
      server.respondWith('PUT', 'https://mock-upload-endpoint.com', [
        200,
        { 'Content-Type': 'application/json' },
        '{success: true}',
      ]);

      const uploader = await fixture(`<mux-uploader
        endpoint="https://mock-upload-endpoint.com"
      ></mux-uploader>`);

      const status = uploader.shadowRoot.querySelector('mux-uploader-status');

      setTimeout(() => {
        uploader.dispatchEvent(
          new CustomEvent('file-ready', {
            composed: true,
            bubbles: true,
            detail: file,
          })
        );
      });

      await aTimeout(500);
      server.respond();
      await oneEvent(uploader, 'success');

      assert.equal(status.statusMessage.innerHTML, t('Upload complete!'), 'displays English text by default');
      assert.equal(status.statusMessage.innerHTML, 'Upload complete!', 'matches English translation');
    });

    it('displays Spanish success message when locale is set to es', async function () {
      server.respondWith('PUT', 'https://mock-upload-endpoint.com', [
        200,
        { 'Content-Type': 'application/json' },
        '{success: true}',
      ]);

      const uploader = await fixture(`<mux-uploader
        endpoint="https://mock-upload-endpoint.com"
        locale="es">
      </mux-uploader>`);

      const status = uploader.shadowRoot.querySelector('mux-uploader-status');

      setTimeout(() => {
        uploader.dispatchEvent(
          new CustomEvent('file-ready', {
            composed: true,
            bubbles: true,
            detail: file,
          })
        );
      });

      await aTimeout(500);
      server.respond();
      await oneEvent(uploader, 'success');

      assert.equal(status.statusMessage.innerHTML, t('Upload complete!', 'es'), 'displays Spanish text');
      assert.equal(status.statusMessage.innerHTML, '¡Subida completada!', 'matches Spanish translation');
    });

    it('displays French success message when locale is set to fr', async function () {
      server.respondWith('PUT', 'https://mock-upload-endpoint.com', [
        200,
        { 'Content-Type': 'application/json' },
        '{success: true}',
      ]);

      const uploader = await fixture(`<mux-uploader
        endpoint="https://mock-upload-endpoint.com"
        locale="fr">
      </mux-uploader>`);

      const status = uploader.shadowRoot.querySelector('mux-uploader-status');

      setTimeout(() => {
        uploader.dispatchEvent(
          new CustomEvent('file-ready', {
            composed: true,
            bubbles: true,
            detail: file,
          })
        );
      });

      await aTimeout(500);
      server.respond();
      await oneEvent(uploader, 'success');

      assert.equal(status.statusMessage.innerHTML, t('Upload complete!', 'fr'), 'displays French text');
      assert.equal(status.statusMessage.innerHTML, 'Téléchargement terminé!', 'matches French translation');
    });
  });
});
