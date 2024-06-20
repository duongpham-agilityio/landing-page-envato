// Libs
import { render, screen } from '@testing-library/react';

// Utils
import { formatDecimalNumber } from '@/lib/utils';

// Components
import { TCardProps, CardBalance } from '../CardBalance';

describe('CardBalance Component', () => {
  const mockProps: TCardProps = {
    balance: 1234.56,
    isShowBalance: true,
    onToggleShowBalance: jest.fn(),
  };

  test(' should render to match snapshot', () => {
    const { container } = render(<CardBalance {...mockProps} />);

    expect(container).toMatchSnapshot();
  });

  test('renders the component with balance visible', () => {
    render(<CardBalance {...mockProps} />);

    expect(screen.getByText('Balance')).toBeInTheDocument();
    expect(
      screen.getByText(`$${formatDecimalNumber(mockProps.balance)}`),
    ).toBeInTheDocument();
  });

  test('renders the component with balance hidden', () => {
    render(<CardBalance {...mockProps} isShowBalance={false} />);

    expect(screen.getByText('Balance')).toBeInTheDocument();
    expect(screen.getByText('******')).toBeInTheDocument();
  });

  test('calls onToggleShowBalance when the button is clicked', () => {
    render(<CardBalance {...mockProps} />);

    const button = screen.getByTestId('btn-eye');
    fireEvent.click(button);

    expect(mockProps.onToggleShowBalance).toHaveBeenCalledTimes(1);
  });
});
