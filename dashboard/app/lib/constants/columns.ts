// Types
import { TDataSource, TTransaction } from '../interfaces';

export const COLUMNS_DASHBOARD = (
  onRenderHead: (title: string, key: string) => void,
  onRenderRole: (role: TTransaction) => void,
  onRenderBody: ({ id, image, name }: TDataSource) => void,
  onRenderActionIcon: (data: TTransaction) => void,
  onRenderSpent: (spent: TTransaction) => void,
  onRenderEmail: (email: TTransaction) => void,
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
    renderBody: onRenderEmail,
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
    renderBody: onRenderSpent,
  },
  {
    title: 'Role',
    key: 'role',
    renderHead: onRenderHead,
    renderBody: onRenderRole,
  },
  {
    title: '',
    key: 'action',
    renderBody: onRenderActionIcon,
    renderHead: onRenderHead,
  },
];

export const COLUMNS_HISTORY = (
  renderHead: (title: string, key: string) => void,
  renderBody: ({ id, image, name }: TDataSource) => void,
  renderPaymentStatus: ({ paymentStatus }: TDataSource) => void,
  renderTransactionStatus: ({ paymentStatus }: TDataSource) => void,
  renderSpent: (spent: TTransaction) => void,
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
    renderBody: renderSpent,
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
