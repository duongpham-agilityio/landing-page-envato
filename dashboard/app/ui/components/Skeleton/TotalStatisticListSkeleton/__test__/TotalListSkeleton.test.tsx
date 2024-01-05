import { render } from '@testing-library/react';

// Components
import { TotalStatisticListSkeleton } from '@/ui/components';

describe('TotalListSkeleton component', () => {
  it('renders correctly', () => {
    const { container } = render(<TotalStatisticListSkeleton />);

    expect(container).toMatchSnapshot();
  });
});
