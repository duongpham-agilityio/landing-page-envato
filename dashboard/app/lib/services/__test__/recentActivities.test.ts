// Services
import { addRecentActivity, mainHttpServiceWithFetch } from '@/lib/services';

// Mocks
import { MOCK_UPDATE_SUCCESS_RES, MOCK_USER_DETAIL } from '@/lib/mocks';

// Types
import { EActivity } from '@/lib/interfaces';

describe('Recent Activities service', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('Should add recent activity successfully', async () => {
    jest
      .spyOn(mainHttpServiceWithFetch, 'postRequest')
      .mockResolvedValue(MOCK_UPDATE_SUCCESS_RES);

    const res = await addRecentActivity(
      EActivity.CREATE_PIN_CODE,
      MOCK_USER_DETAIL.id,
    );

    waitFor(() => expect(res).toEqual(MOCK_UPDATE_SUCCESS_RES.data));
  });
});
