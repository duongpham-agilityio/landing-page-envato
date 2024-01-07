import { render } from '@testing-library/react';
import { Table } from '@chakra-ui/react';

// Components
import { HeadCell } from '@/ui/components';

const setup = () =>
  render(<HeadCell title="Title" />, {
    wrapper: Table,
  });

describe('HeadCell', () => {
  it('Match to snapshot', () => {
    const { container } = setup();

    expect(container).toMatchSnapshot();
  });

  it('Render', () => {
    const { getByText } = setup();

    expect(getByText('Title')).toBeDefined();
  });
});
