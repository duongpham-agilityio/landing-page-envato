import preloadAll from 'jest-next-dynamic';
import { useRouter, useSearchParams } from 'next/navigation';

// Utils
import { renderQueryProviderTest } from '@/lib/utils/testUtils';

// Sections
import { TransactionSection } from '..';

describe('TransactionSection render', () => {
  beforeEach(async () => {
    await preloadAll();
    (useRouter as jest.Mock).mockImplementation(() => ({
      push: jest.fn(),
    }));
    (useSearchParams as jest.Mock).mockImplementation(
      () => new URLSearchParams(),
    );

    (useSearchParams as jest.Mock).mockReturnValue({
      get: jest.fn(),
    });
  });

  test('Should render match with snapshot.', () => {
    const { container } = renderQueryProviderTest(<TransactionSection />);

    expect(container).toMatchSnapshot();
  });
});
