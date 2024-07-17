// Libs
import { ReactNode } from 'react';
import { Box, Flex } from '@chakra-ui/react';

// Layouts
import { AuthFooter, AuthHeader } from '@/ui/layouts';

// Components
import { Divider, Logo, SwitchTheme } from '@/ui/components';

// Constants
import { TITLES } from '@/lib/constants';

interface ForgotPasswordLayoutProps {
  children: ReactNode;
}

const ForgotPasswordLayout = ({ children }: ForgotPasswordLayoutProps) => (
  <Flex width="100%" minH="100vh">
    <Box
      as="section"
      p="40px 0 48px"
      flex={1}
      w={{
        base: '100%',
        md: 'unset',
      }}
      bg="background.body.secondary"
    >
      <Flex justifyContent="space-between" px={12}>
        <Logo />
        <SwitchTheme />
      </Flex>
      <Box
        w={{
          base: '100%',
          sm: 425,
          md: 460,
        }}
        margin="auto"
        pt={24}
        pb={16}
        px={5}
        sx={{
          boxSizing: {
            base: 'border-box',
            md: 'unset',
          },
        }}
      >
        <AuthHeader title={TITLES.FORGOT_PASSWORD} />
        <Divider />
        {children}
        <AuthFooter />
      </Box>
    </Box>
  </Flex>
);

export default ForgotPasswordLayout;
