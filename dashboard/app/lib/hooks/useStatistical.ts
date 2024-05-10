// Libs
import { useQuery } from '@tanstack/react-query';

// Constants
import { END_POINTS } from '@/lib/constants';

// Types
import {
  IEfficiency,
  IRevenueFlow,
  ISpendingStatistics,
  TOverallBalance,
} from '@/lib/interfaces';

// Services
import { mainHttpService } from '@/lib/services';

export const useGetEfficiency = (efficiencyType: string) => {
  const path = `${END_POINTS.EFFICIENCY}/${efficiencyType}`;

  const { ...rest } = useQuery<IEfficiency>({
    queryKey: [path],
    queryFn: async () =>
      (await mainHttpService.get<IEfficiency>({ path })).data,
  });

  return {
    ...rest,
  };
};

export const useGetOverallBalance = () => {
  const { data: res, ...rest } = useQuery({
    queryKey: [END_POINTS.OVERALL_BALANCE],
    queryFn: async () =>
      (
        await mainHttpService.get<TOverallBalance>({
          path: END_POINTS.OVERALL_BALANCE,
        })
      ).data,
  });

  const { data = [], total = 0, growth = 0 } = res || {};

  return {
    ...rest,
    data: {
      data,
      total: total,
      growth: growth,
    },
  };
};

export const useGetRevenue = () => {
  const { data: res, ...rest } = useQuery<IRevenueFlow[]>({
    queryKey: [END_POINTS.REVENUE],
    queryFn: async () =>
      (
        await mainHttpService.get<IRevenueFlow[]>({
          path: END_POINTS.REVENUE,
        })
      ).data,
  });

  return {
    ...rest,
    data: res || [],
  };
};

export const useGetStatistic = () => {
  const { data: res, ...rest } = useQuery({
    queryKey: [END_POINTS.STATISTICS],
    queryFn: async () =>
      (
        await mainHttpService.get<ISpendingStatistics[]>({
          path: END_POINTS.STATISTICS,
        })
      ).data,
  });

  return {
    ...rest,
    data: res || [],
  };
};

// TODO: Use later
// export const useGetMultipleStatistics = <T>(endPoints: string[]) =>
//   useQueries({
//     queries: endPoints.map((endPoint) => ({
//       queryKey: [endPoint],
//       queryFn: ({ signal }: { signal: AbortSignal }) =>
//         getStatistical<T>(endPoint, {
//           signal,
//         }),
//     })),
//   });
