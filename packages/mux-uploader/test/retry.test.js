import { fixture, assert, oneEvent, aTimeout } from '@open-wc/testing';
import '../src/index.ts';
import { t } from '../src/utils/i18n.ts';

describe('<mux-uploader-retry>', () => {
  let file = new File(['foo'], 'foo.mp4', {
    type: 'video/mp4',
  });

  it('fires a reset event on reset btn click', async function () {
    const uploader = await fixture(`<mux-uploader
      endpoint="https://mock-upload-endpoint.com"
    ></mux-uploader>`);

    const retry = uploader.shadowRoot.querySelector('mux-uploader-retry');

    const listener = oneEvent(uploader, 'reset');
    retry.retryButton.click();
    const e = await listener;
    assert.exists(e);
  });

  it('fires a reset event on Enter keypress', async function () {
    const uploader = await fixture(`<mux-uploader
    endpoint="https://mock-upload-endpoint.com"
  ></mux-uploader>`);

    const retry = uploader.shadowRoot.querySelector('mux-uploader-retry');

    const listener = oneEvent(uploader, 'reset');
    retry.retryButton.dispatchEvent(
      new KeyboardEvent('keyup', {
        key: 'Enter',
      })
    );

    const e = await listener;
    assert.exists(e);
  });

  describe('translations', () => {
    let file = new File(['foo'], 'foo.mp4', {
      type: 'video/mp4',
    });

    it('displays English retry text when no locale is specified', async function () {
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
      await oneEvent(uploader, 'uploaderror');

      const retry = uploader.shadowRoot.querySelector('mux-uploader-retry');

      assert.equal(retry.retryButton.textContent, t('Retry'), 'displays English text by default');
      assert.equal(retry.retryButton.textContent, 'Retry', 'matches English translation');
    });

    it('displays Spanish retry text when locale is set to es', async function () {
      const uploader = await fixture(`<mux-uploader
        endpoint="https://mock-upload-endpoint.com"
        locale="es">
      </mux-uploader>`);

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

      const retry = uploader.shadowRoot.querySelector('mux-uploader-retry');

      assert.equal(retry.retryButton.textContent, t('Retry', 'es'), 'displays Spanish text');
      assert.equal(retry.retryButton.textContent, 'Reintentar', 'matches Spanish translation');
    });

    it('displays French retry text when locale is set to fr', async function () {
      const uploader = await fixture(`<mux-uploader
        endpoint="https://mock-upload-endpoint.com"
        locale="fr">
      </mux-uploader>`);

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

      const retry = uploader.shadowRoot.querySelector('mux-uploader-retry');

      assert.equal(retry.retryButton.textContent, t('Retry', 'fr'), 'displays French text');
      assert.equal(retry.retryButton.textContent, 'Réessayer', 'matches French translation');
    });
  });
});
