import { StoryObj, Meta } from '@storybook/react';

import Efficiency from '@/ui/components/Efficiency';

const meta: Meta<typeof Efficiency> = {
  title: 'Custom Components/Efficiency',
  tags: ['autodocs'],
  component: Efficiency,
  argTypes: {
    arrival: {
      description: 'Indicate the amount of arrival money',
    },

    spending: {
      description: 'Indicate the amount of spending money',
    },

    statistical: {
      description: 'The statistical data of for the chart and the statistics',
    },

    isExchangeRate: {
      description:
        'To show the exchange options instead of the statistics by default',
      defaultValue: false,
    },
  },
  parameters: {
    controls: {
      expanded: true,
    },
  },
};

export default meta;
type Story = StoryObj<typeof Efficiency>;

export const Default: Story = {};
