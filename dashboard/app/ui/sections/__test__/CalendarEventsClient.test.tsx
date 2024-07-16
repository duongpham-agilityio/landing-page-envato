// Libs
import { render, waitFor, fireEvent, screen } from '@testing-library/react';

// Sections
import CalendarEventsClient from '@/ui/sections/Calendar/CalendarEvents/CalendarEventsClient';

// Mocks
import {
  MOCK_CALENDAR_NOW_DATE,
  MOCK_FORMATTED_EVENTS_RES,
  MOCK_UPDATE_EVENT_FORM,
} from '@/lib/mocks';

// Constants
import { ERROR_MESSAGES, STATUS, SUCCESS_MESSAGES } from '@/lib/constants';

// Types
import { TEvent } from '@/lib/interfaces';

jest.mock('@/lib/utils', () => ({
  ...jest.requireActual('@/lib/utils'),
  customToast: jest.fn(),
}));

jest.mock('@/lib/actions');

// Actions
import * as actions from '@/lib/actions';

// Utils
import { customToast } from '@/lib/utils';

describe('CalendarEventsClient section', () => {
  const mockProps = {
    events: MOCK_FORMATTED_EVENTS_RES as unknown as (Event &
      TEvent & { userId: string })[],
  };

  const addEvent = async () => {
    await act(async () => {
      fireEvent.click(screen.getByText(MOCK_FORMATTED_EVENTS_RES[0].title));
    });

    await act(async () => {
      fireEvent.click(screen.getByTestId('edit-icon'));
    });

    await act(async () => {
      fireEvent.change(screen.getByLabelText('Title'), {
        target: { value: MOCK_UPDATE_EVENT_FORM.title },
      });
      fireEvent.click(screen.getByRole('button', { name: 'Save' }));
    });
  };

  const updateEvent = async () => {
    // Click event to open the event details modal
    await act(async () => {
      fireEvent.click(screen.getByText(MOCK_FORMATTED_EVENTS_RES[1].title));
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
  };

  const deleteEvent = async () => {
    // Click event to open the event details modal
    await act(async () => {
      fireEvent.click(screen.getByText(MOCK_FORMATTED_EVENTS_RES[1].title));
    });

    // Click Delete icon to open the confirm delete modal
    await act(async () => {
      fireEvent.click(screen.getByTestId('delete-icon'));
    });

    // Click Delete button on the confirm delete modal
    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: 'Delete' }));
    });
  };

  beforeEach(() => {
    jest.useFakeTimers({ now: MOCK_CALENDAR_NOW_DATE });
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.clearAllTimers();
    jest.useRealTimers();
  });

  it('Should render match with snapshot.', () => {
    const { container } = render(<CalendarEventsClient {...mockProps} />);

    expect(container).toMatchSnapshot();
  });

  it('Should add event successfully', async () => {
    jest.spyOn(actions, 'addEvent').mockResolvedValue();

    render(<CalendarEventsClient {...mockProps} />);

    await addEvent();

    await waitFor(() => {
      expect(customToast).toHaveBeenCalledWith(
        SUCCESS_MESSAGES.CREATE_EVENT_SUCCESS.title,
        SUCCESS_MESSAGES.CREATE_EVENT_SUCCESS.description,
        STATUS.SUCCESS,
      );
    });
  });

  it('Should add event failed', async () => {
    jest
      .spyOn(actions, 'addEvent')
      .mockResolvedValue({ error: ERROR_MESSAGES.CREATE_EVENT_FAIL });

    render(<CalendarEventsClient {...mockProps} />);

    await addEvent();

    await waitFor(() => {
      expect(customToast).toHaveBeenCalledWith(
        ERROR_MESSAGES.CREATE_EVENT_FAIL.title,
        ERROR_MESSAGES.CREATE_EVENT_FAIL.description,
        STATUS.ERROR,
      );
    });
  });

  it('Should update event successfully', async () => {
    jest.spyOn(actions, 'updateEvent').mockResolvedValue();

    render(<CalendarEventsClient {...mockProps} />);

    await updateEvent();

    await waitFor(() => {
      expect(customToast).toHaveBeenCalledWith(
        SUCCESS_MESSAGES.UPDATE_EVENT_SUCCESS.title,
        SUCCESS_MESSAGES.UPDATE_EVENT_SUCCESS.description,
        STATUS.SUCCESS,
      );
    });
  });

  it('Should update event failed', async () => {
    jest
      .spyOn(actions, 'updateEvent')
      .mockResolvedValue({ error: ERROR_MESSAGES.UPDATE_EVENT_FAIL });

    render(<CalendarEventsClient {...mockProps} />);

    await updateEvent();

    await waitFor(() => {
      expect(customToast).toHaveBeenCalledWith(
        ERROR_MESSAGES.UPDATE_EVENT_FAIL.title,
        ERROR_MESSAGES.UPDATE_EVENT_FAIL.description,
        STATUS.ERROR,
      );
    });
  });

  it('Should delete event successfully', async () => {
    jest.spyOn(actions, 'deleteEvent').mockResolvedValue();

    render(<CalendarEventsClient {...mockProps} />);

    await deleteEvent();

    await waitFor(() => {
      expect(customToast).toHaveBeenCalledWith(
        SUCCESS_MESSAGES.DELETE_EVENT_SUCCESS.title,
        SUCCESS_MESSAGES.DELETE_EVENT_SUCCESS.description,
        STATUS.SUCCESS,
      );
    });
  });

  it('Should delete event failed', async () => {
    jest
      .spyOn(actions, 'deleteEvent')
      .mockResolvedValue({ error: ERROR_MESSAGES.DELETE_EVENT_FAIL });

    render(<CalendarEventsClient {...mockProps} />);

    await deleteEvent();

    await waitFor(() => {
      expect(customToast).toHaveBeenCalledWith(
        ERROR_MESSAGES.DELETE_EVENT_FAIL.title,
        ERROR_MESSAGES.DELETE_EVENT_FAIL.description,
        STATUS.ERROR,
      );
    });
  });
});
