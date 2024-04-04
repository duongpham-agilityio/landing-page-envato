import { AxiosInstance } from 'axios';

// Service
import { recentActivitiesHttpService } from '../services';

// Interface
import { TRecentActivities } from '../interfaces';

// Constants
import { END_POINTS } from '../constants';

export const logActivity = (
  httpService: AxiosInstance,
  actionName: string,
  userId?: string,
) => {
  const interceptor = httpService.interceptors.response.use(
    async (response) => {
      const id = response.data['_id'];
      await recentActivitiesHttpService.post<TRecentActivities>(
        END_POINTS.RECENT_ACTIVITIES,
        {
          userId: id || userId,
          actionName: actionName,
        },
      );

      return response;
    },
  );

  return interceptor;
};
