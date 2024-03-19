import { useCallback, useMemo, type FormEventHandler, useState } from 'react';

// Components
import { Button, Toast, InputNumber, Indicator } from '..';

// Services
import { addToCart } from '@app/services';

// Constants
import { SUCCESS_MESSAGE } from '@app/constants';

// Hooks
import { useIndicator, useToast } from '@app/hooks';

// Utils
import { formatDecimalNumber } from '@app/utils';

type TProductInfoProps = {
  id: string;
  name: string;
  imageURL: string;
  currency: string;
  description: string;
  stock: number;
  amount: number;
};

const ProductInfo = ({
  id,
  imageURL,
  currency,
  amount,
  name,
  stock,
  description,
}: TProductInfoProps): JSX.Element => {
  const { isOpen: isSubmit, onOpen, onClose } = useIndicator();
  const { toast, showToast, pauseToast, resetToast } = useToast();
  const [quantity, setQuantity] = useState(1);

  const isOutStock: boolean = stock <= 0;

  const statusStock = useMemo(() => {
    if (isOutStock) {
      return {
        title: 'out stock',
        color: 'bg-red-500',
      };
    }

    return { title: 'in stock', color: 'bg-green-500' };
  }, [isOutStock]);

  const handleAddToCart = useCallback(async () => {
    onOpen();
    await addToCart(
      id,
      {
        imageURL,
        currency,
        amount,
        name,
        quantity,
      },
      {
        onSuccess: () => {
          showToast({ message: SUCCESS_MESSAGE.ADD_TO_CART, type: 'success' });
        },
        onError: (message: string) => {
          showToast({ message, type: 'error' });
        },
        onSettled: onClose,
      },
    );
  }, [
    amount,
    currency,
    id,
    imageURL,
    name,
    onClose,
    onOpen,
    quantity,
    showToast,
  ]);

  const handleSubmit: FormEventHandler<HTMLFormElement> = useCallback(
    async (e) => {
      e.preventDefault();
      await handleAddToCart();
    },
    [handleAddToCart],
  );

  const handleChangeQuantityByStep = useCallback(
    (step: 1 | -1) => () =>
      setQuantity((prev) => (prev + step <= 0 ? 0 : prev + step)),
    [],
  );

  // Styles CSS
  const stylesSectionProductInfo: string =
    'col-span-12 nearLg:col-span-5 mt-[70px] nearLg:mt-0 font-primary dark:text-white';
  const styleLineText: string =
    'after:absolute after:block after:top-0 after:w-[80px] after:h-[3px] after:bg-sun dark:text-white';
  const colorElementary: string = 'text-elementary dark:text-white';

  return (
    <Indicator isOpen={isSubmit}>
      <section className={stylesSectionProductInfo}>
        <p
          className={`text-2xl text-secondary py-[15px] relative ${styleLineText}`}
        >
          {currency}
          {formatDecimalNumber(amount)}
        </p>

        <h2 className='text-3xl text-primary pb-3 dark:text-white'>
          <span className='line-clamp-1'>{name}</span>
        </h2>
        <p className={`flex items-center text-xs gap-1 ${colorElementary}`}>
          <span
            className={`block w-2 h-2 rounded-full ${statusStock.color}`}
          ></span>
          <span className='line-clamp-1'>{statusStock.title}</span>
        </p>
        <p className={`text-base my-12 ${colorElementary}`}>{description}</p>
        <form className='flex flex-col gap-14' onSubmit={handleSubmit}>
          <InputNumber
            disabled={isOutStock || isSubmit}
            value={quantity}
            onIncrease={handleChangeQuantityByStep(1)}
            onDecrease={handleChangeQuantityByStep(-1)}
            onChange={setQuantity}
            className='dark:text-primary'
          />

          <Button
            className={`w-full sm:w-[280px] md:w-[310px] nearLg:w-full lg:w-[310px] dark:text-primary ${
              isOutStock && 'bg-slate-200'
            } ${
              isSubmit ? '!bg-gray-400' : 'hover:text-white hover:bg-secondary dark:hover:bg-sun'
            }`}
            disabled={isOutStock || isSubmit}
          >
            Add to cart
          </Button>
        </form>

        <Toast
          message={toast.message}
          isOpen={!!toast.message}
          type={toast.type}
          onHover={pauseToast}
          onBlur={resetToast}
        />
      </section>
    </Indicator>
  );
};

export default ProductInfo;
