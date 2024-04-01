import { ReactNode } from 'react';
import { renderHook, act } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Hooks
import { useRecentActivities } from '..';

// Services
import * as services from '@/lib/services';

// Mocks
import { RECENT_ACTIVITIES } from '@/lib/mocks';

jest.mock('@/lib/services', () => ({
  getRecentActivities: jest.fn(),
}));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

jest.mock('@/lib/hooks', () => {
  const originalModule = jest.requireActual('@/lib/hooks');
  return {
    ...originalModule,
    handleSort: jest.fn(),
  };
});

const wrapper = ({ children }: { children: ReactNode }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

describe('useRecentActivities', () => {
  it('should fetch activities and apply sorting and filtering', async () => {
    const getActivitiesSpy = jest.spyOn(services, 'getRecentActivities');
    getActivitiesSpy.mockResolvedValue(RECENT_ACTIVITIES);

    const { result, rerender } = renderHook(
      () => useRecentActivities({ actionName: 'create' }),
      { wrapper },
    );
    expect(result.current.data).toEqual([]);
    expect(result.current.isLoading).toBe(true);

    await rerender();

    expect(getActivitiesSpy).toHaveBeenCalledWith(
      '',
      expect.any(Object),
      undefined,
    );
    expect(result.current.isLoading).toBe(true);

    act(() => {
      result.current.sortBy('actionName');
    });

    expect(getActivitiesSpy).toHaveBeenCalledWith(
      '',
      expect.any(Object),
      undefined,
    );
  });
});
