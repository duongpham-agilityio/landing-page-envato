import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { TransactionModal } from '..';
import userEvent from '@testing-library/user-event';

describe('Transaction Modal', () => {
  const mockTransaction = {
    id: '123',
    customer: {
      firstName: 'John',
      lastName: 'Doe',
      email: 'doe@gmail.com',
      avatar: '',
      address: {
        street: '123 Main St',
        state: 'CA',
        city: 'City',
        zip: 12345,
      },
    },
  };

  it('match to snapshot', () => {
    const { container } = render(
      <TransactionModal isDelete transaction={mockTransaction} />,
    );

    expect(container).toMatchSnapshot();
  });

  it('should render delete confirmation correctly', async () => {
    render(<TransactionModal isDelete transaction={mockTransaction} />);

    // Ensure delete confirmation message is rendered
    expect(
      screen.getByText(/Are you sure delete the transaction with id/i),
    ).toBeInTheDocument();
  });

  it('should call onDeleteTransaction on delete button click', async () => {
    const mockOnDeleteTransaction = jest.fn();
    render(
      <TransactionModal
        isDelete
        transaction={mockTransaction}
        onDeleteTransaction={mockOnDeleteTransaction}
      />,
    );

    // Click the delete button
    fireEvent.click(screen.getByText('Delete'));

    // Ensure onDeleteTransaction is called
    expect(mockOnDeleteTransaction).toHaveBeenCalled();
  });

  it('should call onCloseModal on cancel button click', async () => {
    const mockOnCloseModal = jest.fn();
    render(
      <TransactionModal
        isDelete
        transaction={mockTransaction}
        onCloseModal={mockOnCloseModal}
      />,
    );

    // Click the cancel button
    fireEvent.click(screen.getByText('Cancel'));

    waitFor(() => {
      // Ensure onCloseModal is called
      expect(mockOnCloseModal).toHaveBeenCalled();
    });
  });

  it('handleSubmitForm should update transaction, reset form, and close modal', async () => {
    const onUpdateTransactionMock = jest.fn();
    const onCloseModalMock = jest.fn();

    render(
      <TransactionModal
        transaction={mockTransaction}
        isDelete={false}
        onUpdateTransaction={onUpdateTransactionMock}
        onCloseModal={onCloseModalMock}
      />,
    );

    const inputField = screen.getByTestId('edit-field-name');

    await fireEvent.change(inputField, { target: { value: 'NewValue' } });

    await userEvent.click(screen.getByTestId('submit-transaction-form'));

    // Assertions
    waitFor(() => {
      expect(onUpdateTransactionMock).toHaveBeenCalled();
      expect(onCloseModalMock).toHaveBeenCalled();
    });
  });
});
