import { UseFormHandleSubmit, UseFormReset } from 'react-hook-form';
import { TTransfer } from './money';

export type TWithPinCode<T> = {
  onTogglePinCodeModal: (
    submitSendMoney?: UseFormHandleSubmit<TTransfer>,
    resetSendMoney?: UseFormReset<TTransfer>,
  ) => void;
} & T;

export type PinCodeWrapperProps<K> = {
  onConfirmPinCodeSuccess: () => void;
} & K;
