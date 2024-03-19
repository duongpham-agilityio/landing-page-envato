import { useCallback, useEffect, useState } from 'react';

// Components
import { Button } from '..';
import CloseSideBarMenuMemorized from '../icons/CloseSideBar';

// Utils
import { getStyles } from '@app/utils';

// Themes
import { toast } from '@app/themes/components';

export type TTypeToast = 'success' | 'error';
type TToastProps = {
  isOpen?: boolean;
  type?: TTypeToast;
  message?: string;
  onHover?: () => void;
  onBlur?: () => void;
};

const Toast = ({
  isOpen = false,
  type = 'success',
  message = '',
  onHover,
  onBlur,
}: TToastProps): JSX.Element | null => {
  const [isOpenToast, setIsOpenToast] = useState<boolean>(isOpen);

  const handleCloseToast = useCallback(() => setIsOpenToast(false), []);

  useEffect(() => {
    if (isOpen && !isOpenToast) {
      setIsOpenToast(isOpen);
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpenToast) {
      window.addEventListener('click', handleCloseToast);
    }

    return () => {
      window.removeEventListener('click', handleCloseToast);
    };
  }, [handleCloseToast, isOpenToast]);

  return isOpenToast && isOpen ? (
    <section
      className={`${getStyles(toast.baseStyle)} ${getStyles(
        toast.variants[type],
      )}`}
      onClick={(e) => e.preventDefault()}
      onMouseMove={onHover}
      onMouseLeave={onBlur}
    >
      <p className={'px-3 text-sm nearLg:text-md text-inherit'}>{message}</p>
      <Button
        aria-label='Close Button'
        className='flex bg-transparent w-10 h-10 justify-center items-center rounded-[100%] !pt-0 pb-[0px] self-end'
        onClick={handleCloseToast}
      >
        <CloseSideBarMenuMemorized width={10} height={10} fill='#000' />
      </Button>
    </section>
  ) : null;
};

export default Toast;
