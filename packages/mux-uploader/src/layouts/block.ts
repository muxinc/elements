import { document } from '../polyfills';

import '../mux-uploader-file-select';
import { fileSelectFragment } from '../mux-uploader-file-select';

export default function blockLayout(noDrop: boolean) {
  const wrapper = noDrop ? 'div' : 'mux-uploader-drop overlay';

  return document.createRange().createContextualFragment(`
    <style>
      /* Add your styles here */
    </style>

    <${wrapper}>
      <mux-uploader-status></mux-uploader-status>
      <mux-uploader-retry></mux-uploader-retry>

      <mux-uploader-file-select>
        <slot name="file-select">
          ${fileSelectFragment}
        </slot>
      </mux-uploader-file-select>

      <mux-uploader-progress type="percentage"></mux-uploader-progress>
      <mux-uploader-progress></mux-uploader-progress>
    </${wrapper}>
  `);
}
