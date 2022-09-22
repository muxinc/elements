import React from 'react';
import Suspense from './BrowserOnlySuspense';

const MuxPlayerIndex = React.lazy(() => import('./index'));

// TODO
// - types
// - fallback

const MuxPlayer = React.forwardRef<any, any>((props, ref) => (
  <Suspense fallback={false}>
    <MuxPlayerIndex {...props} ref={ref} />
  </Suspense>
));

export default MuxPlayer;
