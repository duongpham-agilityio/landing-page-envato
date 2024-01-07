import { StoryObj, Meta } from '@storybook/react';
import { Box } from '@chakra-ui/react';

// Component
import FilterUser from '@/ui/components/TransactionTable';

const meta: Meta<typeof FilterUser> = {
  title: 'Custom Components/FilterUser',
  tags: ['autodocs'],
  component: FilterUser,
  decorators: [
    (Story) => (
      <Box
        bgColor="background.component.primary"
        borderRadius={8}
        px={6}
        py={5}
      >
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
type Story = StoryObj<typeof FilterUser>;

export const Default: Story = {
  args: {},
};
