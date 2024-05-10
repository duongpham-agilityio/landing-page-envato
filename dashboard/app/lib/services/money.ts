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

// Service
import { mainHttpService, recentActivitiesHttpService } from '@/lib/services';

export const moneyHttpRequest: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API,
});

export type TMoneyResponse = {
  message: string;
};

export const addMoneyToUser = async (
  actionName: string,
  data: TAddMoney,
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
    await mainHttpService.put<TMoneyResponse>({
      path: END_POINTS.ADD_MONEY,
      data: data,
      configs: config,
    })
  ).data;
};

export const sendMoneyToUser = async (
  actionName: string,
  data: TSendMoney,
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
    await mainHttpService.put<TMoneyResponse>({
      path: END_POINTS.SEND_MONEY,
      data: data,
      configs: config,
    })
  ).data;
};
