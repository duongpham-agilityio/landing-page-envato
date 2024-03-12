'use client';

import { memo } from 'react';

// Components
import { Box, Button, Flex, Text } from '@chakra-ui/react';

interface ProductProps {
  productName: string;
  onDeleteProduct?: () => void;
  onCloseModal?: () => void;
}

const ConfirmDeleteModal = ({
  productName,
  onDeleteProduct,
  onCloseModal,
}: ProductProps) => (
  <Box>
    <Text fontSize="md">
      Are you sure delete the product:
      <Text as="span" pl={1} color="red.500" fontWeight="bold">
        {productName}
      </Text>
      ?
    </Text>
    <Flex my={4} justifyContent="center">
      <Button
        w={44}
        bg="green.600"
        mr={3}
        onClick={onDeleteProduct}
        data-testid="accept-del"
      >
        Delete
      </Button>
      <Button
        w={44}
        bg="orange.300"
        _hover={{ bg: 'orange.400' }}
        onClick={onCloseModal}
      >
        Cancel
      </Button>
    </Flex>
  </Box>
);

const ConfirmDeleteModalMemorized = memo(ConfirmDeleteModal);
export default ConfirmDeleteModalMemorized;
