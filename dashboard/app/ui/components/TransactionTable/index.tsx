'use client';

import Link from 'next/link';
import { memo, useCallback, useMemo, useState } from 'react';
import { Box, Td, Text, Th, useToast } from '@chakra-ui/react';

// Components
import {
  Table,
  Pagination,
  CustomerNameCell,
  HeadCell,
  SearchBar,
  StatusCell,
  Fetching,
  ActionCell,
  Indicator,
} from '@/ui/components';

// Utils
import {
  formatUppercaseFirstLetter,
  formatTransactionResponse,
} from '@/lib/utils';
import { customToast } from '@/lib/utils/toast';

// Hooks
import {
  TSortField,
  useDebounce,
  usePagination,
  useSearch,
  useTransactions,
} from '@/lib/hooks';

// Constants
import {
  COLUMNS_DASHBOARD,
  COLUMNS_HISTORY,
  ERROR_MESSAGES,
  STATUS,
  STATUS_LABEL,
  SUCCESS_MESSAGES,
  TRANSACTION_STATUS,
  MONTHS_OPTIONS,
  ROLES,
} from '@/lib/constants';
import { TYPE } from '@/lib/constants/notification';

// Types
import { TDataSource, THeaderTable, TTransaction } from '@/lib/interfaces';

// Stores
import { authStore } from '@/lib/stores';

interface TFilterUserProps {
  isOpenHistoryModal?: boolean;
}

