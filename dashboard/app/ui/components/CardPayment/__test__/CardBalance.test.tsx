import '@testing-library/jest-dom';
import CardBalance from '../CardBalance';

jest.mock('@chakra-ui/react', () => ({
  ...jest.requireActual('@chakra-ui/react'),
  useDisclosure: () => ({
    isShowBalance: true,
    onToggleShowBalance: jest.fn(),
  }),
  useToast: () => jest.fn(),
}));

jest.mock('@/lib/hooks', () => ({
  useAuth: () => ({
    setUser: jest.fn(),
  }),
  usePinCode: () => ({
    isConfirmPinCodeModalOpen: false,
    isSetPinCodeModalOpen: false,
    handleSetPinCode: jest.fn(),
    handleConfirmPinCode: jest.fn(),
    onCloseConfirmPinCodeModal: jest.fn(),
    onCloseSetPinCodeModal: jest.fn(),
    onOpenConfirmPinCodeModal: jest.fn(),
    onOpenSetPinCodeModal: jest.fn(),
  }),
}));

jest.mock('@/lib/stores', () => ({
  authStore: jest.fn().mockImplementation(() => ({ user: { pinCode: null } })),
}));

describe('CardPayment test cases', () => {
  test('CardPayment component renders correctly', () => {
    const { container } = render(<CardBalance balance={0} />);

    expect(container).toMatchSnapshot();
  });
});
