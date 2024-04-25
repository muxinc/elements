import MuxUploader from '@mux/mux-uploader-react/rsc';
import { Metadata } from "next";


export const metadata: Metadata = {
  title: "<MuxUploader /> Server Component Demo"
}
function MuxUploaderPage() {
  return (
    <MuxUploader id="my-uploader" uploadCreateParams={{
      cors_origin: '*',
      new_asset_settings: {
        playback_policy: ['public'],
        encoding_tier: 'baseline',
        test: true
      }
    }} />
  );
}

export default MuxUploaderPage;
