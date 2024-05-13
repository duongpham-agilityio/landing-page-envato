import { act, renderHook, waitFor } from '@testing-library/react';

// Hooks
import {
  useCreateIssues,
  useGetListIssues,
  useGetUserDetails,
  useManagementUser,
  useUpdatePassword,
  useUpdateUser,
} from '@/lib/hooks';

// Utils
import { queryProviderWrapper } from '@/lib/utils';

// Services

import { mainHttpService } from '@/lib/services';

// Mocks
import {
  MOCK_CREATE_ISSUE_PAYLOAD,
  MOCK_ISSUES_RES,
  MOCK_UPDATE_PASSWORD_PAYLOAD,
  MOCK_UPDATE_SUCCESS_RES,
  MOCK_UPDATE_USER_PAYLOAD,
  MOCK_USER_DETAILS_RES,
  USERS_MOCK,
} from '@/lib/mocks';

describe('useUpdateUser', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('update user successfully', async () => {
    jest
      .spyOn(mainHttpService, 'put')
      .mockResolvedValue(MOCK_UPDATE_SUCCESS_RES);

    const { result } = renderHook(() => useUpdateUser(), {
      wrapper: queryProviderWrapper,
    });

    act(() => {
      result.current.mutate(MOCK_UPDATE_USER_PAYLOAD);
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
  });

  it('update password successfully', async () => {
    jest
      .spyOn(mainHttpService, 'put')
      .mockResolvedValue(MOCK_UPDATE_SUCCESS_RES);

    const { result } = renderHook(() => useUpdatePassword(), {
      wrapper: queryProviderWrapper,
    });

    act(() => {
      result.current.mutate(MOCK_UPDATE_PASSWORD_PAYLOAD);
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
  });

  it('creating issues successfully', async () => {
    jest
      .spyOn(mainHttpService, 'post')
      .mockResolvedValue(MOCK_UPDATE_SUCCESS_RES);

    const { result } = renderHook(() => useCreateIssues(), {
      wrapper: queryProviderWrapper,
    });

    act(() => {
      result.current.mutate(MOCK_CREATE_ISSUE_PAYLOAD);
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
  });

  it('Should get user details successfully', async () => {
    jest.spyOn(mainHttpService, 'get').mockResolvedValue(MOCK_USER_DETAILS_RES);

    const { result } = renderHook(() => useGetUserDetails('12345'), {
      wrapper: queryProviderWrapper,
    });

    await waitFor(() => {
      expect(result.current.isSuccess).toEqual(true);
    });
  });

  test('Should get list issues successfully', async () => {
    jest.spyOn(mainHttpService, 'get').mockResolvedValue(MOCK_ISSUES_RES);
    const { result } = renderHook(() => useGetListIssues(), {
      wrapper: queryProviderWrapper,
    });

    await waitFor(() => {
      expect(result.current.isSuccess).toEqual(true);
    });
  });

  test('Should lock user successfully', async () => {
    jest
      .spyOn(mainHttpService, 'put')
      .mockResolvedValue(MOCK_UPDATE_SUCCESS_RES);

    const { result } = renderHook(() => useManagementUser(), {
      wrapper: queryProviderWrapper,
    });

    act(() => {
      result.current.managementUser({ userId: USERS_MOCK[0].id });
    });

    await waitFor(() => {
      expect(result.current.isSuccess).toEqual(false);
    });
  });
});
