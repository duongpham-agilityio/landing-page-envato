import axios from 'axios';
import { useSearchParams, useRouter } from 'next/navigation';

// Hooks
import * as hooks from '@/lib/hooks';

// Providers
import { QueryProvider } from '@/ui/providers';

// Sections
import { UsersSection } from '@/ui/sections';

// Mocks
import { MOCK_USERS } from '@/lib/mocks';

// Types
import { Status } from '@/lib/interfaces';
import { DEBOUNCE_TIME, END_POINTS } from '@/lib/constants';

jest.mock('@/lib/hooks', () => ({
  ...jest.requireActual('@/lib/hooks'),
  usePagination: jest.fn(),
  useGetUserDetails: jest.fn(),
  useManagementUser: jest.fn(),
}));

const TABLE_ROW = 'table-row';
const STATUS_QUERY = '[data-testid="status"]';
const DOT_ICON = '[data-testid="dot-icon"]';
const LOCK_ICON = '[data-testid="lock-unlock-icon"]';
const STATUS = {
  [Status.LOCK]: true,
  [Status.UNLOCK]: false,
};

const managementUserMock = jest.fn();
const resetMock = jest.fn();

const setup = () => {
  jest.spyOn(hooks, 'usePagination').mockReturnValue({
    filterData: [...MOCK_USERS, { ...MOCK_USERS[0], isBlock: true, _id: '2' }],
    data: [1],
    resetPage: resetMock,
  } as unknown as ReturnType<typeof hooks.usePagination>);

  jest.spyOn(hooks, 'useGetUserDetails').mockReturnValue({
    isLoadingUser: false,
  } as unknown as ReturnType<typeof hooks.useGetUserDetails>);

  jest.spyOn(hooks, 'useManagementUser').mockReturnValue({
    managementUser: managementUserMock,
  } as unknown as ReturnType<typeof hooks.useManagementUser>);

  return render(<UsersSection />, {
    wrapper: QueryProvider,
  });
};

jest.useFakeTimers();
describe('UsersSection render', () => {
  beforeEach(() => {
    (useSearchParams as jest.Mock).mockReturnValue({
      get: jest.fn(),
      forEach: jest.fn(),
    });
    (useRouter as jest.Mock).mockReturnValue({
      push: jest.fn(),
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('Should render match with snapshot.', () => {
    const { container } = setup();

    expect(container).toMatchSnapshot();
  });

  test('Typing input search', async () => {
    const { getByPlaceholderText } = setup();
    const input = getByPlaceholderText('Search by name') as HTMLInputElement;

    await act(async () => {
      fireEvent.change(input, {
        target: {
          value: '123',
        },
      });
    });

    jest.advanceTimersByTime(DEBOUNCE_TIME);
    expect(resetMock).toHaveBeenCalled();
  });

  test('Lock user success', async () => {
    jest
      .spyOn(axios, 'put')
      .mockResolvedValue({ ...MOCK_USERS[0], isBlock: true });

    const { getAllByTestId } = setup();

    const row = getAllByTestId(TABLE_ROW)[0];
    const dotBtn = row.querySelector(DOT_ICON);

    if (dotBtn) {
      fireEvent.click(dotBtn);

      await waitFor(async () => {
        const lockIcon = row.querySelector(LOCK_ICON);

        if (lockIcon) {
          fireEvent.click(lockIcon);

          expect(managementUserMock).toHaveBeenCalledWith(
            {
              urlEndpoint: END_POINTS.LOCK,
              userId: undefined,
              memberId: '1',
            },
            expect.objectContaining({
              onSuccess: expect.any(Function),
              onError: expect.any(Function),
            }),
          );

          managementUserMock.mock.calls[0][1].onSuccess();
        }
      });
    }
  });

  test('Lock user failed', async () => {
    jest
      .spyOn(axios, 'put')
      .mockRejectedValue({ ...MOCK_USERS[0], isBlock: true });

    const { getAllByTestId } = setup();
    const getTextStatus = (status: Element | null) =>
      status ? status.textContent?.trim() ?? '' : '';

    const row = getAllByTestId(TABLE_ROW)[0];
    const status = row.querySelector(STATUS_QUERY);
    const dotBtn = row.querySelector(DOT_ICON);
    const statusText: string = getTextStatus(status);
    // const currentStatus: boolean =
    STATUS[statusText as unknown as keyof typeof STATUS];

    if (dotBtn) {
      fireEvent.click(dotBtn);

      await waitFor(async () => {
        const lockIcon = row.querySelector(LOCK_ICON);

        if (lockIcon) {
          fireEvent.click(lockIcon);

          expect(managementUserMock).toHaveBeenCalledWith(
            {
              urlEndpoint: END_POINTS.LOCK,
              userId: undefined,
              memberId: '1',
            },
            expect.objectContaining({
              onSuccess: expect.any(Function),
              onError: expect.any(Function),
            }),
          );

          managementUserMock.mock.calls[1][1].onError();
        }
      });
    }
  });

  test('Unblock user success', async () => {
    jest
      .spyOn(axios, 'put')
      .mockResolvedValue({ ...MOCK_USERS[0], isBlock: true });
    const { getAllByTestId } = setup();
    const getTextStatus = (status: Element | null) =>
      status ? status.textContent?.trim() ?? '' : '';

    const row = getAllByTestId(TABLE_ROW)[1];
    const status = row.querySelector(STATUS_QUERY);
    const dotBtn = row.querySelector(DOT_ICON);
    const statusText: string = getTextStatus(status);
    // const currentStatus: boolean =
    STATUS[statusText as unknown as keyof typeof STATUS];

    if (dotBtn) {
      fireEvent.click(dotBtn);

      await waitFor(async () => {
        const lockIcon = row.querySelector(LOCK_ICON);

        if (lockIcon) {
          fireEvent.click(lockIcon);

          expect(managementUserMock).toHaveBeenCalledWith(
            {
              urlEndpoint: END_POINTS.UNLOCK,
              userId: undefined,
              memberId: '2',
            },
            expect.objectContaining({
              onSuccess: expect.any(Function),
              onError: expect.any(Function),
            }),
          );

          managementUserMock.mock.calls[2][1].onSuccess();
        }
      });
    }
  });

  test('Unblock user failed', async () => {
    jest
      .spyOn(axios, 'put')
      .mockRejectedValue({ ...MOCK_USERS[0], isBlock: true });
    const { getAllByTestId } = setup();
    const getTextStatus = (status: Element | null) =>
      status ? status.textContent?.trim() ?? '' : '';

    const row = getAllByTestId(TABLE_ROW)[1];
    const status = row.querySelector(STATUS_QUERY);
    const dotBtn = row.querySelector(DOT_ICON);
    const statusText: string = getTextStatus(status);
    // const currentStatus: boolean =
    STATUS[statusText as unknown as keyof typeof STATUS];

    if (dotBtn) {
      fireEvent.click(dotBtn);

      await waitFor(async () => {
        const lockIcon = row.querySelector(LOCK_ICON);

        if (lockIcon) {
          fireEvent.click(lockIcon);

          expect(managementUserMock).toHaveBeenCalledWith(
            {
              urlEndpoint: END_POINTS.UNLOCK,
              userId: undefined,
              memberId: '2',
            },
            expect.objectContaining({
              onSuccess: expect.any(Function),
              onError: expect.any(Function),
            }),
          );

          managementUserMock.mock.calls[3][1].onError();
        }
      });
    }
  });
});
