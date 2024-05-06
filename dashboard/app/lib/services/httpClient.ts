import axios, { AxiosResponse } from 'axios';

// Constants
import { PAGE_SIZE, STATISTICAL_API } from '@/lib/constants';

// Interfaces
import { QueryOptions } from '@/lib/interfaces';

class HttpService {
  private readonly baseApi: string;

  constructor(baseUrl: string) {
    this.baseApi = baseUrl;
  }

  private axiosClient = axios.create({
    headers: {
      accept: 'application/json',
    },
  });

  get<T>({
    path,
    configs,
    userId = '',
    searchParam = '',
    page = 1,
    limit = PAGE_SIZE,
  }: Omit<QueryOptions, 'data'>): Promise<AxiosResponse<T>> {
    return this.axiosClient.get<T>(
      `${this.baseApi}${path}/${userId}/${page}/${limit}${searchParam}`,
      configs,
    );
  }

  post<T>({
    path,
    data,
    configs,
    actionName,
    userId,
    onActivity,
  }: QueryOptions): Promise<AxiosResponse<T>> {
    const activity =
      onActivity && onActivity(this.axiosClient, actionName, userId);

    return this.axiosClient
      .post<T>(`${this.baseApi}${path}`, data, configs)
      .then((response) => {
        console.log('activity', activity);
        activity && this.axiosClient.interceptors.response.eject(activity);
        return response;
      });
  }

  put<T>({
    path,
    data,
    configs,
    actionName,
    userId,
    onActivity,
  }: QueryOptions): Promise<AxiosResponse<T>> {
    const activity =
      onActivity && onActivity(this.axiosClient, actionName, userId);

    return this.axiosClient
      .put<T>(`${this.baseApi}${path}`, data, configs)
      .then((response) => {
        activity && this.axiosClient.interceptors.response.eject(activity);
        return response;
      });
  }

  patch<T>({
    path,
    data,
    actionName,
    userId,
    onActivity,
  }: QueryOptions): Promise<AxiosResponse<T>> {
    const activity =
      onActivity && onActivity(this.axiosClient, actionName, userId);

    return this.axiosClient
      .patch<T>(`${this.baseApi}${path}`, data)
      .then((response) => {
        activity && this.axiosClient.interceptors.response.eject(activity);
        return response;
      });
  }

  delete<T>({
    path,
    data,
    actionName,
    userId,
    onActivity,
  }: QueryOptions): Promise<AxiosResponse<T>> {
    const activity =
      onActivity && onActivity(this.axiosClient, actionName, userId);

    return this.axiosClient
      .delete<T>(`${this.baseApi}${path}`, data)
      .then((response) => {
        activity && this.axiosClient.interceptors.response.eject(activity);
        return response;
      });
  }
}

export const MainHttpService = new HttpService(STATISTICAL_API);
