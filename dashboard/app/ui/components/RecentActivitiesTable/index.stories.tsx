import { Box } from '@chakra-ui/react';
import { Meta, StoryObj } from '@storybook/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Component
import RecentActivitiesTable from '.';

const queryClient = new QueryClient();

const meta: Meta<typeof RecentActivitiesTable> = {
  title: 'Custom Components/RecentActivitiesTable',
  tags: ['autodocs'],
  component: RecentActivitiesTable,
  decorators: [
    (Story) => (
      <QueryClientProvider client={queryClient}>
        <Box
          bgColor="background.component.primary"
          borderRadius={8}
          px={6}
          py={5}
        >
          <Story />
        </Box>
      </QueryClientProvider>
    ),
  ],
  parameters: {
    controls: {
      expanded: true,
    },
  },
};

export default meta;
type Story = StoryObj<typeof RecentActivitiesTable>;

export const Default: Story = {
  args: {},
};
