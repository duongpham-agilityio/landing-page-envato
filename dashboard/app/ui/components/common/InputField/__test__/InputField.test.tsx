import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { CloseIcon } from '@chakra-ui/icons';

// Components
import { InputField } from '@/ui/components';

describe('InputField component', () => {
  const mockOnChange = jest.fn();
  const props = {
    name: 'email',
    placeholder: 'Email',
    onChange: mockOnChange,
  };
  it('Render correctly with default props', () => {
    const { container } = render(<InputField {...props} />);
    expect(container).toMatchSnapshot();
  });

  it('Render correctly with variant is secondary', () => {
    const { container } = render(<InputField {...props} variant="secondary" />);
    expect(container).toMatchSnapshot();
  });

  it('Render correctly with variant is authentication', () => {
    const { container } = render(
      <InputField {...props} variant="authentication" />,
    );
    expect(container).toMatchSnapshot();
  });

  it('Render correctly with left icon', () => {
    const { container } = render(
      <InputField {...props} leftIcon={<CloseIcon />} />,
    );
    expect(container).toMatchSnapshot();
  });

  it('Render correctly with right icon', () => {
    const { container } = render(
      <InputField {...props} rightIcon={<CloseIcon />} />,
    );
    expect(container).toMatchSnapshot();
  });

  it('Render correctly with error message', () => {
    const { container } = render(
      <InputField
        {...props}
        isError
        isValidate
        errorMessages="Field is required"
      />,
    );
    expect(container).toMatchSnapshot();
  });

  it('Should call onChange handler when value changes', async () => {
    const { getByPlaceholderText } = render(<InputField {...props} />);

    const inputFiled = getByPlaceholderText('Email');
    await userEvent.type(inputFiled, 'abc');

    expect(mockOnChange).toHaveBeenCalledTimes(3);
  });
});
