import { AxiosError } from 'axios';

// Store
import { authStore } from '@/lib/stores';

// Interface
import { TActivitiesRequest } from '../interfaces';

// Service
import { MainHttpService, recentActivitiesHttpService } from '../services';

// Constants
import { END_POINTS } from '../constants';

// Utils
import { formatUppercaseFirstLetter } from '../utils';

export const useLogActivity = () => {
  const { user } = authStore();

  const logActivity = async (url: string, actionName: string) => {
    try {
      const { data } = await MainHttpService.getPath(url);

      if (data && user) {
        await recentActivitiesHttpService.post<TActivitiesRequest>(
          END_POINTS.RECENT_ACTIVITIES,
          {
            userId: user.id,
            actionName: actionName,
          },
        );
      }
    } catch (error) {
      const { response } = error as AxiosError<string>;

      throw new Error(formatUppercaseFirstLetter(response?.data));
    }
  };

  return { logActivity };
};
