// Libs
import { fireEvent, render, waitFor, screen } from '@testing-library/react';

// Utils
import { renderQueryProviderTest } from '@/lib/utils';

// Mocks
import { MOCK_FILTER_DATA_USERS, USERS_MOCK } from '@/lib/mocks';

// Constants
import { ERROR_MESSAGES, SUCCESS_MESSAGES } from '@/lib/constants';

jest.mock('@/lib/stores', () => ({
  ...jest.requireActual('@/lib/stores'),
  authStore: jest.fn(),
}));

jest.mock('@/lib/actions', () => ({
  ...jest.requireActual('@/lib/actions'),
  confirmPinCode: jest.fn(),
}));

jest.mock('@/lib/hooks', () => ({
  ...jest.requireActual('@/lib/hooks'),
  useAuth: jest.fn(() => ({ setUser: jest.fn() })),
  usePinCode: jest.fn(() => ({
    isSetNewPinCode: false,
    isConfirmPinCode: false,
    setNewPinCode: jest.fn(),
    confirmPinCode: jest.fn(),
  })),
  useWallet: jest.fn(() => ({ currentWalletMoney: { balance: 100 } })),
  useGetUserDetails: jest.fn(() => ({
    filterDataUser: MOCK_FILTER_DATA_USERS,
  })),
  useMoney: jest.fn(() => ({
    sendMoneyToUserWallet: jest.fn(),
    isSendMoneySubmitting: false,
  })),
}));

// Components
import CardPaymentWithPinCode from '..';

// Actions
import * as actions from '@/lib/actions';

// Stores
import { authStore } from '@/lib/stores';

describe('CardPayment', () => {
  const mockProps = { userList: MOCK_FILTER_DATA_USERS, balance: 10 };

  beforeEach(() => {
    (authStore as unknown as jest.Mock).mockReturnValue({
      ...USERS_MOCK[0],
      pinCode: 1234,
    });

    jest.spyOn(actions, 'confirmPinCode').mockResolvedValue();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should match with snapshot', () => {
    const ui = <CardPaymentWithPinCode {...mockProps} />;
    const { container } = render(ui);

    expect(container).toMatchSnapshot();
  });

  // it('should Send Money successfully', async () => {
  //   jest.spyOn(actions, 'sendMoney').mockResolvedValue();

  //   (authStore as unknown as jest.Mock).mockReturnValue({
  //     ...USERS_MOCK[0],
  //     bonusTimes: 10,
  //     pinCode: '1234',
  //   });

  //   const { getByText, getByPlaceholderText, getAllByTestId } = render(
  //     <CardPaymentWithPinCode {...mockProps} />,
  //   );

  //   await act(async () => {
  //     fireEvent.change(getByPlaceholderText('Choose an account to transfer'), {
  //       target: { value: MOCK_FILTER_DATA_USERS[0].email },
  //     });

  //     fireEvent.change(getByPlaceholderText('0.00'), {
  //       target: { value: '20' },
  //     });

  //     fireEvent.click(getByText('Send Money'));
  //   });

  //   await waitFor(async () =>
  //     expect(getByText('Please enter your PIN code')).toBeInTheDocument(),
  //   );

  //   const pinInputFields = getAllByTestId('pin-input');

  //   act(() => {
  //     fireEvent.change(pinInputFields[0], { target: { value: '1' } });
  //     fireEvent.change(pinInputFields[1], { target: { value: '2' } });
  //     fireEvent.change(pinInputFields[2], { target: { value: '3' } });
  //     fireEvent.change(pinInputFields[3], { target: { value: '4' } });
  //   });

  //   await waitFor(() => expect(getByText('Submit')).toBeEnabled());

  //   act(() => {
  //     fireEvent.click(getByText('Submit'));
  //   });

  //   waitFor(() =>
  //     expect(getByText(SUCCESS_MESSAGES.SEND_MONEY.title)).toBeInTheDocument(),
  //   );
  // });
});
