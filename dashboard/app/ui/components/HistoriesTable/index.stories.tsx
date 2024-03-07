import { StoryObj, Meta } from '@storybook/react';
import { Box } from '@chakra-ui/react';

// Component
import HistoriesTable from '@/ui/components/HistoriesTable';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

const meta: Meta<typeof HistoriesTable> = {
  title: 'Custom Components/HistoriesTable',
  tags: ['autodocs'],
  component: HistoriesTable,
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
type Story = StoryObj<typeof HistoriesTable>;

export const Default: Story = {
  args: {},
};
