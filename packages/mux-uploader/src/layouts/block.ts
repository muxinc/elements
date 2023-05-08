import { document } from '../polyfills';

import '../mux-uploader-file-select';
import { fileSelectFragment } from '../mux-uploader-file-select';
import MuxUploaderElement from '../mux-uploader';

function conditionalRender(flag: boolean | undefined, component: string): string {
  return flag ? '' : component;
}

export default function blockLayout(contextElement: MuxUploaderElement): DocumentFragment {
  const { noDrop, noProgress, noStatus, noRetry } = contextElement;
  const wrapper = noDrop ? 'div' : 'mux-uploader-drop overlay';
  const progressElements = conditionalRender(
    noProgress,
    `
      <mux-uploader-progress part="progress" type="percentage"></mux-uploader-progress>
      <mux-uploader-progress part="progress"></mux-uploader-progress>
    `
  );
  const statusElement = conditionalRender(noStatus, '<mux-uploader-status part="status"></mux-uploader-status>');
  const retryElement = conditionalRender(noRetry, '<mux-uploader-retry part="retry"></mux-uploader-retry>');

  return document.createRange().createContextualFragment(`
    <${wrapper}>
      ${statusElement}
      ${retryElement}

      <mux-uploader-file-select part="file-select">
        <slot name="file-select">
          ${fileSelectFragment}
        </slot>
      </mux-uploader-file-select>

      ${progressElements}
    </${wrapper}>
  `);
}
