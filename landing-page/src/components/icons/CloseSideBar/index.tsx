import { memo, type SVGProps } from 'react';

const CloseSideBarMenu = (props: SVGProps<SVGSVGElement>): JSX.Element => (
  <svg
    width={14}
    height={20}
    className='text-white w-9 h-2'
    aria-hidden='true'
    xmlns='http://www.w3.org/2000/svg'
    fill='#ffffff'
    viewBox='0 0 14 14'
    {...props}
  >
    <path
      stroke='currentColor'
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth='3'
      d='m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6'
    />
  </svg>
);

const CloseSideBarMenuMemorized = memo(CloseSideBarMenu);

export default CloseSideBarMenuMemorized;
