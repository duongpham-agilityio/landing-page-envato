// Constants
import { AUTHENTICATION_ROLE } from '@/lib/constants';

// Utils
import { renderQueryProviderTest } from '@/lib/utils';

// Mocks
import { MOCK_USERS } from '@/lib/mocks';

// Components
import Header from '@/ui/layouts/Header';

const mockSignOut = jest.fn();

const mockProps = {
  userId: MOCK_USERS[0].uid,
  firstName: MOCK_USERS[0].firstName,
  lastName: MOCK_USERS[0].lastName,
  role: MOCK_USERS[0].role,
  avatarURL: MOCK_USERS[0].avatarURL,
  bonusTimes: MOCK_USERS[0].bonusTimes,
  onSignOut: mockSignOut,
};

describe('Header component', () => {
  it('Should render match with snapshot.', () => {
    const { container } = renderQueryProviderTest(<Header {...mockProps} />);

    expect(container).toMatchSnapshot();
  });

  it('should call onSignOut when click Logout button', () => {
    const { getAllByText } = renderQueryProviderTest(
      <Header {...mockProps} role={AUTHENTICATION_ROLE.SUPER_ADMIN} />,
    );

    fireEvent.click(getAllByText('Logout')[0]);

    expect(mockSignOut).toHaveBeenCalled();
  });
});
