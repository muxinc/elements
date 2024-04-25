import React from 'react';
import 'server-only';

import Mux, { MuxError, type ClientOptions } from '@mux/mux-node';

import MuxUploaderClient, {
  MuxUploaderDrop,
  MuxUploaderFileSelect,
  MuxUploaderProgress,
  MuxUploaderRetry,
  MuxUploaderStatus,
} from './index';
import type { MuxUploaderRefAttributes, MuxUploaderProps } from './index';

const getTokenMessage = (error: any) =>
  `Error creating Mux Upload. Typically, this means your MUX_TOKEN_ID or MUX_TOKEN_SECRET is missing. If they're not available in process.env, make sure they're properly passed to MuxUploader:
            
<MuxUploader clientOptions={{ tokenId: 'my_id', tokenSecret: 'my_secret' }} />

Here's the original error thrown by @mux/mux-node -- ${error}`;

const getGenericMessage = (error: any) =>
  `Error creating Mux Upload. If you're passing clientOptions, uploadCreateParams, or uploadRequestOptions to MuxUploader, double-check their values.

Here's the original error thrown by @mux/mux-node -- ${error}`;

// as our default export, the server component.
interface MuxUploaderServerProps extends MuxUploaderProps {
  clientOptions?: ClientOptions;
  uploadCreateParams?: Partial<Mux.Video.Uploads.UploadCreateParams>;
  uploadRequestOptions?: Partial<Mux.RequestOptions>;
}
const MuxUploader = React.forwardRef<MuxUploaderRefAttributes, MuxUploaderServerProps>(
  /* @ts-expect-error our version of react/typescript doesn't yet support async components */
  async ({ clientOptions, uploadCreateParams, uploadRequestOptions, endpoint, ...props }, ref) => {
    let _endpoint = endpoint;
    let uploadId: string | undefined;
    if (!_endpoint) {
      // if there's no endpoint defined, create a new direct upload
      // https://docs.mux.com/guides/upload-files-directly
      try {
        const mux = new Mux(clientOptions);
        const _uploadCreateParams: Mux.Video.Uploads.UploadCreateParams = {
          cors_origin: '*',
          ...uploadCreateParams,
          new_asset_settings: {
            playback_policy: ['public'],
            encoding_tier: 'baseline',
            ...uploadCreateParams?.new_asset_settings,
          },
        };
        const upload = await mux.video.uploads.create(_uploadCreateParams, uploadRequestOptions);
        _endpoint = upload.url;
        uploadId = upload.id;
      } catch (error) {
        if (error instanceof MuxError) {
          const message = error.message.includes('MUX_') ? getTokenMessage(error) : getGenericMessage(error);
          throw new Error(message);
        } else {
          throw error;
        }
      }
    }
    // todo: i'm a little unsure about this data-upload-id interface.
    // I want a way for consumers to access more info about the upload object
    // in case they want a client-side interaction, like onSuccess poll-to-redirect.
    return <MuxUploaderClient {...props} endpoint={_endpoint} data-upload-id={uploadId} ref={ref} />;
  }
);

export { MuxUploaderDrop, MuxUploaderFileSelect, MuxUploaderProgress, MuxUploaderRetry, MuxUploaderStatus };

export default MuxUploader;
