// Lib
import dayjs from 'dayjs';
import { useCallback, useMemo, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

// Store
import { authStore } from '@/lib/stores';

// Constants
import { END_POINTS, PRODUCT_STATUS, TIME_FORMAT } from '@/lib/constants';

// Services
import { getProducts, productsHttpService } from '@/lib/services';

// Interface
import { TProduct, TProductRequest, TProductResponse } from '@/lib/interfaces';

export type TSearchProduct = {
  name: string;
};

type TSortType = 'desc' | 'asc';
export type TProductSortField = 'name' | 'spent' | 'date';
type TSort = {
  field: TProductSortField | '';
  type: TSortType;
};
export type TSortProductHandler = (field: TProductSortField) => void;

export const useProducts = (queryParam?: TSearchProduct) => {
  const queryClient = useQueryClient();
  const { user } = authStore();

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

  const { name: searchName }: TSearchProduct = Object.assign(
    {
      name: '',
    },
    queryParam,
  );

  const { data = [], ...query } = useQuery({
    queryKey: [END_POINTS.PRODUCTS, searchName],
    queryFn: ({ signal }) => getProducts('', { signal }, user?.id),
  });

  // sort products
  const transactionsAfterSort: TProduct[] = useMemo(() => {
    const tempTransactions: TProduct[] = [...data];
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
          name: prevProductName,
          createdAt: prevCreatedAt,
          amount: prevAmount,
        }: TProduct,
        {
          name: nextProductName,
          createdAt: nextCreatedAt,
          amount: nextAmount,
        }: TProduct,
      ) => {
        const valueForField: Record<TProductSortField, number> = {
          name: handleSort(type, prevProductName ?? '', nextProductName ?? ''),
          spent: handleSort(
            type,
            String(prevAmount) ?? '',
            String(nextAmount) ?? '',
          ),
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
  const products: TProduct[] = useMemo((): TProduct[] => {
    const isNameMatchWith = (target: string): boolean =>
      (target || '').trim().toLowerCase().includes(searchName);

    return transactionsAfterSort.filter(({ name }: TProduct) => {
      const isMatchWithName: boolean = isNameMatchWith(name);

      return isMatchWithName;
    });
  }, [transactionsAfterSort, searchName]);

  const sortBy: TSortProductHandler = useCallback(
    (field: TProductSortField) => {
      setSortValue((prev) => ({
        field: field,
        type: sortType[prev.type],
      }));
    },
    [sortType],
  );

  const { mutate: createProduct, isPending: isCreateProduct } = useMutation({
    mutationFn: async (product: Omit<TProductRequest, '_id'>) =>
      await productsHttpService.post<TProductRequest>(
        END_POINTS.PRODUCTS,
        product,
      ),
    onSuccess: (dataResponse) => {
      const newData = JSON.parse(dataResponse.config.data);

      queryClient.setQueryData(
        [END_POINTS.PRODUCTS, searchName],
        (oldData: TProduct[]) => [newData, ...oldData],
      );
    },
  });

  const { mutate: deleteProduct, isPending: isDeleteProduct } = useMutation({
    mutationFn: async (
      payload: Partial<TProductRequest & { userId: string; productId: string }>,
    ) => {
      await productsHttpService.delete(END_POINTS.PRODUCTS, {
        data: payload,
      });
    },
    onSuccess: (_, variables) => {
      queryClient.setQueryData(
        [END_POINTS.PRODUCTS, searchName],
        (oldData: TProduct[]) =>
          oldData.filter((item) => item._id !== variables.productId),
      );
    },
  });

  const { mutate: updateProduct, isPending: isUpdateProduct } = useMutation({
    mutationFn: async (
      product: Partial<TProductRequest & { userId: string; productId: string }>,
    ) =>
      await productsHttpService.put<TProductRequest>(
        END_POINTS.PRODUCTS,
        product,
      ),
    onSuccess: (_, variables) => {
      queryClient.setQueryData(
        [END_POINTS.PRODUCTS, searchName],
        (oldData: TProductResponse[]) => {
          const dataUpdated = oldData.map((item) =>
            item._id === variables.productId
              ? {
                  ...item,
                  name: variables.name,
                  imageURLs: variables.imageURLs,
                  stock: variables.stock,
                  productStatus:
                    Number(variables.stock) > 0
                      ? PRODUCT_STATUS.IN_STOCK
                      : PRODUCT_STATUS.SOLD,
                  amount: variables.amount,
                  product: { ...variables },
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
    products,
    data: products,
    isCreateProduct,
    isDeleteProduct,
    isUpdateProduct,
    createProduct,
    deleteProduct,
    updateProduct,
    sortBy,
  };
};
