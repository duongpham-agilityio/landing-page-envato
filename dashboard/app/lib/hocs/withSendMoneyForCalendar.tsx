// Libs
import { ReactNode, useCallback } from 'react';
import { useToast } from '@chakra-ui/react';

// Stores
import { authStore } from '@/lib/stores';

// Actions
import { sendMoney } from '@/lib/actions';

// Hooks
import { useAuth } from '@/lib/hooks';

// Constants
import { STATUS, SUCCESS_MESSAGES } from '@/lib/constants';

// Utils
import { customToast, removeAmountFormat } from '@/lib/utils';

// Types
import {
  TTransfer,
  TUserDetail,
  TWithSendMoneyForCalendar,
} from '@/lib/interfaces';
// import { TTransferData } from './withPinCode';
export type TTransferData = TTransfer & {
  resetSendMoney?: () => void;
};

interface SendMoneyForCalendarWrapperProps {
  userList: Array<
    Omit<TUserDetail, 'id'> & {
      _id: string;
    }
  >;
  balance: number;
}

export const withSendMoneyForCalendar = (
  WrappedComponent: (props: TWithSendMoneyForCalendar) => ReactNode,
) => {
  const SendMoneyForCalendarWrapper = async ({
    userList = [],
    balance = 0,
  }: SendMoneyForCalendarWrapperProps) => {
    const toast = useToast();

    // Stores
    const user = authStore((state) => state.user);

    // Auth
    const { setUser } = useAuth();

    const { id: userId = '', bonusTimes = 0 } = user || {};

    const getMemberId = useCallback(
      (email: string): string =>
        userList.find(
          (user) =>
            user.email.trim().toLocaleLowerCase() ===
            email.trim().toLowerCase(),
        )?._id || '',
      [userList],
    );

    const handleSubmitSendMoney = useCallback(
      async (data: TTransferData) => {
        const submitData = {
          userId,
          memberId: getMemberId(data.memberId),
          amount: removeAmountFormat(data.amount),
        };
        const resetFn = data.resetSendMoney || (() => {});

        const res = await sendMoney(submitData);

        const { error } = res || {};

        if (error) {
          toast(customToast(error.title, error.description, STATUS.ERROR));
          resetFn();

          return;
        }

        toast(
          customToast(
            SUCCESS_MESSAGES.SEND_MONEY.title,
            SUCCESS_MESSAGES.SEND_MONEY.description,
            STATUS.SUCCESS,
          ),
        );

        bonusTimes &&
          setUser({
            user: {
              ...user,
              bonusTimes: bonusTimes - 1,
            },
          });
        resetFn();
      },
      [bonusTimes, getMemberId, setUser, toast, user, userId],
    );

    const handleConfirmPinCodeSuccess = useCallback(
      (data?: TTransfer) => {
        // Call api to send money here
        data && handleSubmitSendMoney(data);
      },
      [handleSubmitSendMoney],
    );

    console.log('userList', userList);

    return (
      <WrappedComponent
        balance={balance}
        userList={userList}
        onConfirmPinCodeSuccess={handleConfirmPinCodeSuccess}
      />
    );
  };

  return SendMoneyForCalendarWrapper;
};
