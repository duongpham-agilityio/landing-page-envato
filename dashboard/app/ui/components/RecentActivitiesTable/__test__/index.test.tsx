import { useSearchParams, useRouter } from 'next/navigation';
import axios from 'axios';

// Components
import { RecentActivitiesTable } from '../..';

// Hooks
import * as hooks from '@/lib/hooks';

// Provider
import { QueryProvider } from '@/ui/providers';

// Mocks
import { RECENT_ACTIVITIES } from '@/lib/mocks';

// Constants
import { DEBOUNCE_TIME } from '@/lib/constants';

jest.mock('@/lib/hooks', () => ({
  ...jest.requireActual('@/lib/hooks'),
  usePagination: jest.fn(),
  useRecentActivities: jest.fn(),
}));

jest.mock('@chakra-ui/react', () => ({
  ...jest.requireActual('@chakra-ui/react'),
  useToast: () => jest.fn(),
}));

jest.mock('axios');

const resetMock = jest.fn();
const sortByMock = jest.fn();

const SORT_ICON = 'sort-icon';
const SEARCH_ACTIVITY = 'search-transaction';

const setup = () =>
  render(<RecentActivitiesTable />, {
    wrapper: QueryProvider,
  });

describe('Recent Activities table', () => {
  beforeEach(() => {
    jest.spyOn(hooks, 'usePagination').mockReturnValue({
      resetPage: resetMock,
      filterData: RECENT_ACTIVITIES,
      data: [1],
    } as unknown as ReturnType<typeof hooks.usePagination>);
    jest.spyOn(axios, 'get').mockResolvedValue(RECENT_ACTIVITIES);
    (useSearchParams as jest.Mock).mockReturnValue({
      get: jest.fn(),
      forEach: jest.fn(),
    });
    (useRouter as jest.Mock).mockReturnValue({
      push: jest.fn(),
    });
    jest.spyOn(hooks, 'useRecentActivities').mockReturnValue({
      activities: RECENT_ACTIVITIES,
      sortBy: sortByMock,
      isLoading: false,
    } as unknown as ReturnType<typeof hooks.useRecentActivities>);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('Match with snapshot with default prop', () => {
    const { container } = setup();

    waitFor(() => expect(container).toMatchSnapshot());
  });

  jest.useFakeTimers();
  it('Typing input search', async () => {
    const { getByTestId } = setup();
    const input = getByTestId(SEARCH_ACTIVITY) as HTMLInputElement;

    await act(async () => {
      fireEvent.change(input, {
        target: {
          value: 'update',
        },
      });
    });

    jest.advanceTimersByTime(DEBOUNCE_TIME);
    expect(resetMock).toHaveBeenCalled();
  });

  it('Sort action', async () => {
    const { getAllByTestId } = setup();
    const sortIcon = getAllByTestId(SORT_ICON);

    await act(async () => {
      fireEvent.click(sortIcon[0]);
    });

    expect(sortByMock).toHaveBeenCalled();
  });
});
