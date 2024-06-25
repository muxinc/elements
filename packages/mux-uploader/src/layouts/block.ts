import { document } from '../polyfills';

import '../mux-uploader-drop';
import '../mux-uploader-progress';
import '../mux-uploader-status';
import '../mux-uploader-retry';
import '../mux-uploader-pause';
import '../mux-uploader-file-select';
import { fileSelectFragment } from '../mux-uploader-file-select';
import MuxUploaderElement from '../mux-uploader';

function conditionalRender(flag: boolean | undefined, component: string): string {
  return flag ? '' : component;
}

const attributeRender = (name: string, value: any): string => {
  if (value == null || value === false) return '';
  const valueStr = value === true ? '' : `${value}`;
  return `${name}="${valueStr}"`;
};

export default function blockLayout(contextElement: MuxUploaderElement): DocumentFragment {
  const { noDrop, noProgress, noStatus, noRetry, pausable, type } = contextElement;
  const wrapper = noDrop ? 'div' : 'mux-uploader-drop overlay part="drop"';
  const progressElements = conditionalRender(
    noProgress,
    `
      <mux-uploader-progress part="progress progress-percentage" type="percentage"></mux-uploader-progress>
      <mux-uploader-progress part="progress progress-bar" ${attributeRender('type', type)}></mux-uploader-progress>
    `
  );
  const statusElement = conditionalRender(noStatus, '<mux-uploader-status part="status"></mux-uploader-status>');
  const retryElement = conditionalRender(noRetry, '<mux-uploader-retry part="retry"></mux-uploader-retry>');
  const pauseElement = conditionalRender(!pausable, '<mux-uploader-pause part="pause"></mux-uploader-pause>');

  return document.createRange().createContextualFragment(`
    <${wrapper}>
      ${statusElement}
      ${retryElement}
      ${pauseElement}

      <mux-uploader-file-select part="file-select">
        <slot name="file-select">
          ${fileSelectFragment}
        </slot>
      </mux-uploader-file-select>

      ${progressElements}
    </${wrapper}>
  `);
}
