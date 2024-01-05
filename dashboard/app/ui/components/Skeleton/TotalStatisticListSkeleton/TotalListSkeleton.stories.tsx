import { TotalStatisticListSkeleton } from '@/ui/components';

// Components
import { StoryObj, Meta } from '@storybook/react';

const meta: Meta<typeof TotalStatisticListSkeleton> = {
  title: 'Custom Components/Skeleton/TotalStatisticListSkeleton',
  tags: ['autodocs'],
  component: TotalStatisticListSkeleton,
  parameters: {
    controls: {
      expanded: true,
    },
  },
};

export default meta;
type Story = StoryObj<typeof TotalStatisticListSkeleton>;

export const Default: Story = {};
