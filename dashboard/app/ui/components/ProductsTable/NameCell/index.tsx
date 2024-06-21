// Libs
import { memo } from 'react';
import { Flex, Td, Text, Tooltip } from '@chakra-ui/react';

interface NameCellProps {
  name: string;
}

const NameCell = ({ name }: NameCellProps): JSX.Element => (
  <Td
    py={5}
    pr={5}
    pl={0}
    fontSize="md"
    color="text.primary"
    fontWeight="semibold"
    textAlign="left"
    w={{ base: 200, xl: 220, '3xl': 200, '6xl': 250 }}
  >
    <Flex alignItems="center" gap="10px">
      <Tooltip minW="max-content" placement="bottom-start" label={name}>
        <Text
          display="block"
          fontSize="md"
          fontWeight="semibold"
          wordBreak="break-all"
          textOverflow="ellipsis"
          overflow="hidden"
          pr={10}
          flex={1}
          w={{ base: 200, xl: 220, '3xl': 200, '6xl': 250 }}
        >
          {name}
        </Text>
      </Tooltip>
    </Flex>
  </Td>
);

const NameCellMemorized = memo(NameCell);

export default NameCellMemorized;
