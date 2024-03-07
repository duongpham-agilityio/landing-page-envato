import { useSearchParams, useRouter } from 'next/navigation';
import axios from 'axios';

// Components
import HistoriesTable from '..';

// Hooks
import * as hooks from '@/lib/hooks';

// Provider
import { QueryProvider } from '@/ui/providers';

// Mocks
import { TRANSACTIONS } from '@/lib/mocks';

// Constants
import { DEBOUNCE_TIME } from '@/lib/constants';

jest.mock('@/lib/hooks', () => ({
  ...jest.requireActual('@/lib/hooks'),
  usePagination: jest.fn(),
  useTransactions: jest.fn(),
}));

jest.mock('axios');

const resetMock = jest.fn();
const sortByMock = jest.fn();
const deleteTransactionMock = jest.fn();
const updateTransactionMock = jest.fn();

const SORT_ICON = 'sort-icon';
const SEARCH_TRANSACTION = 'search-transaction';

const setup = () =>
  render(<HistoriesTable />, {
    wrapper: QueryProvider,
  });

describe('Histories table', () => {
  beforeEach(() => {
    jest.spyOn(hooks, 'usePagination').mockReturnValue({
      resetPage: resetMock,
      filterData: TRANSACTIONS,
      data: [1],
    } as unknown as ReturnType<typeof hooks.usePagination>);
    jest.spyOn(axios, 'get').mockResolvedValue(TRANSACTIONS);
    (useSearchParams as jest.Mock).mockReturnValue({
      get: jest.fn(),
      forEach: jest.fn(),
    });
    (useRouter as jest.Mock).mockReturnValue({
      push: jest.fn(),
    });
    jest.spyOn(hooks, 'useTransactions').mockReturnValue({
      isLoading: false,
      dataHistory: TRANSACTIONS,
      dataTransaction: TRANSACTIONS,
      sortBy: sortByMock,
      deleteTransaction: deleteTransactionMock,
      updateTransaction: updateTransactionMock,
    } as unknown as ReturnType<typeof hooks.useTransactions>);
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
    const input = getByTestId(SEARCH_TRANSACTION) as HTMLInputElement;

    await act(async () => {
      fireEvent.change(input, {
        target: {
          value: '123',
        },
      });
    });

    jest.advanceTimersByTime(DEBOUNCE_TIME);
    expect(resetMock).toHaveBeenCalled();
  });

  it('Sort transaction', async () => {
    const { getAllByTestId } = setup();
    const sortIcon = getAllByTestId(SORT_ICON);

    await act(async () => {
      fireEvent.click(sortIcon[0]);
    });

    expect(sortByMock).toHaveBeenCalled();
  });
});
