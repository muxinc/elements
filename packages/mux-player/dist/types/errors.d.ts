import type { DialogOptions, DevlogOptions } from './types';
import { MediaError } from '@mux/playback-core';
export declare const muxMediaErrorToDialog: (mediaError: MediaError, translate?: boolean) => DialogOptions;
export declare const muxMediaErrorToDevlog: (mediaError: MediaError, _translate?: boolean | undefined) => DevlogOptions;
export declare function getErrorLogs(error: MediaError, translate?: boolean): {
    dialog: DialogOptions;
    devlog: DevlogOptions;
};
