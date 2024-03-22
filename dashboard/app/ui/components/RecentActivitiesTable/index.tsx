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
} from '@/ui/components';

// Constants
import { COLUMNS_RECENT_ACTIVITIES, FILTER_PRODUCT } from '@/lib/constants';

// Interfaces
import { TDataSource, THeaderTable } from '@/lib/interfaces';

const RecentActivitiesTableComponent = () => {
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
    () => <ActionCell isOpenModal={true} />,
    [],
  );

  const renderEmail = useCallback(
    (email: string) => (
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
          filterOptions={FILTER_PRODUCT}
          searchValue={''}
          onSearch={() => {}}
        />
      </Flex>
      <Fetching quality={15}>
        <Box mt={5}>
          <Table columns={columns as unknown as THeaderTable[]} />
        </Box>
      </Fetching>
    </>
  );
};

const RecentActivitiesTable = memo(RecentActivitiesTableComponent);

export default RecentActivitiesTable;
