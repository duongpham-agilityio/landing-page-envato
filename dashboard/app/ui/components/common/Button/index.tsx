import { Button, ButtonProps } from '@chakra-ui/react';
import { ReactElement, ReactNode, memo } from 'react';

export type TButtonProps = ButtonProps & {
  leftIcon?: ReactElement;
  rightIcon?: ReactElement;
  onClick?: () => void;
  children: ReactNode;
};

const ButtonComponent = ({ children, ...rest }: TButtonProps) => (
  <Button {...rest}>{children}</Button>
);

const CustomButton = memo(ButtonComponent);

export default CustomButton;
