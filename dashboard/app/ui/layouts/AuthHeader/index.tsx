import { memo } from 'react';
import { Heading as HeadingChakra, Text, VStack } from '@chakra-ui/react';

type THeadingProps = {
  title: string;
  isShowDescription?: boolean;
};

const AuthHeaderComponent = ({
  title,
  isShowDescription = false,
}: THeadingProps) => (
  <VStack as="header">
    <HeadingChakra
      as="h1"
      fontSize={{ base: '2xl', md: '4xl' }}
      fontFamily="secondary"
      fontWeight="semibold"
      textAlign="center"
      px={2}
    >
      {title}
    </HeadingChakra>

    {isShowDescription && (
      <Text fontSize="md" color="text.secondary" fontWeight="medium">
        Send, spend and save smarter
      </Text>
    )}
  </VStack>
);

const Heading = memo(AuthHeaderComponent);

export default Heading;
