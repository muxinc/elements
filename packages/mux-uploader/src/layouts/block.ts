import { document } from '../polyfills';
import type MuxUploaderElement from '../mux-uploader';

import '../mux-uploader-file-select';
import { fileSelectFragment } from '../mux-uploader-file-select';

function shouldRenderElement(contextElement: HTMLElement, selector: string): boolean {
  const root = contextElement.getRootNode() as ShadowRoot | Document;
  return !root.querySelector(selector);
}

function renderElement(contextElement: HTMLElement, selector: string, template: string): string {
  return shouldRenderElement(contextElement, selector) ? template : '';
}

function shouldRenderWrapper(contextElement: MuxUploaderElement, selector: string): string {
  const root = contextElement.getRootNode() as ShadowRoot | Document;
  return !contextElement.nodrop && !root.querySelector(selector) ? 'mux-uploader-drop overlay' : 'div';
}

export default function blockLayout(contextElement: MuxUploaderElement) {
  const wrapper = shouldRenderWrapper(contextElement, 'mux-uploader-drop');

  const renderStatus = renderElement(
    contextElement,
    'mux-uploader-status',
    '<mux-uploader-status></mux-uploader-status>'
  );
  const renderRetry = renderElement(contextElement, 'mux-uploader-retry', '<mux-uploader-retry></mux-uploader-retry>');
  const renderPercentageProgress = renderElement(
    contextElement,
    'mux-uploader-progress[type="percentage"]',
    '<mux-uploader-progress type="percentage"></mux-uploader-progress>'
  );
  const renderFileSelect = renderElement(
    contextElement,
    'mux-uploader-file-select',
    `<mux-uploader-file-select>
        <slot name="file-select">
          ${fileSelectFragment}
        </slot>
      </mux-uploader-file-select>`
  );
  const renderProgress = renderElement(
    contextElement,
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
