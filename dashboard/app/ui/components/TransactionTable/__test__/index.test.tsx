import { useSearchParams, useRouter } from 'next/navigation';
import axios from 'axios';

// Components
import TransactionTable from '..';

// Hooks
import * as hooks from '@/lib/hooks';

// Provider
import { QueryProvider } from '@/ui/providers';

// Mocks
import { TRANSACTIONS } from '@/lib/mocks';

// Constants
import { DEBOUNCE_TIME, TRANSACTION_STATUS } from '@/lib/constants';

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
const DOT_ICON = 'dot-icon';
const DEL_ICON = 'del-icon';
const ACCEPT_BUTTON = 'accept-del';

const setup = (isOpenHistoryModal = false) =>
  render(
    <TransactionTable {...(isOpenHistoryModal && { isOpenHistoryModal })} />,
    {
      wrapper: QueryProvider,
    },
  );

describe('Transaction table', () => {
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

  it('Match with snapshot with isOpenHistoryModal = true', () => {
    const { container } = setup(true);

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

  it('Delete transaction success', async () => {
    jest.spyOn(axios, 'put').mockResolvedValue([]);
    const { getAllByTestId, getByTestId } = setup();
    const dotIcons = getAllByTestId(DOT_ICON);

    await act(async () => fireEvent.click(dotIcons[0]));

    const delIcon = getAllByTestId(DEL_ICON)[0];

    await waitFor(async () => fireEvent.click(delIcon));

    await waitFor(async () => fireEvent.click(getByTestId(ACCEPT_BUTTON)));

    await waitFor(async () => {
      expect(deleteTransactionMock).toHaveBeenCalledWith(
        {
          transactionId: '1701513537051',
          transactionStatus: TRANSACTION_STATUS.ARCHIVED,
        },
        expect.objectContaining({
          onSuccess: expect.any(Function),
          onError: expect.any(Function),
        }),
      );

      deleteTransactionMock.mock.calls[0][1].onSuccess();
    });
  });

  it('Delete transaction failed', async () => {
    jest.spyOn(axios, 'put').mockRejectedValue([]);
    const { getAllByTestId, getByTestId } = setup();
    const dotIcons = getAllByTestId(DOT_ICON);

    await act(async () => fireEvent.click(dotIcons[0]));

    const delIcon = getAllByTestId(DEL_ICON)[0];

    await waitFor(async () => fireEvent.click(delIcon));

    await waitFor(async () => fireEvent.click(getByTestId(ACCEPT_BUTTON)));

    await waitFor(async () => {
      expect(deleteTransactionMock).toHaveBeenCalledWith(
        {
          transactionId: '1701513537051',
          transactionStatus: TRANSACTION_STATUS.ARCHIVED,
        },
        expect.objectContaining({
          onSuccess: expect.any(Function),
          onError: expect.any(Function),
        }),
      );

      deleteTransactionMock.mock.calls[1][1].onError();
    });
  });

  // TODO: Error "long-running", will check and update later
  // const EDIT_ICON = 'edit-icon';
  // const INPUT_FIELD_NAME = 'edit-field-name';
  // it('Edit transaction success', async () => {
  //   jest.spyOn(axios, 'put').mockResolvedValue([]);
  //   const { getAllByTestId, getByTestId } = setup();
  //   const dotIcons = getAllByTestId(DOT_ICON);

  //   await act(async () => fireEvent.click(dotIcons[0]));

  //   const editIcon = getAllByTestId(EDIT_ICON)[0];

  //   await waitFor(() => fireEvent.click(editIcon));
  //   await waitFor(() => {
  //     fireEvent.change(getByTestId(INPUT_FIELD_NAME), {
  //       target: {
  //         value: '123',
  //       },
  //     });
  //     fireEvent.click(getByTestId(ACCEPT_BUTTON));
  //   });

  //   await waitFor(async () => {
  //     expect(updateTransactionMock).toHaveBeenCalledWith(
  //       {
  //         transactionId: '1701513537051',
  //         transactionStatus: TRANSACTION_STATUS.ARCHIVED,
  //       },
  //       expect.objectContaining({
  //         onSuccess: expect.any(Function),
  //         onError: expect.any(Function),
  //       }),
  //     );

  //     updateTransactionMock.mock.calls[2][1].onSuccess();
  //   });
  // });

  // it('Edit transaction failed', async () => {
  //   jest.spyOn(axios, 'put').mockRejectedValue([]);
  //   const { getAllByTestId, getByTestId } = setup();
  //   const dotIcons = getAllByTestId(DOT_ICON);

  //   await act(async () => fireEvent.click(dotIcons[0]));

  //   const delIcon = getAllByTestId(DEL_ICON)[0];

  //   await waitFor(async () => fireEvent.click(delIcon));

  //   await waitFor(async () => fireEvent.click(getByTestId(ACCEPT_BUTTON)));

  //   await waitFor(async () => {
  //     expect(deleteTransactionMock).toHaveBeenCalledWith(
  //       {
  //         transactionId: '1701513537051',
  //         transactionStatus: TRANSACTION_STATUS.ARCHIVED,
  //       },
  //       expect.objectContaining({
  //         onSuccess: expect.any(Function),
  //         onError: expect.any(Function),
  //       }),
  //     );

  //     deleteTransactionMock.mock.calls[1][1].onError();
  //   });
  // });
});
