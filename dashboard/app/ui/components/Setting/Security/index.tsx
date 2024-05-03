'use client';

import { memo, useCallback, useState } from 'react';
import { Controller } from 'react-hook-form';
import { ViewOffIcon, ViewIcon } from '@chakra-ui/icons';
import {
  Box,
  VStack,
  useDisclosure,
  Text,
  Button,
  useToast,
  Heading,
  FormControl,
  FormLabel,
  Flex,
} from '@chakra-ui/react';

// Components
import { FallbackImage, InputField } from '@/ui/components';

// Constants
import {
  AUTH_SCHEMA,
  ERROR_MESSAGES,
  IMAGES,
  STATUS,
  SUCCESS_MESSAGES,
} from '@/lib/constants';

// Hooks
import { useForm, useUpdatePassword } from '@/lib/hooks';

// Stores
import { authStore } from '@/lib/stores';

// Utils
import { customToast } from '@/lib/utils';

// Types
import { TPassword } from '@/lib/interfaces';

// Providers
import { QueryProvider } from '@/ui/providers';

const SecurityPage = () => {
  const { mutate: updatePassword, isPending } = useUpdatePassword();
  const user = authStore((state) => state.user);

  const toast = useToast();
  const {
    control,
    formState: {
      errors: { root },
    },
    watch,
    handleSubmit,
    reset,
    clearErrors,
  } = useForm<TPassword>({
    defaultValues: {
      oldPassword: '',
      newPassword: '',
      memberId: user?.id,
    },
    mode: 'onBlur',
  });

  const handleClearErrorMessage = useCallback(
    (field: keyof TPassword, onChange: (value: string) => void) =>
      (data: string) => {
        clearErrors(field);
        onChange(data);
      },
    [clearErrors],
  );

  const handleUpdatePasswordSuccess = useCallback(() => {
    toast(
      customToast(
        SUCCESS_MESSAGES.UPDATE_SUCCESS.title,
        SUCCESS_MESSAGES.UPDATE_SUCCESS.description,
        STATUS.SUCCESS,
      ),
    );
    reset();
  }, [reset, toast]);

  const handleSubmitForm = useCallback(
    (updatedInfo: TPassword) => {
      updatePassword(updatedInfo, {
        onSuccess: handleUpdatePasswordSuccess,
        onError: () => {
          toast(
            customToast(
              ERROR_MESSAGES.OLD_PASSWORD_INCORRECT,
              ERROR_MESSAGES.UPDATE_FAIL.description,
              STATUS.ERROR,
            ),
          );
        },
      });
    },
    [handleUpdatePasswordSuccess, toast, updatePassword],
  );

  const { isOpen: isShowOldPassword, onToggle: onShowOldPassWord } =
    useDisclosure();
  const { isOpen: isShowNewPassword, onToggle: onShowNewPassWord } =
    useDisclosure();

  const renderPasswordIcon = useCallback(
    (isCorrect: boolean, callback: typeof onShowOldPassWord): JSX.Element => {
      const Icon = isCorrect ? ViewIcon : ViewOffIcon;

      return (
        <Icon
          color="gray.400"
          w="25px"
          h="25px"
          cursor="pointer"
          onClick={callback}
        />
      );
    },
    [],
  );

  const [isSubmit] = useState<boolean>(false);
  const isDisabledSubmitBtn: boolean =
    isSubmit || !Object.values(watch()).every((value) => value) || isPending;

  return (
    <Flex w="full" gap={6} direction="row" alignItems="center">
      <VStack
        mt={6}
        as="form"
        gap={6}
        onSubmit={handleSubmit(handleSubmitForm)}
        id="register-form"
        w="full"
        alignItems="flex-start"
        flex={3}
      >
        <Box alignContent="start">
          <Heading
            as="h3"
            textTransform="capitalize"
            color="text.quinary"
            fontSize="2xl"
            fontWeight="bold"
            mb={3}
          >
            Password
          </Heading>
          <Text fontSize="14px" color="text.ternary">
            Change or view your password
          </Text>
        </Box>
        <Controller
          rules={AUTH_SCHEMA.OLD_PASSWORD}
          control={control}
          name="oldPassword"
          render={({ field: { onChange, ...rest }, fieldState: { error } }) => {
            const { message } = error ?? {};

            return (
              <FormControl>
                <FormLabel
                  color="text.ternary"
                  fontWeight="medium"
                  fontSize="sm"
                  mb={3}
                >
                  Old password
                </FormLabel>
                <InputField
                  type={isShowOldPassword ? 'text' : 'password'}
                  rightIcon={renderPasswordIcon(
                    isShowOldPassword,
                    onShowOldPassWord,
                  )}
                  {...rest}
                  isError={!!message}
                  errorMessages={message}
                  isDisabled={isPending}
                  onChange={handleClearErrorMessage('oldPassword', onChange)}
                  aria-label="oldPassword"
                  role="textbox"
                />
              </FormControl>
            );
          }}
        />

        <Controller
          control={control}
          rules={AUTH_SCHEMA.NEW_PASSWORD}
          name="newPassword"
          render={({ field: { onChange, ...rest }, fieldState: { error } }) => (
            <FormControl>
              <FormLabel
                color="text.ternary"
                fontWeight="medium"
                fontSize="sm"
                mb={3}
              >
                New password
              </FormLabel>
              <InputField
                type={isShowNewPassword ? 'text' : 'password'}
                rightIcon={renderPasswordIcon(
                  isShowNewPassword,
                  onShowNewPassWord,
                )}
                {...rest}
                isDisabled={isPending}
                onChange={handleClearErrorMessage('newPassword', onChange)}
                role="textbox"
                aria-label="newPassword"
              />
              <Text color="text.ternary" fontSize="xs">
                Minimum 8 characters
              </Text>

              {!!error && (
                <Text
                  fontSize="sm"
                  color="danger.300"
                  fontWeight="normal"
                  pos="absolute"
                >
                  {error?.message}
                </Text>
              )}
            </FormControl>
          )}
        />

        <Box mb={7} alignSelf="end">
          <Text color="red" textAlign="center" py={2} h={10}>
            {root?.message}
          </Text>
          <Flex>
            <Button
              type="submit"
              aria-label="btn-save-change"
              px={4}
              textTransform="capitalize"
              form="register-form"
              isDisabled={isDisabledSubmitBtn}
              w="none"
            >
              Save Change
            </Button>
          </Flex>
        </Box>
      </VStack>
      <FallbackImage
        src={IMAGES.PASSWORD.url}
        alt={IMAGES.PASSWORD.alt}
        objectFit="contain"
        w={265}
        h={265}
        display={{ base: 'none', xl: 'block' }}
        flex={4}
      />
    </Flex>
  );
};

const WrappedUserForm = () => (
  <QueryProvider>
    <SecurityPage />
  </QueryProvider>
);

const Security = memo(WrappedUserForm);
export default Security;
