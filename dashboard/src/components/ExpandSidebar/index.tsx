import { memo, useCallback } from 'react';
import isEqual from 'react-fast-compare';
import {
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Image,
  VStack,
  useMediaQuery,
} from '@chakra-ui/react';

// type
import { SidebarProps } from '@app/layouts/Sidebar';

// components
import { Logo, Menu } from '@app/components';

// constants
import { SIDEBAR, IMAGES } from '@app/constants';

// mocks
import { EXPAND_SIDEBAR_MENU_LIST } from '@app/constants';

const ExpandSidebar = ({ onClose, onOpen, isOpen }: SidebarProps) => {
  const [isMobileAndTablet] = useMediaQuery('(max-width: 1732px)');

  const handleCloseSideBar = useCallback(() => {
    isMobileAndTablet && onOpen();
  }, [isMobileAndTablet, onOpen]);

  return (
    <Drawer
      placement="left"
      onClose={onClose}
      isOpen={isOpen}
      trapFocus={false}
      onOverlayClick={handleCloseSideBar}
      variant={{
        '4xl': 'clickThrough',
      }}
      blockScrollOnMount={false}
    >
      <DrawerOverlay data-testid="expand-overlay" />

      <DrawerContent
        maxW={SIDEBAR.EXPAND_SIDEBAR_WIDTH}
        display="block"
        bg="background.component.primary"
        maxH="full"
      >
        <DrawerHeader
          display="flex"
          alignItems="center"
          h={108}
          borderRightColor="border.secondary"
          borderRightWidth="1px"
          borderBottomColor="border.secondary"
          borderBottomWidth="1px"
          pl={12.5}
        >
          <Logo />

          {/* Close button of Expand sidebar */}
          <Image
            src={IMAGES.LEFT_ARROW.url}
            alt={IMAGES.LEFT_ARROW.alt}
            position="absolute"
            top="auto"
            right={0}
            onClick={onOpen}
            cursor="pointer"
            id="close-expand"
          />
        </DrawerHeader>

        <DrawerBody
          pt={3.5}
          pl={12}
          pb={50}
          pr={0}
          w="full"
          h="full"
          sx={{
            '&::-webkit-scrollbar': {
              display: 'none',
            },
            '&::-webkit-scrollbar-thumb': {
              display: 'none',
            },
          }}
        >
          <VStack pr={12.5} mb={9}>
            {EXPAND_SIDEBAR_MENU_LIST.map((item) => (
              <Menu
                key={item.id}
                title={item.title}
                listItem={item.listItem}
                onClickMenuItem={handleCloseSideBar}
              />
            ))}
          </VStack>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};

const ExpandSidebarComponent = memo(ExpandSidebar, isEqual);
export default ExpandSidebarComponent;
