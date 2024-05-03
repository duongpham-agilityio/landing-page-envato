'use client';

import { FormEvent, memo, useCallback } from 'react';
import { Box, Heading, useDisclosure, useToast } from '@chakra-ui/react';
import { SubmitHandler } from 'react-hook-form';
import { AxiosError } from 'axios';

// Components
import { PinCodeModal } from '@/ui/components';
import CardBalance from './CardBalance';
import UserSelector from './UserSelector';
import EnterMoney from './EnterMoney';

// Constants
import { ERROR_MESSAGES, STATUS, SUCCESS_MESSAGES } from '@/lib/constants';

// Hooks
import {
  useAuth,
  useForm,
  useGetUserDetails,
  useMoney,
  usePinCode,
  useWallet,
} from '@/lib/hooks';

// Stores
import { authStore } from '@/lib/stores';

// Utils
import { customToast, getErrorMessageFromAxiosError } from '@/lib/utils';

// Types
import { TPinCodeForm, TSendMoney } from '@/lib/interfaces';

// services
import { TMoneyResponse } from '@/lib/services';

export type TTransfer = {
  amount: string;
  memberId: string;
  userId: string;
};

const CardPaymentComponent = (): JSX.Element => {
  const user = authStore((state) => state.user);

  const { setUser } = useAuth();

  const toast = useToast();

  const {
    control,
    handleSubmit: handleSubmitSendMoney,
    formState: { isValid, isSubmitting },
    reset: resetSendMoneyForm,
  } = useForm<TTransfer>({
    defaultValues: {
      memberId: '',
      amount: '',
      userId: user?.id,
    },
  });

  const { currentWalletMoney } = useWallet(user?.id);

  const { filterDataUser } = useGetUserDetails(user?.id || '');

  const {
    isOpen: isSetPinCodeModalOpen,
    onClose: onCloseSetPinCodeModal,
    onOpen: onOpenSetPinCodeModal,
  } = useDisclosure();

  const {
    isOpen: isConfirmPinCodeModalOpen,
    onClose: onCloseConfirmPinCodeModal,
    onOpen: onOpenConfirmPinCodeModal,
  } = useDisclosure();

  const { handleSetPinCode, handleConfirmPinCode } = usePinCode();

  const {
    control: setPinCodeControl,
    handleSubmit: handleSubmitSetPinCode,
    formState: { isValid: isSetValid, isSubmitting: isSetSubmitting },
    reset: resetSetPinCodeForm,
  } = useForm<TPinCodeForm>({});

  const {
    control: confirmPinCodeControl,
    handleSubmit: handleSubmitConfirmPinCode,
    formState: { isValid: isConfirmValid, isSubmitting: isConfirmSubmitting },
    reset: resetConfirmPinCodeForm,
  } = useForm<TPinCodeForm>({
    defaultValues: {
      pinCode: '',
    },
    mode: 'onSubmit',
    reValidateMode: 'onSubmit',
  });

  const { sendMoneyToUserWallet } = useMoney();

  const getMemberId = useCallback(
    (email: string): string =>
      filterDataUser?.find(
        (user) =>
          user.email.trim().toLocaleLowerCase() === email.trim().toLowerCase(),
      )?._id || '',
    [filterDataUser],
  );

  const hasPinCode = user?.pinCode;

  const handleTransferMoneySuccess = (success: {
    title: string;
    description: string;
  }) => {
    toast(customToast(success.title, success.description, STATUS.SUCCESS));
    if (user?.bonusTimes) {
      setUser({
        user: {
          ...user,
          bonusTimes: --user.bonusTimes,
        },
      });
    }
  };

  const handleTransferMoneyError = (
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

    toast(customToast(defaultError.title, responseErrorMessage, STATUS.ERROR));
  };

  const handleOnSubmitSendMoney = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    hasPinCode ? onOpenConfirmPinCodeModal() : onOpenSetPinCodeModal();
  };

  const onSubmitSendMoney: SubmitHandler<TTransfer> = useCallback(
    (data) => {
      const submitData: TSendMoney = {
        ...data,
        memberId: getMemberId(data.memberId),
        amount: Number(data.amount),
      };

      sendMoneyToUserWallet(submitData, {
        onSuccess: () =>
          handleTransferMoneySuccess(SUCCESS_MESSAGES.SEND_MONEY),
        onError: (error) =>
          handleTransferMoneyError(error, ERROR_MESSAGES.ADD_MONEY),
      });
      resetSendMoneyForm();
    },
    [getMemberId, resetSendMoneyForm, sendMoneyToUserWallet],
  );

  const onSubmitPinCode: SubmitHandler<TPinCodeForm> = useCallback(
    async (data) => {
      if (user) {
        data.userId = user.id;
        if (!hasPinCode) {
          try {
            await handleSetPinCode(data);

            setUser({ user: { ...user, pinCode: data.pinCode } });

            onCloseSetPinCodeModal();

            resetSetPinCodeForm();

            toast(
              customToast(
                SUCCESS_MESSAGES.SET_PIN_CODE.title,
                SUCCESS_MESSAGES.SET_PIN_CODE.description,
                STATUS.SUCCESS,
              ),
            );
          } catch (error) {
            toast(
              customToast(
                ERROR_MESSAGES.SET_PIN_CODE.title,
                ERROR_MESSAGES.SET_PIN_CODE.description,
                STATUS.ERROR,
              ),
            );
          }
        } else {
          try {
            await handleConfirmPinCode(data);
            onCloseConfirmPinCodeModal();
            resetConfirmPinCodeForm({
              pinCode: '',
            });

            await handleSubmitSendMoney(onSubmitSendMoney)();
            resetSendMoneyForm();

            toast(
              customToast(
                SUCCESS_MESSAGES.CONFIRM_PIN_CODE.title,
                SUCCESS_MESSAGES.CONFIRM_PIN_CODE.description,
                STATUS.SUCCESS,
              ),
            );
          } catch (error) {
            toast(
              customToast(
                ERROR_MESSAGES.CONFIRM_PIN_CODE.title,
                ERROR_MESSAGES.CONFIRM_PIN_CODE.description,
                STATUS.ERROR,
              ),
            );
            resetConfirmPinCodeForm();
          }
        }
      }
    },
    [
      handleConfirmPinCode,
      handleSetPinCode,
      handleSubmitSendMoney,
      hasPinCode,
      onCloseConfirmPinCodeModal,
      onCloseSetPinCodeModal,
      onSubmitSendMoney,
      resetConfirmPinCodeForm,
      resetSendMoneyForm,
      resetSetPinCodeForm,
      setUser,
      toast,
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
        p={4}
        w="full"
        bg="background.body.quaternary"
        py={{ base: 4, md: 5 }}
        px={{ base: 4, md: 10 }}
        borderRadius="lg"
      >
        <Heading
          as="h3"
          fontWeight="bold"
          color="text.primary"
          fontSize="lg"
          mb={3}
          textTransform="capitalize"
        >
          my wallet
        </Heading>

        <CardBalance balance={currentWalletMoney?.balance || 0} />

        <Box as="form" mt={4} onSubmit={handleOnSubmitSendMoney}>
          <UserSelector control={control} listUser={filterDataUser} />
          <EnterMoney isDisabled={!isValid || isSubmitting} control={control} />
        </Box>
      </Box>
      {/*Set/Confirm PIN code Modal */}
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
            ? !isConfirmValid || isConfirmSubmitting
            : !isSetValid || isSetSubmitting
        }
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

const CardPayment = memo(CardPaymentComponent);

export default CardPayment;
