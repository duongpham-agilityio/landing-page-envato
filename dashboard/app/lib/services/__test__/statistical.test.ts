import { AxiosResponse } from 'axios';

// Services
import { getStatistical, mainHttpService } from '@/lib/services';

// Mocks
import { STATISTICAL } from '@/lib/mocks';
import { END_POINTS } from '@/lib/constants';

type TError = {
  isError: boolean;
};

describe('Statistics service', () => {
  it('Get statistics (resolve)', async () => {
    jest
      .spyOn(mainHttpService, 'get')
      .mockResolvedValue({ data: STATISTICAL } as AxiosResponse);

    const statistical = await getStatistical(END_POINTS.STATISTICS);

    expect(statistical).toEqual(STATISTICAL);
  });

  it('Get statistics (reject)', async () => {
    try {
      jest.spyOn(mainHttpService, 'get').mockRejectedValue({
        isError: true,
      });

      await getStatistical(END_POINTS.STATISTICS);
    } catch (error) {
      const err = (error as unknown as TError).isError;

      expect(err).toBeTruthy();
    }
  });
});
