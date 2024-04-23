// Lib
import dayjs from 'dayjs';
import { useCallback, useMemo, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

// Store
import { authStore } from '@/lib/stores';

// Constants
import {
  END_POINTS,
  PAGE_SIZE,
  PRODUCT_STATUS,
  TIME_FORMAT,
} from '@/lib/constants';

// Services
import {
  TProductsResponse,
  getProducts,
  productsHttpService,
} from '@/lib/services';

// Interface
import {
  EActivity,
  SortType,
  TProduct,
  TProductRequest,
} from '@/lib/interfaces';

// Utils
import { formatPageArray, handleSort, logActivity } from '../utils';

export type TSearchProduct = {
  name: string;
};

export type TProductSortField = 'name' | 'price' | 'date' | 'quantity';
type TSort = {
  field: TProductSortField | '';
  type: SortType;
};
export type TProductSortHandler = (field: TProductSortField) => void;

export const useProducts = (queryParam?: TSearchProduct) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(PAGE_SIZE);
  const queryClient = useQueryClient();
  const { user } = authStore();

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

  const { name: searchName }: TSearchProduct = Object.assign(
    {
      name: '',
    },
    queryParam,
  );

  const { data, ...query } = useQuery<TProductsResponse>({
    queryKey: [END_POINTS.PRODUCTS, searchName, currentPage, limit],
    queryFn: ({ signal }) =>
      getProducts('', { signal }, user?.id, currentPage, limit),
  });

  const productData: TProduct[] = data?.result || [];
  const totalPage = data?.totalPage as number;

  const arrOfCurrButtons: number[] = Array.from(
    { length: totalPage },
    (_, index) => index,
  );

  const pageArray = formatPageArray({
    totalPage,
    currentPage,
    arrOfCurrButtons,
  });

  const isDisableNext = currentPage === totalPage || currentPage < 1;

  const isDisablePrev = currentPage <= 1;

  const resetPage = useCallback(() => setCurrentPage(1), []);

  // sort products
  const productsAfterSort: TProduct[] = useMemo(() => {
    const tempProducts: TProduct[] = [...productData];
    const { field, type } = sortValue;

    if (!field) return productData;

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
  }, [productData, sortValue]);

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
        user?.id,
      );

      return await productsHttpService
        .post<TProductRequest>(END_POINTS.PRODUCTS, product)
        .then((response) => {
          productsHttpService.interceptors.response.eject(activity);
          return response;
        });
    },
    onSuccess: (dataResponse) => {
      const newData = JSON.parse(dataResponse.config.data);

      queryClient.setQueryData(
        [END_POINTS.PRODUCTS, searchName, currentPage, limit],
        (oldData: TProductsResponse) => ({
          result: [newData, ...(oldData?.result || [])],
          totalPage: oldData.totalPage,
        })
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
        user?.id,
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
        [END_POINTS.PRODUCTS, searchName, currentPage, limit],
        (oldData: TProductsResponse) => ({
          result: oldData.result.filter((item) => item._id !== variables.productId),
          totalPage: oldData.totalPage,
        })
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
        user?.id,
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
        [END_POINTS.PRODUCTS, searchName, currentPage, limit],
        (oldData: TProductsResponse) => ({
          result: oldData.result.map((item) =>
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
          ),
          totalPage: oldData.totalPage
        })
      );
    },
  });

  return {
    ...query,
    limit,
    currentPage,
    products,
    data: products,
    isCreateProduct,
    isDeleteProduct,
    isUpdateProduct,
    pageArray,
    isDisableNext,
    isDisablePrev,
    createProduct,
    deleteProduct,
    updateProduct,
    sortBy,
    setLimit,
    resetPage,
    setCurrentPage,
  };
};
