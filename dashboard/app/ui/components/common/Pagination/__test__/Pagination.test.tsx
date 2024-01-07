import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

// Components
import { Pagination } from '@/ui/components';

const onPageChangeMock = jest.fn();

describe('Pagination render', () => {
  test('Should render match with snapshot.', () => {
    const { container } = render(<Pagination pageSize={10} />);
    expect(container).toMatchSnapshot();
  });

  it('Handle click page', async () => {
    const { getByTestId } = render(
      <Pagination pageSize={10} onPageChange={onPageChangeMock} />,
    );

    const nextPage = getByTestId('next-button');

    await userEvent.click(nextPage);
    expect(onPageChangeMock).toHaveBeenCalled();
  });

  it('Handle next page', async () => {
    const { getByTestId } = render(
      <Pagination pageSize={8} onPageChange={onPageChangeMock} />,
    );

    const nextPage = getByTestId('next-button');

    await userEvent.click(nextPage);
    expect(onPageChangeMock).toHaveBeenCalled();
  });

  it('Handle prev page', async () => {
    const { getByTestId } = render(
      <Pagination
        pageSize={8}
        currentPage={2}
        onPageChange={onPageChangeMock}
      />,
    );

    const nextPage = getByTestId('prev-button');

    await userEvent.click(nextPage);
    expect(onPageChangeMock).toHaveBeenCalled();
  });

  it('Handle change limit', async () => {
    const onLimitChangeMock = jest.fn();
    const { getByText } = render(
      <Pagination
        pageSize={8}
        currentPage={2}
        onPageChange={onPageChangeMock}
        onLimitChange={onLimitChangeMock}
      />,
    );

    const selectOption = getByText('50');
    await userEvent.click(selectOption);
    expect(onLimitChangeMock).toHaveBeenCalled();
  });
});
