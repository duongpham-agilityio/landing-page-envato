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
import {
  EActivity,
  TProduct,
  TProductRequest,
  TProductResponse,
} from '@/lib/interfaces';

// Utils
import { logActivity } from '../utils';

export type TSearchProduct = {
  name: string;
};

type TSortType = 'desc' | 'asc';
export type TProductSortField = 'name' | 'price' | 'date' | 'quantity';
type TSort = {
  field: TProductSortField | '';
  type: TSortType;
};
export type TProductSortHandler = (field: TProductSortField) => void;

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
  const productsAfterSort: TProduct[] = useMemo(() => {
    const tempProducts: TProduct[] = [...data];
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

    tempProducts.sort(
      (
        {
          name: prevProductName,
          createdAt: prevCreatedAt,
          amount: prevAmount,
          stock: prevQuantity,
        }: TProduct,
        {
          name: nextProductName,
          createdAt: nextCreatedAt,
          amount: nextAmount,
          stock: nextQuantity,
        }: TProduct,
      ) => {
        const valueForField: Record<TProductSortField, number> = {
          name: handleSort(type, prevProductName ?? '', nextProductName ?? ''),
          price: handleSort(
            type,
            String(prevAmount) ?? '',
            String(nextAmount) ?? '',
          ),
          quantity: handleSort(
            type,
            String(prevQuantity) ?? '',
            String(nextQuantity) ?? '',
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

    return tempProducts;
  }, [data, sortValue]);

  /**
   * TODO: Since the API is imprecise we will use this method for now.
   * TODO: Will be removed in the future and will use queryKey for re-fetching
   */
  const products: TProduct[] = useMemo((): TProduct[] => {
    const isNameMatchWith = (target: string): boolean =>
      (target || '').trim().toLowerCase().includes(searchName);

    return productsAfterSort.filter(({ name }: TProduct) => {
      const isMatchWithName: boolean = isNameMatchWith(name);

      return isMatchWithName;
    });
  }, [productsAfterSort, searchName]);

  const sortBy: TProductSortHandler = useCallback(
    (field: TProductSortField) => {
      setSortValue((prev) => ({
        field: field,
        type: sortType[prev.type],
      }));
    },
    [sortType],
  );

  const { mutate: createProduct, isPending: isCreateProduct } = useMutation({
    mutationFn: async (product: Omit<TProductRequest, '_id'>) => {
      const activity = logActivity(
        productsHttpService,
        EActivity.CREATE_PRODUCT,
        user?.id
      );

      return await productsHttpService
        .post<TProductRequest>(END_POINTS.PRODUCTS, product)
        .then((response) => {
          productsHttpService.interceptors.response.eject(activity);
          return response;
        });
    },
    onSuccess: (dataResponse) => {
      queryClient.invalidateQueries({
        queryKey: [END_POINTS.PRODUCTS],
      });
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
      const activity = logActivity(
        productsHttpService,
        EActivity.DELETE_PRODUCT,
        user?.id
      );

      return await productsHttpService
        .delete(END_POINTS.PRODUCTS, {
          data: payload,
        })
        .then((response) => {
          productsHttpService.interceptors.response.eject(activity);
          return response;
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
    ) => {
      const activity = logActivity(
        productsHttpService,
        EActivity.UPDATE_PRODUCT,
        user?.id
      );

      return await productsHttpService
        .put<TProductRequest>(END_POINTS.PRODUCTS, product)
        .then((response) => {
          productsHttpService.interceptors.response.eject(activity);
          return response;
        });
    },
    onSuccess: async (_, variables) => {
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
