// Libs
import { renderHook, act } from '@testing-library/react';

// Hooks
import { useRecentActivities } from '@/lib/hooks';

// Services
import { MainHttpService } from '@/lib/services';

// Utils
import { sortByKey, queryProviderWrapper } from '@/lib/utils';

// Mocks
import {
  RECENT_ACTIVITIES,
  MOCK_RECENT_ACTIVITIES_SUCCESS_RES,
} from '@/lib/mocks';

describe('useRecentActivities', () => {
  jest
    .spyOn(MainHttpService, 'get')
    .mockResolvedValue(MOCK_RECENT_ACTIVITIES_SUCCESS_RES);

  it('should fetch activities data successfully', async () => {
    const { result } = renderHook(() => useRecentActivities(), {
      wrapper: queryProviderWrapper,
    });

    await waitFor(() => expect(result.current.data).toEqual(RECENT_ACTIVITIES));
  });

  it('should reset page successfully', async () => {
    const { result } = renderHook(() => useRecentActivities(), {
      wrapper: queryProviderWrapper,
    });

    act(() => {
      result.current.setCurrentPage(2);
      result.current.resetPage();
    });

    await waitFor(() => expect(result.current.currentPage).toEqual(1));
  });

  it('should sort activities successfully', async () => {
    const expectResult = sortByKey(RECENT_ACTIVITIES, 'actionName', false);

    const { result } = renderHook(() => useRecentActivities(), {
      wrapper: queryProviderWrapper,
    });

    act(() => {
      result.current.sortBy('actionName');
    });

    await waitFor(() => expect(result.current.data).toEqual(expectResult));
  });
});
