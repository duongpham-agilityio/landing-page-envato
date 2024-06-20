import { screen, waitFor } from '@testing-library/react';

// Components
import UserForm from '..';
import userEvent from '@testing-library/user-event';
import { renderQueryProviderTest } from '@/lib/utils/testUtils';
import { useUpdateUser } from '@/lib/hooks';
import { MOCK_USERS } from '@/lib/mocks';

const updateProfileMock = jest.fn();

jest.mock('@/lib/hooks', () => ({
  ...jest.requireActual('@/lib/hooks'),
  useUpdateUser: jest.fn(),
}));

jest.mock('@chakra-ui/react', () => ({
  ...jest.requireActual('@chakra-ui/react'),
  useToast: () => jest.fn(),
}));

describe('Personal Page test cases', () => {
  beforeAll(() => {
    (useUpdateUser as jest.Mock).mockReturnValue({
      data: MOCK_USERS,
      useCreateIssues: updateProfileMock,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders UserForm with content', () => {
    const { container } = renderQueryProviderTest(<UserForm />);

    expect(container).toMatchSnapshot();
  });

  it('should handle submit form', async () => {
    renderQueryProviderTest(<UserForm />);

    const mockInput = 'mock input';

    const firstNameInput = screen.getByRole<HTMLInputElement>('textbox', {
      name: /first name/i,
      hidden: true,
    });

    await userEvent.type(firstNameInput, mockInput);

    const submitBtn = screen.getByRole<HTMLButtonElement>('button', {
      name: /btn\-save\-profile/i,
      hidden: true,
    });

    await userEvent.click(submitBtn);

    waitFor(() => {
      expect(submitBtn.disabled).toBeTruthy();
    });
  });

  test('handleSubmitForm should be called when is clicked', async () => {
    const { getByTestId } = renderQueryProviderTest(<UserForm />);

    const clickOpenMenu = getByTestId('click-button-update-profile');

    await userEvent.click(clickOpenMenu);

    waitFor(() => {
      expect(updateProfileMock).toHaveBeenCalledWith({
        firstName: 'mock first name',
      });
    });
  });
});
