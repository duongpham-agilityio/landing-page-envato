import { Box, Flex, Spacer, Text } from '@chakra-ui/react';
import { memo } from 'react';
import Image from 'next/image';

// Constants
import { IMAGES } from '@/lib/constants';

// Utils
import { generatePlaceholder } from '@/lib/utils';

interface MessageProps {
  content?: string;
  userAvatar?: string;
  adminAvatar?: string;
  localeTime?: string;
  senderId: string;
  isSuperAdmin: boolean;
}

const MessageAdmin = ({
  content = '',
  isSuperAdmin = false,
  userAvatar = IMAGES.CHAT_USER_AVATAR.url,
  adminAvatar = IMAGES.CHAT_USER_AVATAR.url,
  localeTime,
}: MessageProps) => {
  const justifyContent = isSuperAdmin ? 'flex-end' : 'flex-start';
  const direction = isSuperAdmin ? 'row-reverse' : 'row';
  const background = isSuperAdmin
    ? 'primary.300'
    : 'background.section.messageUser';

  return (
    <Flex
      width="100%"
      justifyContent={justifyContent}
      alignItems="center"
      mb="25px"
    >
      {!isSuperAdmin && (
        <Box pos="relative" w={9} h={9}>
          <Image
            src={userAvatar}
            alt={userAvatar}
            fill
            sizes="100vw"
            placeholder="blur"
            blurDataURL={generatePlaceholder(36, 36)}
            style={{
              borderRadius: '50%',
              marginRight: '8px',
            }}
          />
        </Box>
      )}

      <Flex align="flex-end" direction={direction} alignItems="center">
        <Box
          data-testid="image-container"
          bg={background}
          p={3}
          ml={2}
          borderRadius={8}
          color="text.primary"
          dangerouslySetInnerHTML={{ __html: content ?? '' }}
        />
        <Spacer />

        <Text
          ml={3}
          mr={3}
          fontSize="xs"
          color="text.textTime"
          fontWeight="medium"
          minW="max-content"
        >
          {localeTime}
        </Text>
      </Flex>

      {isSuperAdmin && (
        <Box pos="relative" w={9} h={9}>
          <Image
            src={adminAvatar}
            alt={adminAvatar}
            fill
            sizes="100vw"
            placeholder="blur"
            blurDataURL={generatePlaceholder(36, 36)}
            style={{
              borderRadius: '50%',
              marginLeft: '8px',
            }}
          />
        </Box>
      )}
    </Flex>
  );
};
const MessagesMemorized = memo(MessageAdmin);

export default MessagesMemorized;
