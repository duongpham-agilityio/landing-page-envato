import { useSearchParams, useRouter } from 'next/navigation';
import axios from 'axios';

// Components
import { ProductsTable } from '../..';

// Hooks
import * as hooks from '@/lib/hooks';

// Provider
import { QueryProvider } from '@/ui/providers';

// Mocks
import { PRODUCTS } from '@/lib/mocks';

// Constants
import { DEBOUNCE_TIME } from '@/lib/constants';

jest.mock('@/lib/hooks', () => ({
  ...jest.requireActual('@/lib/hooks'),
  usePagination: jest.fn(),
  useProducts: jest.fn(),
}));

jest.mock('@chakra-ui/react', () => ({
  ...jest.requireActual('@chakra-ui/react'),
  useToast: () => jest.fn(),
}));

jest.mock('axios');

const resetMock = jest.fn();
const sortByMock = jest.fn();
const createProductMock = jest.fn();
const deleteProductMock = jest.fn();
const updateProductMock = jest.fn();

const SORT_ICON = 'sort-icon';
const SEARCH_PRODUCT = 'search-transaction';
const DOT_ICON = 'dot-icon';
const DEL_ICON = 'del-icon';
const EDIT_ICON = 'edit-icon';
const ACCEPT_BUTTON = 'accept-del';
const BUTTON_ADD = 'button-add';
const FIELD_NAME = 'edit-field-name';
const FIELD_AMOUNT = 'field-amount';
const FIELD_QUANTITY = 'field-quantity';
// const FIELD_IMAGE = 'field-image';
const SUBMIT = 'submit-product-form';

const setup = () =>
  render(<ProductsTable />, {
    wrapper: QueryProvider,
  });

describe('Product table', () => {
  beforeEach(() => {
    jest.spyOn(hooks, 'usePagination').mockReturnValue({
      resetPage: resetMock,
      filterData: PRODUCTS,
      data: [1],
    } as unknown as ReturnType<typeof hooks.usePagination>);
    jest.spyOn(axios, 'get').mockResolvedValue(PRODUCTS);
    (useSearchParams as jest.Mock).mockReturnValue({
      get: jest.fn(),
      forEach: jest.fn(),
    });
    (useRouter as jest.Mock).mockReturnValue({
      push: jest.fn(),
    });
    jest.spyOn(hooks, 'useProducts').mockReturnValue({
      products: PRODUCTS,
      sortBy: sortByMock,
      isLoading: false,
      deleteProduct: deleteProductMock,
      updateProduct: updateProductMock,
      createProduct: createProductMock,
      isCreateProduct: false,
    } as unknown as ReturnType<typeof hooks.useProducts>);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('Match with snapshot with default prop', () => {
    const { container } = setup();

    waitFor(() => expect(container).toMatchSnapshot());
  });

  jest.useFakeTimers();
  it('Typing input search', async () => {
    const { getByTestId } = setup();
    const input = getByTestId(SEARCH_PRODUCT) as HTMLInputElement;

    await act(async () => {
      fireEvent.change(input, {
        target: {
          value: 'tay',
        },
      });
    });

    jest.advanceTimersByTime(DEBOUNCE_TIME);
    expect(resetMock).toHaveBeenCalled();
  });

  it('Sort product', async () => {
    const { getAllByTestId } = setup();
    const sortIcon = getAllByTestId(SORT_ICON);

    await act(async () => {
      fireEvent.click(sortIcon[0]);
    });

    expect(sortByMock).toHaveBeenCalled();
  });

  it('Delete product success', async () => {
    jest.spyOn(axios, 'put').mockResolvedValue([]);
    const { getAllByTestId, getByTestId } = setup();
    const dotIcons = getAllByTestId(DOT_ICON);

    await act(async () => fireEvent.click(dotIcons[0]));

    const delIcon = getAllByTestId(DEL_ICON)[0];

    await waitFor(async () => fireEvent.click(delIcon));

    await waitFor(async () => fireEvent.click(getByTestId(ACCEPT_BUTTON)));

    await waitFor(async () => {
      expect(deleteProductMock).toHaveBeenCalledWith(
        {
          productId: '65f174cd481c27ff30bc7886',
          userId: undefined,
        },
        expect.objectContaining({
          onSuccess: expect.any(Function),
          onError: expect.any(Function),
        }),
      );
    });
  });

  it('Delete product failed', async () => {
    jest.spyOn(axios, 'put').mockRejectedValue([]);
    const { getAllByTestId, getByTestId } = setup();
    const dotIcons = getAllByTestId(DOT_ICON);

    await act(async () => fireEvent.click(dotIcons[0]));

    const delIcon = getAllByTestId(DEL_ICON)[0];

    await waitFor(async () => fireEvent.click(delIcon));

    await waitFor(async () => fireEvent.click(getByTestId(ACCEPT_BUTTON)));

    await waitFor(async () => {
      expect(deleteProductMock).toHaveBeenCalledWith(
        {
          productId: '65f174cd481c27ff30bc7886',
          userId: undefined,
        },
        expect.objectContaining({
          onSuccess: expect.any(Function),
          onError: expect.any(Function),
        }),
      );

      deleteProductMock.mock.calls[1][1].onError();
    });
  });

  // TODO: Will check and update later
  it('Create product success', async () => {
    jest.spyOn(axios, 'post').mockResolvedValue([]);
    const { getAllByTestId, getByTestId } = setup();
    const buttonAddProduct = getAllByTestId(BUTTON_ADD);

    await act(async () => fireEvent.click(buttonAddProduct[0]));

    const inputFieldName = getByTestId(FIELD_NAME);

    await fireEvent.change(inputFieldName, { target: { value: 'tivi' } });

    const inputFieldAmount = getByTestId(FIELD_AMOUNT);

    await fireEvent.change(inputFieldAmount, { target: { value: '123' } });

    const inputFieldQuantity = getByTestId(FIELD_QUANTITY);

    await fireEvent.change(inputFieldQuantity, { target: { value: '123' } });

    // const inputFieldImage = getByTestId(FIELD_IMAGE);

    // const file = new File(['Image content'], 'image.jpg', {
    //   type: 'image/jpeg',
    // });
    // Object.defineProperty(inputFieldImage, 'files', {
    //   value: [file],
    // });

    // await fireEvent.change(inputFieldImage);

    await waitFor(async () => fireEvent.click(getByTestId(SUBMIT)));

    await waitFor(async () => {
      expect(createProductMock).toHaveBeenCalled();
    });
  });

  it('Update product success', async () => {
    jest.spyOn(axios, 'post').mockResolvedValue([]);
    const { getAllByTestId, getByTestId } = setup();
    const dotIcons = getAllByTestId(DOT_ICON);

    await act(async () => fireEvent.click(dotIcons[0]));

    const editIcon = getAllByTestId(EDIT_ICON)[0];

    await waitFor(async () => fireEvent.click(editIcon));

    const inputFieldName = getByTestId(FIELD_NAME);

    await fireEvent.change(inputFieldName, { target: { value: 'Tivi123' } });

    await waitFor(async () => fireEvent.click(getByTestId(SUBMIT)));

    await waitFor(async () => {
      expect(updateProductMock).toHaveBeenCalledWith(
        {
          productId: '65f174cd481c27ff30bc7886',
          name: 'Tivi123',
          amount: '100',
          stock: '1',
          createdAt: '2024-03-13T09:41:33.811Z',
          currency: '$',
          description: 'ban phim',
          imageURLs: undefined,
          userId: undefined,
        },
        expect.objectContaining({
          onSuccess: expect.any(Function),
          onError: expect.any(Function),
        }),
      );
    });
  });
});
