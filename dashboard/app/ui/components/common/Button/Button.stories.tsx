import type { Meta, StoryObj } from '@storybook/react';
import { PhoneIcon, AddIcon } from '@chakra-ui/icons';

// components
import { Button } from '@/ui/components';
const meta: Meta<typeof Button> = {
  title: 'Custom Components/Button',
  tags: ['autodocs'],
  component: Button,
  argTypes: {
    leftIcon: {
      description: 'The left react element icon of the button',
    },

    rightIcon: {
      description: 'The right react element icon of the button',
    },

    onClick: {
      description: 'The click event handling function',
      action: 'clicked',
    },

    children: {
      description:
        'The children of the button, e.g. text, react components, etc.',
    },
  },
  parameters: {
    controls: {
      expanded: true,
    },
  },
};

export default meta;

type Story = StoryObj<typeof Button>;

export const ExtraLarge: Story = {
  args: {
    size: 'xl',
    children: 'Extra Large Button',
  },
};

export const Large: Story = {
  args: {
    size: 'lg',
    children: 'Large Button',
  },
};

export const Medium: Story = {
  args: {
    size: 'md',
    children: 'Medium Button',
  },
};

export const Small: Story = {
  args: {
    size: 'sm',
    children: 'Small Button',
  },
};

export const ExtraSmall: Story = {
  args: {
    size: 'xs',
    children: 'Extra Small Button',
  },
};

export const LeftIcon: Story = {
  args: {
    leftIcon: <AddIcon />,
    size: 'xs',
    children: 'Button with left icon',
  },
};

export const RightIcon: Story = {
  args: {
    rightIcon: <PhoneIcon />,
    size: 'xs',
    children: 'Button with right icon',
  },
};

export const Disable: Story = {
  args: {
    size: 'lg',
    children: 'Disabled Button',
    isDisabled: true,
  },
};

export const Loading: Story = {
  args: {
    size: 'lg',
    children: 'Loading Button',
    isLoading: true,
  },
};
