import { document } from 'shared-polyfills';

import '../mux-uploader-file-select';
import { fileSelectFragment } from '../mux-uploader-file-select';

const template = document.createElement('template');

template.innerHTML = /*html*/ `
<style>
</style>

<mux-uploader-drop overlay>
  <mux-uploader-status></mux-uploader-status>
  <mux-uploader-retry></mux-uploader-retry>

  <mux-uploader-file-select>
    <slot name="file-select">
      ${fileSelectFragment}
    </slot>
  </mux-uploader-file-select>

  <mux-uploader-progress type="percentage"></mux-uploader-progress>
  <mux-uploader-progress></mux-uploader-progress>
</mux-uploader-drop>
`;

export default template;
