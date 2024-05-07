// Libs
import { ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { renderHook } from '@testing-library/react';
import { AxiosRequestHeaders, AxiosResponse } from 'axios';

// Hooks
import { useWallet } from '@/lib/hooks';

// Services
import { MainHttpService } from '@/lib/services';

// Types
import { TWallet } from '@/lib/interfaces';

// Mocks
import { WALLET_MOCK } from '@/lib/mocks';

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

describe('useWallet', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should fetch wallet data successfully', async () => {
    const walletResponse: AxiosResponse<TWallet> = {
      data: WALLET_MOCK[0],
      status: 200,
      statusText: 'Ok',
      headers: {},
      config: {
        headers: {} as AxiosRequestHeaders,
      },
    };

    jest.spyOn(MainHttpService, 'get').mockResolvedValue(walletResponse);

    const { result } = renderHook(() => useWallet('6593beacff649fc6c4d2964b'), {
      wrapper,
    });

    await waitFor(() =>
      expect(result.current.currentWalletMoney).toEqual(WALLET_MOCK[0]),
    );
  });
});
