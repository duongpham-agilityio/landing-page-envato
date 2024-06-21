import { render } from '@testing-library/react';
import { Table } from '@chakra-ui/react';

// Components
import QuantityCell from '..';

const mockProps = {
  price: 30.5,
};

describe('QuantityCell component', () => {
  const setup = () =>
    render(<QuantityCell {...mockProps} />, {
      wrapper: Table,
    });

  it('should match with snapshot', () => {
    const { container } = setup();

    expect(container).toMatchSnapshot();
  });
});
