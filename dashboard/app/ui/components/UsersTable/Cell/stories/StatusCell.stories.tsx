import { StoryObj, Meta } from '@storybook/react';
import { Table, Tr } from '@chakra-ui/react';

// Component
import StatusCell from '@/ui/components/UsersTable/Cell/StatusCell';

const meta: Meta<typeof StatusCell> = {
  title: 'Custom Components/Users/Cell/StatusCell',
  tags: ['autodocs'],
  component: StatusCell,
  parameters: {
    controls: {
      expanded: true,
    },
  },
  render: (props) => (
    <Table>
      <Tr>
        <StatusCell {...props} />
      </Tr>
    </Table>
  ),
};

export default meta;
type Story = StoryObj<typeof StatusCell>;

export const Primary: Story = {
  args: {
    text: 'Full time',
    variant: 'primary',
  },
};

export const Secondary: Story = {
  args: {
    text: 'part time',
    variant: 'secondary',
  },
};

export const Tertiary: Story = {
  args: {
    text: 'Senior level',
    variant: 'tertiary',
  },
};

export const Quaternary: Story = {
  args: {
    text: 'Junior level',
    variant: 'quaternary',
  },
};
