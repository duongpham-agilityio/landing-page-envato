import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';

// Constants
import { END_POINTS } from '@/lib/constants';

// stores
import { authStore } from '../stores';

// Hooks
import { TSearchTransaction } from '@/lib/hooks';

// Services
import {
  MainHttpService,
  getAllUserDetailsExceptWithId,
  getSupports,
  userHttpRequest,
} from '@/lib/services';

// Utils
import { logActivity } from '@/lib/utils';

// Interfaces
import { EActivity, IIssues, TPassword, TUserDetail } from '@/lib/interfaces';

export const useUpdateUser = () => {
  const { error, ...rest } = useMutation({
    mutationFn: (user: TUserDetail) =>
      MainHttpService.put<TUserDetail>({
        path: END_POINTS.USERS,
        data: user,
        actionName: EActivity.SAVE_PROFILE,
        userId: user.id,
        onActivity: logActivity,
      }),
  });

  return {
    ...rest,
    error: error?.message ?? '',
  };
};

export const useUpdatePassword = () => {
  const { user } = authStore();
  const { error, ...rest } = useMutation({
    mutationFn: (passwordData: TPassword) => {
      const { oldPassword, newPassword, memberId } = passwordData;

      return MainHttpService.put<TPassword>({
        path: END_POINTS.UPDATE_PASSWORD,
        data: {
          oldPassword,
          newPassword,
          memberId,
        },
        actionName: EActivity.SAVE_PASSWORD,
        userId: user?.id,
        onActivity: logActivity,
      });
    },
  });

  return {
    ...rest,
    error: error?.message ?? '',
  };
};

export const useGetListIssues = () => {
  const { data, ...rest } = useInfiniteQuery({
    queryKey: [END_POINTS.SUPPORT],
    queryFn: ({ pageParam = 1 }) => getSupports(END_POINTS.SUPPORT, pageParam),
    getNextPageParam: (lastPage) => {
      if (lastPage.pageParams > lastPage.data.totalPage) return undefined;

      return lastPage.pageParams;
    },
    initialPageParam: 1,
  });

  const issuesData: IIssues[] =
    data?.pages.flatMap((page) => page.data.result) || [];
  return {
    data: issuesData,
    ...rest,
  };
};

export const useCreateIssues = () => {
  const queryClient = useQueryClient();
  const { user } = authStore();
  const { error, ...rest } = useMutation({
    mutationFn: (
      supportList: Partial<
        TUserDetail & {
          userId: string;
          phone: string;
        }
      >,
    ) =>
      MainHttpService.post<TUserDetail>({
        path: END_POINTS.SUPPORT,
        data: supportList,
        actionName: EActivity.CREATE_ISSUES,
        userId: user?.id,
        onActivity: logActivity,
      }),
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: [END_POINTS.SUPPORT] });
    },
  });

  return {
    ...rest,
    error: error?.message || '',
  };
};

export const useGetUserDetails = (
  id: string,
  queryParam?: TSearchTransaction,
) => {
  const { name: searchName }: TSearchTransaction = Object.assign(
    {
      name: '',
    },
    queryParam,
  );

  const { data: listUserDetail, ...query } = useQuery({
    queryKey: [END_POINTS.USERS, queryParam?.name],
    queryFn: () => getAllUserDetailsExceptWithId(id, ''),
  });

  const isNameMatchWith = (target: string): boolean =>
    (target || '').trim().toLowerCase().includes(searchName);

  const filterDataUser = listUserDetail?.filter(({ firstName, lastName }) =>
    isNameMatchWith(`${firstName} ${lastName}`),
  );

  return {
    ...query,
    filterDataUser,
  };
};

export const useManagementUser = (querySearch = '') => {
  const queryClient = useQueryClient();

  const {
    mutate: managementUser,
    isPending: isSendRequestUser,
    ...query
  } = useMutation({
    mutationFn: async ({
      urlEndpoint = '',
      ...user
    }: Partial<
      TUserDetail & { memberId: string; userId: string; urlEndpoint: string }
    >) => await userHttpRequest.put<TUserDetail>(urlEndpoint, user),
    onSuccess: (_, variables) => {
      queryClient.setQueryData(
        [END_POINTS.USERS, querySearch],
        (oldData: TUserDetail[]) => {
          const dataUpdated = oldData.map((item) =>
            item._id === variables.memberId
              ? { ...item, isBlock: !item.isBlock }
              : item,
          );
          return dataUpdated;
        },
      );
    },
  });

  return {
    ...query,
    isSendRequestUser,
    managementUser,
  };
};
