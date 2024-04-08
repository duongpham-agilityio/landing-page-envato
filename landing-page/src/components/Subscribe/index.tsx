// Components
import {  Button, Input, Toast } from '@app/components';
import { ERROR_MESSAGES, REGEXPS, SUCCESS_MESSAGE } from '@app/constants';
import { useToast } from '@app/hooks';
import { useRef, type RefObject, useCallback, type FormEventHandler } from 'react';

const Subscribe = (): JSX.Element => {
  const { toast, showToast, resetToast, pauseToast } = useToast();
  const refInput: RefObject<HTMLInputElement> = useRef<HTMLInputElement>(null);

  const handleSubmit: FormEventHandler<HTMLFormElement> = useCallback(
    (e) => {
      e.preventDefault();

      const value: string = refInput.current ? refInput.current.value : '';
      const isValid: boolean = !!value && REGEXPS.EMAIL.test(value);

      if (isValid) {
        refInput.current && (refInput.current.value = '');

        return showToast({
          message: SUCCESS_MESSAGE.SUBSCRIBE,
        });
      }

      return showToast({
        message: ERROR_MESSAGES.SUBSCRIBE,
        type: 'error',
      });
    },
    [showToast],
  );


  return <section className='mt-[70px] lg:mt-0 py-[100px] bg-iridium'>
    <div className='container m-auto px-5 lg:flex gap-[30px] items-center'>
      <aside className='flex-1'>
        <h2 className='text-3xl text-white font-normal'>
          Subscribe for a <span className='text-sun'>25% Discount</span>
        </h2>
        <p className='pt-2 text-little text-base font-normal'>
          Nulla ac convallis lorem, eget euismod nisl. Donec in libero sit amet mi
          vulputate consectetur. Donec auctor interdum purus, ac finibus massa
          bibendum nec.
        </p>
      </aside>
      <div className='flex-1'>
        <form className='w-full mt-3xl lg:mt-0 md:flex' onSubmit={handleSubmit}>
          <div aria-label='Subscribe' className='md:flex-1'>
            <Input
              aria-label='Input Email'
              ref={refInput}
              placeholder='Your E-mail'
              size='md'
              variant='secondary'
              className='font-normal outline-none focus:shadow-none dark:text-sparingly'
            />
          </div>
          <Button
            type='submit'
            className='text-sm px-[31px] text-primary !py-4 hover:text-white w-full mt-3 md:!py-0 md:mt-0 md:w-[130px]'
          >
            Subscribe
          </Button>

          <Toast
            {...toast}
            onBlur={resetToast}
            onHover={pauseToast}
            isOpen={!!toast.message}
          />
        </form>
      </div>
    </div>
  </section>;
};


export default Subscribe;