import { ReactNode } from 'react';
import { renderHook } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AxiosRequestHeaders, AxiosResponse } from 'axios';

// Hooks
import { TActivity, useRecentActivities } from '@/lib/hooks';

// Services
import { MainHttpService } from '@/lib/services';

// Utils
import { sortByKey } from '@/lib/utils';

// Mocks
import { RECENT_ACTIVITIES } from '@/lib/mocks';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

const wrapper = ({ children }: { children: ReactNode }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

describe('useRecentActivities', () => {
  const activitiesData: AxiosResponse<TActivity> = {
    data: { result: RECENT_ACTIVITIES, totalPage: 3 },
    status: 200,
    statusText: 'Ok',
    headers: {},
    config: {
      headers: {} as AxiosRequestHeaders,
    },
  };

  jest.spyOn(MainHttpService, 'get').mockResolvedValue(activitiesData);

  it('should fetch activities data successfully', async () => {
    const { result } = renderHook(() => useRecentActivities(), { wrapper });

    await waitFor(() => expect(result.current.data).toEqual(RECENT_ACTIVITIES));
  });

  it('should reset page successfully', async () => {
    const { result } = renderHook(() => useRecentActivities(), { wrapper });

    result.current.setCurrentPage(2);
    result.current.resetPage();

    await waitFor(() => expect(result.current.currentPage).toEqual(1));
  });

  it('should sort activities successfully', async () => {
    const expectResult = sortByKey(RECENT_ACTIVITIES, 'actionName', false);

    const { result } = renderHook(() => useRecentActivities(), { wrapper });

    result.current.sortBy('actionName');

    await waitFor(() => expect(result.current.data).toEqual(expectResult));
  });
});
