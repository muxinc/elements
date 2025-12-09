import { server } from './utils/server';
import { fixture, assert, oneEvent, aTimeout } from '@open-wc/testing';
import '../src/index.ts';
import { t } from '../src/utils/i18n.ts';

describe('<mux-uploader-pause>', () => {
  let file = new File(['foo'], 'foo.mp4', {
    type: 'video/mp4',
  });

  it('displays pause button when upload is in progress', async function () {
    server.respondWith('PUT', 'https://mock-upload-endpoint.com', [
      200,
      { 'Content-Type': 'application/json' },
      '{success: true}',
    ]);

    const uploader = await fixture(`<mux-uploader
      endpoint="https://mock-upload-endpoint.com"
      pausable>
    </mux-uploader>`);

    const pause = uploader.shadowRoot.querySelector('mux-uploader-pause');

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

    assert.exists(pause, 'pause element exists');
    assert.equal(pause.pauseButton.textContent, t('Pause'), 'displays Pause text');
  });

  describe('translations', () => {
    it('displays English pause text when no locale is specified', async function () {
      server.respondWith('PUT', 'https://mock-upload-endpoint.com', [
        200,
        { 'Content-Type': 'application/json' },
        '{success: true}',
      ]);

      const uploader = await fixture(`<mux-uploader
        endpoint="https://mock-upload-endpoint.com"
        pausable>
      </mux-uploader>`);

      const pause = uploader.shadowRoot.querySelector('mux-uploader-pause');

      setTimeout(() => {
        uploader.dispatchEvent(
          new CustomEvent('file-ready', {
            composed: true,
            bubbles: true,
            detail: file,
          })
        );
      });

      await oneEvent(uploader, 'uploadstart');
      await aTimeout(100);

      assert.equal(pause.pauseButton.textContent, t('Pause'), 'displays English Pause text by default');
      assert.equal(pause.pauseButton.textContent, 'Pause', 'matches English translation');
    });

    it('displays Spanish pause text when locale is set to es', async function () {
      server.respondWith('PUT', 'https://mock-upload-endpoint.com', [
        200,
        { 'Content-Type': 'application/json' },
        '{success: true}',
      ]);

      const uploader = await fixture(`<mux-uploader
        endpoint="https://mock-upload-endpoint.com"
        locale="es"
        pausable>
      </mux-uploader>`);

      const pause = uploader.shadowRoot.querySelector('mux-uploader-pause');

      setTimeout(() => {
        uploader.dispatchEvent(
          new CustomEvent('file-ready', {
            composed: true,
            bubbles: true,
            detail: file,
          })
        );
      });

      await oneEvent(uploader, 'uploadstart');
      await aTimeout(100);

      assert.equal(pause.pauseButton.textContent, t('Pause', 'es'), 'displays Spanish Pause text');
      assert.equal(pause.pauseButton.textContent, 'Pausar', 'matches Spanish translation');
    });

    it('displays French pause text when locale is set to fr', async function () {
      server.respondWith('PUT', 'https://mock-upload-endpoint.com', [
        200,
        { 'Content-Type': 'application/json' },
        '{success: true}',
      ]);

      const uploader = await fixture(`<mux-uploader
        endpoint="https://mock-upload-endpoint.com"
        locale="fr"
        pausable>
      </mux-uploader>`);

      const pause = uploader.shadowRoot.querySelector('mux-uploader-pause');

      setTimeout(() => {
        uploader.dispatchEvent(
          new CustomEvent('file-ready', {
            composed: true,
            bubbles: true,
            detail: file,
          })
        );
      });

      await oneEvent(uploader, 'uploadstart');
      await aTimeout(100);

      assert.equal(pause.pauseButton.textContent, t('Pause', 'fr'), 'displays French Pause text');
      assert.equal(pause.pauseButton.textContent, 'Pause', 'matches French translation');
    });
  });
});
