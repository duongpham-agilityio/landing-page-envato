// Libs
import { render, waitFor } from '@testing-library/react';
import { cookies } from 'next/headers';

// Mocks
import { MOCK_USERS, MOCK_USER_DETAIL, WALLET_MOCK } from '@/lib/mocks';

jest.mock('@/lib/services', () => ({
  getUserList: jest.fn(),
  getMyWallet: jest.fn(),
}));

jest.mock('@/ui/components/CardPaymentForCalendar', () => ({
  __esModule: true,
  ...jest.requireActual('@/ui/components/CardPaymentForCalendar'),
  default: () => <div>CardPaymentForCalendar</div>,
}));

// Services
import { getMyWallet, getUserList } from '@/lib/services';

// Sections
import CardPayment from '@/ui/sections/Calendar/CardPayment';

describe('CardPayment section', () => {
  beforeEach(() => {
    (cookies as jest.Mock).mockReturnValue({
      get: () => ({ value: MOCK_USER_DETAIL.id }),
    });

    (getUserList as jest.Mock).mockResolvedValue({
      data: MOCK_USERS,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('Should render match with snapshot.', async () => {
    (getMyWallet as jest.Mock).mockResolvedValue({
      currentWalletMoney: WALLET_MOCK[0],
    });

    const { container } = render(await CardPayment());

    waitFor(() => {
      expect(container).toMatchSnapshot();
    });
  });

  it('Should render correctly with currentWalletMoney is returned with undefined', async () => {
    (cookies as jest.Mock).mockReturnValue({
      get: () => ({ value: null }),
    });

    (getMyWallet as jest.Mock).mockResolvedValue({
      currentWalletMoney: undefined,
    });

    const { container } = render(await CardPayment());

    waitFor(() => {
      expect(container).toBeInTheDocument();
    });
  });
});