const TransactionTableComponent = ({
  isOpenHistoryModal = false,
}: TFilterUserProps) => {
  const toast = useToast();
  const userId = authStore((state) => state.user?.id);
  const { get, setSearchParam: setSearchTransaction } = useSearch();
  const [filter, setFilter] = useState<string>('');

  const {
    data: transactions = [],
    dataHistory,
    dataTransaction,
    isLoading: isLoadingTransactions,
    isError: isTransactionsError,
    isDeleteTransaction,
    isUpdateTransaction,
    sortBy,
    updateTransaction,
    deleteTransaction,
  } = useTransactions({
    name: get('name') || '',
  });

  const listData = isOpenHistoryModal ? dataHistory : dataTransaction;

  const transactionsMemorized = useMemo(
    () =>
      listData.filter(({ createdAt, customer: { role } }) => {
        if (isOpenHistoryModal) {
          const month: string = new Date(createdAt)
            .toLocaleString('default', { month: 'short' })
            .toLowerCase();

          return month.includes(filter.trim());
        }

        return role?.trim().includes(filter);
      }),
    [filter, listData, isOpenHistoryModal],
  );

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
  } = usePagination(transactionsMemorized);

  const handleUpdateTransaction = useCallback(
    (updateCustomer: TTransaction) => {
      const {
        customer: { firstName, lastName, address },
      } = updateCustomer;
      updateTransaction(
        {
          transactionId: updateCustomer._id,
          userId: userId,
          firstName: firstName,
          lastName: lastName,
          state: address.state,
          street: address.street,
          city: address.city,
          zip: address.zip,
        },
        {
          onSuccess: () => {
            toast(
              customToast(
                SUCCESS_MESSAGES.UPDATE_TRANSACTION_SUCCESS.title,
                SUCCESS_MESSAGES.UPDATE_TRANSACTION_SUCCESS.description,
                STATUS.SUCCESS,
              ),
            );
          },
          onError: () => {
            toast(
              customToast(
                ERROR_MESSAGES.UPDATE_TRANSACTION_FAIL.title,
                ERROR_MESSAGES.UPDATE_TRANSACTION_FAIL.description,
                STATUS.ERROR,
              ),
            );
          },
        },
      );
    },
    [updateTransaction],
  );

  const handleDeleteTransaction = useCallback(
    (updateData: Partial<TTransaction & { id: string }>) => {
      deleteTransaction(
        {
          transactionId: updateData.id,
          userId: userId,
          transactionStatus: TRANSACTION_STATUS.ARCHIVED,
        },
        {
          onSuccess: () => {
            toast(
              customToast(
                SUCCESS_MESSAGES.DELETE_SUCCESS.title,
                SUCCESS_MESSAGES.DELETE_SUCCESS.description,
                STATUS.SUCCESS,
              ),
            );
          },
          onError: () => {
            toast(
              customToast(
                ERROR_MESSAGES.DELETE_FAIL.title,
                ERROR_MESSAGES.DELETE_FAIL.description,
                STATUS.ERROR,
              ),
            );
          },
        },
      );
    },
    [deleteTransaction],
  );

  // Update search params when end time debounce
  const handleDebounceSearch = useDebounce((value: string) => {
    resetPage();
    setSearchTransaction('name', value);
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
      <CustomerNameCell id={id} key={id} image={image} name={name} />
    ),
    [],
  );

  type TStatus = keyof typeof STATUS_LABEL;

  const renderPaymentStatus = useCallback(
    ({ paymentStatus }: TDataSource): JSX.Element => (
      <StatusCell
        variant={STATUS_LABEL[`${paymentStatus}` as TStatus]}
        text={paymentStatus as string}
      />
    ),
    [],
  );

  const renderTransactionStatus = useCallback(
    ({ transactionStatus }: TDataSource): JSX.Element => (
      <StatusCell
        variant={STATUS_LABEL[`${transactionStatus}` as TStatus]}
        text={transactionStatus as string}
      />
    ),
    [],
  );

  const renderActionIcon = useCallback(
    (data: TTransaction) => (
      <ActionCell
        key={`${data._id}-action`}
        isOpenModal={!isOpenHistoryModal}
        transaction={data}
        onDeleteTransaction={handleDeleteTransaction}
        onUpdateTransaction={handleUpdateTransaction}
      />
    ),
    [],
  );

  const renderRole = useCallback(
    ({ customer: { role } }: TTransaction): JSX.Element => (
      <Td
        py={5}
        pr={5}
        pl={0}
        fontSize="md"
        color="text.primary"
        fontWeight="semibold"
        w={{ base: 150, md: 20 }}
      >
        <Text
          fontSize="md"
          fontWeight="semibold"
          whiteSpace="break-spaces"
          noOfLines={1}
          w={{ base: 100, md: 150, '3xl': 100, '6xl': 200 }}
          flex={1}
        >
          {formatUppercaseFirstLetter(role)}
        </Text>
      </Td>
    ),
    [],
  );

  const renderSpent = useCallback(({ amount, type }: TTransaction) => {
    const isSendMoney = type === TYPE.SEND_MONEY;

    return (
      <Td
        py={5}
        pr={5}
        pl={0}
        fontSize="md"
        color="text.primary"
        fontWeight="semibold"
        textAlign="left"
        w={{ base: 150, md: 20 }}
      >
        <Text
          fontSize="md"
          fontWeight="semibold"
          whiteSpace="break-spaces"
          color={isSendMoney ? 'red.600' : 'text.currencyColor'}
          noOfLines={1}
          w={{ base: 100, md: 150, '3xl': 200, '5xl': 110, '7xl': 200 }}
          flex={1}
        >
          {amount}
        </Text>
      </Td>
    );
  }, []);

  const renderEmail = useCallback(
    ({ customer: { email } }: TTransaction) => (
      <Td
        py={5}
        pr={5}
        pl={0}
        fontSize="md"
        color="text.primary"
        fontWeight="semibold"
        textAlign="left"
        w={{ base: 150, md: 20 }}
      >
        <Text
          as={Link}
          href={`mailto:${email}`}
          fontSize="md"
          fontWeight="semibold"
          whiteSpace="break-spaces"
          noOfLines={1}
          w={{ base: 100, md: 220, '3xl': 300, '5xl': 200, '7xl': 350 }}
          flex={1}
        >
          {email}
        </Text>
      </Td>
    ),
    [],
  );

  const columns = useMemo(() => {
    if (isOpenHistoryModal) {
      return COLUMNS_HISTORY(
        renderHead,
        renderNameUser,
        renderPaymentStatus,
        renderTransactionStatus,
        renderSpent,
      );
    }
    return COLUMNS_DASHBOARD(
      renderHead,
      renderRole,
      renderNameUser,
      renderActionIcon,
      renderSpent,
      renderEmail,
    );
  }, [
    isOpenHistoryModal,
    renderActionIcon,
    renderEmail,
    renderHead,
    renderNameUser,
    renderPaymentStatus,
    renderRole,
    renderSpent,
    renderTransactionStatus,
  ]);

  return (
    <Indicator isOpen={isUpdateTransaction || isDeleteTransaction}>
      <SearchBar
        filterOptions={isOpenHistoryModal ? MONTHS_OPTIONS : ROLES}
        searchValue={get('name') || ''}
        onSearch={handleDebounceSearch}
        onFilter={setFilter}
      />
      <Fetching
        quality={15}
        isLoading={isLoadingTransactions}
        isError={isTransactionsError}
      >
        <Box mt={5}>
          <Table
            columns={columns as THeaderTable[]}
            dataSource={formatTransactionResponse(filterData)}
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
    </Indicator>
  );
};

const TransactionTable = memo(TransactionTableComponent);

export default TransactionTable;
