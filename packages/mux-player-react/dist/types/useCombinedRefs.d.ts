import type { MutableRefObject, ForwardedRef } from 'react';
type Maybe<T> = T | null | undefined;
type RefCb<T> = (instance: Maybe<T>) => void;
type RefObj<T> = MutableRefObject<Maybe<T>>;
type RefTypes<T> = RefObj<T> | RefCb<T> | ForwardedRef<T>;
interface useCombinedRefs {
    <T>(...refs: Maybe<RefTypes<T>>[]): RefObj<T>;
}
export declare const useCombinedRefs: useCombinedRefs;
declare const defaultUseCombinedRefs: useCombinedRefs;
export default defaultUseCombinedRefs;
