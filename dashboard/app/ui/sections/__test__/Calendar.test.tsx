// Libs
import { screen } from '@testing-library/react';

// Utils
import { customToast, renderQueryProviderTest } from '@/lib/utils';

// Constants
import { ERROR_MESSAGES, STATUS, SUCCESS_MESSAGES } from '@/lib/constants';

// Mocks
import {
  MOCK_CALENDAR_NOW_DATE,
  MOCK_EVENTS,
  MOCK_UPDATE_EVENT_FORM,
} from '@/lib/mocks';

// Sections
import { Calendar } from '@/ui/sections';

const mockAddEvent = jest.fn();
const mockUpdateEvent = jest.fn();
const mockDeleteEvent = jest.fn();

jest.mock('@/lib/hooks', () => ({
  ...jest.requireActual('@/lib/hooks'),
  useEvents: () => ({
    isLoading: false,
    data: MOCK_EVENTS,
    isAddEvent: false,
    addEvent: mockAddEvent,
    isUpdateEvent: false,
    updateEvent: mockUpdateEvent,
    isDeleteEvent: false,
    deleteEvent: mockDeleteEvent,
  }),
}));

jest.mock('@/lib/utils', () => ({
  ...jest.requireActual('@/lib/utils'),
  customToast: jest.fn(),
}));

describe('Calendar section', () => {
  beforeEach(() => {
    jest.useFakeTimers({ now: MOCK_CALENDAR_NOW_DATE });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('Should render match with snapshot.', () => {
    const { container } = renderQueryProviderTest(<Calendar />);

    expect(container).toMatchSnapshot();
  });

  it('Should handle updating event successfully', async () => {
    mockUpdateEvent.mockImplementationOnce((_, { onSuccess }) => onSuccess());

    await act(async () => {
      renderQueryProviderTest(<Calendar />);
    });

    // Click event to open the event details modal
    await act(async () => {
      fireEvent.click(screen.getByText(MOCK_EVENTS[0].eventName));
    });

    // Click Edit icon to open the Edit Event form modal
    await act(async () => {
      fireEvent.click(screen.getByTestId('edit-icon'));
    });

    // Update Event
    await act(async () => {
      fireEvent.change(screen.getByLabelText('Title'), {
        target: { value: MOCK_UPDATE_EVENT_FORM.title },
      });
      fireEvent.click(screen.getByRole('button', { name: 'Save' }));
    });

    await waitFor(() => {
      expect(customToast).toHaveBeenCalledWith(
        SUCCESS_MESSAGES.UPDATE_EVENT_SUCCESS.title,
        SUCCESS_MESSAGES.UPDATE_EVENT_SUCCESS.description,
        STATUS.SUCCESS,
      );
    });
  });

  it('Should handle updating event failed', async () => {
    mockUpdateEvent.mockImplementationOnce((_, { onError }) => onError());

    await act(async () => {
      renderQueryProviderTest(<Calendar />);
    });

    // Click event to open the event details modal
    await act(async () => {
      fireEvent.click(screen.getByText(MOCK_EVENTS[0].eventName));
    });

    // Click Edit icon to open the Edit Event form modal
    await act(async () => {
      fireEvent.click(screen.getByTestId('edit-icon'));
    });

    // Update Event
    await act(async () => {
      fireEvent.change(screen.getByLabelText('Title'), {
        target: { value: MOCK_UPDATE_EVENT_FORM.title },
      });
      fireEvent.click(screen.getByRole('button', { name: 'Save' }));
    });

    await waitFor(() => {
      expect(customToast).toHaveBeenCalledWith(
        ERROR_MESSAGES.UPDATE_EVENT_FAIL.title,
        ERROR_MESSAGES.UPDATE_EVENT_FAIL.description,
        STATUS.ERROR,
      );
    });
  });

  it('Should delete event successfully', async () => {
    mockDeleteEvent.mockImplementationOnce((_, { onSuccess }) => onSuccess());

    await act(async () => {
      renderQueryProviderTest(<Calendar />);
    });

    // Click event to open the event details modal
    await act(async () => {
      fireEvent.click(screen.getByText(MOCK_EVENTS[0].eventName));
    });

    // Click Delete icon to open the confirm delete modal
    await act(async () => {
      fireEvent.click(screen.getByTestId('delete-icon'));
    });

    // Click Delete button on the confirm delete modal
    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: 'Delete' }));
    });

    await waitFor(() => {
      expect(customToast).toHaveBeenCalledWith(
        SUCCESS_MESSAGES.DELETE_EVENT_SUCCESS.title,
        SUCCESS_MESSAGES.DELETE_EVENT_SUCCESS.description,
        STATUS.SUCCESS,
      );
    });
  });

  it('Should delete event failed', async () => {
    mockDeleteEvent.mockImplementationOnce((_, { onError }) => onError());

    await act(async () => {
      renderQueryProviderTest(<Calendar />);
    });

    // Click event to open the event details modal
    await act(async () => {
      fireEvent.click(screen.getByText(MOCK_EVENTS[0].eventName));
    });

    // Click Delete icon to open the confirm delete modal
    await act(async () => {
      fireEvent.click(screen.getByTestId('delete-icon'));
    });

    // Click Delete button on the confirm delete modal
    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: 'Delete' }));
    });

    await waitFor(() => {
      expect(customToast).toHaveBeenCalledWith(
        ERROR_MESSAGES.DELETE_EVENT_FAIL.title,
        ERROR_MESSAGES.DELETE_EVENT_FAIL.description,
        STATUS.ERROR,
      );
    });
  });
});
