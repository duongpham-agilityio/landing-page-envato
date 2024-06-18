// Libs
import { ReactElement, memo, useCallback } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Center, Flex, IconButton, Text } from '@chakra-ui/react';
import dynamic from 'next/dynamic';

// Components
import { Eye, EyeSlash } from '@/ui/components';

// Constants
import { IMAGES } from '@/lib/constants';

// Utils
import { formatDecimalNumber } from '@/lib/utils';

const PinCodeModal = dynamic(() => import('@/ui/components/PinCodeModal'));

type TBalanceStatus = {
  balance: string;
  iconBalance: ReactElement;
};

type TPinCodeForm = {
  pinCode: string;
};

export type TCardProps = {
  balance: number;
  userPinCode: string;
  isPinCodeModalOpen: boolean;
  isLoadingPinCode: boolean;
  onTogglePinCodeModal: () => void;
  onSubmitPinCode: (pinCode: string, callback?: () => void) => void;
  isShowBalance: boolean;
  onToggleShowBalance: () => void;
};

const CardBalance = ({
  balance,
  userPinCode,
  isLoadingPinCode,
  isPinCodeModalOpen,
  onTogglePinCodeModal,
  isShowBalance,
  onToggleShowBalance,
  onSubmitPinCode,
}: TCardProps) => {
  const {
    control,
    handleSubmit: handleSubmitPinCode,
    formState: { isValid: isConfirmValid },
    reset: resetPinCodeForm,
  } = useForm<TPinCodeForm>({
    defaultValues: {
      pinCode: '',
    },
    mode: 'onSubmit',
    reValidateMode: 'onSubmit',
  });

  const { iconBalance, balance: balanceStatus }: TBalanceStatus = {
    iconBalance: isShowBalance ? <EyeSlash /> : <Eye />,
    balance: isShowBalance ? '******' : `$${formatDecimalNumber(balance)}`,
  };

  const handleToggleShowBalance = useCallback(() => {
    if (!isShowBalance) {
      onToggleShowBalance();

      return;
    }

    // Open Pin Code modal
    onTogglePinCodeModal();
  }, [isShowBalance, onTogglePinCodeModal, onToggleShowBalance]);

  const onSubmitPinCodeForm: SubmitHandler<TPinCodeForm> = useCallback(
    async (data) => {
      const pinCode = data.pinCode;
      onSubmitPinCode(pinCode, resetPinCodeForm);
    },
    [onSubmitPinCode, resetPinCodeForm],
  );

  const handleClosePinCodeModal = useCallback(() => {
    onTogglePinCodeModal();
    resetPinCodeForm();
  }, [onTogglePinCodeModal, resetPinCodeForm]);

  return (
    <>
      <Center>
        <Flex
          flexDir="column"
          bgImage={IMAGES.CARD_PAYMENT.url}
          justifyContent="flex-end"
          borderRadius="lg"
          bgPosition="center"
          bgSize={{ base: 'cover', sm: 'unset' }}
          bgRepeat="no-repeat"
          p={2}
          w={{ base: '100%', sm: 340 }}
          h={{ base: 180, sm: 200 }}
        >
          <Flex alignItems="center" gap={{ base: 1, sm: 3 }}>
            <Text variant="textSm" color="secondary.300">
              Balance
            </Text>
            <IconButton
              aria-label="eye"
              data-testid="btn-eye"
              icon={iconBalance}
              w="fit-content"
              bg="none"
              onClick={handleToggleShowBalance}
              sx={{
                _hover: {
                  bg: 'none',
                },
              }}
            />
          </Flex>
          <Text
            color="common.white"
            variant="text3Xl"
            fontWeight="semibold"
            fontSize={{ base: 'md', sm: '3xl' }}
            lineHeight={{ base: 'unset', sm: 'lg' }}
          >
            {balanceStatus}
          </Text>
        </Flex>
      </Center>

      {/*Set/Confirm PIN code Modal */}
      {isPinCodeModalOpen && (
        <PinCodeModal
          title={
            userPinCode
              ? 'Please enter your PIN code'
              : 'Please set the PIN code to your account'
          }
          control={control}
          isOpen={true}
          isDisabled={!isConfirmValid || isLoadingPinCode}
          isLoading={isLoadingPinCode}
          onclose={handleClosePinCodeModal}
          onSubmit={handleSubmitPinCode(onSubmitPinCodeForm)}
        />
      )}
    </>
  );
};

const CardBalanceMemorized = memo(CardBalance);

export default CardBalanceMemorized;
