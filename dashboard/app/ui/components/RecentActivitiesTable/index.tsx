'use client';

import { Box, Flex, Td, Text, Th, Tooltip } from '@chakra-ui/react';
import { memo, useCallback, useMemo, useState } from 'react';
import Link from 'next/link';

// Components
import {
  Table,
  HeadCell,
  SearchBar,
  Fetching,
  Pagination,
  Indicator,
} from '@/ui/components';
import { TOption } from '../common/Select';

// Constants
import {
  ACTIVITY_OPTIONS,
  COLUMNS_RECENT_ACTIVITIES,
  PREV,
} from '@/lib/constants';

// Interfaces
import { TDataSource, THeaderTable, TRecentActivities } from '@/lib/interfaces';

// hooks
import {
  TActivitiesSortField,
  useDebounce,
  useRecentActivities,
  useSearch,
} from '@/lib/hooks';

// Utils
import {
  formatRecentActivitiesResponse,
  formatUppercaseFirstLetter,
} from '@/lib/utils';

const RecentActivitiesTableComponent = () => {
  const { get, setSearchParam: setSearchTransaction } = useSearch();
  const [filter, setFilter] = useState<string>('');

  const {
    activities,
    limit,
    isLoading: isLoadingActivities,
    isError: isActivitiesError,
    pageArray,
    currentPage,
    isDisableNext,
    isDisablePrev,
    sortBy,
    setCurrentPage,
    setLimit,
    resetPage,
  } = useRecentActivities({
    actionName: get('actionName')?.toLowerCase() || '',
  });

  const activityMemorized = useMemo(
    () =>
      activities.filter(
        ({ actionName }) => actionName?.trim().includes(filter),
      ),
    [activities, filter],
  );

  const handleDebounceSearch = useDebounce((value: string) => {
    resetPage();
    setSearchTransaction('actionName', value);
  }, []);

  const handleClickPage = (value: number) => setCurrentPage(value);

  const handlePageChange = useCallback(
    (direction: string) => {
      setCurrentPage(direction === PREV ? currentPage - 1 : currentPage + 1);
    },
    [currentPage, setCurrentPage],
  );

  const handleChangeLimit = useCallback(
    (limit: TOption) => {
      setLimit(+limit.value);
      resetPage();
    },
    [resetPage, setLimit],
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

  const renderIdAction = useCallback(
    ({ _id }: TDataSource): JSX.Element => (
      <Td
        py={5}
        pr={5}
        pl={0}
        fontSize="md"
        color="text.primary"
        fontWeight="semibold"
        textAlign="left"
        w={{ base: 150, md: 250, '6xl': 300 }}
      >
        <Flex alignItems="center" gap="10px">
          <Tooltip
            minW="max-content"
            placement="bottom-start"
            label={_id as string}
          >
            <Text
              display="block"
              fontSize={{ base: '12px', md: '16px' }}
              fontWeight="semibold"
              wordBreak="break-all"
              textOverflow="ellipsis"
              overflow="hidden"
              pr={10}
              flex={1}
              w={{ base: 150, md: 250, '6xl': 300 }}
            >
              {formatUppercaseFirstLetter(`${_id}`)}
            </Text>
          </Tooltip>
        </Flex>
      </Td>
    ),
    [],
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
        w={{ base: 150, md: 250, '6xl': 300 }}
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
              w={{ base: 150, md: 250, '6xl': 300 }}
            >
              {formatUppercaseFirstLetter(`${actionName}`)}
            </Text>
          </Tooltip>
        </Flex>
      </Td>
    ),
    [],
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
          w={{ base: 100, md: 220, '3xl': 200, '5xl': 200, '7xl': 350 }}
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
        renderIdAction,
        renderNameUser,
        renderEmail,
      ),
    [renderHead, renderIdAction, renderNameUser, renderEmail],
  );

  console.log('limit', limit);

  return (
    <Indicator>
      <Flex flexDirection={{ base: 'column', lg: 'row' }}>
        <SearchBar
          placeholder="Search by name or email"
          filterOptions={ACTIVITY_OPTIONS}
          searchValue={get('actionName')?.toLowerCase() || ''}
          onSearch={handleDebounceSearch}
          onFilter={setFilter}
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
            dataSource={formatRecentActivitiesResponse(activityMemorized)}
          />
        </Box>
        {!!activities?.length && (
          <Box mt={8}>
            <Pagination
              pageSize={limit}
              currentPage={currentPage}
              isDisabledPrev={isDisablePrev}
              isDisableNext={isDisableNext}
              arrOfCurrButtons={pageArray}
              onPageChange={handlePageChange}
              onClickPage={handleClickPage}
              onLimitChange={handleChangeLimit}
            />
          </Box>
        )}
      </Fetching>
    </Indicator>
  );
};

const RecentActivitiesTable = memo(RecentActivitiesTableComponent);

export default RecentActivitiesTable;
