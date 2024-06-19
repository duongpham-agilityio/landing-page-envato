// Libs

import { useDisclosure } from '@chakra-ui/react';
import { useMutation } from '@tanstack/react-query';

// Constants
import { END_POINTS } from '@/lib/constants';

// Utils
import { logActivity } from '@/lib/utils';

// Services
import { mainHttpService } from '@/lib/services';

// Types
import { EActivity, TPinCodeForm } from '@/lib/interfaces';

export type PinCodeResponse = {
  message: string;
};

export const usePinCode = () => {
  const { mutate: setNewPinCode, isPending: isSetNewPinCode } = useMutation({
    mutationFn: async (data: TPinCodeForm) => {
      const { userId, pinCode } = data || {};

      return mainHttpService.post<PinCodeResponse>({
        path: END_POINTS.CREATE_PIN,
        data: {
          pinCode,
          userId,
        },
        userId,
        actionName: EActivity.CREATE_PIN_CODE,
        onActivity: logActivity,
      });
    },
  });

  const { mutate: confirmPinCode, isPending: isConfirmPinCode } = useMutation({
    mutationFn: (data: TPinCodeForm) => {
      const { userId, pinCode } = data || {};

      return mainHttpService.post<PinCodeResponse>({
        path: END_POINTS.CONFIRM_PIN,
        data: {
          pinCode,
          userId,
        },
        actionName: EActivity.ACTIVE_PIN_CODE,
        userId,
        onActivity: logActivity,
      });
    },
  });

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
  };
};
