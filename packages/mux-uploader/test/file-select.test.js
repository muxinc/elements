import { fixture, assert, oneEvent } from '@open-wc/testing';
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

  it('propagates click events to hidden file input', async function () {
    const uploader = await fixture(`
    <mux-uploader
      endpoint="https://my-authenticated-url/storage?your-url-params"
      status
    >
      <button class="btn" type="button" slot="file-select">
        Pick a file
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
});
