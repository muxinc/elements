import React, { Suspense } from 'react';

import useIsBrowser from './useIsBrowser';

type Props = {
  fallback: React.ReactChild | React.ReactFragment | React.ReactPortal | null;
  children: React.ReactNode;
};
// Suspense isn't available on the server in React 17,
const BrowserOnlySuspense = ({ fallback, children, ...rest }: Props) => {
  const isBrowser = useIsBrowser();

  return isBrowser ? (
    <Suspense fallback={fallback} {...rest}>
      {children}
    </Suspense>
  ) : (
    <>{fallback}</>
  );
};

export default BrowserOnlySuspense;
