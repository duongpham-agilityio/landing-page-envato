'use client';

import { Box, Th } from '@chakra-ui/react';
import { memo, useCallback, useMemo } from 'react';
import isEqual from 'react-fast-compare';

// Components
import {
  Table,
  Pagination,
  CustomerNameCell,
  HeadCell,
  ActionCell,
  SearchBar,
  StatusCell,
  Fetching,
} from '@/ui/components';

// Utils
import { getTransactionHomePage } from '@/lib/utils';

// Hooks
import {
  TSortField,
  useDebounce,
  usePagination,
  useTransactions,
} from '@/lib/hooks';

// Constants
import {
  COLUMNS_DASHBOARD,
  COLUMNS_HISTORY,
  STATUS_LABEL,
} from '@/lib/constants';

// Types
import { TDataSource, THeaderTable } from '@/lib/interfaces';

interface TFilterUserProps {
  isTableHistory?: boolean;
}

const TransactionTableComponent = ({
  isTableHistory = false,
}: TFilterUserProps) => {
  const {
    data: transactions = [],
    isLoading: isLoadingTransactions,
    isError: isTransactionsError,
    sortBy,
  } = useTransactions({
    name: '',
  });

  const {
    data,
    filterData,
    arrOfCurrButtons,
    isDisabledPrev,
    isDisableNext,
    resetPage,
    handleChangeLimit,
    handlePageChange,
    handlePageClick,
  } = usePagination(transactions);

  // TODO: update handle search later
  // Update search params when end time debounce
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleDebounceSearch = useDebounce((value: string) => {
    resetPage();
    // setSearchTransaction('name', value);
  }, []);

  const renderHead = useCallback(
    (title: string, key: string): JSX.Element => {
      const handleClick = () => {
        sortBy && sortBy(key as TSortField);
      };

      if (!title) return <Th w={50} maxW={50} />;

      return <HeadCell key={title} title={title} onClick={handleClick} />;
    },
    [sortBy],
  );

  const renderNameUser = useCallback(
    ({ id, image, name }: TDataSource): JSX.Element => (
      <CustomerNameCell key={id} id={id} image={image} name={name} />
    ),
    [],
  );

  const renderActionIcon = useCallback(
    (data: TDataSource): JSX.Element => (
      <ActionCell key={`${data.id}-action`} />
    ),
    [],
  );

  type TStatus = keyof typeof STATUS_LABEL;

  const renderPaymentStatus = useCallback(
    ({ paymentStatus }: TDataSource): JSX.Element => (
      <StatusCell
        variant={STATUS_LABEL[`${paymentStatus}` as TStatus]}
        text={paymentStatus}
      />
    ),
    [],
  );

  const renderTransactionStatus = useCallback(
    ({ transactionStatus }: TDataSource): JSX.Element => (
      <StatusCell
        variant={STATUS_LABEL[`${transactionStatus}` as TStatus]}
        text={transactionStatus}
      />
    ),
    [],
  );

  const columns = useMemo(() => {
    if (isTableHistory) {
      return COLUMNS_HISTORY(
        renderHead,
        renderNameUser,
        renderPaymentStatus,
        renderTransactionStatus,
        renderActionIcon,
      );
    }
    return COLUMNS_DASHBOARD(renderHead, renderNameUser, renderActionIcon);
  }, [
    isTableHistory,
    renderActionIcon,
    renderHead,
    renderNameUser,
    renderPaymentStatus,
    renderTransactionStatus,
  ]);

  return (
    <>
      <SearchBar searchValue="" onSearch={handleDebounceSearch} />
      <Fetching isLoading={isLoadingTransactions} isError={isTransactionsError}>
        <Box mt={5}>
          <Table
            columns={columns as THeaderTable[]}
            dataSource={getTransactionHomePage(filterData)}
          />
        </Box>
        {!!transactions.length && (
          <Box mt={8}>
            <Pagination
              pageSize={data.limit}
              currentPage={data.currentPage}
              isDisabledPrev={isDisabledPrev}
              isDisableNext={isDisableNext}
              arrOfCurrButtons={arrOfCurrButtons}
              onLimitChange={handleChangeLimit}
              onPageChange={handlePageChange}
              onClickPage={handlePageClick}
            />
          </Box>
        )}
      </Fetching>
    </>
  );
};

const TransactionTable = memo(TransactionTableComponent, isEqual);

export default TransactionTable;
