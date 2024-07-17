// Libs
import { ReactNode } from 'react';

// Layouts
import AuthHeader from '@/ui/layouts/AuthHeader';

// Components
import { Divider } from '@/ui/components';

// Constants
import { TITLES } from '@/lib/constants';

interface LoginLayoutProps {
  children: ReactNode;
}

const LoginLayout = ({ children }: LoginLayoutProps) => (
  <>
    <AuthHeader title={TITLES.SIGN_IN} isShowDescription={true} />
    <Divider content={TITLES.AUTH_DiVIDER} />
    {children}
  </>
);

export default LoginLayout;
