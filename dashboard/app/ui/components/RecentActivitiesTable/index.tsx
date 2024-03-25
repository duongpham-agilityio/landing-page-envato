'use client';

import { Box, Flex, Td, Text, Th } from '@chakra-ui/react';
import { memo, useCallback, useMemo } from 'react';
import Link from 'next/link';

// Components
import {
  Table,
  HeadCell,
  SearchBar,
  Fetching,
  ActionCell,
  ProductNameCell,
  Pagination,
} from '@/ui/components';

// Constants
import { COLUMNS_RECENT_ACTIVITIES, MONTHS_OPTIONS } from '@/lib/constants';

// Interfaces
import { TDataSource, THeaderTable, TRecentActivities } from '@/lib/interfaces';

// hooks
import { usePagination, useRecentActivities } from '@/lib/hooks';

// Utils
import { formatRecentActivitiesResponse } from '@/lib/utils';

const RecentActivitiesTableComponent = () => {
  const { recentActivities } = useRecentActivities();

  const {
    data,
    filterData,
    arrOfCurrButtons,
    isDisabledPrev,
    isDisableNext,
    handleChangeLimit,
    handlePageChange,
    handlePageClick,
  } = usePagination(recentActivities);

  const renderHead = useCallback((title: string): JSX.Element => {
    const handleClick = () => {};

    if (!title) return <Th w={50} maxW={50} />;

    return <HeadCell key={title} title={title} onClick={handleClick} />;
  }, []);

  const renderNameUser = useCallback(
    ({ id, _id, name }: TDataSource): JSX.Element => (
      <ProductNameCell _id={_id} key={id} name={name} />
    ),
    [],
  );

  const renderActionIcon = useCallback(
    (data: TRecentActivities) => (
      <ActionCell
        key={`${data._id}-action`}
        isOpenModal={true}
        activities={data}
      />
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
    <>
      <Flex flexDirection={{ base: 'column', lg: 'row' }}>
        <SearchBar
          placeholder="Search by name or email"
          filterOptions={MONTHS_OPTIONS}
          searchValue={''}
          onSearch={() => {}}
        />
      </Flex>
      <Fetching quality={15}>
        <Box mt={5}>
          <Table
            columns={columns as unknown as THeaderTable[]}
            dataSource={formatRecentActivitiesResponse(filterData)}
          />
        </Box>
        {!!recentActivities?.length && (
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

const RecentActivitiesTable = memo(RecentActivitiesTableComponent);

export default RecentActivitiesTable;
