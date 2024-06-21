// Libs
import { memo } from 'react';
import { Text, Td } from '@chakra-ui/react';

interface QuantityCellProps {
  quantity: number;
}

const QuantityCell = ({ quantity }: QuantityCellProps) => (
  <Td
    py={5}
    pr={5}
    pl={0}
    fontSize="md"
    color="text.primary"
    fontWeight="semibold"
    textAlign="left"
    w={{ base: 100, md: 20 }}
  >
    <Text
      fontSize="md"
      fontWeight="semibold"
      whiteSpace="break-spaces"
      noOfLines={1}
      w={{ base: 100, '3xl': 150, '5xl': 200 }}
      flex={1}
    >
      {quantity}
    </Text>
  </Td>
);

const QuantityCellMemorized = memo(QuantityCell);

export default QuantityCellMemorized;
