'use client';

import { memo, useCallback, useMemo } from 'react';
import { Controller, useForm } from 'react-hook-form';

// Components
import { Button, Flex, VStack } from '@chakra-ui/react';
import InputField from '@/ui/components/common/InputField';

// Interfaces
import { TProduct } from '@/lib/interfaces';

// Constants
import { AUTH_SCHEMA, STATUS_SUBMIT } from '@/lib/constants';

interface ProductProps {
  product?: TProduct;
  onDeleteProduct?: () => void;
  onCreateProduct?: (productData: Omit<TProduct, 'id'>) => void;
  onUpdateProduct?: (productData: TProduct) => void;
  onCloseModal?: () => void;
}

const ProductForm = ({
  product,
  onCreateProduct,
  onUpdateProduct,
  onCloseModal,
}: ProductProps) => {
  const {
    control,
    formState: { isDirty },
    clearErrors,
    handleSubmit,
    reset,
  } = useForm<TProduct>({
    defaultValues: {
      id: product?.id,
      name: product?.name,
      imageURLs: product?.imageURLs,
      price: product?.price,
      stock: product?.stock,
      description: product?.description,
      createdAt: product?.createdAt,
    },
  });

  const disabled = useMemo(
    () => !isDirty || status === STATUS_SUBMIT.PENDING,
    [isDirty],
  );

  const handleChangeValue = useCallback(
    <T,>(field: keyof TProduct, changeHandler: (value: T) => void) =>
      (data: T) => {
        clearErrors(field);
        changeHandler(data);
      },
    [clearErrors],
  );

  const handleSubmitForm = useCallback(
    (dataInfo: TProduct) => {
      const requestData = {
        ...dataInfo,
        stock: Number(dataInfo.stock),
        price: Number(dataInfo.price),
      };

      dataInfo.id
        ? onUpdateProduct && onUpdateProduct(requestData)
        : onCreateProduct && onCreateProduct(requestData);
      reset(requestData);
      onCloseModal && onCloseModal();
    },
    [onCloseModal, onCreateProduct, onUpdateProduct, reset],
  );

  return (
    <VStack
      as="form"
      id="update-product-form"
      onSubmit={handleSubmit(handleSubmitForm)}
    >
      <Flex mb={2}>
        <Controller
          control={control}
          rules={AUTH_SCHEMA.NAME}
          name="name"
          render={({ field, field: { onChange }, fieldState: { error } }) => (
            <InputField
              variant="authentication"
              bg="background.body.primary"
              label="Name"
              mr={2}
              {...field}
              isError={!!error}
              errorMessages={error?.message}
              onChange={handleChangeValue('name', onChange)}
              data-testid="edit-field-name"
            />
          )}
        />
        <Controller
          control={control}
          rules={AUTH_SCHEMA.PRICE}
          name="price"
          render={({ field, fieldState: { error } }) => (
            <InputField
              typeInput="number"
              variant="authentication"
              bg="background.body.primary"
              label="Price"
              {...field}
              isError={!!error}
              errorMessages={error?.message}
              onChange={handleChangeValue('price', field.onChange)}
            />
          )}
        />
      </Flex>
      <Flex mb={2}>
        <Controller
          control={control}
          rules={AUTH_SCHEMA.QUANTITY}
          name="stock"
          render={({ field, field: { onChange }, fieldState: { error } }) => (
            <InputField
              typeInput="number"
              variant="authentication"
              bg="background.body.primary"
              label="Quantity"
              mr={2}
              {...field}
              isError={!!error}
              errorMessages={error?.message}
              onChange={handleChangeValue('stock', onChange)}
            />
          )}
        />
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

      <Controller
        control={control}
        rules={AUTH_SCHEMA.GALLERY_THUMBNAIL}
        name="imageURLs"
        render={({ field, fieldState: { error } }) => (
          <InputField
            variant="authentication"
            bg="background.body.primary"
            label="Gallery Thumbnail"
            {...field}
            isError={!!error}
            errorMessages={error?.message}
            onChange={handleChangeValue('imageURLs', field.onChange)}
          />
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
