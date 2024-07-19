// Libs
import { fireEvent, render, waitFor, screen } from '@testing-library/react';

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
  sendMoney: jest.fn(),
}));

jest.mock('@/lib/hooks', () => ({
  ...jest.requireActual('@/lib/hooks'),
  useAuth: jest.fn(() => ({ setUser: jest.fn() })),
}));

// Components
import CardPaymentWithPinCode from '..';

// Actions
import * as actions from '@/lib/actions';

// Stores
import { authStore } from '@/lib/stores';

describe('CardPayment', () => {
  const mockProps = { userList: MOCK_FILTER_DATA_USERS, balance: 10 };

  const sendMoney = async () => {
    await act(async () => {
      fireEvent.change(
        screen.getByPlaceholderText('Choose an account to transfer'),
        {
          target: { value: MOCK_FILTER_DATA_USERS[0].email },
        },
      );

      fireEvent.change(screen.getByPlaceholderText('0.00'), {
        target: { value: '20' },
      });

      fireEvent.click(screen.getByText('Send Money'));
    });

    await waitFor(async () =>
      expect(
        screen.getByText('Please enter your PIN code'),
      ).toBeInTheDocument(),
    );

    const pinInputFields = screen.getAllByTestId('pin-input');

    act(() => {
      fireEvent.change(pinInputFields[0], { target: { value: '1' } });
      fireEvent.change(pinInputFields[1], { target: { value: '2' } });
      fireEvent.change(pinInputFields[2], { target: { value: '3' } });
      fireEvent.change(pinInputFields[3], { target: { value: '4' } });
    });

    await waitFor(() => expect(screen.getByText('Submit')).toBeEnabled());

    act(() => {
      fireEvent.click(screen.getByText('Submit'));
    });
  };

  beforeEach(() => {
    jest.spyOn(actions, 'confirmPinCode').mockResolvedValue();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should match with snapshot', () => {
    (authStore as unknown as jest.Mock).mockReturnValue(null);

    const { container } = render(<CardPaymentWithPinCode {...mockProps} />);

    expect(container).toMatchSnapshot();
  });

  it('should Send Money successfully', async () => {
    jest.spyOn(actions, 'sendMoney').mockResolvedValue();

    (authStore as unknown as jest.Mock).mockReturnValue({
      ...USERS_MOCK[0],
      bonusTimes: 10,
      pinCode: '1234',
    });

    render(<CardPaymentWithPinCode {...mockProps} />);

    await sendMoney();

    waitFor(() =>
      expect(
        screen.getByText(SUCCESS_MESSAGES.SEND_MONEY.title),
      ).toBeInTheDocument(),
    );
  });

  it('should Send Money failed', async () => {
    const mockUserList = MOCK_FILTER_DATA_USERS;
    mockUserList[0]._id = '';

    jest
      .spyOn(actions, 'sendMoney')
      .mockResolvedValue({ error: ERROR_MESSAGES.SEND_MONEY });

    (authStore as unknown as jest.Mock).mockReturnValue({
      ...USERS_MOCK[0],
      pinCode: '1234',
    });

    render(<CardPaymentWithPinCode {...mockProps} userList={mockUserList} />);

    await sendMoney();

    waitFor(() =>
      expect(
        screen.getByText(ERROR_MESSAGES.SEND_MONEY.title),
      ).toBeInTheDocument(),
    );
  });
});
