// Services
import {
  getRecentActivities,
  recentActivitiesHttpService,
} from '@/lib/services';

// Mocks
import { RECENT_ACTIVITIES } from '@/lib/mocks';

describe('RecentActivities service', () => {
  it('Get RecentActivities (resolve)', async () => {
    jest
      .spyOn(recentActivitiesHttpService, 'get')
      .mockResolvedValue({ data: RECENT_ACTIVITIES });

    const recentActivities = await getRecentActivities();

    expect(recentActivities).toEqual(recentActivities);
  });

  it('Get RecentActivities with out data', async () => {
    jest
      .spyOn(recentActivitiesHttpService, 'get')
      .mockResolvedValue({ data: [] });

    const recentActivities = await getRecentActivities();

    expect(recentActivities).toEqual(recentActivities);
  });

  it('Get RecentActivities (reject)', async () => {
    try {
      jest.spyOn(recentActivitiesHttpService, 'get').mockRejectedValue({
        data: {
          isError: true,
        },
      });

      await getRecentActivities();
    } catch (error) {
      const err = (error as unknown as { data: unknown }).data;

      expect(err).toEqual({
        isError: true,
      });
    }
  });
});
