// Libs
import { QueryClient } from '@tanstack/react-query';

// Services
import { MainHttpService } from '@/lib/services';

export const prefetchStatistical = async <T>(
  endPoint: string,
  queryClient: QueryClient,
) => {
  await queryClient.prefetchQuery({
    queryKey: [endPoint],
    queryFn: async () =>
      (await MainHttpService.get<T>({ path: endPoint })).data,
  });
};
