'use client';

import { memo, useCallback, useMemo } from 'react';
import { Controller, useForm } from 'react-hook-form';

// Components
import {
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  VStack,
  useToast,
} from '@chakra-ui/react';
import InputField from '@/ui/components/common/InputField';
import { UploadImages } from '@/ui/components';

// Interfaces
import { TProductRequest, TProductResponse } from '@/lib/interfaces';

// Constants
import {
  AUTH_SCHEMA,
  CURRENCY_PRODUCT,
  SHOW_TIME,
  STATUS_SUBMIT,
} from '@/lib/constants';

// Stores
import { authStore } from '@/lib/stores';

// Utils
import { formatAmountNumber, parseFormattedNumber } from '@/lib/utils';

interface ProductProps {
  data?: TProductResponse;
  onCreateProduct?: (productData: Omit<TProductRequest, 'id'>) => void;
  onUpdateProduct?: (productData: TProductRequest) => void;
  onCloseModal?: () => void;
}

const ProductForm = ({
  data,
  onCreateProduct,
  onUpdateProduct,
  onCloseModal,
}: ProductProps) => {
  const toast = useToast();
  const {
    control,
    formState: { isDirty },
    clearErrors,
    handleSubmit,
    reset,
  } = useForm<TProductRequest>({
    defaultValues: {
      _id: data?.product._id,
      name: data?.product.name,
      imageURLs: data?.product.imageURLs,
      currency: data?.product.currency || CURRENCY_PRODUCT,
      amount: data?.product.amount,
      stock: data?.product.stock,
      description: data?.product.description,
      createdAt: data?.product.createdAt,
    },
  });
  const userId = authStore((state) => state.user?.id);
  const disabled = useMemo(
    () => !isDirty || status === STATUS_SUBMIT.PENDING,
    [isDirty],
  );

  const handleChangeValue = useCallback(
    <T,>(field: keyof TProductRequest, changeHandler: (value: T) => void) =>
      (data: T) => {
        clearErrors(field);
        changeHandler(data);
      },
    [clearErrors],
  );

  const handleSubmitForm = useCallback(
    (data: TProductRequest) => {
      const requestData = {
        ...data,
        stock: parseFormattedNumber(data.stock).toString(),
        amount: parseFormattedNumber(data.amount).toString(),
        userId,
      };
      data._id
        ? onUpdateProduct && onUpdateProduct(requestData)
        : onCreateProduct && onCreateProduct(requestData);
      reset(requestData);
      onCloseModal && onCloseModal();
    },
    [onCloseModal, onCreateProduct, onUpdateProduct, reset, userId],
  );

  const handleShowErrorWhenUploadImage = useCallback(
    (message: string) => {
      toast({
        description: message,
        status: 'error',
        duration: SHOW_TIME,
        position: 'top-right',
      });
    },
    [toast],
  );

  return (
    <VStack
      as="form"
      id="update-product-form"
      onSubmit={handleSubmit(handleSubmitForm)}
    >
      <Flex w={{ base: '100%' }} flexDirection={{ base: 'column', md: 'row' }}>
        <Flex mb={{ base: 5, sm: 5 }} w="100%">
          <Controller
            control={control}
            rules={AUTH_SCHEMA.NAME}
            name="name"
            render={({ field, field: { onChange }, fieldState: { error } }) => (
              <InputField
                variant="authentication"
                bg="background.body.primary"
                label="Name"
                mr={{ md: 2 }}
                {...field}
                isError={!!error}
                errorMessages={error?.message}
                onChange={handleChangeValue('name', onChange)}
                data-testid="edit-field-name"
              />
            )}
          />
        </Flex>
        <Flex mb={{ base: 5, sm: 5 }} w="100%">
          <Controller
            control={control}
            rules={AUTH_SCHEMA.AMOUNT}
            name="amount"
            defaultValue=""
            render={({ field: { value, onChange }, fieldState: { error } }) => {
              const handleChange = (
                event: React.ChangeEvent<HTMLInputElement>,
              ) => {
                const value: string = event.target.value;

                if (isNaN(+value.replaceAll(',', ''))) return;

                // Remove non-numeric characters and leading zeros
                const sanitizedValue = formatAmountNumber(value);

                onChange(sanitizedValue);
              };

              return (
                <FormControl isInvalid={!!error}>
                  <FormLabel
                    color="text.secondary"
                    marginInlineEnd={0}
                    minW="max-content"
                  >
                    Price
                  </FormLabel>
                  <Input
                    bg="background.body.primary"
                    variant="authentication"
                    type="text"
                    placeholder="0.00"
                    color="text.primary"
                    fontSize="1xl"
                    value={formatAmountNumber(value?.toString())}
                    name="amount"
                    onChange={handleChange}
                    autoComplete="off"
                    position="static"
                    isInvalid={!!error}
                    data-testid="field-amount"
                  />
                  {!!error && (
                    <FormErrorMessage>{error?.message}</FormErrorMessage>
                  )}
                </FormControl>
              );
            }}
          />
        </Flex>
      </Flex>
      <Flex w={{ base: '100%' }} flexDirection={{ base: 'column', md: 'row' }}>
        <Flex w="100%" mb={{ base: 5, sm: 5 }}>
          <Controller
            control={control}
            rules={AUTH_SCHEMA.QUANTITY}
            name="stock"
            defaultValue=""
            render={({ field: { value, onChange }, fieldState: { error } }) => {
              const handleChange = (
                event: React.ChangeEvent<HTMLInputElement>,
              ) => {
                const value: string = event.target.value;

                if (isNaN(+value.replaceAll(',', ''))) return;

                // Remove non-numeric characters and leading zeros
                const sanitizedValue = formatAmountNumber(value);

                onChange(sanitizedValue);
              };

              return (
                <FormControl isInvalid={!!error} mr={{ md: 2 }} mb={{ sm: 2 }}>
                  <FormLabel
                    color="text.secondary"
                    marginInlineEnd={0}
                    minW="max-content"
                  >
                    Quantity
                  </FormLabel>
                  <Input
                    bg="background.body.primary"
                    variant="authentication"
                    type="text"
                    placeholder="0"
                    color="text.primary"
                    fontSize="1xl"
                    value={formatAmountNumber(value?.toString())}
                    name="quantity"
                    onChange={handleChange}
                    autoComplete="off"
                    position="static"
                    isInvalid={!!error}
                    data-testid="field-quantity"
                  />
                  {!!error && (
                    <FormErrorMessage>{error?.message}</FormErrorMessage>
                  )}
                </FormControl>
              );
            }}
          />
        </Flex>
        <Flex w="100%" mb={{ sm: 5 }}>
          <Controller
            control={control}
            name="description"
            render={({ field, fieldState: { error } }) => (
              <InputField
                variant="authentication"
                bg="background.body.primary"
                label="Description"
                {...field}
                isError={!!error}
                errorMessages={error?.message}
                onChange={handleChangeValue('description', field.onChange)}
              />
            )}
          />
        </Flex>
      </Flex>

      <Controller
        control={control}
        name="currency"
        render={({ field, fieldState: { error } }) => (
          <InputField
            variant="authentication"
            bg="background.body.primary"
            label="Currency"
            {...field}
            isError={!!error}
            errorMessages={error?.message}
            onChange={handleChangeValue('currency', field.onChange)}
            isDisabled
            defaultValue={CURRENCY_PRODUCT}
          />
        )}
      />

      <Controller
        control={control}
        name="imageURLs"
        render={({ field, fieldState: { error } }) => (
          <FormControl>
            <UploadImages
              label="Gallery Thumbnail"
              images={data?.product.imageURLs}
              onUploadError={handleShowErrorWhenUploadImage}
              onChange={field.onChange}
              isError={!!error}
            />
          </FormControl>
        )}
      />

      <Flex my={4}>
        <Button
          type="submit"
          form="update-product-form"
          data-testid="submit-product-form"
          w={44}
          bg="green.600"
          mr={3}
          isDisabled={disabled}
        >
          Save
        </Button>
        <Button
          w={44}
          bg="orange.300"
          _hover={{ bg: 'orange.400' }}
          onClick={onCloseModal}
        >
          Cancel
        </Button>
      </Flex>
    </VStack>
  );
};

const ProductFormMemorized = memo(ProductForm);
export default ProductFormMemorized;
