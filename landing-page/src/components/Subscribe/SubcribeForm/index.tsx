import { useState } from 'react';

// Components
import { Input, Button } from '@app/components';

const SubscribeForm = (): JSX.Element => {
  const [email, setEmail] = useState<string>('');

  return (
    <div className='w-full flex mt-3xl lg:mt-0'>
      <Input
        placeholder='Your E-mail'
        size='md'
        variant='secondary'
        className='font-normal flex-1'
        value={email}
        onChange={setEmail}
      />
      <Button className='text-sm w-[152px]'>Subscribe</Button>
    </div>
  );
};

export default SubscribeForm;
