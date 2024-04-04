import axios, { AxiosInstance } from 'axios';

// Constants
import { END_POINTS } from '@/lib/constants';

// Types
import { IAxiosConfig, TRecentActivities } from '@/lib/interfaces';

export const recentActivitiesHttpService: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API,
});

export const getRecentActivities = async (
  searchParam?: string,
  config?: IAxiosConfig,
  userId?: string,
  page = 1,
): Promise<TRecentActivities[]> => {
  recentActivitiesHttpService.interceptors.response.clear();

  return (
    await recentActivitiesHttpService.get(
      `${END_POINTS.RECENT_ACTIVITIES}/${userId}/${page}${searchParam || ''}`,
      config,
    )
  ).data.result;
};
