import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import { PhoneIcon } from '@chakra-ui/icons';

// component
import { Button } from '@/ui/components';

describe('Button test cases', () => {
  const mockOnClick = jest.fn();
  it('should render correctly', () => {
    const { container } = render(
      <Button
        leftIcon={<PhoneIcon />}
        rightIcon={<PhoneIcon />}
        onClick={mockOnClick}
      >
        Test Button
      </Button>,
    );
    expect(container).toMatchSnapshot();
  });

  it('calls onClick when being clicked', async () => {
    const { getByText } = render(
      <Button onClick={mockOnClick}>Test Checkbox</Button>,
    );
    const checkbox = getByText('Test Checkbox');

    await userEvent.click(checkbox);

    expect(mockOnClick).toHaveBeenCalled();
  });
});
