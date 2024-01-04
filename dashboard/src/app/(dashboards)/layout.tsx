'use client';

import { IMAGES, SIDEBAR } from '@app/constants';
import { SideBar } from '@app/layouts';
import {
  Box,
  Flex,
  useDisclosure,
  useMediaQuery,
  Image,
} from '@chakra-ui/react';
import { useEffect } from 'react';

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const { isOpen, onOpen, onClose } = useDisclosure({
    defaultIsOpen: true,
  });

  const [isTablet] = useMediaQuery('(min-width: 768px) and (max-width: 992px)');

  // Open mini sidebar on tablet
  useEffect(() => {
    if (isTablet) {
      onOpen();
    }
  }, [isTablet, onOpen]);

  return (
    <Flex w="full" h="full" bg="background.body.primary">
      <Box
        pl={{
          base: 0,
          md: !isOpen ? 0 : SIDEBAR.MINI_SIDEBAR_WIDTH,
          lg: SIDEBAR.MINI_SIDEBAR_WIDTH,
          '4xl': !isOpen
            ? SIDEBAR.EXPAND_SIDEBAR_WIDTH
            : SIDEBAR.MINI_SIDEBAR_WIDTH,
        }}
        w="full"
        minH="100vh"
        h="full"
        sx={{
          transition: 'all .25s ease-in-out',
        }}
      >
        <SideBar isOpen={isOpen} onOpen={onOpen} onClose={onClose} />

        <p>Header</p>

        {/* Button to show Sidebar on mobile */}
        <Image
          src={IMAGES.LEFT_ARROW.url}
          alt={IMAGES.LEFT_ARROW.alt}
          position="fixed"
          top={8}
          transform="rotate(180deg)"
          left={0}
          onClick={onClose}
        />

        {/* Content of the page */}
        {children}
      </Box>
    </Flex>
  );
};

export default MainLayout;
