import { render } from '@testing-library/react';

// Mocks
import { TOTAL_EARNINGS_MOCK } from '@/lib/mocks';

// Components
import { TotalStatisticCard } from '@/ui/components';

jest.mock('react-apexcharts', () => ({
  __esModule: true,
  default: () => <div />,
}));

describe('TotalCard component', () => {
  it('renders correctly', () => {
    const { container } = render(
      <TotalStatisticCard {...TOTAL_EARNINGS_MOCK} />,
    );

    expect(container).toMatchSnapshot();
  });

  it('Get TotalBalance component', () => {
    const { getByText } = render(
      <TotalStatisticCard
        title="Total earnings"
        total={10}
        growth={20}
        weeklyIncome={TOTAL_EARNINGS_MOCK.weeklyIncome}
      />,
    );

    const totalBalance = getByText('Total earnings');
    expect(totalBalance).toBeTruthy();
  });
});
