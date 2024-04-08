// Components
import { Button } from '@app/components';
import { HamburgerMenuIcon } from '@app/components/icons';

// Constant
import { ROUTES } from '@app/constants';
import { useCallback, type MouseEventHandler } from 'react';

type THeaderProps = {
  onToggleSidebar?: () => void;
};

const HeaderMobile = ({ onToggleSidebar }: THeaderProps): JSX.Element => {
  // Styles CSS
  const styleHeader: string =
    'bg-white flex justify-between items-center fixed z-20 top-0 left-0 right-0 h-[70px] shadow-navMobile py-2 px-8 md:hidden dark:bg-bgDarkTheme';

  const handleOpenSidebar: MouseEventHandler<HTMLButtonElement> = useCallback(
    (e) => {
      e.stopPropagation();

      onToggleSidebar && onToggleSidebar();
    },
    [onToggleSidebar],
  );

  return (
    <header className={`${styleHeader}`}>
      <h1>
        <a href={ROUTES.HOME} className='text-infoRGBA'>
          <img
            className='dark:hidden'
            src='/assets/logo-header-mobile.webp'
            alt='Logo'
            width={70}
            height={28}
            loading='lazy'
          />
          <img
            className='hidden dark:block'
            src='/assets/logo.webp'
            alt='Logo'
            width={70}
            height={28}
            loading='lazy'
          />
        </a>
      </h1>
      <Button
        className='flex justify-center items-center bg-transparent hover:bg-transparent'
        onClick={handleOpenSidebar}
        aria-label='Show Menu'
      >
        <HamburgerMenuIcon className='fill-sun stroke-2' />
      </Button>
    </header>
  );
};
export default HeaderMobile;
