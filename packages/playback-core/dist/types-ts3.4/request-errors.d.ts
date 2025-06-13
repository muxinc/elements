import { LoaderResponse } from 'hls.js';
import { MuxMediaPropsInternal } from './types';
import { MuxErrorCategoryValue } from './errors';
import { MediaError } from './errors';
export declare const MuxJWTAud: {
    readonly VIDEO: "v";
    readonly THUMBNAIL: "t";
    readonly STORYBOARD: "s";
    readonly DRM: "d";
};
export declare const categoryToAud: (category: MuxErrorCategoryValue) => "d" | "v" | undefined;
export declare const categoryToToken: (category: MuxErrorCategoryValue, muxMediaEl: Partial<Pick<MuxMediaPropsInternal, "drmToken" | "playbackToken" | "tokens">>) => string | undefined;
export declare const getErrorFromResponse: (resp: Pick<Response, "status" | "url"> | Pick<LoaderResponse, "code" | "url">, category: MuxErrorCategoryValue, muxMediaEl: Partial<Pick<MuxMediaPropsInternal, "playbackId" | "drmToken" | "playbackToken" | "tokens">>, fatal?: boolean, translate?: boolean, offline?: boolean) => MediaError | undefined;
