'use client';
import { memo } from 'react';
import { useStore } from 'zustand';
import { usePathname } from 'next/navigation';
import { Box, Flex, Heading, Text } from '@chakra-ui/react';

// Components
import {
  BonusNotification,
  Dropdown,
  IconButton,
  Logo,
  SwitchTheme,
} from '@/ui/components';
import { Email } from '@/ui/components/Icons';
import Notification from '@/ui/components/common/Notification';

// Constants
import { AUTHENTICATION_ROLE, TITLES_HEADER } from '@/lib/constants';

// Stores
import { authStore } from '@/lib/stores';

// Types
import { TUserDetail } from '@/lib/interfaces';

// Themes
import { useColorfill } from '@/ui/themes/bases';

const HeaderComponent = () => {
  const { primary } = useColorfill();
  const pathname = usePathname();
  const name = TITLES_HEADER[`${pathname?.slice(1)}`] || TITLES_HEADER.DEFAULT;
  const user = useStore(authStore, (state) => state.user);
  const bonusTimes = authStore(
    (state): number | undefined => state.user?.bonusTimes,
  );

  const { firstName = '', lastName = '', role = '', avatarURL } = user || {};

  const username = `${firstName} ${lastName}`;

  const roles = role === AUTHENTICATION_ROLE.SUPER_ADMIN;
  return (
    <Flex
      h="100%"
      maxW="full"
      bg="background.component.primary"
      alignItems="start"
      px={{ base: 6, xl: 10 }}
      py={6}
      justifyContent="space-between"
      direction={{
        base: 'column',
        default: 'row',
      }}
    >
      <Flex alignItems="center" justifyContent="space-between" w="full">
        <Box>
          <Box display={{ base: 'inline', md: 'none' }}>
            <Logo />
          </Box>
          <Heading
            display={{ base: 'none', md: 'inline' }}
            minW={185}
            as="h1"
            fontSize="3xl"
            fontFamily="primary"
            fontWeight="bold"
            color="text.primary"
          >
            {name}
          </Heading>
          <Text
            fontSize="sm"
            color="text.secondary"
            fontWeight="medium"
            display={{ base: 'none', md: 'block' }}
          >
            Let’s check your update today
          </Text>
        </Box>
        <Box display={{ base: 'block', default: 'none' }}>
          <Dropdown
            name={username}
            role={role}
            permission="Super Admin"
            src={avatarURL}
          />
        </Box>
      </Flex>
      <Flex
        gap={{ md: 5, '3xl': '43px' }}
        mt={{ base: 3, default: 0 }}
        alignSelf={{
          base: 'end',
          xl: 'baseline',
        }}
      >
        <Flex>
          <Flex
            aria-hidden="false"
            aria-modal="true"
            minW={{ base: 325, sm: 280, md: 310 }}
            justifyContent="space-between"
          >
            <SwitchTheme />
            <Notification colorFill={primary} user={user as TUserDetail} />
            <IconButton ariaLabel="email-content">
              <Email color={primary} />
            </IconButton>
            <BonusNotification colorFill={primary} limitOfBonus={bonusTimes} />
          </Flex>
          <Box
            display={{ base: 'none', default: 'inline-flex', md: 'none' }}
            ml={4}
          >
            <Dropdown
              name={username}
              role={role}
              permission={roles ? AUTHENTICATION_ROLE.SUPER_ADMIN : ''}
              src={avatarURL}
            />
          </Box>
        </Flex>
        <Box
          display={{ base: 'none', md: 'inline-flex' }}
          borderLeft="1px"
          pl={{ md: 2, '3xl': 43 }}
          borderColor="border.primary"
          height="min-content"
        >
          <Dropdown
            name={username}
            role={role}
            permission={roles ? AUTHENTICATION_ROLE.SUPER_ADMIN : ''}
            src={avatarURL}
          />
        </Box>
      </Flex>
    </Flex>
  );
};
const Header = memo(HeaderComponent);
export default Header;
