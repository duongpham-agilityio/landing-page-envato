import axios, { AxiosInstance } from 'axios';

// Constants
import { END_POINTS } from '@/lib/constants';

// Types
import {
  IAxiosConfig,
  TAddMoney,
  TRecentActivities,
  TSendMoney,
} from '@/lib/interfaces';
import { recentActivitiesHttpService } from '.';

export const moneyHttpRequest: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API,
});

export type TMoneyResponse = {
  message: string;
};

export const addMoneyToUser = async (
  actionName: string,
  data?: TAddMoney | undefined,
  userId?: string,
  config?: IAxiosConfig,
): Promise<TMoneyResponse> => {
  await recentActivitiesHttpService.post<TRecentActivities>(
    END_POINTS.RECENT_ACTIVITIES,
    {
      userId: userId,
      actionName: actionName,
    },
  );
  return (
    await moneyHttpRequest.put<TMoneyResponse>(
      `${END_POINTS.ADD_MONEY}`,
      data,
      config,
    )
  ).data;
};

export const sendMoneyToUser = async (
  actionName: string,
  data?: TSendMoney | undefined,
  userId?: string,
  config?: IAxiosConfig,
): Promise<TMoneyResponse> => {
  await recentActivitiesHttpService.post<TRecentActivities>(
    END_POINTS.RECENT_ACTIVITIES,
    {
      userId: userId,
      actionName: actionName,
    },
  );
  return (
    await moneyHttpRequest.put<TMoneyResponse>(
      `${END_POINTS.SEND_MONEY}`,
      data,
      config,
    )
  ).data;
};
