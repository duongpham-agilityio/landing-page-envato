'use client';

import dynamic from 'next/dynamic';
import { useCallback, useMemo } from 'react';
import { useDisclosure, useToast } from '@chakra-ui/react';

import { SubmitHandler, useForm } from 'react-hook-form';

//Constants
import { ERROR_MESSAGES, STATUS, SUCCESS_MESSAGES } from '@/lib/constants';

// Hooks
import { useAuth, usePinCode } from '@/lib/hooks';

// Types
import { TPinCodeForm } from '@/lib/interfaces';

// Stores
import { TAuthStoreData, authStore } from '@/lib/stores';

// Utils
import { customToast } from '@/lib/utils';

const Modal = dynamic(() => import('@/ui/components/common/Modal'));
const PinCode = dynamic(() => import('@/ui/components/common/PinCode'));

const CheckPinCodeProvider = () => {
  const user = authStore((state): TAuthStoreData['user'] => state.user);

  const { isOpen: isPinCodeModalOpen, onClose: onClosePinCodeModal } =
    useDisclosure({ isOpen: true });

  const {
    control,
    handleSubmit,
    formState: { isValid, isSubmitting },
  } = useForm<TPinCodeForm>({
    defaultValues: {
      pinCode: '',
    },
  });

  const { setUser } = useAuth();

  const toast = useToast();

  const { handleSetPinCode } = usePinCode();

  const onSubmitPinCode: SubmitHandler<TPinCodeForm> = useCallback(
    (data) => {
      if (user) {
        data.userId = user.id;

        try {
          handleSetPinCode(data);

          setUser({ user: { ...user, pinCode: data.pinCode } });

          onClosePinCodeModal();

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
      }
    },
    [handleSetPinCode, onClosePinCodeModal, setUser, toast, user],
  );

  const pinCodeModalBody = useMemo(
    () => (
      <PinCode
        control={control}
        isDisabled={!isValid || isSubmitting}
        onSubmit={handleSubmit(onSubmitPinCode)}
        onClose={onClosePinCodeModal}
      />
    ),
    [
      control,
      handleSubmit,
      isSubmitting,
      isValid,
      onClosePinCodeModal,
      onSubmitPinCode,
    ],
  );

  return (
    isPinCodeModalOpen && (
      <Modal
        title="Please set the PIN code to your account"
        isOpen={isPinCodeModalOpen}
        onClose={onClosePinCodeModal}
        body={pinCodeModalBody}
      />
    )
  );
};

export default CheckPinCodeProvider;
