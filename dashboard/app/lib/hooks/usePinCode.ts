import { useCallback } from 'react';
import { AxiosError } from 'axios';
import { useDisclosure } from '@chakra-ui/react';

// Constants
import { END_POINTS } from '@/lib/constants';

// Services
import { mainHttpService } from '@/lib/services';

// Utils
import { logActivity } from '@/lib/utils';

// Types
import { EActivity, TPinCodeForm } from '@/lib/interfaces';

export type ResponsePinCode = {
  message: string;
};
export const usePinCode = () => {
  const handleSetPinCode = useCallback(async (data: TPinCodeForm) => {
    try {
      return await mainHttpService.post<ResponsePinCode>({
        path: END_POINTS.CREATE_PIN,
        data: {
          pinCode: data.pinCode,
          userId: data.userId,
        },
        actionName: EActivity.CREATE_PIN_CODE,
        onActivity: logActivity,
      });
    } catch (error) {
      const { message } = error as AxiosError;

      throw new Error(message);
    }
  }, []);

  const handleConfirmPinCode = useCallback(async (data: TPinCodeForm) => {
    try {
      return await mainHttpService.post<ResponsePinCode>({
        path: END_POINTS.CONFIRM_PIN,
        data: {
          pinCode: data.pinCode,
          userId: data.userId,
        },

        actionName: EActivity.ACTIVE_PIN_CODE,
        userId: data.userId,
        onActivity: logActivity,
      });
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
