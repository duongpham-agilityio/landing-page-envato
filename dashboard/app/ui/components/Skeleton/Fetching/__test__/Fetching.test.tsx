import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

// Components
import { Fetching } from '@/ui/components';

describe('Fetching component', () => {
  it('should renders correctly', () => {
    const { container } = render(<Fetching isLoading />);

    expect(container).toMatchSnapshot();
  });

  it('should renders children when not loading or in error state', () => {
    render(<Fetching>{'Content'}</Fetching>);

    expect(screen.getByText('Content')).toBeInTheDocument();
  });

  it('should renders error message when in error state', () => {
    render(<Fetching isError errorMessage="Error Message" />);

    expect(screen.getByText('Error Message')).toBeInTheDocument();
  });
});
