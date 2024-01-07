import { memo } from 'react';
import { Button, IconButton, Menu, MenuButton, Td } from '@chakra-ui/react';

// Icons
import { Dot } from '@/ui/components/Icons';

const ActionCellComponent = () => (
  <>
    <Td
      px={0}
      fontSize="md"
      color="text.primary"
      fontWeight="semibold"
      textAlign="center"
      position="relative"
    >
      <Menu closeOnSelect={false}>
        {({ isOpen }) => (
          <>
            <MenuButton
              as={Button}
              isActive={isOpen}
              p={0}
              bg="none"
              _hover={{
                bg: 'none',
              }}
              _active={{
                bg: 'none',
              }}
            >
              <IconButton
                aria-label="This is the icon action"
                w={7}
                h={7}
                bgColor="transparent"
                _hover={{
                  bgColor: 'transparent',
                }}
              >
                <Dot />
              </IconButton>
            </MenuButton>
          </>
        )}
      </Menu>
    </Td>
  </>
);

const ActionCell = memo(ActionCellComponent);

export default ActionCell;
