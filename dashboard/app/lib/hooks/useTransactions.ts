import dayjs from 'dayjs';
import { useCallback, useMemo, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

// Services
import { getTransactions, transactionHttpService } from '@/lib/services';

// Constants
import { END_POINTS, TIME_FORMAT, TRANSACTION_STATUS } from '@/lib/constants';

// Types
import {
  EActivity,
  IDataList,
  TAddress,
  TCustomer,
  TTransaction,
} from '@/lib/interfaces';

// Stores
import { authStore } from '../stores';
import { logActivity } from '../utils';

export type TSearchTransaction = {
  name: string;
  month?: string;
};

type TSortType = 'desc' | 'asc';
export type TSortField =
  | 'name'
  | 'email'
  | 'location'
  | 'spent'
  | 'role'
  | 'date';
type TSort = {
  field: TSortField | '';
  type: TSortType;
};
export type TSortHandler = (field: TSortField) => void;

export const useTransactions = (queryParam?: TSearchTransaction) => {
  const queryClient = useQueryClient();
  const { user } = authStore();

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
    queryFn: ({ signal }) => getTransactions('', { signal }, user?.id),
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
      const convertPreValue: string = prevValue.toString().trim().toLowerCase();
      const convertNextValue: string = nextValue
        .toString()
        .trim()
        .toLowerCase();

      if (type === 'asc') {
        if (convertPreValue > convertNextValue) return 1;

        if (convertPreValue < convertNextValue) return -1;
      }

      if (type === 'desc') {
        if (convertPreValue > convertNextValue) return -1;

        if (convertPreValue < convertNextValue) return 1;
      }

      return 0;
    };

    tempTransactions.sort(
      (
        {
          customer: {
            firstName: prevCustomerName,
            email: prevEmail,
            role: prevRole,
            address: { state: prevState },
          },
          createdAt: prevCreatedAt,
          amount: prevAmount,
        }: TTransaction,
        {
          customer: {
            firstName: nextCustomerName,
            email: nextEmail,
            role: nextRole,
            address: { state: nextState },
          },
          createdAt: nextCreatedAt,
          amount: nextAmount,
        }: TTransaction,
      ) => {
        const valueForField: Record<TSortField, number> = {
          name: handleSort(
            type,
            prevCustomerName ?? '',
            nextCustomerName ?? '',
          ),
          email: handleSort(type, prevEmail ?? '', nextEmail ?? ''),
          location: handleSort(type, prevState ?? '', nextState ?? ''),
          spent: handleSort(type, prevAmount ?? '', nextAmount ?? ''),
          role: handleSort(type, prevRole ?? '', nextRole ?? ''),
          date: handleSort(
            type,
            dayjs(prevCreatedAt).format(TIME_FORMAT) ?? '',
            dayjs(nextCreatedAt).format(TIME_FORMAT) ?? '',
          ),
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
      ({
        customer: {
          firstName,
          lastName,
          email,
          address: { street, state },
        },
      }: TTransaction) => {
        const isMatchWithName: boolean = isNameMatchWith(
          `${firstName} ${lastName}`,
        );
        const isMatchWithEmail: boolean = isNameMatchWith(email);
        const isMatchWithLocation: boolean = isNameMatchWith(
          `${street} ${state}`,
        );

        return isMatchWithEmail || isMatchWithLocation || isMatchWithName;
      },
    );
  }, [transactionsAfterSort, searchName]);

  const { dataTransaction, dataHistory } = transactions.reduce<IDataList>(
    (dataList, transaction) => {
      if (transaction.transactionStatus === TRANSACTION_STATUS.ARCHIVED) {
        dataList.dataHistory.push(transaction);
      } else {
        dataList.dataTransaction.push(transaction);
      }
      return dataList;
    },
    { dataTransaction: [], dataHistory: [] },
  );

  const sortBy: TSortHandler = useCallback(
    (field: TSortField) => {
      setSortValue((prev) => ({
        field: field,
        type: sortType[prev.type],
      }));
    },
    [sortType],
  );

  const { mutate: updateTransaction, isPending: isUpdateTransaction } =
    useMutation({
      mutationFn: async (
        transaction: Partial<
          TTransaction & TCustomer & TAddress & { transactionId: string }
        >,
      ) => {
        const activity = logActivity(
          transactionHttpService,
          EActivity.UPDATE_TRANSACTION,
          user?.id
        );

        return await transactionHttpService
          .put<TTransaction>(END_POINTS.EDIT_TRANSACTION, transaction)
          .then((response) => {
            transactionHttpService.interceptors.response.eject(activity);
            return response;
          });
      },
      onSuccess: (_, variables) => {
        queryClient.setQueryData(
          [END_POINTS.TRANSACTIONS, searchName, searchMonth],
          (oldData: TTransaction[]) => {
            const dataUpdated = oldData.map((item) =>
              item._id === variables.transactionId
                ? {
                  ...item,
                  customer: {
                    ...item.customer,
                    firstName: variables.firstName,
                    lastName: variables.lastName,
                    address: {
                      state: variables.state,
                      street: variables.street,
                      city: variables.city,
                      zip: variables.zip,
                    },
                  },
                }
                : item,
            );
            return dataUpdated;
          },
        );
      },
    });

  const { mutate: deleteTransaction, isPending: isDeleteTransaction } =
    useMutation({
      mutationFn: async (
        transaction: Partial<
          TTransaction & TCustomer & TAddress & { transactionId: string }
        >,
      ) => {
        const activity = logActivity(
          transactionHttpService,
          EActivity.DELETE_TRANSACTION,
          user?.id
        );

        return await transactionHttpService
          .put<TTransaction>(END_POINTS.DELETE_TRANSACTION, transaction)
          .then((response) => {
            transactionHttpService.interceptors.response.eject(activity);
            return response;
          });
      },
      onSuccess: (_, variables) => {
        queryClient.setQueryData(
          [END_POINTS.TRANSACTIONS, searchName, searchMonth],
          (oldData: TTransaction[]) => {
            const dataUpdated = oldData.map((item) =>
              item._id === variables.transactionId
                ? {
                  ...item,
                  transactionStatus: TRANSACTION_STATUS.ARCHIVED,
                }
                : item,
            );
            return dataUpdated;
          },
        );
      },
    });

  return {
    ...query,
    isDeleteTransaction,
    isUpdateTransaction,
    data: transactions,
    dataTransaction,
    dataHistory,
    sortBy,
    updateTransaction,
    deleteTransaction,
  };
};
