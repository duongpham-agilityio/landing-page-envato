// Libs
import { ReactNode } from 'react';

// Layouts
import AuthHeader from '@/ui/layouts/AuthHeader';

// Components
import { Divider } from '@/ui/components';

// Constants
import { TITLES } from '@/lib/constants';

interface RegisterLayoutProps {
  children: ReactNode;
}

const RegisterLayout = ({ children }: RegisterLayoutProps) => (
  <>
    <AuthHeader title={TITLES.SIGN_UP} isShowDescription={true} />
    <Divider content={TITLES.AUTH_DiVIDER} />
    {children}
  </>
);

export default RegisterLayout;
