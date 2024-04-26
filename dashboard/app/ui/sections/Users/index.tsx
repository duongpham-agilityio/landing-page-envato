'use client';

import { memo, useCallback } from 'react';
import dynamic from 'next/dynamic';
import { Controller, useForm } from 'react-hook-form';
import { CloseIcon } from '@chakra-ui/icons';

// Components
import { Box, Flex, useToast } from '@chakra-ui/react';
import { Fetching, Indicator, InputField } from '@/ui/components';

// Hooks
import {
  useDebounce,
  useGetUserDetails,
  useManagementUser,
  usePagination,
  useSearch,
} from '@/lib/hooks';

// Icons
import { Search } from '@/ui/components/Icons';

// Constants
import {
  END_POINTS,
  ERROR_MESSAGES,
  STATUS,
  SUCCESS_MESSAGES,
} from '@/lib/constants';

// Stores
import { authStore } from '@/lib/stores';

// Interfaces
import { TSearchValue } from '@/ui/components/common/SearchBar';
import { TUserDetail } from '@/lib/interfaces';

// Utils
import { customToast } from '@/lib/utils';

// Lazy loading components
const UsersTable = dynamic(() => import('@/ui/components/UsersTable'));

const UsersSections = () => {
  const toast = useToast();
  const user = authStore((state) => state.user);

  const { get, setSearchParam: setSearchUser } = useSearch();

  const { control, resetField } = useForm<TSearchValue>({
    defaultValues: {
      search: get('name') || '',
    },
  });

  const {
    filterDataUser,
    isLoading: isLoadingUser,
    isError: isUserError,
  } = useGetUserDetails(user?.id || '', {
    name: get('name') || '',
  });

  const { isSendRequestUser, managementUser } = useManagementUser(
    get('name') || '',
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
  } = usePagination(filterDataUser as TUserDetail[]);

  const handleDebounceSearch = useDebounce((value: string) => {
    resetPage();
    setSearchUser('name', value);
  }, []);

  const handleResetValue = useCallback(() => {
    resetField('search');
    setSearchUser('name', '');
  }, []);

  const handleLockUser = useCallback((lockUserData?: TUserDetail) => {
    managementUser(
      {
        urlEndpoint: END_POINTS.LOCK,
        userId: user?.id,
        memberId: lockUserData?.id,
      },
      {
        onSuccess: () => {
          toast(
            customToast(
              SUCCESS_MESSAGES.LOCK_USER_SUCCESS.title,
              SUCCESS_MESSAGES.LOCK_USER_SUCCESS.description,
              STATUS.SUCCESS,
            ),
          );
        },
        onError: () => {
          toast(
            customToast(
              ERROR_MESSAGES.LOCK_USER_FAIL.title,
              ERROR_MESSAGES.LOCK_USER_FAIL.description,
              STATUS.ERROR,
            ),
          );
        },
      },
    );
  }, []);

  const handleUnlockUser = useCallback((lockUserData?: TUserDetail) => {
    managementUser(
      {
        urlEndpoint: END_POINTS.UNLOCK,
        userId: user?.id,
        memberId: lockUserData?.id,
      },
      {
        onSuccess: () => {
          toast(
            customToast(
              SUCCESS_MESSAGES.UNLOCK_USER_SUCCESS.title,
              SUCCESS_MESSAGES.UNLOCK_USER_SUCCESS.description,
              STATUS.SUCCESS,
            ),
          );
        },
        onError: () => {
          toast(
            customToast(
              ERROR_MESSAGES.UNLOCK_USER_FAIL.title,
              ERROR_MESSAGES.UNLOCK_USER_FAIL.description,
              STATUS.ERROR,
            ),
          );
        },
      },
    );
  }, []);

  return (
    <Indicator isOpen={isSendRequestUser}>
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
            <Controller
              control={control}
              name="search"
              render={({ field: { value, onChange } }) => (
                <InputField
                  flex={4}
                  variant="no-focus"
                  value={value}
                  leftIcon={<Search color="#94A3B8" />}
                  rightIcon={value && <CloseIcon onClick={handleResetValue} />}
                  placeholder="Search by name"
                  sx={{
                    svg: {
                      position: 'absolute',
                    },
                  }}
                  onChange={(value: string) => {
                    onChange(value);
                    handleDebounceSearch(value);
                  }}
                />
              )}
            />
          </Flex>
          <Fetching
            quality={15}
            isLoading={isLoadingUser}
            isError={isUserError}
          >
            <UsersTable
              users={filterData}
              data={data}
              isDisableNext={isDisableNext}
              arrOfCurrButtons={arrOfCurrButtons}
              isDisabledPrev={isDisabledPrev}
              onChangeLimit={handleChangeLimit}
              onPageChange={handlePageChange}
              onPageClick={handlePageClick}
              onLockUser={handleLockUser}
              onUnlockUser={handleUnlockUser}
            />
          </Fetching>
        </Box>
      </Flex>
    </Indicator>
  );
};

const UsersPage = memo(UsersSections);

export default UsersPage;
