import preloadAll from 'jest-next-dynamic';

// Utils
import { renderQueryProviderTest } from '@/lib/utils/testUtils';

// Sections
import { DashBoardSection } from '..';

describe('DashBoardSection render', () => {
  beforeEach(async () => {
    await preloadAll();
  });

  test('Should render match with snapshot.', () => {
    const { container } = renderQueryProviderTest(<DashBoardSection />);

    expect(container).toMatchSnapshot();
  });
});
