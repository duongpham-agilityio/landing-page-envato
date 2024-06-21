// Libs
import { memo } from 'react';
import { Flex, Td, Text, Tooltip } from '@chakra-ui/react';
import { formatUppercaseFirstLetter } from '@/lib/utils';

interface ActionNameCellProps {
  actionName: string;
}

const ActionNameCell = ({ actionName }: ActionNameCellProps): JSX.Element => (
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
      <Tooltip minW="max-content" placement="bottom-start" label={actionName}>
        <Text
          display="block"
          fontSize="md"
          fontWeight="semibold"
          wordBreak="break-all"
          textOverflow="ellipsis"
          overflow="hidden"
          pr={10}
          flex={1}
          w={{ base: 150, md: 250, '6xl': 300 }}
        >
          {formatUppercaseFirstLetter(`${actionName}`)}
        </Text>
      </Tooltip>
    </Flex>
  </Td>
);

const ActionNameCellMemorized = memo(ActionNameCell);

export default ActionNameCellMemorized;
