import { renderHook } from '@testing-library/react';
import { AxiosResponse } from 'axios';

// Hooks
import { usePinCode } from '@/lib/hooks';

// Services
import { mainHttpService } from '@/lib/services';

describe('usePinCode test cases', () => {
  const {
    result: {
      current: { handleSetPinCode, handleConfirmPinCode },
    },
  } = renderHook(() => usePinCode());

  const mockUserId = '659503bde290b7f5d3a0654f';
  const mockPinCode = '1239';
  const mockResponseSuccess = 'success';
  const mockResponseError = '';

  it('should handle submit pin code', async () => {
    jest.spyOn(mainHttpService, 'post').mockResolvedValue({
      data: {
        message: mockResponseSuccess,
      },
    } as AxiosResponse);

    const mockData = {
      pinCode: mockPinCode,
      userId: mockUserId,
    };

    const response = await handleSetPinCode(mockData);

    expect(response.data.message).toStrictEqual(mockResponseSuccess);
  });

  it('should handle confirm pin code', async () => {
    jest.spyOn(mainHttpService, 'post').mockResolvedValue({
      data: {
        message: mockResponseSuccess,
      },
    } as AxiosResponse);

    const mockData = {
      pinCode: mockPinCode,
      userId: mockUserId,
    };

    const response = await handleConfirmPinCode(mockData);

    expect(response.data.message).toStrictEqual(mockResponseSuccess);
  });

  it('should handle error when setting pin code', async () => {
    jest.spyOn(mainHttpService, 'post').mockRejectedValue({
      data: {
        message: mockResponseError,
      },
    } as AxiosResponse);

    const mockData = {
      pinCode: mockPinCode,
      userId: mockUserId,
    };

    try {
      await handleSetPinCode(mockData);
    } catch (error) {
      const { message } = error as Error;
      expect(message).toStrictEqual(mockResponseError);
    }
  });

  it('should handle error when confirming pin code', async () => {
    jest.spyOn(mainHttpService, 'post').mockRejectedValue({
      data: {
        message: mockResponseError,
      },
    } as AxiosResponse);

    const mockData = {
      pinCode: mockPinCode,
      userId: mockUserId,
    };

    try {
      await handleConfirmPinCode(mockData);
    } catch (error) {
      const { message } = error as Error;
      expect(message).toStrictEqual(mockResponseError);
    }
  });
});
