interface TCartIcon {
  className?: string
}

const CartIcon = ({ className = '' }: TCartIcon) => (
  <svg
      className={className}
      aria-label="Cart"
      xmlns="http://www.w3.org/2000/svg"
      width="40"
      height="40"
      version="1.1"
      viewBox="0 0 32 32"
    >
      <g
        fill="#FFF"
        fillRule="evenodd"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeMiterlimit="4.1"
        color="#FFF"
        transform="translate(-12 -292)"
      >
        <path
          d="M21 316.006c-1.645 0-3 1.355-3 3s1.355 3 3 3 3-1.355 3-3-1.355-3-3-3zm0 2c.564 0 1 .436 1 1 0 .564-.436 1-1 1-.564 0-1-.436-1-1 0-.564.436-1 1-1z"
          style={{ stroke: 'none'  }}
        ></path>
        <path
          d="M36 316.006c-1.645 0-3 1.355-3 3s1.355 3 3 3 3-1.355 3-3-1.355-3-3-3zm0 2c.564 0 1 .436 1 1 0 .564-.436 1-1 1-.564 0-1-.436-1-1 0-.564.436-1 1-1z"
          style={{ stroke: 'none'  }}
        ></path>
        <path
          d="M15 294.006a1 1 0 000 2h1.18l2.65 13.242a3.017 3.017 0 00-1.83 2.758c0 1.645 1.355 3 3 3h18.012a1 1 0 000-2H20c-.571 0-1-.429-1-1s.429-1 1-1h19.012a1 1 0 00.988-.844l1.73-11a1 1 0 00-.988-1.156H18.62l-.639-3.195a1 1 0 00-.98-.805zm4.02 6h20.552l-1.416 9L20.82 309zm3.98 2a1 1 0 000 2h13.012a1 1 0 000-2zm2 3a1 1 0 000 2h9.012a1 1 0 000-2z"
          style={{ stroke: 'none'  }}
        ></path>
      </g>
    </svg>
  );


export default CartIcon;
