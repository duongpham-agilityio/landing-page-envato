// Libs
import { screen } from '@testing-library/react';
import { useForm } from 'react-hook-form';

// Types
import { TTransfer } from '@/lib/interfaces';

// Utils
import { renderQueryProviderTest } from '@/lib/utils';

// Mocks
import { MOCK_FILTER_DATA_USERS } from '@/lib/mocks';

// Components
import { CardPayment } from '..';

describe('CardPayment', () => {
  const { result } = renderHook(() => useForm<TTransfer>());

  const mockDirtyFields = {
    amount: true,
    memberId: true,
  };

  const mockProps = {
    control: result.current.control,
    dirtyFields: mockDirtyFields,
    userList: MOCK_FILTER_DATA_USERS,
    isSendMoneySubmitting: true,
    onSubmitSendMoneyHandler: result.current.handleSubmit,
    onSubmitSendMoney: jest.fn(),
  };

  it('should match with snapshot', () => {
    const { container } = renderQueryProviderTest(
      <CardPayment {...mockProps} />,
    );

    expect(container).toMatchSnapshot();
  });

  it('The Send button should be enabled when the form is dirty', () => {
    renderQueryProviderTest(
      <CardPayment {...mockProps} isSendMoneySubmitting={false} />,
    );

    const sendButton = screen.getByText('Send Money');
    expect(sendButton).not.toBeDisabled();
  });
});
