// Libs
import { renderHook } from '@testing-library/react';

// Hooks
import { useNotification } from '@/lib/hooks';

// Services
import { mainHttpService } from '@/lib/services';

// Utils
import { queryProviderWrapper } from '@/lib/utils';

// Mocks
import {
  MOCK_NOTIFICATION_PAYLOAD,
  MOCK_NOTIFICATIONS_SUCCESS_RES,
  MOCK_UPDATE_SUCCESS_RES,
  NOTIFICATION,
} from '@/lib/mocks';

describe('useNotification', () => {
  beforeEach(() => {
    jest
      .spyOn(mainHttpService, 'get')
      .mockResolvedValue(MOCK_NOTIFICATIONS_SUCCESS_RES);
  });

  afterEach(() => jest.clearAllMocks());

  it('should fetch notification data successfully', async () => {
    const { result } = renderHook(() => useNotification(), {
      wrapper: queryProviderWrapper,
    });

    await waitFor(() => expect(result.current.data).toEqual(NOTIFICATION));
  });

  it('delete a notification successfully', async () => {
    const expectedData = NOTIFICATION.slice(1);

    jest
      .spyOn(mainHttpService, 'delete')
      .mockResolvedValue(MOCK_UPDATE_SUCCESS_RES);

    const { result } = renderHook(() => useNotification(), {
      wrapper: queryProviderWrapper,
    });

    result.current.deleteNotification(MOCK_NOTIFICATION_PAYLOAD);

    await waitFor(() => expect(result.current.isSuccess).toEqual(true));
    expect(result.current.data).toEqual(expectedData);
  });

  it('updates a notification successfully that item have in cache', async () => {
    const expectedData = [...NOTIFICATION];
    expectedData[0].isMarkAsRead = true;

    jest
      .spyOn(mainHttpService, 'put')
      .mockResolvedValue(MOCK_UPDATE_SUCCESS_RES);

    const { result } = renderHook(() => useNotification(), {
      wrapper: queryProviderWrapper,
    });

    result.current.updateNotification({
      ...MOCK_NOTIFICATION_PAYLOAD,
      isMarkAsRead: true,
    });

    await waitFor(() => expect(result.current.isSuccess).toEqual(true));
    expect(result.current.data).toEqual(expectedData);
  });
});
