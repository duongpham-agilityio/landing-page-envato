import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { act, renderHook, waitFor } from '@testing-library/react';
import { ReactNode } from 'react';

// Hooks
import {
  useCreateIssues,
  useGetListIssues,
  useGetUserDetails,
  useUpdatePassword,
  useUpdateUser,
} from '@/lib/hooks';

// Interfaces
import { TUserDetail } from '@/lib/interfaces';

// Services
import * as services from '@/lib/services';

import { mainHttpService } from '@/lib/services';
import {
  RESULT_LIST_USER,
  RESULT_LIST_USER_EXPECT,
  USER_DETAIL_MOCK,
} from '@/lib/mocks';

const queryClient = new QueryClient();

const data: TUserDetail = {
  address: 'address',
  city: 'Jakarta',
  country: 'Indonesia',
  createdAt: 0,
  email: 'test@gmail.com',
  firstName: 'Abdur',
  id: '1',
  lastName: 'Rohman',
  password: 'test@123',
  phoneNumber: '123123',
  postalCode: '154353',
  isBlock: true,
  uid: '1',
};

jest.mock('@/lib/services');

const wrapper = ({ children }: { children: ReactNode }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

describe('useUpdateUser', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('update user successfully', async () => {
    const { result } = renderHook(() => useUpdateUser(), { wrapper });

    act(() => {
      result.current.mutate(data);
    });

    await waitFor(() => result.current.isSuccess);

    expect(result.current.isSuccess).toBe(true);
  });

  it('update user failed', async () => {
    const { result } = renderHook(() => useUpdateUser(), { wrapper });
    jest.spyOn(mainHttpService, 'put').mockRejectedValue(new Error('error'));

    act(() => {
      result.current.mutate(data);
    });

    await waitFor(() => result.current.isError);

    expect(result.current.isError).toBe(true);
  });

  it('successfully updates the password', async () => {
    const mockData = {
      oldPassword: 'old123',
      newPassword: 'new123',
      memberId: '123',
    };
    const mockPut = jest.fn();
    mockPut.mockResolvedValueOnce({ data: 'Success' });

    const { result } = renderHook(() => useUpdatePassword(), { wrapper });

    act(() => {
      result.current.mutate(mockData);
    });

    expect(result.current.error).toBe('');
  });

  it('calls useMutation with the correct parameters', () => {
    const mockData = {
      userId: '12',
      firstName: 'John',
      lastName: 'Does',
      email: 'test@gmail.com',
      phone: '0121234242',
      title: 'test title',
      description: 'test description',
    };

    const { result } = renderHook(() => useCreateIssues(), { wrapper });

    act(() => {
      result.current.mutate(mockData);
    });

    expect(result.current.error).toBe('');
  });

  it('calls useQuery with the correct parameters', () => {
    const getAllUserDetailsExceptWithIdSpy = jest.spyOn(
      services,
      'getAllUserDetailsExceptWithId',
    );
    getAllUserDetailsExceptWithIdSpy.mockResolvedValue(USER_DETAIL_MOCK);

    const { result } = renderHook(
      () => useGetUserDetails('12345', { name: '' }),
      { wrapper },
    );

    expect(result.current.isLoading).toBe(true);
  });

  test('Should return data when call useFetchProductDetail success', async () => {
    jest.spyOn(services, 'getSupports').mockResolvedValue(RESULT_LIST_USER);
    const { result } = renderHook(() => useGetListIssues(), { wrapper });

    await waitFor(() => {
      expect(result.current.data).toEqual(RESULT_LIST_USER_EXPECT);
      expect(result.current.isSuccess).toEqual(true);
    });
  });
});
