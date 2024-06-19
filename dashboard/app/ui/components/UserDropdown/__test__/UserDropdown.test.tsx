import { render, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';

// Components
import { UserDropdown } from '@/ui/components';

// Constants
import { AUTHENTICATION_ROLE } from '@/lib/constants';

const mockSignOut = jest.fn();

const mockProps = {
  permission: AUTHENTICATION_ROLE.SUPER_ADMIN,
  role: AUTHENTICATION_ROLE.MEMBER,
  onSignOut: mockSignOut,
};

describe('UserDropdown component', () => {
  it('Should render match with snapshot.', () => {
    const { container } = render(<UserDropdown {...mockProps} />);

    waitFor(() => {
      expect(container).toMatchSnapshot();
    });
  });

  it('should call onSignOut when click Logout button', () => {
    const { getByText } = render(<UserDropdown {...mockProps} />);

    fireEvent.click(getByText(mockProps.permission));

    fireEvent.click(getByText('Logout'));

    expect(mockSignOut).toHaveBeenCalled();
  });
});
