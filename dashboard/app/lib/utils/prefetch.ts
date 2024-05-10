// Libs
import { QueryClient } from '@tanstack/react-query';

// Services
import { mainHttpService } from '@/lib/services';

export const prefetchStatistical = async <T>(
  endPoint: string,
  queryClient: QueryClient,
) => {
  await queryClient.prefetchQuery({
    queryKey: [endPoint],
    queryFn: async () =>
      (await mainHttpService.get<T>({ path: endPoint })).data,
  });
};
