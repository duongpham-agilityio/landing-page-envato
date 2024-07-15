// Services
import { getMyWallet, mainHttpServiceWithFetch } from '@/lib/services';

// Mocks
import { MOCK_USER_DETAIL, WALLET_MOCK } from '@/lib/mocks';

describe('My wallet service', () => {
  it('should get my wallet successfully', async () => {
    jest
      .spyOn(mainHttpServiceWithFetch, 'getRequest')
      .mockResolvedValue(WALLET_MOCK[0]);

    const res = await getMyWallet(MOCK_USER_DETAIL.id);

    waitFor(() => expect(res.currentWalletMoney).toEqual(WALLET_MOCK[0]));
  });
});
