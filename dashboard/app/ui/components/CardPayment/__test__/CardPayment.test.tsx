import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import userEvent from '@testing-library/user-event';

// Components
import CardPayment from '@/ui/components/CardPayment';

const queryClient = new QueryClient();

const mockFilterDataUser = [
  { _id: '1', email: 'userone@example.com' },
  { _id: '2', email: 'usertwo@example.com' },
  { _id: '3', email: 'userthree@example.com' },
];

describe('CardPayment test cases', () => {
  const setup = () =>
    render(
      <QueryClientProvider client={queryClient}>
        <CardPayment />
      </QueryClientProvider>,
    );

  test('CardPayment component renders correctly', () => {
    const { container } = setup();
    expect(container).toMatchSnapshot();
  });

  test('should invoke handleChange function to prevent negative number when typing money amount', async () => {
    const { container } = setup();
    const moneyInput = container.querySelector<HTMLInputElement>(
      'input[name="money"]',
    );

    if (moneyInput) {
      await userEvent.type(moneyInput, '-123');

      expect(moneyInput.value).toBe('123');
    }
  });

  test('should hide money amount when clicking the eye icon button', async () => {
    setup();
    const eyeButton = screen.getByTestId('btn-eye');

    await userEvent.click(eyeButton);

    const hiddenTextField = screen.getByText(/\*\*\*\*\*\*/i);

    expect(hiddenTextField).toBeDefined();
  });

  it('returns the correct _id for an existing email', () => {
    const email = 'usertwo@example.com';
    const expectedId = '2';

    const getMemberId = (email: string) =>
      mockFilterDataUser.find(
        (user) =>
          user.email.trim().toLowerCase() === email.trim().toLowerCase(),
      )?._id || '';

    const memberId = getMemberId(email);

    expect(memberId).toEqual(expectedId);
  });

  it('returns an empty string for an email that does not exist', () => {
    const email = 'nonexistent@example.com';
    const expectedId = '';

    const getMemberId = (email: string) =>
      mockFilterDataUser.find(
        (user) =>
          user.email.trim().toLowerCase() === email.trim().toLowerCase(),
      )?._id || '';

    const memberId = getMemberId(email);

    expect(memberId).toEqual(expectedId);
  });
});
