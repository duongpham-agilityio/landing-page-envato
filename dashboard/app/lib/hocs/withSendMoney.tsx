// Libs
import { ReactNode, useCallback } from 'react';
import { useDisclosure, useToast } from '@chakra-ui/react';
import { SubmitHandler, useForm } from 'react-hook-form';

// Stores
import { authStore } from '@/lib/stores';

// Hooks
import { useAuth, useGetUserDetails, useMoney, usePinCode } from '@/lib/hooks';

// Constants
import { ERROR_MESSAGES, STATUS, SUCCESS_MESSAGES } from '@/lib/constants';

// Utils
import { customToast, removeAmountFormat } from '@/lib/utils';

// Types
import { TPinCodeForm, TTransfer, TWithSendMoney } from '@/lib/interfaces';

// Components
import { PinCodeModal } from '@/ui/components';

const withSendMoney = <T,>(
  WrappedComponent: (props: TWithSendMoney<T>) => ReactNode,
) => {
  const SendMoneyWrapper = (props: T) => {
    const toast = useToast();
    const { isOpen: isPinCodeModalOpen, onToggle: onTogglePinCodeModal } =
      useDisclosure();

    // Stores
    const user = authStore((state) => state.user);

    // Auth
    const { setUser } = useAuth();

    // Pin code
    const {
      isSetNewPinCode: isLoadingSetNewPinCode,
      isConfirmPinCode: isLoadingConfirmPinCode,
      setNewPinCode,
      confirmPinCode,
    } = usePinCode();

    // Transfer
    const { sendMoneyToUserWallet, isSendMoneySubmitting } = useMoney();

    const { pinCode = '', id: userId = '', bonusTimes = 0 } = user || {};

    // Users
    const { filterDataUser: userList = [] } = useGetUserDetails(userId);

    const {
      control: controlPinCode,
      handleSubmit: submitPinCode,
      formState: { isValid: isPinCodeValid },
      reset: resetPinCodeForm,
    } = useForm<TPinCodeForm>({
      defaultValues: {
        pinCode: '',
      },
      mode: 'onSubmit',
      reValidateMode: 'onSubmit',
    });

    const {
      control: controlSendMoney,
      handleSubmit: submitSendMoney,
      formState: { dirtyFields: sendMoneyDirtyFields },
      reset: resetSendMoney,
    } = useForm<TTransfer>({
      defaultValues: {
        memberId: '',
        amount: '',
      },
    });

    const getMemberId = useCallback(
      (email: string): string =>
        userList.find(
          (user) =>
            user.email.trim().toLocaleLowerCase() ===
            email.trim().toLowerCase(),
        )?._id || '',
      [userList],
    );

    const handleSetNewPinCodeSuccess = useCallback(
      (pinCode: string) => {
        user && setUser({ user: { ...user, pinCode } });
        onTogglePinCodeModal();
        resetPinCodeForm();

        toast(
          customToast(
            SUCCESS_MESSAGES.SET_PIN_CODE.title,
            SUCCESS_MESSAGES.SET_PIN_CODE.description,
            STATUS.SUCCESS,
          ),
        );
      },
      [onTogglePinCodeModal, resetPinCodeForm, setUser, toast, user],
    );

    const handleSetNewPinCodeError = useCallback(() => {
      toast(
        customToast(
          ERROR_MESSAGES.SET_PIN_CODE.title,
          ERROR_MESSAGES.SET_PIN_CODE.description,
          STATUS.ERROR,
        ),
      );

      resetPinCodeForm();
    }, [resetPinCodeForm, toast]);

    const handleSendMoneySuccess = useCallback(() => {
      toast(
        customToast(
          SUCCESS_MESSAGES.SEND_MONEY.title,
          SUCCESS_MESSAGES.SEND_MONEY.description,
          STATUS.SUCCESS,
        ),
      );

      bonusTimes &&
        user &&
        setUser({
          user: {
            ...user,
            bonusTimes: bonusTimes - 1,
          },
        });
    }, [bonusTimes, setUser, toast, user]);

    const handleSendMoneyError = useCallback(() => {
      toast(
        customToast(
          ERROR_MESSAGES.ADD_MONEY.title,
          ERROR_MESSAGES.ADD_MONEY.description,
          STATUS.ERROR,
        ),
      );
    }, [toast]);

    const handleSubmitSendMoney: SubmitHandler<TTransfer> = useCallback(
      (data) => {
        const submitData = {
          ...data,
          userId,
          memberId: getMemberId(data.memberId),
          amount: removeAmountFormat(data.amount),
        };

        sendMoneyToUserWallet(submitData, {
          onSuccess: handleSendMoneySuccess,
          onError: handleSendMoneyError,
        });

        resetSendMoney();
      },
      [
        getMemberId,
        handleSendMoneyError,
        handleSendMoneySuccess,
        resetSendMoney,
        sendMoneyToUserWallet,
        userId,
      ],
    );

    const handleConfirmPinCodeSuccess = useCallback(() => {
      onTogglePinCodeModal();
      resetPinCodeForm();

      toast(
        customToast(
          SUCCESS_MESSAGES.CONFIRM_PIN_CODE.title,
          SUCCESS_MESSAGES.CONFIRM_PIN_CODE.description,
          STATUS.SUCCESS,
        ),
      );

      submitSendMoney(handleSubmitSendMoney)();
    }, [
      handleSubmitSendMoney,
      onTogglePinCodeModal,
      resetPinCodeForm,
      submitSendMoney,
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

      resetPinCodeForm();
    }, [resetPinCodeForm, toast]);

    const handleSubmitPinCode = useCallback(
      (data: TPinCodeForm) => {
        const payload = {
          ...data,
          userId,
        };

        if (pinCode) {
          confirmPinCode(payload, {
            onSuccess: handleConfirmPinCodeSuccess,
            onError: handleConfirmPinCodeError,
          });

          return;
        }

        setNewPinCode(payload, {
          onSuccess: () => handleSetNewPinCodeSuccess(pinCode),
          onError: handleSetNewPinCodeError,
        });
      },
      [
        confirmPinCode,
        handleConfirmPinCodeError,
        handleConfirmPinCodeSuccess,
        handleSetNewPinCodeError,
        handleSetNewPinCodeSuccess,
        pinCode,
        setNewPinCode,
        userId,
      ],
    );

    const handleClosePinCodeModal = useCallback(() => {
      onTogglePinCodeModal();
      resetPinCodeForm();
    }, [onTogglePinCodeModal, resetPinCodeForm]);

    return (
      <>
        <WrappedComponent
          control={controlSendMoney}
          dirtyFields={sendMoneyDirtyFields}
          userList={userList}
          isSendMoneySubmitting={isSendMoneySubmitting}
          onSubmitSendMoneyHandler={submitSendMoney}
          onSubmitSendMoney={onTogglePinCodeModal}
          {...props}
        />
        {isPinCodeModalOpen && (
          <PinCodeModal
            title={
              pinCode
                ? 'Please enter your PIN code'
                : 'Please set the PIN code to your account'
            }
            control={controlPinCode}
            isOpen={true}
            isDisabled={
              !isPinCodeValid ||
              isLoadingSetNewPinCode ||
              isLoadingConfirmPinCode
            }
            isLoading={isLoadingSetNewPinCode || isLoadingConfirmPinCode}
            onclose={handleClosePinCodeModal}
            onSubmit={submitPinCode(handleSubmitPinCode)}
          />
        )}
      </>
    );
  };

  return SendMoneyWrapper;
};

export default withSendMoney;
