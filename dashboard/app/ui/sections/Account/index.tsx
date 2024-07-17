'use client';

import { ReactNode } from 'react';
import { Box, Flex } from '@chakra-ui/react';

// Components
import { Benefit, Logo, SwitchTheme } from '@/ui/components';

type TAccountProps = {
  children?: ReactNode;
};

const Account = ({ children }: TAccountProps): JSX.Element => (
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
        {children}
      </Box>
    </Box>
    <Benefit />
  </Flex>
);
export default Account;
