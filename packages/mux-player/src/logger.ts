import { i18n } from './utils';
import type { DevlogOptions } from './types';

export function log(...args: any[]) {
  console.log('[mux-player]', ...args);
}

export function warn(...args: any[]) {
  console.warn('[mux-player]', ...args);
}

export function error(...args: any[]) {
  console.error('[mux-player]', ...args);
}

export function devlog(opts: DevlogOptions) {
  let message = opts.message ?? '';
  if (opts.file) {
    const githubErrorsBase = 'https://github.com/muxinc/elements/main/errors/';
    message += ` ${i18n`Read more: `}\n${githubErrorsBase}${opts.file}`;
  }
  warn(message);
}
