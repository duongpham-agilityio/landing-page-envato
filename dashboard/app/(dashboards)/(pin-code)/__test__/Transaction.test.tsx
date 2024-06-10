import { useSearchParams } from 'next/navigation';

// Pages
import TransactionPage from '../transactions/page';

// Utils
import { renderQueryProviderTest } from '@/lib/utils/testUtils';

describe('TransactionPage render', () => {
  (useSearchParams as jest.Mock).mockReturnValue({
    get: jest.fn(),
  });

  test('Should render match with snapshot.', () => {
    const { container } = renderQueryProviderTest(<TransactionPage />);

    expect(container).toMatchSnapshot();
  });
});
