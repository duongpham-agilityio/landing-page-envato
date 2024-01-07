import { StoryObj, Meta } from '@storybook/react';
import { CloseIcon } from '@chakra-ui/icons';
import InputField from '.';

const defaultProps = {
  name: 'email',
  placeholder: 'Email',
  onChange: () => {},
};

const meta: Meta<typeof InputField> = {
  title: 'Custom Components/InputField',
  tags: ['autodocs'],
  component: InputField,
  argTypes: {
    name: {
      description: 'The name of the input field',
      defaultValue: 'email',
    },

    placeholder: {
      description: 'The placeholder for the input field',
      defaultValue: 'email',
    },

    isValidate: {
      description:
        'The validation state of the input field (the default state is false)',
    },

    isError: {
      description:
        'The error state of the input field (the default state is false)',
    },

    errorMessages: {
      description: 'The error messages of the input field',
      defaultValue: 'Default error',
    },

    label: {
      description: 'The label for the input field',
    },
    leftIcon: {
      description: 'The icon on the left of the input field',
    },

    rightIcon: {
      description: 'The icon on the right of the input field',
    },

    onChange: {
      description:
        'The onChange function that handles the change of the input field',
      action: 'onChange',
    },
  },
  parameters: {
    controls: {
      expanded: true,
    },
  },
};

export default meta;
type Story = StoryObj<typeof InputField>;

export const Default: Story = {
  args: {
    ...defaultProps,
  },
};

export const Secondary: Story = {
  args: {
    ...defaultProps,
    variant: 'secondary',
  },
};

export const Authentication: Story = {
  args: {
    ...defaultProps,
    variant: 'authentication',
  },
};

export const HasLeftIcon: Story = {
  args: {
    ...defaultProps,
    leftIcon: <CloseIcon />,
  },
};

export const HasRightIcon: Story = {
  args: {
    ...defaultProps,
    rightIcon: <CloseIcon />,
  },
};

export const HasError: Story = {
  args: {
    ...defaultProps,
    variant: 'authentication',
    isValidate: true,
    isError: true,
  },
};
