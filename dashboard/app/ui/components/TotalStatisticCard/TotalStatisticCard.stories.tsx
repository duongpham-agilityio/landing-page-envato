import { StoryObj, Meta } from '@storybook/react';

// Components
import TotalStatisticCard from '@/ui/components/TotalStatisticCard';

// Mocks
import { TOTAL_EARNINGS_MOCK } from '@/lib/mocks';

const meta: Meta<typeof TotalStatisticCard> = {
  title: 'Custom Components/TotalCard',
  tags: ['autodocs'],
  component: TotalStatisticCard,
  argTypes: {
    title: {
      description: 'The title of the total card',
    },

    growth: {
      description: 'The growth percentage in the total card',
    },

    total: {
      description: 'The total money of the total card',
    },

    weeklyIncome: {
      description: 'The weekly income data for the chart in total card',
    },
  },
  parameters: {
    controls: {
      expanded: true,
    },
  },
};

export default meta;
type Story = StoryObj<typeof TotalStatisticCard>;

export const Default: Story = {
  args: {
    ...TOTAL_EARNINGS_MOCK,
  },
};
