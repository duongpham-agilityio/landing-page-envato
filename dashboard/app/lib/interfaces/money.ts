// Libs
import { Control, UseFormHandleSubmit } from 'react-hook-form';

// Types
import { TUserDetail } from './user';

export type TMoney = {
  amount: number;
};

export type TAddMoney = TMoney & {
  userId: string;
};

export type TSendMoney = TAddMoney & {
  memberId: string;
};

export type TMoneyResponse = {
  message: string;
};

export type TTransfer = {
  amount: string;
  memberId: string;
  userId: string;
};

export type TTransferDirtyFields = {
  [K in keyof TTransfer]?: Readonly<boolean>;
};

export type TWithSendMoney<T> = {
  control: Control<TTransfer>;
  dirtyFields: TTransferDirtyFields;
  userList: Array<
    Omit<TUserDetail, 'id'> & {
      _id: string;
    }
  >;
  isSendMoneySubmitting: boolean;
  onSubmitSendMoneyHandler: UseFormHandleSubmit<TTransfer>;
  onSubmitSendMoney: () => void;
} & T;
