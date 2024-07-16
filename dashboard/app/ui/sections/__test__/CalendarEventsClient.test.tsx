// Libs
import { render, waitFor, fireEvent, screen } from '@testing-library/react';

// Sections
import CalendarEventsClient from '@/ui/sections/Calendar/CalendarEvents/CalendarEventsClient';

// Mocks
import {
  MOCK_CALENDAR_NOW_DATE,
  MOCK_EVENTS_DATA_RES,
  MOCK_UPDATE_EVENT_FORM,
} from '@/lib/mocks';

// Constants
import { STATUS, SUCCESS_MESSAGES } from '@/lib/constants';

// Utils
import { customToast } from '@/lib/utils';

jest.mock('@/lib/actions');

// Actions
import * as actions from '@/lib/actions';

describe('CalendarEvents section', () => {
  const mockEvents = MOCK_EVENTS_DATA_RES.result;

  beforeEach(() => {
    jest.useFakeTimers({ now: MOCK_CALENDAR_NOW_DATE });
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.clearAllTimers();
    jest.useRealTimers();
  });

  it('Should render match with snapshot.', () => {
    const { container } = render(<CalendarEventsClient events={mockEvents} />);

    expect(container).toMatchSnapshot();
  });

  it('Should add event successfully', async () => {
    mockEvents[0].userId = '';

    jest.spyOn(actions, 'addEvent').mockResolvedValue();

    await act(async () => render(<CalendarEventsClient events={mockEvents} />));

    // const { getByTestId, getByLabelText, getByRole, getByText } = render(
    //   <CalendarEventsClient events={mockEvents} />,
    // );

    await act(async () => {
      fireEvent.click(screen.getByText(mockEvents[0].eventName));
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

    await waitFor(() => {
      expect(customToast).toHaveBeenCalledWith(
        SUCCESS_MESSAGES.CREATE_EVENT_SUCCESS.title,
        SUCCESS_MESSAGES.CREATE_EVENT_SUCCESS.description,
        STATUS.SUCCESS,
      );
    });
  });
});
