import { render, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';

// component
import { UserDropdown } from '@/ui/components';

// Constants
import { AUTHENTICATION_ROLE } from '@/lib/constants';

const renderComponent = ({
  name,
  permission,
}: {
  name?: string;
  permission?: string;
}) =>
  render(
    <UserDropdown
      name={name}
      permission={permission}
      role={AUTHENTICATION_ROLE.MEMBER}
    />,
  );

describe('UserDropdown render', () => {
  it('Should render match with snapshot.', async () => {
    const { container } = await renderComponent({
      name: 'John Doe',
      permission: 'Super Admin',
    });

    waitFor(() => {
      expect(container).toMatchSnapshot();
    });
  });

  it('Get UserDropdown component', () => {
    const { getByTestId } = renderComponent({});

    const avatar = getByTestId('TestDropdown');

    expect(avatar).toBeTruthy();
  });
});
