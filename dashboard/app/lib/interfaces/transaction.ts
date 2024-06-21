// Constants
import { PAYMENT_STATUS, TRANSACTION_STATUS } from '@/lib/constants';

// Types
import { TCustomer } from '.';

export type TTransaction = {
  _id: string;
  userId?: string;
  customer: TCustomer;
  amount: number;
  currency: string;
  createdAt: string;
  name: string;
  location: string;
  image: string;
  type: string;
  paymentStatus: PAYMENT_STATUS;
  transactionStatus: TRANSACTION_STATUS;
};

export interface IDataList {
  dataTransaction: TTransaction[];
  dataHistory: TTransaction[];
}

export type TTransactionSortField =
  | 'name'
  | 'email'
  | 'location'
  | 'spent'
  | 'role'
  | 'date';
