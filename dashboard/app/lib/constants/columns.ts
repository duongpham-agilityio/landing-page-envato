// Types
import { TDataSource } from '../interfaces';

export const COLUMNS_DASHBOARD = (
  onRenderHead: (title: string, key: string) => void,
  onRenderBody: ({ id, image, name }: TDataSource) => void,
) => [
  {
    title: 'Customer name',
    key: 'name',
    renderHead: onRenderHead,
    renderBody: onRenderBody,
  },
  {
    title: 'Email',
    key: 'email',
    renderHead: onRenderHead,
  },
  {
    title: 'Location',
    key: 'location',
    renderHead: onRenderHead,
  },
  {
    title: 'Spent',
    key: 'spent',
    renderHead: onRenderHead,
  },
  {
    title: 'Role',
    key: 'role',
    renderHead: onRenderHead,
  },
];

export const COLUMNS_HISTORY = (
  renderHead: (title: string, key: string) => void,
  renderBody: ({ id, image, name }: TDataSource) => void,
  renderPaymentStatus: ({ paymentStatus }: TDataSource) => void,
  renderTransactionStatus: ({ paymentStatus }: TDataSource) => void,
) => [
  {
    title: 'Customer name',
    key: 'name',
    renderHead: renderHead,
    renderBody: renderBody,
  },
  {
    title: 'Date',
    key: 'date',
    renderHead: renderHead,
  },
  {
    title: 'Amount',
    key: 'spent',
    renderHead: renderHead,
  },
  {
    title: 'Payment',
    key: 'paymentStatus',
    renderHead: renderHead,
    renderBody: renderPaymentStatus,
  },
  {
    title: 'Status',
    key: 'transactionStatus',
    renderHead: renderHead,
    renderBody: renderTransactionStatus,
  },
];
