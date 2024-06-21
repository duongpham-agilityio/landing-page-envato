import { render, fireEvent } from '@testing-library/react';
import { Table } from '@chakra-ui/react';

// Components
import { HeadCell } from '@/ui/components';

const mockProps = {
  title: 'Product Name',
  columnKey: 'name',
  onSort: jest.fn(),
};

describe('HeadCell', () => {
  it('Match to snapshot', () => {
    const { container } = render(<HeadCell {...mockProps} title="" />, {
      wrapper: Table,
    });

    expect(container).toMatchSnapshot();
  });

  it('should call onSort when click sort icon', () => {
    const { getByTestId } = render(<HeadCell {...mockProps} />, {
      wrapper: Table,
    });

    fireEvent.click(getByTestId('sort-icon'));

    expect(mockProps.onSort).toHaveBeenCalledWith(mockProps.columnKey);
  });
});
