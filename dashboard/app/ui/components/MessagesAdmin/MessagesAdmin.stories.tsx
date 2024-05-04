import { StoryObj, Meta } from '@storybook/react';

// Components
import MessageAdmin from './index';

const meta: Meta<typeof MessageAdmin> = {
  title: 'Custom Components/MessageAdmin',
  component: MessageAdmin,
  tags: ['autodocs'],
  argTypes: {
    content: {
      description: 'This is content message of supper admin or member',
    },
    userAvatar: {
      // src: IMAGES.CHAT_USER_AVATAR.url,
      description: 'This is image of user avatar',
    },
    adminAvatar: {
      // src: IMAGES.CHAT_USER_AVATAR.url,
      description: 'This is image of user avatar admin',
    },
    localeTime: {
      description: 'This is locale time message',
    },
  },
  parameters: {
    controls: {
      expanded: true,
    },
  },
};

export default meta;
type Story = StoryObj<typeof MessageAdmin>;

export const Default: Story = {
  args: {
    content: 'This is content message of supper admin or member',
  },
};

export const MessageAdminCard: Story = {
  args: {
    content: 'This is content message of supper admin or member',
    isSuperAdmin: true,
  },
};
