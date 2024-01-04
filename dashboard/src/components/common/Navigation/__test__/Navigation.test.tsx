import { render } from '@testing-library/react';
import Navigation from '..';

describe('Navigation test case', () => {
  it('should render correctly with the default destination', () => {
    const { container } = render(<Navigation>Mock navigation</Navigation>);
    expect(container).toMatchSnapshot();
  });
});
