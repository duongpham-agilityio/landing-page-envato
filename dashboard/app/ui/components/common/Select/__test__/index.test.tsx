import { fireEvent, render } from '@testing-library/react';

// Components
import { Select } from '@/ui/components';

// Mocks
import { SOCIAL_PLATFORM_OPTIONS } from '@/lib/constants';

describe('Select', () => {
  it('Match snapshot', () => {
    const { container } = render(<Select options={SOCIAL_PLATFORM_OPTIONS} />);

    expect(container).toMatchSnapshot();
  });

  it('Open list item', () => {
    const { getByRole, container } = render(
      <Select options={SOCIAL_PLATFORM_OPTIONS} />,
    );
    const button = getByRole('button');

    fireEvent.click(button);
    expect(container.querySelectorAll('button').length).toBe(
      SOCIAL_PLATFORM_OPTIONS.length + 1,
    );
  });

  it('Select one item', () => {
    const { getByRole, container } = render(
      <Select options={SOCIAL_PLATFORM_OPTIONS} />,
    );
    const button = getByRole('button');

    fireEvent.click(button);

    const buttons = container.querySelectorAll('button');

    expect(buttons.length).toBe(SOCIAL_PLATFORM_OPTIONS.length + 1);
    fireEvent.click(buttons[2]);
    expect(getByRole('button').textContent).toBe(
      SOCIAL_PLATFORM_OPTIONS[1].label,
    );
  });
});
