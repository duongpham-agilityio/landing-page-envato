// Libs
import { memo } from 'react';
import { Text, Td } from '@chakra-ui/react';

interface PriceCellProps {
  price: number;
}

const PriceCell = ({ price }: PriceCellProps) => (
  <Td
    py={5}
    pr={5}
    pl={0}
    fontSize="md"
    color="text.primary"
    fontWeight="semibold"
    textAlign="left"
    w={{ base: 150, md: 20 }}
  >
    <Text
      fontSize="md"
      fontWeight="semibold"
      whiteSpace="break-spaces"
      noOfLines={1}
      w={{ base: 100, '3xl': 150, '5xl': 200 }}
      flex={1}
    >
      {price}
    </Text>
  </Td>
);

const PriceCellMemorized = memo(PriceCell);

export default PriceCellMemorized;
