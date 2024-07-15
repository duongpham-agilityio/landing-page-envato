// Libs
import { cookies } from 'next/headers';

// Actions
import { deleteEvent, updateEvent, addEvent } from '@/lib/actions';

// Services
import { addRecentActivity, mainHttpServiceWithFetch } from '@/lib/services';

// Mocks
import {
  MOCK_ADD_EVENT_FAILED_RES,
  MOCK_ADD_EVENT_PAYLOAD,
  MOCK_ADD_EVENT_SUCCESS_RES,
  MOCK_DELETE_EVENT_FAILED_RES,
  MOCK_DELETE_EVENT_SUCCESS_RES,
  MOCK_EVENTS,
  MOCK_UPDATE_EVENT_FAILED_RES,
  MOCK_UPDATE_EVENT_PAYLOAD,
  MOCK_UPDATE_SUCCESS_RES,
  MOCK_USER_DETAIL,
} from '@/lib/mocks';

// Constants
import { ERROR_MESSAGES, QUERY_TAGS } from '@/lib/constants';

const mockRevalidateTag = jest.fn();

jest.mock('next/headers', () => ({
  cookies: jest.fn(() => ({
    get: jest.fn(),
  })),
}));

jest.mock('@/lib/services', () => ({
  addRecentActivity: jest.fn(),
  mainHttpServiceWithFetch: {
    postRequest: jest.fn(),
    putRequest: jest.fn(),
    deleteRequest: jest.fn(),
  },
}));

describe('Events action', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('Should add event successfully', async () => {
    (cookies().get as jest.Mock).mockReturnValue({
      value: MOCK_USER_DETAIL.id,
    });

    jest
      .spyOn(mainHttpServiceWithFetch, 'postRequest')
      .mockResolvedValue(MOCK_ADD_EVENT_SUCCESS_RES);
    (
      addRecentActivity as jest.MockedFunction<typeof addRecentActivity>
    ).mockResolvedValue(MOCK_UPDATE_SUCCESS_RES.data);

    await addEvent(MOCK_ADD_EVENT_PAYLOAD);

    waitFor(() =>
      expect(mockRevalidateTag).toHaveBeenCalledWith(QUERY_TAGS.EVENTS),
    );
  });

  test('Should add event failed', async () => {
    (cookies().get as jest.Mock).mockReturnValue({ value: null });

    jest
      .spyOn(mainHttpServiceWithFetch, 'postRequest')
      .mockRejectedValue(MOCK_ADD_EVENT_FAILED_RES);

    const res = await addEvent(MOCK_ADD_EVENT_PAYLOAD);

    waitFor(() => expect(res?.error).toEqual(ERROR_MESSAGES.CREATE_EVENT_FAIL));
  });

  test('Should update event successfully', async () => {
    (cookies().get as jest.Mock).mockReturnValue({
      value: MOCK_USER_DETAIL.id,
    });

    jest
      .spyOn(mainHttpServiceWithFetch, 'putRequest')
      .mockResolvedValue(MOCK_UPDATE_SUCCESS_RES);

    (
      addRecentActivity as jest.MockedFunction<typeof addRecentActivity>
    ).mockResolvedValue(MOCK_UPDATE_SUCCESS_RES.data);

    await addEvent(MOCK_UPDATE_EVENT_PAYLOAD);

    waitFor(() =>
      expect(mockRevalidateTag).toHaveBeenCalledWith(QUERY_TAGS.EVENTS),
    );
  });

  test('Should update event failed', async () => {
    (cookies().get as jest.Mock).mockReturnValue({ value: null });

    jest
      .spyOn(mainHttpServiceWithFetch, 'putRequest')
      .mockResolvedValue(MOCK_UPDATE_EVENT_FAILED_RES);

    const res = await updateEvent(MOCK_UPDATE_EVENT_PAYLOAD);

    waitFor(() => expect(res?.error).toEqual(ERROR_MESSAGES.UPDATE_EVENT_FAIL));
  });

  test('Should delete event successfully', async () => {
    (cookies().get as jest.Mock).mockReturnValue({
      value: MOCK_USER_DETAIL.id,
    });

    jest
      .spyOn(mainHttpServiceWithFetch, 'deleteRequest')
      .mockResolvedValue(MOCK_DELETE_EVENT_SUCCESS_RES);

    (
      addRecentActivity as jest.MockedFunction<typeof addRecentActivity>
    ).mockResolvedValue(MOCK_UPDATE_SUCCESS_RES.data);

    await deleteEvent(MOCK_EVENTS[1]._id);

    waitFor(() =>
      expect(mockRevalidateTag).toHaveBeenCalledWith(QUERY_TAGS.EVENTS),
    );
  });

  test('Should delete event failed', async () => {
    (cookies().get as jest.Mock).mockReturnValue({ value: null });

    jest
      .spyOn(mainHttpServiceWithFetch, 'deleteRequest')
      .mockResolvedValue(MOCK_DELETE_EVENT_FAILED_RES);

    const res = await deleteEvent(MOCK_EVENTS[1]._id);

    waitFor(() => expect(res?.error).toEqual(ERROR_MESSAGES.DELETE_EVENT_FAIL));
  });
});
