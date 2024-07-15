import { UseFormReset } from 'react-hook-form';
import { TTransfer } from './money';

export type TWithPinCode<T> = {
  onTogglePinCodeModal: (
    data?: TTransfer,
    resetSendMoney?: UseFormReset<TTransfer>,
  ) => void;
} & T;

export type PinCodeWrapperProps<K> = {
  onConfirmPinCodeSuccess: (
    data?: TTransfer,
    resetSendMoney?: UseFormReset<TTransfer>,
  ) => void;
} & K;
