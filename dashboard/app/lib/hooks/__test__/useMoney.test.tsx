import { ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { act } from 'react-dom/test-utils';
import { waitFor } from '@testing-library/react';

// Constants
import { END_POINTS } from '@/lib/constants';

// Services
import { MainHttpService } from '@/lib/services';

// Hooks
import { useMoney } from '@/lib/hooks';

jest.mock('@/lib/services', () => ({
  addMoneyToUser: jest.fn(),
  sendMoneyToUser: jest.fn(),
}));

const queryClient = new QueryClient();

const wrapper = ({ children }: { children: ReactNode }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

const { renderHook } = testLibReactUtils;

describe('useMoney Hook', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should handle addMoneyToUserWallet success', () => {
    const { result } = renderHook(() => useMoney(), { wrapper });

    act(() =>
      result.current.addMoneyToUserWallet({
        amount: 10,
        userId: '6593beacff649fc6c4d2964b',
      }),
    );

    waitFor(() =>
      expect(MainHttpService.put).toHaveBeenCalledWith(END_POINTS.ADD_MONEY, {
        amount: 10,
        userId: '6593beacff649fc6c4d2964b',
      }),
    );
  });

  it('should handle sendMoneyToUserWallet success', () => {
    const { result } = renderHook(() => useMoney(), { wrapper });

    act(() =>
      result.current.sendMoneyToUserWallet({
        amount: 10,
        memberId: '65a4a3a280522b2e38c4b4a6',
        userId: '6593beacff649fc6c4d2964b',
      }),
    );

    waitFor(() =>
      expect(MainHttpService.put).toHaveBeenCalledWith(END_POINTS.SEND_MONEY, {
        amount: 10,
        memberId: '65a4a3a280522b2e38c4b4a6',
        userId: '6593beacff649fc6c4d2964b',
      }),
    );
  });
});
