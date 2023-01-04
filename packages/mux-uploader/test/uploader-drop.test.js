import { fixture, assert, oneEvent } from '@open-wc/testing';
import '../src/index.ts';

describe('<mux-uploader-drop>', () => {
  it('adds and removes active attribute on drag events', async function () {
    const uploader = await fixture(`
      <mux-uploader-drop mux-uploader="my-uploader">
        <mux-uploader id="my-uploader" status endpoint="https://my-authenticated-url/storage?your-url-params">
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
        <mux-uploader id="my-uploader" status endpoint="https://my-authenticated-url/storage?your-url-params">
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
  });
});
