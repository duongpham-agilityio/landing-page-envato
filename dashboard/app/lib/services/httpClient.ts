import axios, { AxiosResponse } from 'axios';

// Constants
import { STATISTICAL_API } from '@/lib/constants';

// Util
import { logActivity } from '../utils';

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

  get<T>(path: string, configs?: object): Promise<AxiosResponse<T>> {
    return this.axiosClient.get<T>(`${this.baseApi}${path}`, configs);
  }

  post<T>(
    path: string,
    data: object,
    configs: object,
    actionName: string,
    userId?: string,
  ): Promise<AxiosResponse<T>> {
    const activity = logActivity(this.axiosClient, actionName, userId);

    return this.axiosClient
      .post<T>(`${this.baseApi}${path}`, data, configs)
      .then((response) => {
        this.axiosClient.interceptors.response.eject(activity);
        return response;
      });
  }

  put<T>(
    path: string,
    data: object,
    actionName: string,
    userId?: string,
  ): Promise<AxiosResponse<T>> {
    const activity = logActivity(this.axiosClient, actionName, userId);

    return this.axiosClient
      .put<T>(`${this.baseApi}${path}`, data)
      .then((response) => {
        this.axiosClient.interceptors.response.eject(activity);
        return response;
      });
  }

  patch<T>(path: string, data: object): Promise<AxiosResponse<T>> {
    return this.axiosClient.patch<T>(`${this.baseApi}${path}`, data);
  }

  delete<T>(path: string): Promise<AxiosResponse<T>> {
    return this.axiosClient.delete<T>(`${this.baseApi}${path}`);
  }
}

export const MainHttpService = new HttpService(STATISTICAL_API);
