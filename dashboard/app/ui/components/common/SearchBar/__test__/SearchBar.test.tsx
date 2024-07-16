import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';

// Components
import { SearchBar } from '@/ui/components';

// Themes
import { colors } from '@/ui/themes/bases/colors';
import { ROLES } from '@/lib/constants';

type MyColorType = {
  [key in
    | 100
    | 150
    | 200
    | 250
    | 300
    | 350
    | 400
    | 450
    | 500
    | 550
    | 600
    | 650
    | 700
    | 750
    | 800
    | 850
    | 900
    | 950
    | 1000
    | 1050
    | 1100]: string;
};

const onSearchMock = jest.fn();
const onFilterMock = jest.fn();

const setup = () =>
  render(
    <SearchBar
      searchValue=""
      filterOptions={ROLES}
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
      400: '',
    } as MyColorType);

    const { getByText } = setup();
    const filterOption = getByText('Member');
    await userEvent.click(filterOption);
    expect(onFilterMock).toHaveBeenCalledWith('member');
  });

  it('Clear input when input change ', async () => {
    const { getByTestId } = setup();
    const input = getByTestId('search-transaction');
    await userEvent.type(input, 'abc');
    await waitFor(async () => {
      const clearIcon = getByTestId('right-icon-input');

      await userEvent.click(clearIcon);
    });

    waitFor(() => expect(onSearchMock).toHaveBeenCalledWith(''));
  });
});
