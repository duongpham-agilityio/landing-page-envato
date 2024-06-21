import { render } from '@testing-library/react';
import { Table } from '@chakra-ui/react';

// Components
import GalleryCell from '..';

const mockProps = {
  name: 'Shoe',
};

describe('GalleryCell component', () => {
  const setup = () =>
    render(<GalleryCell {...mockProps} />, {
      wrapper: Table,
    });

  it('should match with snapshot', () => {
    const { container } = setup();

    expect(container).toMatchSnapshot();
  });
});
