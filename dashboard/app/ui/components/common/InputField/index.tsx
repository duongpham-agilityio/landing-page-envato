import {
  ChangeEvent,
  ReactNode,
  memo,
  useCallback,
  forwardRef,
  ForwardedRef,
} from 'react';
import {
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  InputProps,
  FormControl,
  FormLabel,
  FormErrorMessage,
} from '@chakra-ui/react';

type TInputFieldProps = Omit<InputProps, 'onChange'> & {
  isValidate?: boolean;
  isError?: boolean;
  errorMessages?: string;
  label?: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  onChange: (value: string) => void;
};

const InputComponent = (
  {
    isError = false,
    errorMessages = 'Default error', //
    label,
    leftIcon,
    rightIcon,
    onChange,
    ...rest
  }: TInputFieldProps,
  ref: ForwardedRef<HTMLInputElement>,
): JSX.Element => {
  const handleChangeValue = useCallback(
    (e: ChangeEvent<HTMLInputElement>): void => onChange(e.target.value),
    [onChange],
  );

  return (
    <FormControl isInvalid={isError}>
      {/* TODO: Will update later */}
      {label && (
        <FormLabel
          color="text.secondary"
          marginInlineEnd={0}
          minW="max-content"
        >
          {label}
        </FormLabel>
      )}
      <InputGroup w="inherit">
        {leftIcon && (
          <InputLeftElement pointerEvents="none">{leftIcon}</InputLeftElement>
        )}
        <Input
          type="text"
          color="secondary.450"
          onChange={handleChangeValue}
          ref={ref}
          {...rest}
          isInvalid={isError}
        />
        {rightIcon && (
          <InputRightElement
            type="button"
            as="button"
            _hover={{
              borderColor: 'transparent',
              outline: 'none',
            }}
            _focus={{
              borderColor: 'transparent',
              outline: 'none',
            }}
          >
            {rightIcon}
          </InputRightElement>
        )}
      </InputGroup>
      {isError && <FormErrorMessage>{errorMessages}</FormErrorMessage>}
    </FormControl>
  );
};

const InputField = memo(forwardRef(InputComponent));

export default InputField;
