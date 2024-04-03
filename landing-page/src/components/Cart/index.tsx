import { navigate } from 'astro:transitions/client';

import { useCallback, useMemo, useState } from 'react';

// Components
import ProductTable from './ProductTable';
import CartTotal from '../CartTotal';
import { Indicator, Toast } from '..';

// Constants
import { ROUTES, SUBTOTAL, SUCCESS_MESSAGE } from '@app/constants';

// Mocks
import { CART_TOTAL } from '@app/mocks';

// Types
import type { IProductInCart } from '@app/interfaces';

// Services
import { deleteCart, updateQuantity } from '@app/services';

// Hooks
import { useDebounce, useIndicator, useToast } from '@app/hooks';

type TCartProps = {
  data: IProductInCart[];
};

const Cart = ({ data }: TCartProps): JSX.Element => {
  const { isOpen, onToggle } = useIndicator();
  const { toast, showToast, pauseToast, resetToast } = useToast();
  const [cart, setCart] = useState<IProductInCart[]>(data);

  const total: number = useMemo(
    () =>
      cart.reduce(
        (result: number, { quantity, amount }: IProductInCart) =>
          result + amount * quantity,
        0,
      ),
    [cart],
  );

  const debounceChangeQuantity = useDebounce(
    (productId: string, quantity: string) => {
      if (parseInt(quantity) <= 0) {
        return handleRemoveProductItem(productId);
      }

      onToggle();

      updateQuantity(productId, parseInt(quantity), {
        onError: (message: string) => showToast({ message, type: 'error' }),
        onSettled: onToggle,
      });
    },
    [onToggle, showToast],
  );

  const handleChangeQuantity = useCallback(
    async (productId: string, quantity: number): Promise<void> => {
      setCart((prev: IProductInCart[]) =>
        prev.map((product) => {
          if (product.id === productId)
            return {
              ...product,
              quantity: quantity <= 0 ? 0 : quantity,
            };

          return product;
        }),
      );
      debounceChangeQuantity(productId, `${quantity}`);
    },
    [debounceChangeQuantity],
  );

  const handleRemoveProductItem = useCallback(
    async (id: string) => {
      onToggle();
      await deleteCart(id, {
        onSuccess: () => {
          setCart((prev: IProductInCart[]) =>
            prev.filter((product) => product.id !== id),
          );
          showToast({ message: SUCCESS_MESSAGE.REMOVE_CART });
        },
        onError: (message: string) => showToast({ message, type: 'error' }),
        onSettled: onToggle,
      });
    },
    [onToggle, showToast],
  );

  const handleCheckout = useCallback(() => navigate(ROUTES.CHECKOUT), []);

  const isDisableSubmit: boolean = !cart.length;
  const subtotal: number = isDisableSubmit ? 0 : SUBTOTAL;
  const totalProp: number = total + subtotal;

  return (
    <Indicator isOpen={isOpen}>
      <h2 className='capitalize font-primary text-primary text-3xl py-[30px] dark:text-white'>
        Shopping Cart
      </h2>
      <section className='nearLg:grid nearXl:grid-cols-12 nearLg:gap-[30px]'>
        <div className='col-span-12 nearXl:col-span-8'>
          <ProductTable
            products={cart}
            onChangeQuantity={handleChangeQuantity}
            onRemoveProduct={handleRemoveProductItem}
          />
        </div>
        <div className='mt-[118px] nearLg:mt-0 col-span-12 nearXl:col-span-4'>
          <CartTotal
            {...CART_TOTAL}
            currency='$'
            total={totalProp}
            subTotal={subtotal}
            onCheckout={handleCheckout}
            isDisableSubmit={isDisableSubmit}
          />
        </div>
      </section>
      <Toast
        message={toast.message}
        isOpen={!!toast.message}
        type={toast.type}
        onHover={pauseToast}
        onBlur={resetToast}
      />
    </Indicator>
  );
};

export default Cart;
