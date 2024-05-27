// Constants
import { ERROR_MESSAGES } from '@/lib/constants';

// Components
import { EventForm } from '@/ui/components';

const mockProps = {
  eventName: 'Event 1',
  date: '2024-05-27',
  startTime: '10:00',
  endTime: '11:00',
  onCancel: jest.fn(),
  onAddEvent: jest.fn(),
  onEditEvent: jest.fn(),
};

const { render } = testLibReactUtils;

describe('EventForm component', () => {
  beforeEach(() => {
    jest.useFakeTimers({ now: new Date('2024-05-01') });
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.useRealTimers();
  });

  it('EventForm component renders correctly', () => {
    const { container } = render(<EventForm {...mockProps} />);

    expect(container).toMatchSnapshot();
  });

  it('should show the required error messages correctly', async () => {
    const { getByText, getByRole, getByLabelText } = render(
      <EventForm onCancel={mockProps.onCancel} />,
    );

    fireEvent.change(getByLabelText('Title'), {
      target: { value: mockProps.eventName },
    });
    fireEvent.click(getByRole('button', { name: 'Save' }));

    await waitFor(() => {
      expect(
        getByText(ERROR_MESSAGES.FIELD_REQUIRED('Date')),
      ).toBeInTheDocument();

      expect(
        getByText(ERROR_MESSAGES.FIELD_REQUIRED('Start time')),
      ).toBeInTheDocument();

      expect(
        getByText(ERROR_MESSAGES.FIELD_REQUIRED('End time')),
      ).toBeInTheDocument();
    });
  });

  it('should show error message if the end time is less than the start time', async () => {
    const { getByText, getByRole, getByLabelText } = render(
      <EventForm {...mockProps} endTime="08:00" />,
    );

    fireEvent.change(getByLabelText('Title'), {
      target: { value: 'Event 1 Update' },
    });
    fireEvent.click(getByRole('button', { name: 'Save' }));

    await waitFor(() => {
      expect(getByText(ERROR_MESSAGES.END_TIME_EVENT)).toBeInTheDocument();
    });
  });

  it('should call onAddEvent when submit form without id ', async () => {
    const { getByRole, getByLabelText } = render(<EventForm {...mockProps} />);

    fireEvent.change(getByLabelText('Date'), {
      target: { value: '2024-05-28' },
    });
    fireEvent.click(getByRole('button', { name: 'Save' }));

    await waitFor(() => {
      expect(mockProps.onAddEvent).toHaveBeenCalled();
    });
  });

  it('should call onEditEvent when submit form with id ', async () => {
    const { getByRole, getByLabelText } = render(
      <EventForm {...mockProps} id="1" />,
    );

    fireEvent.change(getByLabelText('Start time'), {
      target: { value: '09:00' },
    });
    fireEvent.click(getByRole('button', { name: 'Save' }));

    await waitFor(() => {
      expect(mockProps.onEditEvent).toHaveBeenCalled();
    });
  });
});
