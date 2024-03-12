'use client';

// import Link from 'next/link';
import Image from 'next/image';
import { memo, useCallback, useMemo, useState } from 'react';
import { Box, Flex, Td, Text, Th, useToast } from '@chakra-ui/react';

// Components
import {
  Table,
  Pagination,
  HeadCell,
  SearchBar,
  Fetching,
  ActionCell,
  StatusCell,
  ProductNameCell,
  Modal,
  Button,
  ProductForm,
  Indicator,
} from '@/ui/components';

// Hooks
import {
  useDebounce,
  usePagination,
  useProducts,
  useSearch,
} from '@/lib/hooks';

// Utils
import {
  generatePlaceholder,
  formatProductResponse,
  customToast,
} from '@/lib/utils';

// Constants
import {
  MONTHS_OPTIONS,
  ROLES,
  COLUMNS_PRODUCTS,
  STATUS_LABEL,
  SUCCESS_MESSAGES,
  STATUS,
  ERROR_MESSAGES,
} from '@/lib/constants';

// Types
import {
  TProductRequest,
  TDataSource,
  THeaderTable,
  TProduct,
} from '@/lib/interfaces';

// Stores
import { authStore } from '@/lib/stores';

interface TFilterUserProps {
  isOpenHistoryModal?: boolean;
}

