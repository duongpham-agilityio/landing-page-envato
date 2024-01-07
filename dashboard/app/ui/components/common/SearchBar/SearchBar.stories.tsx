import type { Meta, StoryObj } from '@storybook/react';

// Components
import { SearchBar } from '@/ui/components';

const meta: Meta<typeof SearchBar> = {
  title: 'Custom Components/SearchBar',
  component: SearchBar,
  tags: ['autodocs'],
  argTypes: {
    onFilter: {
      description:
        'The function that will be invoked when user filtering function',
    },
    onSearch: {
      description: 'The function that will be invoked when user searching',
    },
  },
  parameters: {
    controls: {
      expanded: true,
    },
  },
};

export default meta;
type Story = StoryObj<typeof SearchBar>;

export const Default: Story = {
  args: {
    onFilter: () => {},
    onSearch: () => {},
  },
};
