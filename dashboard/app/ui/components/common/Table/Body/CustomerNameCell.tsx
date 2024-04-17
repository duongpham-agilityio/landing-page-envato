import { Box, Flex, Td, Text, Tooltip } from '@chakra-ui/react';
import { memo } from 'react';
import Image from 'next/image';

// Types
import { TDataSource } from '@/lib/interfaces';

// Utils
import { generatePlaceholder } from '@/lib/utils';

const CustomerNameCellComponent = ({
  image,
  name,
}: TDataSource): JSX.Element => (
  <Td
    py={5}
    pr={5}
    pl={0}
    fontSize="md"
    color="text.primary"
    fontWeight="semibold"
    textAlign="left"
    w={{ base: 350, xl: 220, '3xl': 150, '4xl': 200, '6xl': 250 }}
  >
    <Flex
      alignItems="center"
      gap="10px"
      w={{ base: 240, '3xl': 200, '5xl': 240 }}
    >
      <Box pos="relative" w={10} h={10}>
        <Image
          src={`${image}`}
          alt={`Image of ${name}`}
          fill
          sizes="100vw"
          placeholder="blur"
          blurDataURL={generatePlaceholder(40, 40)}
          style={{
            borderRadius: '50%',
            objectFit: 'cover',
          }}
        />
      </Box>
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

const CustomerNameCell = memo(CustomerNameCellComponent);

export default CustomerNameCell;
