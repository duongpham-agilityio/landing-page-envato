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
import { mainHttpService } from '@/lib/services';

// Utils
import { logActivity } from '@/lib/utils';

// Interfaces
import { EActivity, IIssues, TPassword, TUserDetail } from '@/lib/interfaces';

export type UsersResponse = Array<
  Omit<TUserDetail, 'id'> & {
    _id: string;
  }
>;

export type TIssueResponse = {
  result: Array<IIssues>;
  totalPage: number;
};

export const useUpdateUser = () => {
  const { error, ...rest } = useMutation({
    mutationFn: (user: TUserDetail) =>
      mainHttpService.put<TUserDetail>({
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

      return mainHttpService.put<TPassword>({
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
    queryFn: async ({ pageParam = 1 }) => {
      const data = (
        await mainHttpService.get<TIssueResponse>({
          path: END_POINTS.SUPPORT,
          page: pageParam,
        })
      ).data;

      return { data, pageParams: pageParam + 1 };
    },
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
      mainHttpService.post<TUserDetail>({
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

  const { data: res, ...query } = useQuery({
    queryKey: [END_POINTS.USERS, queryParam?.name],
    queryFn: () =>
      mainHttpService.get<UsersResponse>({
        path: END_POINTS.USERS,
        userId: id,
      }),
  });

  const listUserDetail = res?.data || [];

  const isNameMatchWith = (target: string): boolean =>
    (target || '').trim().toLowerCase().includes(searchName);

  const filterDataUser = listUserDetail.filter(({ firstName, lastName }) =>
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
    mutationFn: ({
      urlEndpoint = '',
      ...user
    }: Partial<
      TUserDetail & { memberId: string; userId: string; urlEndpoint: string }
    >) =>
      mainHttpService.put<TUserDetail>({
        path: urlEndpoint,
        data: user,
      }),
    onSuccess: (_, variables) => {
      queryClient.setQueryData(
        [END_POINTS.USERS, querySearch],
        (oldData: { data: TUserDetail[] }) => {
          const updatedData = oldData.data.map((item) =>
            item._id === variables.memberId
              ? { ...item, isBlock: !item.isBlock }
              : item,
          );

          return { ...oldData, data: updatedData };
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
