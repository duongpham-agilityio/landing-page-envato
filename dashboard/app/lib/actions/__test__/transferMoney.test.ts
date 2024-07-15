// Actions
import { sendMoney } from '@/lib/actions';

// Services
import { mainHttpServiceWithFetch } from '@/lib/services';

// Mocks
import {
  MOCK_FAILED_RES,
  MOCK_TRANSFER_MONEY_PAYLOAD,
  MOCK_UPDATE_SUCCESS_RES,
  MOCK_USER_DETAIL,
} from '@/lib/mocks';

// Constants
import { ERROR_MESSAGES } from '@/lib/constants';

describe('Transfer money action', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('Should send money successfully', async () => {
    const mockSendMoneyPayload = {
      ...MOCK_TRANSFER_MONEY_PAYLOAD,
      memberId: MOCK_USER_DETAIL.id,
    };

    jest
      .spyOn(mainHttpServiceWithFetch, 'putRequest')
      .mockResolvedValue(MOCK_UPDATE_SUCCESS_RES);

    const res = await sendMoney(mockSendMoneyPayload);

    waitFor(() => expect(res?.error).toEqual(undefined));
  });

  test('Should send money failed', async () => {
    const mockSendMoneyPayload = {
      ...MOCK_TRANSFER_MONEY_PAYLOAD,
      memberId: MOCK_USER_DETAIL.id,
    };

    jest
      .spyOn(mainHttpServiceWithFetch, 'putRequest')
      .mockRejectedValue(MOCK_FAILED_RES);

    const res = await sendMoney(mockSendMoneyPayload);

    waitFor(() => expect(res?.error).toEqual(ERROR_MESSAGES.SEND_MONEY));
  });
});
