// Services
import { getUserList, mainHttpServiceWithFetch } from '@/lib/services';

// Mocks
import { MOCK_USER_DETAIL, MOCK_USERS } from '@/lib/mocks';

describe('Users service', () => {
  it('should fetch user list successfully', async () => {
    jest
      .spyOn(mainHttpServiceWithFetch, 'getRequest')
      .mockResolvedValue(MOCK_USERS);

    const res = await getUserList(MOCK_USER_DETAIL.id);

    waitFor(() => expect(res.data).toEqual(MOCK_USERS));
  });

  it('should fetch user list with returned null value', async () => {
    jest.spyOn(mainHttpServiceWithFetch, 'getRequest').mockResolvedValue(null);

    const res = await getUserList(MOCK_USER_DETAIL.id);

    waitFor(() => {
      expect(res.data).toEqual([]);
    });
  });
});
