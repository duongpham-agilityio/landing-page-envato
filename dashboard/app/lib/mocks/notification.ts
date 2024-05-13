// Libs
import { AxiosRequestHeaders, AxiosResponse } from 'axios';

// Types
import { TNotification } from '@/lib/interfaces';

export const NOTIFICATION: TNotification[] = [
  {
    _id: '1',
    sender: 'James Eusobio',
    content: 'send a new payment for',
    receiver: 'SEO',
    amount: '$29.00',
    createdAt: '23 mins ago',
    isMarkAsRead: false,
    userId: '6593beacff649fc6c4d2964b',
    type: 'send',
  },
  {
    _id: '2',
    sender: 'Devon Lane',
    content: 'send a new payment for',
    receiver: 'HR',
    amount: '$199.00',
    createdAt: '5 mins ago',
    isMarkAsRead: true,
    userId: '6593beacff649fc6c4d2964b',
    type: 'send',
  },
  {
    _id: '3',
    sender: 'Bessie Cooper',
    content: 'send a new payment for',
    receiver: 'CEO',
    amount: '$10.00',
    createdAt: '1 mins ago',
    isMarkAsRead: false,
    userId: '6593beacff649fc6c4d2964b',
    type: 'add',
  },
  {
    _id: '4',
    sender: 'Fepaciy Russell',
    content: 'send a new payment for',
    receiver: 'SEO',
    amount: '$1.00',
    createdAt: '3 mins ago',
    isMarkAsRead: true,
    userId: '6593beacff649fc6c4d2964b',
    type: 'send',
  },
  {
    _id: '5',
    sender: 'Somav Russell',
    content: 'send a new payment for',
    receiver: 'SEO',
    amount: '$2.00',
    createdAt: '10 mins ago',
    isMarkAsRead: true,
    userId: '6593beacff649fc6c4d2964b',
    type: 'send',
  },
];

export const MOCK_NOTIFICATIONS_SUCCESS_RES: AxiosResponse<TNotification[]> = {
  data: NOTIFICATION,
  status: 200,
  statusText: 'Ok',
  headers: {},
  config: {
    headers: {} as AxiosRequestHeaders,
  },
};

export const MOCK_NOTIFICATION_PAYLOAD = {
  userId: NOTIFICATION[0].userId,
  notificationId: NOTIFICATION[0]._id,
};
