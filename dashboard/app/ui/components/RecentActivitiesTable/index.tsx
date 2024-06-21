'use client';

import { Box, Flex } from '@chakra-ui/react';
import { memo, useCallback, useMemo, useState } from 'react';

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
import ActionIdCell from './ActionIdCell';
import ActionNameCell from './ActionNameCell';
import EmailCell from './EmailCell';

// Constants
import {
  ACTIVITY_OPTIONS,
  COLUMNS_RECENT_ACTIVITIES,
  PREV,
} from '@/lib/constants';

// hooks
import { useDebounce, useRecentActivities, useSearch } from '@/lib/hooks';

// Utils
import { formatRecentActivitiesResponse } from '@/lib/utils';

// Interfaces
import {
  TActivitiesSortField,
  THeaderTable,
  TRecentActivities,
} from '@/lib/interfaces';

const RecentActivitiesTable = () => {
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
    actionName: get('keyword')?.toLowerCase() || '',
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
    setSearchTransaction('keyword', value);
  }, []);

  const handleClickPage = useCallback(
    (value: number) => setCurrentPage(value),
    [setCurrentPage],
  );

  const handlePageChange = useCallback(
    (direction: string) =>
      setCurrentPage(direction === PREV ? currentPage - 1 : currentPage + 1),
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
    (title: string, key: TActivitiesSortField): JSX.Element => (
      <HeadCell columnKey={key} title={title} onSort={sortBy} />
    ),

    [sortBy],
  );

  const renderActionId = useCallback(
    ({ _id }: TRecentActivities): JSX.Element => <ActionIdCell id={_id} />,
    [],
  );

  const renderActionName = useCallback(
    ({ actionName }: TRecentActivities): JSX.Element => (
      <ActionNameCell actionName={actionName} />
    ),
    [],
  );

  const renderEmail = useCallback(
    ({ email }: TRecentActivities) => <EmailCell email={email} />,
    [],
  );

  const columns = useMemo(
    () =>
      COLUMNS_RECENT_ACTIVITIES(
        renderHead,
        renderActionId,
        renderActionName,
        renderEmail,
      ),
    [renderHead, renderActionId, renderActionName, renderEmail],
  );

  return (
    <Indicator>
      <Flex flexDirection={{ base: 'column', lg: 'row' }}>
        <SearchBar
          placeholder="Search by name or email"
          filterOptions={ACTIVITY_OPTIONS}
          searchValue={get('keyword')?.toLowerCase() || ''}
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
      </Fetching>
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
    </Indicator>
  );
};

const RecentActivitiesTableMemorized = memo(RecentActivitiesTable);

export default RecentActivitiesTableMemorized;
