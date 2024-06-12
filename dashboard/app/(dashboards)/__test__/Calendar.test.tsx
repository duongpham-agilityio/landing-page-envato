// Utils
import { renderQueryProviderTest } from '@/lib/utils/testUtils';

// Pages
import Calendar from '../calendar/page';

jest.mock('next/headers', () => ({
  cookies: jest.fn().mockReturnValue({
    get: () => ({ value: 'testUserId' }),
  }),
}));

describe('Calendar render', () => {
  test('Should render match with snapshot.', async () => {
    const { container } = renderQueryProviderTest(await Calendar());

    await waitFor(() => {
      expect(container).toMatchSnapshot();
    });
  });
});
