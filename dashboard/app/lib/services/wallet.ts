import axios, { AxiosInstance } from 'axios';

// Constants
import { END_POINTS } from '@/lib/constants';

// Types
import { IAxiosConfig, TWallet } from '@/lib/interfaces';

export const walletHttpRequest: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API,
});

export const getUserWallet = async (
  userId?: string,
  config?: IAxiosConfig,
): Promise<TWallet> =>
  (await walletHttpRequest.get(`${END_POINTS.MY_WALLET}/${userId}`, config))
    .data;
