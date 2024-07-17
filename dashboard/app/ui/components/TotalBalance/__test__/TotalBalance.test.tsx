// Libs
import { fireEvent, screen, waitFor } from '@testing-library/react';

// Utils
import { renderQueryProviderTest } from '@/lib/utils';

// Mocks
import { USERS_MOCK } from '@/lib/mocks';

// Constants
import { ERROR_MESSAGES, SUCCESS_MESSAGES } from '@/lib/constants';

// Components
import TotalBalanceWithPinCode from '..';

// Hooks
import { useMoney } from '@/lib/hooks';

// Actions
import * as actions from '@/lib/actions';

// Stores
import { authStore } from '@/lib/stores';

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
  useMoney: jest.fn(() => ({
    addMoneyToUserWallet: jest.fn(),
    isAddMoneySubmitting: false,
  })),
}));

describe('TotalBalance', () => {
  const submitAddMoneyForm = async () => {
    await act(async () => {
      fireEvent.change(screen.getByPlaceholderText('0.00'), {
        target: { value: '20' },
      });

      fireEvent.click(screen.getByText('Add Money'));
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
    const { container } = renderQueryProviderTest(<TotalBalanceWithPinCode />);

    expect(container).toMatchSnapshot();
  });

  it('should Add Money successfully if user have bonus time', async () => {
    (authStore as unknown as jest.Mock).mockReturnValue({
      ...USERS_MOCK[0],
      bonusTimes: 10,
      pinCode: 1234,
    });

    (useMoney as jest.Mock).mockReturnValue({
      addMoneyToUserWallet: jest.fn((_, { onSuccess }) => onSuccess()),
      isAddMoneySubmitting: false,
    });

    const { getByText } = renderQueryProviderTest(<TotalBalanceWithPinCode />);

    await submitAddMoneyForm();

    await waitFor(() =>
      expect(getByText(SUCCESS_MESSAGES.ADD_MONEY.title)).toBeInTheDocument(),
    );
  });

  it('should Add Money successfully if user have no bonus time', async () => {
    (useMoney as jest.Mock).mockReturnValue({
      addMoneyToUserWallet: jest.fn((_, { onSuccess }) => onSuccess()),
      isAddMoneySubmitting: false,
    });

    const { getByText } = renderQueryProviderTest(<TotalBalanceWithPinCode />);

    await submitAddMoneyForm();

    await waitFor(() =>
      expect(getByText(SUCCESS_MESSAGES.ADD_MONEY.title)).toBeInTheDocument(),
    );
  });

  it('should Add Money failed', async () => {
    (useMoney as jest.Mock).mockReturnValue({
      addMoneyToUserWallet: jest.fn((_, { onError }) => onError()),
      isAddMoneySubmitting: false,
    });

    const { getByText } = renderQueryProviderTest(<TotalBalanceWithPinCode />);

    await submitAddMoneyForm();

    waitFor(() =>
      expect(getByText(ERROR_MESSAGES.ADD_MONEY.title)).toBeInTheDocument(),
    );
  });
});
