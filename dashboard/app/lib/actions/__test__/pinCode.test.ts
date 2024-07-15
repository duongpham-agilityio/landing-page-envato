// Actions
import { confirmPinCode, setPinCode } from '@/lib/actions';

// Services
import { addRecentActivity, mainHttpServiceWithFetch } from '@/lib/services';

// Mocks
import {
  MOCK_FAILED_RES,
  MOCK_PIN_CODE_PAYLOAD,
  MOCK_UPDATE_SUCCESS_RES,
} from '@/lib/mocks';

// Constants
import { ERROR_MESSAGES } from '@/lib/constants';

jest.mock('@/lib/services', () => ({
  addRecentActivity: jest.fn(),
  mainHttpServiceWithFetch: {
    postRequest: jest.fn(),
  },
}));

describe('Pin Code action', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('Should confirm pin code successfully', async () => {
    jest
      .spyOn(mainHttpServiceWithFetch, 'postRequest')
      .mockResolvedValue(MOCK_UPDATE_SUCCESS_RES);
    (
      addRecentActivity as jest.MockedFunction<typeof addRecentActivity>
    ).mockResolvedValue(MOCK_UPDATE_SUCCESS_RES.data);

    const res = await confirmPinCode(
      MOCK_PIN_CODE_PAYLOAD.pinCode,
      MOCK_PIN_CODE_PAYLOAD.userId,
    );

    waitFor(() => expect(res?.error).toEqual(undefined));
  });

  test('Should confirm pin code failed', async () => {
    jest
      .spyOn(mainHttpServiceWithFetch, 'postRequest')
      .mockRejectedValue(MOCK_FAILED_RES);

    const res = await confirmPinCode(
      MOCK_PIN_CODE_PAYLOAD.pinCode,
      MOCK_PIN_CODE_PAYLOAD.userId,
    );

    waitFor(() => expect(res?.error).toEqual(ERROR_MESSAGES.CONFIRM_PIN_CODE));
  });

  test('Should set pin code successfully', async () => {
    jest
      .spyOn(mainHttpServiceWithFetch, 'postRequest')
      .mockResolvedValue(MOCK_UPDATE_SUCCESS_RES);
    (
      addRecentActivity as jest.MockedFunction<typeof addRecentActivity>
    ).mockResolvedValue(MOCK_UPDATE_SUCCESS_RES.data);

    const res = await setPinCode(
      MOCK_PIN_CODE_PAYLOAD.pinCode,
      MOCK_PIN_CODE_PAYLOAD.userId,
    );

    waitFor(() => expect(res?.error).toEqual(undefined));
  });

  test('Should set pin code failed', async () => {
    jest
      .spyOn(mainHttpServiceWithFetch, 'postRequest')
      .mockRejectedValue(MOCK_FAILED_RES);

    const res = await setPinCode(
      MOCK_PIN_CODE_PAYLOAD.pinCode,
      MOCK_PIN_CODE_PAYLOAD.userId,
    );

    waitFor(() => expect(res?.error).toEqual(ERROR_MESSAGES.CONFIRM_PIN_CODE));
  });
});
