import { Flex, Td, Text, Tooltip } from '@chakra-ui/react';
import { memo } from 'react';

// Types
import { TDataSource } from '@/lib/interfaces';

const ProductNameCellComponent = ({ name }: TDataSource): JSX.Element => (
  <Td
    py={5}
    pr={5}
    pl={0}
    fontSize="md"
    color="text.primary"
    fontWeight="semibold"
    textAlign="left"
    minW={150}
  >
    <Flex alignItems="center" gap="10px" minW={150}>
      <Tooltip
        minW="max-content"
        placement="bottom-start"
        label={name as string}
      >
        <Text
          fontSize="md"
          fontWeight="semibold"
          whiteSpace="break-spaces"
          noOfLines={1}
          minW={150}
          pr={10}
          flex={1}
        >
          {name as string}
        </Text>
      </Tooltip>
    </Flex>
  </Td>
);

const ProductNameCell = memo(ProductNameCellComponent);

export default ProductNameCell;
