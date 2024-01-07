import { useCallback, useMemo, useState } from 'react';
import { useQuery } from '@tanstack/react-query';

// Services
import { getTransactions } from '@/lib/services';

// Constants
import { END_POINTS } from '@/lib/constants';

// Types
import { TTransaction } from '@/lib/interfaces';

export type TSearchTransaction = {
  name: string;
  month?: string;
};

type TSortType = 'desc' | 'asc';
export type TSortField = 'name' | 'email' | 'location' | 'spent';
type TSort = {
  field: TSortField | '';
  type: TSortType;
};
export type TSortHandler = (field: TSortField) => void;

export const useTransactions = (queryParam?: TSearchTransaction) => {
  const { name: searchName, month: searchMonth }: TSearchTransaction =
    Object.assign(
      {
        name: '',
        month: '',
      },
      queryParam,
    );

  const sortType: Record<TSortType, TSortType> = useMemo(
    () => ({
      desc: 'asc',
      asc: 'desc',
    }),
    [],
  );

  const [sortValue, setSortValue] = useState<TSort>({
    field: '',
    type: 'asc',
  });

  const { data = [], ...query } = useQuery({
    queryKey: [END_POINTS.TRANSACTIONS, searchName, searchMonth],
    queryFn: ({ signal }) => getTransactions('', { signal }),
  });

  //  sort transactions
  const transactionsAfterSort: TTransaction[] = useMemo(() => {
    const tempTransactions: TTransaction[] = [...data];
    const { field, type } = sortValue;

    if (!field) return data;

    const handleSort = (
      type: TSortType,
      prevValue: string,
      nextValue: string,
    ): number => {
      if (type === 'asc') {
        if (prevValue.trim() > nextValue.trim()) return 1;

        if (prevValue.trim() < nextValue.trim()) return -1;
      }

      if (type === 'desc') {
        if (prevValue.trim() > nextValue.trim()) return -1;

        if (prevValue.trim() < nextValue.trim()) return 1;
      }

      return 0;
    };

    tempTransactions.sort(
      (
        {
          customer: {
            name: prevCustomerName,
            email: prevEmail,
            location: prevLocation,
          },
          amount: prevAmount,
        }: TTransaction,
        {
          customer: {
            name: nextCustomerName,
            email: nextEmail,
            location: nextLocation,
          },
          amount: nextAmount,
        }: TTransaction,
      ) => {
        const valueForField: Record<TSortField, number> = {
          name: handleSort(type, prevCustomerName, nextCustomerName),
          email: handleSort(type, prevEmail, nextEmail),
          location: handleSort(type, prevLocation, nextLocation),
          spent: handleSort(type, prevAmount, nextAmount),
        };

        return valueForField[field] ?? 0;
      },
    );

    return tempTransactions;
  }, [data, sortValue]);

  /**
   * TODO: Since the API is imprecise we will use this method for now.
   * TODO: Will be removed in the future and will use queryKey for re-fetching
   */
  const transactions: TTransaction[] = useMemo((): TTransaction[] => {
    const isNameMatchWith = (target: string): boolean =>
      (target || '').trim().includes(searchName);

    return transactionsAfterSort.filter(
      ({ customer: { name, email, location } }: TTransaction) => {
        const isMatchWithName: boolean = isNameMatchWith(name);
        const isMatchWithEmail: boolean = isNameMatchWith(email);
        const isMatchWithLocation: boolean = isNameMatchWith(location);

        return isMatchWithEmail || isMatchWithLocation || isMatchWithName;
      },
    );
  }, [transactionsAfterSort, searchName]);

  const sortBy: TSortHandler = useCallback(
    (field: TSortField) => {
      setSortValue((prev) => ({
        field: field,
        type: sortType[prev.type],
      }));
    },
    [sortType],
  );

  return {
    ...query,
    data: transactions,
    sortBy,
  };
};
