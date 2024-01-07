// Libs
import { useQueries, useQuery } from '@tanstack/react-query';

// Services
import { getStatistical } from '@/lib/services';

export const useGetStatistic = <T>(endPoint: string) =>
  useQuery<T>({
    queryKey: [endPoint],
    queryFn: ({ signal }) => getStatistical(endPoint, { signal }),
  });

export const useGetMultipleStatistics = <T>(endPoints: string[]) =>
  useQueries({
    queries: endPoints.map((endPoint) => ({
      queryKey: [endPoint],
      queryFn: ({ signal }: { signal: AbortSignal }) =>
        getStatistical<T>(endPoint, {
          signal,
        }),
    })),
  });
