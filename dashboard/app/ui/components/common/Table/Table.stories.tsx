import { StoryObj, Meta } from '@storybook/react';
import { Box, Flex, Img, Td, Text } from '@chakra-ui/react';

// Components
import { Table } from '@/ui/components';

// Icons
import { Dot } from '@/ui/components/Icons';

// Mocks
import { USERS } from '@/lib/mocks';

const meta: Meta<typeof Table> = {
  title: 'Custom Components/Table',
  tags: ['autodocs'],
  component: Table,
  argTypes: {
    columns: {
      description: 'The columns list to display in the table',
    },
    dataSource: {
      description: 'The data list to display in the table data cells',
    },
  },
  parameters: {
    controls: {
      expanded: true,
    },
  },
  render: (props) => (
    <Box bgColor="background.component.primary" w="full" h="50vh" padding={10}>
      <Table {...props} />
    </Box>
  ),
};

export default meta;
type Story = StoryObj<typeof Table>;

export const Default: Story = {
  args: {
    columns: [
      {
        title: 'Customer name',
        key: 'name',
        renderBody: ({ image, name }) => (
          <Td
            py={5}
            px={0}
            fontSize="md"
            color="text.primary"
            fontWeight="semibold"
            textAlign="left"
          >
            <Flex alignItems="center" gap="10px">
              <Img
                src={`${image}`}
                alt={`Image of ${name}`}
                w={10}
                h={10}
                borderRadius="full"
              />
              <Text fontSize="md" fontWeight="semibold">
                {name as string}
              </Text>
            </Flex>
          </Td>
        ),
      },
      {
        title: 'Email',
        key: 'email',
      },
      {
        title: 'Location',
        key: 'location',
      },
      {
        title: 'Spent',
        key: 'spent',
      },
      {
        title: '',
        key: 'action',
        renderBody: () => (
          <Td
            py={5}
            px={0}
            fontSize="md"
            color="text.primary"
            fontWeight="semibold"
            textAlign="left"
          >
            <Dot />
          </Td>
        ),
      },
    ],
    dataSource: USERS,
  },
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    columns: [
      {
        key: 'name',
        renderBody: ({ image, name }) => (
          <Td
            py={5}
            px={2}
            fontSize="md"
            color="text.primary"
            fontWeight="semibold"
            textAlign="left"
          >
            <Flex alignItems="center" gap={4}>
              <Img
                src={`${image}`}
                alt={`Image of ${name}`}
                w={16}
                h={16}
                objectFit="cover"
                borderRadius="lg"
              />
              <Text fontSize="md" fontWeight="semibold">
                {name as string}
              </Text>
            </Flex>
          </Td>
        ),
        renderHead: () => <></>,
      },
      {
        key: 'email',
        renderHead: () => <></>,
      },
      {
        key: 'location',
        renderHead: () => <></>,
      },
      {
        key: 'spent',
        renderHead: () => <></>,
      },
      {
        title: '',
        key: 'action',
        renderHead: () => <></>,
        renderBody: () => (
          <Td
            py={5}
            px={0}
            fontSize="md"
            color="text.primary"
            fontWeight="semibold"
            textAlign="left"
          >
            <Dot />
          </Td>
        ),
      },
    ],
    dataSource: USERS,
  },
};
