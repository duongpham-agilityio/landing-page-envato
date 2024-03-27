'use client';

import { Box, Flex, Td, Text, Th, Tooltip, useToast } from '@chakra-ui/react';
import { memo, useCallback, useMemo } from 'react';
import Link from 'next/link';

// Components
import {
  Table,
  HeadCell,
  SearchBar,
  Fetching,
  ActionCell,
  Pagination,
  Indicator,
} from '@/ui/components';

// Constants
import {
  COLUMNS_RECENT_ACTIVITIES,
  ERROR_MESSAGES,
  MONTHS_OPTIONS,
  STATUS,
  SUCCESS_MESSAGES,
} from '@/lib/constants';

// Interfaces
import { TDataSource, THeaderTable, TRecentActivities } from '@/lib/interfaces';

// hooks
import {
  TActivitiesSortField,
  useDebounce,
  usePagination,
  useRecentActivities,
  useSearch,
} from '@/lib/hooks';

// Utils
import {
  customToast,
  formatRecentActivitiesResponse,
  formatUppercaseFirstLetter,
} from '@/lib/utils';

// Store
import { authStore } from '@/lib/stores';

const RecentActivitiesTableComponent = () => {
  const toast = useToast();
  const userId = authStore((state) => state.user?.id);
  const { get, setSearchParam: setSearchTransaction } = useSearch();

  const {
    activities,
    isLoading: isLoadingActivities,
    isError: isActivitiesError,
    sortBy,
    deleteActivity,
    isDeleteActiviy,
  } = useRecentActivities({
    actionName: get('actionName') || '',
    userId: userId,
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
  } = usePagination(activities);

  const handleDebounceSearch = useDebounce((value: string) => {
    resetPage();
    setSearchTransaction('actionName', value);
  }, []);

  const handleDeleteActivities = useCallback(
    (
      data: Partial<
        TRecentActivities & { userId: string; activitiesId: string }
      >,
    ) => {
      deleteActivity(
        {
          activitiesId: data._id,
          userId: userId,
        },
        {
          onSuccess: () => {
            toast(
              customToast(
                SUCCESS_MESSAGES.DELETE_PRODUCT_SUCCESS.title,
                SUCCESS_MESSAGES.DELETE_PRODUCT_SUCCESS.description,
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
    [deleteActivity, toast, userId],
  );

  const renderHead = useCallback(
    (title: string, key: string): JSX.Element => {
      const handleClick = () => {
        sortBy && sortBy(key as TActivitiesSortField);
      };

      return !title ? (
        <Th w={50} maxW={50} />
      ) : (
        <HeadCell key={title} title={title} onClick={handleClick} />
      );
    },
    [sortBy],
  );

  const renderNameUser = useCallback(
    ({ actionName }: TDataSource): JSX.Element => (
      <Td
        py={5}
        pr={5}
        pl={0}
        fontSize="md"
        color="text.primary"
        fontWeight="semibold"
        textAlign="left"
        w={{ base: 200, xl: 220, '3xl': 200, '6xl': 250 }}
      >
        <Flex alignItems="center" gap="10px">
          <Tooltip
            minW="max-content"
            placement="bottom-start"
            label={actionName as string}
          >
            <Text
              display="block"
              fontSize="md"
              fontWeight="semibold"
              wordBreak="break-all"
              textOverflow="ellipsis"
              overflow="hidden"
              pr={10}
              flex={1}
              w={{ base: 200, xl: 220, '3xl': 200, '6xl': 250 }}
            >
              {formatUppercaseFirstLetter(`${actionName}`)}
            </Text>
          </Tooltip>
        </Flex>
      </Td>
    ),
    [],
  );

  const renderActionIcon = useCallback(
    (data: TRecentActivities) => (
      <ActionCell
        activities={data}
        key={`${data._id}-action`}
        isOpenModal={true}
        titleDelete="Delete Activity"
        itemName={data.actionName}
        onDeleteActivity={handleDeleteActivities}
      />
    ),
    [handleDeleteActivities],
  );

  const renderEmail = useCallback(
    ({ email }: TRecentActivities) => (
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

  const columns = useMemo(
    () =>
      COLUMNS_RECENT_ACTIVITIES(
        renderHead,
        renderNameUser,
        renderEmail,
        renderActionIcon,
      ),
    [renderHead, renderNameUser, renderEmail, renderActionIcon],
  );

  return (
    <Indicator isOpen={isDeleteActiviy}>
      <Flex flexDirection={{ base: 'column', lg: 'row' }}>
        <SearchBar
          placeholder="Search by name or email"
          filterOptions={MONTHS_OPTIONS}
          searchValue={get('actionName')?.toLowerCase() || ''}
          onSearch={handleDebounceSearch}
        />
      </Flex>
      <Fetching
        quality={15}
        isLoading={isLoadingActivities}
        isError={isActivitiesError}
      >
        <Box mt={5}>
          <Table
            columns={columns as unknown as THeaderTable[]}
            dataSource={formatRecentActivitiesResponse(filterData)}
          />
        </Box>
        {!!activities?.length && (
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

const RecentActivitiesTable = memo(RecentActivitiesTableComponent);

export default RecentActivitiesTable;
