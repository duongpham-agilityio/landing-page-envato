import { render } from '@testing-library/react';
import { StatusCell } from '..';
import { Table, Tr } from '@chakra-ui/react';

describe('TotalCard component', () => {
  it('renders correctly', () => {
    const { container } = render(
      <Table>
        <Tr>
          <StatusCell />
        </Tr>
      </Table>,
    );

    expect(container).toMatchSnapshot();
  });
});
