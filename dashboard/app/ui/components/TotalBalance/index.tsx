'use client';

import { memo, useCallback } from 'react';
import { Box, Button, useToast } from '@chakra-ui/react';
import { SubmitHandler } from 'react-hook-form';
import { AxiosError } from 'axios';

// Stores
import { TAuthStoreData, authStore } from '@/lib/stores';

// Hooks
import { useAuth, useForm, useMoney, usePinCode } from '@/lib/hooks';

// Components
import { AddMoneyInput } from './AddMoneyInput';
import { PinCodeModal } from '..';

// Types
import { TPinCodeForm, TMoneyResponse, TUserDetail } from '@/lib/interfaces';

// utils
import {
  customToast,
  getErrorMessageFromAxiosError,
  removeAmountFormat,
} from '@/lib/utils';

// Constants
import {
  DEFAULT_DISCOUNT_PERCENTAGE,
  ERROR_MESSAGES,
  STATUS,
  SUCCESS_MESSAGES,
} from '@/lib/constants';

export type TAddMoneyForm = {
  userId: string;
  amount: string;
};

const TotalBalance = (): JSX.Element => {
  const user = authStore((state): TAuthStoreData['user'] => state.user);

  const { setUser } = useAuth();

  const {
    isSetNewPinCode,
    isConfirmPinCode,
    setNewPinCode,
    confirmPinCode,
    isSetPinCodeModalOpen,
    onCloseSetPinCodeModal,
    onOpenSetPinCodeModal,
    isConfirmPinCodeModalOpen,
    onCloseConfirmPinCodeModal,
    onOpenConfirmPinCodeModal,
  } = usePinCode();

  const {
    control: setPinCodeControl,
    handleSubmit: handleSubmitSetPinCode,
    formState: { isValid: isSetValid },
    reset: resetSetPinCodeForm,
  } = useForm<TPinCodeForm>({});

  const {
    control: confirmPinCodeControl,
    handleSubmit: handleSubmitConfirmPinCode,
    formState: { isValid: isConfirmValid },
    reset: resetConfirmPinCodeForm,
  } = useForm<TPinCodeForm>({
    defaultValues: {
      pinCode: '',
    },
    mode: 'onSubmit',
    reValidateMode: 'onSubmit',
  });

  const {
    control: addMoneyControl,
    handleSubmit: handleSubmitAddMoney,
    formState: { isDirty },
    reset: resetAddMoneyForm,
  } = useForm<TAddMoneyForm>({
    defaultValues: {
      userId: user?.id,
      amount: '',
    },
  });

  const toast = useToast();
  const { addMoneyToUserWallet } = useMoney();

  const bonusTimes = authStore((state): number => state.user?.bonusTimes ?? 0);

  const handleTransferMoneySuccess = useCallback(
    (success: { title: string; description: string }) => {
      toast(customToast(success.title, success.description, STATUS.SUCCESS));
      if (user?.bonusTimes) {
        setUser({
          user: {
            ...user,
            bonusTimes: --user.bonusTimes,
          },
        });
      }
    },
    [setUser, toast, user],
  );

  const handleTransferMoneyError = useCallback(
    (
      error: Error,
      defaultError: {
        title: string;
        description: string;
      },
    ) => {
      const responseErrorMessage = getErrorMessageFromAxiosError(
        error as AxiosError<TMoneyResponse>,
        defaultError.description,
      );

      toast(
        customToast(defaultError.title, responseErrorMessage, STATUS.ERROR),
      );
    },
    [toast],
  );

  const onSubmitAddMoney: SubmitHandler<TAddMoneyForm> = useCallback(
    (data) => {
      const addMoneyAmount: number = removeAmountFormat(data.amount);

      const dataToSubmit = {
        ...data,
        amount:
          addMoneyAmount +
          (bonusTimes ? addMoneyAmount * DEFAULT_DISCOUNT_PERCENTAGE : 0),
      };

      addMoneyToUserWallet(dataToSubmit, {
        onSuccess: () => handleTransferMoneySuccess(SUCCESS_MESSAGES.ADD_MONEY),
        onError: (error) =>
          handleTransferMoneyError(error, ERROR_MESSAGES.ADD_MONEY),
      });
    },
    [
      addMoneyToUserWallet,
      bonusTimes,
      handleTransferMoneyError,
      handleTransferMoneySuccess,
    ],
  );

  const hasPinCode = user?.pinCode;

  const handleOnSubmitAddMoney = useCallback(() => {
    hasPinCode ? onOpenConfirmPinCodeModal() : onOpenSetPinCodeModal();
  }, [hasPinCode, onOpenConfirmPinCodeModal, onOpenSetPinCodeModal]);

  const handleSetNewPinCodeSuccess = useCallback(
    (user: Omit<TUserDetail, 'password'>, pinCode: string) => {
      setUser({ user: { ...user, pinCode } });
      onCloseSetPinCodeModal();
      resetSetPinCodeForm();

      toast(
        customToast(
          SUCCESS_MESSAGES.SET_PIN_CODE.title,
          SUCCESS_MESSAGES.SET_PIN_CODE.description,
          STATUS.SUCCESS,
        ),
      );
    },
    [onCloseSetPinCodeModal, resetSetPinCodeForm, setUser, toast],
  );

  const handleSetNewPinCodeError = useCallback(() => {
    toast(
      customToast(
        ERROR_MESSAGES.SET_PIN_CODE.title,
        ERROR_MESSAGES.SET_PIN_CODE.description,
        STATUS.ERROR,
      ),
    );
  }, [toast]);

  const handleConfirmPinCodeSuccess = useCallback(async () => {
    onCloseConfirmPinCodeModal();
    resetConfirmPinCodeForm({
      pinCode: '',
    });

    await handleSubmitAddMoney(onSubmitAddMoney)();
    resetAddMoneyForm();

    toast(
      customToast(
        SUCCESS_MESSAGES.CONFIRM_PIN_CODE.title,
        SUCCESS_MESSAGES.CONFIRM_PIN_CODE.description,
        STATUS.SUCCESS,
      ),
    );
  }, [
    handleSubmitAddMoney,
    onCloseConfirmPinCodeModal,
    onSubmitAddMoney,
    resetAddMoneyForm,
    resetConfirmPinCodeForm,
    toast,
  ]);

  const handleConfirmPinCodeError = useCallback(() => {
    toast(
      customToast(
        ERROR_MESSAGES.CONFIRM_PIN_CODE.title,
        ERROR_MESSAGES.CONFIRM_PIN_CODE.description,
        STATUS.ERROR,
      ),
    );
    resetConfirmPinCodeForm();
  }, [resetConfirmPinCodeForm, toast]);

  const onSubmitPinCode: SubmitHandler<TPinCodeForm> = useCallback(
    async (data) => {
      if (user) {
        data.userId = user.id;

        if (!hasPinCode) {
          setNewPinCode(data, {
            onSuccess: () => handleSetNewPinCodeSuccess(user, data.pinCode),
            onError: handleSetNewPinCodeError,
          });
        } else {
          confirmPinCode(data, {
            onSuccess: handleConfirmPinCodeSuccess,
            onError: handleConfirmPinCodeError,
          });
        }
      }
    },
    [
      confirmPinCode,
      handleConfirmPinCodeError,
      handleConfirmPinCodeSuccess,
      handleSetNewPinCodeError,
      handleSetNewPinCodeSuccess,
      hasPinCode,
      setNewPinCode,
      user,
    ],
  );

  const handleCloseSetPinCodeModal = useCallback(() => {
    onCloseSetPinCodeModal();
    resetSetPinCodeForm();
  }, [onCloseSetPinCodeModal, resetSetPinCodeForm]);

  const handleCloseConfirmPinCodeModal = useCallback(() => {
    onCloseConfirmPinCodeModal();
    resetConfirmPinCodeForm();
  }, [onCloseConfirmPinCodeModal, resetConfirmPinCodeForm]);

  return (
    <>
      <Box
        w="full"
        bg="background.body.quaternary"
        px={8}
        py={7}
        borderRadius="lg"
      >
        <form onSubmit={handleSubmitAddMoney(handleOnSubmitAddMoney)}>
          <AddMoneyInput control={addMoneyControl} />
          <Button
            aria-label="btn-add-money"
            mt={14}
            colorScheme="primary"
            bg="primary.300"
            fontWeight="bold"
            type="submit"
            isDisabled={!isDirty}
          >
            Add Money
          </Button>
        </form>
      </Box>
      <PinCodeModal
        title={
          isSetPinCodeModalOpen
            ? 'Please set the PIN code to your account'
            : 'Please enter your PIN code'
        }
        control={hasPinCode ? confirmPinCodeControl : setPinCodeControl}
        isOpen={isSetPinCodeModalOpen || isConfirmPinCodeModalOpen}
        isDisabled={
          hasPinCode
            ? !isConfirmValid || isConfirmPinCode
            : !isSetValid || isSetNewPinCode
        }
        isLoading={hasPinCode ? isConfirmPinCode : isSetNewPinCode}
        onclose={
          isSetPinCodeModalOpen
            ? handleCloseSetPinCodeModal
            : handleCloseConfirmPinCodeModal
        }
        onSubmit={
          hasPinCode
            ? handleSubmitConfirmPinCode(onSubmitPinCode)
            : handleSubmitSetPinCode(onSubmitPinCode)
        }
      />
    </>
  );
};

const TotalBalanceMemorized = memo(TotalBalance);

export default TotalBalanceMemorized;
