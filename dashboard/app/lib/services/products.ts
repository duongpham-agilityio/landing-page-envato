import axios, { AxiosInstance } from 'axios';

// Constants
import { END_POINTS } from '@/lib/constants';

// Types
import { IAxiosConfig, TProduct } from '@/lib/interfaces';

export const productsHttpService: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API,
});

export const getProducts = async (
  searchParam?: string,
  config?: IAxiosConfig,
  userId?: string,
  page = 1,
): Promise<TProduct[]> => {
  productsHttpService.interceptors.response.clear();

  return (
    await productsHttpService.get(
      `${END_POINTS.PRODUCTS}/${userId}/${page}${searchParam || ''}`,
      config,
    )
  ).data.result;
};
