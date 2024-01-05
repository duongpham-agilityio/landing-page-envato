import { render } from '@testing-library/react';

// Components
import { SPENDING_STATISTICS_MOCK } from '@/lib/mocks';

// Mocks
import { TotalStatisticList } from '@/ui/components';

jest.mock('react-apexcharts', () => ({
  __esModule: true,
  default: () => <div />,
}));

describe('TotalList component', () => {
  it('renders correctly', () => {
    const { container } = render(
      <TotalStatisticList spendingStatistics={SPENDING_STATISTICS_MOCK} />,
    );

    expect(container).toMatchSnapshot();
  });

  it('renders with is loading is true', () => {
    const { container } = render(
      <TotalStatisticList
        spendingStatistics={SPENDING_STATISTICS_MOCK}
        isLoading
      />,
    );

    expect(container).toMatchSnapshot();
  });
});
