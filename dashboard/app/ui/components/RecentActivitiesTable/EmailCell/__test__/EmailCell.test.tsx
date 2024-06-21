import { render } from '@testing-library/react';
import { Table } from '@chakra-ui/react';

// Components
import EmailCell from '..';

const mockProps = {
  email: 'user01@gmail.com',
};

describe('EmailCell component', () => {
  const setup = () =>
    render(<EmailCell {...mockProps} />, {
      wrapper: Table,
    });

  it('should match with snapshot', () => {
    const { container } = setup();

    expect(container).toMatchSnapshot();
  });
});
