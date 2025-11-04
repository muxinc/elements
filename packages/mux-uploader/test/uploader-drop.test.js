import { fixture, assert, oneEvent } from '@open-wc/testing';
import '../src/index.ts';
import { t } from '../src/utils/i18n.ts';

describe('<mux-uploader-drop>', () => {
  it('adds and removes active attribute on drag events', async function () {
    const uploader = await fixture(`
      <mux-uploader-drop mux-uploader="my-uploader">
        <mux-uploader id="my-uploader" endpoint="https://my-authenticated-url/storage?your-url-params">
        </mux-uploader>
      </mux-uploader-drop>
    `);

    uploader.dispatchEvent(
      new DragEvent('dragenter', {
        composed: true,
        bubbles: true,
      })
    );

    assert.exists(uploader.getAttribute('active'), 'active attribute is set');

    uploader.dispatchEvent(
      new DragEvent('dragleave', {
        composed: true,
        bubbles: true,
      })
    );

    assert.notExists(uploader.getAttribute('active'), 'active attribute is removed');
  });

  it('fires a file-ready event when a file is dropped', async function () {
    const uploader = await fixture(`
      <mux-uploader-drop mux-uploader="my-uploader">
        <mux-uploader id="my-uploader" endpoint="https://my-authenticated-url/storage?your-url-params">
        </mux-uploader>
      </mux-uploader-drop>
    `);

    const file = new File(['foo'], 'foo.mp4', {
      type: 'video/mp4',
    });

    const dataTransfer = new DataTransfer();
    dataTransfer.items.add(file);

    setTimeout(() => {
      uploader.dispatchEvent(
        new DragEvent('drop', {
          composed: true,
          bubbles: true,
          dataTransfer,
        })
      );
    });

    const { detail } = await oneEvent(uploader, 'file-ready');
    assert.equal(detail, file, 'file matches');
    assert.equal(uploader.hasAttribute('upload-in-progress'), true, 'upload-in-progress attr is set');
  });

  describe('translations', () => {
    it('displays English text when no locale is specified', async function () {
      const uploader = await fixture(`
        <mux-uploader endpoint="https://my-authenticated-url/storage?your-url-params">
        </mux-uploader>
      `);

      const drop = uploader.shadowRoot.querySelector('mux-uploader-drop');
      const dropText = drop.shadowRoot.querySelector('#drop-text');
      const separatorText = drop.shadowRoot.querySelector('#separator-text');

      assert.equal(
        dropText.textContent,
        t('Drop a video file here to upload'),
        'displays English drop text by default'
      );
      assert.equal(dropText.textContent, 'Drop a video file here to upload', 'matches English translation');

      assert.equal(separatorText.textContent, t('or'), 'displays English separator text by default');
      assert.equal(separatorText.textContent, 'or', 'matches English translation');
    });

    it('displays Spanish text when locale is set to es', async function () {
      const uploader = await fixture(`
        <mux-uploader 
          endpoint="https://my-authenticated-url/storage?your-url-params"
          locale="es">
        </mux-uploader>
      `);

      const drop = uploader.shadowRoot.querySelector('mux-uploader-drop');
      const dropText = drop.shadowRoot.querySelector('#drop-text');
      const separatorText = drop.shadowRoot.querySelector('#separator-text');

      assert.equal(dropText.textContent, t('Drop a video file here to upload', 'es'), 'displays Spanish drop text');
      assert.equal(dropText.textContent, 'Arrastra un archivo de video aquí para subir', 'matches Spanish translation');

      assert.equal(separatorText.textContent, t('or', 'es'), 'displays Spanish separator text');
      assert.equal(separatorText.textContent, 'o', 'matches Spanish translation');
    });

    it('displays French text when locale is set to fr', async function () {
      const uploader = await fixture(`
        <mux-uploader 
          endpoint="https://my-authenticated-url/storage?your-url-params"
          locale="fr">
        </mux-uploader>
      `);

      const drop = uploader.shadowRoot.querySelector('mux-uploader-drop');
      const dropText = drop.shadowRoot.querySelector('#drop-text');
      const separatorText = drop.shadowRoot.querySelector('#separator-text');

      assert.equal(dropText.textContent, t('Drop a video file here to upload', 'fr'), 'displays French drop text');
      assert.equal(
        dropText.textContent,
        'Déposez un fichier vidéo ici pour le télécharger',
        'matches French translation'
      );

      assert.equal(separatorText.textContent, t('or', 'fr'), 'displays French separator text');
      assert.equal(separatorText.textContent, 'ou', 'matches French translation');
    });
  });
});
