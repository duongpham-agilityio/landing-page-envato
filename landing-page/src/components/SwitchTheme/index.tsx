// Components
import DarkIcon from '@app/components/icons/Dark/index.tsx';
import LightIcon from '@app/components/icons/Light/index.tsx';

type TSwitchThemeProps = {
  id?: string;
  className?: string;
  children?: string;

}
const SwitchTheme = (
  { className='', children='', id=''}: TSwitchThemeProps
): JSX.Element => (
    <button id={id} className={className} aria-label="switch-theme">
      {children}
      <DarkIcon id="light-icon"/>
      <LightIcon id="dark-icon"/>
    </button>
  );

export default SwitchTheme;