'use client';
import { Fragment, memo } from 'react';
import {
  Box,
  Button,
  Divider,
  Flex,
  Link,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
} from '@chakra-ui/react';

// Components
import { Arrow, Avatar, Indicator } from '@/ui/components';

// Constants
import { IMAGES, MENU_LIST_ICON } from '@/lib/constants';

// Themes
import { useColorfill } from '@/ui/themes/bases';

interface UserDropdownProps {
  src?: string;
  role: string;
  name?: string;
  alt?: string;
  permission?: string;
  offsetX?: number;
  offsetY?: number;
  isLogoutHandling?: boolean;
  onSingOut: () => void;
}
const UserDropdown = ({
  src = IMAGES.USER.url,
  name = '',
  role,
  alt = '',
  permission = '',
  offsetX = 0,
  offsetY = 10,
  isLogoutHandling = false,
  onSingOut,
}: UserDropdownProps) => {
  const { primary } = useColorfill();
  const currencyColor = 'text.currencyColor';

  return (
    <Indicator isOpen={isLogoutHandling}>
      <Menu offset={[offsetX, offsetY]}>
        {({ isOpen }) => (
          <Box>
            <MenuButton
              as={Button}
              p={0}
              bg="none"
              _hover={{
                bg: 'none',
              }}
              _active={{
                bg: 'none',
              }}
              isActive={isOpen}
              title={name}
            >
              <Flex alignItems="center">
                <Avatar src={src} alt={alt} />
                <Box display={{ base: 'none', '3xl': 'inline' }}>
                  <Flex flexDirection="column" alignItems="start" ml={18}>
                    <Flex alignItems="center">
                      <Text
                        mr="15px"
                        w={68}
                        fontWeight="bold"
                        variant="text5Xl"
                        whiteSpace="break-spaces"
                        noOfLines={1}
                      >
                        {name}
                      </Text>
                      <Arrow color={primary} />
                    </Flex>
                    <Text
                      fontSize="sm"
                      w={20}
                      color="text.secondary"
                      variant="text5Xl"
                    >
                      {permission}
                    </Text>
                  </Flex>
                </Box>
              </Flex>
            </MenuButton>
            <MenuList
              data-testid="TestDropdown"
              position="relative"
              zIndex={2}
              px={3}
              py={2}
              mt={{ md: 4 }}
              w={300}
              border="none"
              borderRadius="lg"
              bg="background.component.primary"
            >
              {MENU_LIST_ICON(role).map(
                ({ id, href, icon, value, isHaveDivider }) => {
                  const Icon = icon || Fragment;
                  const props = href
                    ? {
                        as: Link,
                        href: href,
                      }
                    : {
                        onClick: onSingOut,
                      };

                  return (
                    <>
                      {isHaveDivider && <Divider my={3.5} color="gray.300" />}
                      <MenuItem
                        key={id}
                        p={3.5}
                        aria-label={`menu-icon-${value}`}
                        borderRadius="lg"
                        bg="transparent"
                        _hover={{
                          bg: 'background.component.tertiary',
                          color: currencyColor,
                          svg: { stroke: currencyColor },
                          path: { stroke: currencyColor },
                          ellipse: { stroke: currencyColor },
                          circle: { stroke: currencyColor },
                          borderColor: 'transparent',
                          textDecoration: 'none',
                        }}
                        _focus={{
                          outline: 'none',
                        }}
                        {...props}
                      >
                        <Flex>
                          <Icon color={primary} />
                          <Text ml={18} variant="text4Xl">
                            {value}
                          </Text>
                        </Flex>
                      </MenuItem>
                    </>
                  );
                },
              )}
            </MenuList>
          </Box>
        )}
      </Menu>
    </Indicator>
  );
};
const UserDropdownMemorized = memo(UserDropdown);
export default UserDropdownMemorized;
