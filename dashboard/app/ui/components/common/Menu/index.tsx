'use client';

import {
  Fragment,
  MouseEvent,
  ReactElement,
  ReactNode,
  useCallback,
} from 'react';
import { Flex, Heading, List, ListItem, Text, VStack } from '@chakra-ui/react';

// Components
import { Navigation } from '@/ui/components';

// Constants
import { ROUTES } from '@/lib/constants';

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
  isExpandSidebar?: boolean;
  onClickMenuItem?: () => void;
  onSignOut?: () => void;
};

const Menu = ({
  title = '',
  listItem,
  isExpandSidebar = false,
  onSignOut,
  onClickMenuItem,
}: MenuProps) => {
  const handleSignOut = useCallback(
    (e: MouseEvent<HTMLAnchorElement>) => {
      e.preventDefault();
      onSignOut && onSignOut();
    },
    [onSignOut],
  );

  return (
    <VStack mb={isExpandSidebar ? 9 : 5} w="full" overscroll="full">
      {!isExpandSidebar && (
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
        aria-label="list-icon"
        spacing={isExpandSidebar ? 5.5 : 2.75}
        w="full"
        sx={{
          textAlign: '-webkit-center',
        }}
      >
        {listItem.map(
          ({ leftIcon, rightIcon, destination, menuItemContent, id }) => {
            if (!menuItemContent) return <></>;
            const LeftIconComponent = leftIcon || Fragment;

            const handleClick =
              destination === `/${ROUTES.SIGN_OUT}`
                ? handleSignOut
                : onClickMenuItem;

            return (
              <ListItem key={id} aria-label="item-icon">
                {isExpandSidebar ? (
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
