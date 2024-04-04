import { useCallback } from 'react';
import { AxiosError } from 'axios';
import { useDisclosure } from '@chakra-ui/react';

// Types
import { EActivity, TPinCodeForm } from '@/lib/interfaces';

// Services
import { MainHttpService } from '@/lib/services';

// Constants
import { END_POINTS } from '@/lib/constants';

export type ResponsePinCode = {
  message: string;
};
export const usePinCode = () => {
  const handleSetPinCode = useCallback(async (data: TPinCodeForm) => {
    try {
      return await MainHttpService.post<ResponsePinCode>(
        `${END_POINTS.CREATE_PIN}`,
        {
          pinCode: data.pinCode,
          userId: data.userId,
        },
        {},
        EActivity.CREATE_PIN_CODE,
      );
    } catch (error) {
      const { message } = error as AxiosError;

      throw new Error(message);
    }
  }, []);

  const handleConfirmPinCode = useCallback(async (data: TPinCodeForm) => {
    try {
      return await MainHttpService.post<ResponsePinCode>(
        `${END_POINTS.CONFIRM_PIN}`,
        {
          pinCode: data.pinCode,
          userId: data.userId,
        },
        {},
        EActivity.ACTIVE_PIN_CODE,
        data.userId,
      );
    } catch (error) {
      const { message } = error as AxiosError;

      throw new Error(message);
    }
  }, []);

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

  return {
    handleSetPinCode,
    handleConfirmPinCode,
    isSetPinCodeModalOpen,
    onCloseSetPinCodeModal,
    onOpenSetPinCodeModal,
    isConfirmPinCodeModalOpen,
    onCloseConfirmPinCodeModal,
    onOpenConfirmPinCodeModal,
  };
};
