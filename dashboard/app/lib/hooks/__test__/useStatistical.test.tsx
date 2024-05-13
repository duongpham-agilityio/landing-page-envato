import { renderHook, waitFor } from '@testing-library/react';

// Hooks
import {
  useGetEfficiency,
  useGetOverallBalance,
  useGetRevenue,
  useGetStatistic,
} from '@/lib/hooks';

// Services
import { mainHttpService } from '@/lib/services';

// Utils
import { queryProviderWrapper } from '@/lib/utils';

// Mocks
import {
  MOCK_EFFICIENCY_SUCCESS_RES,
  MOCK_OVERALL_BALANCE_RES,
  MOCK_REVENUE_RES,
  MOCK_STATISTIC_RES,
} from '@/lib/mocks';

describe('useGetStatistic', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('useGetEfficiency', async () => {
    jest
      .spyOn(mainHttpService, 'get')
      .mockResolvedValue(MOCK_EFFICIENCY_SUCCESS_RES);

    const { result } = renderHook(() => useGetEfficiency('weekly'), {
      wrapper: queryProviderWrapper,
    });

    await waitFor(() => expect(result.current.isSuccess).toEqual(true));

    expect(result.current.data).toEqual(MOCK_EFFICIENCY_SUCCESS_RES.data);
  });

  it('useGetOverallBalance', async () => {
    jest
      .spyOn(mainHttpService, 'get')
      .mockResolvedValue(MOCK_OVERALL_BALANCE_RES);

    const { result } = renderHook(() => useGetOverallBalance(), {
      wrapper: queryProviderWrapper,
    });

    await waitFor(() => {
      expect(result.current.data).toEqual(MOCK_OVERALL_BALANCE_RES.data);
    });
  });

  it('useGetRevenue', async () => {
    jest.spyOn(mainHttpService, 'get').mockResolvedValue(MOCK_REVENUE_RES);

    const { result } = renderHook(() => useGetRevenue(), {
      wrapper: queryProviderWrapper,
    });

    await waitFor(() => {
      expect(result.current.data).toEqual(MOCK_REVENUE_RES.data);
    });
  });

  it('useGetStatistic', async () => {
    jest.spyOn(mainHttpService, 'get').mockResolvedValue(MOCK_STATISTIC_RES);

    const { result } = renderHook(() => useGetStatistic(), {
      wrapper: queryProviderWrapper,
    });

    await waitFor(() => {
      expect(result.current.data).toEqual(MOCK_STATISTIC_RES.data);
    });
  });
});
