import { Button, ButtonProps } from '@chakra-ui/react';
import { ReactElement, ReactNode, memo } from 'react';
import isEqual from 'react-fast-compare';

export type TButtonProps = ButtonProps & {
  leftIcon?: ReactElement;
  rightIcon?: ReactElement;
  onClick?: () => void;
  children: ReactNode;
};

const ButtonComponent = ({ children, ...rest }: TButtonProps) => (
  <Button {...rest}>{children}</Button>
);

const CustomButton = memo(ButtonComponent, isEqual);

export default CustomButton;
