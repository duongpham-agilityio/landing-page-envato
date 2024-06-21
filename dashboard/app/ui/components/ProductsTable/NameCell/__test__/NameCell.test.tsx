import { render } from '@testing-library/react';
import { Table } from '@chakra-ui/react';

// Components
import NameCell from '..';

const mockProps = {
  name: 'shoe',
};

describe('NameCell component', () => {
  const setup = () =>
    render(<NameCell {...mockProps} />, {
      wrapper: Table,
    });

  it('should match with snapshot', () => {
    const { container } = setup();

    expect(container).toMatchSnapshot();
  });
});
