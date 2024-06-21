'use client';

// Libs
import { memo, useCallback, useMemo, useState } from 'react';
import { Box, Flex, useToast } from '@chakra-ui/react';

// Constants
import {
  COLUMNS_PRODUCTS,
  STATUS_LABEL,
  SUCCESS_MESSAGES,
  STATUS,
  ERROR_MESSAGES,
  FILTER_PRODUCT,
  PRODUCT_STATUS,
  PREV,
} from '@/lib/constants';

// Hooks
import {
  useDebounce,
  useProducts,
  useSearch,
  useUploadImages,
} from '@/lib/hooks';

// Stores
import { authStore } from '@/lib/stores';

// Utils
import { formatProductResponse, customToast } from '@/lib/utils';

// Types
import {
  TProductRequest,
  THeaderTable,
  TProduct,
  TProductResponse,
  TProductSortField,
} from '@/lib/interfaces';

// Components
import {
  Table,
  Pagination,
  SearchBar,
  Fetching,
  ActionCell,
  StatusCell,
  Modal,
  Button,
  ProductForm,
  Indicator,
  HeadCell,
} from '@/ui/components';
import { TOption } from '../common/Select';
import GalleryCell from './GalleryCell';
import PriceCell from './PriceCell';
import QuantityCell from './QuantityCell';
import NameCell from './NameCell';

const ProductsTable = () => {
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
    limit,
    currentPage,
    sortBy,
    createProduct,
    deleteProduct,
    updateProduct,
    resetPage,
    setCurrentPage,
    setLimit,
    isCreateProduct,
    isDeleteProduct,
    isUpdateProduct,
    isDisableNext,
    isDisablePrev,
    pageArray,
  } = useProducts({
    name: get('keyword')?.toLowerCase() || '',
  });

  // Upload images
  const { uploadImages, isPending: isUploadImages } = useUploadImages();

  const productsMemorized = useMemo(
    () =>
      products?.filter(({ stock }) =>
        +stock > 0
          ? PRODUCT_STATUS.IN_STOCK.includes(filter.trim())
          : PRODUCT_STATUS.SOLD.includes(filter.trim()),
      ),
    [filter, products],
  );

  const handleDebounceSearch = useDebounce((value: string) => {
    resetPage();
    setSearchTransaction('keyword', value);
  }, []);

  const handleClickPage = (value: number) => setCurrentPage(value);

  const handlePageChange = useCallback(
    (direction: string) => {
      setCurrentPage(direction === PREV ? currentPage - 1 : currentPage + 1);
    },
    [currentPage, setCurrentPage],
  );

  const handleChangeLimit = useCallback(
    (limit: TOption) => {
      setLimit(+limit.value);
      resetPage();
    },
    [resetPage, setLimit],
  );

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
                ERROR_MESSAGES.CREATE_TRANSACTION_FAIL.title,
                ERROR_MESSAGES.CREATE_TRANSACTION_FAIL.description,
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
    (title: string, key: TProductSortField): JSX.Element => (
      <HeadCell title={title} columnKey={key} onSort={sortBy} />
    ),
    [sortBy],
  );

  const renderNameUser = useCallback(
    ({ name }: TProduct): JSX.Element => <NameCell name={name} />,
    [],
  );

  const renderGallery = useCallback(({ imageURLs, name }: TProduct) => {
    const imageURL = imageURLs[0];

    return <GalleryCell imageURL={imageURL} name={name} />;
  }, []);

  const renderPrice = useCallback(
    ({ amount }: TProduct) => <PriceCell price={amount} />,
    [],
  );

  const renderQuantity = useCallback(
    ({ stock }: TProduct) => <QuantityCell quantity={stock} />,
    [],
  );

  const renderProductStatus = useCallback(
    ({ productStatus }: TProduct): JSX.Element => (
      <StatusCell
        variant={STATUS_LABEL[`${productStatus}`]}
        text={productStatus}
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
        onUploadImages={uploadImages}
        onDeleteProduct={handleDeleteProduct}
        onUpdateProduct={handleUpdateProduct}
      />
    ),
    [handleDeleteProduct, handleUpdateProduct, uploadImages],
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
    <Indicator
      isOpen={
        isCreateProduct || isDeleteProduct || isUpdateProduct || isUploadImages
      }
    >
      <Flex flexDirection={{ base: 'column', lg: 'row' }}>
        <SearchBar
          placeholder="Search by name"
          filterOptions={FILTER_PRODUCT}
          searchValue={get('keyword')?.toLowerCase() || ''}
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
            dataSource={formatProductResponse(productsMemorized)}
          />
        </Box>
      </Fetching>
      <Pagination
        pageSize={limit}
        currentPage={currentPage}
        isDisabledPrev={isDisablePrev}
        isDisableNext={isDisableNext}
        arrOfCurrButtons={pageArray}
        onLimitChange={handleChangeLimit}
        onPageChange={handlePageChange}
        onClickPage={handleClickPage}
      />

      {isOpenConfirmModal && (
        <Modal
          isOpen={isOpenConfirmModal}
          onClose={handleToggleModal}
          title="Add Product"
          body={
            <ProductForm
              onCloseModal={handleToggleModal}
              onCreateProduct={handleCreateProduct}
              uploadImages={uploadImages}
            />
          }
          haveCloseButton
        />
      )}
    </Indicator>
  );
};

const ProductionsTableMemorized = memo(ProductsTable);

export default ProductionsTableMemorized;
