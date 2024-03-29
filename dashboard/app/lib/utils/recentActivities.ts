import dayjs from 'dayjs';

// Types
import { TRecentActivities } from '@/lib/interfaces';

// Utils
import { formatUppercaseFirstLetter } from '.';

// Constants
import { TIME_DETAIL_FORMAT } from '../constants';

/**
 * Convert data show for home page
 * @param recentActivities
 * @returns
 */
export const formatRecentActivitiesResponse = (
  recentActivities: TRecentActivities[] = [],
) =>
  recentActivities.map((activity) => {
    const { _id, actionName, email, createdAt } = activity;

    return {
      _id: _id,
      actionName: formatUppercaseFirstLetter(actionName),
      email,
      date: dayjs(createdAt).format(TIME_DETAIL_FORMAT),
    };
  });
