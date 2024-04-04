import axios, { AxiosInstance } from 'axios';

// Constants
import { END_POINTS } from '@/lib/constants';

// Types
import { IAxiosConfig, TTransaction } from '@/lib/interfaces';

export const transactionHttpService: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_TRANSACTION,
});

export const getTransactions = async (
  searchParam?: string,
  config?: IAxiosConfig,
  userId?: string,
): Promise<TTransaction[]> => {
  transactionHttpService.interceptors.response.clear();

  return (
    await transactionHttpService.get(
      `${END_POINTS.TRANSACTIONS}/${userId}${searchParam || ''}`,
      config,
    )
  ).data;
};
