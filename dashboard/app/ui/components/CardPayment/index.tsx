'use client';

import { memo } from 'react';
import { Box, Heading } from '@chakra-ui/react';
import isEqual from 'react-fast-compare';

// Components
import CardBalance from './CardBalance';
import UserSelector from './UserSelector';
import EnterMoney from './EnterMoney';

// Utils
import { isEnableSubmitButton } from '@/lib/utils';

// HOCs
import { withSendMoney } from '@/lib/hocs';

// Types
import { TTransfer, TWithSendMoney } from '@/lib/interfaces';

interface CardPaymentProps {}

const REQUIRE_FIELDS = ['amount', 'memberId'];

export const CardPayment = ({
  control,
  dirtyFields,
  userList,
  isSendMoneySubmitting,
  onSubmitSendMoneyHandler,
  onSubmitSendMoney,
}: TWithSendMoney<CardPaymentProps>): JSX.Element => {
  const dirtyItems = Object.keys(dirtyFields).filter(
    (key) => dirtyFields[key as keyof TTransfer],
  );
  const shouldEnable = isEnableSubmitButton(REQUIRE_FIELDS, dirtyItems);

  return (
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

      <CardBalance />

      <Box
        as="form"
        mt={4}
        onSubmit={onSubmitSendMoneyHandler(onSubmitSendMoney)}
      >
        <UserSelector control={control} listUser={userList} />
        <EnterMoney
          isDisabled={!shouldEnable || isSendMoneySubmitting}
          control={control}
        />
      </Box>
    </Box>
  );
};

const CardPaymentMemorized = memo(withSendMoney(CardPayment), isEqual);

export default CardPaymentMemorized;
