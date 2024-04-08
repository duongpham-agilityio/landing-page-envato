// Libs
import { useEffect, type MouseEventHandler, useCallback } from 'react';
import { navigate } from 'astro:transitions/client';

// Components
import Button from '@app/components/Button/index.tsx';
import CloseSideBar from '@app/components/icons/CloseSideBar/index.tsx';
import SwitchTheme from '@app/components/SwitchTheme';

// Constant
import { ROUTES } from '@app/constants';

export type TSidebarOption = {
  id: number;
  href: string;
  text: string;
};

type TSidebarProps = {
  isOpen?: boolean;
  pathName: string;
  options: TSidebarOption[];
  onToggle?: () => void;
};

// Styles CSS
const styleHeader: string = 'fixed md:relative z-50 w-[320px] bg-white py-2xl px-[75px] h-full animate-sidebarSlideIn md:animate-none md:block md:p-xl md:basis-[280px] lg:basis-[320px] lg:py-2xl lg:px-[75px] dark:bg-bgDarkTheme dark:text-white';
const hoverAfterStyle: string = 'after:w-0 after:h-1 after:transition-all after:duration-500 hover:after:absolute hover:after:z-10 hover:after:top-[50%] hover:after:left-[-70px] hover:after:w-[30px] hover:after:h-[3px] hover:after:bg-sun';

const SideBarAllDevices = ({
  isOpen = false,
  pathName,
  options,
  onToggle,
}: TSidebarProps): JSX.Element => {
  const handleStopEvent: MouseEventHandler<HTMLHeadElement> = useCallback(
    (e) => e.stopPropagation(),
    [],
  );

  useEffect(() => {
    const handleCloseSidebar = () => {
      onToggle && onToggle();
    };

    if (isOpen) {
      window.addEventListener('click', handleCloseSidebar);
    }

    return () => {
      window.removeEventListener('click', handleCloseSidebar);
    };
  }, [isOpen, onToggle]);

  return (
    <header
      className={`${styleHeader} ${isOpen ? 'block' : 'hidden'}`}
      onClick={handleStopEvent}
    >
      <Button
        aria-label='Close Button'
        className='btn-open-sidebar flex md:hidden bg-sun w-10 h-10 justify-center items-center absolute top-0 right-md !p-0 hover:bg-secondary hover:duration-500'
        onClick={(e) => {
          onToggle && onToggle();
          e.stopPropagation();
        }}
      >
        <CloseSideBar />
      </Button>
      <h1 aria-label="Title Logo" className='mb-3xl'>
        <a aria-label="Link to Home" href={ROUTES.HOME}>
          <img
            aria-label='Light Mode'
            className='dark:hidden'
            id='logo-header'
            src='/assets/logo-header-mobile.webp'
            alt='Logo'
            width={137}
            height={55}
            loading='lazy'
          />
          <img
            aria-label='Dark Mode'
            className='hidden dark:block'
            src='/assets/logo.webp'
            alt='Logo'
            width={137}
            height={55}
            loading='lazy'
          />
        </a>
      </h1>
      <nav id="navigation" aria-label="navigation">
        <SwitchTheme />
        <ul>
          {options.map(
            ({ id, href, text }): JSX.Element => (
              <li key={id}>
                <a href={href}
                  className={`text-secondary font-semibold hover:text-sun uppercase text-sm leading-[53px] py-5 relative ${href === pathName
                    ? '!text-[#956A04] dark:!text-white'
                    : 'dark:text-white'
                    } ${hoverAfterStyle}`}
                  onClick={(e) => {
                    e.preventDefault();
                    navigate(href);
                  }}
                >
                  {text}
                </a>
              </li>
            ),
          )}
        </ul>
      </nav>
    </header>
  );
};

export default SideBarAllDevices;
