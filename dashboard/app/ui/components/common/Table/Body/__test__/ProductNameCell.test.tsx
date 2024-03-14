import { render } from '@testing-library/react';
import { Table } from '@chakra-ui/react';

// Components

import ProductNameCell from '../ProductNameCell';

const setup = () =>
  render(<ProductNameCell id={1} name="Xbox one" />, {
    wrapper: Table,
  });

describe('ProductNameCell', () => {
  it('Match to snapshot', () => {
    const { container } = setup();

    expect(container).toMatchSnapshot();
  });

  it('Render', () => {
    const { getByText } = setup();

    expect(getByText('Xbox one')).toBeDefined();
  });
});
