import { StoryObj, Meta } from '@storybook/react';
import { Box, Table, Tr } from '@chakra-ui/react';

// Component
import UserInfoCell from '@/ui/components/UsersTable/Cell/UserInfoCell';

// Mocks
import { USERS } from '@/lib/mocks';

const meta: Meta<typeof UserInfoCell> = {
  title: 'Custom Components/Users/Cell/UserInfoCell',
  tags: ['autodocs'],
  component: UserInfoCell,
  decorators: [
    (Story) => (
      <Box bgColor="background.component.primary">
        <Story />
      </Box>
    ),
  ],
  parameters: {
    controls: {
      expanded: true,
    },
  },
  render: (props) => (
    <Table>
      <Tr>
        <UserInfoCell {...props} />
      </Tr>
    </Table>
  ),
};

export default meta;
type Story = StoryObj<typeof UserInfoCell>;

export const Default: Story = {
  args: {
    name: USERS[0].name,
    imageURL: USERS[0].image,
    address: 'Jakarta, Indonesia',
    time: '2 days ago',
    role: 'Finance managers',
  },
};
