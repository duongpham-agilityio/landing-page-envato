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
  const flexStyleInput: string = 'flex flex-col gap-[15px] md:mt-0 md:flex md:flex-row';
  return (
    <div
      className='flex flex-wrap [&>*:nth-child(n)]:w-full [&>*:nth-child(n)]:mb-4'
      onSubmit={(e: FormEvent) => {
        e.preventDefault();

        onSubmit && onSubmit();
      }}
    >
      <div className={`${flexStyleInput}`}>
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
      <Controller
        control={control}
        rules={{ required: true, pattern: /^\S+@\S+$/i }}
        name='email'
        render={({ field }) => (
          <Input className={`${inputStyle}`} placeholder='Email' {...field} />
        )}
      />

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

      <Controller
        control={control}
        rules={{ required: true }}
        name='city'
        render={({ field }) => (
          <Input
            className={`${inputStyle}`}
            placeholder='City'
            {...field}
          />
        )}
      />
      <div className={`${flexStyleInput}`}>
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