const ProductsTableComponent = ({
  isOpenHistoryModal = false,
}: TFilterUserProps) => {
  const toast = useToast();
  const userId = authStore((state) => state.user?.id);
  const { get, setSearchParam: setSearchTransaction } = useSearch();
  // const [filter, setFilter] = useState<string>('');
  const [isOpenConfirmModal, setIsOpenConfirmModal] = useState(false);

  const handleToggleModal = () => setIsOpenConfirmModal((prev) => !prev);

  const { products } = useProducts({
    name: get('name') || '',
  });

  const {
    data,
    filterData,
    arrOfCurrButtons,
    isDisabledPrev,
    isDisableNext,
    resetPage,
    handleChangeLimit,
    handlePageChange,
    handlePageClick,
  } = usePagination(products);

  const { createProduct, isCreateProduct, deleteProduct } = useProducts();

  const handleDebounceSearch = useDebounce((value: string) => {
    resetPage();
    setSearchTransaction('name', value);
  }, []);

  const handleCreateProduct = useCallback(
    (product: Omit<TProductRequest, '_id'>) => {
      createProduct(
        {
          ...product,
        },
        {
          onSuccess: () => {
            toast(
              customToast(
                SUCCESS_MESSAGES.CREATE_PRODUCT_SUCCESS.title,
                SUCCESS_MESSAGES.CREATE_PRODUCT_SUCCESS.description,
                STATUS.SUCCESS,
              ),
            );
          },
          onError: () => {
            toast(
              customToast(
                ERROR_MESSAGES.UPDATE_TRANSACTION_FAIL.title,
                ERROR_MESSAGES.UPDATE_TRANSACTION_FAIL.description,
                STATUS.ERROR,
              ),
            );
          },
        },
      );
    },
    [createProduct, toast],
  );

  const handleDeleteProduct = useCallback(
    (data: Partial<TProduct & { userId: string; productId: string }>) => {
      deleteProduct(
        {
          productId: data._id,
          userId: userId,
        },
        {
          onSuccess: () => {
            toast(
              customToast(
                SUCCESS_MESSAGES.DELETE_SUCCESS.title,
                SUCCESS_MESSAGES.DELETE_SUCCESS.description,
                STATUS.SUCCESS,
              ),
            );
          },
          onError: () => {
            toast(
              customToast(
                ERROR_MESSAGES.DELETE_FAIL.title,
                ERROR_MESSAGES.DELETE_FAIL.description,
                STATUS.ERROR,
              ),
            );
          },
        },
      );
    },
    [deleteProduct, toast, userId],
  );

  const renderHead = useCallback((title: string): JSX.Element => {
    // TODO: handle click sort
    const handleClick = () => {};

    if (!title) return <Th w={50} maxW={50} />;

    return <HeadCell key={title} title={title} onClick={handleClick} />;
  }, []);

  const renderNameUser = useCallback(
    ({ id, _id, name }: TDataSource): JSX.Element => (
      <ProductNameCell _id={_id} key={id} name={name} />
    ),
    [],
  );

  const renderGallery = useCallback(
    ({ imageURLs, name }: TDataSource) => (
      <Td
        py={5}
        pr={5}
        pl={0}
        fontSize="md"
        color="text.primary"
        fontWeight="semibold"
        textAlign="left"
        w={{ base: 350, xl: 220, '3xl': 300, '4xl': 200, '6xl': 250 }}
      >
        <Flex
          alignItems="center"
          gap="10px"
          w={{ base: 240, '3xl': 200, '5xl': 240 }}
          borderRadius="15px"
          paddingLeft="20px"
        >
          <Box pos="relative" w={100} h={100}>
            <Image
              src={`${imageURLs}`}
              alt={`Image of ${name}`}
              fill
              sizes="100vw"
              placeholder="blur"
              blurDataURL={generatePlaceholder(40, 40)}
              style={{
                objectFit: 'cover',
                borderRadius: '15px',
              }}
            />
          </Box>
        </Flex>
      </Td>
    ),
    [],
  );

  const renderPrice = useCallback(
    ({ amount }: TProduct) => (
      <Td
        py={5}
        pr={5}
        pl={0}
        fontSize="md"
        color="text.primary"
        fontWeight="semibold"
        textAlign="left"
        w={{ base: 150, md: 20 }}
      >
        <Text
          fontSize="md"
          fontWeight="semibold"
          whiteSpace="break-spaces"
          noOfLines={1}
          w={{ base: 100, md: 220, '3xl': 300, '5xl': 200, '7xl': 250 }}
          flex={1}
        >
          {amount}
        </Text>
      </Td>
    ),
    [],
  );

  const renderQuantity = useCallback(
    ({ stock }: TProduct) => (
      <Td
        py={5}
        pr={5}
        pl={0}
        fontSize="md"
        color="text.primary"
        fontWeight="semibold"
        textAlign="left"
        w={{ base: 150, md: 20 }}
      >
        <Text
          fontSize="md"
          fontWeight="semibold"
          whiteSpace="break-spaces"
          noOfLines={1}
          w={{ base: 100, md: 220, '3xl': 300, '5xl': 200, '7xl': 200 }}
          flex={1}
        >
          {stock}
        </Text>
      </Td>
    ),
    [],
  );

  type TStatus = keyof typeof STATUS_LABEL;

  const renderProductStatus = useCallback(
    ({ productStatus }: TDataSource): JSX.Element => (
      <StatusCell
        variant={STATUS_LABEL[`${productStatus}` as TStatus]}
        text={productStatus as string}
      />
    ),
    [],
  );

  const renderActionIcon = useCallback(
    (data: TProduct) => (
      <ActionCell
        product={data}
        key={`${data._id}-action`}
        isOpenModal={true}
        onDeleteProduct={handleDeleteProduct}
        onUpdateTransaction={() => console.log()}
      />
    ),
    [handleDeleteProduct],
  );

  const columns = useMemo(
    () =>
      COLUMNS_PRODUCTS(
        renderHead,
        renderNameUser,
        renderGallery,
        renderPrice,
        renderProductStatus,
        renderQuantity,
        renderActionIcon,
      ),
    [
      renderHead,
      renderNameUser,
      renderGallery,
      renderPrice,
      renderQuantity,
      renderProductStatus,
      renderActionIcon,
    ],
  );

  return (
    <>
      <Flex>
        <SearchBar
          filterOptions={isOpenHistoryModal ? MONTHS_OPTIONS : ROLES}
          searchValue={get('name') || ''}
          onSearch={handleDebounceSearch}
          // onFilter={setFilter}
        />
        <Button
          w={200}
          type="button"
          role="button"
          aria-label="Add User"
          colorScheme="primary"
          bg="primary.300"
          textTransform="capitalize"
          onClick={handleToggleModal}
          marginLeft="20px"
        >
          Add Product
        </Button>
      </Flex>
      <Fetching
        quality={15}
        // isLoading={isLoadingTransactions}
        // isError={isTransactionsError}
      >
        <Box mt={5}>
          <Table
            columns={columns as unknown as THeaderTable[]}
            dataSource={formatProductResponse(filterData)}
          />
        </Box>
        {!!products.length && (
          <Box mt={8}>
            <Pagination
              pageSize={data.limit}
              currentPage={data.currentPage}
              isDisabledPrev={isDisabledPrev}
              isDisableNext={isDisableNext}
              arrOfCurrButtons={arrOfCurrButtons}
              onLimitChange={handleChangeLimit}
              onPageChange={handlePageChange}
              onClickPage={handlePageClick}
            />
          </Box>
        )}
      </Fetching>

      {isOpenConfirmModal && (
        <Indicator isOpen={isCreateProduct}>
          <Modal
            isOpen={isOpenConfirmModal}
            onClose={handleToggleModal}
            title="Add User"
            body={
              <ProductForm
                onCloseModal={handleToggleModal}
                onCreateProduct={handleCreateProduct}
              />
            }
            haveCloseButton
          />
        </Indicator>
      )}
    </>
  );
};

const ProductionsTable = memo(ProductsTableComponent);

export default ProductionsTable;
