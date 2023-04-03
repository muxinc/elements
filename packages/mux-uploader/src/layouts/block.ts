import { document } from '../polyfills';

import '../mux-uploader-file-select';
import { fileSelectFragment } from '../mux-uploader-file-select';

function shouldRenderElement(selector: string): boolean {
  return !document.querySelector(selector);
}

function renderElement(selector: string, template: string): string {
  return shouldRenderElement(selector) ? template : '';
}

function shouldRenderWrapper(nodrop: boolean, selector: string): string {
  return !nodrop && !document.querySelector(selector) ? 'mux-uploader-drop overlay' : 'div';
}

export default function blockLayout(nodrop: boolean) {
  const wrapper = shouldRenderWrapper(nodrop, 'mux-uploader-drop');

  const renderStatus = renderElement('mux-uploader-status', '<mux-uploader-status></mux-uploader-status>');
  const renderRetry = renderElement('mux-uploader-retry', '<mux-uploader-retry></mux-uploader-retry>');
  const renderPercentageProgress = renderElement(
    'mux-uploader-progress[type="percentage"]',
    '<mux-uploader-progress type="percentage"></mux-uploader-progress>'
  );
  const renderFileSelect = renderElement(
    'mux-uploader-file-select',
    `<mux-uploader-file-select>
        <slot name="file-select">
          ${fileSelectFragment}
        </slot>
      </mux-uploader-file-select>`
  );
  const renderProgress = renderElement(
    'mux-uploader-progress:not([type])',
    '<mux-uploader-progress></mux-uploader-progress>'
  );

  return document.createRange().createContextualFragment(`
    <${wrapper}>
      ${renderStatus}
      ${renderRetry}
      ${renderFileSelect}
      ${renderPercentageProgress}
      ${renderProgress}
    </${wrapper}>
  `);
}
