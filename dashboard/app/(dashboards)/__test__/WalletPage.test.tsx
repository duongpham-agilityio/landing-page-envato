import { QueryProvider } from '@/ui/providers';

import { useSearchParams } from 'next/navigation';
import MyWallets from '../my-wallets/page';

describe('Dashboard render', () => {
  beforeAll(async () => {
    (useSearchParams as jest.Mock).mockReturnValue({
      get: jest.fn(),
      forEach: jest.fn(),
    });
  });

  test('Should render match with snapshot.', async () => {
    const { container } = render(await MyWallets(), { wrapper: QueryProvider });
    await waitFor(() => {
      expect(container).toMatchSnapshot();
    });
  });
});
