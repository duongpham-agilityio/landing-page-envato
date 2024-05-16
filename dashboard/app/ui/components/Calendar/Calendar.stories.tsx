import type { Meta, StoryObj } from '@storybook/react';
import moment from 'moment';

// Components
import { Calendar } from '@/ui/components';

const meta: Meta<typeof Calendar> = {
  title: 'Custom Components/Calendar',
  tags: ['autodocs'],
  component: Calendar,
  parameters: {
    controls: {
      expanded: true,
    },
  },
};

export default meta;
type Story = StoryObj<typeof Calendar>;

export const Default: Story = {
  args: {
    events: [
      {
        title: 'Event 1',
        start: moment('2024-05-16 01:30').toDate(),
        end: moment('2024-05-16 05:30').toDate(),
      },
    ],
  },
};
