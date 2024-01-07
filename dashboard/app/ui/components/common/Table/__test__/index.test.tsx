import { render } from '@testing-library/react';

// Components
import { Table } from '@/ui/components';

// Mocks
import { USERS } from '@/lib/mocks';

// Constants
import { ERROR_MESSAGES } from '@/lib/constants';

const COLUMNS = [
  {
    title: 'Customer name',
    key: 'name',
  },
  {
    title: 'Email',
    key: 'email',
  },
  {
    title: 'Location',
    key: 'location',
  },
  {
    title: 'Spent',
    key: 'spent',
  },
  {
    title: '',
    key: 'action',
    renderBody: () => <button>action</button>,
  },
];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const setup = (data: any[]) =>
  render(<Table columns={COLUMNS} dataSource={data} />);

describe('Table', () => {
  it('Match to snapshot', () => {
    const { container } = setup(USERS);

    expect(container).toMatchSnapshot();
  });

  it('Render with data', () => {
    const { container } = setup(USERS);

    expect(container.querySelectorAll('button').length).toBe(USERS.length);
  });

  it('Render with empty data', () => {
    const { container, getByText } = setup([]);

    expect(container.querySelectorAll('button').length).toBe(0);
    expect(getByText(ERROR_MESSAGES.EMPTY_DATA)).toBeDefined();
  });
});
