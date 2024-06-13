import dayjs from 'dayjs';
import { useCallback, useMemo, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

// Constants
import { END_POINTS, TIME_FORMAT, TRANSACTION_STATUS } from '@/lib/constants';

// Stores
import { authStore } from '../stores';

// Services
import { mainHttpService } from '@/lib/services';

// Utils
import { handleSort, logActivity } from '../utils';

// Types
import {
  EActivity,
  IDataList,
  SortType,
  TAddress,
  TCustomer,
  TTransaction,
} from '@/lib/interfaces';

export type TSearchTransaction = {
  name: string;
  month?: string;
};

export type TSortField =
  | 'name'
  | 'email'
  | 'location'
  | 'spent'
  | 'role'
  | 'date';
type TSort = {
  field: TSortField | '';
  type: SortType;
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

  const sortType: Record<SortType, SortType> = useMemo(
    () => ({
      desc: SortType.ASC,
      asc: SortType.DESC,
    }),
    [],
  );

  const [sortValue, setSortValue] = useState<TSort>({
    field: '',
    type: SortType.ASC,
  });

  const { data, ...query } = useQuery<{ data: TTransaction[] }>({
    queryKey: [END_POINTS.TRANSACTIONS, searchName, searchMonth],
    queryFn: async ({ signal }) =>
      mainHttpService.get({
        path: END_POINTS.TRANSACTIONS,
        configs: { signal },
        userId: user?.id,
      }),
  });

  const transactionData = data?.data || [];

  //  sort transactions
  const transactionsAfterSort: TTransaction[] = useMemo(() => {
    const tempTransactions: TTransaction[] = [...transactionData];
    const { field, type } = sortValue;

    if (!field) return transactionData;

    tempTransactions.sort(
      (
        {
          customer: {
            firstName: prevFirstName,
            lastName: prevLastName,
            email: prevEmail,
            role: prevRole,
            address: { city: prevCity, street: prevStreet },
          },
          createdAt: prevCreatedAt,
          amount: prevAmount,
        }: TTransaction,
        {
          customer: {
            firstName: nextFirstName,
            lastName: nextLastName,
            email: nextEmail,
            role: nextRole,
            address: { city: nextCity, street: nextStreet },
          },
          createdAt: nextCreatedAt,
          amount: nextAmount,
        }: TTransaction,
      ) => {
        const prevName = `${prevFirstName} ${prevLastName}`;
        const nextName = `${nextFirstName} ${nextLastName}`;
        const prevAddress = `${prevStreet} ${prevCity}`;
        const nextAddress = `${nextStreet} ${nextCity}`;

        const valueForField: Record<TSortField, number> = {
          name: handleSort(type, prevName ?? '', nextName ?? ''),
          email: handleSort(type, prevEmail ?? '', nextEmail ?? ''),
          location: handleSort(type, prevAddress ?? '', nextAddress ?? ''),
          spent: handleSort(type, prevAmount ?? 0, nextAmount ?? 0),
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
  }, [sortValue, transactionData]);

  /**
   * TODO: Since the API is imprecise we will use this method for now.
   * TODO: Will be removed in the future and will use queryKey for re-fetching
   */
  const transactions: TTransaction[] = useMemo((): TTransaction[] => {
    const isNameMatchWith = (target: string): boolean =>
      (target || '').trim().toLowerCase().includes(searchName);

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
      mutationFn: (
        transaction: Partial<
          TTransaction & TCustomer & TAddress & { transactionId: string }
        >,
      ) =>
        mainHttpService.put<TTransaction>({
          path: END_POINTS.EDIT_TRANSACTION,
          data: transaction,
          actionName: EActivity.UPDATE_TRANSACTION,
          onActivity: logActivity,
          userId: user?.id,
        }),

      onSuccess: (_, variables) => {
        queryClient.setQueryData(
          [END_POINTS.TRANSACTIONS, searchName, searchMonth],
          (oldData: { data: TTransaction[] }) => {
            const dataUpdated = oldData.data.map((item) =>
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
            return { data: dataUpdated };
          },
        );
      },
    });

  const { mutate: deleteTransaction, isPending: isDeleteTransaction } =
    useMutation({
      mutationFn: (
        transaction: Partial<
          TTransaction & TCustomer & TAddress & { transactionId: string }
        >,
      ) =>
        mainHttpService.put<TTransaction>({
          path: END_POINTS.DELETE_TRANSACTION,
          data: transaction,
          actionName: EActivity.DELETE_TRANSACTION,
          userId: user?.id,
          onActivity: logActivity,
        }),
      onSuccess: (_, variables) => {
        queryClient.setQueryData(
          [END_POINTS.TRANSACTIONS, searchName, searchMonth],
          (oldData: { data: TTransaction[] }) => {
            const dataUpdated = oldData.data.map((item) =>
              item._id === variables.transactionId
                ? {
                    ...item,
                    transactionStatus: TRANSACTION_STATUS.ARCHIVED,
                  }
                : item,
            );
            return { data: dataUpdated };
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
