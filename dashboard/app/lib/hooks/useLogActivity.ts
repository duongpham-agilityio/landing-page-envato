import { AxiosInstance } from 'axios';

// Interface
import { TRecentActivities } from '../interfaces';

// Service
import { recentActivitiesHttpService } from '../services';

// Constants
import { END_POINTS } from '../constants';

export const useLogActivity = () => {
  const logActivity = (
    httpService: AxiosInstance,
    actionName: string,
    userId?: string,
  ) => {
    const interceptor = httpService.interceptors.response.use(
      async (response) => {
        await recentActivitiesHttpService.post<TRecentActivities>(
          END_POINTS.RECENT_ACTIVITIES,
          {
            userId: userId,
            actionName: actionName,
          },
        );

        return response;
      },
    );

    return interceptor;
  };

  return { logActivity };
};
