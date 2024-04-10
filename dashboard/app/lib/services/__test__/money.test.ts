import { AxiosResponse } from 'axios';

// Services
import {
  addMoneyToUser,
  moneyHttpRequest,
  sendMoneyToUser,
} from '@/lib/services';

// interface
import { EActivity } from '@/lib/interfaces';


describe('addMoneyToUser service', () => {
  it('addMoneyToUser (resolve)', async () => {
    const mockData = {
      data: {
        message: 'add money success',
      },
    };
    jest
      .spyOn(moneyHttpRequest, 'put')
      .mockResolvedValue({ data: mockData });

    const data = await addMoneyToUser(EActivity.ADD_MONEY, { amount: 10, userId: '1' });

    expect(data).toEqual(mockData);
  });

  it('addMoneyToUser (reject)', async () => {
    try {
      jest.spyOn(moneyHttpRequest, 'put').mockRejectedValue({
        isError: true,
      });

      await addMoneyToUser(EActivity.ADD_MONEY, { amount: 10, userId: '1' });
    } catch (error) {

      expect(error).toBeTruthy();
    }
  });
});

describe('sendMoneyToUser service', () => {
  it('sendMoneyToUser (resolve)', async () => {
    const mockData = {
      data: {
        message: 'send money success',
      },
    };
    jest
      .spyOn(moneyHttpRequest, 'put')
      .mockResolvedValue({ data: mockData } as AxiosResponse);

    const data = await sendMoneyToUser(EActivity.SEND_MONEY, {
      amount: 10,
      userId: '1',
      memberId: '2',
    });

    expect(data).toEqual(mockData);
  });

  it('sendMoneyToUser (reject)', async () => {
    try {
      jest.spyOn(moneyHttpRequest, 'put').mockRejectedValue({
        isError: true,
      });

      await sendMoneyToUser(EActivity.SEND_MONEY, { amount: 10, userId: '1', memberId: '2' });
    } catch (error) {

      expect(error).toBeTruthy();
    }
  });
});
