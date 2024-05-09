// Libs
import { renderHook, act } from '@testing-library/react';

// Constants
import { TRANSACTION_STATUS } from '@/lib/constants';

// Hooks
import { useTransactions } from '@/lib/hooks';

// Services
import { MainHttpService } from '@/lib/services';

// Utils
import { sortByKey, queryProviderWrapper } from '@/lib/utils';

// Mocks
import {
  MOCK_TRANSACTIONS_SUCCESS_RES,
  MOCK_UPDATE_SUCCESS_RES,
  TRANSACTIONS,
} from '@/lib/mocks';

describe('useTransactions', () => {
  jest
    .spyOn(MainHttpService, 'get')
    .mockResolvedValue(MOCK_TRANSACTIONS_SUCCESS_RES);

  it('should fetch transactions data successfully', async () => {
    const { result } = renderHook(() => useTransactions(), {
      wrapper: queryProviderWrapper,
    });

    await waitFor(() => expect(result.current.data).toEqual(TRANSACTIONS));
  });

  it('should sort asc transactions successfully', async () => {
    const expectResult = sortByKey(TRANSACTIONS, 'amount', false);

    const { result } = renderHook(() => useTransactions(), {
      wrapper: queryProviderWrapper,
    });

    act(() => {
      result.current.sortBy('spent');
    });

    await waitFor(() => expect(result.current.data).toEqual(expectResult));
  });

  it('should sort desc transactions successfully', async () => {
    const expectResult = sortByKey(TRANSACTIONS, 'amount', true);

    const { result } = renderHook(() => useTransactions(), {
      wrapper: queryProviderWrapper,
    });

    act(() => {
      result.current.sortBy('spent');
      result.current.sortBy('spent');
    });

    await waitFor(() => expect(result.current.data).toEqual(expectResult));
  });

  it('should search transactions successfully by location', async () => {
    const { result } = renderHook(() => useTransactions({ name: '123' }), {
      wrapper: queryProviderWrapper,
    });

    await waitFor(() => expect(result.current.data).toEqual(TRANSACTIONS));
  });

  it('should search transactions successfully by name', async () => {
    const { result } = renderHook(
      () =>
        useTransactions({
          name: TRANSACTIONS[0].customer.firstName.toLowerCase(),
        }),
      {
        wrapper: queryProviderWrapper,
      },
    );

    await waitFor(() => expect(result.current.data).toEqual([TRANSACTIONS[0]]));
  });

  it('should update transactions successfully if have that item in cache', async () => {
    jest
      .spyOn(MainHttpService, 'put')
      .mockResolvedValue(MOCK_UPDATE_SUCCESS_RES);

    const { result } = renderHook(() => useTransactions(), {
      wrapper: queryProviderWrapper,
    });

    result.current.updateTransaction({ transactionId: TRANSACTIONS[0]._id });

    await waitFor(() =>
      expect(jest.spyOn(MainHttpService, 'put')).toHaveBeenCalled(),
    );
  });

  it('should update transactions successfully if NO have that item in cache', async () => {
    jest
      .spyOn(MainHttpService, 'put')
      .mockResolvedValue(MOCK_UPDATE_SUCCESS_RES);

    const { result } = renderHook(() => useTransactions(), {
      wrapper: queryProviderWrapper,
    });

    result.current.updateTransaction({ transactionId: '1' });

    await waitFor(() =>
      expect(jest.spyOn(MainHttpService, 'put')).toHaveBeenCalled(),
    );
  });

  it('should delete transactions successfully if have that item in cache', async () => {
    jest
      .spyOn(MainHttpService, 'put')
      .mockResolvedValue(MOCK_UPDATE_SUCCESS_RES);

    const { result } = renderHook(() => useTransactions(), {
      wrapper: queryProviderWrapper,
    });

    result.current.deleteTransaction({ transactionId: TRANSACTIONS[0]._id });

    await waitFor(() =>
      expect(result.current.data[0].transactionStatus).toEqual(
        TRANSACTION_STATUS.ARCHIVED,
      ),
    );
  });

  it('should delete transactions successfully if NO have that item in cache', async () => {
    jest
      .spyOn(MainHttpService, 'put')
      .mockResolvedValue(MOCK_UPDATE_SUCCESS_RES);

    const { result } = renderHook(() => useTransactions(), {
      wrapper: queryProviderWrapper,
    });

    result.current.deleteTransaction({ transactionId: '1' });

    await waitFor(() => expect(result.current.data).toEqual(TRANSACTIONS));
  });
});
