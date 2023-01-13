import { fixture, assert } from '@open-wc/testing';
import '../src/index.ts';

describe('<mux-uploader-file-select>', () => {
  it('slots as expected', async function () {
    const uploader = await fixture(`
    <mux-uploader
      endpoint="https://my-authenticated-url/storage?your-url-params"
      status
    >
      <button class="btn" type="button" slot="file-select">
        Pick a file
      </button>
    </mux-uploader>`);

    const el = uploader.shadowRoot.querySelector('mux-uploader-file-select');
    const slot = el.querySelector('slot');
    const button = slot.assignedNodes()[0];

    assert.equal(slot.getAttribute('name'), 'file-select', 'slot name is reflected');
    assert.equal(button.getAttribute('class'), 'btn', 'slot content is reflected');
    assert.equal(button.innerText, 'Pick a file', 'slot content is reflected');
  });
});
