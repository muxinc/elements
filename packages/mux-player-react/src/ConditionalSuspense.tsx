import React, { Suspense } from 'react';

type Props = {
  fallback: React.ReactChild | React.ReactFragment | React.ReactPortal | null;
  condition: boolean;
  children: React.ReactNode;
};
const ConditionalSuspense = ({ condition, fallback, children, ...rest }: Props) => {
  return condition ? (
    <Suspense fallback={fallback} {...rest}>
      {children}
    </Suspense>
  ) : (
    <>{fallback}</>
  );
};

export default ConditionalSuspense;
