import React from 'react';
type Props = {
    fallback: React.ReactChild | React.ReactFragment | React.ReactPortal | null;
    condition: boolean;
    children: React.ReactNode;
};
declare const ConditionalSuspense: ({ condition, fallback, children, ...rest }: Props) => React.JSX.Element;
export default ConditionalSuspense;
