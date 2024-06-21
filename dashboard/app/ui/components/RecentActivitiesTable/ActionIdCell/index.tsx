// Libs
import { memo } from 'react';
import { Flex, Td, Text, Tooltip } from '@chakra-ui/react';

interface ActionIdCellProps {
  id: string;
}

const ActionIdCell = ({ id }: ActionIdCellProps): JSX.Element => (
  <Td
    py={5}
    pr={5}
    pl={0}
    fontSize="md"
    color="text.primary"
    fontWeight="semibold"
    textAlign="left"
    w={{ base: 150, md: 250, '6xl': 300 }}
  >
    <Flex alignItems="center" gap="10px">
      <Tooltip minW="max-content" placement="bottom-start" label={id}>
        <Text
          display="block"
          fontSize={{ base: '12px', md: '16px' }}
          fontWeight="semibold"
          wordBreak="break-all"
          textOverflow="ellipsis"
          overflow="hidden"
          pr={10}
          flex={1}
          w={{ base: 150, md: 250, '6xl': 300 }}
        >
          {id}
        </Text>
      </Tooltip>
    </Flex>
  </Td>
);

const ActionIdCellMemorized = memo(ActionIdCell);

export default ActionIdCellMemorized;
