import { render } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import userEvent from '@testing-library/user-event';

const queryClient = new QueryClient();

// Component
import { Efficiency } from '@/ui/components';
import { EFFICIENCY_MOCK } from '@/lib/mocks';

jest.mock('react-apexcharts', () => ({
  __esModule: true,
  default: () => <div>EfficiencyInfo component</div>,
}));

const useGetStatisticMock = jest.fn();

jest.mock('@/lib/hooks', () => ({
  ...jest.requireActual('@/lib/hooks'),
  useGetStatistic: () => useGetStatisticMock(),
}));

const setup = () =>
  render(
    <QueryClientProvider client={queryClient}>
      <Efficiency />
    </QueryClientProvider>,
  );

describe('Efficiency component', () => {
  beforeEach(() => {
    useGetStatisticMock.mockReturnValue({
      data: EFFICIENCY_MOCK,
    });
  });
  it('renders correctly', () => {
    const { container } = setup();

    expect(container).toMatchSnapshot();
  });

  it('handles changing the select option', async () => {
    const { getByRole, getByText } = setup();
    const select = getByRole('button');
    await userEvent.click(select);
    const selectOption = getByText('Monthly');
    await userEvent.click(selectOption);

    expect(select.textContent).toBe('Monthly');
  });

  it('show error when fetch data failed', () => {
    useGetStatisticMock.mockReturnValue({
      isError: true,
    });
    const { getByText } = setup();
    const errorMessage = getByText('Efficiency data error');
    expect(errorMessage).toBeDefined();
  });
});
