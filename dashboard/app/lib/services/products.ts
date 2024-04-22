import axios, { AxiosInstance } from 'axios';

// Constants
import { END_POINTS, PAGE_SIZE } from '@/lib/constants';

// Types
import { IAxiosConfig, TProduct } from '@/lib/interfaces';

export const productsHttpService: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API,
});

export type TProducts = {
  result: Array<TProduct>;
  totalPage: number
}

export const getProducts = async (
  searchParam?: string,
  config?: IAxiosConfig,
  userId?: string,
  page = 1,
  limit = PAGE_SIZE,
): Promise<TProducts> => (
  await productsHttpService.get(
    `${END_POINTS.PRODUCTS}/${userId}/${page}/${limit}${searchParam || ''}`,
    config,
  )
).data;

