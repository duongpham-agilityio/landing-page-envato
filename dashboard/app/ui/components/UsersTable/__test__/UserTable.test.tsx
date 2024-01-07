import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

// Components
import UserTable from '@/ui/components/UsersTable';

// Mocks
import { USERS_MOCK } from '@/lib/mocks';

describe('UserTable component', () => {
  it('should renders correctly', () => {
    const { container } = render(<UserTable users={USERS_MOCK} />);

    expect(container).toMatchSnapshot();
  });

  it('should renders component', () => {
    render(<UserTable users={USERS_MOCK} />);

    expect(screen.getByText('Abdur Rohman')).toBeInTheDocument();
  });

  it('should renders children when onclickUser', () => {
    const onClickUser = jest.fn();
    render(<UserTable users={USERS_MOCK} onClickUser={onClickUser('1')} />);

    expect(onClickUser).toHaveBeenCalled();
  });
});
