// @ts-ignore
import theme from './2023.html';
import { document, globalThis } from '../../polyfills';
import { MediaThemeElement } from 'media-chrome/dist/media-theme-element.js';

const template = document.createElement('template');
if ('innerHTML' in template) template.innerHTML = theme;

class MediaTheme2023 extends MediaThemeElement {
  static template = template.content?.children?.[0];
}

if (!globalThis.customElements.get('media-theme-2023')) {
  globalThis.customElements.define('media-theme-2023', MediaTheme2023);
}

export default MediaTheme2023;
