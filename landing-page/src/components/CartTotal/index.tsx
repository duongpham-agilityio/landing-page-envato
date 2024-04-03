import isEqual from 'react-fast-compare';
import { memo } from 'react';

// Components
import Button, { VARIANTS } from '@app/components/Button/index';

// Utils
import { formatDecimalNumber } from '@app/utils';

type TCartTotalProps = {
  isDisableSubmit?: boolean;
  delivery?: string;
  currency?: string;
  className?: string;
  subTotal?: number;
  total?: number;
  onCheckout?: () => void;
};

const CartTotal = ({
  isDisableSubmit = false,
  delivery = '',
  currency = '',
  className = '',
  subTotal = 0,
  total = 0,
  onCheckout,
}: TCartTotalProps): JSX.Element => {

  // Styles CSS
  const listStyleDescription: string = '[&>*:nth-child(n)]:mb-lg [&>*:nth-child(n)]:font-primary [&>*:nth-child(n)]:text-[14px] [&>*:nth-child(n)]:text-elementary [&>*:nth-child(n)]:flex [&>*:nth-child(n)]:justify-between';
  const fontSemibold: string = 'font-semibold';

  return (
    <div className={`bg-desertStorm font-semibold  py-lg px-5 ${className}`}>
      <div>
        <h3 className='text-lg text-primary leading-huge font-semibold'>
          Cart Total
        </h3>
        <div className={`mt-lg ${listStyleDescription}`}>
          <p className={`${fontSemibold}`}>
            Subtotal:
            <span className={`${fontSemibold}`}>
              {currency}
              {formatDecimalNumber(subTotal)}
            </span>
          </p>
          <p className={`${fontSemibold}`}>
            Delivery:<span className={`${fontSemibold}`}>{delivery}</span>
          </p>
          <p className={`${fontSemibold}`}>
            Total:
            <span className={`${fontSemibold}`}>
              {currency}
              {formatDecimalNumber(total)}
            </span>
          </p>
        </div>
        <Button
          type='submit'
          disabled={isDisableSubmit}
          variant={VARIANTS.SECONDARY}
          className={`hover:bg-secondary  w-full !h-[55px] font-semibold !leading-14 mt-[70px] dark:text-primary ${
            isDisableSubmit ? '!bg-gray-400' : 'hover:text-white'
          }`}
          onClick={onCheckout}
        >
          Checkout
        </Button>
      </div>
    </div>
  );
};

const CartTotalMemorized = memo(CartTotal, isEqual);

export default CartTotalMemorized;
