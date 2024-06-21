// Libs
import { memo } from 'react';
import { Td, Text } from '@chakra-ui/react';
import Link from 'next/link';

interface EmailCellProps {
  email: string;
}

const EmailCell = ({ email }: EmailCellProps): JSX.Element => (
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
      as={Link}
      href={`mailto:${email}`}
      fontSize="md"
      fontWeight="semibold"
      whiteSpace="break-spaces"
      noOfLines={1}
      w={{ base: 100, md: 220, '3xl': 200, '5xl': 200, '7xl': 350 }}
      flex={1}
    >
      {email}
    </Text>
  </Td>
);

const EmailCellMemorized = memo(EmailCell);

export default EmailCellMemorized;
