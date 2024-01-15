'use client';

import { memo, useCallback, useMemo, useState } from 'react';
import dynamic from 'next/dynamic';

// Components
import { Box, Flex, Text } from '@chakra-ui/react';
import { Button, Fetching, InputField, Select } from '@/ui/components';

// Hooks
import { useDebounce, useEmployee, useSearch } from '@/lib/hooks';

// Icons
import { Search, ChevronIcon } from '@/ui/components/Icons';

// Constants
import { FILTER_USER_OPTIONS } from '@/lib/constants';

// Types
import { TOption } from '@/ui/components/common/Select';

// Mock
import { INITIAL_USER } from '@/lib/mocks';

// Providers
import { QueryProvider } from '@/ui/providers';

// Lazy loading components
const UsersTable = dynamic(() => import('@/ui/components/UsersTable'));
const UserCard = dynamic(() => import('@/ui/components/UserCard'));

const UsersSections = () => {
  const [userId, setUserId] = useState<string | null>(null);
  const [seniorityLevel, setSeniorityLevel] = useState<string>('');
  const { setSearchParam } = useSearch();

  const {
    data: users = [],
    isFetching: isEmployeesLoading,
    isError: isEmployeesError,
  } = useEmployee('');

  const handleClickUser = useCallback((id: string) => {
    setUserId(id);
  }, []);

  const user = useMemo(
    () => (userId ? users.find((user) => user.id === userId) : users[0]),
    [userId, users],
  );

  const renderTitle = useCallback(
    ({ label }: TOption) => (
      <Flex alignItems="center" justifyContent="space-between">
        <Text>{label}</Text>
        <ChevronIcon />
      </Flex>
    ),
    [],
  );

  const handleSearchUsersByJobTitle = useDebounce((value: string) => {
    setSearchParam('jobTitle', value);
  }, []);

  const handleFilterUsersBySeniorLevel = useCallback((data: TOption) => {
    setSeniorityLevel(data.value);
  }, []);

  const usersFiltered = useMemo(
    () =>
      seniorityLevel
        ? users.filter((item) => item.level === seniorityLevel)
        : users,
    [users, seniorityLevel],
  );

  return (
    <Flex
      p={12}
      bgColor="background.body.tertiary"
      minH="calc(100vh - 112px)"
      gap={11}
      direction={{ base: 'column', '3xl': 'row' }}
    >
      <Box flex={{ '3xl': 3 }}>
        <Flex
          p={{
            base: 1,
            md: 4,
          }}
          rounded="lg"
          bg="background.body.quaternary"
          mb={8}
          alignItems="center"
        >
          <InputField
            flex={4}
            variant="no-focus"
            leftIcon={<Search color="#94A3B8" />}
            placeholder="Job Title"
            sx={{
              svg: {
                position: 'absolute',
              },
            }}
            onChange={handleSearchUsersByJobTitle}
          />
          <Flex gap={8}>
            <Box
              w={220}
              px={5}
              borderRight="solid 1px"
              borderLeft="solid 1px"
              borderColor="border.primary"
              display={{ base: 'none', xl: 'block' }}
            >
              <Select
                options={FILTER_USER_OPTIONS}
                variant="no-background"
                renderTitle={renderTitle}
                onSelect={handleFilterUsersBySeniorLevel}
              />
            </Box>
            <Button
              size="md"
              aria-label="btn-search"
              bg="background.component.quaternary"
              fontWeight="medium"
              sx={{
                py: 7,
                borderRadius: 'lg',
                display: { base: 'none', md: 'inline-flex' },
                _hover: {
                  bg: 'background.component.quaternary',
                },
              }}
            >
              Search
            </Button>
          </Flex>
        </Flex>
        <Fetching isLoading={isEmployeesLoading} isError={isEmployeesError}>
          <UsersTable users={usersFiltered} onClickUser={handleClickUser} />
        </Fetching>
      </Box>
      <Box flex={1} pt={20}>
        <UserCard user={user || INITIAL_USER} />
      </Box>
    </Flex>
  );
};

const UsersWrapped = () => (
  <QueryProvider>
    <UsersSections />
  </QueryProvider>
);

const UsersPage = memo(UsersWrapped);

export default UsersPage;
