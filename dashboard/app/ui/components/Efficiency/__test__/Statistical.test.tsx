import { render } from '@testing-library/react';

// Components
import Statistical from '../Statistical';
import { STROKE_COLORS } from '@/lib/constants';

describe('Statistical component', () => {
  it('Should render correctly', () => {
    const { container } = render(
      <Statistical color={STROKE_COLORS[0]} title="Spending" value={1234} />,
    );
    expect(container).toMatchSnapshot();
  });
  it('Should get title of statistical ', () => {
    const { getByText } = render(
      <Statistical color={STROKE_COLORS[0]} title="Spending" value={1234} />,
    );
    expect(getByText('Spending')).toBeDefined();
  });
});
