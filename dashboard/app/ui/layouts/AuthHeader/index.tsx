import { memo } from 'react';
import { Heading as HeadingChakra, Text, VStack } from '@chakra-ui/react';

// Constants
import { ROUTES } from '@/lib/constants';

type THeadingProps = {
  title: string;
  pathName?: string;
};

const AuthHeaderComponent = ({ title, pathName }: THeadingProps) => {
  const pathLogin = pathName !== `/${ROUTES.FORGOT_PASSWORD}`;

  return (
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
      {pathLogin && (
        <Text fontSize="md" color="text.secondary" fontWeight="medium">
          Send, spend and save smarter
        </Text>
      )}
    </VStack>
  );
};

const Heading = memo(AuthHeaderComponent);

export default Heading;
