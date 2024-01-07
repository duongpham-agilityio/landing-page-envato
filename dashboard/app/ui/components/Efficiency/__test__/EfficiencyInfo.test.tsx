import { render } from '@testing-library/react';

// Components
import EfficiencyInfo from '../EfficiencyInfo';

// Mocks
import { EFFICIENCY_MOCK } from '@/lib/mocks';
import * as chakra from '@chakra-ui/react';

jest.mock('react-apexcharts', () => ({
  __esModule: true,
  default: () => <div>EfficiencyInfo component</div>,
}));

jest.mock('@chakra-ui/react', () => ({
  ...jest.requireActual('@chakra-ui/react'),
  useColorMode: jest.fn(),
}));

describe('EfficiencyInfo component', () => {
  it('should render correctly with light mode', () => {
    jest.spyOn(chakra, 'useColorMode').mockReturnValue({
      colorMode: 'light',
      toggleColorMode: jest.fn(),
      setColorMode: jest.fn(),
    });
    const { container } = render(<EfficiencyInfo {...EFFICIENCY_MOCK} />);

    expect(container).toMatchSnapshot();
    expect(container.querySelector('path[fill="#1A202C"]')).toBeDefined();
  });

  it('should render correctly with dark mode', () => {
    jest.spyOn(chakra, 'useColorMode').mockReturnValue({
      colorMode: 'dark',
      toggleColorMode: jest.fn(),
      setColorMode: jest.fn(),
    });
    const { container } = render(<EfficiencyInfo {...EFFICIENCY_MOCK} />);

    expect(container.querySelector('path[fill="white"]')).toBeDefined();
  });
});
