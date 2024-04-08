import { Box } from '@chakra-ui/react';
import { Meta, StoryObj } from '@storybook/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Component
import ProductionsTable from '.';

const queryClient = new QueryClient();

const meta: Meta<typeof ProductionsTable> = {
  title: 'Custom Components/ProductTable',
  tags: ['autodocs'],
  component: ProductionsTable,
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
type Story = StoryObj<typeof ProductionsTable>;

export const Default: Story = {
  args: {},
};
