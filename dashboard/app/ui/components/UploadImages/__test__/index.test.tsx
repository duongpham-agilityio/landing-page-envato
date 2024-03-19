import UploadImages from '..';

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
});
