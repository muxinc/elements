import { document } from '../polyfills';

import '../mux-uploader-file-select';
import { fileSelectFragment } from '../mux-uploader-file-select';
import MuxUploaderElement from '../mux-uploader';

interface BlockLayoutOptions {
  nodrop?: boolean;
  noprogress?: boolean;
  nostatus?: boolean;
  noretry?: boolean;
}

function conditionalRender(flag: boolean | undefined, component: string): string {
  return flag ? '' : component;
}

export default function blockLayout(contextElement: MuxUploaderElement): DocumentFragment {
  const { nodrop, noprogress, nostatus, noretry } = contextElement;
  const wrapper = nodrop ? 'div' : 'mux-uploader-drop overlay';
  const progressElements = conditionalRender(
    noprogress,
    `
      <mux-uploader-progress type="percentage"></mux-uploader-progress>
      <mux-uploader-progress></mux-uploader-progress>
    `
  );
  const statusElement = conditionalRender(nostatus, '<mux-uploader-status></mux-uploader-status>');
  const retryElement = conditionalRender(noretry, '<mux-uploader-retry></mux-uploader-retry>');

  return document.createRange().createContextualFragment(`
    <${wrapper}>
      ${statusElement}
      ${retryElement}

      <mux-uploader-file-select>
        <slot name="file-select">
          ${fileSelectFragment}
        </slot>
      </mux-uploader-file-select>

      ${progressElements}
    </${wrapper}>
  `);
}
