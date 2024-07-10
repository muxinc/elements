import { fixture, assert, oneEvent } from '@open-wc/testing';
import '../src/index.ts';

describe('<mux-uploader-file-select>', () => {
  it('renders default template', async function () {
    const uploader = await fixture(`
    <mux-uploader endpoint="https://my-authenticated-url/storage?your-url-params">
    </mux-uploader>`);

    const el = uploader.shadowRoot.querySelector('mux-uploader-file-select');
    const slot = el.querySelector('slot');
    const button = slot.querySelector('button');

    assert.equal(slot.getAttribute('name'), 'file-select', 'slot name is reflected');
    assert.equal(button.innerText, 'Upload a video', 'slot content is reflected');
  });

  it('slots custom content as expected', async function () {
    const uploader = await fixture(`
    <mux-uploader
      endpoint="https://my-authenticated-url/storage?your-url-params"
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
    assert.equal(button, el.filePickerEl, 'filePickerEl is set');
  });

  it('propagates click events to hidden file input', async function () {
    const uploader = await fixture(`
    <mux-uploader
      endpoint="https://my-authenticated-url/storage?your-url-params"
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
});
