import { Meta, StoryObj } from '@storybook/react';
import Loading from '.';
import { Box } from '@chakra-ui/react';

const meta: Meta<typeof Loading> = {
  title: 'Custom Components/Loading',
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <Box>
        <Story />
      </Box>
    ),
  ],
  component: Loading,
};

export default meta;

type Story = StoryObj<typeof Loading>;

export const DefaultLoading: Story = {
  args: {},
};
