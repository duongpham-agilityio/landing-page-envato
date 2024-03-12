import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { ProductForm } from '..';
import userEvent from '@testing-library/user-event';

describe('Product Modal', () => {
  const mockProduct = {
    _id: '123',
    name: 'Tivi',
    amount: 1111,
    stock: 11,
    imageURLs: ['image.png'],
  };

  it('match to snapshot', () => {
    const { container } = render(<ProductForm product={mockProduct} />);

    expect(container).toMatchSnapshot();
  });

  it('should call onCloseModal on cancel button click', async () => {
    const mockOnCloseModal = jest.fn();
    render(
      <ProductForm product={mockProduct} onCloseModal={mockOnCloseModal} />,
    );

    // Click the cancel button
    fireEvent.click(screen.getByText('Cancel'));

    waitFor(() => {
      // Ensure onCloseModal is called
      expect(mockOnCloseModal).toHaveBeenCalled();
    });
  });

  it('handleSubmitForm should update product, reset form, and close modal', async () => {
    const onUpdateProductMock = jest.fn();
    const onCloseModalMock = jest.fn();

    render(
      <ProductForm
        product={mockProduct}
        onUpdateProduct={onUpdateProductMock}
        onCloseModal={onCloseModalMock}
      />,
    );

    const inputField = screen.getByTestId('edit-field-name');

    await fireEvent.change(inputField, { target: { value: 'NewValue' } });

    await userEvent.click(screen.getByTestId('submit-product-form'));

    // Assertions
    waitFor(() => {
      expect(onUpdateProductMock).toHaveBeenCalled();
      expect(onCloseModalMock).toHaveBeenCalled();
    });
  });
});
