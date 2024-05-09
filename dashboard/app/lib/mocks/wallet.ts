// Libs
import { AxiosRequestHeaders, AxiosResponse } from 'axios';

// Types
import { TWallet } from '@/lib/interfaces';

export const WALLET_MOCK = [
  {
    accountId: '65a4a3a280522b2e38c4b4a6',
    balance: 200.4899,
    createdAt: '2024-01-15T03:16:50.460Z',
    currency: '$',
    email: 'superadmin@test.com',
    firstName: 'Super',
    lastName: 'Admin',
    updatedAt: '2024-01-25T09:42:28.819Z',
    _id: '65a4a3a280522b2e38c4b4a8',
  },
];

export const MOCK_WALLET_SUCCESS_RES: AxiosResponse<TWallet> = {
  data: WALLET_MOCK[0],
  status: 200,
  statusText: 'Ok',
  headers: {},
  config: {
    headers: {} as AxiosRequestHeaders,
  },
};
