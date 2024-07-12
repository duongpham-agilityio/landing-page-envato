'use client';

import { memo, useCallback, useEffect, useMemo } from 'react';
import { Box, Heading } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';

// Components
import CardBalanceForCalendar from './CardBalanceForCalendar';
import UserSelector from '../CardPayment/UserSelector';
import EnterMoney from '../CardPayment/EnterMoney';

// Utils
import { isEnableSubmitButton } from '@/lib/utils';

// HOCs
import { withPinCode, withSendMoneyForCalendar } from '@/lib/hocs';

// Types
import {
  TTransfer,
  TUserDetail,
  TWithPinCode,
  TWithSendMoneyForCalendar,
} from '@/lib/interfaces';

const REQUIRE_FIELDS = ['amount', 'memberId'];

interface TCardPaymentProps {
  userList: Array<
    Omit<TUserDetail, 'id'> & {
      _id: string;
    }
  >;
  balance: number;
}

export type TCardPaymentWithPinCode = TWithSendMoneyForCalendar &
  TWithPinCode<TCardPaymentProps>;

const CardPaymentForCalendar = ({
  userList,
  balance,
  onTogglePinCodeModal,
}: TCardPaymentWithPinCode): JSX.Element => {
  const {
    control,
    handleSubmit: submitSendMoney,
    formState: { dirtyFields, isSubmitting, isSubmitted },
    reset: resetSendMoney,
  } = useForm<TTransfer>({
    defaultValues: {
      memberId: '',
      amount: '',
    },
    resetOptions: {
      keepDirtyValues: true, // user-interacted input will be retained
      keepErrors: true, // input errors will be retained with value update
    },
  });

  const dirtyItems = Object.keys(dirtyFields).filter(
    (key) => dirtyFields[key as keyof TTransfer],
  );
  const shouldEnable = isEnableSubmitButton(REQUIRE_FIELDS, dirtyItems);

  const BalanceSection = useMemo(
    () => (
      <>
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

        <CardBalanceForCalendar balance={balance} />
      </>
    ),
    [balance],
  );

  const handleSubmitSendMoney = useCallback(
    (data: TTransfer) => {
      onTogglePinCodeModal(data, resetSendMoney);
    },
    [onTogglePinCodeModal, resetSendMoney],
  );

  useEffect(() => {
    console.log('isSubmitted', isSubmitted);
  }, [isSubmitted]);

  return (
    <Box
      p={4}
      w="full"
      bg="background.body.quaternary"
      py={{ base: 4, md: 5 }}
      px={{ base: 4, md: 10 }}
      borderRadius="lg"
    >
      {BalanceSection}

      <Box as="form" mt={4} onSubmit={submitSendMoney(handleSubmitSendMoney)}>
        <UserSelector control={control} listUser={userList} />
        <EnterMoney
          isDisabled={!shouldEnable || isSubmitting}
          isLoading={isSubmitting}
          control={control}
        />
      </Box>
    </Box>
  );
};

const CardPaymentMemorized = memo(
  withSendMoneyForCalendar(withPinCode(CardPaymentForCalendar)),
);

export default CardPaymentMemorized;
