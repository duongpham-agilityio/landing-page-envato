import type { Meta, StoryObj } from '@storybook/react';
import { Box } from '@chakra-ui/react';

// Components
import BonusNotification from '.';
import { useColorfill } from '@/ui/themes/bases';

const meta: Meta<typeof BonusNotification> = {
  title: 'Custom Components/BonusNotification',
  tags: ['autodocs'],
  component: BonusNotification,
  argTypes: {
    colorFill: {
      description: 'The color fill of the bonus notification icon',
    },
    discount: {
      description: 'The discount percentage for the bonus notification',
    },
    limitOfBonus: {
      description: 'Determine the current number of bonus notifications limit',
      defaultValue: 5,
    },
  },
  decorators: [
    (Story) => (
      <Box h="20vh" bg="background.component.primary">
        <Story />
      </Box>
    ),
  ],
  parameters: {
    controls: {
      expanded: true,
    },
  },
};

export default meta;

type Story = StoryObj<typeof BonusNotification>;

export const Primary: Story = {
  args: {
    limitOfBonus: 5,
  },
  render: function Render(props) {
    const { primary } = useColorfill();

    return <BonusNotification {...props} colorFill={primary} />;
  },
};
