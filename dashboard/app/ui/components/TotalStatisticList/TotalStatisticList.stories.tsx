import { StoryObj, Meta } from '@storybook/react';

// Components
import { TotalStatisticList } from '@/ui/components';

// Mocks
import { SPENDING_STATISTICS_MOCK } from '@/lib/mocks';

const meta: Meta<typeof TotalStatisticList> = {
  title: 'Custom Components/TotalStatisticList',
  tags: ['autodocs'],
  component: TotalStatisticList,
  argTypes: {
    spendingStatistics: {
      description: 'The list of total card to display',
    },
  },
  parameters: {
    controls: {
      expanded: true,
    },
  },
};

export default meta;
type Story = StoryObj<typeof TotalStatisticList>;

export const Default: Story = {
  args: {
    spendingStatistics: SPENDING_STATISTICS_MOCK,
  },
};
