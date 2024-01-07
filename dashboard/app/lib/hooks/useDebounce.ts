import { MutableRefObject, useCallback, useRef, DependencyList } from 'react';

// Constants
import { DEBOUNCE_TIME } from '@/lib/constants';

export const useDebounce = <TParam = unknown>(
  callback: (...args: TParam[]) => void,
  dependencies: DependencyList,
) => {
  const refTime: MutableRefObject<NodeJS.Timeout | null> = useRef(null);

  return useCallback((...args: TParam[]) => {
    if (refTime.current) clearTimeout(refTime.current);

    refTime.current = setTimeout(() => {
      callback(...args);
    }, DEBOUNCE_TIME);
  }, dependencies);
};
