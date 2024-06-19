import '@testing-library/jest-dom';
import { Control, useForm } from 'react-hook-form';

// Components
import EnterMoney from '../EnterMoney';

// Types
import { TTransfer } from '@/lib/interfaces';

const { result } = renderHook(() => useForm<TTransfer>());

const setup = () => {
  const control: Control<TTransfer> = result.current.control;
  const props = {
    control,
    onUploadError: jest.fn(),
  };

  return render(<EnterMoney {...props} />);
};

describe('CardPayment test cases', () => {
  test('CardPayment component renders correctly', () => {
    const { container } = setup();

    expect(container).toMatchSnapshot();
  });
});
