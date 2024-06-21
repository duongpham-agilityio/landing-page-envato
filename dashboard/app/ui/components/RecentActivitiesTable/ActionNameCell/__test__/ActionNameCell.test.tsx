import { render } from '@testing-library/react';
import { Table } from '@chakra-ui/react';

// Components
import ActionNameCell from '..';

const mockProps = {
  actionName: 'Login',
};

describe('ActionNameCell component', () => {
  const setup = () =>
    render(<ActionNameCell {...mockProps} />, {
      wrapper: Table,
    });

  it('should match with snapshot', () => {
    const { container } = setup();

    expect(container).toMatchSnapshot();
  });
});
