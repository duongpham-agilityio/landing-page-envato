import { StoryObj, Meta } from '@storybook/react';

// Components
import { RevenueFlow } from '@/ui/components';

import { REVENUE_FLOW_MOCK } from '@/lib/mocks';

const meta: Meta<typeof RevenueFlow> = {
  title: 'Custom Components/RevenueFlow',
  tags: ['autodocs'],
  component: RevenueFlow,
  argTypes: {
    data: {
      description:
        'The data of revenue flow for 12 months includes: pending, signed and lost',
    },
  },
  parameters: {
    controls: {
      expanded: true,
    },
  },
};

export default meta;
type Story = StoryObj<typeof RevenueFlow>;

export const Default: Story = {
  args: {
    data: REVENUE_FLOW_MOCK,
  },
};
