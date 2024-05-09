// Libs
import { renderHook } from '@testing-library/react';

// Hooks
import { useWallet } from '@/lib/hooks';

// Services
import { MainHttpService } from '@/lib/services';

// Utils
import { queryProviderWrapper } from '@/lib/utils';

// Mocks
import { MOCK_WALLET_SUCCESS_RES, WALLET_MOCK } from '@/lib/mocks';

describe('useWallet', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should fetch wallet data successfully', async () => {
    jest
      .spyOn(MainHttpService, 'get')
      .mockResolvedValue(MOCK_WALLET_SUCCESS_RES);

    const { result } = renderHook(() => useWallet('6593beacff649fc6c4d2964b'), {
      wrapper: queryProviderWrapper,
    });

    await waitFor(() =>
      expect(result.current.currentWalletMoney).toEqual(WALLET_MOCK[0]),
    );
  });
});
