import { useCallback } from 'react';
import {
  ReadonlyURLSearchParams,
  usePathname,
  useRouter,
  useSearchParams,
} from 'next/navigation';

export type TUseSearchParams = ReadonlyURLSearchParams & {
  setSearchParam: (key: string, value: string) => void;
};

export const useSearch = () => {
  const pathName: string = usePathname();
  const router: ReturnType<typeof useRouter> = useRouter();
  const searchParams: ReadonlyURLSearchParams = useSearchParams();

  /**
   * Handle set search param on url
   * @param key search param name
   * @param value search param value
   */
  const setSearchParam = useCallback(
    (key: string, value: string): void => {
      let newSearchParams: string = '?';
      let isUpdateKey: boolean = false;

      searchParams.forEach((oldValue: string, oldKey: string) => {
        if (!value) return;

        if (oldKey === key) {
          isUpdateKey = true;
          newSearchParams += `${oldKey}=${value}&`;

          return;
        }

        newSearchParams += `${oldKey}=${oldValue}&`;
      });

      if (isUpdateKey) {
        newSearchParams = newSearchParams.substring(
          0,
          newSearchParams.length - 1,
        );
      } else if (value) {
        newSearchParams += `${key}=${value}`;
      }

      router.push(`${pathName}${newSearchParams}`, { scroll: false });
    },

    [pathName, router, searchParams],
  );

  return {
    ...searchParams,
    setSearchParam,
  } as TUseSearchParams;
};
