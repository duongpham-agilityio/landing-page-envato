import { render } from '@testing-library/react';

// Components
import { RevenueFlow } from '@/ui/components';

// Mock
import { REVENUE_FLOW_MOCK } from '@/lib/mocks';
import userEvent from '@testing-library/user-event';

jest.mock('react-apexcharts', () => ({
  __esModule: true,
  default: () => <div>Mocked Chart Component</div>,
}));

const setup = () => render(<RevenueFlow data={REVENUE_FLOW_MOCK} />);

describe('RevenueFlow component', () => {
  it('renders correctly', () => {
    const { container } = setup();

    expect(container).toMatchSnapshot();
  });

  it('handles changing the select option', async () => {
    const { getByRole, getByText } = setup();
    const select = getByRole('button');
    await userEvent.click(select);
    const selectOption = getByText('Jan - Jun');
    await userEvent.click(selectOption);

    expect(select.textContent).toBe('Jan - Jun');
  });
});
