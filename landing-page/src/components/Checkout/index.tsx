import { navigate } from 'astro:transitions/client';
import { useForm } from 'react-hook-form';
import { useCallback, useState } from 'react';

// Components
import { ContactForm, Indicator, Toast } from '@app/components';
import CartTotal from '../CartTotal';

// Types
import type { TRegisterForm } from '../ContactForm';

// Hooks
import { useIndicator, useToast } from '@app/hooks';

// Constants
import { ROUTES, SUBTOTAL, SUCCESS_MESSAGE } from '@app/constants';

// Services
import { checkout } from '@app/services';

// Types
import type { IProductInCart } from '@app/interfaces';

type TCheckoutProps = {
  total: number;
  cart: IProductInCart[];
};

const defaultForm: TRegisterForm = {
  firstName: '',
  lastName: '',
  email: '',
  state: '',
  city: '',
  street: '',
  zip: '',
};

const Checkout = ({ total }: TCheckoutProps): JSX.Element => {
  const { isOpen, onToggle } = useIndicator();
  const [currentTotal, setCurrentTotal] = useState<number>(total);
  const { toast, resetToast, pauseToast, showToast } = useToast();

  const { control, watch, reset } = useForm<TRegisterForm>({
    defaultValues: defaultForm,
  });

  const handleCheckout = useCallback(async () => {
    onToggle();

    checkout(watch(), {
      onSuccess: () => {
        showToast({
          message: SUCCESS_MESSAGE.CHECKOUT,
        });
        setCurrentTotal(0);
        reset(defaultForm);
        navigate(ROUTES.HOME, {
          history: 'replace',
        });
      },
      onError: (message: string) =>
        showToast({
          message,
          type: 'error',
        }),
      onSettled: onToggle,
    });
  }, [onToggle, watch, showToast, reset]);

  const isDisable: boolean = !Object.values(watch()).every((value) => value);

  return (
    <Indicator isOpen={isOpen}>
      <h2 className='capitalize font-primary text-primary text-3xl py-[30px] dark:text-white'>
        Checkout
      </h2>
      <form
        className='nearLg:grid nearLg:grid-cols-12 nearLg:gap-[30px]'
        onSubmit={(e) => {
          e.preventDefault();
          handleCheckout();
        }}
      >
        <div className='col-span-12 nearXl:col-span-8'>
          <ContactForm control={control} />
        </div>
        <div className='mt-[50px] nearLg:mt-0 col-span-12 nearXl:col-span-4'>
          <CartTotal
            subTotal={!currentTotal ? 0 : SUBTOTAL}
            delivery='Free'
            total={currentTotal + SUBTOTAL}
            isDisableSubmit={isDisable || !currentTotal}
          />
        </div>
      </form>
      <Toast
        {...toast}
        onBlur={resetToast}
        onHover={pauseToast}
        isOpen={!!toast.message}
      />
    </Indicator>
  );
};

export default Checkout;
