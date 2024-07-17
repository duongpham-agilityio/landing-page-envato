// Libs
import { ReactNode } from 'react';

// Layouts
import AuthHeader from '@/ui/layouts/AuthHeader';

// Components
import { Divider } from '@/ui/components';

// Constants
import { TITLES } from '@/lib/constants';

// Layouts
import { AuthFooter } from '@/ui/layouts';

interface ForgotPasswordLayoutProps {
  children: ReactNode;
}

const ForgotPasswordLayout = ({ children }: ForgotPasswordLayoutProps) => (
  <>
    <AuthHeader title={TITLES.FORGOT_PASSWORD} />
    <Divider />
    {children}
    <AuthFooter />
  </>
);

export default ForgotPasswordLayout;
