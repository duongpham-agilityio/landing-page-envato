'use client';

import { ChangeEvent, memo, useCallback } from 'react';
import { Box, Image, Heading, Flex, Input, Button } from '@chakra-ui/react';

// Constants
import { AVATAR_POSITION, IMAGES } from '@/lib/constants';

// Components
import Message from './Message';

// Mocks
import { MESSAGE_TIME, MESSAGES } from '@/lib/mocks';

export type BoxChatProps = {
  onSendMessage?: () => void;
  onChange?: (value: string) => void;
};

const BoxChatComponent = ({ onSendMessage, onChange }: BoxChatProps) => {
  const handleChangeValue = useCallback(
    (e: ChangeEvent<HTMLInputElement>): void => onChange?.(e.target.value),
    [onChange],
  );

  const handleSendMessage = (): void => onSendMessage?.();

  return (
    <Box w="full" bg="background.body.quaternary" borderRadius="lg">
      <Flex
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        justify="center"
        borderBottom="1px solid"
        borderBottomColor="border.tertiary"
        padding="24px 26px"
      >
        <Heading
          as="h3"
          fontWeight="semibold"
          color="text.primary"
          fontSize="2xl"
          textTransform="capitalize"
        >
          team chat
        </Heading>

        <Flex gap={5}>
          <Image
            src={IMAGES.USER_AVATAR.url}
            alt={IMAGES.USER_AVATAR.alt}
            fallbackSrc={IMAGES.USER.url}
            w="52px"
            h={8}
          />

          <Button
            aria-label="btn-icon-plus"
            bg="secondary.800"
            w={9}
            h={9}
            borderRadius="50%"
          >
            <Image
              src="icons/plus.svg"
              alt={IMAGES.USER_AVATAR.alt}
              fallbackSrc={IMAGES.USER.url}
              w={3.5}
              h={3.5}
            />
          </Button>
        </Flex>
      </Flex>

      <Box padding={{ base: '24px 20px', lg: '38px 35px' }}>
        {MESSAGES.map((message): JSX.Element => {
          const { isSend, isAudio, uid, content } = message;

          return (
            <Message
              key={uid}
              content={content}
              isImage={isAudio}
              isOwnerMessage={isSend}
              avatarPosition={
                isSend ? AVATAR_POSITION.AFTER : AVATAR_POSITION.BEFORE
              }
              avatar={IMAGES.CHAT_USER_AVATAR.url}
              localeTime={MESSAGE_TIME}
            />
          );
        })}

        <Flex justify="center" align="center">
          <Box
            border="1px solid"
            borderColor="border.secondary"
            p="0 20px"
            mt={5}
            borderRadius="lg"
            w="full"
          >
            <Flex direction="row" alignItems="center">
              <Image
                src={IMAGES.ATTACH.url}
                alt={IMAGES.ATTACH.alt}
                w={4}
                h={15}
                cursor="pointer"
              />

              <Input
                variant="authentication"
                ml={5}
                _dark={{
                  border: 'none',
                }}
                sx={{ border: 'none', padding: 0 }}
                placeholder="Type your message here"
                onChange={handleChangeValue}
              />

              <Image
                src={IMAGES.MICRO.url}
                alt={IMAGES.MICRO.alt}
                w={6}
                h={6}
                cursor="pointer"
              />
            </Flex>
          </Box>
          <Image
            role="button"
            mt={5}
            ml={5}
            src={IMAGES.SEND.url}
            alt={IMAGES.SEND.alt}
            w={5}
            h={18}
            cursor="pointer"
            onClick={handleSendMessage}
          />
        </Flex>
      </Box>
    </Box>
  );
};

const BoxChat = memo(BoxChatComponent);

export default BoxChat;
