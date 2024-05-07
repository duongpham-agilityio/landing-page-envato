// Libs
import { AxiosInstance } from 'axios';

export type TOnActivity = (
  httpService: AxiosInstance,
  actionName: string,
  userId?: string,
) => number;

export type QueryOptions = {
  path: string;
  data: object;
  configs?: object;
  userId?: string;
  searchParam?: string;
  page?: number;
  limit?: number;
  actionName?: string;
  onActivity?: TOnActivity;
};
