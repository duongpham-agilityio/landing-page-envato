import { render } from '@testing-library/react';
import { UserInfoCell } from '..';
import { Table, Tr } from '@chakra-ui/react';

describe('TotalCard component', () => {
  it('renders correctly', () => {
    const { container } = render(
      <Table>
        <Tr>
          <UserInfoCell
            name="test"
            imageURL="url"
            role="Finance managers"
            address="Jakarta, Indonesia"
            time="2 days ago"
          />
        </Tr>
      </Table>,
    );

    expect(container).toMatchSnapshot();
  });
});
