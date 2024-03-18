import UploadProducts from '..';

describe('Upload Product', () => {
  it('renders correctly with label and input field', () => {
    const { getByText, getByTestId } = render(
      <UploadProducts
        label="Upload Images"
        onUploadError={() => {}}
        onChange={() => {}}
      />,
    );

    expect(getByText('Upload Images')).toBeInTheDocument();
    expect(getByTestId('field-image')).toBeInTheDocument();
  });

  it('triggers onChange callback when image is dropped', () => {
    const onChangeMock = jest.fn();
    const { getByTestId } = render(
      <UploadProducts
        label="Upload Images"
        onUploadError={() => {}}
        onChange={onChangeMock}
      />,
    );

    const file = new File(['image contents'], 'test.png', {
      type: 'image/png',
    });
    fireEvent.drop(getByTestId('field-image'), {
      dataTransfer: { files: [file] },
    });

    expect(onChangeMock).toHaveBeenCalledWith(['image.png']);
  });

  it('triggers onUploadError callback when upload fails', () => {
    const onUploadErrorMock = jest.fn();
    const { getByTestId } = render(
      <UploadProducts
        label="Upload Images"
        onUploadError={onUploadErrorMock}
        onChange={() => {}}
      />,
    );

    fireEvent.drop(getByTestId('field-image'), { dataTransfer: { files: [] } });

    expect(onUploadErrorMock).toHaveBeenCalled();
  });
});
