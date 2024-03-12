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
import { formatAmountNumber } from '@/lib/utils';

type TInputFieldProps = Omit<InputProps, 'onChange'> & {
  isValidate?: boolean;
  isError?: boolean;
  errorMessages?: string;
  label?: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  typeInput?: string;
  onChange: (value: string) => void;
};

const InputComponent = (
  {
    isError = false,
    errorMessages = 'Default error', //
    typeInput = 'text',
    label,
    leftIcon,
    rightIcon,
    onChange,
    ...rest
  }: TInputFieldProps,
  ref: ForwardedRef<HTMLInputElement>,
): JSX.Element => {
  const handleChangeValue = useCallback(
    (e: ChangeEvent<HTMLInputElement>): void => {
      const value: string = e.target.value;

      if (Number(value)) {
        if (isNaN(+value.replaceAll(',', ''))) return;

        // Remove non-numeric characters and leading zeros
        const sanitizedValue = formatAmountNumber(value);

        onChange(sanitizedValue);
      } else {
        onChange(value);
      }
    },
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
          type={typeInput}
          color="text.primary"
          onChange={handleChangeValue}
          ref={ref}
          {...rest}
          isInvalid={isError}
        />
        {rightIcon && (
          <InputRightElement
            aria-label="The eye icon"
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
            data-testid="right-icon-input"
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
