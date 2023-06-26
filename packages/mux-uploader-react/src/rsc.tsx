import React from 'react';
import Mux from '@mux/mux-node';
import MuxUploaderClient from './index';

const { Video } = new Mux();

export default async function MuxUploaderServer(props: any) {
  const upload = await Video.Uploads.create({
    cors_origin: '*',
    new_asset_settings: {
      playback_policy: 'public',
    },
  });

  return <MuxUploaderClient endpoint={upload.url} {...props} />;
}
