import { useQuery } from '@tanstack/react-query';

// Constants
import { END_POINTS } from '@/lib/constants';

// Services
import { getRecentActivities } from '@/lib/services';

// Store
import { authStore } from '@/lib/stores';

export type TSearchAction = {
  name: string;
};

export const useRecentActivities = (queryParam?: TSearchAction) => {
  const { user } = authStore();

  const { name: searchName }: TSearchAction = Object.assign(
    {
      name: '',
    },
    queryParam,
  );

  const { data: recentActivities = [], ...query } = useQuery({
    queryKey: [END_POINTS.RECENT_ACTIVITIES, searchName],
    queryFn: ({ signal }) => getRecentActivities('', { signal }, user?.id),
  });

  return {
    ...query,
    recentActivities,
  };
};
