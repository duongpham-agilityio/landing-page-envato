type TSunIconProps = {
  className?: string;
  id?: string;
};

export const SunIcon = ({ className = '', id = '' }: TSunIconProps): JSX.Element => (
  <svg
    id={id}
    className={className}
    stroke="#000"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="12" cy="12" r="5" strokeWidth="1.5"></circle>
    <path d="M12 2V4" strokeWidth="1.5" strokeLinecap="round"></path>
    <path d="M12 20V22" strokeWidth="1.5" strokeLinecap="round"></path>
    <path
      d="M20.6602 7L18.9281 8"
      strokeWidth="1.5"
      strokeLinecap="round"
    ></path>
    <path
      d="M5.07178 16L3.33973 17"
      strokeWidth="1.5"
      strokeLinecap="round"
    ></path>
    <path
      d="M3.33984 7L5.07189 8"
      strokeWidth="1.5"
      strokeLinecap="round"
    ></path>
    <path
      d="M18.9282 16L20.6603 17"
      strokeWidth="1.5"
      strokeLinecap="round"
    ></path>
  </svg>
);

export default SunIcon;