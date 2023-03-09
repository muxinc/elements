import { document } from '../polyfills';

import '../mux-uploader-file-select';
import { fileSelectFragment } from '../mux-uploader-file-select';

const styles = `
:host {
  font-family: var(--uploader-font-family, Arial);
  font-size: var(--uploader-font-size, 16px);
  background-color: var(--uploader-background-color, inherit);
}

input[type="file"] {
  display: none;
}
`;

const template = document.createElement('template');

template.innerHTML = `
<style>
  ${styles}
</style>

<input id="hidden-file-input" type="file" />
<mux-uploader-sr-text></mux-uploader-sr-text>

<mux-uploader-status></mux-uploader-status>
<mux-uploader-retry></mux-uploader-retry>

<mux-uploader-file-select>
  <slot name="file-select">
    ${fileSelectFragment}
  </slot>
</mux-uploader-file-select>

<mux-uploader-progress type="percentage"></mux-uploader-progress>
<mux-uploader-progress></mux-uploader-progress>
`;

export default template;
