// Libs
import { render } from '@testing-library/react';

// Pages
import Calendar from '../calendar/page';

jest.mock('@/ui/sections/Calendar', () => ({
  __esModule: true,
  ...jest.requireActual('@/ui/sections/Calendar'),
  default: () => <div>Calendar</div>,
}));

describe('Calendar page', () => {
  test('Should render match with snapshot.', () => {
    const { container } = render(<Calendar />);

    expect(container).toMatchSnapshot();
  });
});
