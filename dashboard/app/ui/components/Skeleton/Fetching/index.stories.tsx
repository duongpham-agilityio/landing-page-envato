import { StoryObj, Meta } from '@storybook/react';

import { Fetching } from '@/ui/components';

const meta: Meta<typeof Fetching> = {
  title: 'Custom Components/Skeleton/Fetching',
  tags: ['autodocs'],
  component: Fetching,
  parameters: {
    controls: {
      expanded: true,
    },
  },
};

export default meta;
type Story = StoryObj<typeof Fetching>;

export const Default: Story = {
  args: {
    isLoading: true,
  },
};
