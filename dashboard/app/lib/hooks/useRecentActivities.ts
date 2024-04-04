import { useCallback, useMemo, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import dayjs from 'dayjs';

// Constants
import { END_POINTS, TIME_DETAIL_FORMAT } from '@/lib/constants';

// Services
import { getRecentActivities } from '@/lib/services';

// Interface
import { SortType, TRecentActivities } from '@/lib/interfaces';

// Utils
import { handleSort } from '@/lib/utils';

// Store
import { authStore } from '../stores';

export type TAction = {
  actionName: string;
  email?: string;
};

export type TActivitiesSortField = 'actionName' | 'email' | 'date';
type TSort = {
  field: TActivitiesSortField | '';
  type: SortType;
};
export type TActivitiesSortHandler = (field: TActivitiesSortField) => void;

export const useRecentActivities = (queryParam?: TAction) => {
  const userId = authStore((state) => state.user?.id);

  const { actionName: searchActionName, email: searchEmail }: TAction =
    Object.assign(
      {
        actionName: '',
        email: '',
      },
      queryParam,
    );

  const sortType: Record<SortType, SortType> = useMemo(
    () => ({
      desc: SortType.ASC,
      asc: SortType.DESC,
    }),
    [],
  );

  const [sortValue, setSortValue] = useState<TSort>({
    field: '',
    type: SortType.ASC,
  });

  const { data = [], ...query } = useQuery({
    queryKey: [END_POINTS.RECENT_ACTIVITIES, searchActionName, searchEmail],
    queryFn: ({ signal }) => getRecentActivities('', { signal }, userId),
  });

  // sort activitiesSorted
  const activitiesAfterSort: TRecentActivities[] = useMemo(() => {
    const tempActivities: TRecentActivities[] = [...data];
    const { field, type } = sortValue;

    if (!field) return data;

    tempActivities.sort(
      (
        {
          actionName: prevActivitiesName,
          email: prevEmail,
          createdAt: prevCreatedAt,
        }: TRecentActivities,
        {
          actionName: nextActivitiesName,
          email: nextEmail,
          createdAt: nextCreatedAt,
        }: TRecentActivities,
      ) => {
        const valueForField: Record<TActivitiesSortField, number> = {
          actionName: handleSort(
            type,
            prevActivitiesName ?? '',
            nextActivitiesName ?? '',
          ),
          email: handleSort(type, prevEmail ?? '', nextEmail ?? ''),
          date: handleSort(
            type,
            dayjs(prevCreatedAt).format(TIME_DETAIL_FORMAT) ?? '',
            dayjs(nextCreatedAt).format(TIME_DETAIL_FORMAT) ?? '',
          ),
        };

        return valueForField[field] ?? 0;
      },
    );

    return tempActivities;
  }, [data, sortValue]);

  /**
   * TODO: Since the API is imprecise we will use this method for now.
   * TODO: Will be removed in the future and will use queryKey for re-fetching
   */
  const activities: TRecentActivities[] = useMemo((): TRecentActivities[] => {
    const isNameMatchWith = (target = ''): boolean =>
      target.trim().toLowerCase().includes(searchActionName);

    return activitiesAfterSort.filter(
      ({ actionName, email }: TRecentActivities) => {
        const isMatchWithName: boolean = isNameMatchWith(actionName);
        const isMatchWithEmail: boolean = isNameMatchWith(email);

        return isMatchWithName || isMatchWithEmail;
      },
    );
  }, [activitiesAfterSort, searchActionName]);

  const sortBy: TActivitiesSortHandler = useCallback(
    (field: TActivitiesSortField) => {
      setSortValue((prev) => ({
        field: field,
        type: sortType[prev.type],
      }));
    },
    [sortType],
  );

  return {
    ...query,
    activities,
    data: activities,
    sortBy,
  };
};
