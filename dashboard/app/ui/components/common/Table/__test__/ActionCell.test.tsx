import { render } from '@testing-library/react';
import { Table } from '@chakra-ui/react';

// Components
import { ActionCell } from '@/ui/components';

const setup = () =>
  render(<ActionCell />, {
    wrapper: Table,
  });

describe('CustomerNameCell', () => {
  it('Match to snapshot', () => {
    const { container } = setup();

    expect(container).toMatchSnapshot();
  });
});
