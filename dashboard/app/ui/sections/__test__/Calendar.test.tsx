// Libs
import { render } from '@testing-library/react';

// Sections
import { Calendar } from '@/ui/sections';

jest.mock('@/ui/sections/Calendar/CalendarEvents', () => ({
  __esModule: true,
  ...jest.requireActual('@/ui/sections/Calendar/CalendarEvents'),
  default: () => <div>Calendar Events</div>,
}));

jest.mock('@/ui/sections/Calendar/CardPayment', () => ({
  __esModule: true,
  ...jest.requireActual('@/ui/sections/Calendar/CardPayment'),
  default: () => <div>CardPayment</div>,
}));

describe('Calendar section', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('Should render match with snapshot.', () => {
    const { container } = render(<Calendar />);

    expect(container).toMatchSnapshot();
  });
});
