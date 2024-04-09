import preloadAll from 'jest-next-dynamic';
import MyWalletsSection from '../MyWalletSection';
import { renderQueryProviderTest } from '@/lib/utils/testUtils';

jest.mock('@/lib/hooks', () => ({
  ...jest.requireActual('@/lib/hooks'),
  useSearch: jest.fn(() => ({
    get: jest.fn(),
  })),
}));

describe('MyWalletSection render', () => {
  beforeAll(async () => {
    await preloadAll();
  });
  test('should render snapshot', () => {
    const { container } = renderQueryProviderTest(<MyWalletsSection />);

    expect(container).toMatchSnapshot();
  });
});
