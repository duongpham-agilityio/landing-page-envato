import isEqual from 'react-fast-compare';
import { memo, useCallback } from 'react';
import { Box, Flex, Text, Heading } from '@chakra-ui/react';

// Themes
import { useColorfill } from '@/ui/themes/bases';

export interface ItemSideBarSettingProps {
  id: string;
  children?: React.ReactElement;
  activeItemId?: string;
  title?: string;
  content?: string;
  onClick: (id: string) => void;
}

const ItemSideBarSetting = ({
  id,
  children,
  activeItemId = '',
  title = '',
  content = '',
  onClick,
}: ItemSideBarSettingProps): JSX.Element => {
  const handleToggle = useCallback(() => {
    onClick(id);
  }, [id, onClick]);

  const { quaternary } = useColorfill();

  const isActive: boolean = id === activeItemId;

  return (
    <Box w="full" onClick={handleToggle}>
      <Flex
        cursor="pointer"
        onClick={handleToggle}
        columnGap={4}
        bg={isActive ? quaternary : 'transparent'}
        {...(isActive && { color: 'white' })}
        px={4}
        py={6}
        borderRadius="lg"
      >
        <Flex
          borderRadius="full"
          minW={12}
          h={12}
          bg={isActive ? 'primary.500' : 'background.body.primary'}
          align="center"
          justify="center"
        >
          {children}
        </Flex>

        <Box>
          <Heading as="h4" fontSize="md" fontWeight="bold" color="text.quinary">
            {title}
          </Heading>
          <Text color="text.senary" fontWeight="medium" fontSize="sm" mt={0.5}>
            {content}
          </Text>
        </Box>
      </Flex>
    </Box>
  );
};

const ItemSideBar = memo(ItemSideBarSetting, isEqual);

export default ItemSideBar;
