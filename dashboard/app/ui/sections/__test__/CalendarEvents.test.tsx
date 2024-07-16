// Libs
import { render, waitFor } from '@testing-library/react';
import { cookies } from 'next/headers';

// Sections
import CalendarEvents from '@/ui/sections/Calendar/CalendarEvents';

// Mocks
import { MOCK_EVENTS_DATA_RES, MOCK_USER_DETAIL } from '@/lib/mocks';

// Types
import { TEvent } from '@/lib/interfaces';

jest.mock('@/lib/services', () => ({
  getEvents: jest.fn(),
}));

// Services
import { getEvents } from '@/lib/services';

describe('CalendarEvents section', () => {
  beforeEach(() => {
    (cookies as jest.Mock).mockReturnValue({
      get: () => ({ value: MOCK_USER_DETAIL.id }),
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('Should render match with snapshot.', async () => {
    (getEvents as jest.MockedFunction<typeof getEvents>).mockResolvedValue({
      events: MOCK_EVENTS_DATA_RES.result,
      totalPage: MOCK_EVENTS_DATA_RES.totalPage,
    });

    const { container } = render(await CalendarEvents());

    waitFor(() => {
      expect(container).toMatchSnapshot();
    });
  });

  it('Should render correctly with events is returned with null array', async () => {
    (cookies as jest.Mock).mockReturnValue({
      get: () => ({ value: null }),
    });

    (getEvents as jest.MockedFunction<typeof getEvents>).mockResolvedValue({
      events: [null] as unknown as (TEvent & { userId: string })[],
      totalPage: 1,
    });

    const { container } = render(await CalendarEvents());

    waitFor(() => {
      expect(container).toBeInTheDocument();
    });
  });
});
