// Libs
import { act } from 'react-dom/test-utils';
import { waitFor } from '@testing-library/react';

// Constants
import { END_POINTS } from '@/lib/constants';

// Services
import { mainHttpService } from '@/lib/services';

// Hooks
import { useMoney } from '@/lib/hooks';

// Utils
import { queryProviderWrapper } from '@/lib/utils';

// Mocks
import {
  MOCK_UPDATE_SUCCESS_RES,
  MOCK_ADD_MONEY_PAYLOAD,
  MOCK_SEND_MONEY_PAYLOAD,
} from '@/lib/mocks';

const { renderHook } = testLibReactUtils;

describe('useMoney Hook', () => {
  beforeEach(() => {
    jest
      .spyOn(mainHttpService, 'post')
      .mockResolvedValue(MOCK_UPDATE_SUCCESS_RES);

    jest
      .spyOn(mainHttpService, 'put')
      .mockResolvedValue(MOCK_UPDATE_SUCCESS_RES);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should handle addMoneyToUserWallet success', () => {
    const { result } = renderHook(() => useMoney(), {
      wrapper: queryProviderWrapper,
    });

    act(() => result.current.addMoneyToUserWallet(MOCK_ADD_MONEY_PAYLOAD));

    waitFor(() =>
      expect(mainHttpService.put).toHaveBeenCalledWith(
        END_POINTS.ADD_MONEY,
        MOCK_ADD_MONEY_PAYLOAD,
      ),
    );
  });

  it('should handle sendMoneyToUserWallet success', () => {
    const { result } = renderHook(() => useMoney(), {
      wrapper: queryProviderWrapper,
    });

    act(() => result.current.sendMoneyToUserWallet(MOCK_SEND_MONEY_PAYLOAD));

    waitFor(() =>
      expect(mainHttpService.put).toHaveBeenCalledWith(
        END_POINTS.SEND_MONEY,
        MOCK_SEND_MONEY_PAYLOAD,
      ),
    );
  });
});
