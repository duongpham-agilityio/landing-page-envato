import { render } from '@testing-library/react';
import { Table } from '@chakra-ui/react';

// Components
import ActionIdCell from '..';

const mockProps = {
  id: '660a85d9d6eb03502e197ac5',
};

describe('ActionIdCell component', () => {
  const setup = () =>
    render(<ActionIdCell {...mockProps} />, {
      wrapper: Table,
    });

  it('should match with snapshot', () => {
    const { container } = setup();

    expect(container).toMatchSnapshot();
  });
});
