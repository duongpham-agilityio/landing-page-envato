import { useState, useCallback } from 'react';

// Components
import { Button } from '@app/components';
import { HamburgerMenuIcon } from '@app/components/icons';

// Types
import type { TSidebarOption } from '../../SideBar';

const NavbarOnSmallDevices = ({
  options,
}: {
  options: TSidebarOption[];
}): JSX.Element => {
  const [isOpen, onToggle] = useState<boolean>(false);
  const [isFirstToggle, onFirstToggle] = useState<boolean>(false);

  const handleToggle = useCallback(() => {
    onToggle((prev: boolean): boolean => !prev);
    onFirstToggle(true);
  }, []);

  const closeAnimate: string = !isOpen && isFirstToggle ? 'animate-shrink' : '';
  const openAnimate: string = isOpen ? 'animate-grow' : '';
  const toogleMenu: string = isOpen ? 'h-[200px]' : '';
  const firstStyle: string = !isOpen && !isFirstToggle ? 'hidden' : '';

  return (
    <div className={`${toogleMenu} relative lg:hidden`}>
      <Button
        aria-label='Show Menu'
        className='flex justify-center items-center pt-[0] pb-0 mt-4  w-[36px] h-[29px] !p-0 cursor-pointer'
        onClick={handleToggle}
      >
        <HamburgerMenuIcon width='13' height='13' />
      </Button>
      {/* ISSUES: height alway 300px */}
      <nav
        className={`pr-10 mt-4 ${firstStyle} ${closeAnimate} ${openAnimate}`}
      >
        <ul>
          {options.map(
            ({ id, href, text }): JSX.Element => (
              <li key={id} className='py-2.5'>
                <a
                  href={href}
                  className='text-white hover:text-sun uppercase text-sm'
                >
                  {text}
                </a>
              </li>
            ),
          )}
        </ul>
      </nav>
    </div>
  );
};

export default NavbarOnSmallDevices;
