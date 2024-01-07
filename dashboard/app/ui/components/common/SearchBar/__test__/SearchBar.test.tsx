import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';

// Components
import { SearchBar } from '@/ui/components';

// Themes
import { colors } from '@/ui/themes/bases/colors';

const onSearchMock = jest.fn();
const onFilterMock = jest.fn();

const setup = () =>
  render(
    <SearchBar
      searchValue=""
      onSearch={onSearchMock}
      onFilter={onFilterMock}
    />,
  );

describe('SearchBar render', () => {
  it('Should render match with snapshot.', () => {
    const { container } = setup();
    expect(container).toMatchSnapshot();
  });

  it('Call onChange when input change ', async () => {
    const { getByTestId } = setup();
    const input = getByTestId('search-transaction');
    await userEvent.type(input, 'abc');
    expect(onSearchMock).toHaveBeenCalledWith('abc');
  });

  it('Call onFilter when select ', async () => {
    jest.replaceProperty(colors, 'secondary', {
      400: null,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } as any);

    const { getByText } = setup();
    const filterOption = getByText('January');
    await userEvent.click(filterOption);
    expect(onFilterMock).toHaveBeenCalledWith('jan');
  });
});
