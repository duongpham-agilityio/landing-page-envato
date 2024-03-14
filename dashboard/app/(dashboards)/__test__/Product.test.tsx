import { useSearchParams } from 'next/navigation';

// Pages
import ProductsPage from '../products/page';

// Utils
import { renderQueryProviderTest } from '@/lib/utils/testUtils';

jest.mock('react-intersection-observer');

describe('ProductPage render', () => {
  (useSearchParams as jest.Mock).mockReturnValue({
    get: jest.fn(),
  });

  test('Should render match with snapshot.', () => {
    const { container } = renderQueryProviderTest(<ProductsPage />);

    expect(container).toMatchSnapshot();
  });
});
