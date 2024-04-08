import { Box } from '@chakra-ui/react';
import { Meta, StoryObj } from '@storybook/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Component
import ProductFormMemorized from './ProductForm';

const queryClient = new QueryClient();

const meta: Meta<typeof ProductFormMemorized> = {
  title: 'Custom Components/ProductForm',
  tags: ['autodocs'],
  component: ProductFormMemorized,
  argTypes: {
    data: {
      description: 'The data of the product',
    },
    onCreateProduct: {
      description: 'The create new product for product table',
      action: 'onCreateProduct',
    },
    onUpdateProduct: {
      description: 'The update product for product table',
      action: 'onUpdateProduct',
    },
    onCloseModal: {
      description: 'The close function handler for the product form component',
      action: 'onCloseModal',
    },
  },
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
type Story = StoryObj<typeof ProductFormMemorized>;

export const Default: Story = {
  args: {},
};
