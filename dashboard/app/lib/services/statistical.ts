import { IAxiosConfig } from '@/lib/interfaces';
import { mainHttpService } from '.';

export const getStatistical = async <T>(
  endPoint: string,
  config?: IAxiosConfig,
): Promise<T> => {
  const response = await mainHttpService.get<T>({
    path: endPoint,
    configs: config,
  });

  return response.data;
};
