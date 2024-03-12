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
import { TSortField } from '@/lib/hooks/useProducts';

// Utils
import {
  generatePlaceholder,
  formatProductResponse,
  customToast,
} from '@/lib/utils';

// Constants
import {
  COLUMNS_PRODUCTS,
  STATUS_LABEL,
  SUCCESS_MESSAGES,
  STATUS,
  ERROR_MESSAGES,
  FILTER_PRODUCT,
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

const ProductsTableComponent = () => {
  const toast = useToast();
  const userId = authStore((state) => state.user?.id);
  const { get, setSearchParam: setSearchTransaction } = useSearch();
  // const [filter, setFilter] = useState<string>('');
  const [isOpenConfirmModal, setIsOpenConfirmModal] = useState(false);

  const handleToggleModal = () => setIsOpenConfirmModal((prev) => !prev);

  const {
    data: products = [],
    isCreateProduct,
    createProduct,
    deleteProduct,
    sortBy,
    isLoading: isLoadingProducts,
    isError: isProductsError,
  } = useProducts({
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

  const renderHead = useCallback(
    (title: string, key: string): JSX.Element => {
      const handleClick = () => {
        sortBy && sortBy(key as TSortField);
      };

      if (!title) return <Th w={50} maxW={50} />;

      return <HeadCell key={title} title={title} onClick={handleClick} />;
    },
    [sortBy],
  );

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
        minW={180}
      >
        <Flex
          alignItems="center"
          gap="10px"
          minW={180}
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
                objectFit: 'contain',
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
        minW={150}
      >
        <Text
          fontSize="md"
          fontWeight="semibold"
          whiteSpace="break-spaces"
          noOfLines={1}
          minW={150}
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
        minW={120}
      >
        <Text
          fontSize="md"
          fontWeight="semibold"
          whiteSpace="break-spaces"
          noOfLines={1}
          minW={120}
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
      <Flex flexDirection={{ base: 'column', md: 'row' }}>
        <SearchBar
          filterOptions={FILTER_PRODUCT}
          searchValue={get('name')?.toLowerCase() || ''}
          onSearch={handleDebounceSearch}
          // onFilter={setFilter}
        />
        <Button
          w={{ base: 'none', md: 200 }}
          type="button"
          role="button"
          aria-label="Add User"
          colorScheme="primary"
          bg="primary.300"
          textTransform="capitalize"
          onClick={handleToggleModal}
          marginLeft={{ base: 'initial', md: '20px' }}
        >
          Add Product
        </Button>
      </Flex>
      <Fetching
        quality={15}
        isLoading={isLoadingProducts}
        isError={isProductsError}
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
