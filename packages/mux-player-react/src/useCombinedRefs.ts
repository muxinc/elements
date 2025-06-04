import { useCombinedRefs as useCombinedRefs18 } from './useCombinedRefsOld';
import { useCombinedRefs as useCombinedRefs19 } from './useCombinedRefsNew';
import { IS_REACT_19_OR_NEWER } from './common/utils';

export const useCombinedRefs = IS_REACT_19_OR_NEWER ? useCombinedRefs19 : useCombinedRefs18;
