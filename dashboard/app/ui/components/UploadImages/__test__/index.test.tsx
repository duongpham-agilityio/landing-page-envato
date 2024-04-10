import UploadImages from '..';

jest.mock('react-dropzone', () => ({
  useDropzone: jest.fn(() => ({
    getRootProps: jest.fn(),
    getInputProps: jest.fn(),
    isFileDialogActive: false,
  })),
}));

describe('Upload Product', () => {
  it('Match snapshot with default props', () => {
    const { container } = render(
      <UploadImages
        label="Upload Images"
        onUploadError={() => {}}
        onChange={() => {}}
      />,
    );

    expect(container).toMatchSnapshot();
  });

  it('renders correctly with label and input field', () => {
    const { getByText, getByTestId } = render(
      <UploadImages
        label="Upload Images"
        onUploadError={() => {}}
        onChange={() => {}}
      />,
    );

    expect(getByText('Upload Images')).toBeInTheDocument();
    expect(getByTestId('field-image')).toBeInTheDocument();
  });

  it('should remove an image when the delete button is clicked', () => {
    const onChangeMock = jest.fn();
    const onUploadErrorMock = jest.fn();
    const { getByTestId } = render(
      <UploadImages
        label="Upload Images"
        images={['image1.jpg']}
        onChange={onChangeMock}
        onUploadError={onUploadErrorMock}
      />,
    );

    const deleteButton = getByTestId('del-icon');
    fireEvent.click(deleteButton);

    expect(onChangeMock).toHaveBeenCalled();
  });
});
