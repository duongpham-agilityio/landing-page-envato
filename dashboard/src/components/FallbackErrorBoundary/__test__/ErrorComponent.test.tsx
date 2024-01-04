import { render, screen } from '@testing-library/react';
import FallbackErrorBoundary from '..';

const mockError: Error = {
  name: 'name mock',
  message: 'message mock',
};

const setup = () => render(<FallbackErrorBoundary error={mockError} />);

describe('FallbackErrorBoundary test cases', () => {
  it('should render correctly', () => {
    const { container } = setup();

    expect(container).toMatchSnapshot();
  });

  it('should have the default error title', async () => {
    setup();

    const defaultErrorTitle =
      screen.getByTestId<HTMLParagraphElement>('error-title');

    expect(defaultErrorTitle.textContent).toEqual(
      'An error has been occurred!!',
    );
  });

  it('should match the input error message', async () => {
    setup();

    const inputErrorMessage =
      screen.getByTestId<HTMLParagraphElement>('error-message');

    expect(inputErrorMessage.textContent).toEqual(mockError.message);
  });
});
