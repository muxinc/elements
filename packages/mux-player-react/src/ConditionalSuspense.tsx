import * as React from 'react';

type Props = {
  fallback: React.ReactChild | React.ReactFragment | React.ReactPortal | null;
  condition: boolean;
  children: React.ReactNode;
};
const ConditionalSuspense = ({ condition, fallback, children, ...rest }: Props) => {
  return condition ? (
    <React.Suspense fallback={fallback} {...rest}>
      {children}
    </React.Suspense>
  ) : (
    <>{fallback}</>
  );
};

export default ConditionalSuspense;
