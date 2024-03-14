import type { FormEvent } from 'react';
import { Controller, type Control } from 'react-hook-form';

// Components
import { Input, Select } from '..';
import { CHECKOUT_ADDRESS } from '@app/constants';

export type TRegisterForm = {
  firstName: string;
  lastName: string;
  email: string;
  state: string;
  city: string;
  street: string;
  zip: string;
};

type TContactFormProps = {
  control: Control<TRegisterForm>;
  onSubmit?: () => void;
};

const ContactForm = ({ control, onSubmit }: TContactFormProps) => {
  // Styles CSS
  const inputStyle: string =
    'placeholder-onceAll text-elementary text-[14px] w-full border-0 rounded-none bg-desertStorm p-5 focus:outline-none';

  return (
    <div
      className='flex flex-wrap [&>*:nth-child(n)]:w-full [&>*:nth-child(n)]:mb-4'
      onSubmit={(e: FormEvent) => {
        e.preventDefault();

        onSubmit && onSubmit();
      }}
    >
      <div className='md:!w-[50%] md:pr-[15px]'>
        <Controller
          control={control}
          name='firstName'
          render={({ field }) => (
            <Input
              className={`${inputStyle}`}
              placeholder='First Name'
              {...field}
            />
          )}
        />
      </div>
      <div className='md:!w-[50%] md:pl-[15px]'>
        <Controller
          control={control}
          rules={{ required: true, maxLength: 100 }}
          name='lastName'
          render={({ field }) => (
            <Input
              className={`${inputStyle}`}
              placeholder='Last Name'
              {...field}
            />
          )}
        />
      </div>
      <div>
        <Controller
          control={control}
          rules={{ required: true, pattern: /^\S+@\S+$/i }}
          name='email'
          render={({ field }) => (
            <Input className={`${inputStyle}`} placeholder='Email' {...field} />
          )}
        />
      </div>
      <div>
        <Controller
          control={control}
          rules={{ required: true }}
          name='state'
          render={({ field }) => (
            <Select
              options={CHECKOUT_ADDRESS}
              className={`${inputStyle}`}
              {...field}
            />
          )}
        />
      </div>
      <div>
        <Controller
          control={control}
          rules={{ required: true }}
          name='city'
          render={({ field }) => (
            <Input
              className={`${inputStyle} mb-4`}
              placeholder='City'
              {...field}
            />
          )}
        />
      </div>
      <div className='md:!w-[50%] md:pr-[15px]'>
        <Controller
          control={control}
          rules={{ required: true }}
          name='street'
          render={({ field }) => (
            <Input
              className={`${inputStyle}`}
              placeholder='Street'
              {...field}
            />
          )}
        />
      </div>
      <div className='md:!w-[50%]'>
        <Controller
          control={control}
          rules={{ required: true, maxLength: 100 }}
          name='zip'
          render={({ field }) => (
            <Input
              className={`${inputStyle}`}
              placeholder='Zip Code'
              {...field}
            />
          )}
        />
      </div>
    </div>
  );
};

export default ContactForm;
