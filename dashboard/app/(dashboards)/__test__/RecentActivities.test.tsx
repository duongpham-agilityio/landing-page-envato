import { useSearchParams } from 'next/navigation';

// Pages
import RecentActivitiesPage from '../recent-activities/page';

// Utils
import { renderQueryProviderTest } from '@/lib/utils/testUtils';

jest.mock('react-intersection-observer');

describe('RecentActivitiesPage render', () => {
  (useSearchParams as jest.Mock).mockReturnValue({
    get: jest.fn(),
  });

  test('Should render match with snapshot.', () => {
    const { container } = renderQueryProviderTest(<RecentActivitiesPage />);

    expect(container).toMatchSnapshot();
  });
});
