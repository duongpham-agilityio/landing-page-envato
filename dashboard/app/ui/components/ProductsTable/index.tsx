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
import { TProductSortField } from '@/lib/hooks/useProducts';

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
  PRODUCT_STATUS,
  IMAGES,
} from '@/lib/constants';

// Types
import {
  TProductRequest,
  TDataSource,
  THeaderTable,
  TProduct,
  TProductResponse,
} from '@/lib/interfaces';

// Stores
import { authStore } from '@/lib/stores';

const ProductsTableComponent = () => {
  const toast = useToast();
  const userId = authStore((state) => state.user?.id);
  const { get, setSearchParam: setSearchTransaction } = useSearch();
  const [filter, setFilter] = useState<string>('');
  const [isOpenConfirmModal, setIsOpenConfirmModal] = useState(false);

  const handleToggleModal = () => setIsOpenConfirmModal((prev) => !prev);

  const {
    products,
    isLoading: isLoadingProducts,
    isError: isProductsError,
    sortBy,
    createProduct,
    deleteProduct,
    updateProduct,
    isCreateProduct,
    isDeleteProduct,
    isUpdateProduct,
  } = useProducts({
    name: get('name') || '',
  });

  const productsMemorized = useMemo(
    () =>
      products?.filter(({ stock }) => {
        if (+stock > 0) {
          return PRODUCT_STATUS.IN_STOCK.includes(filter.trim());
        } else {
          return PRODUCT_STATUS.SOLD.includes(filter.trim());
        }
      }),
    [filter, products],
  );

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
  } = usePagination(productsMemorized);

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
                SUCCESS_MESSAGES.DELETE_PRODUCT_SUCCESS.title,
                SUCCESS_MESSAGES.DELETE_PRODUCT_SUCCESS.description,
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

  const handleUpdateProduct = useCallback(
    (data: TProductRequest) => {
      updateProduct(
        {
          productId: data._id,
          userId: userId,
          name: data?.name,
          imageURLs: data?.imageURLs,
          currency: data?.currency,
          amount: data?.amount,
          stock: data?.stock,
          description: data?.description,
          createdAt: data?.createdAt,
        },
        {
          onSuccess: () => {
            toast(
              customToast(
                SUCCESS_MESSAGES.UPDATE_PRODUCT_SUCCESS.title,
                SUCCESS_MESSAGES.UPDATE_PRODUCT_SUCCESS.description,
                STATUS.SUCCESS,
              ),
            );
          },
          onError: () => {
            toast(
              customToast(
                ERROR_MESSAGES.UPDATE_PRODUCT_FAIL.title,
                ERROR_MESSAGES.UPDATE_PRODUCT_FAIL.description,
                STATUS.ERROR,
              ),
            );
          },
        },
      );
    },
    [toast, updateProduct, userId],
  );

  const renderHead = useCallback(
    (title: string, key: string): JSX.Element => {
      const handleClick = () => {
        sortBy && sortBy(key as TProductSortField);
      };

      if (!title) return <Th w={50} maxW={50} />;

      return <HeadCell key={title} title={title} onClick={handleClick} />;
    },
    [toast, updateProduct, userId],
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
        w={{ base: 150, md: 20 }}
      >
        <Flex
          alignItems="center"
          gap="10px"
          minW={180}
          borderRadius="15px"
          paddingLeft={{ base: 30 }}
        >
          <Box
            pos="relative"
            w={{ base: 50, lg: 100 }}
            h={{ base: 50, lg: 100 }}
          >
            <Image
              src={imageURLs?.toString() || IMAGES.SIGN_UP.url}
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
      >
        <Text
          fontSize="md"
          fontWeight="semibold"
          whiteSpace="break-spaces"
          noOfLines={1}
          w={{ base: 100, md: 220, '3xl': 150, '5xl': 200 }}
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
          w={{ base: 100, md: 220, '3xl': 150, '5xl': 200 }}
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
    (data: TProductResponse) => (
      <ActionCell
        product={data}
        key={`${data._id}-action`}
        isOpenModal={true}
        titleDelete="Delete Product"
        itemName={data.name}
        onDeleteProduct={handleDeleteProduct}
        onUpdateProduct={handleUpdateProduct}
      />
    ),
    [handleDeleteProduct, handleUpdateProduct],
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
    <Indicator isOpen={isCreateProduct || isDeleteProduct || isUpdateProduct}>
      <Flex flexDirection={{ base: 'column', lg: 'row' }}>
        <SearchBar
          placeholder="Search by name"
          filterOptions={FILTER_PRODUCT}
          searchValue={get('name')?.toLowerCase() || ''}
          onSearch={handleDebounceSearch}
          onFilter={setFilter}
        />
        <Button
          w={{ base: 'none', lg: 200 }}
          type="button"
          role="button"
          aria-label="Add User"
          colorScheme="primary"
          bg="primary.500"
          textTransform="capitalize"
          onClick={handleToggleModal}
          marginLeft={{ base: 'initial', lg: '20px' }}
          data-testid="button-add"
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
        {!!products?.length && (
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
        <Modal
          isOpen={isOpenConfirmModal}
          onClose={handleToggleModal}
          title="Add Product"
          body={
            <ProductForm
              onCloseModal={handleToggleModal}
              onCreateProduct={handleCreateProduct}
            />
          }
          haveCloseButton
        />
      )}
    </Indicator>
  );
};

const ProductionsTable = memo(ProductsTableComponent);

export default ProductionsTable;
