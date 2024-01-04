import type { Meta, StoryObj } from '@storybook/react';
import { Box } from '@chakra-ui/react';

// Components
import { Logo } from '@app/components';

const meta: Meta<typeof Logo> = {
  title: 'Custom Components/Logo',
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <Box bg="background.component.primary">
        <Story />
      </Box>
    ),
  ],
  component: Logo,
};

export default meta;
type Story = StoryObj<typeof Logo>;

export const WhiteLogo: Story = {
  args: {},
};
