// Libs

import { useCallback } from 'react';
import { useDisclosure, useToast } from '@chakra-ui/react';
import { useMutation } from '@tanstack/react-query';

// Constants
import {
  END_POINTS,
  ERROR_MESSAGES,
  STATUS,
  SUCCESS_MESSAGES,
} from '@/lib/constants';

// Utils
import { customToast, logActivity } from '@/lib/utils';

// Services
import { mainHttpService } from '@/lib/services';

// Stores
import { TAuthStoreData, authStore } from '@/lib/stores';

// Hooks
import { useAuth } from '@/lib/hooks';

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

export const useSubmitPinCode = () => {
  const toast = useToast();
  const { isOpen: isPinCodeModalOpen, onToggle: onTogglePinCodeModal } =
    useDisclosure();
  const { isOpen: isShowBalance, onToggle: onToggleShowBalance } =
    useDisclosure({ defaultIsOpen: true });

  // Stores
  const user = authStore((state): TAuthStoreData['user'] => state.user);
  const { setUser } = useAuth();

  // Pin code
  const { isSetNewPinCode, isConfirmPinCode, setNewPinCode, confirmPinCode } =
    usePinCode();

  const { pinCode = '', id: userId = '' } = user || {};

  const handleSetNewPinCodeSuccess = useCallback(
    (pinCode: string, callback?: () => void) => {
      user && setUser({ user: { ...user, pinCode } });
      onTogglePinCodeModal();
      callback && callback();

      toast(
        customToast(
          SUCCESS_MESSAGES.SET_PIN_CODE.title,
          SUCCESS_MESSAGES.SET_PIN_CODE.description,
          STATUS.SUCCESS,
        ),
      );
    },
    [onTogglePinCodeModal, setUser, toast, user],
  );

  const handleSetNewPinCodeError = useCallback(
    (callback?: () => void) => {
      toast(
        customToast(
          ERROR_MESSAGES.SET_PIN_CODE.title,
          ERROR_MESSAGES.SET_PIN_CODE.description,
          STATUS.ERROR,
        ),
      );

      callback && callback();
    },
    [toast],
  );

  const handleConfirmPinCodeSuccess = useCallback(
    async (callback?: () => void) => {
      onTogglePinCodeModal();
      onToggleShowBalance();
      callback && callback();

      toast(
        customToast(
          SUCCESS_MESSAGES.CONFIRM_PIN_CODE.title,
          SUCCESS_MESSAGES.CONFIRM_PIN_CODE.description,
          STATUS.SUCCESS,
        ),
      );
    },
    [onTogglePinCodeModal, onToggleShowBalance, toast],
  );

  const handleConfirmPinCodeError = useCallback(
    (callback?: () => void) => {
      toast(
        customToast(
          ERROR_MESSAGES.CONFIRM_PIN_CODE.title,
          ERROR_MESSAGES.CONFIRM_PIN_CODE.description,
          STATUS.ERROR,
        ),
      );

      callback && callback();
    },
    [toast],
  );

  const handleSubmitPinCode = useCallback(
    (pinCode: string, callback?: () => void) => {
      const payload = {
        userId,
        pinCode,
      };

      if (pinCode) {
        confirmPinCode(payload, {
          onSuccess: () => handleConfirmPinCodeSuccess(callback),
          onError: () => handleConfirmPinCodeError(callback),
        });

        return;
      }

      setNewPinCode(payload, {
        onSuccess: () => handleSetNewPinCodeSuccess(pinCode, callback),
        onError: () => handleSetNewPinCodeError(callback),
      });
    },
    [
      confirmPinCode,
      handleConfirmPinCodeError,
      handleConfirmPinCodeSuccess,
      handleSetNewPinCodeError,
      handleSetNewPinCodeSuccess,
      setNewPinCode,
      userId,
    ],
  );

  return {
    isLoadingPinCode: isSetNewPinCode || isConfirmPinCode,
    userPinCode: pinCode,
    isPinCodeModalOpen,
    onTogglePinCodeModal,
    isShowBalance,
    onToggleShowBalance,
    onSubmitPinCode: handleSubmitPinCode,
  };
};
