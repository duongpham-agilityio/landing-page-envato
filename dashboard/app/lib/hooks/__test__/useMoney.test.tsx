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
  MOCK_TRANSFER_MONEY_PAYLOAD,
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

    act(() => result.current.addMoneyToUserWallet(MOCK_TRANSFER_MONEY_PAYLOAD));

    waitFor(() =>
      expect(mainHttpService.put).toHaveBeenCalledWith(
        END_POINTS.ADD_MONEY,
        MOCK_TRANSFER_MONEY_PAYLOAD,
      ),
    );
  });

  it('should handle sendMoneyToUserWallet success', () => {
    const mockSendMoneyPayload = {
      ...MOCK_TRANSFER_MONEY_PAYLOAD,
      memberId: '65a4a3a280522b2e38c4b4a6',
    };
    const { result } = renderHook(() => useMoney(), {
      wrapper: queryProviderWrapper,
    });

    act(() => result.current.sendMoneyToUserWallet(mockSendMoneyPayload));

    waitFor(() =>
      expect(mainHttpService.put).toHaveBeenCalledWith(
        END_POINTS.SEND_MONEY,
        mockSendMoneyPayload,
      ),
    );
  });
});
