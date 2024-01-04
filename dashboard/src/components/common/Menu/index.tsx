'use client';

import {
  Fragment,
  MouseEvent,
  ReactElement,
  ReactNode,
  useCallback,
} from 'react';
import { useRouter } from 'next/navigation';
import { Flex, Heading, List, ListItem, Text, VStack } from '@chakra-ui/react';

// Components
import { Navigation } from '@app/components';

// Constants
import { ROUTES } from '@app/constants';

export type TMenuItem = {
  id: number;
  leftIcon?: () => ReactElement;
  rightIcon?: ReactNode;
  menuItemContent?: string;
  destination: string;
};

export type MenuProps = {
  title?: string;
  listItem: Array<TMenuItem>;
  isMinify?: boolean;
  onClickMenuItem?: () => void;
};

const Menu = ({
  title = '',
  listItem,
  isMinify = false,
  onClickMenuItem,
}: MenuProps) => {
  const router = useRouter();

  const handleSignOut = useCallback(
    (e: MouseEvent<HTMLAnchorElement>) => {
      e.preventDefault();
      // signOut(); TODO: Update later
      router.push(ROUTES.LOGIN);
    },
    [router],
  );

  return (
    <VStack mb={isMinify ? 9 : 5} w="full" overscroll="full">
      {!isMinify && (
        <Heading
          as="h4"
          borderColor="border.primary"
          borderBottomWidth="1px"
          w="full"
          lineHeight={1.75}
          fontSize="sm"
          color="text.secondary"
          _light={{
            borderColor: 'gray.100',
            color: 'gray.600',
          }}
          fontWeight="md"
        >
          {title}
        </Heading>
      )}

      <List
        mt={2.5}
        role="listbox"
        aria-label="list-icon"
        spacing={isMinify ? 5.5 : 2.75}
        w="full"
        sx={{
          textAlign: '-webkit-center',
        }}
      >
        {listItem.map(
          ({ leftIcon, rightIcon, destination, menuItemContent, id }) => {
            const LeftIconComponent = leftIcon || Fragment;

            const handleClick =
              destination === `/${ROUTES.SIGN_OUT}`
                ? handleSignOut
                : onClickMenuItem;

            return (
              <ListItem key={id} aria-label="item-icon" role="list">
                {isMinify ? (
                  <Navigation destination={destination} onClick={handleClick}>
                    <LeftIconComponent />
                  </Navigation>
                ) : (
                  <Navigation destination={destination} onClick={handleClick}>
                    <Flex alignItems="center" justifyContent="space-between">
                      <Flex
                        gap={2.5}
                        alignItems="center"
                        justifyContent="space-between"
                      >
                        <LeftIconComponent />

                        <Text
                          fontSize="lg"
                          fontWeight="md"
                          color="text.primary"
                          transition="all .25s ease-in-out"
                        >
                          {menuItemContent}
                        </Text>
                      </Flex>

                      {rightIcon}
                    </Flex>
                  </Navigation>
                )}
              </ListItem>
            );
          },
        )}
      </List>
    </VStack>
  );
};

export default Menu;
