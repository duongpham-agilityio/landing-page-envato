'use client';

import { memo } from 'react';
import { Box, Flex, Image, Text } from '@chakra-ui/react';

// Constants
import { IMAGES } from '@/lib/constants';

// Utils
import { convertTimeStampToTime } from '@/lib/utils';

// Interfaces
import { IIssues } from '@/lib/interfaces';

interface CardIssueProps {
  data: IIssues;
}

const CardIssues = ({ data }: CardIssueProps) => {
  const { avatar, firstName, lastName, createdAt, title, description } =
    data || {};

  return (
    <Flex
      px={4}
      py={8}
      w="full"
      _hover={{
        borderRadius: 8,
        bg: 'primary.300',
      }}
    >
      <Image
        src={avatar}
        alt={IMAGES.AVATAR_SIGN_UP.alt}
        rounded="full"
        objectFit="cover"
        w={43}
        h={43}
      />
      <Box ml={6}>
        <Flex>
          <Text color="text.textIssues" fontSize="md" fontWeight="semibold">
            {`${firstName} ${lastName}`}
            <Text
              as="span"
              fontSize="sm"
              fontWeight="semibold"
              ml={1}
              color="text.textIssues"
            >
              {convertTimeStampToTime(createdAt)}
            </Text>
          </Text>
        </Flex>
        <Text color="text.textIssues" mt={2} mb={3} fontWeight="semibold">
          {title}
        </Text>
        <Text
          className="description"
          color="text.textIssues"
          fontSize="sm"
          dangerouslySetInnerHTML={{ __html: description ?? '' }}
        />
      </Box>
    </Flex>
  );
};
const CardIssuesMemorize = memo(CardIssues);

export default CardIssuesMemorize;
