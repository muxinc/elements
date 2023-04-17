// @ts-ignore
import theme from './classic.html';
import { document } from '../../polyfills';
import { MediaThemeElement } from 'media-chrome/dist/media-theme-element';
import { window } from 'media-chrome/dist/utils/server-safe-globals.js';

const template = document.createElement('template');
if ('innerHTML' in template) template.innerHTML = theme;

class MediaThemeClassic extends MediaThemeElement {
  static template = template.content.children[0];
}

if (!window.customElements.get('media-theme-classic')) {
  window.customElements.define('media-theme-classic', MediaThemeClassic);
}

export default MediaThemeClassic;
