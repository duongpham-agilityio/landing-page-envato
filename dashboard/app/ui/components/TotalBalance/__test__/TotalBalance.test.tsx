// Libs
import { fireEvent } from '@testing-library/react';

// Utils
import { renderQueryProviderTest } from '@/lib/utils';

// Mocks
import { USERS_MOCK } from '@/lib/mocks';

// Hooks
import { useMoney, usePinCode } from '@/lib/hooks';

// Stores
import { authStore } from '@/lib/stores';

// Constants
import { ERROR_MESSAGES, SUCCESS_MESSAGES } from '@/lib/constants';

// Components
import TotalBalanceWithPinCode from '..';

jest.mock('@/lib/stores', () => ({
  authStore: jest.fn(() => ({ ...USERS_MOCK[0] })),
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
  useMoney: jest.fn(() => ({
    addMoneyToUserWallet: jest.fn(),
    isAddMoneySubmitting: false,
  })),
}));

describe('TotalBalance', () => {
  afterEach(() => {
    jest.clearAllMocks();
    jest.resetAllMocks();
  });

  it('should match with snapshot', () => {
    const { container } = renderQueryProviderTest(<TotalBalanceWithPinCode />);

    expect(container).toMatchSnapshot();
  });

  it('should Add Money successfully', async () => {
    (authStore as unknown as jest.Mock).mockReturnValue({
      ...USERS_MOCK[0],
      bonusTimes: 10,
      pinCode: '1234',
    });

    (usePinCode as jest.Mock).mockReturnValue({
      confirmPinCode: jest.fn((_, { onSuccess }) => onSuccess()),
      setNewPinCode: jest.fn(),
    });

    (useMoney as jest.Mock).mockReturnValue({
      addMoneyToUserWallet: jest.fn((_, { onSuccess }) => onSuccess()),
      isAddMoneySubmitting: false,
    });

    const { getByText, getByPlaceholderText, getAllByTestId } =
      renderQueryProviderTest(<TotalBalanceWithPinCode />);

    await act(async () => {
      fireEvent.change(getByPlaceholderText('0.00'), {
        target: { value: '20' },
      });

      fireEvent.click(getByText('Add Money'));
    });

    await waitFor(async () =>
      expect(getByText('Please enter your PIN code')).toBeInTheDocument(),
    );

    const pinInputFields = getAllByTestId('pin-input');

    act(() => {
      fireEvent.change(pinInputFields[0], { target: { value: '1' } });
      fireEvent.change(pinInputFields[1], { target: { value: '2' } });
      fireEvent.change(pinInputFields[2], { target: { value: '3' } });
      fireEvent.change(pinInputFields[3], { target: { value: '4' } });
    });

    await waitFor(() => expect(getByText('Submit')).toBeEnabled());

    act(() => {
      fireEvent.click(getByText('Submit'));
    });

    waitFor(() =>
      expect(getByText(SUCCESS_MESSAGES.ADD_MONEY.title)).toBeInTheDocument(),
    );
  });

  it('should Add Money failed', async () => {
    (authStore as unknown as jest.Mock).mockReturnValue({
      ...USERS_MOCK[0],
      bonusTimes: 10,
      pinCode: '1234',
    });

    (usePinCode as jest.Mock).mockReturnValue({
      confirmPinCode: jest.fn((_, { onSuccess }) => onSuccess()),
      setNewPinCode: jest.fn(),
    });

    (useMoney as jest.Mock).mockReturnValue({
      addMoneyToUserWallet: jest.fn((_, { onError }) => onError()),
      isAddMoneySubmitting: false,
    });

    const { getByText, getByPlaceholderText, getAllByTestId } =
      renderQueryProviderTest(<TotalBalanceWithPinCode />);

    act(() => {
      fireEvent.change(getByPlaceholderText('0.00'), {
        target: { value: '20' },
      });

      fireEvent.click(getByText('Add Money'));
    });

    await waitFor(async () =>
      expect(getByText('Please enter your PIN code')).toBeInTheDocument(),
    );

    const pinInputFields = getAllByTestId('pin-input');

    act(() => {
      fireEvent.change(pinInputFields[0], { target: { value: '1' } });
      fireEvent.change(pinInputFields[1], { target: { value: '2' } });
      fireEvent.change(pinInputFields[2], { target: { value: '3' } });
      fireEvent.change(pinInputFields[3], { target: { value: '4' } });
    });

    await waitFor(() => expect(getByText('Submit')).toBeEnabled());

    act(() => {
      fireEvent.click(getByText('Submit'));
    });

    waitFor(() =>
      expect(getByText(ERROR_MESSAGES.ADD_MONEY.title)).toBeInTheDocument(),
    );
  });
});
