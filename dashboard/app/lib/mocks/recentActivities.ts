// Libs
import { AxiosRequestHeaders, AxiosResponse } from 'axios';

// Types
import { TRecentActivities } from '@/lib/interfaces';

// Hooks
import { TActivity } from '@/lib/hooks';

export const RECENT_ACTIVITIES: TRecentActivities[] = [
  {
    createdAt: 'createdAt 1',
    actionName: 'name 1',
    email: 'email 1',
    _id: '1',
  },
  {
    createdAt: 'createdAt 2',
    actionName: 'name 2',
    email: 'email 2',
    _id: '2',
  },
  {
    createdAt: 'createdAt 3',
    actionName: 'name 3',
    email: 'email 3',
    _id: '3',
  },
];

export const MOCK_RECENT_ACTIVITIES_SUCCESS_RES: AxiosResponse<TActivity> = {
  data: { result: RECENT_ACTIVITIES, totalPage: 3 },
  status: 200,
  statusText: 'Ok',
  headers: {},
  config: {
    headers: {} as AxiosRequestHeaders,
  },
};
